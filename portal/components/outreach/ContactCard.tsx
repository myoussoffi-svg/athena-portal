'use client';

import { useState } from 'react';
import type { ContactWithMeta } from '@/lib/outreach/schemas';
import { StatusBadge } from './StatusBadge';

interface ContactCardProps {
  contact: ContactWithMeta;
  onEdit: (contact: ContactWithMeta) => void;
  onGenerateEmail: (contact: ContactWithMeta) => void;
  onQuickCopy?: (contact: ContactWithMeta) => void;
  onMarkAsSent?: (contact: ContactWithMeta) => Promise<void>;
}

function getDaysOverdue(followUpDue: string | null): number {
  if (!followUpDue) return 0;
  const due = new Date(followUpDue);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
}

function getUrgencyStyle(daysOverdue: number): { bg: string; color: string; text: string } {
  if (daysOverdue >= 7) {
    return { bg: 'rgba(220, 38, 38, 0.15)', color: '#dc2626', text: `${daysOverdue}d overdue!` };
  }
  if (daysOverdue >= 3) {
    return { bg: 'rgba(234, 179, 8, 0.2)', color: '#b45309', text: `${daysOverdue}d overdue` };
  }
  if (daysOverdue > 0) {
    return { bg: 'rgba(234, 179, 8, 0.15)', color: '#ca8a04', text: `${daysOverdue}d overdue` };
  }
  return { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', text: 'Due today' };
}

export function ContactCard({ contact, onEdit, onGenerateEmail, onQuickCopy, onMarkAsSent }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [markingAsSent, setMarkingAsSent] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!contact.email) return;

    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onQuickCopy?.(contact);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleMarkAsSent = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (markingAsSent || contact.status !== 'identified') return;

    setMarkingAsSent(true);
    try {
      await onMarkAsSent?.(contact);
    } finally {
      setMarkingAsSent(false);
    }
  };

  const roleLabels: Record<string, string> = {
    analyst: 'Analyst',
    associate: 'Associate',
    vp: 'VP',
    director: 'Director',
    md: 'MD',
    other: 'Other',
  };

  const connectionLabels: Record<string, string> = {
    alumni: 'Alumni',
    referral: 'Referral',
    cold: 'Cold',
    event: 'Event',
    other: 'Other',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 16,
        borderRadius: 14,
        border: '1px solid rgba(10, 10, 10, 0.08)',
        background: isHovered ? 'rgba(65, 109, 137, 0.02)' : '#fff',
        borderColor: isHovered ? 'rgba(65, 109, 137, 0.2)' : 'rgba(10, 10, 10, 0.08)',
        transition: 'all 150ms ease',
        cursor: 'pointer',
      }}
      onClick={() => onEdit(contact)}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>
              {contact.name}
            </h3>
            {contact.isFollowUpDue && (() => {
              const daysOverdue = getDaysOverdue(contact.followUpDue);
              const urgency = getUrgencyStyle(daysOverdue);
              return (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    background: urgency.bg,
                    color: urgency.color,
                  }}
                >
                  ⏰ {urgency.text}
                </span>
              );
            })()}
          </div>
          <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(10, 10, 10, 0.65)' }}>
            {contact.role && <span>{roleLabels[contact.role]} at </span>}
            <span style={{ fontWeight: 500 }}>{contact.firm}</span>
          </div>
        </div>
        <StatusBadge status={contact.status} size="sm" />
      </div>

      {/* Meta row */}
      <div style={{ marginTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: 'rgba(10, 10, 10, 0.55)' }}>
        {contact.connectionType && (
          <span>{connectionLabels[contact.connectionType]}</span>
        )}
        {contact.daysSinceContact !== null && (
          <span>
            {contact.daysSinceContact === 0
              ? 'Contacted today'
              : contact.daysSinceContact === 1
              ? 'Contacted yesterday'
              : `${contact.daysSinceContact}d ago`}
          </span>
        )}
        {contact.email && (
          <span style={{ color: 'rgba(10, 10, 10, 0.4)' }}>
            {contact.email}
          </span>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid rgba(10, 10, 10, 0.06)',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 150ms ease',
        }}
      >
        {/* Quick copy email button */}
        {contact.email && (
          <button
            onClick={handleCopyEmail}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: copied
                ? '1px solid rgba(34, 197, 94, 0.5)'
                : '1px solid rgba(65, 109, 137, 0.3)',
              background: copied
                ? 'rgba(34, 197, 94, 0.1)'
                : 'rgba(65, 109, 137, 0.08)',
              color: copied ? '#16a34a' : '#416D89',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
        )}

        {/* Mark as sent button - only show for 'identified' status */}
        {contact.status === 'identified' && onMarkAsSent && (
          <button
            onClick={handleMarkAsSent}
            disabled={markingAsSent}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid rgba(34, 197, 94, 0.3)',
              background: 'rgba(34, 197, 94, 0.08)',
              color: '#16a34a',
              fontSize: 12,
              fontWeight: 500,
              cursor: markingAsSent ? 'not-allowed' : 'pointer',
              opacity: markingAsSent ? 0.6 : 1,
            }}
          >
            {markingAsSent ? 'Updating...' : 'Mark as Sent'}
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onGenerateEmail(contact);
          }}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid rgba(65, 109, 137, 0.3)',
            background: 'rgba(65, 109, 137, 0.08)',
            color: '#416D89',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Generate Email
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(contact);
          }}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid rgba(10, 10, 10, 0.1)',
            background: 'transparent',
            color: 'rgba(10, 10, 10, 0.65)',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
