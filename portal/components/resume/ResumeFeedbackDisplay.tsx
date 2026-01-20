'use client';

import { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Target,
  Sparkles,
  TrendingUp,
  FileText,
  Clock,
} from 'lucide-react';
import type { ResumeFeedbackJson } from '@/lib/resume/schemas';

interface ResumeFeedbackDisplayProps {
  feedback: ResumeFeedbackJson;
  scores: {
    overall: number;
    format: number;
    education: number;
    experience: number;
    skills: number;
    writing: number;
  };
}

function ScoreCircle({ score, size = 'large' }: { score: number; size?: 'large' | 'small' }) {
  const getColor = (s: number) => {
    if (s >= 8) return { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: 'rgb(16, 185, 129)' };
    if (s >= 6) return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: 'rgb(245, 158, 11)' };
    return { bg: 'rgba(220, 38, 38, 0.1)', border: 'rgba(220, 38, 38, 0.3)', text: 'rgb(220, 38, 38)' };
  };

  const colors = getColor(score);
  const dimensions = size === 'large' ? 100 : 48;
  const fontSize = size === 'large' ? 36 : 18;
  const subSize = size === 'large' ? 14 : 10;

  return (
    <div
      style={{
        width: dimensions,
        height: dimensions,
        borderRadius: '50%',
        background: colors.bg,
        border: `3px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize, fontWeight: 700, color: colors.text, lineHeight: 1 }}>
        {score}
      </span>
      <span style={{ fontSize: subSize, color: colors.text, opacity: 0.8 }}>/10</span>
    </div>
  );
}

function CategoryBar({ label, score, weight }: { label: string; score: number; weight: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return 'rgb(16, 185, 129)';
    if (s >= 60) return 'rgb(245, 158, 11)';
    return 'rgb(220, 38, 38)';
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(10, 10, 10, 0.7)' }}>
          {label} <span style={{ color: 'rgba(10, 10, 10, 0.4)' }}>({weight}%)</span>
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: getColor(score) }}>{score}</span>
      </div>
      <div
        style={{
          height: 8,
          background: 'rgba(10, 10, 10, 0.08)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${score}%`,
            background: getColor(score),
            borderRadius: 4,
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: '4px 8px',
        background: copied ? 'rgba(16, 185, 129, 0.1)' : 'rgba(10, 10, 10, 0.05)',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        color: copied ? 'rgb(16, 185, 129)' : 'rgba(10, 10, 10, 0.5)',
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  badge,
}: {
  title: string;
  icon: typeof FileText;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid rgba(10, 10, 10, 0.1)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Icon size={20} style={{ color: '#416D89' }} />
        <span style={{ flex: 1, textAlign: 'left', fontSize: 15, fontWeight: 600, color: 'rgba(10, 10, 10, 0.9)' }}>
          {title}
        </span>
        {badge !== undefined && (
          <span
            style={{
              padding: '4px 10px',
              background: 'rgba(65, 109, 137, 0.1)',
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              color: '#416D89',
            }}
          >
            {badge}
          </span>
        )}
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isOpen && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(10, 10, 10, 0.06)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function ResumeFeedbackDisplay({ feedback, scores }: ResumeFeedbackDisplayProps) {
  const getReadinessInfo = (readiness: string) => {
    switch (readiness) {
      case 'ready':
        return { icon: CheckCircle, color: 'rgb(16, 185, 129)', label: 'Ready for Top Banks', bg: 'rgba(16, 185, 129, 0.1)' };
      case 'almost':
        return { icon: AlertTriangle, color: 'rgb(245, 158, 11)', label: 'Almost Ready', bg: 'rgba(245, 158, 11, 0.1)' };
      default:
        return { icon: XCircle, color: 'rgb(220, 38, 38)', label: 'Needs Work', bg: 'rgba(220, 38, 38, 0.1)' };
    }
  };

  const readinessInfo = getReadinessInfo(feedback.hireReadiness);
  const ReadinessIcon = readinessInfo.icon;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Hero Score Section */}
      <div
        style={{
          padding: 32,
          background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.04) 0%, rgba(65, 109, 137, 0.08) 100%)',
          border: '1px solid rgba(65, 109, 137, 0.12)',
          borderRadius: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <ScoreCircle score={scores.overall} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                background: readinessInfo.bg,
                borderRadius: 20,
                marginBottom: 12,
              }}
            >
              <ReadinessIcon size={18} style={{ color: readinessInfo.color }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: readinessInfo.color }}>
                {readinessInfo.label}
              </span>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(10, 10, 10, 0.7)', lineHeight: 1.6, margin: 0 }}>
              {feedback.summary}
            </p>
          </div>
        </div>

        {/* Top Strengths */}
        {feedback.topStrengths.length > 0 && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(10, 10, 10, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Sparkles size={16} style={{ color: '#f59e0b' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(10, 10, 10, 0.6)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Strengths
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {feedback.topStrengths.map((strength, i) => (
                <span
                  key={i}
                  style={{
                    padding: '6px 12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 6,
                    fontSize: 13,
                    color: 'rgb(16, 185, 129)',
                  }}
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Scores */}
      <div
        style={{
          padding: 24,
          background: 'white',
          border: '1px solid rgba(10, 10, 10, 0.1)',
          borderRadius: 12,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(10, 10, 10, 0.9)', marginBottom: 20 }}>
          Category Breakdown
        </h3>
        <CategoryBar label="Experience" score={scores.experience} weight={40} />
        <CategoryBar label="Format" score={scores.format} weight={20} />
        <CategoryBar label="Education" score={scores.education} weight={15} />
        <CategoryBar label="Writing" score={scores.writing} weight={15} />
        <CategoryBar label="Skills" score={scores.skills} weight={10} />
      </div>

      {/* Next Score Plan */}
      <div
        style={{
          padding: 24,
          background: 'linear-gradient(135deg, rgba(65, 109, 137, 0.06) 0%, rgba(65, 109, 137, 0.1) 100%)',
          border: '1px solid rgba(65, 109, 137, 0.15)',
          borderRadius: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <TrendingUp size={20} style={{ color: '#416D89' }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(10, 10, 10, 0.9)', margin: 0 }}>
            How to Reach {feedback.nextScorePlan.nextScore10}/10
          </h3>
        </div>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          {feedback.nextScorePlan.topChangesToReachNext.map((change, i) => (
            <li
              key={i}
              style={{
                fontSize: 14,
                color: 'rgba(10, 10, 10, 0.7)',
                marginBottom: 8,
                lineHeight: 1.5,
              }}
            >
              {change}
            </li>
          ))}
        </ol>
      </div>

      {/* Priority Fixes */}
      <CollapsibleSection
        title="Priority Fixes"
        icon={Target}
        badge={feedback.priorityFixes.length}
        defaultOpen
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          {feedback.priorityFixes.map((fix, i) => (
            <div
              key={i}
              style={{
                padding: 16,
                background: 'rgba(10, 10, 10, 0.02)',
                borderRadius: 8,
                borderLeft: '3px solid #416D89',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(10, 10, 10, 0.9)', margin: 0 }}>
                  {i + 1}. {fix.title}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(10, 10, 10, 0.4)', fontSize: 12 }}>
                  <Clock size={12} />
                  ~{fix.effortMinutes} min
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.6)', margin: '0 0 12px', lineHeight: 1.5 }}>
                {fix.why}
              </p>
              <div
                style={{
                  padding: 12,
                  background: 'rgba(65, 109, 137, 0.05)',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <code style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.8)', flex: 1, lineHeight: 1.5 }}>
                  {fix.exampleFix}
                </code>
                <CopyButton text={fix.exampleFix} />
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Rewritten Bullets */}
      {feedback.rewrittenBullets.length > 0 && (
        <CollapsibleSection
          title="Improved Bullets"
          icon={FileText}
          badge={feedback.rewrittenBullets.length}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
            {feedback.rewrittenBullets.map((bullet, i) => (
              <div
                key={i}
                style={{
                  padding: 16,
                  background: 'rgba(10, 10, 10, 0.02)',
                  borderRadius: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      background: 'rgba(65, 109, 137, 0.1)',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#416D89',
                      textTransform: 'uppercase',
                    }}
                  >
                    {bullet.section}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      borderRadius: 4,
                      fontSize: 11,
                      color: 'rgb(245, 158, 11)',
                    }}
                  >
                    {bullet.patternTag.replace('_', ' ')}
                  </span>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'rgba(10, 10, 10, 0.4)', marginBottom: 4, textTransform: 'uppercase' }}>
                    Before
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.5)', margin: 0, textDecoration: 'line-through' }}>
                    {bullet.before}
                  </p>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'rgba(10, 10, 10, 0.4)', marginBottom: 4, textTransform: 'uppercase' }}>
                    After
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <p style={{ fontSize: 13, color: 'rgb(16, 185, 129)', margin: 0, fontWeight: 500 }}>
                      {bullet.after}
                    </p>
                    <CopyButton text={bullet.after} />
                  </div>
                </div>

                <p style={{ fontSize: 12, color: 'rgba(10, 10, 10, 0.5)', margin: 0, fontStyle: 'italic' }}>
                  {bullet.why}
                </p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Issues Flags */}
      {(feedback.flags.spellingIssues.length > 0 ||
        feedback.flags.grammarIssues.length > 0 ||
        feedback.flags.formattingIssues.length > 0 ||
        feedback.flags.quantificationOpportunities.length > 0) && (
        <CollapsibleSection
          title="Issues to Address"
          icon={AlertTriangle}
          badge={
            feedback.flags.spellingIssues.length +
            feedback.flags.grammarIssues.length +
            feedback.flags.formattingIssues.length +
            feedback.flags.quantificationOpportunities.length
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
            {feedback.flags.spellingIssues.length > 0 && (
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: 'rgb(220, 38, 38)', marginBottom: 8 }}>
                  Spelling Issues
                </h4>
                {feedback.flags.spellingIssues.map((issue, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.7)', marginBottom: 4 }}>
                    &quot;{issue.text}&quot; → &quot;{issue.suggestion}&quot;
                  </div>
                ))}
              </div>
            )}

            {feedback.flags.grammarIssues.length > 0 && (
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: 'rgb(245, 158, 11)', marginBottom: 8 }}>
                  Grammar Issues
                </h4>
                {feedback.flags.grammarIssues.map((issue, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.7)', marginBottom: 4 }}>
                    &quot;{issue.text}&quot; → &quot;{issue.suggestion}&quot;
                  </div>
                ))}
              </div>
            )}

            {feedback.flags.formattingIssues.length > 0 && (
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#416D89', marginBottom: 8 }}>
                  Formatting Issues
                </h4>
                {feedback.flags.formattingIssues.map((issue, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.7)', marginBottom: 8 }}>
                    <strong>{issue.issue}</strong> ({issue.location})
                    <br />
                    <span style={{ color: 'rgba(10, 10, 10, 0.5)' }}>Fix: {issue.fix}</span>
                  </div>
                ))}
              </div>
            )}

            {feedback.flags.quantificationOpportunities.length > 0 && (
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: 'rgb(16, 185, 129)', marginBottom: 8 }}>
                  Add Numbers Here
                </h4>
                {feedback.flags.quantificationOpportunities.map((opp, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'rgba(10, 10, 10, 0.7)', marginBottom: 8 }}>
                    <div style={{ marginBottom: 4 }}>{opp.bullet}</div>
                    <span style={{ color: 'rgb(16, 185, 129)' }}>💡 {opp.suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}
