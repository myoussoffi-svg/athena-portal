'use client';

import { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';

interface QuizOption {
  text: string;
  correct?: boolean;
  explanation?: string;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export function Quiz({ question, options, explanation }: QuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedIndex(index);
  };

  const handleCheck = () => {
    if (selectedIndex === null) return;
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setShowResult(false);
  };

  const selectedOption = selectedIndex !== null ? options[selectedIndex] : null;
  const isCorrect = selectedOption?.correct === true;

  return (
    <div
      style={{
        margin: '32px 0',
        padding: '24px',
        borderRadius: 12,
        border: '1px solid var(--athena-subtle)',
        background: 'rgba(10, 10, 10, 0.02)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 16,
        }}
      >
        <HelpCircle
          size={18}
          style={{ color: 'var(--athena-accent)' }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            color: 'var(--athena-accent)',
          }}
        >
          Knowledge Check
        </span>
      </div>

      <p
        style={{
          margin: '0 0 20px',
          fontSize: 15,
          lineHeight: 1.6,
          fontWeight: 500,
          color: 'var(--athena-fg)',
        }}
      >
        {question}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const showCorrect = showResult && option.correct;
          const showIncorrect = showResult && isSelected && !option.correct;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 8,
                border: showCorrect
                  ? '1px solid rgba(16, 185, 129, 0.5)'
                  : showIncorrect
                  ? '1px solid rgba(239, 68, 68, 0.5)'
                  : isSelected
                  ? '1px solid var(--athena-accent)'
                  : '1px solid var(--athena-subtle)',
                background: showCorrect
                  ? 'rgba(16, 185, 129, 0.08)'
                  : showIncorrect
                  ? 'rgba(239, 68, 68, 0.08)'
                  : isSelected
                  ? 'rgba(65, 109, 137, 0.08)'
                  : 'white',
                cursor: showResult ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                opacity: showResult && !isSelected && !option.correct ? 0.5 : 1,
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  fontSize: 12,
                  fontWeight: 500,
                  flexShrink: 0,
                  background: showCorrect
                    ? 'rgb(16, 185, 129)'
                    : showIncorrect
                    ? 'rgb(239, 68, 68)'
                    : isSelected
                    ? 'var(--athena-accent)'
                    : 'rgba(10, 10, 10, 0.08)',
                  color: showCorrect || showIncorrect || isSelected ? 'white' : 'var(--athena-muted)',
                }}
              >
                {showCorrect ? (
                  <Check size={14} />
                ) : showIncorrect ? (
                  <X size={14} />
                ) : (
                  String.fromCharCode(65 + idx)
                )}
              </span>
              <span
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: 'var(--athena-fg)',
                }}
              >
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div
          style={{
            marginTop: 20,
            padding: '16px',
            borderRadius: 8,
            background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: explanation || selectedOption?.explanation ? 8 : 0,
            }}
          >
            {isCorrect ? (
              <>
                <Check size={16} style={{ color: 'rgb(16, 185, 129)' }} />
                <span style={{ fontWeight: 600, fontSize: 14, color: 'rgb(16, 185, 129)' }}>
                  Correct!
                </span>
              </>
            ) : (
              <>
                <X size={16} style={{ color: 'rgb(239, 68, 68)' }} />
                <span style={{ fontWeight: 600, fontSize: 14, color: 'rgb(239, 68, 68)' }}>
                  Not quite
                </span>
              </>
            )}
          </div>
          {(explanation || selectedOption?.explanation) && (
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--athena-fg)',
              }}
            >
              {selectedOption?.explanation || explanation}
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={selectedIndex === null}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: selectedIndex === null ? 'rgba(10, 10, 10, 0.08)' : 'var(--athena-accent)',
              color: selectedIndex === null ? 'var(--athena-muted)' : 'white',
              fontSize: 14,
              fontWeight: 500,
              cursor: selectedIndex === null ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid var(--athena-subtle)',
              background: 'white',
              color: 'var(--athena-fg)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
