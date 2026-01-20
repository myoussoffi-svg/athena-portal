'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { XCircle, Target, Zap, HelpCircle, RotateCcw } from 'lucide-react';

interface QuizProgress {
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

interface QuizLauncherProps {
  trackSlug: string;
  moduleSlug: string;
}

export function QuizLauncher({ trackSlug, moduleSlug }: QuizLauncherProps) {
  const [progress, setProgress] = useState<QuizProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch(`/api/quiz/${moduleSlug}/progress`);
        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        }
      } catch {
        // User might not be authenticated, show default state
      } finally {
        setLoading(false);
      }
    }
    loadProgress();
  }, [moduleSlug]);

  async function handleReset() {
    if (!confirm('Are you sure you want to reset your quiz progress? This will clear all your answers for this module.')) {
      return;
    }

    setResetting(true);
    try {
      const res = await fetch(`/api/quiz/${moduleSlug}/progress`, { method: 'DELETE' });
      if (res.ok) {
        setProgress({
          totalQuestions: progress?.totalQuestions || 0,
          attempted: 0,
          correct: 0,
          wrong: 0,
          accuracy: 0,
        });
      }
    } catch {
      alert('Failed to reset progress. Please try again.');
    } finally {
      setResetting(false);
    }
  }

  const hasAttempted = progress && progress.attempted > 0;
  const hasWrongAnswers = progress && progress.wrong > 0;

  return (
    <>
      <style>{`
        .quiz-card {
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.03) 0%, rgba(65, 109, 137, 0.07) 100%);
          border: 1px solid rgba(65, 109, 137, 0.15);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.2s ease;
        }
        .quiz-card:hover {
          border-color: rgba(65, 109, 137, 0.3);
          box-shadow: 0 4px 16px rgba(65, 109, 137, 0.1);
        }
        .quiz-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }
        .quiz-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(65, 109, 137, 0.25);
        }
        .quiz-header-content {
          flex: 1;
        }
        .quiz-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .quiz-title {
          font-size: 18px;
          font-weight: 600;
          color: #0A0A0A;
          margin: 0;
        }
        .quiz-badge {
          font-size: 10px;
          font-weight: 600;
          color: #416D89;
          background: rgba(65, 109, 137, 0.1);
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .quiz-desc {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.6);
          line-height: 1.5;
          margin: 0;
        }
        .quiz-features {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.06);
        }
        .quiz-feature {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(10, 10, 10, 0.6);
        }
        .quiz-feature-icon {
          color: #416D89;
        }
        .quiz-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        .quiz-stat {
          text-align: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
          border: 1px solid rgba(10, 10, 10, 0.06);
          min-width: 80px;
        }
        .quiz-stat-value {
          font-size: 22px;
          font-weight: 700;
          color: #0A0A0A;
          margin-bottom: 2px;
        }
        .quiz-stat-value.good {
          color: rgb(16, 185, 129);
        }
        .quiz-stat-value.warning {
          color: #f59e0b;
        }
        .quiz-stat-value.poor {
          color: #ef4444;
        }
        .quiz-stat-label {
          font-size: 11px;
          color: rgba(10, 10, 10, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .quiz-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .quiz-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
        }
        .quiz-btn-primary {
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(65, 109, 137, 0.3);
        }
        .quiz-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(65, 109, 137, 0.4);
        }
        .quiz-btn-review {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #dc2626;
        }
        .quiz-btn-review:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
        }
        .quiz-btn-reset {
          background: transparent;
          border: 1px solid rgba(10, 10, 10, 0.12);
          color: rgba(10, 10, 10, 0.6);
        }
        .quiz-btn-reset:hover {
          background: rgba(10, 10, 10, 0.04);
          border-color: rgba(10, 10, 10, 0.2);
        }
        .quiz-btn-reset:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className="quiz-card">
        <div className="quiz-header">
          <div className="quiz-icon">📝</div>
          <div className="quiz-header-content">
            <div className="quiz-title-row">
              <h3 className="quiz-title">Practice Questions</h3>
              {progress && <span className="quiz-badge">{progress.totalQuestions} Questions</span>}
            </div>
            <p className="quiz-desc">
              Test your understanding with multiple-choice questions. Get instant feedback and detailed explanations.
            </p>
          </div>
        </div>

        <div className="quiz-features">
          <span className="quiz-feature">
            <HelpCircle size={14} className="quiz-feature-icon" />
            Multiple choice
          </span>
          <span className="quiz-feature">
            <Zap size={14} className="quiz-feature-icon" />
            Instant feedback
          </span>
          <span className="quiz-feature">
            <Target size={14} className="quiz-feature-icon" />
            Track accuracy
          </span>
        </div>

        {!loading && hasAttempted && progress && (
          <div className="quiz-stats">
            <div className="quiz-stat">
              <div className="quiz-stat-value">{progress.attempted}/{progress.totalQuestions}</div>
              <div className="quiz-stat-label">Attempted</div>
            </div>
            <div className="quiz-stat">
              <div className={`quiz-stat-value ${progress.accuracy >= 70 ? 'good' : progress.accuracy >= 50 ? 'warning' : 'poor'}`}>
                {progress.accuracy}%
              </div>
              <div className="quiz-stat-label">Accuracy</div>
            </div>
            <div className="quiz-stat">
              <div className="quiz-stat-value good">{progress.correct}</div>
              <div className="quiz-stat-label">Correct</div>
            </div>
            {progress.wrong > 0 && (
              <div className="quiz-stat">
                <div className="quiz-stat-value poor">{progress.wrong}</div>
                <div className="quiz-stat-label">Wrong</div>
              </div>
            )}
          </div>
        )}

        <div className="quiz-actions">
          <Link
            href={`/track/${trackSlug}/${moduleSlug}/quiz`}
            className="quiz-btn quiz-btn-primary"
          >
            {hasAttempted ? 'Continue Practice' : 'Start Practice'}
            <span>→</span>
          </Link>

          {hasWrongAnswers && (
            <Link
              href={`/track/${trackSlug}/${moduleSlug}/quiz?mode=review`}
              className="quiz-btn quiz-btn-review"
            >
              <XCircle size={14} />
              Review Mistakes ({progress!.wrong})
            </Link>
          )}

          {hasAttempted && (
            <button
              onClick={handleReset}
              disabled={resetting}
              className="quiz-btn quiz-btn-reset"
            >
              <RotateCcw size={14} />
              {resetting ? 'Resetting...' : 'Reset'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
