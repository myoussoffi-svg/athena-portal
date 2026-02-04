'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface PurchaseButtonProps {
  courseSlug: string;
}

export function PurchaseButton({ courseSlug }: PurchaseButtonProps) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/courses/${courseSlug}`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: courseSlug }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          // Already purchased - redirect to course
          router.push(`/track/${courseSlug}`);
          return;
        }
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handlePurchase}
        disabled={isLoading || !isLoaded}
        style={{
          width: '100%',
          padding: '16px 24px',
          fontSize: 16,
          fontWeight: 600,
          background: isLoading || !isLoaded ? '#999' : '#0A0A0A',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          cursor: isLoading || !isLoaded ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s ease',
          marginBottom: 20,
        }}
        onMouseEnter={(e) => {
          if (!isLoading && isLoaded) {
            e.currentTarget.style.background = '#416D89';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading && isLoaded) {
            e.currentTarget.style.background = '#0A0A0A';
          }
        }}
      >
        {isLoading ? 'Loading...' : isSignedIn ? 'Enroll Now' : 'Sign In to Enroll'}
      </button>

      {error && (
        <p style={{
          color: '#dc2626',
          fontSize: 14,
          marginBottom: 16,
          padding: 12,
          background: 'rgba(220, 38, 38, 0.05)',
          borderRadius: 8,
        }}>
          {error}
        </p>
      )}
    </>
  );
}
