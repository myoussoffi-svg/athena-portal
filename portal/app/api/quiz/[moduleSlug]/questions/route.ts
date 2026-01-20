import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { quizQuestions, quizAttempts } from '@/db/schema';
import { eq, and, sql, desc, notInArray, inArray } from 'drizzle-orm';

type RouteParams = { params: Promise<{ moduleSlug: string }> };

/**
 * GET /api/quiz/[moduleSlug]/questions
 *
 * Get quiz questions for a module
 *
 * Query params:
 * - limit: number of questions (default: 20)
 * - difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
 * - type: 'conceptual' | 'formulaic' | 'judgmental' | 'edge-case' | 'mixed'
 * - mode: 'new' | 'all' | 'review' (default: 'all')
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { userId } = await auth();
  const { moduleSlug } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const difficulty = searchParams.get('difficulty') || 'mixed';
  const questionType = searchParams.get('type') || 'mixed';
  const mode = searchParams.get('mode') || 'all';

  try {
    // Build base query conditions
    const conditions = [eq(quizQuestions.moduleSlug, moduleSlug)];

    // Add difficulty filter if not mixed
    if (difficulty !== 'mixed') {
      conditions.push(eq(quizQuestions.difficulty, difficulty as 'easy' | 'medium' | 'hard'));
    }

    // Add question type filter if not mixed
    if (questionType !== 'mixed') {
      conditions.push(
        eq(quizQuestions.questionType, questionType as 'conceptual' | 'formulaic' | 'judgmental' | 'edge-case')
      );
    }

    // Handle different modes
    if (mode === 'new') {
      // Get questions that user hasn't attempted
      const attemptedQuestionIds = await db
        .selectDistinct({ questionId: quizAttempts.questionId })
        .from(quizAttempts)
        .where(
          and(eq(quizAttempts.userId, userId), eq(quizAttempts.moduleSlug, moduleSlug))
        );

      const attemptedIds = attemptedQuestionIds.map((a) => a.questionId);

      if (attemptedIds.length > 0) {
        conditions.push(notInArray(quizQuestions.questionId, attemptedIds));
      }
    } else if (mode === 'review') {
      // Get questions user got wrong (most recent attempt)
      const wrongQuestions = await db
        .selectDistinctOn([quizAttempts.questionId], {
          questionId: quizAttempts.questionId,
          isCorrect: quizAttempts.isCorrect,
        })
        .from(quizAttempts)
        .where(
          and(eq(quizAttempts.userId, userId), eq(quizAttempts.moduleSlug, moduleSlug))
        )
        .orderBy(quizAttempts.questionId, desc(quizAttempts.attemptedAt));

      const wrongIds = wrongQuestions.filter((q) => !q.isCorrect).map((q) => q.questionId);

      if (wrongIds.length === 0) {
        return NextResponse.json({ questions: [], total: 0 });
      }

      // Only get questions that were wrong
      const questions = await db
        .select({
          questionId: quizQuestions.questionId,
          question: quizQuestions.question,
          optionA: quizQuestions.optionA,
          optionB: quizQuestions.optionB,
          optionC: quizQuestions.optionC,
          optionD: quizQuestions.optionD,
          difficulty: quizQuestions.difficulty,
          questionType: quizQuestions.questionType,
          topic: quizQuestions.topic,
        })
        .from(quizQuestions)
        .where(
          and(
            eq(quizQuestions.moduleSlug, moduleSlug),
            inArray(quizQuestions.questionId, wrongIds)
          )
        )
        .orderBy(sql`RANDOM()`)
        .limit(limit);

      return NextResponse.json({ questions, total: wrongIds.length });
    }

    // Fetch questions with randomization
    const questions = await db
      .select({
        questionId: quizQuestions.questionId,
        question: quizQuestions.question,
        optionA: quizQuestions.optionA,
        optionB: quizQuestions.optionB,
        optionC: quizQuestions.optionC,
        optionD: quizQuestions.optionD,
        difficulty: quizQuestions.difficulty,
        questionType: quizQuestions.questionType,
        topic: quizQuestions.topic,
      })
      .from(quizQuestions)
      .where(and(...conditions))
      .orderBy(sql`RANDOM()`)
      .limit(limit);

    // Get total count for this module
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(quizQuestions)
      .where(eq(quizQuestions.moduleSlug, moduleSlug));

    return NextResponse.json({ questions, total: count });
  } catch (error) {
    console.error('Failed to fetch quiz questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
