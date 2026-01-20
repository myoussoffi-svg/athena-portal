import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { quizQuestions, quizAttempts } from '@/db/schema';
import { eq, and, sql, desc } from 'drizzle-orm';

type RouteParams = { params: Promise<{ moduleSlug: string }> };

/**
 * GET /api/quiz/[moduleSlug]/progress
 *
 * Get user's quiz progress for a module
 *
 * Returns:
 * - totalQuestions: number
 * - attempted: number
 * - correct: number
 * - wrong: number
 * - accuracy: number (percentage)
 * - byDifficulty: { easy: {...}, medium: {...}, hard: {...} }
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { userId } = await auth();
  const { moduleSlug } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get total questions in module
    const [{ totalQuestions }] = await db
      .select({ totalQuestions: sql<number>`count(*)::int` })
      .from(quizQuestions)
      .where(eq(quizQuestions.moduleSlug, moduleSlug));

    // Get total questions by difficulty
    const questionsByDifficulty = await db
      .select({
        difficulty: quizQuestions.difficulty,
        count: sql<number>`count(*)::int`,
      })
      .from(quizQuestions)
      .where(eq(quizQuestions.moduleSlug, moduleSlug))
      .groupBy(quizQuestions.difficulty);

    // Get the most recent attempt for each question
    const latestAttempts = await db
      .selectDistinctOn([quizAttempts.questionId], {
        questionId: quizAttempts.questionId,
        isCorrect: quizAttempts.isCorrect,
      })
      .from(quizAttempts)
      .where(
        and(
          eq(quizAttempts.userId, userId),
          eq(quizAttempts.moduleSlug, moduleSlug)
        )
      )
      .orderBy(quizAttempts.questionId, desc(quizAttempts.attemptedAt));

    const attempted = latestAttempts.length;
    const correct = latestAttempts.filter((a) => a.isCorrect).length;
    const wrong = latestAttempts.filter((a) => !a.isCorrect).length;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    // Get question IDs by their difficulty to cross-reference with attempts
    const questionsWithDifficulty = await db
      .select({
        questionId: quizQuestions.questionId,
        difficulty: quizQuestions.difficulty,
      })
      .from(quizQuestions)
      .where(eq(quizQuestions.moduleSlug, moduleSlug));

    const questionDifficultyMap = new Map(
      questionsWithDifficulty.map((q) => [q.questionId, q.difficulty])
    );

    // Calculate stats by difficulty
    const byDifficulty: Record<
      string,
      { total: number; attempted: number; correct: number; accuracy: number }
    > = {};

    for (const diff of ['easy', 'medium', 'hard']) {
      const total = questionsByDifficulty.find((q) => q.difficulty === diff)?.count || 0;
      const diffAttempts = latestAttempts.filter(
        (a) => questionDifficultyMap.get(a.questionId) === diff
      );
      const diffCorrect = diffAttempts.filter((a) => a.isCorrect).length;

      byDifficulty[diff] = {
        total,
        attempted: diffAttempts.length,
        correct: diffCorrect,
        accuracy: diffAttempts.length > 0 ? Math.round((diffCorrect / diffAttempts.length) * 100) : 0,
      };
    }

    return NextResponse.json({
      totalQuestions,
      attempted,
      correct,
      wrong,
      accuracy,
      byDifficulty,
    });
  } catch (error) {
    console.error('Failed to fetch quiz progress:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

/**
 * DELETE /api/quiz/[moduleSlug]/progress
 *
 * Reset user's quiz progress for a module (wipe all answers)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { userId } = await auth();
  const { moduleSlug } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await db
      .delete(quizAttempts)
      .where(
        and(
          eq(quizAttempts.userId, userId),
          eq(quizAttempts.moduleSlug, moduleSlug)
        )
      );

    return NextResponse.json({ success: true, message: 'Progress reset successfully' });
  } catch (error) {
    console.error('Failed to reset quiz progress:', error);
    return NextResponse.json({ error: 'Failed to reset progress' }, { status: 500 });
  }
}
