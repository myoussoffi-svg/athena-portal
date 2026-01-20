'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  VideoPreview,
  PromptDisplay,
  RecordingControls,
  IntegrityOverlay,
  UploadProgress,
} from '@/components/interview';
import {
  useMediaRecorder,
  useFullscreen,
  useIntegrityMonitor,
  type InterviewSession,
  type SegmentBoundary,
  type RecordingPhase,
} from '@/lib/interview';

export function InterviewRecorder() {
  const router = useRouter();

  // Session state
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [phase, setPhase] = useState<RecordingPhase>('initializing');

  // Recording state
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const segmentBoundariesRef = useRef<SegmentBoundary[]>([]);

  // Upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Integrity state
  const [showIntegrityOverlay, setShowIntegrityOverlay] = useState(false);
  const [currentViolationType, setCurrentViolationType] = useState<'fullscreen_exit' | 'tab_switch' | 'window_blur' | null>(null);

  // Hooks
  const {
    stream,
    isRecording,
    recordedBlob,
    error: mediaError,
    requestPermissions,
    startRecording,
    stopRecording,
    releaseStream,
  } = useMediaRecorder();

  const { enter: enterFullscreen, exit: exitFullscreen } = useFullscreen(() => {
    if (phase === 'recording') {
      setCurrentViolationType('fullscreen_exit');
      setShowIntegrityOverlay(true);
    }
  });

  const { log: integrityLog, startMonitoring, stopMonitoring, setCurrentPromptId } = useIntegrityMonitor();

  // Load session from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('interviewSession');
    if (!stored) {
      router.push('/track');
      return;
    }

    try {
      const parsed: InterviewSession = JSON.parse(stored);
      setSession(parsed);

      // Initialize segment boundaries
      segmentBoundariesRef.current = parsed.prompts.map((p) => ({
        promptId: p.id,
        startTime: 0,
        endTime: 0,
      }));

      setPhase('ready');
    } catch {
      router.push('/track');
    }
  }, [router]);

  // Track visibility changes for integrity
  useEffect(() => {
    if (phase !== 'recording') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCurrentViolationType('tab_switch');
        setShowIntegrityOverlay(true);
      }
    };

    const handleBlur = () => {
      setCurrentViolationType('window_blur');
      setShowIntegrityOverlay(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [phase]);

  // Beforeunload warning
  useEffect(() => {
    if (phase === 'recording' || phase === 'uploading') {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
        return '';
      };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [phase]);

  // Start the interview
  const handleStart = async () => {
    // Request permissions
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    // Enter fullscreen
    const fullscreenSuccess = await enterFullscreen();
    if (!fullscreenSuccess) {
      alert('Please allow fullscreen mode to continue.');
      return;
    }

    // Start recording
    const recordingSuccess = startRecording();
    if (!recordingSuccess) return;

    // Start integrity monitoring
    startMonitoring();

    // Set initial state
    const now = Date.now();
    setRecordingStartTime(now);
    segmentBoundariesRef.current[0].startTime = 0;
    setCurrentPromptId(session!.prompts[0].id);
    setPhase('recording');
  };

  // Next prompt
  const handleNextPrompt = useCallback(() => {
    if (!recordingStartTime || !session) return;

    const now = Date.now();
    const elapsed = now - recordingStartTime;

    // Close current segment
    segmentBoundariesRef.current[currentPromptIndex].endTime = elapsed;

    // Open next segment
    const nextIndex = currentPromptIndex + 1;
    segmentBoundariesRef.current[nextIndex].startTime = elapsed;

    setCurrentPromptIndex(nextIndex);
    setCurrentPromptId(session.prompts[nextIndex].id);
  }, [recordingStartTime, currentPromptIndex, session, setCurrentPromptId]);

  // Finish interview
  const handleFinish = useCallback(async () => {
    if (!recordingStartTime || !session) return;

    const now = Date.now();
    const elapsed = now - recordingStartTime;

    // Close final segment
    segmentBoundariesRef.current[currentPromptIndex].endTime = elapsed;

    // Stop recording and monitoring
    stopRecording();
    stopMonitoring();

    // Exit fullscreen
    await exitFullscreen();

    setPhase('finishing');
  }, [recordingStartTime, currentPromptIndex, session, stopRecording, stopMonitoring, exitFullscreen]);

  // Handle recorded blob (upload)
  useEffect(() => {
    if (phase !== 'finishing' || !recordedBlob || !session) return;

    const uploadAndSubmit = async () => {
      setPhase('uploading');

      try {
        // Upload to R2
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              setUploadProgress((e.loaded / e.total) * 100);
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
            }
          });

          xhr.addEventListener('error', (e) => {
            console.error('Upload XHR error:', e);
            reject(new Error('Upload failed - this may be a CORS issue. Check R2 bucket CORS configuration.'));
          });

          xhr.addEventListener('abort', () => reject(new Error('Upload was aborted')));

          xhr.open('PUT', session.uploadUrl);
          xhr.setRequestHeader('Content-Type', 'video/webm');
          xhr.send(recordedBlob);
        });

        // Submit to API
        const response = await fetch('/api/interview/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attemptId: session.attemptId,
            segmentBoundaries: segmentBoundariesRef.current,
            integrityLog,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to submit interview');
        }

        // Clear session and navigate to results
        sessionStorage.removeItem('interviewSession');
        releaseStream();
        setPhase('complete');

        router.push(`/track/${session.trackSlug}/interview/results/${session.attemptId}`);
      } catch (err) {
        console.error('Upload/submit error:', err);
        setUploadError(err instanceof Error ? err.message : 'Upload failed');
        setPhase('error');
      }
    };

    uploadAndSubmit();
  }, [phase, recordedBlob, session, integrityLog, releaseStream, router]);

  // Return to fullscreen
  const handleReturnToFullscreen = async () => {
    await enterFullscreen();
    setShowIntegrityOverlay(false);
    setCurrentViolationType(null);
  };

  // Retry upload
  const handleRetryUpload = () => {
    setUploadError(null);
    setPhase('finishing');
  };

  if (!session) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          color: '#E5E7EB',
        }}
      >
        Loading...
      </div>
    );
  }

  const currentPrompt = session.prompts[currentPromptIndex];
  const isLastPrompt = currentPromptIndex === session.prompts.length - 1;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Integrity overlay */}
      <IntegrityOverlay
        isVisible={showIntegrityOverlay}
        violationType={currentViolationType}
        onReturnToFullscreen={handleReturnToFullscreen}
      />

      {/* Ready state */}
      {phase === 'ready' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div style={{ maxWidth: 480, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 600 }}>
              Ready to Record
            </h2>
            <p style={{ margin: '0 0 24px', color: 'rgba(10, 10, 10, 0.65)', lineHeight: 1.6 }}>
              When you click Start, the interview will enter fullscreen mode and begin recording. You&apos;ll see each question one at a time.
            </p>

            {mediaError && (
              <div
                style={{
                  marginBottom: 16,
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#DC2626',
                  fontSize: 13,
                }}
              >
                {mediaError}
              </div>
            )}

            <button
              onClick={handleStart}
              style={{
                padding: '16px 32px',
                borderRadius: 12,
                border: 'none',
                background: '#416D89',
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Start Recording
            </button>
          </div>
        </div>
      )}

      {/* Recording state */}
      {phase === 'recording' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 900,
            margin: '0 auto',
            padding: 24,
            width: '100%',
          }}
        >
          {/* Top: Video preview */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 24,
            }}
          >
            <VideoPreview stream={stream} size="small" />
          </div>

          {/* Middle: Prompt display */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <PromptDisplay
              prompt={currentPrompt}
              currentIndex={currentPromptIndex}
              totalPrompts={session.prompts.length}
            />
          </div>

          {/* Bottom: Controls */}
          <RecordingControls
            isRecording={isRecording}
            isLastPrompt={isLastPrompt}
            onNext={handleNextPrompt}
            onFinish={handleFinish}
            recordingStartTime={recordingStartTime}
          />
        </div>
      )}

      {/* Finishing/Uploading state */}
      {(phase === 'finishing' || phase === 'uploading' || phase === 'complete') && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <UploadProgress
            progress={uploadProgress}
            status={phase === 'complete' ? 'complete' : 'uploading'}
          />
        </div>
      )}

      {/* Error state */}
      {phase === 'error' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <UploadProgress
            progress={uploadProgress}
            status="error"
            errorMessage={uploadError || undefined}
            onRetry={handleRetryUpload}
          />
        </div>
      )}
    </div>
  );
}
