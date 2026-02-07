'use client';

import { useState, useEffect } from 'react';

interface UserSettings {
  userName: string | null;
  userSchool: string | null;
  userYear: string | null;
  userMajor: string | null;
  userInterest: string | null;
  userPreviousExperience: string | null;
  userHometown: string | null;
}

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const YEAR_OPTIONS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Recent Grad', 'MBA 1st Year', 'MBA 2nd Year'];

export function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
  const [settings, setSettings] = useState<UserSettings>({
    userName: null,
    userSchool: null,
    userYear: null,
    userMajor: null,
    userInterest: null,
    userPreviousExperience: null,
    userHometown: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch settings on mount
  useEffect(() => {
    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/outreach/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const res = await fetch('/api/outreach/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');

      setSuccessMessage('Settings saved successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof UserSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(10, 10, 10, 0.08)',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Profile Settings</h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(10, 10, 10, 0.6)' }}>
            Your profile helps generate personalized outreach emails
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px' }}>
          {isLoading ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'rgba(10, 10, 10, 0.5)' }}>
              Loading...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Basic Info Section */}
              <div style={{ marginBottom: 8 }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'rgba(10, 10, 10, 0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Basic Info
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={settings.userName || ''}
                      onChange={(e) => handleChange('userName', e.target.value)}
                      placeholder="e.g., John Smith"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid rgba(10, 10, 10, 0.15)',
                        fontSize: 14,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* School */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
                      School
                    </label>
                    <input
                      type="text"
                      value={settings.userSchool || ''}
                      onChange={(e) => handleChange('userSchool', e.target.value)}
                      placeholder="e.g., University of Michigan"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid rgba(10, 10, 10, 0.15)',
                        fontSize: 14,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Year & Major Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
                        Year
                      </label>
                      <select
                        value={settings.userYear || ''}
                        onChange={(e) => handleChange('userYear', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid rgba(10, 10, 10, 0.15)',
                          fontSize: 14,
                          outline: 'none',
                          background: '#fff',
                          boxSizing: 'border-box',
                        }}
                      >
                        <option value="">Select year...</option>
                        {YEAR_OPTIONS.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
                        Major
                      </label>
                      <input
                        type="text"
                        value={settings.userMajor || ''}
                        onChange={(e) => handleChange('userMajor', e.target.value)}
                        placeholder="e.g., Finance"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid rgba(10, 10, 10, 0.15)',
                          fontSize: 14,
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
                      Interest Area
                    </label>
                    <input
                      type="text"
                      value={settings.userInterest || ''}
                      onChange={(e) => handleChange('userInterest', e.target.value)}
                      placeholder="e.g., Tech coverage, Healthcare M&A"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid rgba(10, 10, 10, 0.15)',
                        fontSize: 14,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(10, 10, 10, 0.5)' }}>
                      What area of banking interests you most?
                    </p>
                  </div>
                </div>
              </div>

              {/* Personalization Section */}
              <div style={{ borderTop: '1px solid rgba(10, 10, 10, 0.08)', paddingTop: 16 }}>
                <h3 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: 'rgba(10, 10, 10, 0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  For Better Personalization
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: 12, color: 'rgba(10, 10, 10, 0.5)' }}>
                  Help us find commonalities with your contacts
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Previous Experience */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
                      Previous Experience
                    </label>
                    <textarea
                      value={settings.userPreviousExperience || ''}
                      onChange={(e) => handleChange('userPreviousExperience', e.target.value)}
                      placeholder="e.g., Goldman Sachs SA '24, Deloitte intern '23, Morgan Stanley externship"
                      rows={2}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid rgba(10, 10, 10, 0.15)',
                        fontSize: 14,
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(10, 10, 10, 0.5)' }}>
                      Internships, externships, or relevant work experience
                    </p>
                  </div>

                  {/* Hometown */}
                  <div>
                    <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
                      Hometown
                    </label>
                    <input
                      type="text"
                      value={settings.userHometown || ''}
                      onChange={(e) => handleChange('userHometown', e.target.value)}
                      placeholder="e.g., Dallas, TX"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid rgba(10, 10, 10, 0.15)',
                        fontSize: 14,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(10, 10, 10, 0.5)' }}>
                      Used to find regional connections with contacts
                    </p>
                  </div>
                </div>
              </div>

              {/* Info box */}
              <div
                style={{
                  marginTop: 8,
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: 'rgba(65, 109, 137, 0.06)',
                  border: '1px solid rgba(65, 109, 137, 0.15)',
                }}
              >
                <p style={{ margin: 0, fontSize: 12, color: '#416D89', lineHeight: 1.5 }}>
                  <strong>How this helps:</strong> When generating emails, we&apos;ll look for shared
                  experiences with your contacts - like if they went to your school, worked at a company
                  where you interned, or are from your hometown.
                </p>
              </div>

              {/* Messages */}
              {error && (
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(220, 38, 38, 0.08)',
                    color: '#dc2626',
                    fontSize: 13,
                  }}
                >
                  {error}
                </div>
              )}

              {successMessage && (
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(22, 163, 74, 0.08)',
                    color: '#16a34a',
                    fontSize: 13,
                  }}
                >
                  {successMessage}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(10, 10, 10, 0.08)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: '1px solid rgba(10, 10, 10, 0.15)',
              background: 'transparent',
              color: 'rgba(10, 10, 10, 0.7)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || isSaving}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: 'none',
              background: '#416D89',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              cursor: isLoading || isSaving ? 'not-allowed' : 'pointer',
              opacity: isLoading || isSaving ? 0.6 : 1,
            }}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
