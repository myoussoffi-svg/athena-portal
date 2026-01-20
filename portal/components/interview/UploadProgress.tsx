'use client';

interface UploadProgressProps {
  progress: number; // 0-100
  status: 'uploading' | 'submitting' | 'complete' | 'error';
  errorMessage?: string;
  onRetry?: () => void;
}

export function UploadProgress({
  progress,
  status,
  errorMessage,
  onRetry,
}: UploadProgressProps) {
  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading your recording...';
      case 'submitting':
        return 'Submitting your interview...';
      case 'complete':
        return 'Upload complete!';
      case 'error':
        return errorMessage || 'Upload failed';
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        padding: 24,
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid rgba(10, 10, 10, 0.08)',
        textAlign: 'center',
      }}
    >
      {/* Status icon */}
      <div
        style={{
          width: 48,
          height: 48,
          margin: '0 auto 16px',
          borderRadius: '50%',
          background:
            status === 'error'
              ? 'rgba(239, 68, 68, 0.1)'
              : status === 'complete'
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(65, 109, 137, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
        }}
      >
        {status === 'error' ? '✕' : status === 'complete' ? '✓' : '↑'}
      </div>

      {/* Status message */}
      <div
        style={{
          marginBottom: 16,
          fontSize: 14,
          fontWeight: 500,
          color: status === 'error' ? '#EF4444' : '#0A0A0A',
        }}
      >
        {getStatusMessage()}
      </div>

      {/* Progress bar */}
      {(status === 'uploading' || status === 'submitting') && (
        <div
          style={{
            height: 6,
            background: 'rgba(10, 10, 10, 0.08)',
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#416D89',
              borderRadius: 3,
              transition: 'width 200ms ease',
            }}
          />
        </div>
      )}

      {/* Progress percentage */}
      {(status === 'uploading' || status === 'submitting') && (
        <div
          style={{
            fontSize: 12,
            color: 'rgba(10, 10, 10, 0.5)',
          }}
        >
          {Math.round(progress)}%
        </div>
      )}

      {/* Retry button */}
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 16,
            padding: '10px 20px',
            borderRadius: 8,
            border: '1px solid rgba(10, 10, 10, 0.12)',
            background: 'transparent',
            color: '#0A0A0A',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Retry Upload
        </button>
      )}
    </div>
  );
}
