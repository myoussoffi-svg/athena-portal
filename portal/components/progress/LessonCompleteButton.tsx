'use client';

import { useState } from 'react';
import { Check, CheckCircle, Circle, Sparkles } from 'lucide-react';

interface LessonCompleteButtonProps {
  isComplete: boolean;
  onToggle: () => Promise<boolean>;
  className?: string;
}

export function LessonCompleteButton({
  isComplete,
  onToggle,
}: LessonCompleteButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (isPending) return;
    setIsPending(true);
    await onToggle();
    setIsPending(false);
  };

  if (isComplete) {
    return (
      <div style={{ textAlign: 'center' }}>
        {/* Completed State - Celebration Card */}
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            padding: '20px 32px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.12) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(52, 211, 153) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Check size={20} strokeWidth={3} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'rgb(16, 185, 129)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                Lesson Complete!
                <Sparkles size={14} style={{ color: '#f59e0b' }} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(10, 10, 10, 0.5)',
                  marginTop: 2,
                }}
              >
                Great progress — keep it up!
              </div>
            </div>
          </div>

          <button
            onClick={handleClick}
            disabled={isPending}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              color: 'rgb(16, 185, 129)',
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.5 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isPending) {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
            }}
          >
            <Circle size={12} />
            Undo Completion
          </button>
        </div>
      </div>
    );
  }

  // Not Complete State - Prominent CTA Button
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          padding: '20px 32px',
          background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.04) 0%, rgba(65, 109, 137, 0.08) 100%)',
          border: '1px solid rgba(65, 109, 137, 0.12)',
          borderRadius: 16,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: 'rgba(10, 10, 10, 0.5)',
            marginBottom: 4,
          }}
        >
          Finished reading?
        </div>

        <button
          onClick={handleClick}
          disabled={isPending}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #416D89 0%, #4a7a96 100%)',
            border: 'none',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            color: 'white',
            cursor: isPending ? 'not-allowed' : 'pointer',
            opacity: isPending ? 0.6 : 1,
            boxShadow: '0 4px 12px rgba(65, 109, 137, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!isPending) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(65, 109, 137, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(65, 109, 137, 0.3)';
          }}
        >
          <CheckCircle size={18} />
          <span>Mark as Complete</span>
        </button>
      </div>
    </div>
  );
}
