'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseFullscreenReturn {
  isFullscreen: boolean;
  isSupported: boolean;
  enter: () => Promise<boolean>;
  exit: () => Promise<void>;
}

/**
 * Hook to manage fullscreen state
 */
export function useFullscreen(onExit?: () => void): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(() => {
    // Initialize with current fullscreen state
    if (typeof document !== 'undefined') {
      return !!document.fullscreenElement;
    }
    return false;
  });
  const isSupported =
    typeof document !== 'undefined' && !!document.documentElement.requestFullscreen;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleChange = () => {
      const nowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(nowFullscreen);

      // Call onExit callback when exiting fullscreen
      if (!nowFullscreen && onExit) {
        onExit();
      }
    };

    document.addEventListener('fullscreenchange', handleChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
    };
  }, [onExit]);

  const enter = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      await document.documentElement.requestFullscreen();
      return true;
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
      return false;
    }
  }, [isSupported]);

  const exit = useCallback(async (): Promise<void> => {
    if (typeof document === 'undefined') return;

    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error('Failed to exit fullscreen:', error);
      }
    }
  }, []);

  return {
    isFullscreen,
    isSupported,
    enter,
    exit,
  };
}
