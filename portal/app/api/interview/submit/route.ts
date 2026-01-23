import { db } from '@/db';
import { interviewAttempts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { verifyUpload } from '@/lib/r2';
import { inngest } from '@/lib/inngest';
import { withErrorHandling, requireAuth, ApiError, Errors } from '@/lib/auth';

// Video size limits
const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024; // 500MB
const MIN_VIDEO_SIZE_BYTES = 10 * 1024; // 10KB minimum

// Allowed video MIME types
const ALLOWED_VIDEO_TYPES = [
  'video/webm',
  'video/mp4',
  'video/quicktime', // .mov files
];

// Segment boundary from client
interface SegmentBoundary {
  promptId: number;
  startTime: number;
  endTime: number;
}

// Integrity log from client
interface IntegrityLog {
  schemaVersion: string;
  startedInFullscreen: boolean | null;
  fullscreenSupported: boolean;
  visibilityApiSupported: boolean;
  violations: Array<{
    event: string;
    timestamp: string;
    promptIdActive: number;
    durationOutsideMs: number | null;
  }>;
  summary: {
    totalViolations: number;
    totalTimeOutsideMs: number;
    fullscreenExitCount: number;
    tabSwitchCount: number;
    windowBlurCount: number;
  };
  browserInfo: {
    userAgent: string;
    platform: string;
  } | null;
}

interface SubmitRequest {
  attemptId: string;
  segmentBoundaries: SegmentBoundary[];
  integrityLog: IntegrityLog | null;
}

export const POST = withErrorHandling(async (request) => {
  const userId = await requireAuth();

  // Parse request body
  const body: SubmitRequest = await request.json();
  const { attemptId, segmentBoundaries, integrityLog } = body;

  if (!attemptId || !segmentBoundaries) {
    throw Errors.validationError('attemptId and segmentBoundaries required');
  }

  // Find the attempt and verify ownership
  const attempt = await db.query.interviewAttempts.findFirst({
    where: and(
      eq(interviewAttempts.id, attemptId),
      eq(interviewAttempts.candidateId, userId)
    ),
  });

  if (!attempt) {
    throw Errors.notFound('Interview attempt');
  }

  if (attempt.status !== 'in_progress') {
    throw new ApiError(400, 'ALREADY_SUBMITTED', 'This attempt has already been submitted', {
      currentStatus: attempt.status,
    });
  }

  // Verify video was uploaded to R2 with proper validation
  if (!attempt.videoObjectKey) {
    throw Errors.badRequest('No video object key found');
  }

  const verification = await verifyUpload(attempt.videoObjectKey, {
    minSizeBytes: MIN_VIDEO_SIZE_BYTES,
    maxSizeBytes: MAX_VIDEO_SIZE_BYTES,
    allowedContentTypes: ALLOWED_VIDEO_TYPES,
  });

  if (!verification.exists) {
    throw Errors.badRequest('Video file not found in storage. Please try recording again.');
  }

  if (verification.error) {
    throw Errors.badRequest(verification.error);
  }

  // Determine integrity status
  let integrityStatus: 'clean' | 'flagged' | 'unknown' = 'unknown';
  if (integrityLog) {
    const { summary } = integrityLog;
    const shouldFlag =
      summary.totalTimeOutsideMs > 60000 || summary.totalViolations > 5;
    integrityStatus = shouldFlag ? 'flagged' : 'clean';
  }

  // Update attempt with submission data (server-side expiry)
  const videoExpiresAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days

  await db
    .update(interviewAttempts)
    .set({
      status: 'processing',
      processingStage: 'upload_verified',
      lastStageUpdatedAt: new Date(),
      submittedAt: new Date(),
      videoExpiresAt,
      integrityLog: integrityLog,
      integrityStatus,
      // Store segment boundaries temporarily - will be replaced with full segments after transcription
      segments: segmentBoundaries.map((b) => ({
        promptId: b.promptId,
        startTimeSeconds: b.startTime,
        endTimeSeconds: b.endTime,
        transcriptText: null, // Filled after transcription
      })),
      updatedAt: new Date(),
    })
    .where(eq(interviewAttempts.id, attemptId));

  // Trigger processing pipeline via Inngest
  await inngest.send({
    name: 'interview/submitted',
    data: {
      attemptId,
    },
  });

  return Response.json({
    success: true,
    statusUrl: `/api/interview/attempts/${attemptId}/status`,
  });
});
