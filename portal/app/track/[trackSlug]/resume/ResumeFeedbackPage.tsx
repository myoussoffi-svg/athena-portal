'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, HelpCircle, ArrowRight, Sparkles, Download, Eye } from 'lucide-react';
import {
  ResumeUploader,
  ResumeQuotaStatus,
  ResumeProcessingStatus,
  ResumeFeedbackDisplay,
  ScreenshotUploader,
} from '@/components/resume';
import type { ResumeFeedbackJson } from '@/lib/resume/schemas';

interface ResumeFeedbackPageProps {
  trackSlug: string;
}

type PageState = 'upload' | 'screenshot' | 'processing' | 'results' | 'error';

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
      setPageState('screenshot'); // Go to screenshot step instead of processing
    },
    []
  );

  const handleSkipScreenshot = useCallback(() => {
    setPageState('processing');
  }, []);

  const handleScreenshotComplete = useCallback(() => {
    // Screenshot uploaded, continue to processing
    setPageState('processing');
  }, []);

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

            {/* Example Resume Section */}
            <div
              style={{
                padding: 24,
                background: 'white',
                border: '1px solid rgba(10, 10, 10, 0.1)',
                borderRadius: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <FileText size={20} style={{ color: '#416D89' }} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(10, 10, 10, 0.9)', margin: 0 }}>
                  Example Resume Template
                </h3>
              </div>

              <p style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.6)', marginBottom: 20, lineHeight: 1.6 }}>
                Use this as a reference for formatting and structure. Our feedback focuses on making your
                <strong> content stronger</strong> — download this template to see the formatting standard.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="/athena-example-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    background: 'rgba(65, 109, 137, 0.08)',
                    border: '1px solid rgba(65, 109, 137, 0.2)',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#416D89',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(65, 109, 137, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(65, 109, 137, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(65, 109, 137, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(65, 109, 137, 0.2)';
                  }}
                >
                  <Eye size={16} />
                  View Example (PDF)
                </a>
                <a
                  href="/athena-example-resume.docx"
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #416D89 0%, #4a7a96 100%)',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'white',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(65, 109, 137, 0.25)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(65, 109, 137, 0.35)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(65, 109, 137, 0.25)';
                  }}
                >
                  <Download size={16} />
                  Download Template (Word)
                </a>
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

        {pageState === 'screenshot' && feedbackId && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Success message */}
            <div
              style={{
                padding: 20,
                background: 'rgba(34, 197, 94, 0.05)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(34, 197, 94, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgb(34, 197, 94)',
                }}
              >
                <FileText size={24} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(10, 10, 10, 0.9)', marginBottom: 4 }}>
                  Resume Uploaded Successfully
                </div>
                <div style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.5)' }}>
                  Your Word document is ready for analysis
                </div>
              </div>
            </div>

            {/* Screenshot uploader */}
            <div
              style={{
                padding: 24,
                background: 'white',
                border: '1px solid rgba(10, 10, 10, 0.1)',
                borderRadius: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Sparkles size={20} style={{ color: 'rgb(139, 92, 246)' }} />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(10, 10, 10, 0.9)', margin: 0 }}>
                  Want Better Formatting Feedback?
                </h2>
              </div>

              <p style={{ fontSize: 14, color: 'rgba(10, 10, 10, 0.6)', marginBottom: 20, lineHeight: 1.6 }}>
                Upload a <strong>screenshot</strong> of your resume to get AI-powered visual analysis of:
              </p>

              <ul style={{
                margin: '0 0 24px',
                paddingLeft: 20,
                color: 'rgba(10, 10, 10, 0.7)',
                fontSize: 14,
                lineHeight: 1.8,
              }}>
                <li>Header formatting (name, contact info centering)</li>
                <li>Section headers (ALL CAPS, bold, underline)</li>
                <li>Font choice and consistency</li>
                <li>Margins and whitespace balance</li>
                <li>Content density per role</li>
              </ul>

              <ScreenshotUploader
                feedbackId={feedbackId}
                onUploadComplete={handleScreenshotComplete}
              />
            </div>

            {/* Continue button */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleSkipScreenshot}
                style={{
                  flex: 1,
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
                Skip, Analyze Text Only
              </button>
              <button
                onClick={handleSkipScreenshot}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #416D89 0%, #4a7a96 100%)',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 12px rgba(65, 109, 137, 0.3)',
                }}
              >
                Continue to Analysis
                <ArrowRight size={18} />
              </button>
            </div>
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
