'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ContactWithMeta, EmailTemplateType, GeneratedEmail } from '@/lib/outreach/schemas';

interface EmailGeneratorProps {
  contact: ContactWithMeta | null;
  onClose: () => void;
  generationsRemaining: number;
  onGenerate: (contactId: string, templateType: EmailTemplateType, additionalContext?: string) => Promise<{ email: GeneratedEmail; generationsRemaining: number }>;
}

const templateOptions: { value: EmailTemplateType; label: string; description: string }[] = [
  { value: 'initial-alumni', label: 'Initial (Alumni)', description: 'First reach-out to a school alumnus' },
  { value: 'initial-referral', label: 'Initial (Referral)', description: 'First reach-out via a referral' },
  { value: 'initial-cold', label: 'Initial (Cold)', description: 'First reach-out with no prior connection' },
  { value: 'initial-event', label: 'Initial (Event)', description: 'Follow-up after meeting at an event' },
  { value: 'follow-up-first', label: 'First Follow-Up', description: 'Gentle nudge after no response' },
  { value: 'follow-up-second', label: 'Second Follow-Up', description: 'Final attempt before moving on' },
  { value: 'thank-you', label: 'Thank You', description: 'After a call or meeting' },
  { value: 'scheduling-reply', label: 'Scheduling Reply', description: 'Confirming a meeting time' },
];

function getSuggestedTemplate(contact: ContactWithMeta): EmailTemplateType {
  if (contact.status === 'spoke') return 'thank-you';
  if (contact.status === 'contacted') return 'follow-up-first';
  if (contact.status === 'responded') return 'scheduling-reply';
  if (contact.connectionType === 'alumni') return 'initial-alumni';
  if (contact.connectionType === 'referral') return 'initial-referral';
  if (contact.connectionType === 'event') return 'initial-event';
  if (contact.connectionType === 'cold') return 'initial-cold';
  return 'initial-alumni';
}

export function EmailGenerator({ contact, onClose, generationsRemaining, onGenerate }: EmailGeneratorProps) {
  const [templateType, setTemplateType] = useState<EmailTemplateType>('initial-alumni');
  const [additionalContext, setAdditionalContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);
  const [remaining, setRemaining] = useState(generationsRemaining);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<'subject' | 'body' | null>(null);

  // Set initial template based on contact
  useEffect(() => {
    if (contact) {
      setTemplateType(getSuggestedTemplate(contact));
      // Reset state when contact changes
      setAdditionalContext('');
      setGeneratedEmail(null);
      setError(null);
    }
  }, [contact]);

  // Update remaining when prop changes
  useEffect(() => {
    setRemaining(generationsRemaining);
  }, [generationsRemaining]);

  const handleGenerate = useCallback(async () => {
    if (!contact) return;
    setError(null);
    setIsGenerating(true);
    setGeneratedEmail(null);

    try {
      const result = await onGenerate(contact.id, templateType, additionalContext.trim() || undefined);
      setGeneratedEmail(result.email);
      setRemaining(result.generationsRemaining);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate email');
    } finally {
      setIsGenerating(false);
    }
  }, [contact, templateType, additionalContext, onGenerate]);

  const handleCopy = useCallback(async (type: 'subject' | 'body') => {
    if (!generatedEmail) return;
    const text = type === 'subject' ? generatedEmail.subject : generatedEmail.body;
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, [generatedEmail]);

  // Don't render if no contact
  if (!contact) return null;

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
          maxWidth: 600,
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
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Generate Email</h2>
            <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(10, 10, 10, 0.55)' }}>
              For {contact.name} at {contact.firm}
            </div>
          </div>
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

        <div style={{ padding: 20 }}>
          {/* Rate limit info */}
          <div
            style={{
              padding: '10px 12px',
              marginBottom: 16,
              borderRadius: 8,
              background: remaining <= 3 ? 'rgba(255, 140, 0, 0.08)' : 'rgba(65, 109, 137, 0.06)',
              fontSize: 13,
              color: remaining <= 3 ? '#FF8C00' : 'rgba(10, 10, 10, 0.6)',
            }}
          >
            {remaining} generation{remaining !== 1 ? 's' : ''} remaining today
          </div>

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

          {!generatedEmail ? (
            <>
              {/* Template selection */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'rgba(10, 10, 10, 0.75)',
                  }}
                >
                  Email Type
                </label>
                <div style={{ display: 'grid', gap: 8 }}>
                  {templateOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTemplateType(opt.value)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: templateType === opt.value
                          ? '1px solid #416D89'
                          : '1px solid rgba(10, 10, 10, 0.1)',
                        background: templateType === opt.value
                          ? 'rgba(65, 109, 137, 0.06)'
                          : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 150ms',
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 500, color: templateType === opt.value ? '#416D89' : 'inherit' }}>
                        {opt.label}
                      </div>
                      <div style={{ marginTop: 2, fontSize: 12, color: 'rgba(10, 10, 10, 0.5)' }}>
                        {opt.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional context */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'rgba(10, 10, 10, 0.75)',
                  }}
                >
                  Additional context (optional)
                </label>
                <textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="e.g., I'm particularly interested in their M&A practice..."
                  rows={3}
                  maxLength={500}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(10, 10, 10, 0.12)',
                    fontSize: 14,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
                <div style={{ marginTop: 4, fontSize: 11, color: 'rgba(10, 10, 10, 0.4)', textAlign: 'right' }}>
                  {additionalContext.length}/500
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || remaining === 0}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#416D89',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isGenerating || remaining === 0 ? 'not-allowed' : 'pointer',
                  opacity: isGenerating || remaining === 0 ? 0.6 : 1,
                }}
              >
                {isGenerating ? 'Generating...' : remaining === 0 ? 'Daily limit reached' : 'Generate Email'}
              </button>
            </>
          ) : (
            <>
              {/* Generated email display */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(10, 10, 10, 0.75)' }}>
                    Subject Line
                  </label>
                  <button
                    onClick={() => handleCopy('subject')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      border: '1px solid rgba(10, 10, 10, 0.1)',
                      background: 'transparent',
                      fontSize: 11,
                      cursor: 'pointer',
                      color: copied === 'subject' ? '#228B22' : 'rgba(10, 10, 10, 0.55)',
                    }}
                  >
                    {copied === 'subject' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 8,
                    background: 'rgba(10, 10, 10, 0.03)',
                    border: '1px solid rgba(10, 10, 10, 0.06)',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {generatedEmail.subject}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(10, 10, 10, 0.75)' }}>
                    Email Body
                  </label>
                  <button
                    onClick={() => handleCopy('body')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      border: '1px solid rgba(10, 10, 10, 0.1)',
                      background: 'transparent',
                      fontSize: 11,
                      cursor: 'pointer',
                      color: copied === 'body' ? '#228B22' : 'rgba(10, 10, 10, 0.55)',
                    }}
                  >
                    {copied === 'body' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 8,
                    background: 'rgba(10, 10, 10, 0.03)',
                    border: '1px solid rgba(10, 10, 10, 0.06)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {generatedEmail.body}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setGeneratedEmail(null)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: '1px solid rgba(10, 10, 10, 0.12)',
                    background: 'transparent',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Try Another
                </button>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#416D89',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
