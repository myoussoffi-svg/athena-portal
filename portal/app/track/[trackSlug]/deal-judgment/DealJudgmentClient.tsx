'use client';

import { useState } from 'react';
import { DEAL_SCENARIOS, type DealTeaser } from '@/lib/deal-judgment/scenarios';
import type { DealFeedback } from '@/lib/deal-judgment/schemas';

type Phase = 'browse' | 'reading' | 'decision' | 'grading' | 'feedback';

const DIFFICULTY_COLORS = {
  moderate: { bg: 'rgba(46,160,67,0.08)', border: 'rgba(46,160,67,0.2)', text: '#1a7f37' },
  challenging: { bg: 'rgba(210,153,34,0.08)', border: 'rgba(210,153,34,0.2)', text: '#9a6700' },
  advanced: { bg: 'rgba(207,34,46,0.08)', border: 'rgba(207,34,46,0.2)', text: '#cf222e' },
};

const GRADE_COLORS: Record<string, string> = {
  A: '#1a7f37', B: '#2da44e', C: '#9a6700', D: '#cf222e', F: '#82071e',
};

export function DealJudgmentClient() {
  const [phase, setPhase] = useState<Phase>('browse');
  const [selectedScenario, setSelectedScenario] = useState<DealTeaser | null>(null);
  const [decision, setDecision] = useState<'invest' | 'pass' | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [feedback, setFeedback] = useState<DealFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectScenario = (scenario: DealTeaser) => {
    setSelectedScenario(scenario);
    setDecision(null);
    setReasoning('');
    setFeedback(null);
    setError(null);
    setPhase('reading');
  };

  const handleSubmitDecision = async () => {
    if (!selectedScenario || !decision || reasoning.length < 50) return;
    setPhase('grading');
    setError(null);

    try {
      const res = await fetch('/api/deal-judgment/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          decision,
          reasoning,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to grade response');
      }

      const data = await res.json();
      setFeedback(data.feedback);
      setPhase('feedback');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setPhase('decision');
    }
  };

  const handleReset = () => {
    setPhase('browse');
    setSelectedScenario(null);
    setDecision(null);
    setReasoning('');
    setFeedback(null);
    setError(null);
  };

  return (
    <>
      <style>{`
        .dj-card { background: white; border: 1px solid rgba(10,10,10,0.08); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 32px; }

        /* Browse grid */
        .dj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .dj-scenario-card {
          background: white; border: 1px solid rgba(10,10,10,0.08); border-radius: 12px;
          padding: 24px; cursor: pointer; transition: all 0.2s; position: relative;
        }
        .dj-scenario-card:hover { border-color: #416D89; box-shadow: 0 4px 16px rgba(65,109,137,0.12); transform: translateY(-2px); }
        .dj-scenario-icon { font-size: 28px; margin-bottom: 12px; }
        .dj-scenario-name { font-size: 17px; font-weight: 600; color: #0A0A0A; margin: 0 0 4px; }
        .dj-scenario-industry { font-size: 14px; color: rgba(10,10,10,0.5); margin: 0 0 12px; }
        .dj-difficulty {
          display: inline-block; padding: 4px 10px; border-radius: 6px;
          font-size: 12px; font-weight: 600; text-transform: capitalize;
        }

        /* Teaser reading */
        .dj-teaser-section { margin-bottom: 24px; }
        .dj-teaser-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: rgba(10,10,10,0.4); margin: 0 0 8px; }
        .dj-teaser-text { font-size: 15px; line-height: 1.7; color: rgba(10,10,10,0.8); margin: 0; }
        .dj-metric-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .dj-metric { background: rgba(10,10,10,0.02); border: 1px solid rgba(10,10,10,0.06); border-radius: 8px; padding: 12px 16px; }
        .dj-metric-label { font-size: 12px; color: rgba(10,10,10,0.4); font-weight: 500; margin: 0 0 4px; }
        .dj-metric-value { font-size: 16px; font-weight: 600; color: #0A0A0A; margin: 0; }
        .dj-consideration { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; font-size: 14px; line-height: 1.6; color: rgba(10,10,10,0.7); }
        .dj-consideration-dot { width: 6px; height: 6px; border-radius: 50%; background: #416D89; flex-shrink: 0; margin-top: 8px; }

        /* Decision phase */
        .dj-decision-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .dj-decision-btn {
          padding: 20px; border-radius: 12px; cursor: pointer; text-align: center;
          font-family: inherit; font-size: 16px; font-weight: 600; transition: all 0.2s;
        }
        .dj-decision-invest {
          background: rgba(46,160,67,0.04); border: 2px solid rgba(46,160,67,0.2); color: #1a7f37;
        }
        .dj-decision-invest:hover, .dj-decision-invest.active {
          background: rgba(46,160,67,0.1); border-color: #1a7f37;
        }
        .dj-decision-pass {
          background: rgba(207,34,46,0.04); border: 2px solid rgba(207,34,46,0.2); color: #cf222e;
        }
        .dj-decision-pass:hover, .dj-decision-pass.active {
          background: rgba(207,34,46,0.1); border-color: #cf222e;
        }
        .dj-textarea {
          width: 100%; padding: 14px 16px; border: 1px solid rgba(10,10,10,0.15); border-radius: 10px;
          font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.15s;
          background: white; color: #0A0A0A; resize: vertical; min-height: 140px; line-height: 1.6;
        }
        .dj-textarea:focus { border-color: #416D89; }
        .dj-char-count { font-size: 13px; color: rgba(10,10,10,0.35); margin-top: 6px; text-align: right; }

        /* Buttons */
        .dj-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: #416D89; color: white; border: none; border-radius: 8px;
          font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s;
        }
        .dj-btn-primary:hover:not(:disabled) { background: #3a6179; }
        .dj-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .dj-btn-secondary {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 20px; background: transparent; border: 1px solid rgba(10,10,10,0.15);
          border-radius: 8px; font-size: 14px; color: rgba(10,10,10,0.6); cursor: pointer;
          font-family: inherit; transition: all 0.15s;
        }
        .dj-btn-secondary:hover { border-color: rgba(10,10,10,0.3); color: #0A0A0A; }

        /* Error */
        .dj-error { padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #c0392b; font-size: 14px; margin-bottom: 16px; }

        /* Loading */
        .dj-loading { text-align: center; padding: 80px 24px; }
        .dj-loading-text { font-size: 16px; color: rgba(10,10,10,0.6); margin-top: 16px; }
        .dj-spinner {
          width: 40px; height: 40px; border: 3px solid rgba(65,109,137,0.15);
          border-top-color: #416D89; border-radius: 50%; animation: dj-spin 0.8s linear infinite; margin: 0 auto;
        }
        @keyframes dj-spin { to { transform: rotate(360deg); } }

        /* Feedback */
        .dj-grade-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 64px; height: 64px; border-radius: 16px; font-size: 32px; font-weight: 700; color: white;
        }
        .dj-feedback-header { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
        .dj-feedback-meta { flex: 1; }
        .dj-feedback-decision { font-size: 15px; margin: 0 0 4px; }
        .dj-feedback-decision .correct { color: #1a7f37; font-weight: 600; }
        .dj-feedback-decision .incorrect { color: #cf222e; font-weight: 600; }
        .dj-scores-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
        .dj-score-card { background: rgba(10,10,10,0.02); border: 1px solid rgba(10,10,10,0.06); border-radius: 10px; padding: 16px; text-align: center; }
        .dj-score-label { font-size: 12px; font-weight: 500; color: rgba(10,10,10,0.4); text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px; }
        .dj-score-value { font-size: 28px; font-weight: 700; margin: 0; }
        .dj-section-title { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(10,10,10,0.4); margin: 0 0 12px; }
        .dj-commentary { font-size: 15px; line-height: 1.7; color: rgba(10,10,10,0.8); white-space: pre-line; margin: 0 0 28px; }
        .dj-list { list-style: none; padding: 0; margin: 0 0 28px; }
        .dj-list li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; line-height: 1.6; color: rgba(10,10,10,0.7); margin-bottom: 8px; }
        .dj-list-icon { flex-shrink: 0; margin-top: 2px; font-size: 14px; }
        .dj-model-answer { background: rgba(65,109,137,0.04); border: 1px solid rgba(65,109,137,0.12); border-radius: 12px; padding: 20px; margin-bottom: 28px; }
        .dj-model-answer p { font-size: 14px; line-height: 1.7; color: rgba(10,10,10,0.7); margin: 0; }

        @media (max-width: 640px) {
          .dj-grid { grid-template-columns: 1fr; }
          .dj-metric-row { grid-template-columns: 1fr; }
          .dj-decision-row { grid-template-columns: 1fr; }
          .dj-scores-grid { grid-template-columns: 1fr; }
          .dj-card { padding: 20px; }
          .dj-feedback-header { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      {/* BROWSE PHASE */}
      {phase === 'browse' && (
        <>
          <p style={{ fontSize: 15, color: 'rgba(10,10,10,0.5)', marginBottom: 24, marginTop: 0 }}>
            Select a deal to evaluate. Read the teaser, make your invest/pass decision, and write your thesis. An AI partner will grade your PE judgment.
          </p>
          <div className="dj-grid">
            {DEAL_SCENARIOS.map(scenario => {
              const dc = DIFFICULTY_COLORS[scenario.difficulty];
              return (
                <div key={scenario.id} className="dj-scenario-card" onClick={() => handleSelectScenario(scenario)}>
                  <div className="dj-scenario-icon">{scenario.industryIcon}</div>
                  <h3 className="dj-scenario-name">{scenario.codename}</h3>
                  <p className="dj-scenario-industry">{scenario.industry}</p>
                  <span className="dj-difficulty" style={{ background: dc.bg, border: `1px solid ${dc.border}`, color: dc.text }}>
                    {scenario.difficulty}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* READING PHASE */}
      {phase === 'reading' && selectedScenario && (
        <div className="dj-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: 28 }}>{selectedScenario.industryIcon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0A0A0A' }}>{selectedScenario.codename}</h2>
              <p style={{ margin: '2px 0 0', fontSize: 14, color: 'rgba(10,10,10,0.5)' }}>{selectedScenario.industry}</p>
            </div>
          </div>

          <div className="dj-teaser-section">
            <div className="dj-teaser-label">Company Overview</div>
            <p className="dj-teaser-text">{selectedScenario.teaser.companyOverview}</p>
          </div>

          <div className="dj-teaser-section">
            <div className="dj-teaser-label">Financials</div>
            <div className="dj-metric-row">
              <div className="dj-metric">
                <p className="dj-metric-label">Revenue</p>
                <p className="dj-metric-value">{selectedScenario.teaser.financials.revenue}</p>
              </div>
              <div className="dj-metric">
                <p className="dj-metric-label">EBITDA</p>
                <p className="dj-metric-value">{selectedScenario.teaser.financials.ebitda}</p>
              </div>
              <div className="dj-metric">
                <p className="dj-metric-label">EBITDA Margin</p>
                <p className="dj-metric-value">{selectedScenario.teaser.financials.ebitdaMargin}</p>
              </div>
              <div className="dj-metric">
                <p className="dj-metric-label">Revenue Growth</p>
                <p className="dj-metric-value">{selectedScenario.teaser.financials.revenueGrowth}</p>
              </div>
            </div>
            {selectedScenario.teaser.financials.additionalMetrics && selectedScenario.teaser.financials.additionalMetrics.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {selectedScenario.teaser.financials.additionalMetrics.map((m, i) => (
                  <span key={i} style={{
                    display: 'inline-block', padding: '6px 12px', background: 'rgba(65,109,137,0.05)',
                    border: '1px solid rgba(65,109,137,0.1)', borderRadius: 6, fontSize: 13, color: 'rgba(10,10,10,0.6)',
                  }}>{m}</span>
                ))}
              </div>
            )}
          </div>

          <div className="dj-teaser-section">
            <div className="dj-teaser-label">Deal Terms</div>
            <p className="dj-teaser-text">{selectedScenario.teaser.dealTerms}</p>
          </div>

          <div className="dj-teaser-section">
            <div className="dj-teaser-label">Key Considerations</div>
            {selectedScenario.teaser.keyConsiderations.map((c, i) => (
              <div key={i} className="dj-consideration">
                <div className="dj-consideration-dot" />
                <span>{c}</span>
              </div>
            ))}
          </div>

          <button className="dj-btn-primary" onClick={() => setPhase('decision')}>
            Make Your Decision
          </button>
        </div>
      )}

      {/* DECISION PHASE */}
      {phase === 'decision' && selectedScenario && (
        <div className="dj-card">
          {error && <div className="dj-error">{error}</div>}

          <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 600, color: '#0A0A0A' }}>
            {selectedScenario.codename} — Your Call
          </h3>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: 'rgba(10,10,10,0.5)' }}>
            Based on the teaser, would you invest or pass? Write your thesis below.
          </p>

          <div className="dj-decision-row">
            <button
              className={`dj-decision-btn dj-decision-invest ${decision === 'invest' ? 'active' : ''}`}
              onClick={() => setDecision('invest')}
            >
              Invest
            </button>
            <button
              className={`dj-decision-btn dj-decision-pass ${decision === 'pass' ? 'active' : ''}`}
              onClick={() => setDecision('pass')}
            >
              Pass
            </button>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0A0A0A', marginBottom: 8 }}>
              Your Reasoning
            </label>
            <textarea
              className="dj-textarea"
              rows={6}
              placeholder="Write your investment thesis or reasoning for passing. Be specific — reference the financials, risks, deal terms, and your view on value creation or deal-breakers."
              value={reasoning}
              onChange={e => setReasoning(e.target.value)}
            />
            <div className="dj-char-count">{reasoning.length}/50 min</div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="dj-btn-secondary" onClick={() => setPhase('reading')}>
              ← Review Teaser
            </button>
            <button
              className="dj-btn-primary"
              disabled={!decision || reasoning.length < 50}
              onClick={handleSubmitDecision}
            >
              Submit for Grading
            </button>
          </div>
        </div>
      )}

      {/* GRADING PHASE */}
      {phase === 'grading' && (
        <div className="dj-card dj-loading">
          <div className="dj-spinner" />
          <p className="dj-loading-text">Grading your investment judgment...</p>
        </div>
      )}

      {/* FEEDBACK PHASE */}
      {phase === 'feedback' && feedback && selectedScenario && (
        <>
          <div className="dj-card" style={{ marginBottom: 16 }}>
            <div className="dj-feedback-header">
              <div className="dj-grade-badge" style={{ background: GRADE_COLORS[feedback.overallGrade] || '#416D89' }}>
                {feedback.overallGrade}
              </div>
              <div className="dj-feedback-meta">
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0A0A0A' }}>{selectedScenario.codename}</h2>
                <p className="dj-feedback-decision">
                  Your decision: <strong>{decision?.toUpperCase()}</strong> —{' '}
                  {feedback.decisionCorrect
                    ? <span className="correct">Correct</span>
                    : <span className="incorrect">Incorrect (answer: {selectedScenario.hiddenContext.correctDecision.toUpperCase()})</span>
                  }
                </p>
              </div>
            </div>

            <div className="dj-scores-grid">
              <div className="dj-score-card">
                <p className="dj-score-label">Thesis Quality</p>
                <p className="dj-score-value" style={{ color: feedback.thesisQuality >= 70 ? '#1a7f37' : feedback.thesisQuality >= 50 ? '#9a6700' : '#cf222e' }}>
                  {feedback.thesisQuality}
                </p>
              </div>
              <div className="dj-score-card">
                <p className="dj-score-label">Risk ID</p>
                <p className="dj-score-value" style={{ color: feedback.riskIdentification >= 70 ? '#1a7f37' : feedback.riskIdentification >= 50 ? '#9a6700' : '#cf222e' }}>
                  {feedback.riskIdentification}
                </p>
              </div>
              <div className="dj-score-card">
                <p className="dj-score-label">Red Flags</p>
                <p className="dj-score-value" style={{ color: feedback.redFlagDetection >= 70 ? '#1a7f37' : feedback.redFlagDetection >= 50 ? '#9a6700' : '#cf222e' }}>
                  {feedback.redFlagDetection}
                </p>
              </div>
            </div>

            <div className="dj-section-title">Commentary</div>
            <p className="dj-commentary">{feedback.commentary}</p>

            <div className="dj-section-title">What You Got Right</div>
            <ul className="dj-list">
              {feedback.strengthsIdentified.map((s, i) => (
                <li key={i}><span className="dj-list-icon">+</span><span>{s}</span></li>
              ))}
            </ul>

            <div className="dj-section-title">What You Missed</div>
            <ul className="dj-list">
              {feedback.missedPoints.map((m, i) => (
                <li key={i}><span className="dj-list-icon">-</span><span>{m}</span></li>
              ))}
            </ul>

            <div className="dj-section-title">Model Answer</div>
            <div className="dj-model-answer">
              <p>{selectedScenario.hiddenContext.modelAnswer}</p>
            </div>

            <button className="dj-btn-secondary" onClick={handleReset}>
              ← Try Another Deal
            </button>
          </div>
        </>
      )}
    </>
  );
}
