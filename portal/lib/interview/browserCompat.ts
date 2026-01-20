import type { BrowserSupportResult } from './types';

/**
 * Get the best supported video MIME type for MediaRecorder
 */
export function getSupportedMimeType(): string | null {
  if (typeof window === 'undefined' || !window.MediaRecorder) {
    return null;
  }

  // Ordered by preference: vp9 > vp8 > mp4 (Safari fallback)
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4', // Safari fallback
  ];

  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }

  return null;
}

/**
 * Check if the browser supports all required features for interview recording
 */
export function checkBrowserSupport(): BrowserSupportResult {
  const issues: string[] = [];

  // Check if running in browser
  if (typeof window === 'undefined') {
    return {
      supported: false,
      issues: ['Not running in browser environment'],
      mimeType: null,
    };
  }

  // MediaRecorder API
  if (!window.MediaRecorder) {
    issues.push('Video recording is not supported in this browser');
  }

  // getUserMedia
  if (!navigator.mediaDevices?.getUserMedia) {
    issues.push('Camera and microphone access is not supported');
  }

  // Fullscreen API
  if (!document.documentElement.requestFullscreen) {
    issues.push('Fullscreen mode is not supported');
  }

  // Check supported codecs
  const mimeType = getSupportedMimeType();
  if (!mimeType) {
    issues.push('No supported video format found');
  }

  return {
    supported: issues.length === 0,
    issues,
    mimeType,
  };
}

/**
 * Check if the current device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if the browser is online
 */
export function isOnline(): boolean {
  if (typeof window === 'undefined') return true;
  return navigator.onLine;
}

/**
 * Get browser info for integrity log
 */
export function getBrowserInfo(): { userAgent: string; platform: string } | null {
  if (typeof window === 'undefined') return null;
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
  };
}
