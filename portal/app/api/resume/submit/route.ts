import { db } from '@/db';
import { resumeFeedback } from '@/db/schema';
import { eq, ne, and, count } from 'drizzle-orm';
import { inngest } from '@/lib/inngest';
import { verifyUpload } from '@/lib/r2';
import {
  RESUME_QUOTA_LIMIT,
  resumeSubmitRequestSchema,
  MAX_FILE_SIZE_BYTES,
} from '@/lib/resume/schemas';
import { withErrorHandling, requireAuth, Errors } from '@/lib/auth';

// Allowed MIME types for resume uploads
const ALLOWED_RESUME_TYPES = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

// Minimum file size (1KB) to catch empty/corrupted uploads
const MIN_FILE_SIZE_BYTES = 1024;

/**
 * POST /api/resume/submit
 * Confirms the upload is complete and triggers processing
 */
export const POST = withErrorHandling(async (request) => {
  const userId = await requireAuth();

  // Parse and validate request body
  const body = await request.json();
  const parseResult = resumeSubmitRequestSchema.safeParse(body);

  if (!parseResult.success) {
    throw Errors.validationError('Invalid request', parseResult.error.issues);
  }

  const { resumeObjectKey, resumeFileName, trackSlug } = parseResult.data;

  // Find the feedback record for this upload
  const feedbackRecord = await db.query.resumeFeedback.findFirst({
    where: and(
      eq(resumeFeedback.userId, userId),
      eq(resumeFeedback.resumeObjectKey, resumeObjectKey),
      eq(resumeFeedback.status, 'uploading')
    ),
  });

  if (!feedbackRecord) {
    throw Errors.notFound('Upload record');
  }

  // Double-check quota (defensive)
  const [quotaResult] = await db
    .select({ count: count() })
    .from(resumeFeedback)
    .where(
      and(
        eq(resumeFeedback.userId, userId),
        ne(resumeFeedback.status, 'failed'),
        ne(resumeFeedback.status, 'uploading') // Exclude current uploading record
      )
    );

  const used = quotaResult?.count ?? 0;

  if (used >= RESUME_QUOTA_LIMIT) {
    // Clean up the uploading record
    await db
      .update(resumeFeedback)
      .set({ status: 'failed', errorMessage: 'Quota exceeded' })
      .where(eq(resumeFeedback.id, feedbackRecord.id));

    throw Errors.quotaExceeded("You've used all 10 resume submissions", {
      used,
      limit: RESUME_QUOTA_LIMIT,
    });
  }

  // Verify file exists in R2 and meets requirements
  const verification = await verifyUpload(resumeObjectKey, {
    minSizeBytes: MIN_FILE_SIZE_BYTES,
    maxSizeBytes: MAX_FILE_SIZE_BYTES,
    allowedContentTypes: ALLOWED_RESUME_TYPES,
  });

  if (!verification.exists) {
    throw Errors.badRequest('Upload not found in storage. Please try uploading again.');
  }

  if (verification.error) {
    throw Errors.badRequest(verification.error);
  }

  // Update status to pending and set submission time
  await db
    .update(resumeFeedback)
    .set({
      status: 'pending',
      submittedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(resumeFeedback.id, feedbackRecord.id));

  // Trigger Inngest processing job (if configured)
  const inngestEventKey = process.env.INNGEST_EVENT_KEY;
  if (inngestEventKey) {
    await inngest.send({
      name: 'resume/submitted',
      data: {
        feedbackId: feedbackRecord.id,
        userId,
        trackSlug,
        resumeObjectKey,
        resumeFileName,
      },
    });
  } else {
    console.warn('[resume/submit] Inngest not configured - resume processing skipped');
    // Mark as failed since we can't process without Inngest
    await db
      .update(resumeFeedback)
      .set({
        status: 'failed',
        errorMessage: 'Resume processing is not configured. Please contact support.',
        updatedAt: new Date(),
      })
      .where(eq(resumeFeedback.id, feedbackRecord.id));
  }

  return Response.json({
    feedbackId: feedbackRecord.id,
    status: inngestEventKey ? 'pending' : 'failed',
  });
});
