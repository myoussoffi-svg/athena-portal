'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VideoPreview, LockoutMessage } from '@/components/interview';
import {
  checkBrowserSupport,
  isMobileDevice,
  useMediaRecorder,
  type InitializeResponse,
  type LockedError,
  type InProgressError,
  type InterviewSession,
} from '@/lib/interview';
import { ui } from '@/components/ui';

interface InterviewLandingProps {
  trackSlug: string;
}

type Phase =
  | 'checking'
  | 'unsupported'
  | 'mobile_warning'
  | 'permissions'
  | 'ready'
  | 'initializing'
  | 'locked'
  | 'error';

export function InterviewLanding({ trackSlug }: InterviewLandingProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('checking');
  const [browserIssues, setBrowserIssues] = useState<string[]>([]);
  const [lockoutData, setLockoutData] = useState<LockedError | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [existingAttemptId, setExistingAttemptId] = useState<string | null>(null);

  const { stream, error: mediaError, requestPermissions, releaseStream } = useMediaRecorder();

  // Check browser support on mount
  useEffect(() => {
    const support = checkBrowserSupport();

    if (!support.supported) {
      setBrowserIssues(support.issues);
      setPhase('unsupported');
      return;
    }

    if (isMobileDevice()) {
      setPhase('mobile_warning');
      return;
    }

    setPhase('permissions');
  }, []);

  // Handle permission request
  const handleRequestPermissions = async () => {
    const success = await requestPermissions();
    if (success) {
      setPhase('ready');
    }
  };

  // Skip mobile warning
  const handleSkipMobileWarning = () => {
    setPhase('permissions');
  };

  // Initialize interview
  const handleStartInterview = async () => {
    setPhase('initializing');
    setError(null);

    try {
      const response = await fetch('/api/interview/initialize', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();

        if (response.status === 401) {
          router.push('/sign-in');
          return;
        }

        if (response.status === 403 && data.error === 'LOCKED') {
          setLockoutData(data as LockedError);
          setPhase('locked');
          return;
        }

        if (response.status === 409 && data.error === 'IN_PROGRESS') {
          setExistingAttemptId((data as InProgressError).existingAttemptId);
          setPhase('ready');
          return;
        }

        throw new Error(data.message || 'Failed to initialize interview');
      }

      const initData: InitializeResponse = await response.json();

      // Store session data
      const session: InterviewSession = {
        ...initData,
        trackSlug,
      };
      sessionStorage.setItem('interviewSession', JSON.stringify(session));

      // Release stream before navigating (will re-acquire on recording page)
      releaseStream();

      // Navigate to recording page
      router.push(`/track/${trackSlug}/interview/recording`);
    } catch (err) {
      console.error('Initialize error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start interview');
      setPhase('error');
    }
  };

  // Resume existing attempt
  const handleResumeAttempt = () => {
    if (existingAttemptId) {
      router.push(`/track/${trackSlug}/interview/results/${existingAttemptId}`);
    }
  };

  // Request unlock
  const handleRequestUnlock = async () => {
    // TODO: Implement unlock request API
    alert('Unlock request submitted. Please wait for admin review.');
  };

  return (
    <div style={{ maxWidth: 600 }}>
      {/* Checking browser support */}
      {phase === 'checking' && (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <p style={{ color: 'rgba(10, 10, 10, 0.6)' }}>Checking browser compatibility...</p>
        </div>
      )}

      {/* Browser unsupported */}
      {phase === 'unsupported' && (
        <div style={{ ...ui.card, borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600 }}>
            Browser Not Supported
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(10, 10, 10, 0.65)' }}>
            Your browser doesn&apos;t support the features required for the interview simulator.
          </p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 13, color: '#DC2626' }}>
            {browserIssues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
          <p style={{ margin: '16px 0 0', fontSize: 13, color: 'rgba(10, 10, 10, 0.5)' }}>
            Please use a modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      )}

      {/* Mobile warning */}
      {phase === 'mobile_warning' && (
        <div style={{ ...ui.card, borderColor: 'rgba(251, 191, 36, 0.3)' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600 }}>
            Mobile Device Detected
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(10, 10, 10, 0.65)' }}>
            The interview simulator works best on a desktop or laptop computer. Video recording on mobile devices may not work correctly.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleSkipMobileWarning}
              style={{
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
              Continue Anyway
            </button>
          </div>
        </div>
      )}

      {/* Permission request */}
      {phase === 'permissions' && (
        <div style={ui.card}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600 }}>
            Before You Begin
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(10, 10, 10, 0.65)' }}>
            The interview will record video and audio of your responses. Please allow camera and microphone access when prompted.
          </p>

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>Requirements:</h4>
            <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 13, color: 'rgba(10, 10, 10, 0.7)', lineHeight: 1.7 }}>
              <li>Working camera and microphone</li>
              <li>Quiet environment with good lighting</li>
              <li>Stable internet connection</li>
              <li>15-20 minutes of uninterrupted time</li>
            </ul>
          </div>

          {mediaError && (
            <div
              style={{
                marginBottom: 16,
                padding: '12px 16px',
                borderRadius: 8,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#DC2626',
                fontSize: 13,
              }}
            >
              {mediaError}
            </div>
          )}

          <button
            onClick={handleRequestPermissions}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: 10,
              border: 'none',
              background: '#416D89',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Allow Camera & Microphone
          </button>
        </div>
      )}

      {/* Ready to start */}
      {phase === 'ready' && (
        <div style={ui.card}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
            Ready to Begin
          </h3>

          {/* Camera preview */}
          <div style={{ marginBottom: 20 }}>
            <VideoPreview stream={stream} size="large" />
          </div>

          {existingAttemptId && (
            <div
              style={{
                marginBottom: 16,
                padding: '12px 16px',
                borderRadius: 8,
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                color: '#B45309',
                fontSize: 13,
              }}
            >
              You have an interview in progress.{' '}
              <button
                onClick={handleResumeAttempt}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B45309',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                View status
              </button>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>Interview Format:</h4>
            <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 13, color: 'rgba(10, 10, 10, 0.7)', lineHeight: 1.7 }}>
              <li>14 questions (4 behavioral, 10 technical)</li>
              <li>Your video will be recorded continuously</li>
              <li>The interview will be conducted in fullscreen mode</li>
              <li>You&apos;ll receive detailed feedback after processing</li>
            </ul>
          </div>

          <button
            onClick={handleStartInterview}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: 10,
              border: 'none',
              background: '#416D89',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Start Interview
          </button>
        </div>
      )}

      {/* Initializing */}
      {phase === 'initializing' && (
        <div style={{ ...ui.card, textAlign: 'center' }}>
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
          <p style={{ margin: 0, color: 'rgba(10, 10, 10, 0.65)' }}>
            Preparing your interview...
          </p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Locked */}
      {phase === 'locked' && lockoutData && (
        <LockoutMessage
          reason={lockoutData.reason}
          unlockRequestAllowed={lockoutData.unlockRequestAllowed}
          requestPending={lockoutData.requestPending}
          onRequestUnlock={handleRequestUnlock}
        />
      )}

      {/* Error */}
      {phase === 'error' && (
        <div style={{ ...ui.card, borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#DC2626' }}>
            Something Went Wrong
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(10, 10, 10, 0.65)' }}>
            {error || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={() => setPhase('ready')}
            style={{
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
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
