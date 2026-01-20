'use client';

import { useState, useCallback } from 'react';
import { CheckSquare, Square, ListChecks } from 'lucide-react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

interface ChecklistItem {
  text: string;
  subtext?: string;
}

interface ChecklistProps {
  id: string;
  title?: string;
  items: ChecklistItem[];
  storageKey?: string;
}

export function Checklist({
  id,
  title = 'Checklist',
  items,
  storageKey,
}: ChecklistProps) {
  const key = storageKey || `athena-checklist-${id}`;

  // Use lazy initializer to read from localStorage (safely)
  const [checked, setChecked] = useState<Set<number>>(() => {
    const stored = safeGetItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      } catch {
        // Ignore invalid stored data
      }
    }
    return new Set();
  });

  const handleToggle = useCallback((index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      // Save to localStorage (safely)
      safeSetItem(key, JSON.stringify([...next]));
      return next;
    });
  }, [key]);

  const completedCount = checked.size;
  const totalCount = items.length;
  const isComplete = completedCount === totalCount;

  return (
    <div
      style={{
        margin: '32px 0',
        padding: '24px',
        borderRadius: 12,
        border: isComplete
          ? '1px solid rgba(16, 185, 129, 0.35)'
          : '1px solid var(--athena-subtle)',
        background: isComplete
          ? 'rgba(16, 185, 129, 0.04)'
          : 'rgba(10, 10, 10, 0.02)',
        transition: 'all 0.3s',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ListChecks
            size={18}
            style={{
              color: isComplete ? 'rgb(16, 185, 129)' : 'var(--athena-accent)',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--athena-fg)',
            }}
          >
            {title}
          </span>
        </div>

        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: isComplete ? 'rgb(16, 185, 129)' : 'var(--athena-muted)',
          }}
        >
          {completedCount} of {totalCount}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, idx) => {
          const isChecked = checked.has(idx);

          return (
            <button
              key={idx}
              onClick={() => handleToggle(idx)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 8,
                border: isChecked
                  ? '1px solid rgba(16, 185, 129, 0.25)'
                  : '1px solid var(--athena-subtle)',
                background: isChecked ? 'rgba(16, 185, 129, 0.06)' : 'white',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              {isChecked ? (
                <CheckSquare
                  size={20}
                  style={{
                    color: 'rgb(16, 185, 129)',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
              ) : (
                <Square
                  size={20}
                  style={{
                    color: 'var(--athena-muted)',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: isChecked ? 'var(--athena-muted)' : 'var(--athena-fg)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {item.text}
                </span>
                {item.subtext && (
                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: 'var(--athena-muted)',
                      opacity: isChecked ? 0.6 : 1,
                    }}
                  >
                    {item.subtext}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {isComplete && (
        <div
          style={{
            marginTop: 16,
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <CheckSquare size={16} style={{ color: 'rgb(16, 185, 129)' }} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'rgb(16, 185, 129)',
            }}
          >
            All items completed!
          </span>
        </div>
      )}
    </div>
  );
}
