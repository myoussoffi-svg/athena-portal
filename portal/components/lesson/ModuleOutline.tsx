'use client';

import Link from 'next/link';
import { useTrackProgress } from '@/lib/hooks/use-progress';
import { Check } from 'lucide-react';

interface Lesson {
  slug: string;
  title: string;
}

interface ModuleOutlineProps {
  trackSlug: string;
  moduleSlug: string;
  moduleTitle: string;
  lessons: Lesson[];
  currentLessonSlug: string;
}

export function ModuleOutline({
  trackSlug,
  moduleSlug,
  moduleTitle,
  lessons,
  currentLessonSlug,
}: ModuleOutlineProps) {
  const { isLessonComplete, loading } = useTrackProgress(trackSlug);

  return (
    <aside
      style={{
        position: 'sticky',
        top: 24,
        width: 260,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: '16px',
          background: 'rgba(10, 10, 10, 0.02)',
          borderRadius: 12,
          border: '1px solid rgba(10, 10, 10, 0.06)',
        }}
      >
        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'rgba(10, 10, 10, 0.5)',
          }}
        >
          {moduleTitle}
        </h3>

        <nav>
          <ol
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {lessons.map((lesson, idx) => {
              const isCurrent = lesson.slug === currentLessonSlug;
              const isComplete = !loading && isLessonComplete(moduleSlug, lesson.slug);

              return (
                <li key={lesson.slug}>
                  <Link
                    href={`/track/${trackSlug}/${moduleSlug}/${lesson.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '8px 10px',
                      marginLeft: -10,
                      marginRight: -10,
                      borderRadius: 6,
                      textDecoration: 'none',
                      background: isCurrent ? 'rgba(65, 109, 137, 0.08)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 20,
                        height: 20,
                        borderRadius: '50%',
                        fontSize: 10,
                        fontWeight: 500,
                        background: isComplete
                          ? 'rgb(16, 185, 129)'
                          : isCurrent
                          ? 'rgba(65, 109, 137, 0.15)'
                          : 'rgba(10, 10, 10, 0.08)',
                        color: isComplete
                          ? 'white'
                          : isCurrent
                          ? 'rgba(65, 109, 137, 1)'
                          : 'rgba(10, 10, 10, 0.5)',
                      }}
                    >
                      {isComplete ? <Check size={12} /> : idx + 1}
                    </span>

                    <span
                      style={{
                        fontSize: 13,
                        lineHeight: 1.4,
                        color: isCurrent
                          ? 'rgba(10, 10, 10, 0.9)'
                          : 'rgba(10, 10, 10, 0.65)',
                        fontWeight: isCurrent ? 500 : 400,
                      }}
                    >
                      {lesson.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
