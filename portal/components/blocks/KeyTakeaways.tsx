'use client';

import { Bookmark } from 'lucide-react';

interface KeyTakeawaysProps {
  title?: string;
  items: string[];
}

export function KeyTakeaways({ title = 'Key Takeaways', items }: KeyTakeawaysProps) {
  return (
    <div
      style={{
        margin: '32px 0',
        padding: '20px 24px',
        borderRadius: 12,
        border: '1px solid rgba(65, 109, 137, 0.25)',
        background: 'rgba(65, 109, 137, 0.04)',
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
        <Bookmark
          size={18}
          style={{
            color: 'var(--athena-accent)',
          }}
        />
        <h4
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0.3,
            textTransform: 'uppercase',
            color: 'var(--athena-accent)',
          }}
        >
          {title}
        </h4>
      </div>

      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '8px 0',
              borderTop: idx > 0 ? '1px solid rgba(65, 109, 137, 0.12)' : undefined,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--athena-accent)',
                marginTop: 7,
              }}
            />
            <span
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--athena-fg)',
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
