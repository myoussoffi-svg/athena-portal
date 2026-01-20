import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { resumeFeedback } from '@/db/schema';
import { eq, ne, and, count } from 'drizzle-orm';
import { RESUME_QUOTA_LIMIT, RESUME_ERROR_CODES } from '@/lib/resume/schemas';

/**
 * GET /api/resume/quota
 * Returns the user's resume submission quota status
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', code: RESUME_ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    // Count non-failed submissions for this user
    const [result] = await db
      .select({ count: count() })
      .from(resumeFeedback)
      .where(
        and(
          eq(resumeFeedback.userId, userId),
          ne(resumeFeedback.status, 'failed')
        )
      );

    const used = result?.count ?? 0;

    return NextResponse.json({
      used,
      limit: RESUME_QUOTA_LIMIT,
      remaining: Math.max(0, RESUME_QUOTA_LIMIT - used),
    });
  } catch (error) {
    console.error('Quota check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
