'use client';

import { statusLabels, statusColors } from '@/lib/outreach/status-machine';
import type { OutreachStatus } from '@/lib/outreach/schemas';

interface StatusBadgeProps {
  status: OutreachStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colors = statusColors[status];
  const label = statusLabels[status];

  const padding = size === 'sm' ? '3px 8px' : '5px 10px';
  const fontSize = size === 'sm' ? 11 : 12;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding,
        borderRadius: 999,
        fontSize,
        fontWeight: 500,
        background: colors.bg,
        color: colors.text,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
