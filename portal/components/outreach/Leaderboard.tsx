'use client';

import { useState, useEffect } from 'react';
import type { LeaderboardResponse, LeaderboardEntry } from '@/lib/outreach/schemas';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'allTime' | 'thisMonth' | 'streaks';

export function Leaderboard({ isOpen, onClose }: LeaderboardProps) {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('allTime');

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/outreach/leaderboard?limit=20');
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'allTime', label: 'All Time' },
    { key: 'thisMonth', label: 'This Month' },
    { key: 'streaks', label: 'Streaks' },
  ];

  const getEntries = (): LeaderboardEntry[] => {
    if (!data) return [];
    return data[activeTab] || [];
  };

  const getUserRank = (): number | null => {
    if (!data) return null;
    return data.userRank[activeTab];
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: '100%',
          maxWidth: 480,
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(10, 10, 10, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🏆</span> Leaderboard
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer',
              color: 'rgba(10, 10, 10, 0.4)',
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(10, 10, 10, 0.08)',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid #416D89' : '2px solid transparent',
                color: activeTab === tab.key ? '#416D89' : 'rgba(10, 10, 10, 0.5)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {isLoading && (
            <div style={{ textAlign: 'center', padding: 40, color: 'rgba(10, 10, 10, 0.5)' }}>
              Loading...
            </div>
          )}

          {error && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 8,
                background: 'rgba(220, 38, 38, 0.08)',
                color: '#dc2626',
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          {!isLoading && !error && (
            <>
              {getEntries().length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, color: 'rgba(10, 10, 10, 0.5)' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                  <div>No data yet. Start networking to appear on the leaderboard!</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {getEntries().map((entry) => (
                    <LeaderboardRow
                      key={entry.userId}
                      entry={entry}
                      showStreak={activeTab === 'streaks'}
                    />
                  ))}
                </div>
              )}

              {getUserRank() && getUserRank()! > 10 && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 12,
                    background: 'rgba(65, 109, 137, 0.08)',
                    borderRadius: 8,
                    textAlign: 'center',
                    fontSize: 13,
                    color: '#416D89',
                  }}
                >
                  Your rank: #{getUserRank()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({
  entry,
  showStreak,
}: {
  entry: LeaderboardEntry;
  showStreak: boolean;
}) {
  const getRankStyle = (rank: number): React.CSSProperties => {
    if (rank === 1) {
      return {
        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        color: '#fff',
      };
    }
    if (rank === 2) {
      return {
        background: 'linear-gradient(135deg, #94a3b8, #64748b)',
        color: '#fff',
      };
    }
    if (rank === 3) {
      return {
        background: 'linear-gradient(135deg, #cd7c2f, #a85c20)',
        color: '#fff',
      };
    }
    return {
      background: 'rgba(10, 10, 10, 0.08)',
      color: 'rgba(10, 10, 10, 0.6)',
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 10,
        background: entry.isCurrentUser ? 'rgba(65, 109, 137, 0.08)' : 'transparent',
        border: entry.isCurrentUser ? '1px solid rgba(65, 109, 137, 0.2)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 600,
          ...getRankStyle(entry.rank),
        }}
      >
        {entry.rank}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: entry.isCurrentUser ? 600 : 500,
            color: entry.isCurrentUser ? '#416D89' : 'rgba(10, 10, 10, 0.8)',
          }}
        >
          {entry.displayName}
          {entry.isCurrentUser && ' (You)'}
        </div>
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: showStreak ? '#ea580c' : '#416D89',
        }}
      >
        {showStreak ? (
          <>🔥 {entry.currentStreak} wks</>
        ) : (
          <>{entry.totalPoints.toLocaleString()} pts</>
        )}
      </div>
    </div>
  );
}
