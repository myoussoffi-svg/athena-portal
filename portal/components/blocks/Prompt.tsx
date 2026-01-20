'use client';

import { useState, useCallback } from 'react';
import { PenLine, Save, Check } from 'lucide-react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

interface PromptProps {
  id: string;
  question: string;
  placeholder?: string;
  minRows?: number;
  storageKey?: string;
}

export function Prompt({
  id,
  question,
  placeholder = 'Write your thoughts here...',
  minRows = 4,
  storageKey,
}: PromptProps) {
  const key = storageKey || `athena-prompt-${id}`;

  // Use lazy initializer to read from localStorage (safely)
  const [value, setValueState] = useState(() => {
    return safeGetItem(key) ?? '';
  });
  const [saved, setSaved] = useState(false);

  const setValue = useCallback((newValue: string) => {
    setValueState(newValue);
    setSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    safeSetItem(key, value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [key, value]);

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
        <PenLine
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
          Reflection
        </span>
      </div>

      <p
        style={{
          margin: '0 0 16px',
          fontSize: 15,
          lineHeight: 1.6,
          fontWeight: 500,
          color: 'var(--athena-fg)',
        }}
      >
        {question}
      </p>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={minRows}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: 8,
          border: '1px solid var(--athena-subtle)',
          background: 'white',
          fontSize: 14,
          lineHeight: 1.6,
          color: 'var(--athena-fg)',
          resize: 'vertical',
          fontFamily: 'inherit',
        }}
      />

      <div
        style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={handleSave}
          disabled={!value.trim()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 8,
            border: 'none',
            background: !value.trim() ? 'rgba(10, 10, 10, 0.08)' : 'var(--athena-accent)',
            color: !value.trim() ? 'var(--athena-muted)' : 'white',
            fontSize: 14,
            fontWeight: 500,
            cursor: !value.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {saved ? (
            <>
              <Check size={16} />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Response</span>
            </>
          )}
        </button>

        {value.trim() && (
          <span
            style={{
              fontSize: 12,
              color: 'var(--athena-muted)',
            }}
          >
            {value.length} characters
          </span>
        )}
      </div>

      <p
        style={{
          margin: '12px 0 0',
          fontSize: 12,
          color: 'var(--athena-muted)',
        }}
      >
        Your response is saved locally in this browser.
      </p>
    </div>
  );
}
