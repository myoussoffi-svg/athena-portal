'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PAPER_LBO_SCENARIOS, type PaperLBOSolution } from '@/lib/paper-lbo/scenarios';

type Phase = 'select' | 'active' | 'results';

const TIMER_OPTIONS = [
  { label: '30 min', seconds: 30 * 60 },
  { label: '45 min', seconds: 45 * 60 },
  { label: '60 min', seconds: 60 * 60 },
];

const DIFFICULTY_COLORS = {
  basic: '#2d8a4e',
  intermediate: '#b8860b',
  advanced: '#c0392b',
};

function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function isClose(student: number | null, correct: number, tolerance = 0.05): 'correct' | 'close' | 'wrong' {
  if (student === null || isNaN(student)) return 'wrong';
  const diff = Math.abs(student - correct);
  const rel = correct !== 0 ? diff / Math.abs(correct) : diff;
  if (rel <= 0.01 || diff <= 0.5) return 'correct';
  if (rel <= tolerance || diff <= 2) return 'close';
  return 'wrong';
}

const GRADE_COLORS = { correct: '#2d8a4e', close: '#b8860b', wrong: '#c0392b' };
const GRADE_LABELS = { correct: 'Correct', close: 'Close', wrong: 'Incorrect' };

interface Inputs {
  purchasePrice: string;
  transactionFees: string;
  financingFees: string;
  seniorDebt: string;
  subDebt: string;
  equity: string;
  exitEbitda: string;
  exitEV: string;
  remainingDebt: string;
  exitEquity: string;
  moic: string;
  irr: string;
}

const EMPTY_INPUTS: Inputs = {
  purchasePrice: '', transactionFees: '', financingFees: '',
  seniorDebt: '', subDebt: '', equity: '',
  exitEbitda: '', exitEV: '', remainingDebt: '',
  exitEquity: '', moic: '', irr: '',
};

export function PaperLBOClient({ trackSlug }: { trackSlug: string }) {
  const [phase, setPhase] = useState<Phase>('select');
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [timerDuration, setTimerDuration] = useState(TIMER_OPTIONS[1].seconds);
  const [timeLeft, setTimeLeft] = useState(0);
  const [inputs, setInputs] = useState<Inputs>(EMPTY_INPUTS);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scenario = PAPER_LBO_SCENARIOS.find(s => s.id === scenarioId);

  const startTimer = useCallback(() => {
    setTimeLeft(timerDuration);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerDuration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = (id: string) => {
    setScenarioId(id);
    setInputs(EMPTY_INPUTS);
    setPhase('active');
    startTimer();
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeTaken(timerDuration - timeLeft);
    setPhase('results');
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('select');
    setScenarioId(null);
    setInputs(EMPTY_INPUTS);
  };

  const updateInput = (key: keyof Inputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const num = (v: string): number | null => {
    const n = parseFloat(v);
    return isNaN(n) ? null : n;
  };

  // Grading
  const getGrades = (sol: PaperLBOSolution) => {
    const fields: Array<{ key: keyof Inputs; label: string; correct: number; unit: string }> = [
      { key: 'purchasePrice', label: 'Purchase Price', correct: sol.sourcesUses.purchasePrice, unit: '$M' },
      { key: 'transactionFees', label: 'Transaction Fees', correct: sol.sourcesUses.transactionFees, unit: '$M' },
      { key: 'financingFees', label: 'Financing Fees', correct: sol.sourcesUses.financingFees, unit: '$M' },
      { key: 'seniorDebt', label: 'Senior Debt', correct: sol.sourcesUses.seniorDebt, unit: '$M' },
      { key: 'subDebt', label: 'Subordinated Debt', correct: sol.sourcesUses.subDebt, unit: '$M' },
      { key: 'equity', label: 'Equity Contribution', correct: sol.sourcesUses.equityContribution, unit: '$M' },
      { key: 'exitEbitda', label: 'Exit EBITDA', correct: sol.returns.exitEbitda, unit: '$M' },
      { key: 'exitEV', label: 'Exit EV', correct: sol.returns.exitEV, unit: '$M' },
      { key: 'remainingDebt', label: 'Remaining Debt', correct: sol.returns.remainingDebt, unit: '$M' },
      { key: 'exitEquity', label: 'Exit Equity', correct: sol.returns.exitEquity, unit: '$M' },
      { key: 'moic', label: 'MOIC', correct: sol.returns.moic, unit: 'x' },
      { key: 'irr', label: 'IRR', correct: sol.returns.irr * 100, unit: '%' },
    ];
    return fields.map(f => ({
      ...f,
      student: num(inputs[f.key]),
      grade: isClose(num(inputs[f.key]), f.correct),
    }));
  };

  // SELECT PHASE
  if (phase === 'select') {
    return (
      <>
        <style>{`
          .scenario-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px; }
          .scenario-card {
            background: white; border: 1px solid rgba(10,10,10,0.08); border-radius: 12px;
            padding: 20px; cursor: pointer; transition: all 0.15s; text-align: left;
            font-family: inherit;
          }
          .scenario-card:hover { border-color: rgba(65,109,137,0.3); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
          .scenario-name { font-size: 16px; font-weight: 600; color: #0A0A0A; margin-bottom: 4px; }
          .scenario-industry { font-size: 13px; color: rgba(10,10,10,0.5); margin-bottom: 8px; }
          .scenario-desc { font-size: 14px; line-height: 1.5; color: rgba(10,10,10,0.6); margin-bottom: 12px; }
          .scenario-difficulty {
            display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
            text-transform: uppercase; padding: 3px 8px; border-radius: 4px;
          }
          .timer-select { display: flex; gap: 12px; margin-bottom: 24px; align-items: center; }
          .timer-btn {
            padding: 10px 20px; border-radius: 8px; border: 2px solid rgba(10,10,10,0.1);
            background: white; font-size: 14px; font-weight: 500; cursor: pointer;
            transition: all 0.15s; font-family: inherit; color: #0A0A0A;
          }
          .timer-btn.active { border-color: #416D89; background: rgba(65,109,137,0.06); color: #416D89; }
          .section-heading { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(10,10,10,0.4); margin: 0 0 16px; }
        `}</style>

        <h3 className="section-heading">Timer Duration</h3>
        <div className="timer-select">
          {TIMER_OPTIONS.map(opt => (
            <button
              key={opt.seconds}
              className={`timer-btn ${timerDuration === opt.seconds ? 'active' : ''}`}
              onClick={() => setTimerDuration(opt.seconds)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <h3 className="section-heading">Select a Scenario</h3>
        <div className="scenario-grid">
          {PAPER_LBO_SCENARIOS.map(s => (
            <button key={s.id} className="scenario-card" onClick={() => handleStart(s.id)}>
              <div className="scenario-name">{s.name}</div>
              <div className="scenario-industry">{s.industry}</div>
              <div className="scenario-desc">{s.description}</div>
              <span
                className="scenario-difficulty"
                style={{
                  color: DIFFICULTY_COLORS[s.difficulty],
                  background: `${DIFFICULTY_COLORS[s.difficulty]}15`,
                }}
              >
                {s.difficulty}
              </span>
            </button>
          ))}
        </div>
      </>
    );
  }

  if (!scenario) return null;

  // ACTIVE PHASE
  if (phase === 'active') {
    const p = scenario.prompt;
    const isOverTime = timeLeft === 0;

    return (
      <>
        <style>{`
          .timer-bar {
            position: sticky; top: 0; z-index: 10; background: white;
            border-bottom: 1px solid rgba(10,10,10,0.08);
            padding: 12px 24px; display: flex; justify-content: space-between; align-items: center;
            margin: 0 -24px 24px;
          }
          .timer-display { font-size: 24px; font-weight: 700; font-variant-numeric: tabular-nums; }
          .prompt-card {
            background: rgba(65,109,137,0.04); border: 1px solid rgba(65,109,137,0.12);
            border-radius: 12px; padding: 24px; margin-bottom: 24px;
          }
          .prompt-title { font-size: 18px; font-weight: 600; margin: 0 0 16px; color: #0A0A0A; }
          .prompt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
          .prompt-item { font-size: 14px; display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(10,10,10,0.05); }
          .prompt-label { color: rgba(10,10,10,0.6); }
          .prompt-value { font-weight: 600; color: #0A0A0A; }
          .step-section { background: white; border: 1px solid rgba(10,10,10,0.08); border-radius: 12px; padding: 24px; margin-bottom: 16px; }
          .step-title { font-size: 16px; font-weight: 600; margin: 0 0 16px; color: #0A0A0A; }
          .input-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
          .input-label { font-size: 14px; color: rgba(10,10,10,0.7); flex: 1; }
          .input-field {
            width: 120px; padding: 8px 12px; border: 1px solid rgba(10,10,10,0.15); border-radius: 8px;
            font-size: 14px; font-family: inherit; text-align: right; outline: none;
            transition: border-color 0.15s;
          }
          .input-field:focus { border-color: #416D89; }
          .input-unit { font-size: 13px; color: rgba(10,10,10,0.4); width: 30px; }
          .submit-btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 14px 32px; background: #416D89; color: white; border: none; border-radius: 8px;
            font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s;
          }
          .submit-btn:hover { background: #3a6179; }
          .back-btn {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 10px 20px; background: transparent; border: 1px solid rgba(10,10,10,0.15);
            border-radius: 8px; font-size: 14px; color: rgba(10,10,10,0.6); cursor: pointer;
            font-family: inherit; transition: all 0.15s;
          }
          .back-btn:hover { border-color: rgba(10,10,10,0.3); color: #0A0A0A; }
          @media (max-width: 640px) {
            .prompt-grid { grid-template-columns: 1fr; }
            .timer-bar { margin: 0 -16px 24px; padding: 12px 16px; }
          }
        `}</style>

        {/* Timer */}
        <div className="timer-bar">
          <div>
            <span style={{ fontSize: 14, color: 'rgba(10,10,10,0.5)' }}>{scenario.name}</span>
          </div>
          <div className="timer-display" style={{ color: isOverTime ? '#c0392b' : timeLeft < 300 ? '#b8860b' : '#0A0A0A' }}>
            {isOverTime ? 'TIME UP' : fmtTime(timeLeft)}
          </div>
        </div>

        {/* Prompt */}
        <div className="prompt-card">
          <h3 className="prompt-title">Company Information</h3>
          <div className="prompt-grid">
            <div className="prompt-item"><span className="prompt-label">Revenue</span><span className="prompt-value">${p.revenue}M</span></div>
            <div className="prompt-item"><span className="prompt-label">EBITDA</span><span className="prompt-value">${p.ebitda}M</span></div>
            <div className="prompt-item"><span className="prompt-label">EBITDA Margin</span><span className="prompt-value">{p.ebitdaMargin}%</span></div>
            <div className="prompt-item"><span className="prompt-label">Purchase Multiple</span><span className="prompt-value">{p.purchaseMultiple}x</span></div>
            <div className="prompt-item"><span className="prompt-label">Senior Debt</span><span className="prompt-value">{p.seniorDebtMultiple}x EBITDA @ {p.seniorRate}%</span></div>
            <div className="prompt-item"><span className="prompt-label">Sub Debt</span><span className="prompt-value">{p.subDebtMultiple}x EBITDA @ {p.subRate}%</span></div>
            <div className="prompt-item"><span className="prompt-label">Revenue Growth</span><span className="prompt-value">{p.revenueGrowth}% / yr</span></div>
            <div className="prompt-item"><span className="prompt-label">Margin Expansion</span><span className="prompt-value">{p.marginExpansionBps} bps / yr</span></div>
            <div className="prompt-item"><span className="prompt-label">CapEx</span><span className="prompt-value">{p.capexPctRevenue}% of Revenue</span></div>
            <div className="prompt-item"><span className="prompt-label">Tax Rate</span><span className="prompt-value">{p.taxRate}%</span></div>
            <div className="prompt-item"><span className="prompt-label">Transaction Fees</span><span className="prompt-value">{p.transactionFeesPct}% of Purchase Price</span></div>
            <div className="prompt-item"><span className="prompt-label">Financing Fees</span><span className="prompt-value">{p.financingFeesPct}% of Total Debt</span></div>
            <div className="prompt-item"><span className="prompt-label">Exit Multiple</span><span className="prompt-value">{p.exitMultiple}x</span></div>
            <div className="prompt-item"><span className="prompt-label">Hold Period</span><span className="prompt-value">{p.holdPeriod} years</span></div>
          </div>
        </div>

        {/* Step 1: Sources & Uses */}
        <div className="step-section">
          <h4 className="step-title">Step 1: Sources &amp; Uses</h4>
          {([
            ['purchasePrice', 'Purchase Price', '$M'],
            ['transactionFees', 'Transaction Fees', '$M'],
            ['financingFees', 'Financing Fees', '$M'],
            ['seniorDebt', 'Senior Debt', '$M'],
            ['subDebt', 'Subordinated Debt', '$M'],
            ['equity', 'Equity Contribution', '$M'],
          ] as const).map(([key, label, unit]) => (
            <div key={key} className="input-row">
              <span className="input-label">{label}</span>
              <input
                className="input-field"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={inputs[key]}
                onChange={e => updateInput(key, e.target.value)}
              />
              <span className="input-unit">{unit}</span>
            </div>
          ))}
        </div>

        {/* Step 2: Returns */}
        <div className="step-section">
          <h4 className="step-title">Step 2: Exit &amp; Returns</h4>
          {([
            ['exitEbitda', 'Exit EBITDA (Year 5)', '$M'],
            ['exitEV', 'Exit Enterprise Value', '$M'],
            ['remainingDebt', 'Remaining Debt at Exit', '$M'],
            ['exitEquity', 'Exit Equity Value', '$M'],
            ['moic', 'MOIC', 'x'],
            ['irr', 'IRR', '%'],
          ] as const).map(([key, label, unit]) => (
            <div key={key} className="input-row">
              <span className="input-label">{label}</span>
              <input
                className="input-field"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={inputs[key]}
                onChange={e => updateInput(key, e.target.value)}
              />
              <span className="input-unit">{unit}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="submit-btn" onClick={handleSubmit}>Submit Answers</button>
          <button className="back-btn" onClick={handleReset}>Cancel</button>
        </div>
      </>
    );
  }

  // RESULTS PHASE
  const grades = getGrades(scenario.solution);
  const correctCount = grades.filter(g => g.grade === 'correct').length;
  const closeCount = grades.filter(g => g.grade === 'close').length;
  const score = correctCount + closeCount * 0.5;
  const pct = Math.round((score / grades.length) * 100);

  return (
    <>
      <style>{`
        .results-summary {
          background: white; border: 1px solid rgba(10,10,10,0.08); border-radius: 16px;
          padding: 32px; margin-bottom: 24px; text-align: center;
        }
        .results-score { font-size: 48px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 4px; }
        .results-detail { font-size: 14px; color: rgba(10,10,10,0.5); margin-bottom: 16px; }
        .results-time { font-size: 15px; color: rgba(10,10,10,0.6); }
        .grade-table { width: 100%; border-collapse: collapse; }
        .grade-table th {
          text-align: left; padding: 10px 12px; font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; color: rgba(10,10,10,0.4);
          border-bottom: 2px solid rgba(10,10,10,0.1);
        }
        .grade-table td {
          padding: 12px; border-bottom: 1px solid rgba(10,10,10,0.06); font-size: 14px;
        }
        .grade-badge {
          display: inline-block; padding: 3px 10px; border-radius: 4px;
          font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px;
        }
        .results-card { background: white; border: 1px solid rgba(10,10,10,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px; overflow-x: auto; }
        .results-actions { display: flex; gap: 12px; }
      `}</style>

      <div className="results-summary">
        <div className="results-score" style={{ color: pct >= 80 ? '#2d8a4e' : pct >= 50 ? '#b8860b' : '#c0392b' }}>
          {pct}%
        </div>
        <div className="results-detail">
          {correctCount} correct, {closeCount} close, {grades.length - correctCount - closeCount} incorrect out of {grades.length}
        </div>
        <div className="results-time">
          Completed in {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
          {timeTaken > timerDuration ? ' (over time)' : ''}
        </div>
      </div>

      <div className="results-card">
        <table className="grade-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Your Answer</th>
              <th>Correct</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(g => (
              <tr key={g.key}>
                <td style={{ fontWeight: 500 }}>{g.label}</td>
                <td>{g.student !== null ? `${g.student} ${g.unit}` : '—'}</td>
                <td>{g.correct.toFixed(1)} {g.unit}</td>
                <td>
                  <span
                    className="grade-badge"
                    style={{ color: GRADE_COLORS[g.grade], background: `${GRADE_COLORS[g.grade]}15` }}
                  >
                    {GRADE_LABELS[g.grade]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="results-actions">
        <button
          className="submit-btn"
          style={{ background: '#416D89' }}
          onClick={handleReset}
        >
          Try Another Scenario
        </button>
      </div>
    </>
  );
}
