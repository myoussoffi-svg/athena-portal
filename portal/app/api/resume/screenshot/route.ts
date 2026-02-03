import { db } from '@/db';
import { resumeFeedback } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { uploadToR2 } from '@/lib/r2';
import { withErrorHandling, requireAuth, Errors } from '@/lib/auth';

// Max screenshot size: 10MB
const MAX_SCREENSHOT_SIZE = 10 * 1024 * 1024;

// Allowed image types
const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
];

/**
 * POST /api/resume/screenshot
 * Upload a screenshot for visual formatting analysis
 * This is called AFTER the initial resume upload to enhance the feedback
 */
export const POST = withErrorHandling(async (request) => {
  const userId = await requireAuth();

  const formData = await request.formData();
  const file = formData.get('screenshot') as File | null;
  const feedbackId = formData.get('feedbackId') as string | null;

  if (!file) {
    throw Errors.badRequest('No screenshot file provided');
  }

  if (!feedbackId) {
    throw Errors.badRequest('No feedbackId provided');
  }

  // Validate file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw Errors.badRequest(
      `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`
    );
  }

  // Validate file size
  if (file.size > MAX_SCREENSHOT_SIZE) {
    throw Errors.badRequest(
      `Screenshot too large. Maximum size: ${MAX_SCREENSHOT_SIZE / 1024 / 1024}MB`
    );
  }

  // Verify the feedback record exists and belongs to this user
  const feedbackRecord = await db.query.resumeFeedback.findFirst({
    where: and(
      eq(resumeFeedback.id, feedbackId),
      eq(resumeFeedback.userId, userId)
    ),
  });

  if (!feedbackRecord) {
    throw Errors.notFound('Feedback record');
  }

  // Only allow screenshot upload for pending/extracting/analyzing records
  // or for completed records (to trigger re-analysis with vision)
  const allowedStatuses = ['pending', 'extracting', 'analyzing', 'complete'];
  if (!allowedStatuses.includes(feedbackRecord.status)) {
    throw Errors.badRequest(
      `Cannot upload screenshot for feedback in status: ${feedbackRecord.status}`
    );
  }

  // Read file as buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload to R2
  const objectKey = `resume-screenshots/${userId}/${feedbackId}/${Date.now()}.${file.type.split('/')[1]}`;

  await uploadToR2(objectKey, buffer, file.type);

  // Update feedback record with screenshot info
  await db
    .update(resumeFeedback)
    .set({
      screenshotObjectKey: objectKey,
      screenshotContentType: file.type,
      updatedAt: new Date(),
    })
    .where(eq(resumeFeedback.id, feedbackId));

  return Response.json({
    success: true,
    objectKey,
    message: 'Screenshot uploaded. Vision analysis will be included in feedback.',
  });
});
