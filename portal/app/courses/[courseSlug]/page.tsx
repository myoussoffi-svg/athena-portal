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

// Course data
const COURSES: Record<string, {
  name: string;
  description: string;
  price: number;
  features: string[];
  modules: string[];
}> = {
  'investment-banking-interview-prep': {
    name: 'Investment Banking Interview Prep',
    description: 'Master valuation, financial modeling, and behavioral interviews. Covers DCF and LBO fundamentals, interactive case studies, and quiz banks to solidify technicals. Includes a resume feedback tool, outreach tracker for networking emails, and an AI-powered mock interview simulator.',
    price: 265,
    features: [
      'Complete technical curriculum (accounting, valuation, LBOs, M&A)',
      'Interactive case studies with real deal scenarios',
      'Quiz banks to master technical concepts',
      'AI-powered mock interview simulator',
      'Resume feedback tool with actionable insights',
      'Outreach tracker for networking emails',
      'Behavioral interview preparation',
      'Lifetime access with future updates',
    ],
    modules: [
      'Fit, Story & Behavioral',
      'Accounting Foundations',
      'Valuation Modeling',
      'LBOs & Advanced Topics',
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
        background: '#FAFAFA',
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
          router.push(`/track/${courseSlug}`);
          return;
        }
        throw new Error(data.error || 'Failed to create checkout session');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .course-page {
          min-height: 100vh;
          background: #FAFAFA;
          font-family: Inter, system-ui, sans-serif;
        }

        /* Hero Section */
        .course-hero {
          background: #0A0A0A;
          color: white;
          padding: 60px 24px 100px;
          position: relative;
          overflow: hidden;
        }
        .course-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at top right, rgba(65, 109, 137, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .course-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .course-logo {
          font-family: Inter, system-ui, sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px;
        }
        .course-title {
          margin: 0 0 20px;
          font-size: 42px;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }
        .course-desc {
          margin: 0;
          max-width: 600px;
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Content Section */
        .course-content {
          max-width: 900px;
          margin: -50px auto 0;
          padding: 0 24px 80px;
          position: relative;
          z-index: 2;
        }
        .course-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }

        /* Main Card */
        .course-main-card {
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          padding: 32px;
        }
        .section-title {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.4);
          margin: 0 0 20px;
        }
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(10, 10, 10, 0.06);
        }
        .feature-item:last-child {
          border-bottom: none;
        }
        .feature-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(65, 109, 137, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .feature-check svg {
          width: 12px;
          height: 12px;
          stroke: #416D89;
          stroke-width: 2.5;
          fill: none;
        }
        .feature-text {
          font-size: 15px;
          line-height: 1.5;
          color: rgba(10, 10, 10, 0.8);
        }

        /* Modules */
        .module-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .module-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: rgba(10, 10, 10, 0.02);
          border-radius: 10px;
          border: 1px solid rgba(10, 10, 10, 0.04);
        }
        .module-number {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .module-name {
          font-size: 15px;
          font-weight: 500;
          color: #0A0A0A;
        }

        /* Purchase Card */
        .purchase-card {
          position: sticky;
          top: 24px;
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          padding: 28px;
          height: fit-content;
        }
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }
        .price {
          font-size: 40px;
          font-weight: 700;
          color: #0A0A0A;
          letter-spacing: -0.02em;
        }
        .price-note {
          font-size: 15px;
          color: rgba(10, 10, 10, 0.5);
        }
        .price-subtitle {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.5);
          margin-bottom: 24px;
        }
        .enroll-btn {
          width: 100%;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          background: #0A0A0A;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 20px;
        }
        .enroll-btn:hover {
          background: #416D89;
        }
        .enroll-btn:disabled {
          background: #999;
          cursor: not-allowed;
        }
        .error-msg {
          color: #dc2626;
          font-size: 14px;
          margin-bottom: 16px;
          padding: 12px;
          background: rgba(220, 38, 38, 0.05);
          border-radius: 8px;
        }
        .purchase-info {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.5);
          line-height: 1.7;
        }
        .purchase-info p {
          margin: 0 0 8px;
        }
        .purchase-info a {
          color: #416D89;
          text-decoration: none;
        }
        .purchase-info a:hover {
          text-decoration: underline;
        }

        /* Footer */
        .course-footer {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 48px;
        }
        .footer-links {
          display: flex;
          gap: 24px;
          font-size: 13px;
        }
        .footer-links a {
          color: rgba(10, 10, 10, 0.4);
          text-decoration: none;
        }
        .footer-links a:hover {
          color: #416D89;
        }

        /* Back link */
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 20px;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 800px) {
          .course-hero {
            padding: 48px 20px 80px;
          }
          .course-title {
            font-size: 32px;
          }
          .course-content {
            padding: 0 16px 60px;
            margin-top: -40px;
          }
          .course-grid {
            grid-template-columns: 1fr;
          }
          .purchase-card {
            position: static;
          }
          .course-footer {
            padding: 0 16px 40px;
          }
        }
      `}</style>

      <div className="course-page">
        {/* Hero */}
        <div className="course-hero">
          <div className="course-hero-inner">
            <Link href="/" className="back-link">
              ← Back to courses
            </Link>
            <div className="course-logo">ATHENA</div>
            <h1 className="course-title">{course.name}</h1>
            <p className="course-desc">{course.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="course-content">
          <div className="course-grid">
            {/* Main Card */}
            <div className="course-main-card">
              <h2 className="section-title">What&apos;s Included</h2>
              <ul className="feature-list">
                {course.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-check">
                      <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="feature-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="section-title">Curriculum</h2>
              <div className="module-list">
                {course.modules.map((module, i) => (
                  <div key={i} className="module-item">
                    <span className="module-number">{i + 1}</span>
                    <span className="module-name">{module}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Card */}
            <div className="purchase-card">
              <div className="price-row">
                <span className="price">${course.price}</span>
                <span className="price-note">USD</span>
              </div>
              <p className="price-subtitle">One-time payment, lifetime access</p>

              <button
                onClick={handlePurchase}
                disabled={isLoading || !isLoaded}
                className="enroll-btn"
              >
                {isLoading ? 'Loading...' : isSignedIn ? 'Enroll Now' : 'Sign In to Enroll'}
              </button>

              {error && (
                <p className="error-msg">{error}</p>
              )}

              <div className="purchase-info">
                <p>Instant access after purchase</p>
                <p>Learn at your own pace</p>
                <p>
                  <Link href="/refund-policy">View refund policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="course-footer">
          <div className="footer-links">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
