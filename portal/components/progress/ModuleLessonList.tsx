'use client';

import Link from 'next/link';
import { useTrackProgress } from '@/lib/hooks/use-progress';
import { Check, Play, Clock, BookOpen, Trophy, Sparkles } from 'lucide-react';

interface Lesson {
  slug: string;
  title: string;
  description?: string;
}

interface ModuleLessonListProps {
  trackSlug: string;
  moduleSlug: string;
  lessons: Lesson[];
}

export function ModuleLessonList({
  trackSlug,
  moduleSlug,
  lessons,
}: ModuleLessonListProps) {
  const { getModuleProgress, isLessonComplete, loading } = useTrackProgress(trackSlug);

  const _moduleProgress = getModuleProgress(moduleSlug);

  // Calculate lesson statuses
  const lessonStatuses = lessons.map((lesson) => ({
    slug: lesson.slug,
    isComplete: isLessonComplete(moduleSlug, lesson.slug),
  }));

  const completedCount = lessonStatuses.filter((l) => l.isComplete).length;
  const allComplete = completedCount === lessons.length && lessons.length > 0;

  // Find the first incomplete lesson (the "continue" lesson)
  const continueIndex = lessonStatuses.findIndex((l) => !l.isComplete);
  const hasStarted = lessonStatuses.some((l) => l.isComplete);

  // Calculate progress percentage for the vertical line
  const progressPercent = lessons.length > 1
    ? (completedCount / (lessons.length - 1)) * 100
    : completedCount > 0 ? 100 : 0;

  return (
    <div>
      <style>{`
        .lesson-timeline {
          position: relative;
          padding-left: 32px;
        }
        .lesson-timeline-line {
          position: absolute;
          left: 15px;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background: rgba(10, 10, 10, 0.1);
          border-radius: 1px;
        }
        .lesson-timeline-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(180deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
          border-radius: 1px;
          transition: height 0.5s ease;
        }
        .lesson-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          margin-bottom: 8px;
          background: #FFFFFF;
          border: 1px solid rgba(10, 10, 10, 0.08);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .lesson-item:last-child {
          margin-bottom: 0;
        }
        .lesson-item:hover {
          border-color: rgba(65, 109, 137, 0.3);
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(10, 10, 10, 0.06);
        }
        .lesson-item.complete {
          background: rgba(16, 185, 129, 0.04);
          border-color: rgba(16, 185, 129, 0.2);
        }
        .lesson-item.complete:hover {
          border-color: rgba(16, 185, 129, 0.4);
        }
        .lesson-item.continue {
          border-color: rgba(65, 109, 137, 0.4);
          box-shadow: 0 0 0 3px rgba(65, 109, 137, 0.08);
        }
        .lesson-item.continue:hover {
          box-shadow: 0 0 0 3px rgba(65, 109, 137, 0.12), 0 4px 12px rgba(10, 10, 10, 0.06);
        }
        .lesson-node {
          position: absolute;
          left: -32px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          z-index: 1;
          transition: all 0.2s ease;
        }
        .lesson-node.pending {
          background: #FFFFFF;
          border: 2px solid rgba(10, 10, 10, 0.15);
          color: rgba(10, 10, 10, 0.4);
        }
        .lesson-node.continue {
          background: #FFFFFF;
          border: 2px solid #416D89;
          color: #416D89;
          box-shadow: 0 0 0 4px rgba(65, 109, 137, 0.15);
        }
        .lesson-node.complete {
          background: linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
          border: 2px solid rgb(16, 185, 129);
          color: white;
        }
        .lesson-content {
          flex: 1;
          min-width: 0;
        }
        .lesson-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .lesson-number {
          font-size: 10px;
          font-weight: 600;
          color: #416D89;
          background: rgba(65, 109, 137, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .lesson-item.complete .lesson-number {
          color: rgb(16, 185, 129);
          background: rgba(16, 185, 129, 0.08);
        }
        .lesson-title {
          font-size: 15px;
          font-weight: 600;
          color: rgba(10, 10, 10, 0.9);
        }
        .lesson-desc {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.55);
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .lesson-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lesson-meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: rgba(10, 10, 10, 0.45);
        }
        .lesson-meta-item svg {
          opacity: 0.7;
        }
        .lesson-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }
        .lesson-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .lesson-badge.complete {
          background: rgba(16, 185, 129, 0.1);
          color: rgb(16, 185, 129);
        }
        .lesson-badge.continue {
          background: rgba(65, 109, 137, 0.1);
          color: #416D89;
          animation: continuePulse 2s ease-in-out infinite;
        }
        @keyframes continuePulse {
          0%, 100% { background: rgba(65, 109, 137, 0.1); }
          50% { background: rgba(65, 109, 137, 0.18); }
        }
        .lesson-arrow {
          color: rgba(10, 10, 10, 0.25);
          transition: all 0.2s ease;
        }
        .lesson-item:hover .lesson-arrow {
          color: #416D89;
          transform: translateX(2px);
        }
        .progress-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.04) 0%, rgba(65, 109, 137, 0.08) 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          border: 1px solid rgba(65, 109, 137, 0.1);
        }
        .progress-summary.all-complete {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(52, 211, 153, 0.1) 100%);
          border-color: rgba(16, 185, 129, 0.2);
        }
        .progress-text {
          font-size: 14px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.7);
        }
        .progress-text strong {
          color: #416D89;
        }
        .progress-summary.all-complete .progress-text strong {
          color: rgb(16, 185, 129);
        }
        .progress-bar-wrap {
          width: 120px;
          height: 6px;
          background: rgba(10, 10, 10, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #416D89 0%, #5a8aa8 100%);
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        .progress-summary.all-complete .progress-bar-fill {
          background: linear-gradient(90deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
        }
        .celebration-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.12) 50%, rgba(16, 185, 129, 0.08) 100%);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          overflow: hidden;
        }
        .celebration-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
          opacity: 0.5;
        }
        .celebration-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 1;
        }
        .celebration-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
          animation: celebrationPulse 2s ease-in-out infinite;
        }
        @keyframes celebrationPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 6px 24px rgba(16, 185, 129, 0.4); }
        }
        .celebration-text {
          flex: 1;
        }
        .celebration-title {
          font-size: 18px;
          font-weight: 700;
          color: rgb(16, 185, 129);
          margin: 0 0 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .celebration-title svg {
          color: #f59e0b;
        }
        .celebration-desc {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.6);
          margin: 0;
          line-height: 1.5;
        }
        .celebration-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
          color: white;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .celebration-content {
            flex-direction: column;
            text-align: center;
          }
          .celebration-badge {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Celebration Banner - shows when all lessons complete */}
      {!loading && allComplete && (
        <div className="celebration-banner">
          <div className="celebration-content">
            <div className="celebration-icon">
              <Trophy size={28} />
            </div>
            <div className="celebration-text">
              <h3 className="celebration-title">
                Module Complete!
                <Sparkles size={18} />
              </h3>
              <p className="celebration-desc">
                Congratulations! You&apos;ve completed all {lessons.length} lessons in this module.
                Ready to test your knowledge?
              </p>
            </div>
            <div className="celebration-badge">
              <Check size={16} />
              {lessons.length}/{lessons.length} Lessons
            </div>
          </div>
        </div>
      )}

      {/* Progress Summary - shows when not all complete */}
      {!loading && !allComplete && (
        <div className="progress-summary">
          <span className="progress-text">
            <strong>{completedCount}</strong> of <strong>{lessons.length}</strong> lessons complete
          </span>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(completedCount / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Lesson Timeline */}
      <div className="lesson-timeline">
        {/* Vertical Progress Line */}
        <div className="lesson-timeline-line">
          <div
            className="lesson-timeline-fill"
            style={{ height: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>

        {/* Lesson Items */}
        {lessons.map((lesson, idx) => {
          const isComplete = lessonStatuses[idx]?.isComplete;
          const isContinue = idx === continueIndex && !allComplete;

          const itemClass = isComplete
            ? 'complete'
            : isContinue
              ? 'continue'
              : '';

          const nodeClass = isComplete
            ? 'complete'
            : isContinue
              ? 'continue'
              : 'pending';

          return (
            <Link
              key={lesson.slug}
              href={`/track/${trackSlug}/${moduleSlug}/${lesson.slug}`}
              className={`lesson-item ${itemClass}`}
            >
              <div className={`lesson-node ${nodeClass}`}>
                {isComplete ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  idx + 1
                )}
              </div>

              <div className="lesson-content">
                <div className="lesson-header">
                  <span className="lesson-number">Lesson {idx + 1}</span>
                </div>
                <div className="lesson-title">{lesson.title}</div>
                {lesson.description && (
                  <div className="lesson-desc">{lesson.description}</div>
                )}
                <div className="lesson-meta">
                  <span className="lesson-meta-item">
                    <BookOpen size={12} />
                    Reading
                  </span>
                  <span className="lesson-meta-item">
                    <Clock size={12} />
                    ~5 min
                  </span>
                </div>
              </div>

              <div className="lesson-badges">
                {isComplete && (
                  <span className="lesson-badge complete">
                    <Check size={10} /> Done
                  </span>
                )}

                {isContinue && (
                  <span className="lesson-badge continue">
                    <Play size={10} />
                    {hasStarted ? 'Continue' : 'Start'}
                  </span>
                )}

                <span className="lesson-arrow">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
