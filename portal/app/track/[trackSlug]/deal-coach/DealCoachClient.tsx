'use client';

import { useState } from 'react';
import type { DealCoachResponse } from '@/lib/deal-coach/schemas';

type Phase = 'input' | 'analyzing' | 'results';

const DEAL_TYPES = [
  { value: 'ma', label: 'M&A' },
  { value: 'ipo', label: 'IPO' },
  { value: 'debt', label: 'Debt Financing' },
  { value: 'restructuring', label: 'Restructuring' },
  { value: 'lbo', label: 'LBO' },
  { value: 'other', label: 'Other' },
];

const ROLES = [
  { value: 'analyst', label: 'Analyst' },
  { value: 'associate', label: 'Associate' },
  { value: 'intern', label: 'Intern' },
  { value: 'other', label: 'Other' },
];

export function DealCoachClient() {
  const [phase, setPhase] = useState<Phase>('input');
  const [dealType, setDealType] = useState('ma');
  const [role, setRole] = useState('analyst');
  const [description, setDescription] = useState('');
  const [keyMetrics, setKeyMetrics] = useState('');
  const [previousQuestions, setPreviousQuestions] = useState('');
  const [result, setResult] = useState<DealCoachResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const canSubmit = description.length >= 100 && keyMetrics.length >= 10;

  const handleSubmit = async () => {
    setPhase('analyzing');
    setError(null);

    try {
      const res = await fetch('/api/deal-coach/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealType, role, description, keyMetrics, previousQuestions: previousQuestions || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to analyze deal');
      }

      const data = await res.json();
      setResult(data.analysis);
      setPhase('results');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setPhase('input');
    }
  };

  const handleReset = () => {
    setPhase('input');
    setResult(null);
    setDescription('');
    setKeyMetrics('');
    setPreviousQuestions('');
    setError(null);
  };

  return (
    <>
      <style>{`
        .dc-card { background: white; border: 1px solid rgba(10,10,10,0.08); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 32px; }
        .dc-label { display: block; font-size: 14px; font-weight: 600; color: #0A0A0A; margin-bottom: 8px; }
        .dc-hint { font-size: 13px; color: rgba(10,10,10,0.4); font-weight: 400; margin-left: 8px; }
        .dc-select, .dc-textarea {
          width: 100%; padding: 10px 14px; border: 1px solid rgba(10,10,10,0.15); border-radius: 8px;
          font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.15s;
          background: white; color: #0A0A0A;
        }
        .dc-select:focus, .dc-textarea:focus { border-color: #416D89; }
        .dc-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
        .dc-field { margin-bottom: 20px; }
        .dc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        .dc-submit {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: #416D89; color: white; border: none; border-radius: 8px;
          font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s;
        }
        .dc-submit:hover:not(:disabled) { background: #3a6179; }
        .dc-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .dc-error { padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #c0392b; font-size: 14px; margin-bottom: 16px; }
        .dc-section { margin-bottom: 32px; }
        .dc-section-title { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(10,10,10,0.4); margin: 0 0 16px; }
        .dc-reframing { font-size: 15px; line-height: 1.7; color: rgba(10,10,10,0.8); white-space: pre-line; }
        .dc-qa-card {
          border: 1px solid rgba(10,10,10,0.08); border-radius: 10px; margin-bottom: 10px; overflow: hidden;
        }
        .dc-qa-header {
          display: flex; align-items: center; gap: 12px; padding: 14px 18px; cursor: pointer;
          background: rgba(10,10,10,0.02); border: none; width: 100%; text-align: left; font-family: inherit;
          transition: background 0.15s;
        }
        .dc-qa-header:hover { background: rgba(65,109,137,0.04); }
        .dc-qa-num {
          width: 24px; height: 24px; border-radius: 6px; background: #416D89; color: white;
          display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0;
        }
        .dc-qa-question { flex: 1; font-size: 15px; font-weight: 500; color: #0A0A0A; }
        .dc-qa-body { padding: 0 18px 18px; }
        .dc-qa-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: rgba(10,10,10,0.4); margin: 12px 0 6px; }
        .dc-qa-text { font-size: 14px; line-height: 1.6; color: rgba(10,10,10,0.7); }
        .dc-pill-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .dc-pill {
          display: inline-block; padding: 8px 14px; background: rgba(65,109,137,0.06);
          border: 1px solid rgba(65,109,137,0.12); border-radius: 8px;
          font-size: 14px; color: rgba(10,10,10,0.7); line-height: 1.4;
        }
        .dc-loading { text-align: center; padding: 80px 24px; }
        .dc-loading-text { font-size: 16px; color: rgba(10,10,10,0.6); margin-top: 16px; }
        .dc-spinner {
          width: 40px; height: 40px; border: 3px solid rgba(65,109,137,0.15);
          border-top-color: #416D89; border-radius: 50%; animation: dc-spin 0.8s linear infinite; margin: 0 auto;
        }
        @keyframes dc-spin { to { transform: rotate(360deg); } }
        .dc-back {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; background: transparent; border: 1px solid rgba(10,10,10,0.15);
          border-radius: 8px; font-size: 14px; color: rgba(10,10,10,0.6); cursor: pointer;
          font-family: inherit; transition: all 0.15s; margin-top: 16px;
        }
        .dc-back:hover { border-color: rgba(10,10,10,0.3); color: #0A0A0A; }
        @media (max-width: 640px) { .dc-row { grid-template-columns: 1fr; } .dc-card { padding: 20px; } }
      `}</style>

      {/* INPUT PHASE */}
      {phase === 'input' && (
        <div className="dc-card">
          {error && <div className="dc-error">{error}</div>}

          <div className="dc-row">
            <div>
              <label className="dc-label">Deal Type</label>
              <select className="dc-select" value={dealType} onChange={e => setDealType(e.target.value)}>
                {DEAL_TYPES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label className="dc-label">Your Role</label>
              <select className="dc-select" value={role} onChange={e => setRole(e.target.value)}>
                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
          </div>

          <div className="dc-field">
            <label className="dc-label">
              Deal Description
              <span className="dc-hint">Min 100 characters ({description.length}/100)</span>
            </label>
            <textarea
              className="dc-textarea"
              rows={5}
              placeholder="Describe the deal: what was the company, what happened, your role and contribution. Be specific about the company, industry, and transaction."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="dc-field">
            <label className="dc-label">
              Key Metrics
              <span className="dc-hint">Deal size, multiples, revenue, EBITDA, etc.</span>
            </label>
            <textarea
              className="dc-textarea"
              rows={3}
              placeholder="e.g., $2.5B EV, 12x EBITDA, $800M revenue, 25% EBITDA margin, 4x leverage..."
              value={keyMetrics}
              onChange={e => setKeyMetrics(e.target.value)}
            />
          </div>

          <div className="dc-field">
            <label className="dc-label">
              Previous Interview Questions
              <span className="dc-hint">Optional</span>
            </label>
            <textarea
              className="dc-textarea"
              rows={2}
              placeholder="Any questions you've been asked about this deal before?"
              value={previousQuestions}
              onChange={e => setPreviousQuestions(e.target.value)}
            />
          </div>

          <button className="dc-submit" disabled={!canSubmit} onClick={handleSubmit}>
            Analyze My Deal
          </button>
        </div>
      )}

      {/* ANALYZING PHASE */}
      {phase === 'analyzing' && (
        <div className="dc-card dc-loading">
          <div className="dc-spinner" />
          <p className="dc-loading-text">Preparing your deal discussion guide...</p>
        </div>
      )}

      {/* RESULTS PHASE */}
      {phase === 'results' && result && (
        <>
          {/* PE Reframing */}
          <div className="dc-card dc-section">
            <h3 className="dc-section-title">PE Perspective</h3>
            <div className="dc-reframing">{result.peReframing}</div>
          </div>

          {/* Practice Questions */}
          <div className="dc-card dc-section">
            <h3 className="dc-section-title">Practice Questions ({result.prepQuestions.length})</h3>
            {result.prepQuestions.map((q, i) => (
              <div key={i} className="dc-qa-card">
                <button className="dc-qa-header" onClick={() => setExpandedQ(expandedQ === i ? null : i)}>
                  <div className="dc-qa-num">{i + 1}</div>
                  <div className="dc-qa-question">{q.question}</div>
                  <span style={{ fontSize: 18, color: 'rgba(10,10,10,0.3)', transform: expandedQ === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                </button>
                {expandedQ === i && (
                  <div className="dc-qa-body">
                    <div className="dc-qa-label">Framework</div>
                    <p className="dc-qa-text">{q.framework}</p>
                    <div className="dc-qa-label">Sample Answer</div>
                    <p className="dc-qa-text">{q.sampleAnswer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Metrics to Know */}
          <div className="dc-card dc-section">
            <h3 className="dc-section-title">Metrics to Know Cold</h3>
            <div className="dc-pill-list">
              {result.metricsToKnow.map((m, i) => (
                <span key={i} className="dc-pill">{m}</span>
              ))}
            </div>
          </div>

          {/* Discussion Points */}
          <div className="dc-card dc-section">
            <h3 className="dc-section-title">Discussion Points to Bring Up</h3>
            <div className="dc-pill-list">
              {result.discussionPoints.map((d, i) => (
                <span key={i} className="dc-pill">{d}</span>
              ))}
            </div>
          </div>

          <button className="dc-back" onClick={handleReset}>
            ← Analyze Another Deal
          </button>
        </>
      )}
    </>
  );
}
