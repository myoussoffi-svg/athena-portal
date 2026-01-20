'use client';

import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { QuizResults } from './QuizResults';
import { QuizConfig } from './QuizConfig';

export interface QuizQuestion {
  questionId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionType: 'conceptual' | 'formulaic' | 'judgmental' | 'edge-case';
  topic: string | null;
}

interface QuizAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string;
}

interface QuizContainerProps {
  trackSlug: string;
  moduleSlug: string;
  moduleTitle: string;
  initialMode?: 'all' | 'new' | 'review';
}

type QuizState = 'config' | 'quiz' | 'results';

export function QuizContainer({
  trackSlug,
  moduleSlug,
  moduleTitle,
  initialMode = 'all',
}: QuizContainerProps) {
  const [state, setState] = useState<QuizState>('config');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quiz configuration
  const [config, setConfig] = useState({
    limit: 20,
    difficulty: 'mixed' as 'easy' | 'medium' | 'hard' | 'mixed',
    type: 'mixed' as 'conceptual' | 'formulaic' | 'judgmental' | 'edge-case' | 'mixed',
    mode: initialMode,
  });

  const handleAnswer = async (questionId: string, selectedAnswer: 'A' | 'B' | 'C' | 'D') => {
    try {
      const res = await fetch(`/api/quiz/${moduleSlug}/attempt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, selectedAnswer }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit answer');
      }

      const data = await res.json();

      const answer: QuizAnswer = {
        questionId,
        selectedAnswer,
        correctAnswer: data.correctAnswer,
        isCorrect: data.isCorrect,
        explanation: data.explanation,
      };

      setAnswers((prev) => [...prev, answer]);
      return answer;
    } catch {
      throw new Error('Failed to submit answer. Please try again.');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setState('results');
    }
  };

  const handleRestart = () => {
    setState('config');
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setError(null);
  };

  if (state === 'config') {
    return (
      <QuizConfig
        trackSlug={trackSlug}
        moduleSlug={moduleSlug}
        moduleTitle={moduleTitle}
        loading={loading}
        error={error}
        initialMode={initialMode}
        onStart={(newConfig) => {
          setConfig(newConfig);
          setLoading(true);
          setError(null);
          // Fetch questions with new config
          const params = new URLSearchParams({
            limit: newConfig.limit.toString(),
            difficulty: newConfig.difficulty,
            type: newConfig.type,
            mode: newConfig.mode,
          });
          fetch(`/api/quiz/${moduleSlug}/questions?${params}`)
            .then((res) => {
              if (!res.ok) throw new Error('Failed to fetch questions');
              return res.json();
            })
            .then((data) => {
              if (data.questions.length === 0) {
                if (newConfig.mode === 'review') {
                  setError('No wrong answers to review. Great job!');
                } else if (newConfig.mode === 'new') {
                  setError('You have attempted all available questions. Try "All Questions" mode or reset your progress.');
                } else {
                  setError('No questions available for this module yet.');
                }
                return;
              }
              setQuestions(data.questions);
              setCurrentIndex(0);
              setAnswers([]);
              setState('quiz');
            })
            .catch(() => {
              setError('Failed to load questions. Please try again.');
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
    );
  }

  if (state === 'results') {
    return (
      <QuizResults
        questions={questions}
        answers={answers}
        trackSlug={trackSlug}
        moduleSlug={moduleSlug}
        onRestart={handleRestart}
        onReviewMistakes={() => {
          setConfig({ ...config, mode: 'review' });
          handleRestart();
        }}
      />
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.questionId);

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={currentIndex + 1}
      totalQuestions={questions.length}
      answer={currentAnswer}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  );
}
