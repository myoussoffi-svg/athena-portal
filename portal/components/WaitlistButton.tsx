'use client';

import { useState, type FormEvent } from 'react';

type State = 'idle' | 'form' | 'submitting' | 'done';

export function WaitlistButton({ trackSlug }: { trackSlug: string }) {
  const [state, setState] = useState<State>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setState('submitting');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, trackSlug }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setState('form');
    }
  }

  if (state === 'done') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 28px',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          background: 'rgba(65, 109, 137, 0.08)',
          color: '#416D89',
        }}
      >
        You&apos;re on the list!
      </span>
    );
  }

  if (state === 'idle') {
    return (
      <button
        onClick={() => setState('form')}
        className="featured-cta secondary"
        style={{ border: '2px solid rgba(65, 109, 137, 0.3)', cursor: 'pointer' }}
      >
        Join Waitlist
      </button>
    );
  }

  // form or submitting
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={state === 'submitting'}
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          border: '2px solid rgba(65, 109, 137, 0.2)',
          fontSize: 14,
          outline: 'none',
          width: 140,
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={state === 'submitting'}
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          border: '2px solid rgba(65, 109, 137, 0.2)',
          fontSize: 14,
          outline: 'none',
          width: 200,
        }}
      />
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="featured-cta"
        style={{
          cursor: state === 'submitting' ? 'wait' : 'pointer',
          opacity: state === 'submitting' ? 0.6 : 1,
        }}
      >
        {state === 'submitting' ? 'Joining...' : 'Submit'}
      </button>
      {error && (
        <span style={{ color: '#c0392b', fontSize: 13, width: '100%' }}>
          {error}
        </span>
      )}
    </form>
  );
}
