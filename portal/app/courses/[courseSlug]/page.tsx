'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Track slug to visibility mapping (must match feature-flags.ts)
const COURSE_VISIBILITY: Record<string, boolean> = {
  'investment-banking-interview-prep': true,
  'private-equity-interview-prep': false,
  'advanced-private-equity-associate': false,
};

// Course data (could be fetched from DB, but keeping simple for now)
const COURSES: Record<string, {
  name: string;
  description: string;
  price: number;
  features: string[];
  modules: string[];
}> = {
  'investment-banking-interview-prep': {
    name: 'Investment Banking Interview Prep',
    description: 'Comprehensive preparation for investment banking analyst interviews. Master technical concepts, behavioral questions, and practice with our AI-powered mock interviews.',
    price: 265,
    features: [
      'Complete technical curriculum (accounting, valuation, LBOs, M&A)',
      'Behavioral interview preparation',
      'AI-powered mock interview simulator',
      'Resume feedback tool',
      'Lifetime access to all content',
      'Future content updates included',
    ],
    modules: [
      'Accounting Foundations',
      'Valuation Modeling',
      'Leveraged Buyouts (LBOs)',
      'Mergers & Acquisitions',
      'Behavioral Interview Prep',
      'Mock Interview Practice',
    ],
  },
  'private-equity-interview-prep': {
    name: 'Private Equity Interview Prep',
    description: 'Complete preparation for private equity associate interviews. Deep dive into LBO modeling, case studies, and portfolio company discussions.',
    price: 345,
    features: [
      'Advanced LBO modeling',
      'Case study walkthroughs',
      'Deal discussion preparation',
      'Portfolio company analysis',
      'Lifetime access',
    ],
    modules: [
      'PE Fundamentals',
      'Advanced LBO Modeling',
      'Case Studies',
      'Deal Discussions',
    ],
  },
};

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const courseSlug = params.courseSlug as string;
  const course = COURSES[courseSlug];
  const isVisible = COURSE_VISIBILITY[courseSlug] ?? false;

  if (!course) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>Course Not Found</h1>
        <p style={{ color: '#666', marginBottom: 24 }}>
          The course you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
          Return Home
        </Link>
      </div>
    );
  }

  // Coming Soon page for hidden courses
  if (!isVisible) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{ maxWidth: 500, textAlign: 'center' }}>
          <div style={{
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #416D89 0%, #2d4a5e 100%)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: 36,
          }}>
            🔒
          </div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 16,
            color: '#0A0A0A',
          }}>
            Coming Soon
          </h1>
          <h2 style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 16,
            color: '#416D89',
          }}>
            {course.name}
          </h2>
          <p style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: 'rgba(10, 10, 10, 0.6)',
            marginBottom: 32,
          }}>
            {course.description}
          </p>
          <p style={{
            fontSize: 14,
            color: 'rgba(10, 10, 10, 0.5)',
            marginBottom: 32,
          }}>
            This course is currently in development. Check back soon for updates.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#0A0A0A',
              color: 'white',
              padding: '14px 28px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ← Browse Available Courses
          </Link>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!isSignedIn) {
      // Redirect to sign in with return URL
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
          // User already owns this course, redirect to track
          router.push(`/track/${courseSlug}`);
          return;
        }
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 36, fontWeight: 600, marginBottom: 16 }}>
          {course.name}
        </h1>
        <p style={{ fontSize: 18, color: '#666', lineHeight: 1.6, maxWidth: 700 }}>
          {course.description}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        {/* Left column - Course details */}
        <div>
          {/* Features */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
              What&apos;s Included
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {course.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Curriculum */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
              Curriculum
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {course.modules.map((module, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 16,
                    background: '#f8f9fa',
                    borderRadius: 8,
                  }}
                >
                  <span style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#1a1a1a',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 500,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontWeight: 500 }}>{module}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column - Purchase card */}
        <div>
          <div style={{
            position: 'sticky',
            top: 24,
            background: 'white',
            border: '1px solid #e5e5e5',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 36, fontWeight: 600 }}>
                ${course.price}
              </span>
              <span style={{ color: '#666', marginLeft: 8 }}>
                one-time
              </span>
            </div>

            <button
              onClick={handlePurchase}
              disabled={isLoading || !isLoaded}
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: 16,
                fontWeight: 500,
                background: isLoading ? '#999' : '#1a1a1a',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                marginBottom: 16,
              }}
            >
              {isLoading ? 'Loading...' : isSignedIn ? 'Enroll Now' : 'Sign In to Enroll'}
            </button>

            {error && (
              <p style={{ color: '#dc2626', fontSize: 14, marginBottom: 16 }}>
                {error}
              </p>
            )}

            <div style={{ fontSize: 14, color: '#666' }}>
              <p style={{ marginBottom: 8 }}>
                <strong>Lifetime access</strong> - learn at your own pace
              </p>
              <p style={{ marginBottom: 8 }}>
                <strong>No refunds</strong> - please review before purchasing
              </p>
              <p>
                <Link href="/refund-policy" style={{ color: '#666', textDecoration: 'underline' }}>
                  View refund policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div style={{
        marginTop: 64,
        paddingTop: 24,
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: 24,
        fontSize: 14,
        color: '#666',
      }}>
        <Link href="/terms" style={{ color: '#666' }}>Terms of Service</Link>
        <Link href="/privacy" style={{ color: '#666' }}>Privacy Policy</Link>
        <Link href="/refund-policy" style={{ color: '#666' }}>Refund Policy</Link>
      </div>
    </div>
  );
}
