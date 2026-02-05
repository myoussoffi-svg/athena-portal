'use client';

import { Calculator } from 'lucide-react';

interface CalculationProps {
  title: string;
  given?: string[];
  steps: string[];
  result: string;
  note?: string;
}

export function Calculation({ title, given, steps, result, note }: CalculationProps) {
  return (
    <div
      style={{
        margin: '32px 0',
        borderRadius: 12,
        border: '1px solid rgba(65, 109, 137, 0.2)',
        background: 'white',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 20px',
          background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.08) 0%, rgba(65, 109, 137, 0.04) 100%)',
          borderBottom: '1px solid rgba(65, 109, 137, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Calculator
          size={18}
          style={{
            color: '#416D89',
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#416D89',
            letterSpacing: 0.2,
          }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px' }}>
        {/* Given section */}
        {given && given.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: 'rgba(10, 10, 10, 0.45)',
                marginBottom: 10,
              }}
            >
              Given
            </div>
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(10, 10, 10, 0.02)',
                borderRadius: 8,
                border: '1px solid rgba(10, 10, 10, 0.06)',
              }}
            >
              {given.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: 14,
                    color: 'rgba(10, 10, 10, 0.7)',
                    lineHeight: 1.6,
                    padding: '2px 0',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {given && given.length > 0 && (
          <div
            style={{
              height: 1,
              background: 'rgba(10, 10, 10, 0.08)',
              margin: '16px 0',
            }}
          />
        )}

        {/* Steps section */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
              fontSize: 14,
              lineHeight: 2,
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  color: 'rgba(10, 10, 10, 0.8)',
                  padding: '4px 0',
                }}
              >
                <span style={{ whiteSpace: 'pre-wrap' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result divider */}
        <div
          style={{
            height: 2,
            background: 'linear-gradient(90deg, rgba(65, 109, 137, 0.3) 0%, rgba(65, 109, 137, 0.1) 100%)',
            marginBottom: 16,
          }}
        />

        {/* Result */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.06) 0%, rgba(65, 109, 137, 0.02) 100%)',
            borderRadius: 8,
            border: '1px solid rgba(65, 109, 137, 0.15)',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
              fontSize: 15,
              fontWeight: 600,
              color: '#416D89',
            }}
          >
            {result}
          </span>
        </div>

        {/* Optional note */}
        {note && (
          <div
            style={{
              marginTop: 16,
              fontSize: 13,
              color: 'rgba(10, 10, 10, 0.5)',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}
