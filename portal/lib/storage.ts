/**
 * Safe localStorage utilities that gracefully handle unavailable storage
 * (e.g., private browsing mode, restricted contexts, storage quota exceeded)
 */

/**
 * Safely get an item from localStorage
 * Returns null if storage is unavailable or the key doesn't exist
 */
export function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  } catch {
    // localStorage unavailable (private mode, restricted context, etc.)
    return null;
  }
}

/**
 * Safely set an item in localStorage
 * Returns true if successful, false if storage is unavailable
 */
export function safeSetItem(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.setItem(key, value);
    return true;
  } catch {
    // localStorage unavailable or quota exceeded
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * Returns true if successful, false if storage is unavailable
 */
export function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
