'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, FileText } from 'lucide-react';
import { safeGetItem } from '@/lib/storage';

interface CaseStudy {
  slug: string;
  title: string;
  subtitle?: string;
}

interface CaseStudiesLauncherProps {
  trackSlug: string;
  moduleSlug: string;
  caseStudies: CaseStudy[];
}

function loadCompletedStudies(moduleSlug: string): Set<string> {
  const stored = safeGetItem(`athena-case-studies-${moduleSlug}`);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    } catch {
      // Ignore parse errors
    }
  }
  return new Set();
}

export function CaseStudiesLauncher({ trackSlug, moduleSlug, caseStudies }: CaseStudiesLauncherProps) {
  const [completedStudies] = useState<Set<string>>(() => loadCompletedStudies(moduleSlug));

  const completedCount = caseStudies.filter(cs => completedStudies.has(cs.slug)).length;

  return (
    <>
      <style>{`
        .case-studies-card {
          background: linear-gradient(135deg, rgba(65, 109, 137, 0.03) 0%, rgba(65, 109, 137, 0.07) 100%);
          border: 1px solid rgba(65, 109, 137, 0.15);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.2s ease;
        }
        .case-studies-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }
        .case-studies-icon {
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
          color: white;
        }
        .case-studies-header-content {
          flex: 1;
        }
        .case-studies-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .case-studies-title {
          font-size: 18px;
          font-weight: 600;
          color: #0A0A0A;
          margin: 0;
        }
        .case-studies-badge {
          font-size: 10px;
          font-weight: 600;
          color: #416D89;
          background: rgba(65, 109, 137, 0.1);
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .case-studies-desc {
          font-size: 14px;
          color: rgba(10, 10, 10, 0.6);
          line-height: 1.5;
          margin: 0;
        }
        .case-studies-progress {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgb(16, 185, 129);
          margin-bottom: 16px;
          padding: 8px 12px;
          background: rgba(16, 185, 129, 0.08);
          border-radius: 8px;
          width: fit-content;
        }
        .case-studies-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .case-study-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(10, 10, 10, 0.06);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .case-study-item:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(65, 109, 137, 0.2);
          transform: translateX(2px);
        }
        .case-study-number {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(65, 109, 137, 0.1);
          color: #416D89;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .case-study-content {
          flex: 1;
          min-width: 0;
        }
        .case-study-item-title {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #0A0A0A;
          margin-bottom: 2px;
        }
        .case-study-item-subtitle {
          display: block;
          font-size: 12px;
          color: rgba(10, 10, 10, 0.5);
        }
        .case-study-complete {
          color: rgb(16, 185, 129);
          flex-shrink: 0;
        }
        .case-study-arrow {
          color: rgba(10, 10, 10, 0.3);
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }
        .case-study-item:hover .case-study-arrow {
          transform: translateX(2px);
          color: #416D89;
        }
      `}</style>

      <div className="case-studies-card">
        <div className="case-studies-header">
          <div className="case-studies-icon">
            <FileText size={24} />
          </div>
          <div className="case-studies-header-content">
            <div className="case-studies-title-row">
              <h3 className="case-studies-title">Interactive Case Studies</h3>
              <span className="case-studies-badge">{caseStudies.length} {caseStudies.length === 1 ? 'Exercise' : 'Exercises'}</span>
            </div>
            <p className="case-studies-desc">
              Work through real-world scenarios step-by-step. Think through each problem, then reveal the solution to check your approach.
            </p>
          </div>
        </div>

        {completedCount > 0 && (
          <div className="case-studies-progress">
            <CheckCircle size={14} />
            <span>{completedCount} of {caseStudies.length} completed</span>
          </div>
        )}

        <div className="case-studies-list">
          {caseStudies.map((cs, idx) => (
            <Link
              key={cs.slug}
              href={`/track/${trackSlug}/${moduleSlug}/case-study/${cs.slug}`}
              className="case-study-item"
            >
              <div className="case-study-number">{idx + 1}</div>
              <div className="case-study-content">
                <span className="case-study-item-title">{cs.title}</span>
                {cs.subtitle && (
                  <span className="case-study-item-subtitle">{cs.subtitle}</span>
                )}
              </div>
              {completedStudies.has(cs.slug) ? (
                <CheckCircle size={18} className="case-study-complete" />
              ) : (
                <ChevronRight size={18} className="case-study-arrow" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
