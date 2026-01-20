'use client';

import { useState } from 'react';
import { QuizQuestion } from './QuizContainer';

interface QuizAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string;
}

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  answer: QuizAnswer | undefined;
  onAnswer: (questionId: string, selectedAnswer: 'A' | 'B' | 'C' | 'D') => Promise<QuizAnswer>;
  onNext: () => void;
}

const difficultyColors = {
  easy: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)', text: '#16a34a' },
  medium: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', text: '#d97706' },
  hard: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)', text: '#dc2626' },
};

const typeLabels = {
  conceptual: 'Conceptual',
  formulaic: 'Formulaic',
  judgmental: 'Judgmental',
  'edge-case': 'Edge Case',
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [localAnswer, setLocalAnswer] = useState<QuizAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentAnswer = answer || localAnswer;
  const isAnswered = currentAnswer !== null;
  const diffColor = difficultyColors[question.difficulty];

  const options: Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }> = [
    { key: 'A', text: question.optionA },
    { key: 'B', text: question.optionB },
    { key: 'C', text: question.optionC },
    { key: 'D', text: question.optionD },
  ];

  async function handleSubmit() {
    if (!selectedOption) return;

    setSubmitting(true);
    setError(null);

    try {
      const result = await onAnswer(question.questionId, selectedOption);
      setLocalAnswer(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    setSelectedOption(null);
    setLocalAnswer(null);
    setError(null);
    onNext();
  }

  function getOptionStyle(optionKey: 'A' | 'B' | 'C' | 'D'): React.CSSProperties {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 10,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'rgba(10, 10, 10, 0.08)',
      background: '#FFFFFF',
      cursor: isAnswered ? 'default' : 'pointer',
      transition: 'all 0.15s',
      textAlign: 'left',
      width: '100%',
      fontSize: 14,
      lineHeight: 1.5,
    };

    if (isAnswered) {
      const wasSelected = currentAnswer.selectedAnswer === optionKey;
      const isCorrect = currentAnswer.correctAnswer === optionKey;

      if (isCorrect) {
        return {
          ...baseStyle,
          background: 'rgba(34, 197, 94, 0.08)',
          borderColor: 'rgba(34, 197, 94, 0.5)',
        };
      } else if (wasSelected && !currentAnswer.isCorrect) {
        return {
          ...baseStyle,
          background: 'rgba(239, 68, 68, 0.08)',
          borderColor: 'rgba(239, 68, 68, 0.5)',
        };
      }

      return {
        ...baseStyle,
        opacity: 0.6,
      };
    }

    if (selectedOption === optionKey) {
      return {
        ...baseStyle,
        borderColor: '#416D89',
        background: 'rgba(65, 109, 137, 0.05)',
      };
    }

    return baseStyle;
  }

  return (
    <div
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: '20px',
      }}
    >
      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.6)' }}>
            Question {questionNumber} of {totalQuestions}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                background: diffColor.bg,
                border: `1px solid ${diffColor.border}`,
                color: diffColor.text,
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {question.difficulty}
            </span>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(10, 10, 10, 0.04)',
                border: '1px solid rgba(10, 10, 10, 0.08)',
                color: 'rgba(10, 10, 10, 0.65)',
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {typeLabels[question.questionType]}
            </span>
          </div>
        </div>
        <div
          style={{
            height: 4,
            borderRadius: 2,
            background: 'rgba(10, 10, 10, 0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(questionNumber / totalQuestions) * 100}%`,
              background: '#416D89',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(10, 10, 10, 0.08)',
          borderRadius: 14,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            margin: '0 0 20px',
            fontSize: 17,
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#0A0A0A',
          }}
        >
          {question.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'grid', gap: 10 }}>
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => !isAnswered && setSelectedOption(option.key)}
              disabled={isAnswered}
              style={getOptionStyle(option.key)}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 28,
                  height: 28,
                  borderRadius: 6,
                  background:
                    isAnswered && currentAnswer.correctAnswer === option.key
                      ? 'rgba(34, 197, 94, 0.2)'
                      : isAnswered && currentAnswer.selectedAnswer === option.key && !currentAnswer.isCorrect
                      ? 'rgba(239, 68, 68, 0.2)'
                      : selectedOption === option.key
                      ? 'rgba(65, 109, 137, 0.15)'
                      : 'rgba(10, 10, 10, 0.04)',
                  fontSize: 13,
                  fontWeight: 600,
                  color:
                    isAnswered && currentAnswer.correctAnswer === option.key
                      ? '#16a34a'
                      : isAnswered && currentAnswer.selectedAnswer === option.key && !currentAnswer.isCorrect
                      ? '#dc2626'
                      : selectedOption === option.key
                      ? '#416D89'
                      : 'rgba(10, 10, 10, 0.65)',
                }}
              >
                {option.key}
              </span>
              <span style={{ color: '#0A0A0A' }}>{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div
          style={{
            background: currentAnswer.isCorrect ? 'rgba(34, 197, 94, 0.06)' : 'rgba(239, 68, 68, 0.06)',
            border: `1px solid ${currentAnswer.isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
            borderRadius: 14,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: currentAnswer.isCorrect ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                fontSize: 14,
              }}
            >
              {currentAnswer.isCorrect ? '✓' : '✗'}
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: currentAnswer.isCorrect ? '#16a34a' : '#dc2626',
              }}
            >
              {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>

          {!currentAnswer.isCorrect && (
            <p
              style={{
                margin: '0 0 12px',
                fontSize: 13,
                color: 'rgba(10, 10, 10, 0.65)',
              }}
            >
              You selected <strong>{currentAnswer.selectedAnswer}</strong>. The correct answer is{' '}
              <strong>{currentAnswer.correctAnswer}</strong>.
            </p>
          )}

          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: '#0A0A0A',
            }}
          >
            {currentAnswer.explanation}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#dc2626',
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || submitting}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              background: selectedOption && !submitting ? '#416D89' : 'rgba(10, 10, 10, 0.1)',
              border: 'none',
              color: selectedOption && !submitting ? '#FFFFFF' : 'rgba(10, 10, 10, 0.4)',
              fontSize: 14,
              fontWeight: 600,
              cursor: selectedOption && !submitting ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Answer'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              background: '#416D89',
              border: 'none',
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {questionNumber < totalQuestions ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
