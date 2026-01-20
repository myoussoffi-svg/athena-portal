'use client';

import { useEffect, useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';

interface QuotaData {
  used: number;
  limit: number;
  remaining: number;
}

interface ResumeQuotaStatusProps {
  onQuotaLoaded?: (quota: QuotaData) => void;
}

export function ResumeQuotaStatus({ onQuotaLoaded }: ResumeQuotaStatusProps) {
  const [quota, setQuota] = useState<QuotaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuota() {
      try {
        const response = await fetch('/api/resume/quota');
        if (!response.ok) {
          throw new Error('Failed to load quota');
        }
        const data = await response.json();
        setQuota(data);
        onQuotaLoaded?.(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quota');
      } finally {
        setLoading(false);
      }
    }
    fetchQuota();
  }, [onQuotaLoaded]);

  if (loading) {
    return (
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(10, 10, 10, 0.03)',
          borderRadius: 8,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <div
          style={{
            width: 120,
            height: 14,
            background: 'rgba(10, 10, 10, 0.08)',
            borderRadius: 4,
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  if (error || !quota) {
    return (
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(220, 38, 38, 0.05)',
          border: '1px solid rgba(220, 38, 38, 0.15)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <AlertCircle size={16} style={{ color: 'rgb(220, 38, 38)' }} />
        <span style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.6)' }}>
          {error || 'Failed to load quota'}
        </span>
      </div>
    );
  }

  const isExhausted = quota.remaining === 0;
  const percentUsed = (quota.used / quota.limit) * 100;

  return (
    <div
      style={{
        padding: '16px 20px',
        background: isExhausted
          ? 'rgba(220, 38, 38, 0.05)'
          : 'rgba(65, 109, 137, 0.05)',
        border: `1px solid ${
          isExhausted
            ? 'rgba(220, 38, 38, 0.15)'
            : 'rgba(65, 109, 137, 0.15)'
        }`,
        borderRadius: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText
            size={18}
            style={{
              color: isExhausted ? 'rgb(220, 38, 38)' : '#416D89',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: isExhausted ? 'rgb(220, 38, 38)' : 'rgba(10, 10, 10, 0.8)',
            }}
          >
            Resume Submissions
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: isExhausted ? 'rgb(220, 38, 38)' : '#416D89',
          }}
        >
          {quota.used} / {quota.limit}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 6,
          background: 'rgba(10, 10, 10, 0.08)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentUsed}%`,
            background: isExhausted
              ? 'rgb(220, 38, 38)'
              : 'linear-gradient(90deg, #416D89, #5a8faa)',
            borderRadius: 3,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {isExhausted ? (
        <p
          style={{
            marginTop: 10,
            fontSize: 13,
            color: 'rgb(220, 38, 38)',
            margin: '10px 0 0',
          }}
        >
          You&apos;ve used all available resume submissions.
        </p>
      ) : (
        <p
          style={{
            marginTop: 10,
            fontSize: 13,
            color: 'rgba(10, 10, 10, 0.5)',
            margin: '10px 0 0',
          }}
        >
          {quota.remaining} submission{quota.remaining !== 1 ? 's' : ''} remaining
        </p>
      )}
    </div>
  );
}
