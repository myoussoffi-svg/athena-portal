'use client';

import { useState, useMemo } from 'react';
import { calculateLBO, DEFAULT_PARAMS, PARAM_RANGES, PARAM_LABELS, type LBOParams } from '@/lib/lbo-playground/calculator';

function fmt(n: number, decimals = 0): string {
  return n.toFixed(decimals);
}

function fmtDollar(n: number): string {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}B`;
  return `$${n.toFixed(0)}M`;
}

const PARAM_ORDER: (keyof LBOParams)[] = [
  'startingEBITDA', 'entryMultiple', 'exitMultiple', 'leverage',
  'revenueGrowth', 'ebitdaMargin', 'marginExpansion',
  'interestRate', 'taxRate', 'holdPeriod',
];

export function LBOPlaygroundClient() {
  const [params, setParams] = useState<LBOParams>(DEFAULT_PARAMS);

  const result = useMemo(() => calculateLBO(params), [params]);

  const updateParam = (key: keyof LBOParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const irrColor = result.irr >= 0.20 ? '#2d8a4e' : result.irr >= 0.15 ? '#b8860b' : '#c0392b';

  return (
    <>
      <style>{`
        .lbo-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 24px;
        }
        .lbo-panel {
          background: white;
          border-radius: 16px;
          border: 1px solid rgba(10, 10, 10, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          padding: 24px;
        }
        .lbo-panel-title {
          margin: 0 0 20px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.4);
        }
        .param-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .param-row:last-child {
          margin-bottom: 0;
        }
        .param-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .param-label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.7);
        }
        .param-value-display {
          font-size: 14px;
          font-weight: 600;
          color: #0A0A0A;
          min-width: 60px;
          text-align: right;
        }
        .param-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          appearance: none;
          -webkit-appearance: none;
          background: linear-gradient(90deg, #416D89 0%, #416D89 var(--pct), rgba(10, 10, 10, 0.1) var(--pct));
          outline: none;
          cursor: pointer;
        }
        .param-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #416D89;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .param-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #416D89;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .summary-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .metric-card {
          padding: 20px;
          border-radius: 12px;
          text-align: center;
        }
        .metric-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.4);
          margin-bottom: 6px;
        }
        .metric-value {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .waterfall {
          margin-bottom: 24px;
        }
        .waterfall-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(10, 10, 10, 0.06);
          font-size: 14px;
        }
        .waterfall-row:last-child {
          border-bottom: none;
        }
        .waterfall-label {
          color: rgba(10, 10, 10, 0.7);
        }
        .waterfall-value {
          font-weight: 600;
          color: #0A0A0A;
        }
        .waterfall-row.highlight {
          background: rgba(65, 109, 137, 0.04);
          margin: 0 -24px;
          padding: 10px 24px;
          border-radius: 8px;
        }
        .waterfall-row.highlight .waterfall-label,
        .waterfall-row.highlight .waterfall-value {
          font-weight: 700;
        }
        .year-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .year-table th {
          text-align: right;
          padding: 8px 12px;
          font-weight: 600;
          color: rgba(10, 10, 10, 0.5);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid rgba(10, 10, 10, 0.1);
        }
        .year-table th:first-child {
          text-align: left;
        }
        .year-table td {
          text-align: right;
          padding: 8px 12px;
          color: #0A0A0A;
          border-bottom: 1px solid rgba(10, 10, 10, 0.05);
        }
        .year-table td:first-child {
          text-align: left;
          font-weight: 600;
          color: rgba(10, 10, 10, 0.6);
        }
        .year-table-wrap {
          overflow-x: auto;
        }
        .section-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.35);
          margin: 0 0 12px;
        }
        .reset-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(10, 10, 10, 0.04);
          border: 1px solid rgba(10, 10, 10, 0.1);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.6);
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
          margin-bottom: 20px;
        }
        .reset-btn:hover {
          background: rgba(10, 10, 10, 0.08);
          color: #0A0A0A;
        }
        @media (max-width: 800px) {
          .lbo-grid {
            grid-template-columns: 1fr;
          }
          .summary-metrics {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="lbo-grid">
        {/* Input Panel */}
        <div className="lbo-panel" style={{ height: 'fit-content', position: 'sticky', top: 24 }}>
          <h2 className="lbo-panel-title">Parameters</h2>
          <button className="reset-btn" onClick={() => setParams(DEFAULT_PARAMS)}>
            Reset to Defaults
          </button>

          {PARAM_ORDER.map(key => {
            const range = PARAM_RANGES[key];
            const label = PARAM_LABELS[key];
            const value = params[key];
            const pct = ((value - range.min) / (range.max - range.min)) * 100;

            return (
              <div key={key} className="param-row">
                <div className="param-label-row">
                  <span className="param-label">{label.label}</span>
                  <span className="param-value-display">
                    {key === 'startingEBITDA' ? `$${value}M` : `${fmt(value, range.step < 1 ? (range.step < 0.5 ? 2 : 1) : 0)}${label.unit}`}
                  </span>
                </div>
                <input
                  type="range"
                  className="param-slider"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={value}
                  onChange={e => updateParam(key, parseFloat(e.target.value))}
                  style={{ '--pct': `${pct}%` } as React.CSSProperties}
                />
              </div>
            );
          })}
        </div>

        {/* Output Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Summary Metrics */}
          <div className="lbo-panel">
            <div className="summary-metrics">
              <div className="metric-card" style={{ background: `${irrColor}10` }}>
                <div className="metric-label">IRR</div>
                <div className="metric-value" style={{ color: irrColor }}>
                  {result.entryEquity > 0 ? `${(result.irr * 100).toFixed(1)}%` : '—'}
                </div>
              </div>
              <div className="metric-card" style={{ background: 'rgba(65, 109, 137, 0.06)' }}>
                <div className="metric-label">MOIC</div>
                <div className="metric-value" style={{ color: '#416D89' }}>
                  {result.entryEquity > 0 ? `${result.moic.toFixed(2)}x` : '—'}
                </div>
              </div>
            </div>

            <h3 className="section-label">Returns Waterfall</h3>
            <div className="waterfall">
              <div className="waterfall-row">
                <span className="waterfall-label">Entry EV ({fmt(params.entryMultiple, 1)}x EBITDA)</span>
                <span className="waterfall-value">{fmtDollar(result.entryEV)}</span>
              </div>
              <div className="waterfall-row">
                <span className="waterfall-label">Less: Debt ({fmt(params.leverage, 1)}x EBITDA)</span>
                <span className="waterfall-value">({fmtDollar(result.entryDebt)})</span>
              </div>
              <div className="waterfall-row highlight">
                <span className="waterfall-label">Entry Equity</span>
                <span className="waterfall-value">{fmtDollar(result.entryEquity)}</span>
              </div>
              <div className="waterfall-row" style={{ borderBottom: 'none', height: 8 }} />
              <div className="waterfall-row">
                <span className="waterfall-label">Exit EBITDA</span>
                <span className="waterfall-value">{fmtDollar(result.exitEBITDA)}</span>
              </div>
              <div className="waterfall-row">
                <span className="waterfall-label">Exit EV ({fmt(params.exitMultiple, 1)}x EBITDA)</span>
                <span className="waterfall-value">{fmtDollar(result.exitEV)}</span>
              </div>
              <div className="waterfall-row">
                <span className="waterfall-label">Less: Remaining Debt</span>
                <span className="waterfall-value">({fmtDollar(result.exitDebt)})</span>
              </div>
              <div className="waterfall-row highlight">
                <span className="waterfall-label">Exit Equity</span>
                <span className="waterfall-value">{fmtDollar(result.exitEquity)}</span>
              </div>
            </div>
          </div>

          {/* Year-by-Year Table */}
          <div className="lbo-panel">
            <h3 className="section-label">Year-by-Year Projection</h3>
            <div className="year-table-wrap">
              <table className="year-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Revenue</th>
                    <th>EBITDA</th>
                    <th>Interest</th>
                    <th>FCF</th>
                    <th>Debt Paydown</th>
                    <th>Ending Debt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Entry</td>
                    <td>{fmtDollar(params.startingEBITDA / (params.ebitdaMargin / 100))}</td>
                    <td>{fmtDollar(params.startingEBITDA)}</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>{fmtDollar(result.entryDebt)}</td>
                  </tr>
                  {result.yearlyData.map(yr => (
                    <tr key={yr.year}>
                      <td>Year {yr.year}</td>
                      <td>{fmtDollar(yr.revenue)}</td>
                      <td>{fmtDollar(yr.ebitda)}</td>
                      <td>{fmtDollar(yr.interest)}</td>
                      <td>{fmtDollar(yr.fcf)}</td>
                      <td>{fmtDollar(yr.debtPaydown)}</td>
                      <td>{fmtDollar(yr.endingDebt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
