'use client';

import type { Achievement } from '@/lib/outreach/schemas';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function AchievementBadge({ achievement, size = 'md', showLabel = true }: AchievementBadgeProps) {
  const sizes = {
    sm: { icon: 24, fontSize: 10, padding: 8 },
    md: { icon: 36, fontSize: 12, padding: 12 },
    lg: { icon: 48, fontSize: 14, padding: 16 },
  };

  const s = sizes[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: s.padding,
      }}
      title={achievement.description}
    >
      <div
        style={{
          width: s.icon + 16,
          height: s.icon + 16,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.1), rgba(65, 109, 137, 0.2))',
          border: '2px solid rgba(65, 109, 137, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: s.icon,
        }}
      >
        {achievement.icon}
      </div>
      {showLabel && (
        <span
          style={{
            fontSize: s.fontSize,
            fontWeight: 500,
            color: 'rgba(10, 10, 10, 0.7)',
            textAlign: 'center',
            maxWidth: 80,
          }}
        >
          {achievement.title}
        </span>
      )}
    </div>
  );
}

interface AchievementBadgeListProps {
  achievements: Achievement[];
  maxDisplay?: number;
}

export function AchievementBadgeList({ achievements, maxDisplay = 5 }: AchievementBadgeListProps) {
  const displayed = achievements.slice(0, maxDisplay);
  const remaining = achievements.length - maxDisplay;

  if (achievements.length === 0) {
    return (
      <div
        style={{
          padding: 16,
          textAlign: 'center',
          color: 'rgba(10, 10, 10, 0.4)',
          fontSize: 13,
        }}
      >
        No achievements yet. Keep networking!
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {displayed.map((achievement) => (
        <AchievementBadge
          key={achievement.type}
          achievement={achievement}
          size="sm"
          showLabel={false}
        />
      ))}
      {remaining > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(10, 10, 10, 0.05)',
            fontSize: 12,
            fontWeight: 500,
            color: 'rgba(10, 10, 10, 0.5)',
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
