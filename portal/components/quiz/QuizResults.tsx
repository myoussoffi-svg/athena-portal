'use client';

import Link from 'next/link';
import { QuizQuestion } from './QuizContainer';

interface QuizAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string;
}

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  trackSlug: string;
  moduleSlug: string;
  onRestart: () => void;
  onReviewMistakes: () => void;
}

export function QuizResults({
  questions,
  answers,
  trackSlug,
  moduleSlug,
  onRestart,
  onReviewMistakes,
}: QuizResultsProps) {
  const totalQuestions = questions.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const wrongCount = answers.filter((a) => !a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Group by difficulty
  const byDifficulty: Record<string, { total: number; correct: number }> = {
    easy: { total: 0, correct: 0 },
    medium: { total: 0, correct: 0 },
    hard: { total: 0, correct: 0 },
  };

  questions.forEach((q) => {
    const answer = answers.find((a) => a.questionId === q.questionId);
    if (answer) {
      byDifficulty[q.difficulty].total++;
      if (answer.isCorrect) {
        byDifficulty[q.difficulty].correct++;
      }
    }
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#16a34a';
    if (score >= 60) return '#d97706';
    return '#dc2626';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent work!';
    if (score >= 80) return 'Great job!';
    if (score >= 70) return 'Good effort!';
    if (score >= 60) return 'Keep practicing!';
    return 'More review needed';
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${getScoreColor(accuracy)}15, ${getScoreColor(accuracy)}25)`,
            border: `3px solid ${getScoreColor(accuracy)}`,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: getScoreColor(accuracy),
            }}
          >
            {accuracy}%
          </span>
        </div>

        <h1
          style={{
            margin: '0 0 8px',
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          Quiz Complete!
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            color: getScoreColor(accuracy),
            fontWeight: 500,
          }}
        >
          {getScoreMessage(accuracy)}
        </p>
      </div>

      {/* Score breakdown */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(10, 10, 10, 0.08)',
          borderRadius: 14,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            margin: '0 0 16px',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Score Breakdown
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#0A0A0A' }}>
              {correctCount}/{totalQuestions}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.6)' }}>Correct</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#16a34a' }}>{correctCount}</div>
            <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.6)' }}>Right</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#dc2626' }}>{wrongCount}</div>
            <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.6)' }}>Wrong</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(10, 10, 10, 0.06)', paddingTop: 16 }}>
          <h3
            style={{
              margin: '0 0 12px',
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(10, 10, 10, 0.75)',
            }}
          >
            By Difficulty
          </h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {(['easy', 'medium', 'hard'] as const).map((diff) => {
              const { total, correct } = byDifficulty[diff];
              if (total === 0) return null;
              const pct = Math.round((correct / total) * 100);

              const colors = {
                easy: '#16a34a',
                medium: '#d97706',
                hard: '#dc2626',
              };

              return (
                <div
                  key={diff}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: 'rgba(10, 10, 10, 0.02)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      color: colors[diff],
                    }}
                  >
                    {diff}
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.7)' }}>
                    {correct}/{total} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gap: 10 }}>
        {wrongCount > 0 && (
          <button
            onClick={onReviewMistakes}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 10,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#dc2626',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Review Mistakes ({wrongCount})
          </button>
        )}

        <button
          onClick={onRestart}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 10,
            background: '#416D89',
            border: 'none',
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          Take Another Quiz
        </button>

        <Link
          href={`/track/${trackSlug}/${moduleSlug}`}
          style={{
            display: 'block',
            width: '100%',
            padding: '14px 20px',
            borderRadius: 10,
            background: 'transparent',
            border: '1px solid rgba(10, 10, 10, 0.12)',
            color: 'rgba(10, 10, 10, 0.7)',
            fontSize: 14,
            fontWeight: 500,
            textAlign: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
            boxSizing: 'border-box',
          }}
        >
          Back to Module
        </Link>
      </div>
    </div>
  );
}
