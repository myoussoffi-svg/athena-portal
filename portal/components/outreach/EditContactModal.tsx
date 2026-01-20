'use client';

import { useState, useEffect } from 'react';
import type { ContactWithMeta, UpdateContactInput, ConnectionType, ContactRole, OutreachStatus } from '@/lib/outreach/schemas';
import { getValidNextStatuses, statusLabels } from '@/lib/outreach/status-machine';
import { StatusBadge } from './StatusBadge';

interface EditContactModalProps {
  contact: ContactWithMeta | null;
  onClose: () => void;
  onSubmit: (id: string, data: UpdateContactInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function EditContactModal({ contact, onClose, onSubmit, onDelete }: EditContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [name, setName] = useState('');
  const [firm, setFirm] = useState('');
  const [role, setRole] = useState<ContactRole | ''>('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [connectionType, setConnectionType] = useState<ConnectionType | ''>('');
  const [connectionNote, setConnectionNote] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<OutreachStatus>('identified');

  // Populate form when contact changes
  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setFirm(contact.firm);
      setRole(contact.role || '');
      setEmail(contact.email || '');
      setLinkedinUrl(contact.linkedinUrl || '');
      setConnectionType(contact.connectionType || '');
      setConnectionNote(contact.connectionNote || '');
      setNotes(contact.notes || '');
      setStatus(contact.status);
      setError(null);
      setShowDeleteConfirm(false);
    }
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const updates: UpdateContactInput = {};

      if (name.trim() !== contact.name) updates.name = name.trim();
      if (firm.trim() !== contact.firm) updates.firm = firm.trim();
      if ((role || null) !== contact.role) updates.role = role || null;
      if ((email.trim() || null) !== contact.email) updates.email = email.trim() || null;
      if ((linkedinUrl.trim() || null) !== contact.linkedinUrl) updates.linkedinUrl = linkedinUrl.trim() || null;
      if ((connectionType || null) !== contact.connectionType) updates.connectionType = connectionType || null;
      if ((connectionNote.trim() || null) !== contact.connectionNote) updates.connectionNote = connectionNote.trim() || null;
      if ((notes.trim() || null) !== contact.notes) updates.notes = notes.trim() || null;
      if (status !== contact.status) {
        updates.status = status;
        updates.lastContactDate = new Date().toISOString();
      }

      await onSubmit(contact.id, updates);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!contact) return;
    setIsDeleting(true);
    try {
      await onDelete(contact.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!contact) return null;

  const validNextStatuses = getValidNextStatuses(contact.status);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid rgba(10, 10, 10, 0.12)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 150ms',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(10, 10, 10, 0.75)',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: '100%',
          maxWidth: 480,
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(10, 10, 10, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Edit Contact</h2>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: 'none',
              background: 'rgba(10, 10, 10, 0.05)',
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 20 }}>
          {error && (
            <div
              style={{
                padding: '10px 12px',
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

          <div style={{ display: 'grid', gap: 16 }}>
            {/* Status section */}
            <div
              style={{
                padding: 14,
                borderRadius: 10,
                background: 'rgba(10, 10, 10, 0.02)',
                border: '1px solid rgba(10, 10, 10, 0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.5)', marginBottom: 6 }}>
                    Current Status
                  </div>
                  <StatusBadge status={contact.status} />
                </div>
                {validNextStatuses.length > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.5)', marginBottom: 6 }}>
                      Update to
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {validNextStatuses.map((nextStatus) => (
                        <button
                          key={nextStatus}
                          type="button"
                          onClick={() => setStatus(nextStatus)}
                          style={{
                            padding: '5px 10px',
                            borderRadius: 6,
                            border: status === nextStatus
                              ? '1px solid #416D89'
                              : '1px solid rgba(10, 10, 10, 0.12)',
                            background: status === nextStatus
                              ? 'rgba(65, 109, 137, 0.1)'
                              : 'transparent',
                            color: status === nextStatus ? '#416D89' : 'rgba(10, 10, 10, 0.65)',
                            fontSize: 12,
                            fontWeight: 500,
                            cursor: 'pointer',
                          }}
                        >
                          {statusLabels[nextStatus]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Name & Firm - row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Firm *</label>
                <input
                  type="text"
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Role & Email - row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as ContactRole | '')}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">Select role</option>
                  <option value="analyst">Analyst</option>
                  <option value="associate">Associate</option>
                  <option value="vp">VP</option>
                  <option value="director">Director</option>
                  <option value="md">MD</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* LinkedIn URL */}
            <div>
              <label style={labelStyle}>
                LinkedIn URL
                <span style={{ fontWeight: 400, color: 'rgba(10, 10, 10, 0.5)', marginLeft: 6 }}>
                  (enables personalized emails)
                </span>
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/johnsmith"
                style={inputStyle}
              />
            </div>

            {/* Connection Type */}
            <div>
              <label style={labelStyle}>How do you know them?</label>
              <select
                value={connectionType}
                onChange={(e) => setConnectionType(e.target.value as ConnectionType | '')}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="">Select connection type</option>
                <option value="alumni">Alumni (same school)</option>
                <option value="referral">Referral (someone introduced you)</option>
                <option value="cold">Cold (no prior connection)</option>
                <option value="event">Event (met at conference, etc.)</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Connection Note */}
            <div>
              <label style={labelStyle}>Connection note</label>
              <input
                type="text"
                value={connectionNote}
                onChange={(e) => setConnectionNote(e.target.value)}
                placeholder="What you have in common..."
                style={inputStyle}
              />
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional context..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'space-between' }}>
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  background: 'transparent',
                  color: '#dc2626',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#dc2626' }}>Delete?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#dc2626',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isDeleting ? '...' : 'Yes'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid rgba(10, 10, 10, 0.12)',
                    background: 'transparent',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  No
                </button>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(10, 10, 10, 0.12)',
                  background: 'transparent',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !firm.trim()}
                style={{
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#416D89',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting || !name.trim() || !firm.trim() ? 0.6 : 1,
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
