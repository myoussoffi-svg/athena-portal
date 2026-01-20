import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { quizQuestions, quizAttempts } from '@/db/schema';
import { eq } from 'drizzle-orm';

type RouteParams = { params: Promise<{ moduleSlug: string }> };

/**
 * POST /api/quiz/[moduleSlug]/attempt
 *
 * Submit an answer to a quiz question
 *
 * Body:
 * - questionId: string
 * - selectedAnswer: 'A' | 'B' | 'C' | 'D'
 *
 * Returns:
 * - isCorrect: boolean
 * - correctAnswer: 'A' | 'B' | 'C' | 'D'
 * - explanation: string
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const { userId } = await auth();
  const { moduleSlug } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { questionId, selectedAnswer } = body;

  if (!questionId || !selectedAnswer) {
    return NextResponse.json(
      { error: 'Missing required fields: questionId, selectedAnswer' },
      { status: 400 }
    );
  }

  // Validate answer
  if (!['A', 'B', 'C', 'D'].includes(selectedAnswer)) {
    return NextResponse.json(
      { error: 'Invalid answer. Must be A, B, C, or D' },
      { status: 400 }
    );
  }

  try {
    // Fetch the question to get correct answer and explanation
    const [question] = await db
      .select({
        correctAnswer: quizQuestions.correctAnswer,
        explanation: quizQuestions.explanation,
      })
      .from(quizQuestions)
      .where(eq(quizQuestions.questionId, questionId));

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const isCorrect = selectedAnswer === question.correctAnswer;

    // Record the attempt
    await db.insert(quizAttempts).values({
      userId,
      questionId,
      moduleSlug,
      selectedAnswer: selectedAnswer as 'A' | 'B' | 'C' | 'D',
      isCorrect,
    });

    return NextResponse.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    });
  } catch (error) {
    console.error('Failed to submit quiz answer:', error);
    return NextResponse.json({ error: 'Failed to submit answer' }, { status: 500 });
  }
}
