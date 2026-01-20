'use client';

import { useState, useEffect } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    }

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true });
    // Initial update
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'rgba(10, 10, 10, 0.06)',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #416D89 0%, #5a8aa8 100%)',
          transition: 'width 0.1s ease-out',
        }}
      />
    </div>
  );
}
