import { db } from '@/db';
import { resumeFeedback } from '@/db/schema';
import { eq, ne, and, count } from 'drizzle-orm';
import { generateResumeUploadUrl } from '@/lib/r2';
import {
  RESUME_QUOTA_LIMIT,
  resumeUploadRequestSchema,
  MAX_FILE_SIZE_BYTES,
} from '@/lib/resume/schemas';
import { withErrorHandling, requireAuth, ApiError, Errors } from '@/lib/auth';

/**
 * POST /api/resume/upload
 * Generates a presigned URL for uploading a Word document (.docx) resume to R2
 * Also creates a pending feedback record
 */
export const POST = withErrorHandling(async (request) => {
  const userId = await requireAuth();

  // Parse and validate request body
  const body = await request.json();
  const parseResult = resumeUploadRequestSchema.safeParse(body);

  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];

    // Check for specific validation errors
    if (firstIssue?.path.includes('contentType')) {
      throw new ApiError(400, 'INVALID_FILE_TYPE', 'Only Word documents (.docx) are allowed');
    }

    if (firstIssue?.path.includes('fileSizeBytes')) {
      throw new ApiError(400, 'FILE_TOO_LARGE', `File must be under ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`, {
        maxMb: MAX_FILE_SIZE_BYTES / 1024 / 1024,
      });
    }

    throw Errors.validationError('Invalid request', parseResult.error.issues);
  }

  const { fileName, trackSlug } = parseResult.data;

  // Check quota before allowing upload
  const [quotaResult] = await db
    .select({ count: count() })
    .from(resumeFeedback)
    .where(
      and(
        eq(resumeFeedback.userId, userId),
        ne(resumeFeedback.status, 'failed')
      )
    );

  const used = quotaResult?.count ?? 0;

  if (used >= RESUME_QUOTA_LIMIT) {
    throw Errors.quotaExceeded("You've used all 10 resume submissions", {
      used,
      limit: RESUME_QUOTA_LIMIT,
    });
  }

  // Create a pending feedback record
  const [feedbackRecord] = await db
    .insert(resumeFeedback)
    .values({
      userId,
      trackSlug,
      resumeFileName: fileName,
      status: 'uploading',
    })
    .returning();

  // Generate presigned upload URL
  const { uploadUrl, objectKey, expiresAt } = await generateResumeUploadUrl(
    feedbackRecord.id,
    fileName
  );

  // Update record with object key
  await db
    .update(resumeFeedback)
    .set({ resumeObjectKey: objectKey })
    .where(eq(resumeFeedback.id, feedbackRecord.id));

  return Response.json({
    feedbackId: feedbackRecord.id,
    uploadUrl,
    objectKey,
    expiresAt: expiresAt.toISOString(),
  });
});
