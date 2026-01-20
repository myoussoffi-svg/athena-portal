'use client';

import { useState } from 'react';
import type { CreateContactInput, ConnectionType, ContactRole } from '@/lib/outreach/schemas';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateContactInput) => Promise<void>;
}

export function AddContactModal({ isOpen, onClose, onSubmit }: AddContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [firm, setFirm] = useState('');
  const [role, setRole] = useState<ContactRole | ''>('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [connectionType, setConnectionType] = useState<ConnectionType | ''>('');
  const [connectionNote, setConnectionNote] = useState('');
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setName('');
    setFirm('');
    setRole('');
    setEmail('');
    setLinkedinUrl('');
    setConnectionType('');
    setConnectionNote('');
    setNotes('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        firm: firm.trim(),
        role: role || undefined,
        email: email.trim() || undefined,
        linkedinUrl: linkedinUrl.trim() || undefined,
        connectionType: connectionType || undefined,
        connectionNote: connectionNote.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      resetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

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
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Add Contact</h2>
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
            {/* Name & Firm - row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
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
                  placeholder="Goldman Sachs"
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
                  placeholder="jsmith@gs.com"
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
            {connectionType && (
              <div>
                <label style={labelStyle}>
                  {connectionType === 'alumni' && 'What do you have in common?'}
                  {connectionType === 'referral' && 'Who referred you?'}
                  {connectionType === 'event' && 'Where did you meet?'}
                  {connectionType === 'cold' && 'Why are you reaching out?'}
                  {connectionType === 'other' && 'How are you connected?'}
                </label>
                <input
                  type="text"
                  value={connectionNote}
                  onChange={(e) => setConnectionNote(e.target.value)}
                  placeholder={
                    connectionType === 'alumni' ? 'e.g., Same fraternity, same major' :
                    connectionType === 'referral' ? 'e.g., Sarah Johnson from JPM' :
                    connectionType === 'event' ? 'e.g., Wharton Finance Conference' :
                    'Brief note...'
                  }
                  style={inputStyle}
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label style={labelStyle}>Notes (optional)</label>
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
          <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
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
              {isSubmitting ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
