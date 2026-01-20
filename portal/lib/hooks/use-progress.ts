'use client';

import { useState, useEffect, useCallback } from 'react';

interface ModuleProgress {
  moduleSlug: string;
  lessonsCompleted: number;
  totalLessons: number;
  completedLessonSlugs: string[];
  interviewCompleted: boolean;
  lastInterviewResult: 'hire' | 'borderline' | 'no_hire' | null;
}

interface TrackProgress {
  trackSlug: string;
  modules: ModuleProgress[];
  totalLessonsCompleted: number;
  totalLessons: number;
  modulesWithAllLessonsComplete: number;
  totalModules: number;
}

export function useTrackProgress(trackSlug: string) {
  const [progress, setProgress] = useState<TrackProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/progress/${trackSlug}`);
      if (!response.ok) {
        if (response.status === 401) {
          // User not logged in, return empty progress
          setProgress(null);
          return;
        }
        throw new Error('Failed to fetch progress');
      }
      const data = await response.json();
      setProgress(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [trackSlug]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markLessonComplete = useCallback(
    async (moduleSlug: string, lessonSlug: string) => {
      try {
        const response = await fetch('/api/progress/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackSlug, moduleSlug, lessonSlug }),
        });

        if (!response.ok) {
          throw new Error('Failed to mark lesson complete');
        }

        // Optimistically update local state
        setProgress((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            totalLessonsCompleted: prev.totalLessonsCompleted + 1,
            modules: prev.modules.map((m) => {
              if (m.moduleSlug !== moduleSlug) return m;
              if (m.completedLessonSlugs.includes(lessonSlug)) return m;

              const newCompleted = [...m.completedLessonSlugs, lessonSlug];
              return {
                ...m,
                lessonsCompleted: newCompleted.length,
                completedLessonSlugs: newCompleted,
              };
            }),
          };
        });

        return true;
      } catch (err) {
        console.error('Failed to mark lesson complete:', err);
        return false;
      }
    },
    [trackSlug]
  );

  const unmarkLessonComplete = useCallback(
    async (moduleSlug: string, lessonSlug: string) => {
      try {
        const response = await fetch('/api/progress/complete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackSlug, moduleSlug, lessonSlug }),
        });

        if (!response.ok) {
          throw new Error('Failed to unmark lesson complete');
        }

        // Optimistically update local state
        setProgress((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            totalLessonsCompleted: Math.max(0, prev.totalLessonsCompleted - 1),
            modules: prev.modules.map((m) => {
              if (m.moduleSlug !== moduleSlug) return m;

              const newCompleted = m.completedLessonSlugs.filter(
                (s) => s !== lessonSlug
              );
              return {
                ...m,
                lessonsCompleted: newCompleted.length,
                completedLessonSlugs: newCompleted,
              };
            }),
          };
        });

        return true;
      } catch (err) {
        console.error('Failed to unmark lesson complete:', err);
        return false;
      }
    },
    [trackSlug]
  );

  const isLessonComplete = useCallback(
    (moduleSlug: string, lessonSlug: string) => {
      if (!progress) return false;
      const moduleData = progress.modules.find((m) => m.moduleSlug === moduleSlug);
      return moduleData?.completedLessonSlugs.includes(lessonSlug) ?? false;
    },
    [progress]
  );

  const getModuleProgress = useCallback(
    (moduleSlug: string) => {
      if (!progress) return null;
      return progress.modules.find((m) => m.moduleSlug === moduleSlug) ?? null;
    },
    [progress]
  );

  return {
    progress,
    loading,
    error,
    markLessonComplete,
    unmarkLessonComplete,
    isLessonComplete,
    getModuleProgress,
    refetch: fetchProgress,
  };
}
