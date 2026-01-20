'use client';

import { ReactNode } from 'react';
import { AlertCircle, Lightbulb, AlertTriangle, Info, CheckCircle, Target } from 'lucide-react';

type CalloutVariant = 'note' | 'tip' | 'warning' | 'important' | 'success' | 'interview';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const variantConfig: Record<CalloutVariant, { icon: typeof Info; color: string; bg: string; border: string }> = {
  note: {
    icon: Info,
    color: 'rgba(59, 130, 246, 1)',
    bg: 'rgba(59, 130, 246, 0.06)',
    border: 'rgba(59, 130, 246, 0.3)',
  },
  tip: {
    icon: Lightbulb,
    color: 'rgba(16, 185, 129, 1)',
    bg: 'rgba(16, 185, 129, 0.06)',
    border: 'rgba(16, 185, 129, 0.3)',
  },
  warning: {
    icon: AlertTriangle,
    color: 'rgba(245, 158, 11, 1)',
    bg: 'rgba(245, 158, 11, 0.06)',
    border: 'rgba(245, 158, 11, 0.3)',
  },
  important: {
    icon: AlertCircle,
    color: 'rgba(239, 68, 68, 1)',
    bg: 'rgba(239, 68, 68, 0.06)',
    border: 'rgba(239, 68, 68, 0.3)',
  },
  success: {
    icon: CheckCircle,
    color: 'rgba(16, 185, 129, 1)',
    bg: 'rgba(16, 185, 129, 0.06)',
    border: 'rgba(16, 185, 129, 0.3)',
  },
  interview: {
    icon: Target,
    color: 'rgba(220, 38, 38, 1)',
    bg: 'linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(239, 68, 68, 0.08) 100%)',
    border: 'rgba(220, 38, 38, 0.25)',
  },
};

export function Callout({ variant = 'note', title, children }: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const isInterview = variant === 'interview';

  // Interview variant gets special enhanced styling
  if (isInterview) {
    return (
      <div
        style={{
          margin: '28px 0',
          borderRadius: 12,
          border: `1px solid ${config.border}`,
          background: config.bg,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(220, 38, 38, 0.08)',
        }}
      >
        {/* Interview Focus Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.12) 100%)',
            borderBottom: '1px solid rgba(220, 38, 38, 0.15)',
          }}
        >
          <Icon size={16} style={{ color: config.color }} />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: config.color,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
            }}
          >
            Interview Focus
          </span>
        </div>
        {/* Content */}
        <div style={{ padding: '16px 20px' }}>
          {title && (
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--athena-fg)',
                marginBottom: 8,
              }}
            >
              {title}
            </div>
          )}
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--athena-fg)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Standard callout styling for other variants
  return (
    <div
      style={{
        margin: '24px 0',
        padding: '16px 20px',
        borderRadius: 10,
        border: `1px solid ${config.border}`,
        background: config.bg,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <Icon
          size={18}
          style={{
            color: config.color,
            flexShrink: 0,
            marginTop: 2,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: config.color,
                marginBottom: 6,
              }}
            >
              {title}
            </div>
          )}
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--athena-fg)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
