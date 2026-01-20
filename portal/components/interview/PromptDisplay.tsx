'use client';

import type { Prompt } from '@/lib/interview/types';

interface PromptDisplayProps {
  prompt: Prompt;
  currentIndex: number;
  totalPrompts: number;
}

export function PromptDisplay({
  prompt,
  currentIndex,
  totalPrompts,
}: PromptDisplayProps) {
  const progress = ((currentIndex + 1) / totalPrompts) * 100;

  return (
    <div style={{ width: '100%' }}>
      {/* Progress bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 4,
            background: 'rgba(10, 10, 10, 0.08)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#416D89',
              borderRadius: 2,
              transition: 'width 300ms ease',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            color: 'rgba(10, 10, 10, 0.65)',
            whiteSpace: 'nowrap',
          }}
        >
          {currentIndex + 1} of {totalPrompts}
        </span>
      </div>

      {/* Prompt type badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: 999,
          background:
            prompt.type === 'behavioral'
              ? 'rgba(59, 130, 246, 0.1)'
              : 'rgba(16, 185, 129, 0.1)',
          color:
            prompt.type === 'behavioral' ? '#2563EB' : '#059669',
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 12,
        }}
      >
        {prompt.type}
      </div>

      {/* Prompt text */}
      <div
        style={{
          fontSize: 20,
          lineHeight: 1.4,
          fontWeight: 500,
          color: '#0A0A0A',
        }}
      >
        {prompt.text}
      </div>
    </div>
  );
}
