'use client';

import type { ContactWithMeta } from '@/lib/outreach/schemas';

interface ActionNeededPanelProps {
  contacts: ContactWithMeta[];
  onContactClick: (contact: ContactWithMeta) => void;
  onGenerateEmail: (contact: ContactWithMeta) => void;
}

function getDaysOverdue(followUpDue: string | null): number {
  if (!followUpDue) return 0;
  const due = new Date(followUpDue);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
}

function getUrgencyLevel(daysOverdue: number): 'critical' | 'warning' | 'reminder' {
  if (daysOverdue >= 7) return 'critical';
  if (daysOverdue >= 3) return 'warning';
  return 'reminder';
}

function getActionText(status: string): string {
  switch (status) {
    case 'contacted':
      return 'Send follow-up email';
    case 'responded':
      return 'Schedule a call';
    case 'spoke':
      return 'Send thank-you note';
    case 'advocate':
      return 'Check in with them';
    default:
      return 'Follow up';
  }
}

export function ActionNeededPanel({ contacts, onContactClick, onGenerateEmail }: ActionNeededPanelProps) {
  // Filter to only overdue contacts and sort by urgency
  const overdueContacts = contacts
    .filter((c) => c.isFollowUpDue)
    .map((c) => ({
      ...c,
      daysOverdue: getDaysOverdue(c.followUpDue),
    }))
    .sort((a, b) => b.daysOverdue - a.daysOverdue);

  if (overdueContacts.length === 0) return null;

  const criticalCount = overdueContacts.filter((c) => c.daysOverdue >= 7).length;
  const warningCount = overdueContacts.filter((c) => c.daysOverdue >= 3 && c.daysOverdue < 7).length;

  return (
    <div
      style={{
        marginBottom: 24,
        borderRadius: 14,
        border: criticalCount > 0
          ? '1px solid rgba(220, 38, 38, 0.25)'
          : '1px solid rgba(234, 179, 8, 0.3)',
        background: criticalCount > 0
          ? 'rgba(220, 38, 38, 0.04)'
          : 'rgba(234, 179, 8, 0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid rgba(10, 10, 10, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: criticalCount > 0 ? '#dc2626' : '#b45309' }}>
              {overdueContacts.length === 1
                ? '1 Contact Needs Action'
                : `${overdueContacts.length} Contacts Need Action`}
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(10, 10, 10, 0.55)' }}>
              {criticalCount > 0 && (
                <span style={{ color: '#dc2626', fontWeight: 500 }}>
                  {criticalCount} overdue 7+ days
                  {warningCount > 0 && ' · '}
                </span>
              )}
              {warningCount > 0 && (
                <span style={{ color: '#b45309', fontWeight: 500 }}>
                  {warningCount} overdue 3+ days
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Contact list */}
      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
        {overdueContacts.slice(0, 5).map((contact) => {
          const urgency = getUrgencyLevel(contact.daysOverdue);
          const actionText = getActionText(contact.status);

          return (
            <div
              key={contact.id}
              style={{
                padding: '12px 18px',
                borderBottom: '1px solid rgba(10, 10, 10, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                cursor: 'pointer',
                transition: 'background 150ms ease',
              }}
              onClick={() => onContactClick(contact)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(10, 10, 10, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{contact.name}</span>
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 600,
                      background: urgency === 'critical'
                        ? 'rgba(220, 38, 38, 0.15)'
                        : urgency === 'warning'
                        ? 'rgba(234, 179, 8, 0.2)'
                        : 'rgba(10, 10, 10, 0.08)',
                      color: urgency === 'critical'
                        ? '#dc2626'
                        : urgency === 'warning'
                        ? '#b45309'
                        : 'rgba(10, 10, 10, 0.6)',
                    }}
                  >
                    {contact.daysOverdue === 0 ? 'Due today' : `${contact.daysOverdue}d overdue`}
                  </span>
                </div>
                <div style={{ marginTop: 2, fontSize: 12, color: 'rgba(10, 10, 10, 0.55)' }}>
                  {contact.firm} · {actionText}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerateEmail(contact);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: 'none',
                  background: '#416D89',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Draft Email
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer if more than 5 */}
      {overdueContacts.length > 5 && (
        <div
          style={{
            padding: '10px 18px',
            borderTop: '1px solid rgba(10, 10, 10, 0.06)',
            textAlign: 'center',
            fontSize: 12,
            color: 'rgba(10, 10, 10, 0.5)',
          }}
        >
          + {overdueContacts.length - 5} more contacts need follow-ups
        </div>
      )}
    </div>
  );
}
