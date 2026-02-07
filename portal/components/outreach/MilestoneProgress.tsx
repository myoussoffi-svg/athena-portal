'use client';

import type { NextMilestone } from '@/lib/outreach/schemas';

interface MilestoneProgressProps {
  milestone: NextMilestone | null;
}

export function MilestoneProgress({ milestone }: MilestoneProgressProps) {
  if (!milestone) {
    return (
      <div
        style={{
          padding: 16,
          background: 'rgba(65, 109, 137, 0.05)',
          borderRadius: 12,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 8 }}>🏆</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#416D89' }}>
          All achievements unlocked!
        </div>
        <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.5)', marginTop: 4 }}>
          You&apos;re a networking master.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 16,
        background: 'rgba(10, 10, 10, 0.02)',
        borderRadius: 12,
        border: '1px solid rgba(10, 10, 10, 0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(10, 10, 10, 0.8)' }}>
            Next: {milestone.title}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.5)', marginTop: 2 }}>
            {milestone.description}
          </div>
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#416D89',
          }}
        >
          {milestone.currentProgress}/{milestone.targetProgress}
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 8,
          background: 'rgba(10, 10, 10, 0.08)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${milestone.percentComplete}%`,
            background: 'linear-gradient(90deg, #416D89, #5a8fad)',
            borderRadius: 4,
            transition: 'width 500ms ease',
          }}
        />
      </div>

      <div
        style={{
          fontSize: 11,
          color: 'rgba(10, 10, 10, 0.4)',
          marginTop: 6,
          textAlign: 'right',
        }}
      >
        {milestone.percentComplete}% complete
      </div>
    </div>
  );
}
