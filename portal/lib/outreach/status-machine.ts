import type { OutreachStatus } from './schemas';
export type { OutreachStatus } from './schemas';

// ─────────────────────────────────────────────────────────────
// STATUS TRANSITIONS
// ─────────────────────────────────────────────────────────────

/**
 * Valid status transitions. Key is current status, value is array of allowed next statuses.
 *
 * Flow:
 * identified → contacted (sent first email)
 * contacted → responded | stale (got response or gave up)
 * responded → scheduled | stale (scheduled call or went cold)
 * scheduled → spoke | stale (had call or no-show)
 * spoke → advocate | stale (they agreed to help or relationship faded)
 * advocate → (terminal, but can go stale if relationship goes cold)
 * stale → contacted (retry outreach)
 */
const validTransitions: Record<OutreachStatus, OutreachStatus[]> = {
  identified: ['contacted'],
  contacted: ['responded', 'stale'],
  responded: ['scheduled', 'stale'],
  scheduled: ['spoke', 'stale'],
  spoke: ['advocate', 'stale'],
  advocate: ['stale'],
  stale: ['contacted'], // Allow retry
};

export function canTransitionTo(
  currentStatus: OutreachStatus,
  newStatus: OutreachStatus
): boolean {
  if (currentStatus === newStatus) return true; // No-op is always valid
  return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}

export function getValidNextStatuses(currentStatus: OutreachStatus): OutreachStatus[] {
  return validTransitions[currentStatus] ?? [];
}

// ─────────────────────────────────────────────────────────────
// FOLLOW-UP CALCULATIONS
// ─────────────────────────────────────────────────────────────

/**
 * Calculate the follow-up due date based on status and last contact date.
 * Returns null if no follow-up is needed.
 */
export function calculateFollowUpDue(
  status: OutreachStatus,
  lastContactDate: Date | null
): Date | null {
  if (!lastContactDate) return null;

  const daysToAdd = getFollowUpDays(status);
  if (daysToAdd === null) return null;

  const followUpDate = new Date(lastContactDate);
  followUpDate.setDate(followUpDate.getDate() + daysToAdd);
  return followUpDate;
}

/**
 * Days until follow-up is due based on status.
 * Returns null if no follow-up is needed for this status.
 */
function getFollowUpDays(status: OutreachStatus): number | null {
  switch (status) {
    case 'contacted':
      return 7; // First follow-up after 7 days
    case 'responded':
      return 3; // Schedule quickly! 3 days to respond
    case 'scheduled':
      return null; // No automatic follow-up, user manages calendar
    case 'spoke':
      return 14; // Thank-you/check-in after 2 weeks
    case 'advocate':
      return 30; // Monthly check-in with advocates
    case 'identified':
    case 'stale':
      return null; // No follow-up needed
    default:
      return null;
  }
}

export function isFollowUpDue(followUpDate: Date | null): boolean {
  if (!followUpDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(followUpDate);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate <= today;
}

export function daysSinceDate(date: Date | null): number | null {
  if (!date) return null;
  const today = new Date();
  const diffTime = today.getTime() - new Date(date).getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// ─────────────────────────────────────────────────────────────
// STATUS LABELS AND COLORS
// ─────────────────────────────────────────────────────────────

export const statusLabels: Record<OutreachStatus, string> = {
  identified: 'Identified',
  contacted: 'Contacted',
  responded: 'Responded',
  scheduled: 'Scheduled',
  spoke: 'Spoke',
  advocate: 'Advocate',
  stale: 'Stale',
};

export const statusColors: Record<OutreachStatus, { bg: string; text: string }> = {
  identified: { bg: 'rgba(10, 10, 10, 0.05)', text: 'rgba(10, 10, 10, 0.65)' },
  contacted: { bg: 'rgba(65, 109, 137, 0.1)', text: '#416D89' },
  responded: { bg: 'rgba(34, 139, 34, 0.1)', text: '#228B22' },
  scheduled: { bg: 'rgba(255, 140, 0, 0.1)', text: '#FF8C00' },
  spoke: { bg: 'rgba(34, 139, 34, 0.15)', text: '#228B22' },
  advocate: { bg: 'rgba(34, 139, 34, 0.2)', text: '#1a6b1a' },
  stale: { bg: 'rgba(10, 10, 10, 0.03)', text: 'rgba(10, 10, 10, 0.4)' },
};

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

export const MAX_CONTACTS_PER_USER = 300;
export const MAX_EMAIL_GENERATIONS_PER_DAY = 10;
