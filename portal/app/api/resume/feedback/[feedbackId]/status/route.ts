import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { resumeFeedback } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { RESUME_ERROR_CODES, type ResumeFeedbackJson } from '@/lib/resume/schemas';

interface RouteParams {
  params: Promise<{ feedbackId: string }>;
}

/**
 * GET /api/resume/feedback/[feedbackId]/status
 * Returns the current processing status and feedback if complete
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', code: RESUME_ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const { feedbackId } = await params;

    // Find the feedback record
    const feedbackRecord = await db.query.resumeFeedback.findFirst({
      where: and(
        eq(resumeFeedback.id, feedbackId),
        eq(resumeFeedback.userId, userId)
      ),
    });

    if (!feedbackRecord) {
      return NextResponse.json(
        { error: 'Feedback not found', code: RESUME_ERROR_CODES.NOT_FOUND },
        { status: 404 }
      );
    }

    // Build response based on status
    const response: {
      id: string;
      status: typeof feedbackRecord.status;
      errorMessage?: string;
      feedback?: ResumeFeedbackJson;
      scores?: {
        overall: number;
        format: number;
        education: number;
        experience: number;
        skills: number;
        writing: number;
      };
      submittedAt?: string;
      completedAt?: string;
    } = {
      id: feedbackRecord.id,
      status: feedbackRecord.status,
    };

    // Add error message if failed
    if (feedbackRecord.status === 'failed' && feedbackRecord.errorMessage) {
      response.errorMessage = feedbackRecord.errorMessage;
    }

    // Add feedback and scores if complete
    if (feedbackRecord.status === 'complete') {
      if (feedbackRecord.feedbackJson) {
        response.feedback = feedbackRecord.feedbackJson as ResumeFeedbackJson;
      }

      if (feedbackRecord.overallScore10 !== null) {
        response.scores = {
          overall: feedbackRecord.overallScore10,
          format: feedbackRecord.scoreFormat ?? 0,
          education: feedbackRecord.scoreEducation ?? 0,
          experience: feedbackRecord.scoreExperience ?? 0,
          skills: feedbackRecord.scoreSkills ?? 0,
          writing: feedbackRecord.scoreWriting ?? 0,
        };
      }

      if (feedbackRecord.completedAt) {
        response.completedAt = feedbackRecord.completedAt.toISOString();
      }
    }

    // Add submission time if available
    if (feedbackRecord.submittedAt) {
      response.submittedAt = feedbackRecord.submittedAt.toISOString();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Feedback status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
