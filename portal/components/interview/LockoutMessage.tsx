'use client';

interface LockoutMessageProps {
  reason: 'cooldown' | 'abandoned' | 'admin_hold';
  unlockRequestAllowed: boolean;
  requestPending: boolean;
  onRequestUnlock?: () => void;
}

export function LockoutMessage({
  reason,
  unlockRequestAllowed,
  requestPending,
  onRequestUnlock,
}: LockoutMessageProps) {
  const getReasonMessage = () => {
    switch (reason) {
      case 'cooldown':
        return {
          title: 'Cooldown Period Active',
          description:
            'You must wait before attempting another interview. This helps ensure you have adequate time to prepare.',
        };
      case 'abandoned':
        return {
          title: 'Previous Interview Abandoned',
          description:
            'Your previous interview attempt was not completed. You may request to have your account unlocked.',
        };
      case 'admin_hold':
        return {
          title: 'Account Under Review',
          description:
            'Your account has been placed on hold by an administrator. Please contact support if you believe this is an error.',
        };
    }
  };

  const { title, description } = getReasonMessage();

  return (
    <div
      style={{
        maxWidth: 480,
        padding: 24,
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid rgba(239, 68, 68, 0.2)',
        textAlign: 'center',
      }}
    >
      {/* Icon */}
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
        🔒
      </div>

      <h2
        style={{
          margin: '0 0 8px',
          fontSize: 18,
          fontWeight: 600,
          color: '#0A0A0A',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: '0 0 20px',
          fontSize: 14,
          color: 'rgba(10, 10, 10, 0.65)',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {requestPending && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            color: '#B45309',
            fontSize: 13,
          }}
        >
          Your unlock request is being reviewed.
        </div>
      )}

      {unlockRequestAllowed && !requestPending && onRequestUnlock && (
        <button
          onClick={onRequestUnlock}
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
          Request Unlock
        </button>
      )}
    </div>
  );
}
