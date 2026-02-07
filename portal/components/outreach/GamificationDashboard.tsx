'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GamificationStats, Achievement } from '@/lib/outreach/schemas';
import { StreakIndicator } from './StreakIndicator';
import { AchievementBadgeList } from './AchievementBadge';
import { MilestoneProgress } from './MilestoneProgress';
import { AchievementCelebration } from './AchievementCelebration';
import { Leaderboard } from './Leaderboard';

interface GamificationDashboardProps {
  onStatsLoaded?: (stats: GamificationStats) => void;
}

export function GamificationDashboard({ onStatsLoaded }: GamificationDashboardProps) {
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [celebratingAchievement, setCelebratingAchievement] = useState<Achievement | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/outreach/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');

      const data = await response.json();
      setStats(data);
      onStatsLoaded?.(data);

      // Check for uncelebrated achievements
      if (data.uncelebratedAchievements?.length > 0) {
        setCelebratingAchievement(data.uncelebratedAchievements[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
    } finally {
      setIsLoading(false);
    }
  }, [onStatsLoaded]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleCelebrationDismiss = () => {
    setCelebratingAchievement(null);

    // If there are more achievements to celebrate, show the next one
    if (stats?.uncelebratedAchievements && stats.uncelebratedAchievements.length > 1) {
      const remaining = stats.uncelebratedAchievements.slice(1);
      setStats({
        ...stats,
        uncelebratedAchievements: remaining,
      });
      setTimeout(() => {
        setCelebratingAchievement(remaining[0]);
      }, 500);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          padding: 16,
          background: 'rgba(10, 10, 10, 0.02)',
          borderRadius: 14,
          marginBottom: 20,
        }}
      >
        <div style={{ color: 'rgba(10, 10, 10, 0.4)', fontSize: 13 }}>Loading stats...</div>
      </div>
    );
  }

  if (error || !stats) {
    return null; // Fail silently - gamification is not critical
  }

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.08), rgba(65, 109, 137, 0.02))',
          borderRadius: 14,
          border: '1px solid rgba(65, 109, 137, 0.15)',
          marginBottom: 20,
          overflow: 'hidden',
        }}
      >
        {/* Header row - always visible */}
        <div
          style={{
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Points */}
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#416D89' }}>
                {stats.totalPoints.toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(10, 10, 10, 0.5)' }}>Total Points</div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 32,
                background: 'rgba(10, 10, 10, 0.1)',
              }}
            />

            {/* This week */}
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'rgba(10, 10, 10, 0.8)' }}>
                +{stats.currentWeekPoints}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(10, 10, 10, 0.5)' }}>This Week</div>
            </div>

            {/* Streak */}
            {stats.currentStreak > 0 && (
              <>
                <div
                  style={{
                    width: 1,
                    height: 32,
                    background: 'rgba(10, 10, 10, 0.1)',
                  }}
                />
                <StreakIndicator streak={stats.currentStreak} size="sm" />
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLeaderboardOpen(true);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid rgba(65, 109, 137, 0.3)',
                background: 'transparent',
                color: '#416D89',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              🏆 Leaderboard
            </button>
            <span
              style={{
                fontSize: 16,
                color: 'rgba(10, 10, 10, 0.3)',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease',
              }}
            >
              ▼
            </span>
          </div>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div
            style={{
              padding: '0 16px 16px',
              borderTop: '1px solid rgba(10, 10, 10, 0.06)',
              paddingTop: 16,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              {/* Stats grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 12,
                }}
              >
                <StatCard label="Contacts Added" value={stats.totalContactsAdded} />
                <StatCard label="Emails Sent" value={stats.totalEmailsSent} />
                <StatCard label="Responses" value={stats.totalResponses} />
                <StatCard label="Calls Completed" value={stats.totalCalls} />
              </div>

              {/* Achievements */}
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(10, 10, 10, 0.5)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Achievements
                </div>
                <AchievementBadgeList achievements={stats.achievements} maxDisplay={6} />
              </div>

              {/* Next milestone */}
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(10, 10, 10, 0.5)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Next Goal
                </div>
                <MilestoneProgress milestone={stats.nextMilestone} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Achievement celebration modal */}
      <AchievementCelebration
        achievement={celebratingAchievement}
        onDismiss={handleCelebrationDismiss}
      />

      {/* Leaderboard modal */}
      <Leaderboard isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: 12,
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 8,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(10, 10, 10, 0.8)' }}>
        {value.toLocaleString()}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(10, 10, 10, 0.5)' }}>{label}</div>
    </div>
  );
}
