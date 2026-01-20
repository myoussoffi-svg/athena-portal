'use client';

import { useTrackProgress } from '@/lib/hooks/use-progress';
import { LessonCompleteButton } from './LessonCompleteButton';

interface LessonProgressWrapperProps {
  trackSlug: string;
  moduleSlug: string;
  lessonSlug: string;
}

export function LessonProgressWrapper({
  trackSlug,
  moduleSlug,
  lessonSlug,
}: LessonProgressWrapperProps) {
  const { isLessonComplete, markLessonComplete, unmarkLessonComplete, loading } =
    useTrackProgress(trackSlug);

  const isComplete = isLessonComplete(moduleSlug, lessonSlug);

  const handleToggle = async () => {
    if (isComplete) {
      return unmarkLessonComplete(moduleSlug, lessonSlug);
    } else {
      return markLessonComplete(moduleSlug, lessonSlug);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          padding: '20px 32px',
          background: 'rgba(10, 10, 10, 0.03)',
          borderRadius: 16,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <div
          style={{
            width: 180,
            height: 16,
            background: 'rgba(10, 10, 10, 0.08)',
            borderRadius: 8,
          }}
        />
        <div
          style={{
            width: 140,
            height: 44,
            background: 'rgba(10, 10, 10, 0.08)',
            borderRadius: 12,
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <LessonCompleteButton
      isComplete={isComplete}
      onToggle={handleToggle}
    />
  );
}
