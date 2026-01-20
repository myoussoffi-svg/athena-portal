'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, HelpCircle } from 'lucide-react';
import {
  ResumeUploader,
  ResumeQuotaStatus,
  ResumeProcessingStatus,
  ResumeFeedbackDisplay,
} from '@/components/resume';
import type { ResumeFeedbackJson } from '@/lib/resume/schemas';

interface ResumeFeedbackPageProps {
  trackSlug: string;
}

type PageState = 'upload' | 'processing' | 'results' | 'error';

interface QuotaData {
  used: number;
  limit: number;
  remaining: number;
}

export function ResumeFeedbackPage({ trackSlug }: ResumeFeedbackPageProps) {
  const [pageState, setPageState] = useState<PageState>('upload');
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ResumeFeedbackJson | null>(null);
  const [scores, setScores] = useState<{
    overall: number;
    format: number;
    education: number;
    experience: number;
    skills: number;
    writing: number;
  } | null>(null);
  const [quota, setQuota] = useState<QuotaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuotaLoaded = useCallback((q: QuotaData) => {
    setQuota(q);
  }, []);

  const handleUploadComplete = useCallback(
    (data: { feedbackId: string }) => {
      setFeedbackId(data.feedbackId);
      setPageState('processing');
    },
    []
  );

  const handleUploadError = useCallback((errorMsg: string) => {
    setError(errorMsg);
  }, []);

  const handleProcessingComplete = useCallback(async () => {
    if (!feedbackId) return;

    try {
      const response = await fetch(`/api/resume/feedback/${feedbackId}/status`);
      if (!response.ok) throw new Error('Failed to fetch results');

      const data = await response.json();
      setFeedback(data.feedback);
      setScores(data.scores);
      setPageState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load results');
      setPageState('error');
    }
  }, [feedbackId]);

  const handleProcessingError = useCallback((errorMsg: string) => {
    setError(errorMsg);
    setPageState('error');
  }, []);

  const handleStartOver = useCallback(() => {
    setPageState('upload');
    setFeedbackId(null);
    setFeedback(null);
    setScores(null);
    setError(null);
    // Refresh quota
    window.location.reload();
  }, []);

  const isQuotaExhausted = quota?.remaining === 0;

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid rgba(10, 10, 10, 0.08)',
          padding: '16px 24px',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link
            href={`/track/${trackSlug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'rgba(10, 10, 10, 0.5)',
              textDecoration: 'none',
              marginBottom: 8,
            }}
          >
            <ArrowLeft size={16} />
            Back to Track
          </Link>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'rgba(10, 10, 10, 0.9)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <FileText size={24} style={{ color: '#416D89' }} />
            Resume Feedback
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        {pageState === 'upload' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Quota Status */}
            <ResumeQuotaStatus onQuotaLoaded={handleQuotaLoaded} />

            {/* Info Card */}
            <div
              style={{
                padding: 20,
                background: 'rgba(65, 109, 137, 0.05)',
                border: '1px solid rgba(65, 109, 137, 0.12)',
                borderRadius: 12,
                display: 'flex',
                gap: 16,
              }}
            >
              <HelpCircle size={24} style={{ color: '#416D89', flexShrink: 0, marginTop: 2 }} />
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'rgba(10, 10, 10, 0.9)', margin: '0 0 8px' }}>
                  How It Works
                </h3>
                <ol style={{ margin: 0, paddingLeft: 20, color: 'rgba(10, 10, 10, 0.6)', fontSize: 14, lineHeight: 1.7 }}>
                  <li>Upload your resume as a Word document (.docx)</li>
                  <li>Our AI analyzes it against Investment Banking standards</li>
                  <li>Get a detailed score breakdown and actionable improvements</li>
                  <li>Copy improved bullets directly into your resume</li>
                </ol>
              </div>
            </div>

            {/* Uploader */}
            {!isQuotaExhausted ? (
              <div
                style={{
                  padding: 32,
                  background: 'white',
                  border: '1px solid rgba(10, 10, 10, 0.1)',
                  borderRadius: 16,
                }}
              >
                <h2 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(10, 10, 10, 0.9)', margin: '0 0 20px' }}>
                  Upload Your Resume
                </h2>
                <ResumeUploader
                  trackSlug={trackSlug}
                  onUploadComplete={handleUploadComplete}
                  onError={handleUploadError}
                />
              </div>
            ) : (
              <div
                style={{
                  padding: 32,
                  background: 'rgba(220, 38, 38, 0.03)',
                  border: '1px solid rgba(220, 38, 38, 0.15)',
                  borderRadius: 16,
                  textAlign: 'center',
                }}
              >
                <FileText size={48} style={{ color: 'rgba(220, 38, 38, 0.4)', marginBottom: 16 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgb(220, 38, 38)', marginBottom: 8 }}>
                  Quota Exhausted
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.6)', margin: 0 }}>
                  You&apos;ve used all 10 resume submissions included with your course.
                </p>
              </div>
            )}
          </div>
        )}

        {pageState === 'processing' && feedbackId && (
          <ResumeProcessingStatus
            feedbackId={feedbackId}
            onComplete={handleProcessingComplete}
            onError={handleProcessingError}
          />
        )}

        {pageState === 'results' && feedback && scores && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ResumeFeedbackDisplay feedback={feedback} scores={scores} />

            <button
              onClick={handleStartOver}
              style={{
                padding: '14px 24px',
                background: 'white',
                border: '1px solid rgba(10, 10, 10, 0.15)',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 500,
                color: 'rgba(10, 10, 10, 0.7)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <FileText size={18} />
              Upload Another Resume
            </button>
          </div>
        )}

        {pageState === 'error' && (
          <div
            style={{
              padding: 32,
              background: 'rgba(220, 38, 38, 0.03)',
              border: '1px solid rgba(220, 38, 38, 0.15)',
              borderRadius: 16,
              textAlign: 'center',
            }}
          >
            <FileText size={48} style={{ color: 'rgba(220, 38, 38, 0.4)', marginBottom: 16 }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgb(220, 38, 38)', marginBottom: 8 }}>
              Something Went Wrong
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.6)', marginBottom: 20 }}>
              {error || 'An error occurred while processing your resume.'}
            </p>
            <button
              onClick={handleStartOver}
              style={{
                padding: '12px 24px',
                background: '#416D89',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
