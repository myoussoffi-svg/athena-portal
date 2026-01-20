'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  ContactWithMeta,
  ContactListResponse,
  CreateContactInput,
  UpdateContactInput,
  EmailTemplateType,
  GeneratedEmail,
  OutreachStatus,
} from '@/lib/outreach/schemas';
import { MAX_CONTACTS_PER_USER, MAX_EMAIL_GENERATIONS_PER_DAY, statusLabels } from '@/lib/outreach/status-machine';
import { ContactList } from './ContactList';
import { AddContactModal } from './AddContactModal';
import { EditContactModal } from './EditContactModal';
import { EmailGenerator } from './EmailGenerator';
import { ActionNeededPanel } from './ActionNeededPanel';

type FilterStatus = OutreachStatus | 'all' | 'follow-up-due';

// Helper to calculate days overdue for sorting
function getDaysOverdue(followUpDue: string | null): number {
  if (!followUpDue) return -9999; // No follow-up, sort to bottom
  const due = new Date(followUpDue);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
}

export function OutreachDashboard() {
  const [contacts, setContacts] = useState<ContactWithMeta[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactWithMeta | null>(null);
  const [emailGenContact, setEmailGenContact] = useState<ContactWithMeta | null>(null);
  const [generationsRemaining, setGenerationsRemaining] = useState(MAX_EMAIL_GENERATIONS_PER_DAY);

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch('/api/outreach/contacts');
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data: ContactListResponse = await res.json();
      setContacts(data.contacts);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Filter and sort contacts - overdue contacts always appear first
  const filteredContacts = contacts
    .filter((c) => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'follow-up-due') return c.isFollowUpDue;
      return c.status === filterStatus;
    })
    .sort((a, b) => {
      // Sort by: overdue first (most overdue at top), then by last updated
      const aOverdue = a.isFollowUpDue ? getDaysOverdue(a.followUpDue) : -9999;
      const bOverdue = b.isFollowUpDue ? getDaysOverdue(b.followUpDue) : -9999;
      if (aOverdue !== bOverdue) return bOverdue - aOverdue;
      // Secondary sort by updated date
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  // Add contact
  const handleAddContact = async (data: CreateContactInput) => {
    const res = await fetch('/api/outreach/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to add contact');
    }
    await fetchContacts();
  };

  // Update contact
  const handleUpdateContact = async (id: string, data: UpdateContactInput) => {
    const res = await fetch(`/api/outreach/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update contact');
    }
    await fetchContacts();
  };

  // Delete contact
  const handleDeleteContact = async (id: string) => {
    const res = await fetch(`/api/outreach/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete contact');
    }
    await fetchContacts();
  };

  // Generate email
  const handleGenerateEmail = async (
    contactId: string,
    templateType: EmailTemplateType,
    additionalContext?: string
  ): Promise<{ email: GeneratedEmail; generationsRemaining: number }> => {
    const res = await fetch('/api/outreach/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId, templateType, additionalContext }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to generate email');
    }
    const data = await res.json();
    setGenerationsRemaining(data.generationsRemaining);
    return data;
  };

  // Status filter options
  const statusFilters: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'follow-up-due', label: 'Follow-ups' },
    { value: 'identified', label: statusLabels.identified },
    { value: 'contacted', label: statusLabels.contacted },
    { value: 'responded', label: statusLabels.responded },
    { value: 'scheduled', label: statusLabels.scheduled },
    { value: 'spoke', label: statusLabels.spoke },
    { value: 'advocate', label: statusLabels.advocate },
    { value: 'stale', label: statusLabels.stale },
  ];

  if (isLoading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'rgba(10, 10, 10, 0.5)' }}>
        Loading contacts...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>
              Outreach Tracker
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(10, 10, 10, 0.6)', maxWidth: 480 }}>
              Track your networking contacts and stay on top of follow-ups.
              {total > 0 && (
                <span style={{ marginLeft: 8, color: 'rgba(10, 10, 10, 0.4)' }}>
                  {total}/{MAX_CONTACTS_PER_USER} contacts
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            disabled={total >= MAX_CONTACTS_PER_USER}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#416D89',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              cursor: total >= MAX_CONTACTS_PER_USER ? 'not-allowed' : 'pointer',
              opacity: total >= MAX_CONTACTS_PER_USER ? 0.6 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            + Add Contact
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            marginBottom: 16,
            borderRadius: 8,
            background: 'rgba(220, 38, 38, 0.08)',
            color: '#dc2626',
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {/* Action Needed Panel - prominent notification area */}
      <ActionNeededPanel
        contacts={contacts}
        onContactClick={setEditingContact}
        onGenerateEmail={setEmailGenContact}
      />

      {/* Filters */}
      {total > 0 && (
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          {statusFilters.map((filter) => {
            const count =
              filter.value === 'all'
                ? contacts.length
                : filter.value === 'follow-up-due'
                ? contacts.filter((c) => c.isFollowUpDue).length
                : contacts.filter((c) => c.status === filter.value).length;

            if (count === 0 && filter.value !== 'all') return null;

            return (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: filterStatus === filter.value
                    ? '1px solid #416D89'
                    : '1px solid rgba(10, 10, 10, 0.1)',
                  background: filterStatus === filter.value
                    ? 'rgba(65, 109, 137, 0.08)'
                    : 'transparent',
                  color: filterStatus === filter.value ? '#416D89' : 'rgba(10, 10, 10, 0.65)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {filter.label}
                {count > 0 && (
                  <span style={{ marginLeft: 6, opacity: 0.7 }}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Contact list */}
      <ContactList
        contacts={filteredContacts}
        onEdit={setEditingContact}
        onGenerateEmail={setEmailGenContact}
      />

      {/* Modals */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddContact}
      />

      <EditContactModal
        contact={editingContact}
        onClose={() => setEditingContact(null)}
        onSubmit={handleUpdateContact}
        onDelete={handleDeleteContact}
      />

      <EmailGenerator
        contact={emailGenContact}
        onClose={() => setEmailGenContact(null)}
        generationsRemaining={generationsRemaining}
        onGenerate={handleGenerateEmail}
      />
    </div>
  );
}
