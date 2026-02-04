'use client';

import { useState } from 'react';

interface LockoutMessageProps {
  reason: 'cooldown' | 'abandoned' | 'admin_hold';
  unlockRequestAllowed: boolean;
  requestPending: boolean;
  lockedUntil?: string;
  onRequestUnlock?: (reason: string) => Promise<void>;
  unlockSuccess?: boolean;
  error?: string | null;
}

export function LockoutMessage({
  reason,
  unlockRequestAllowed,
  requestPending,
  lockedUntil,
  onRequestUnlock,
  unlockSuccess,
  error,
}: LockoutMessageProps) {
  const [showForm, setShowForm] = useState(false);
  const [unlockReason, setUnlockReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const getReasonMessage = () => {
    switch (reason) {
      case 'cooldown':
        const timeRemaining = lockedUntil
          ? getTimeRemaining(new Date(lockedUntil))
          : null;
        return {
          title: 'Cooldown Period Active',
          description: timeRemaining
            ? `Please wait ${timeRemaining} before attempting another interview.`
            : 'You must wait before attempting another interview. This helps ensure you have adequate time to prepare.',
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

  const getTimeRemaining = (until: Date) => {
    const now = new Date();
    const diff = until.getTime() - now.getTime();
    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  const handleSubmit = async () => {
    if (!onRequestUnlock || !unlockReason.trim()) return;
    setSubmitting(true);
    try {
      await onRequestUnlock(unlockReason.trim());
    } finally {
      setSubmitting(false);
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

      {/* Success message */}
      {unlockSuccess && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#047857',
            fontSize: 13,
          }}
        >
          Your unlock request has been submitted. An administrator will review it shortly.
        </div>
      )}

      {/* Pending request message */}
      {requestPending && !unlockSuccess && (
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

      {/* Error message */}
      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#DC2626',
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {/* Request unlock form */}
      {unlockRequestAllowed && !requestPending && !unlockSuccess && onRequestUnlock && (
        <>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
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
          ) : (
            <div style={{ textAlign: 'left' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#0A0A0A',
                }}
              >
                Why should we unlock your account?
              </label>
              <textarea
                value={unlockReason}
                onChange={(e) => setUnlockReason(e.target.value)}
                placeholder="Please explain why you need your account unlocked (e.g., technical issues, accidental exit, etc.)"
                style={{
                  width: '100%',
                  minHeight: 100,
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid rgba(10, 10, 10, 0.15)',
                  fontSize: 14,
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
              <p
                style={{
                  margin: '8px 0 16px',
                  fontSize: 12,
                  color: 'rgba(10, 10, 10, 0.5)',
                }}
              >
                Minimum 10 characters required
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setUnlockReason('');
                  }}
                  disabled={submitting}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: '1px solid rgba(10, 10, 10, 0.15)',
                    background: 'white',
                    color: '#0A0A0A',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.5 : 1,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || unlockReason.trim().length < 10}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: 'none',
                    background: submitting || unlockReason.trim().length < 10 ? '#999' : '#416D89',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: submitting || unlockReason.trim().length < 10 ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
