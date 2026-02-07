'use client';

interface StreakIndicatorProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakIndicator({ streak, size = 'md' }: StreakIndicatorProps) {
  if (streak <= 0) return null;

  const sizes = {
    sm: { fontSize: 12, padding: '4px 8px', iconSize: 14 },
    md: { fontSize: 14, padding: '6px 12px', iconSize: 16 },
    lg: { fontSize: 16, padding: '8px 16px', iconSize: 20 },
  };

  const s = sizes[size];

  // More fires for longer streaks
  const fireCount = Math.min(streak, 5);
  const fires = Array(fireCount).fill('🔥').join('');

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: s.padding,
        borderRadius: 8,
        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(239, 68, 68, 0.15))',
        border: '1px solid rgba(251, 146, 60, 0.3)',
      }}
    >
      <span style={{ fontSize: s.iconSize }}>{fires}</span>
      <span
        style={{
          fontSize: s.fontSize,
          fontWeight: 600,
          color: '#ea580c',
        }}
      >
        {streak} week{streak !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
