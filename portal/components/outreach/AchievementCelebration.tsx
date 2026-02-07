'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Achievement } from '@/lib/outreach/schemas';

interface AchievementCelebrationProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

// Generate confetti pieces deterministically
const CONFETTI_PIECES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 3.33) + (i % 2 === 0 ? 0.5 : -0.5),
  delay: (i % 5) * 0.1,
}));

export function AchievementCelebration({ achievement, onDismiss }: AchievementCelebrationProps) {
  const [dismissing, setDismissing] = useState(false);

  // Derive visibility from props
  const isVisible = achievement !== null && !dismissing;

  // Memoize confetti to avoid recreating on each render
  const confetti = useMemo(() => {
    if (!achievement) return [];
    return CONFETTI_PIECES;
  }, [achievement]);

  const handleDismiss = useCallback(async () => {
    setDismissing(true);

    // Mark as celebrated in the database
    if (achievement) {
      try {
        await fetch(`/api/outreach/achievements/${achievement.type}`, {
          method: 'PATCH',
        });
      } catch (error) {
        console.error('Failed to mark achievement as celebrated:', error);
      }
    }

    setTimeout(() => {
      setDismissing(false);
      onDismiss();
    }, 300);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      onClick={handleDismiss}
    >
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            top: -20,
            left: `${piece.left}%`,
            width: 10,
            height: 10,
            background: ['#fbbf24', '#3b82f6', '#22c55e', '#ef4444', '#a855f7'][piece.id % 5],
            borderRadius: piece.id % 2 === 0 ? '50%' : 0,
            animation: `confetti-fall 2s ${piece.delay}s ease-in forwards`,
          }}
        />
      ))}

      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 40,
          textAlign: 'center',
          maxWidth: 400,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 300ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontSize: 72,
            marginBottom: 16,
            animation: 'badge-bounce 0.6s ease',
          }}
        >
          {achievement.icon}
        </div>

        <h2
          style={{
            margin: '0 0 8px',
            fontSize: 24,
            fontWeight: 700,
            color: '#1a1a1a',
          }}
        >
          Achievement Unlocked!
        </h2>

        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 18,
            fontWeight: 600,
            color: '#416D89',
          }}
        >
          {achievement.title}
        </h3>

        <p
          style={{
            margin: '0 0 24px',
            fontSize: 14,
            color: 'rgba(10, 10, 10, 0.6)',
          }}
        >
          {achievement.description}
        </p>

        <button
          onClick={handleDismiss}
          style={{
            padding: '12px 32px',
            borderRadius: 10,
            border: 'none',
            background: '#416D89',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Awesome!
        </button>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes badge-bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
