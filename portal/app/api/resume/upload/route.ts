import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { resumeFeedback } from '@/db/schema';
import { eq, ne, and, count } from 'drizzle-orm';
import { generateResumeUploadUrl } from '@/lib/r2';
import {
  RESUME_QUOTA_LIMIT,
  RESUME_ERROR_CODES,
  resumeUploadRequestSchema,
  MAX_FILE_SIZE_BYTES,
} from '@/lib/resume/schemas';

/**
 * POST /api/resume/upload
 * Generates a presigned URL for uploading a Word document (.docx) resume to R2
 * Also creates a pending feedback record
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', code: RESUME_ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const parseResult = resumeUploadRequestSchema.safeParse(body);

    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0];

      // Check for specific validation errors
      if (firstIssue?.path.includes('contentType')) {
        return NextResponse.json(
          {
            error: 'Only Word documents (.docx) are allowed',
            code: RESUME_ERROR_CODES.INVALID_FILE_TYPE,
          },
          { status: 400 }
        );
      }

      if (firstIssue?.path.includes('fileSizeBytes')) {
        return NextResponse.json(
          {
            error: `File must be under ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
            code: RESUME_ERROR_CODES.FILE_TOO_LARGE,
            maxMb: MAX_FILE_SIZE_BYTES / 1024 / 1024,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      );
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
      return NextResponse.json(
        {
          error: "You've used all 10 resume submissions",
          code: RESUME_ERROR_CODES.QUOTA_EXCEEDED,
          used,
          limit: RESUME_QUOTA_LIMIT,
        },
        { status: 403 }
      );
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

    return NextResponse.json({
      feedbackId: feedbackRecord.id,
      uploadUrl,
      objectKey,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Upload URL generation error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
