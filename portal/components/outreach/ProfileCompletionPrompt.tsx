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

interface ProfileCompletionPromptProps {
  onOpenSettings: () => void;
}

const REQUIRED_FIELDS: (keyof UserSettings)[] = ['userName', 'userSchool', 'userYear'];
const RECOMMENDED_FIELDS: (keyof UserSettings)[] = ['userMajor', 'userInterest'];

export function ProfileCompletionPrompt({ onOpenSettings }: ProfileCompletionPromptProps) {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed this prompt in this session
    const dismissed = sessionStorage.getItem('profile-prompt-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      setIsLoading(false);
      return;
    }

    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/outreach/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      // Don't show prompt if we can't fetch settings
      console.error('Failed to fetch settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('profile-prompt-dismissed', 'true');
    setIsDismissed(true);
  };

  if (isLoading || isDismissed) return null;
  if (!settings) return null;

  // Check if required fields are filled
  const missingRequired = REQUIRED_FIELDS.filter(field => !settings[field]);
  const missingRecommended = RECOMMENDED_FIELDS.filter(field => !settings[field]);

  // If all required fields are filled, don't show prompt
  if (missingRequired.length === 0) return null;

  // Calculate completion percentage
  const totalFields = REQUIRED_FIELDS.length + RECOMMENDED_FIELDS.length;
  const filledFields = totalFields - missingRequired.length - missingRecommended.length;
  const completionPercent = Math.round((filledFields / totalFields) * 100);

  const fieldLabels: Record<string, string> = {
    userName: 'Name',
    userSchool: 'School',
    userYear: 'Year',
    userMajor: 'Major',
    userInterest: 'Interest area',
  };

  return (
    <div
      style={{
        marginBottom: 20,
        padding: '16px 20px',
        borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.08) 0%, rgba(65, 109, 137, 0.04) 100%)',
        border: '1px solid rgba(65, 109, 137, 0.2)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'rgba(65, 109, 137, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#416D89"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>
            Complete your profile
          </h3>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 10,
              background: completionPercent >= 60 ? 'rgba(34, 197, 94, 0.12)' : 'rgba(234, 179, 8, 0.12)',
              color: completionPercent >= 60 ? '#16a34a' : '#ca8a04',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {completionPercent}% complete
          </span>
        </div>

        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'rgba(10, 10, 10, 0.6)', lineHeight: 1.5 }}>
          Add your {missingRequired.map(f => fieldLabels[f] || f).join(', ')} to unlock personalized
          email generation. We&apos;ll find shared experiences with your contacts.
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: 'rgba(10, 10, 10, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${completionPercent}%`,
                background: completionPercent >= 60 ? '#22c55e' : '#eab308',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onOpenSettings}
            style={{
              padding: '8px 14px',
              borderRadius: 6,
              border: 'none',
              background: '#416D89',
              color: '#fff',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Complete Profile
          </button>
          <button
            onClick={handleDismiss}
            style={{
              padding: '8px 14px',
              borderRadius: 6,
              border: '1px solid rgba(10, 10, 10, 0.15)',
              background: 'transparent',
              color: 'rgba(10, 10, 10, 0.6)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Remind me later
          </button>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleDismiss}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 4,
          cursor: 'pointer',
          color: 'rgba(10, 10, 10, 0.4)',
          flexShrink: 0,
        }}
        title="Dismiss"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
