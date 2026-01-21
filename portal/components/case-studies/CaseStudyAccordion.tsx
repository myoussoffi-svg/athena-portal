'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, Lightbulb, CheckCircle } from 'lucide-react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

export interface AccordionStep {
  id: string;
  stepNumber: number;
  title: string;
  challenge: string;
  solution: string;
  hint?: string;
}

interface CaseStudyAccordionProps {
  caseStudySlug: string;
  moduleSlug: string;
  steps: AccordionStep[];
  onComplete?: () => void;
}

function loadRevealedSteps(storageKey: string): Set<string> {
  const stored = safeGetItem(storageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed.revealed)) {
        return new Set(parsed.revealed);
      }
    } catch {
      // Ignore parse errors
    }
  }
  return new Set();
}

export function CaseStudyAccordion({ caseStudySlug, moduleSlug, steps, onComplete }: CaseStudyAccordionProps) {
  const storageKey = `athena-case-study-${moduleSlug}-${caseStudySlug}`;

  const [revealedSteps, setRevealedSteps] = useState<Set<string>>(() => loadRevealedSteps(storageKey));
  const [showHint, setShowHint] = useState<Set<string>>(new Set());
  const hasCalledComplete = useRef(false);

  // Track completion - use ref to avoid state in effect
  useEffect(() => {
    if (revealedSteps.size === steps.length && steps.length > 0 && !hasCalledComplete.current) {
      hasCalledComplete.current = true;
      onComplete?.();
    }
  }, [revealedSteps.size, steps.length, onComplete]);

  const handleReveal = useCallback((stepId: string) => {
    setRevealedSteps((prev) => {
      const next = new Set(prev);
      next.add(stepId);
      safeSetItem(storageKey, JSON.stringify({ revealed: [...next] }));
      return next;
    });
  }, [storageKey]);

  const toggleHint = useCallback((stepId: string) => {
    setShowHint((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  }, []);

  const allComplete = revealedSteps.size === steps.length && steps.length > 0;

  return (
    <>
      <style>{`
        .accordion-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .accordion-step {
          background: #FFFFFF;
          border: 1px solid rgba(10, 10, 10, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .accordion-step.revealed {
          border-color: rgba(16, 185, 129, 0.3);
        }
        .accordion-step-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(65, 109, 137, 0.03);
          border-bottom: 1px solid rgba(10, 10, 10, 0.06);
        }
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          color: white;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .accordion-step.revealed .step-number {
          background: linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(5, 150, 105) 100%);
        }
        .step-title {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: #0A0A0A;
          margin: 0;
        }
        .step-complete-icon {
          color: rgb(16, 185, 129);
          flex-shrink: 0;
        }
        .accordion-challenge {
          padding: 20px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.06);
        }
        .challenge-label {
          font-size: 10px;
          font-weight: 600;
          color: #416D89;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .challenge-content {
          font-size: 14px;
          line-height: 1.7;
          color: #0A0A0A;
        }
        .challenge-content p {
          margin: 0 0 12px;
        }
        .challenge-content p:last-child {
          margin-bottom: 0;
        }
        .accordion-hint-section {
          padding: 0 20px 16px;
        }
        .hint-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 8px;
          color: #b45309;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .hint-toggle:hover {
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.3);
        }
        .hint-content {
          margin-top: 12px;
          padding: 12px 14px;
          background: rgba(245, 158, 11, 0.06);
          border-radius: 8px;
          font-size: 13px;
          color: #92400e;
          line-height: 1.6;
        }
        .reveal-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px 20px;
          background: linear-gradient(135deg, #416D89 0%, #2d4a5e 100%);
          border: none;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .reveal-button:hover {
          filter: brightness(1.1);
        }
        .reveal-button svg {
          transition: transform 0.2s ease;
        }
        .reveal-button:hover svg {
          transform: translateY(2px);
        }
        .accordion-solution {
          padding: 20px;
          background: rgba(16, 185, 129, 0.03);
          border-top: 2px solid rgba(16, 185, 129, 0.2);
        }
        .solution-label {
          font-size: 10px;
          font-weight: 600;
          color: rgb(16, 185, 129);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .solution-content {
          font-size: 14px;
          line-height: 1.7;
          color: #0A0A0A;
        }
        .solution-content p {
          margin: 0 0 12px;
        }
        .solution-content p:last-child {
          margin-bottom: 0;
        }
        .solution-content h2,
        .challenge-content h2 {
          font-size: 16px;
          font-weight: 700;
          margin: 20px 0 12px;
          color: #0A0A0A;
        }
        .solution-content h3,
        .challenge-content h3 {
          font-size: 15px;
          font-weight: 600;
          margin: 16px 0 10px;
          color: #0A0A0A;
        }
        .solution-content h4,
        .challenge-content h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 14px 0 8px;
          color: #0A0A0A;
        }
        .solution-content strong {
          color: #0A0A0A;
        }
        .solution-content code,
        .challenge-content code {
          background: rgba(10, 10, 10, 0.06);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
        }
        .solution-content pre,
        .challenge-content pre {
          background: rgba(10, 10, 10, 0.04);
          padding: 14px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 12px 0;
        }
        .solution-content pre code,
        .challenge-content pre code {
          background: none;
          padding: 0;
        }
        .solution-content table,
        .challenge-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 13px;
        }
        .solution-content th,
        .solution-content td,
        .challenge-content th,
        .challenge-content td {
          border: 1px solid rgba(10, 10, 10, 0.1);
          padding: 8px 12px;
          text-align: left;
        }
        .solution-content th,
        .challenge-content th {
          background: rgba(10, 10, 10, 0.03);
          font-weight: 600;
        }
        .solution-content ul,
        .solution-content ol,
        .challenge-content ul,
        .challenge-content ol {
          margin: 12px 0;
          padding-left: 20px;
        }
        .solution-content li,
        .challenge-content li {
          margin: 6px 0;
        }
        .accordion-complete-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.12) 100%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          color: rgb(5, 150, 105);
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>

      <div className="accordion-container">
        {steps.map((step) => {
          const isRevealed = revealedSteps.has(step.id);
          const hintVisible = showHint.has(step.id);

          return (
            <div key={step.id} className={`accordion-step ${isRevealed ? 'revealed' : ''}`}>
              {/* Step Header */}
              <div className="accordion-step-header">
                <div className="step-number">{step.stepNumber}</div>
                <h3 className="step-title">{step.title}</h3>
                {isRevealed && <CheckCircle size={18} className="step-complete-icon" />}
              </div>

              {/* Challenge Section */}
              <div className="accordion-challenge">
                <div className="challenge-label">Your Task</div>
                <div
                  className="challenge-content"
                  dangerouslySetInnerHTML={{ __html: step.challenge }}
                />
              </div>

              {/* Hint (if available and not revealed) */}
              {step.hint && !isRevealed && (
                <div className="accordion-hint-section">
                  <button
                    onClick={() => toggleHint(step.id)}
                    className="hint-toggle"
                  >
                    <Lightbulb size={14} />
                    {hintVisible ? 'Hide Hint' : 'Need a Hint?'}
                  </button>
                  {hintVisible && (
                    <div className="hint-content">{step.hint}</div>
                  )}
                </div>
              )}

              {/* Reveal Button or Solution */}
              {!isRevealed ? (
                <button
                  onClick={() => handleReveal(step.id)}
                  className="reveal-button"
                >
                  <span>I&apos;ve thought about it — Reveal Solution</span>
                  <ChevronDown size={18} />
                </button>
              ) : (
                <div className="accordion-solution">
                  <div className="solution-label">Solution</div>
                  <div
                    className="solution-content"
                    dangerouslySetInnerHTML={{ __html: step.solution }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {allComplete && (
          <div className="accordion-complete-banner">
            <CheckCircle size={20} />
            <span>You&apos;ve completed all steps in this case study!</span>
          </div>
        )}
      </div>
    </>
  );
}
