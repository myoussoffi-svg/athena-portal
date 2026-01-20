'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { IntegrityLog, IntegrityViolation } from './types';
import { getBrowserInfo } from './browserCompat';

interface UseIntegrityMonitorReturn {
  log: IntegrityLog;
  isFlagged: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  setCurrentPromptId: (promptId: number) => void;
}

/**
 * Hook to track integrity violations during recording
 * Monitors: fullscreen exits, tab switches, window blur
 */
export function useIntegrityMonitor(): UseIntegrityMonitorReturn {
  const currentPromptIdRef = useRef<number>(1);
  const violationStartRef = useRef<number | null>(null);
  const isMonitoringRef = useRef(false);

  const [log, setLog] = useState<IntegrityLog>(() => ({
    schemaVersion: 'v1',
    startedInFullscreen: null,
    fullscreenSupported: typeof document !== 'undefined' && !!document.documentElement.requestFullscreen,
    visibilityApiSupported: typeof document !== 'undefined' && typeof document.hidden !== 'undefined',
    violations: [],
    summary: {
      totalViolations: 0,
      totalTimeOutsideMs: 0,
      fullscreenExitCount: 0,
      tabSwitchCount: 0,
      windowBlurCount: 0,
    },
    browserInfo: getBrowserInfo(),
  }));

  const recordViolation = useCallback((event: IntegrityViolation['event']) => {
    if (!isMonitoringRef.current) return;

    violationStartRef.current = Date.now();

    setLog((prev) => ({
      ...prev,
      violations: [
        ...prev.violations,
        {
          event,
          timestamp: new Date().toISOString(),
          promptIdActive: currentPromptIdRef.current,
          durationOutsideMs: null,
        },
      ],
      summary: {
        ...prev.summary,
        totalViolations: prev.summary.totalViolations + 1,
        fullscreenExitCount:
          event === 'fullscreen_exit'
            ? prev.summary.fullscreenExitCount + 1
            : prev.summary.fullscreenExitCount,
        tabSwitchCount:
          event === 'tab_switch'
            ? prev.summary.tabSwitchCount + 1
            : prev.summary.tabSwitchCount,
        windowBlurCount:
          event === 'window_blur'
            ? prev.summary.windowBlurCount + 1
            : prev.summary.windowBlurCount,
      },
    }));
  }, []);

  const closeViolation = useCallback(() => {
    const start = violationStartRef.current;
    if (!start) return;

    const duration = Date.now() - start;
    violationStartRef.current = null;

    setLog((prev) => {
      const violations = [...prev.violations];
      if (violations.length > 0 && violations[violations.length - 1].durationOutsideMs === null) {
        violations[violations.length - 1].durationOutsideMs = duration;
      }
      return {
        ...prev,
        violations,
        summary: {
          ...prev.summary,
          totalTimeOutsideMs: prev.summary.totalTimeOutsideMs + duration,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;

    const handleFullscreenChange = () => {
      if (!isMonitoringRef.current) return;

      if (!document.fullscreenElement) {
        recordViolation('fullscreen_exit');
      } else if (violationStartRef.current) {
        closeViolation();
      }
    };

    const handleVisibilityChange = () => {
      if (!isMonitoringRef.current) return;

      if (document.hidden) {
        recordViolation('tab_switch');
      } else if (violationStartRef.current) {
        closeViolation();
      }
    };

    const handleBlur = () => {
      if (!isMonitoringRef.current) return;
      recordViolation('window_blur');
    };

    const handleFocus = () => {
      if (!isMonitoringRef.current) return;
      if (violationStartRef.current) {
        closeViolation();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [recordViolation, closeViolation]);

  const startMonitoring = useCallback(() => {
    isMonitoringRef.current = true;
    // Record initial fullscreen state
    setLog((prev) => ({
      ...prev,
      startedInFullscreen:
        typeof document !== 'undefined' ? !!document.fullscreenElement : null,
    }));
  }, []);

  const stopMonitoring = useCallback(() => {
    isMonitoringRef.current = false;
    // Close any open violation
    if (violationStartRef.current) {
      closeViolation();
    }
  }, [closeViolation]);

  const setCurrentPromptId = useCallback((promptId: number) => {
    currentPromptIdRef.current = promptId;
  }, []);

  // Check if flagged: >60s outside OR >5 violations
  const isFlagged =
    log.summary.totalTimeOutsideMs > 60000 || log.summary.totalViolations > 5;

  return {
    log,
    isFlagged,
    startMonitoring,
    stopMonitoring,
    setCurrentPromptId,
  };
}
