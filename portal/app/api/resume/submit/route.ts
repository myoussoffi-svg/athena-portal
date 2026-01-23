import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { resumeFeedback } from '@/db/schema';
import { eq, ne, and, count } from 'drizzle-orm';
import { inngest } from '@/lib/inngest';
import { objectExists } from '@/lib/r2';
import {
  RESUME_QUOTA_LIMIT,
  RESUME_ERROR_CODES,
  resumeSubmitRequestSchema,
} from '@/lib/resume/schemas';

/**
 * POST /api/resume/submit
 * Confirms the upload is complete and triggers processing
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
    const parseResult = resumeSubmitRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.issues },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: 'Upload record not found', code: RESUME_ERROR_CODES.NOT_FOUND },
        { status: 404 }
      );
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

    // Verify file exists in R2
    const fileExists = await objectExists(resumeObjectKey);
    if (!fileExists) {
      return NextResponse.json(
        { error: 'Upload not found in storage. Please try uploading again.' },
        { status: 400 }
      );
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

    return NextResponse.json({
      feedbackId: feedbackRecord.id,
      status: inngestEventKey ? 'pending' : 'failed',
    });
  } catch (error) {
    console.error('Resume submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
