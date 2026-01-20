'use client';

import { useEffect, useState } from 'react';
import { Upload, FileSearch, Brain, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type ProcessingStatus = 'pending' | 'uploading' | 'extracting' | 'analyzing' | 'complete' | 'failed';

interface ProcessingStatusResponse {
  id: string;
  status: ProcessingStatus;
  errorMessage?: string;
}

interface ResumeProcessingStatusProps {
  feedbackId: string;
  onComplete: () => void;
  onError: (error: string) => void;
}

const STAGES: { status: ProcessingStatus; label: string; icon: typeof Upload }[] = [
  { status: 'pending', label: 'Queued', icon: Upload },
  { status: 'extracting', label: 'Reading Document', icon: FileSearch },
  { status: 'analyzing', label: 'AI Analysis', icon: Brain },
  { status: 'complete', label: 'Complete', icon: CheckCircle },
];

export function ResumeProcessingStatus({
  feedbackId,
  onComplete,
  onError,
}: ResumeProcessingStatusProps) {
  const [status, setStatus] = useState<ProcessingStatus>('pending');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let stopped = false;
    let intervalId: NodeJS.Timeout | null = null;

    async function pollStatus() {
      if (stopped) return;

      try {
        const response = await fetch(`/api/resume/feedback/${feedbackId}/status`);
        if (!response.ok) {
          throw new Error('Failed to check status');
        }

        const data: ProcessingStatusResponse = await response.json();
        setStatus(data.status);

        if (data.status === 'complete') {
          stopped = true;
          if (intervalId) clearInterval(intervalId);
          onComplete();
        } else if (data.status === 'failed') {
          stopped = true;
          if (intervalId) clearInterval(intervalId);
          setErrorMessage(data.errorMessage || 'Processing failed');
          onError(data.errorMessage || 'Processing failed');
        }
      } catch (err) {
        console.error('Status poll error:', err);
        // Continue polling on transient errors
      }
    }

    // Initial check
    pollStatus();

    // Poll every 2 seconds
    intervalId = setInterval(pollStatus, 2000);

    return () => {
      stopped = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [feedbackId, onComplete, onError]);

  const currentIndex = STAGES.findIndex((s) => s.status === status);

  if (status === 'failed') {
    return (
      <div
        style={{
          padding: 32,
          background: 'rgba(220, 38, 38, 0.05)',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          borderRadius: 16,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(220, 38, 38, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'rgb(220, 38, 38)',
          }}
        >
          <AlertCircle size={32} />
        </div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'rgb(220, 38, 38)',
            marginBottom: 8,
          }}
        >
          Processing Failed
        </h3>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(10, 10, 10, 0.6)',
            marginBottom: 16,
          }}
        >
          {errorMessage || 'An error occurred while processing your resume.'}
        </p>
        <p style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.4)' }}>
          This doesn&apos;t count against your submission quota. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 32,
        background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.04) 0%, rgba(65, 109, 137, 0.08) 100%)',
        border: '1px solid rgba(65, 109, 137, 0.12)',
        borderRadius: 16,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.1) 0%, rgba(65, 109, 137, 0.15) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#416D89',
          }}
        >
          <Loader2 size={32} style={{ animation: 'spin 1.5s linear infinite' }} />
        </div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'rgba(10, 10, 10, 0.9)',
            marginBottom: 8,
          }}
        >
          Analyzing Your Resume
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.5)' }}>
          This typically takes 30-60 seconds
        </p>
      </div>

      {/* Progress stages */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index === currentIndex;
          const isComplete = index < currentIndex;
          const isPending = index > currentIndex;

          return (
            <div
              key={stage.status}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px',
                borderRadius: 12,
                background: isActive
                  ? 'rgba(65, 109, 137, 0.1)'
                  : 'transparent',
                opacity: isPending ? 0.4 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: isComplete
                    ? 'linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%)'
                    : isActive
                      ? 'linear-gradient(135deg, #416D89 0%, #4a7a96 100%)'
                      : 'rgba(10, 10, 10, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isComplete || isActive ? 'white' : 'rgba(10, 10, 10, 0.4)',
                }}
              >
                {isComplete ? (
                  <CheckCircle size={20} />
                ) : isActive ? (
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <Icon size={20} />
                )}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 500,
                  color: isComplete
                    ? 'rgb(16, 185, 129)'
                    : isActive
                      ? '#416D89'
                      : 'rgba(10, 10, 10, 0.4)',
                }}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
