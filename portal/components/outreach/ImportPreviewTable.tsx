'use client';

import type { ImportPreviewRow } from '@/lib/outreach/schemas';

interface ImportPreviewTableProps {
  rows: ImportPreviewRow[];
  selectedRows: Set<number>;
  onToggleRow: (rowNumber: number) => void;
  onToggleAll: () => void;
}

export function ImportPreviewTable({
  rows,
  selectedRows,
  onToggleRow,
  onToggleAll,
}: ImportPreviewTableProps) {
  const validRows = rows.filter((r) => r.errors.length === 0);
  const allSelected = validRows.every((r) => selectedRows.has(r.rowNumber));

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ background: 'rgba(10, 10, 10, 0.03)' }}>
            <th style={thStyle}>
              <input
                type="checkbox"
                checked={allSelected && validRows.length > 0}
                onChange={onToggleAll}
                style={{ cursor: 'pointer' }}
              />
            </th>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Bank</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Confidence</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const hasErrors = row.errors.length > 0;
            const isSelected = selectedRows.has(row.rowNumber);

            return (
              <tr
                key={row.rowNumber}
                style={{
                  background: hasErrors
                    ? 'rgba(220, 38, 38, 0.05)'
                    : isSelected
                    ? 'rgba(65, 109, 137, 0.05)'
                    : 'transparent',
                  opacity: hasErrors ? 0.7 : 1,
                }}
              >
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={hasErrors}
                    onChange={() => onToggleRow(row.rowNumber)}
                    style={{ cursor: hasErrors ? 'not-allowed' : 'pointer' }}
                  />
                </td>
                <td style={{ ...tdStyle, color: 'rgba(10, 10, 10, 0.4)' }}>
                  {row.rowNumber}
                </td>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 500 }}>
                    {row.firstName} {row.lastName}
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {row.bank}
                    {row.bankMatched && (
                      <span
                        title="Bank format found"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: 'rgba(34, 197, 94, 0.15)',
                          color: '#16a34a',
                          fontSize: 10,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                </td>
                <td style={tdStyle}>
                  {row.email || row.generatedEmail ? (
                    <div>
                      <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {row.email || row.generatedEmail}
                      </div>
                      {row.generatedEmail && !row.email && (
                        <div
                          style={{
                            fontSize: 10,
                            color: 'rgba(10, 10, 10, 0.5)',
                            marginTop: 2,
                          }}
                        >
                          Auto-generated
                        </div>
                      )}
                    </div>
                  ) : (
                    <span style={{ color: 'rgba(10, 10, 10, 0.3)' }}>—</span>
                  )}
                </td>
                <td style={tdStyle}>
                  <ConfidenceBadge confidence={row.emailConfidence} />
                </td>
                <td style={tdStyle}>
                  {hasErrors ? (
                    <div>
                      {row.errors.map((err, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: 11,
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>✕</span> {err}
                        </div>
                      ))}
                    </div>
                  ) : row.warnings.length > 0 ? (
                    <div>
                      {row.warnings.map((warn, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: 11,
                            color: '#ca8a04',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>⚠</span> {warn}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span
                      style={{
                        fontSize: 11,
                        color: '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>✓</span> Ready to import
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ConfidenceBadge({ confidence }: { confidence: 'high' | 'medium' | 'low' }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    high: { bg: 'rgba(34, 197, 94, 0.15)', color: '#16a34a', label: 'High' },
    medium: { bg: 'rgba(234, 179, 8, 0.15)', color: '#ca8a04', label: 'Medium' },
    low: { bg: 'rgba(10, 10, 10, 0.08)', color: 'rgba(10, 10, 10, 0.5)', label: 'Low' },
  };

  const style = styles[confidence];

  return (
    <span
      style={{
        display: 'inline-flex',
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
        background: style.bg,
        color: style.color,
      }}
    >
      {style.label}
    </span>
  );
}

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'rgba(10, 10, 10, 0.5)',
  borderBottom: '1px solid rgba(10, 10, 10, 0.1)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid rgba(10, 10, 10, 0.06)',
  verticalAlign: 'top',
};
