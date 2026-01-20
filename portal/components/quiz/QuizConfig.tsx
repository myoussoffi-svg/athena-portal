'use client';

import { useState } from 'react';
import Link from 'next/link';

interface QuizConfigProps {
  trackSlug: string;
  moduleSlug: string;
  moduleTitle: string;
  loading: boolean;
  error: string | null;
  initialMode: 'all' | 'new' | 'review';
  onStart: (config: {
    limit: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
    type: 'conceptual' | 'formulaic' | 'judgmental' | 'edge-case' | 'mixed';
    mode: 'all' | 'new' | 'review';
  }) => void;
}

export function QuizConfig({
  trackSlug,
  moduleSlug,
  moduleTitle,
  loading,
  error,
  initialMode,
  onStart,
}: QuizConfigProps) {
  const [limit, setLimit] = useState(20);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [type, setType] = useState<'conceptual' | 'formulaic' | 'judgmental' | 'edge-case' | 'mixed'>('mixed');
  const [mode, setMode] = useState<'all' | 'new' | 'review'>(initialMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({ limit, difficulty, type, mode });
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid rgba(10, 10, 10, 0.12)',
    background: '#FFFFFF',
    fontSize: 14,
    color: '#0A0A0A',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: 36,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(10, 10, 10, 0.75)',
    marginBottom: 6,
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      <Link
        href={`/track/${trackSlug}/${moduleSlug}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          color: 'rgba(10, 10, 10, 0.55)',
          textDecoration: 'none',
          marginBottom: 20,
        }}
      >
        <span>←</span>
        <span>Back to module</span>
      </Link>

      <h1
        style={{
          margin: '0 0 8px',
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        Quiz Bank
      </h1>
      <p
        style={{
          margin: '0 0 24px',
          fontSize: 14,
          color: 'rgba(10, 10, 10, 0.65)',
        }}
      >
        {moduleTitle}
      </p>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(10, 10, 10, 0.08)',
            borderRadius: 14,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              margin: '0 0 16px',
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Configure Your Quiz
          </h2>

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={labelStyle}>Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as typeof mode)}
                style={selectStyle}
              >
                <option value="all">All Questions (Random)</option>
                <option value="new">New Questions Only (Not Yet Attempted)</option>
                <option value="review">Review Mistakes (Wrong Answers)</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Number of Questions</label>
              <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                style={selectStyle}
              >
                <option value={10}>10 questions</option>
                <option value={20}>20 questions</option>
                <option value={35}>35 questions</option>
                <option value={50}>50 questions</option>
                <option value={100}>All available</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
                style={selectStyle}
              >
                <option value="mixed">Mixed (All Difficulties)</option>
                <option value="easy">Easy Only</option>
                <option value="medium">Medium Only</option>
                <option value="hard">Hard Only</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Question Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as typeof type)}
                style={selectStyle}
              >
                <option value="mixed">Mixed (All Types)</option>
                <option value="conceptual">Conceptual</option>
                <option value="formulaic">Formulaic</option>
                <option value="judgmental">Judgmental</option>
                <option value="edge-case">Edge Cases</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#dc2626',
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 10,
            background: loading ? 'rgba(65, 109, 137, 0.6)' : '#416D89',
            border: 'none',
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {loading ? 'Loading Questions...' : 'Start Quiz'}
        </button>
      </form>
    </div>
  );
}
