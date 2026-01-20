'use client';

interface IntegrityOverlayProps {
  isVisible: boolean;
  violationType: 'fullscreen_exit' | 'tab_switch' | 'window_blur' | null;
  onReturnToFullscreen: () => void;
}

export function IntegrityOverlay({
  isVisible,
  violationType,
  onReturnToFullscreen,
}: IntegrityOverlayProps) {
  if (!isVisible) return null;

  const getMessage = () => {
    switch (violationType) {
      case 'fullscreen_exit':
        return 'You have exited fullscreen mode.';
      case 'tab_switch':
        return 'You have switched to another tab.';
      case 'window_blur':
        return 'You have clicked outside the browser.';
      default:
        return 'Please return to the interview.';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          maxWidth: 400,
          padding: 32,
          background: '#FFFFFF',
          borderRadius: 16,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            margin: '0 auto 16px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}
        >
          ⚠️
        </div>

        <h2
          style={{
            margin: '0 0 8px',
            fontSize: 18,
            fontWeight: 600,
            color: '#0A0A0A',
          }}
        >
          Interview Interrupted
        </h2>

        <p
          style={{
            margin: '0 0 20px',
            fontSize: 14,
            color: 'rgba(10, 10, 10, 0.65)',
            lineHeight: 1.5,
          }}
        >
          {getMessage()} This will be recorded. Please return to fullscreen to continue your interview.
        </p>

        <button
          onClick={onReturnToFullscreen}
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
          Return to Fullscreen
        </button>
      </div>
    </div>
  );
}
