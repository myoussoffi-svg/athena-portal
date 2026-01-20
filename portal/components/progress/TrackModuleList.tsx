'use client';

import Link from 'next/link';
import { useTrackProgress } from '@/lib/hooks/use-progress';
import { Check, BookOpen, Users, Calculator, TrendingUp, Clock, Trophy, Star, Play } from 'lucide-react';

interface Module {
  slug: string;
  title: string;
  description?: string;
}

interface TrackModuleListProps {
  trackSlug: string;
  modules: Module[];
}

// Map module slugs to icons and estimated times
// Order: #1 Fit, #2 Valuation, #3 Accounting, #4 LBO
const moduleConfig: Record<string, { icon: typeof BookOpen; time: string; number: number }> = {
  '01-fit-story-behavioral': { icon: Users, time: '3 hrs', number: 1 },
  '02-valuation-modeling': { icon: Calculator, time: '5 hrs', number: 2 },
  '03-accounting-foundations': { icon: BookOpen, time: '4 hrs', number: 3 },
  '04-lbos-advanced-topics': { icon: TrendingUp, time: '4 hrs', number: 4 },
};

const defaultConfig = { icon: BookOpen, time: '2 hrs', number: 0 };

export function TrackModuleList({ trackSlug, modules }: TrackModuleListProps) {
  const { loading, getModuleProgress } = useTrackProgress(trackSlug);

  // Calculate module completion status for journey visualization
  const moduleStatuses = modules.map((module) => {
    const mp = getModuleProgress(module.slug);
    const isComplete = mp && mp.lessonsCompleted === mp.totalLessons && mp.totalLessons > 0;
    const hasProgress = mp && mp.lessonsCompleted > 0;
    return { slug: module.slug, isComplete, hasProgress, progress: mp };
  });

  const completedCount = moduleStatuses.filter((m) => m.isComplete).length;
  const allComplete = completedCount === modules.length && modules.length > 0;

  // Find the recommended next module (first incomplete one)
  const recommendedIndex = moduleStatuses.findIndex((m) => !m.isComplete);
  const hasStarted = moduleStatuses.some((m) => m.hasProgress || m.isComplete);

  return (
    <div>
      {/* Journey Progress Visualization */}
      {!loading && modules.length > 0 && (
        <>
          <style>{`
            .journey-container {
              margin-bottom: 32px;
              padding: 24px;
              background: linear-gradient(135deg, rgba(65, 109, 137, 0.03) 0%, rgba(65, 109, 137, 0.06) 100%);
              border-radius: 16px;
              border: 1px solid rgba(65, 109, 137, 0.1);
            }
            .journey-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .journey-title {
              font-size: 14px;
              font-weight: 600;
              color: #0A0A0A;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .journey-stats {
              font-size: 13px;
              color: rgba(10, 10, 10, 0.6);
            }
            .journey-track {
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: relative;
              padding: 0 8px;
            }
            .journey-line {
              position: absolute;
              top: 50%;
              left: 24px;
              right: 24px;
              height: 4px;
              background: rgba(10, 10, 10, 0.08);
              border-radius: 2px;
              transform: translateY(-50%);
              z-index: 0;
            }
            .journey-line-fill {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              background: linear-gradient(90deg, #416D89 0%, #5a8aa8 100%);
              border-radius: 2px;
              transition: width 0.5s ease;
            }
            .journey-checkpoint {
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
            }
            .journey-node {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              border: 3px solid transparent;
            }
            .journey-node.pending {
              background: #FFFFFF;
              border-color: rgba(10, 10, 10, 0.15);
              color: rgba(10, 10, 10, 0.3);
            }
            .journey-node.in-progress {
              background: #FFFFFF;
              border-color: #416D89;
              color: #416D89;
              box-shadow: 0 0 0 4px rgba(65, 109, 137, 0.15);
            }
            .journey-node.complete {
              background: linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
              border-color: rgb(16, 185, 129);
              color: white;
              box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
            }
            .journey-label {
              font-size: 11px;
              font-weight: 500;
              color: rgba(10, 10, 10, 0.5);
              text-align: center;
              max-width: 80px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .journey-label.complete {
              color: rgb(16, 185, 129);
            }
            .journey-label.in-progress {
              color: #416D89;
              font-weight: 600;
            }
            .celebration-banner {
              margin-bottom: 24px;
              padding: 20px 24px;
              background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.12) 100%);
              border: 1px solid rgba(16, 185, 129, 0.25);
              border-radius: 16px;
              display: flex;
              align-items: center;
              gap: 16px;
              animation: celebrationPulse 2s ease-in-out infinite;
            }
            @keyframes celebrationPulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.2); }
              50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            }
            .celebration-icon {
              width: 48px;
              height: 48px;
              border-radius: 12px;
              background: linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              flex-shrink: 0;
            }
            .celebration-content {
              flex: 1;
            }
            .celebration-title {
              font-size: 16px;
              font-weight: 600;
              color: rgb(16, 185, 129);
              margin-bottom: 4px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .celebration-desc {
              font-size: 14px;
              color: rgba(10, 10, 10, 0.6);
            }
            .star-burst {
              position: absolute;
              animation: starFloat 3s ease-in-out infinite;
            }
            @keyframes starFloat {
              0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
              50% { transform: translateY(-4px) rotate(15deg); opacity: 1; }
            }
          `}</style>

          {/* Celebration Banner - shows when all modules complete */}
          {allComplete && (
            <div className="celebration-banner">
              <div className="celebration-icon">
                <Trophy size={24} />
              </div>
              <div className="celebration-content">
                <div className="celebration-title">
                  Course Complete!
                  <Star size={16} style={{ color: '#f59e0b' }} />
                </div>
                <div className="celebration-desc">
                  Congratulations! You&apos;ve mastered all {modules.length} modules. Ready to ace your interview.
                </div>
              </div>
            </div>
          )}

          {/* Journey Track */}
          <div className="journey-container">
            <div className="journey-header">
              <div className="journey-title">
                <span>📍</span> Your Progress
              </div>
              <div className="journey-stats">
                {completedCount} of {modules.length} modules complete
              </div>
            </div>

            <div className="journey-track">
              {/* Progress Line */}
              <div className="journey-line">
                <div
                  className="journey-line-fill"
                  style={{
                    width: modules.length > 1
                      ? `${(completedCount / (modules.length - 1)) * 100}%`
                      : completedCount > 0 ? '100%' : '0%'
                  }}
                />
              </div>

              {/* Checkpoints */}
              {modules.map((module, idx) => {
                const status = moduleStatuses[idx];
                const config = moduleConfig[module.slug] || defaultConfig;
                const moduleNumber = config.number || idx + 1;
                const nodeClass = status.isComplete
                  ? 'complete'
                  : status.hasProgress
                    ? 'in-progress'
                    : 'pending';

                return (
                  <div key={module.slug} className="journey-checkpoint">
                    <div className={`journey-node ${nodeClass}`}>
                      {status.isComplete ? (
                        <Check size={18} strokeWidth={3} />
                      ) : (
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{moduleNumber}</span>
                      )}
                    </div>
                    <div className={`journey-label ${nodeClass}`}>
                      Module {moduleNumber}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <style>{`
        .module-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(65, 109, 137, 0.25);
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .module-card:hover {
          transform: translateY(-2px);
          border-color: rgba(65, 109, 137, 0.5);
          box-shadow: 0 8px 24px rgba(65, 109, 137, 0.12);
        }
        .module-card.complete {
          background: rgba(16, 185, 129, 0.04);
          border-color: rgba(16, 185, 129, 0.3);
        }
        .module-card.complete:hover {
          border-color: rgba(16, 185, 129, 0.5);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.12);
        }
        .module-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.1) 0%, rgba(65, 109, 137, 0.15) 100%);
          border: 1px solid rgba(65, 109, 137, 0.15);
          color: #416D89;
        }
        .module-card.complete .module-icon-wrap {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.15) 100%);
          border-color: rgba(16, 185, 129, 0.2);
          color: rgb(16, 185, 129);
        }
        .module-mini-progress {
          height: 4px;
          background: rgba(10, 10, 10, 0.08);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 12px;
        }
        .module-mini-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #416D89 0%, #5a8aa8 100%);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .module-card.complete .module-mini-progress-fill {
          background: linear-gradient(90deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%);
        }
        .module-card.recommended {
          border-color: rgba(65, 109, 137, 0.4);
          box-shadow: 0 0 0 3px rgba(65, 109, 137, 0.08);
        }
        .module-card.recommended:hover {
          box-shadow: 0 0 0 3px rgba(65, 109, 137, 0.12), 0 8px 24px rgba(65, 109, 137, 0.12);
        }
        .recommended-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: #416D89;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(65, 109, 137, 0.1);
          padding: 4px 10px;
          border-radius: 999px;
          animation: recommendedPulse 2s ease-in-out infinite;
        }
        @keyframes recommendedPulse {
          0%, 100% { background: rgba(65, 109, 137, 0.1); }
          50% { background: rgba(65, 109, 137, 0.15); }
        }
        .section-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 32px 0 24px;
          color: rgba(10, 10, 10, 0.4);
        }
        .section-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.04) 100%);
        }
        .section-divider-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(10, 10, 10, 0.03);
          border: 1px solid rgba(10, 10, 10, 0.06);
        }
        .section-divider-text {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {modules.map((module, idx) => {
          const moduleProgress = getModuleProgress(module.slug);
          const isComplete =
            moduleProgress &&
            moduleProgress.lessonsCompleted === moduleProgress.totalLessons &&
            moduleProgress.totalLessons > 0;
          const progressPercent = moduleProgress && moduleProgress.totalLessons > 0
            ? (moduleProgress.lessonsCompleted / moduleProgress.totalLessons) * 100
            : 0;

          const config = moduleConfig[module.slug] || defaultConfig;
          const IconComponent = config.icon;
          const isRecommended = idx === recommendedIndex && !allComplete;

          // Build class names
          const cardClasses = [
            'module-card',
            isComplete ? 'complete' : '',
            isRecommended ? 'recommended' : '',
          ].filter(Boolean).join(' ');

          return (
            <Link
              key={module.slug}
              href={`/track/${trackSlug}/${module.slug}`}
              className={cardClasses}
            >
              <div className="module-icon-wrap">
                {isComplete ? <Check size={22} /> : <IconComponent size={22} />}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: isComplete ? 'rgb(16, 185, 129)' : '#416D89',
                          background: isComplete ? 'rgba(16, 185, 129, 0.1)' : 'rgba(65, 109, 137, 0.1)',
                          padding: '3px 8px',
                          borderRadius: 6,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Module {config.number || idx + 1}
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: '#0A0A0A',
                        }}
                      >
                        {module.title}
                      </span>
                    </div>
                    {module.description && (
                      <div
                        style={{
                          fontSize: 14,
                          color: 'rgba(10, 10, 10, 0.6)',
                          lineHeight: 1.5,
                        }}
                      >
                        {module.description}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 13,
                        color: 'rgba(10, 10, 10, 0.5)',
                      }}
                    >
                      <Clock size={14} />
                      <span>{config.time}</span>
                    </div>

                    {isRecommended && (
                      <span className="recommended-badge">
                        <Play size={10} />
                        {hasStarted ? 'Continue' : 'Start Here'}
                      </span>
                    )}

                    {isComplete && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'rgb(16, 185, 129)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          padding: '4px 10px',
                          borderRadius: 999,
                        }}
                      >
                        Complete
                      </span>
                    )}
                  </div>
                </div>

                {/* Mini Progress Bar */}
                <div className="module-mini-progress">
                  <div
                    className="module-mini-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Lesson count */}
                {!loading && moduleProgress && (
                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.5)' }}>
                      {moduleProgress.lessonsCompleted} of {moduleProgress.totalLessons} lessons completed
                    </span>
                    <span style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.4)' }}>
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
