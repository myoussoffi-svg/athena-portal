'use client';

import { useTrackProgress } from '@/lib/hooks/use-progress';
import { CheckCircle } from 'lucide-react';

interface LessonCompletionBadgeProps {
  trackSlug: string;
  moduleSlug: string;
  lessonSlug: string;
}

export function LessonCompletionBadge({
  trackSlug,
  moduleSlug,
  lessonSlug,
}: LessonCompletionBadgeProps) {
  const { isLessonComplete, loading } = useTrackProgress(trackSlug);

  const isComplete = isLessonComplete(moduleSlug, lessonSlug);

  if (loading || !isComplete) {
    return null;
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 10px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.15) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        color: 'rgb(16, 185, 129)',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }}
    >
      <CheckCircle size={12} />
      Completed
    </span>
  );
}
