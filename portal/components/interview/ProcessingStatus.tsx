'use client';

import type { ProcessingStage } from '@/lib/interview/types';

interface ProcessingStatusProps {
  stage: ProcessingStage;
  status: 'processing' | 'failed';
  errorMessage?: string;
}

const STAGES: { key: ProcessingStage; label: string }[] = [
  { key: 'upload_verified', label: 'Upload verified' },
  { key: 'transcribing', label: 'Transcribing audio' },
  { key: 'segmenting', label: 'Processing responses' },
  { key: 'evaluating', label: 'Evaluating performance' },
  { key: 'finalizing', label: 'Generating feedback' },
];

export function ProcessingStatus({
  stage,
  status,
  errorMessage,
}: ProcessingStatusProps) {
  const currentStageIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <div
      style={{
        maxWidth: 400,
        padding: 24,
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid rgba(10, 10, 10, 0.08)',
      }}
    >
      <h3
        style={{
          margin: '0 0 20px',
          fontSize: 16,
          fontWeight: 600,
          color: '#0A0A0A',
          textAlign: 'center',
        }}
      >
        {status === 'failed' ? 'Processing Failed' : 'Analyzing Your Interview'}
      </h3>

      {status === 'failed' && errorMessage && (
        <div
          style={{
            marginBottom: 16,
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#DC2626',
            fontSize: 13,
            textAlign: 'center',
          }}
        >
          {errorMessage}
        </div>
      )}

      <div style={{ display: 'grid', gap: 12 }}>
        {STAGES.map((s, index) => {
          const isComplete = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isFailed = status === 'failed' && isCurrent;

          return (
            <div
              key={s.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {/* Status indicator */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  background: isFailed
                    ? 'rgba(239, 68, 68, 0.1)'
                    : isComplete
                    ? 'rgba(16, 185, 129, 0.1)'
                    : isCurrent
                    ? 'rgba(65, 109, 137, 0.1)'
                    : 'rgba(10, 10, 10, 0.05)',
                  color: isFailed
                    ? '#DC2626'
                    : isComplete
                    ? '#059669'
                    : isCurrent
                    ? '#416D89'
                    : 'rgba(10, 10, 10, 0.3)',
                  border: isCurrent && !isFailed
                    ? '2px solid #416D89'
                    : '1px solid transparent',
                }}
              >
                {isFailed ? '✕' : isComplete ? '✓' : index + 1}
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: 14,
                  color: isComplete || isCurrent
                    ? '#0A0A0A'
                    : 'rgba(10, 10, 10, 0.4)',
                  fontWeight: isCurrent ? 500 : 400,
                }}
              >
                {s.label}
              </span>

              {/* Loading spinner for current stage */}
              {isCurrent && status === 'processing' && (
                <div
                  style={{
                    marginLeft: 'auto',
                    width: 16,
                    height: 16,
                    border: '2px solid rgba(65, 109, 137, 0.2)',
                    borderTopColor: '#416D89',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
