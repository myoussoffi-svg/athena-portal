'use client';

import type { ContactWithMeta } from '@/lib/outreach/schemas';
import { ContactCard } from './ContactCard';

interface ContactListProps {
  contacts: ContactWithMeta[];
  onEdit: (contact: ContactWithMeta) => void;
  onGenerateEmail: (contact: ContactWithMeta) => void;
  onQuickCopy?: (contact: ContactWithMeta) => void;
  onMarkAsSent?: (contact: ContactWithMeta) => Promise<void>;
}

export function ContactList({ contacts, onEdit, onGenerateEmail, onQuickCopy, onMarkAsSent }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: 'center',
          border: '1px dashed rgba(10, 10, 10, 0.12)',
          borderRadius: 14,
          color: 'rgba(10, 10, 10, 0.5)',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>No contacts yet</div>
        <div style={{ fontSize: 13 }}>
          Add your first networking contact to get started.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onGenerateEmail={onGenerateEmail}
          onQuickCopy={onQuickCopy}
          onMarkAsSent={onMarkAsSent}
        />
      ))}
    </div>
  );
}
