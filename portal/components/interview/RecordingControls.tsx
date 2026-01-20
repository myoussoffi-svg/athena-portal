'use client';

import { useState, useEffect } from 'react';

interface RecordingControlsProps {
  isRecording: boolean;
  isLastPrompt: boolean;
  onNext: () => void;
  onFinish: () => void;
  recordingStartTime: number | null;
}

export function RecordingControls({
  isRecording,
  isLastPrompt,
  onNext,
  onFinish,
  recordingStartTime,
}: RecordingControlsProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRecording || !recordingStartTime) {
      // When not recording, reset elapsed to 0 on next render
      if (elapsed !== 0) {
        const id = requestAnimationFrame(() => setElapsed(0));
        return () => cancelAnimationFrame(id);
      }
      return;
    }

    const startTime = recordingStartTime;

    // Update immediately on first interval tick
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);

    // Trigger first update quickly
    const initialTimeout = setTimeout(() => {
      setElapsed(Date.now() - startTime);
    }, 0);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [isRecording, recordingStartTime, elapsed]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '16px 0',
      }}
    >
      {/* Timer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {isRecording && (
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#EF4444',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        )}
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 18,
            fontWeight: 600,
            color: isRecording ? '#0A0A0A' : 'rgba(10, 10, 10, 0.4)',
          }}
        >
          {formatTime(elapsed)}
        </span>
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: 12 }}>
        {isLastPrompt ? (
          <button
            onClick={onFinish}
            disabled={!isRecording}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: isRecording ? '#059669' : 'rgba(10, 10, 10, 0.1)',
              color: isRecording ? 'white' : 'rgba(10, 10, 10, 0.4)',
              fontSize: 14,
              fontWeight: 600,
              cursor: isRecording ? 'pointer' : 'not-allowed',
              transition: 'all 150ms ease',
            }}
          >
            Finish Interview
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!isRecording}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: isRecording ? '#416D89' : 'rgba(10, 10, 10, 0.1)',
              color: isRecording ? 'white' : 'rgba(10, 10, 10, 0.4)',
              fontSize: 14,
              fontWeight: 600,
              cursor: isRecording ? 'pointer' : 'not-allowed',
              transition: 'all 150ms ease',
            }}
          >
            Next Question →
          </button>
        )}
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
