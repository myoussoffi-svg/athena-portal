'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  GlobalStyles,
  Breadcrumbs,
  CourseHeader,
  ui,
} from '@/components/ui';
import { ProcessingStatus, FeedbackDisplay } from '@/components/interview';
import type { StatusResponse, Feedback } from '@/lib/interview/types';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const trackSlug = params.trackSlug as string;
  const attemptId = params.attemptId as string;

  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Poll for status
  useEffect(() => {
    let cancelled = false;
    let timeoutId: NodeJS.Timeout;

    const poll = async () => {
      try {
        const response = await fetch(`/api/interview/attempts/${attemptId}/status`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Interview attempt not found');
            return;
          }
          throw new Error('Failed to fetch status');
        }

        const data: StatusResponse = await response.json();
        if (cancelled) return;

        setStatus(data);

        // Continue polling if still processing
        if (data.status === 'processing' || data.status === 'in_progress') {
          timeoutId = setTimeout(poll, 3000);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load results');
        }
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [attemptId]);

  const getTitle = () => {
    if (!status) return 'Loading...';
    switch (status.status) {
      case 'in_progress':
      case 'processing':
        return 'Processing Your Interview';
      case 'complete':
        return 'Interview Results';
      case 'failed':
        return 'Processing Failed';
      case 'abandoned':
        return 'Interview Abandoned';
      default:
        return 'Interview Status';
    }
  };

  const getDescription = () => {
    if (!status) return 'Please wait while we load your results.';
    switch (status.status) {
      case 'in_progress':
      case 'processing':
        return 'Your interview is being analyzed. This typically takes 2-5 minutes.';
      case 'complete':
        return 'Your interview has been evaluated. Review your detailed feedback below.';
      case 'failed':
        return 'We encountered an issue processing your interview. Please contact support.';
      case 'abandoned':
        return 'This interview was not completed.';
      default:
        return '';
    }
  };

  return (
    <>
      <GlobalStyles />

      <div style={ui.page}>
        <div style={ui.container}>
          <Breadcrumbs
            items={[
              { label: 'Tracks', href: '/track' },
              { label: trackSlug, href: `/track/${trackSlug}` },
              { label: 'Interview Simulator', href: `/track/${trackSlug}/interview` },
              { label: 'Results' },
            ]}
          />

          <CourseHeader
            eyebrow="Interview Simulator"
            title={getTitle()}
            description={getDescription()}
          />

          <hr style={ui.divider} />

          {/* Error state */}
          {error && (
            <div
              style={{
                padding: 20,
                borderRadius: 12,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                marginBottom: 24,
              }}
            >
              <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#DC2626' }}>
                Error
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(10, 10, 10, 0.7)' }}>
                {error}
              </p>
              <button
                onClick={() => router.push(`/track/${trackSlug}/interview`)}
                style={{
                  marginTop: 16,
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1px solid rgba(10, 10, 10, 0.12)',
                  background: 'transparent',
                  color: '#0A0A0A',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Return to Interview
              </button>
            </div>
          )}

          {/* Loading state */}
          {!status && !error && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  margin: '0 auto 16px',
                  border: '3px solid rgba(65, 109, 137, 0.2)',
                  borderTopColor: '#416D89',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p style={{ margin: 0, color: 'rgba(10, 10, 10, 0.6)' }}>
                Loading results...
              </p>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {/* Processing state */}
          {status && (status.status === 'in_progress' || status.status === 'processing') && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
              <ProcessingStatus
                stage={status.processingStage || 'upload_verified'}
                status="processing"
              />
            </div>
          )}

          {/* Failed state */}
          {status && status.status === 'failed' && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
              <ProcessingStatus
                stage={status.processingStage || 'upload_verified'}
                status="failed"
                errorMessage={status.errorMessage}
              />
            </div>
          )}

          {/* Complete state */}
          {status && status.status === 'complete' && status.feedback && (
            <FeedbackDisplay feedback={status.feedback as Feedback} />
          )}

          {/* Abandoned state */}
          {status && status.status === 'abandoned' && (
            <div
              style={{
                maxWidth: 480,
                padding: 24,
                borderRadius: 14,
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                textAlign: 'center',
              }}
            >
              <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#B45309' }}>
                Interview Not Completed
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: 14, color: 'rgba(10, 10, 10, 0.65)' }}>
                This interview was abandoned before completion. Your account may be temporarily restricted.
              </p>
              <button
                onClick={() => router.push(`/track/${trackSlug}/interview`)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#416D89',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
