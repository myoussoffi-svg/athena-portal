import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { interviewAttempts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { objectExists } from '@/lib/r2';
import { inngest } from '@/lib/inngest';

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

export async function POST(request: Request) {
  try {
    // 1. Require authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    // 2. Parse request body
    const body: SubmitRequest = await request.json();
    const { attemptId, segmentBoundaries, integrityLog } = body;

    if (!attemptId || !segmentBoundaries) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'attemptId and segmentBoundaries required' },
        { status: 400 }
      );
    }

    // 3. Find the attempt and verify ownership
    const attempt = await db.query.interviewAttempts.findFirst({
      where: and(
        eq(interviewAttempts.id, attemptId),
        eq(interviewAttempts.candidateId, userId)
      ),
    });

    if (!attempt) {
      return NextResponse.json({ error: 'ATTEMPT_NOT_FOUND' }, { status: 404 });
    }

    if (attempt.status !== 'in_progress') {
      return NextResponse.json(
        { error: 'ALREADY_SUBMITTED', currentStatus: attempt.status },
        { status: 400 }
      );
    }

    // 4. Verify video was uploaded to R2
    if (!attempt.videoObjectKey) {
      return NextResponse.json(
        { error: 'VIDEO_NOT_UPLOADED', message: 'No video object key found' },
        { status: 400 }
      );
    }

    const videoUploaded = await objectExists(attempt.videoObjectKey);
    if (!videoUploaded) {
      return NextResponse.json(
        { error: 'VIDEO_NOT_UPLOADED', message: 'Video file not found in storage' },
        { status: 400 }
      );
    }

    // 5. Determine integrity status
    let integrityStatus: 'clean' | 'flagged' | 'unknown' = 'unknown';
    if (integrityLog) {
      const { summary } = integrityLog;
      const shouldFlag =
        summary.totalTimeOutsideMs > 60000 || summary.totalViolations > 5;
      integrityStatus = shouldFlag ? 'flagged' : 'clean';
    }

    // 6. Update attempt with submission data (server-side expiry)
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

    // 7. Trigger processing pipeline via Inngest
    await inngest.send({
      name: 'interview/submitted',
      data: {
        attemptId,
      },
    });

    return NextResponse.json({
      success: true,
      statusUrl: `/api/interview/attempts/${attemptId}/status`,
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
