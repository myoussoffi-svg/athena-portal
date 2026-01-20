'use client';

interface FollowUpBannerProps {
  count: number;
  onViewAll: () => void;
}

export function FollowUpBanner({ count, onViewAll }: FollowUpBannerProps) {
  if (count === 0) return null;

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 10,
        background: 'rgba(220, 38, 38, 0.06)',
        border: '1px solid rgba(220, 38, 38, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 16 }}>⏰</span>
        <span style={{ fontSize: 13, color: '#dc2626', fontWeight: 500 }}>
          {count === 1
            ? '1 contact needs a follow-up'
            : `${count} contacts need follow-ups`}
        </span>
      </div>
      <button
        onClick={onViewAll}
        style={{
          padding: '5px 10px',
          borderRadius: 6,
          border: '1px solid rgba(220, 38, 38, 0.25)',
          background: 'transparent',
          color: '#dc2626',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        View all
      </button>
    </div>
  );
}
