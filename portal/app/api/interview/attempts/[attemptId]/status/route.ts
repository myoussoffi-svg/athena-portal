import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { interviewAttempts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    // 1. Require authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { attemptId } = await params;

    // 2. Find the attempt and verify ownership
    const attempt = await db.query.interviewAttempts.findFirst({
      where: and(
        eq(interviewAttempts.id, attemptId),
        eq(interviewAttempts.candidateId, userId)
      ),
    });

    if (!attempt) {
      return NextResponse.json({ error: 'ATTEMPT_NOT_FOUND' }, { status: 404 });
    }

    // 3. Build response based on status
    const response: {
      status: string;
      processingStage: string | null;
      feedback?: unknown;
      hireInclination?: string | null;
      errorMessage?: string | null;
    } = {
      status: attempt.status,
      processingStage: attempt.processingStage,
    };

    if (attempt.status === 'complete') {
      response.feedback = attempt.feedbackJson;
      response.hireInclination = attempt.hireInclination;
    }

    if (attempt.status === 'failed') {
      response.errorMessage = attempt.errorMessage;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
