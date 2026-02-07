/**
 * Points System for Outreach Gamification
 *
 * Points are awarded for EFFORT (contacts/emails), not outcomes.
 * This rewards consistent hustle regardless of response rates.
 */

import type { OutreachActivityType, AchievementType, NextMilestone } from './schemas';

// ─────────────────────────────────────────────────────────────
// POINT VALUES
// ─────────────────────────────────────────────────────────────

export const POINTS = {
  contact_added: 5,
  email_sent: 10,
  response_received: 0, // No points for outcomes
  call_scheduled: 0,
  call_completed: 0,
  became_advocate: 0,
} as const satisfies Record<OutreachActivityType, number>;

// Bonuses
export const WEEKLY_CONSISTENCY_BONUS = 25; // If 10+ emails that week
export const WEEKLY_CONSISTENCY_THRESHOLD = 10; // Emails needed for bonus
export const STREAK_BONUS_PER_WEEK = 50; // Per consecutive active week

// ─────────────────────────────────────────────────────────────
// ACHIEVEMENT DEFINITIONS
// ─────────────────────────────────────────────────────────────

export interface AchievementDefinition {
  type: AchievementType;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'consistency' | 'volume';
  checkProgress: (stats: ProgressStats) => { earned: boolean; current: number; target: number };
}

export interface ProgressStats {
  totalContacts: number;
  totalEmails: number;
  currentStreak: number;
  longestStreak: number;
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  // Milestones
  {
    type: 'first_contact',
    title: 'First Contact',
    description: 'Add your first networking contact',
    icon: '🎯',
    category: 'milestone',
    checkProgress: (s) => ({ earned: s.totalContacts >= 1, current: s.totalContacts, target: 1 }),
  },
  {
    type: 'first_10_emails',
    title: 'Getting Started',
    description: 'Send your first 10 outreach emails',
    icon: '📧',
    category: 'milestone',
    checkProgress: (s) => ({ earned: s.totalEmails >= 10, current: s.totalEmails, target: 10 }),
  },
  {
    type: 'contacts_50',
    title: 'Network Builder',
    description: 'Build a network of 50 contacts',
    icon: '🌐',
    category: 'milestone',
    checkProgress: (s) => ({ earned: s.totalContacts >= 50, current: s.totalContacts, target: 50 }),
  },
  {
    type: 'emails_100',
    title: 'Century Club',
    description: 'Send 100 outreach emails',
    icon: '💯',
    category: 'milestone',
    checkProgress: (s) => ({ earned: s.totalEmails >= 100, current: s.totalEmails, target: 100 }),
  },

  // Consistency Streaks
  {
    type: 'streak_2_weeks',
    title: 'Building Momentum',
    description: '2 consecutive weeks of outreach activity',
    icon: '🔥',
    category: 'consistency',
    checkProgress: (s) => ({ earned: s.longestStreak >= 2, current: s.currentStreak, target: 2 }),
  },
  {
    type: 'streak_4_weeks',
    title: 'Consistent Networker',
    description: '4 consecutive weeks of outreach activity',
    icon: '🔥🔥',
    category: 'consistency',
    checkProgress: (s) => ({ earned: s.longestStreak >= 4, current: s.currentStreak, target: 4 }),
  },
  {
    type: 'streak_8_weeks',
    title: 'Unstoppable',
    description: '8 consecutive weeks of outreach activity',
    icon: '⚡',
    category: 'consistency',
    checkProgress: (s) => ({ earned: s.longestStreak >= 8, current: s.currentStreak, target: 8 }),
  },
  {
    type: 'streak_12_weeks',
    title: 'Networking Legend',
    description: '12 consecutive weeks of outreach activity',
    icon: '👑',
    category: 'consistency',
    checkProgress: (s) => ({ earned: s.longestStreak >= 12, current: s.currentStreak, target: 12 }),
  },

  // Volume achievements
  {
    type: 'contacts_10',
    title: 'Getting Organized',
    description: 'Add 10 contacts to your tracker',
    icon: '📋',
    category: 'volume',
    checkProgress: (s) => ({ earned: s.totalContacts >= 10, current: s.totalContacts, target: 10 }),
  },
  {
    type: 'contacts_25',
    title: 'Pipeline Builder',
    description: 'Add 25 contacts to your tracker',
    icon: '📊',
    category: 'volume',
    checkProgress: (s) => ({ earned: s.totalContacts >= 25, current: s.totalContacts, target: 25 }),
  },
  {
    type: 'contacts_100',
    title: 'Master Networker',
    description: 'Add 100 contacts to your tracker',
    icon: '🏆',
    category: 'volume',
    checkProgress: (s) => ({ earned: s.totalContacts >= 100, current: s.totalContacts, target: 100 }),
  },
  {
    type: 'emails_25',
    title: 'Active Outreacher',
    description: 'Send 25 outreach emails',
    icon: '✉️',
    category: 'volume',
    checkProgress: (s) => ({ earned: s.totalEmails >= 25, current: s.totalEmails, target: 25 }),
  },
  {
    type: 'emails_50',
    title: 'Prolific Networker',
    description: 'Send 50 outreach emails',
    icon: '📬',
    category: 'volume',
    checkProgress: (s) => ({ earned: s.totalEmails >= 50, current: s.totalEmails, target: 50 }),
  },
  {
    type: 'emails_200',
    title: 'Outreach Machine',
    description: 'Send 200 outreach emails',
    icon: '🚀',
    category: 'volume',
    checkProgress: (s) => ({ earned: s.totalEmails >= 200, current: s.totalEmails, target: 200 }),
  },
];

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Get points for a specific activity type
 */
export function getPointsForActivity(activityType: OutreachActivityType): number {
  return POINTS[activityType];
}

/**
 * Calculate weekly bonus points
 */
export function calculateWeeklyBonus(emailsSent: number): number {
  return emailsSent >= WEEKLY_CONSISTENCY_THRESHOLD ? WEEKLY_CONSISTENCY_BONUS : 0;
}

/**
 * Calculate streak bonus
 */
export function calculateStreakBonus(consecutiveWeeks: number): number {
  if (consecutiveWeeks <= 0) return 0;
  return STREAK_BONUS_PER_WEEK * consecutiveWeeks;
}

/**
 * Get ISO week ID for a date
 * Format: '2024-W05'
 */
export function getWeekId(date: Date = new Date()): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  // Get Thursday of this week (ISO week calculation)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));

  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return `${d.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
}

/**
 * Get the day of week (0-6, Sunday = 0)
 */
export function getDayOfWeek(date: Date = new Date()): number {
  return date.getDay();
}

/**
 * Parse week ID to get start and end dates
 */
export function parseWeekId(weekId: string): { start: Date; end: Date } {
  const [year, week] = weekId.split('-W').map(Number);

  // Get January 4th of the year (always in week 1)
  const jan4 = new Date(year, 0, 4);

  // Get the Monday of week 1
  const week1Monday = new Date(jan4);
  week1Monday.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));

  // Get the Monday of the requested week
  const start = new Date(week1Monday);
  start.setDate(week1Monday.getDate() + (week - 1) * 7);

  // Get Sunday (end of week)
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

/**
 * Format week ID for display
 */
export function formatWeekLabel(weekId: string): string {
  const { start, end } = parseWeekId(weekId);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const startMonth = monthNames[start.getMonth()];
  const endMonth = monthNames[end.getMonth()];

  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}`;
  }

  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
}

/**
 * Check which achievements should be earned based on current stats
 */
export function checkAchievements(
  stats: ProgressStats,
  existingAchievements: Set<AchievementType>
): AchievementType[] {
  const newAchievements: AchievementType[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (existingAchievements.has(achievement.type)) continue;

    const progress = achievement.checkProgress(stats);
    if (progress.earned) {
      newAchievements.push(achievement.type);
    }
  }

  return newAchievements;
}

/**
 * Get the next milestone to work towards
 */
export function getNextMilestone(
  stats: ProgressStats,
  existingAchievements: Set<AchievementType>
): NextMilestone | null {
  // Order achievements by difficulty/target
  const unearned = ACHIEVEMENTS
    .filter((a) => !existingAchievements.has(a.type))
    .map((a) => {
      const progress = a.checkProgress(stats);
      return {
        ...a,
        currentProgress: progress.current,
        targetProgress: progress.target,
        percentComplete: Math.min(100, Math.round((progress.current / progress.target) * 100)),
      };
    })
    .sort((a, b) => b.percentComplete - a.percentComplete);

  if (unearned.length === 0) return null;

  // Return the one closest to completion
  const next = unearned[0];
  return {
    type: next.type,
    title: next.title,
    description: next.description,
    currentProgress: next.currentProgress,
    targetProgress: next.targetProgress,
    percentComplete: next.percentComplete,
  };
}

/**
 * Convert achievement type to display data
 */
export function getAchievementDisplay(type: AchievementType): { title: string; description: string; icon: string } {
  const def = ACHIEVEMENTS.find((a) => a.type === type);
  if (!def) {
    return { title: 'Unknown', description: '', icon: '❓' };
  }
  return { title: def.title, description: def.description, icon: def.icon };
}

/**
 * Calculate consecutive week streak
 */
export function calculateStreak(activeWeeks: string[]): number {
  if (activeWeeks.length === 0) return 0;

  // Sort weeks in descending order (most recent first)
  const sorted = [...activeWeeks].sort((a, b) => b.localeCompare(a));

  const currentWeek = getWeekId();
  const lastWeek = getWeekId(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

  // Check if current or last week is in the list
  if (sorted[0] !== currentWeek && sorted[0] !== lastWeek) {
    return 0; // Streak broken
  }

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prevWeek = getPreviousWeekId(sorted[i - 1]);
    if (sorted[i] === prevWeek) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get the previous week's ID
 */
function getPreviousWeekId(weekId: string): string {
  const { start } = parseWeekId(weekId);
  const prevWeek = new Date(start);
  prevWeek.setDate(prevWeek.getDate() - 7);
  return getWeekId(prevWeek);
}
