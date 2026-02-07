/**
 * Activity Logger for Outreach Gamification
 *
 * Logs activities, updates weekly stats, and checks for new achievements.
 */

import { db } from '@/db';
import {
  outreachActivityLog,
  outreachWeeklyStats,
  userAchievements,
  outreachContacts,
} from '@/db/schema';
import { eq, and, sql, desc, count } from 'drizzle-orm';
import type { OutreachActivityType, AchievementType, GamificationStats, Achievement, WeeklyActivity } from './schemas';
import {
  getPointsForActivity,
  getWeekId,
  getDayOfWeek,
  formatWeekLabel,
  checkAchievements,
  getNextMilestone,
  getAchievementDisplay,
  calculateStreak,
  WEEKLY_CONSISTENCY_THRESHOLD,
  type ProgressStats,
} from './points-system';

// ─────────────────────────────────────────────────────────────
// ACTIVITY LOGGING
// ─────────────────────────────────────────────────────────────

export interface LogActivityResult {
  pointsEarned: number;
  newAchievements: AchievementType[];
  weeklyBonusEarned: boolean;
}

/**
 * Log an outreach activity
 */
export async function logActivity(
  userId: string,
  activityType: OutreachActivityType,
  contactId?: string
): Promise<LogActivityResult> {
  const now = new Date();
  const weekId = getWeekId(now);
  const dayOfWeek = getDayOfWeek(now);
  const points = getPointsForActivity(activityType);

  // 1. Insert activity log entry
  await db.insert(outreachActivityLog).values({
    userId,
    activityType,
    contactId: contactId || null,
    pointsEarned: points,
    occurredAt: now,
    weekId,
  });

  // 2. Update or create weekly stats
  const [existingStats] = await db
    .select()
    .from(outreachWeeklyStats)
    .where(and(eq(outreachWeeklyStats.userId, userId), eq(outreachWeeklyStats.weekId, weekId)));

  let weeklyBonusEarned = false;

  if (existingStats) {
    // Update existing stats
    const activeDays = existingStats.activeDays as number[] || [];
    if (!activeDays.includes(dayOfWeek)) {
      activeDays.push(dayOfWeek);
    }

    const updateData: Record<string, unknown> = {
      totalPoints: sql`${outreachWeeklyStats.totalPoints} + ${points}`,
      activeDays,
      updatedAt: now,
    };

    // Increment the appropriate counter
    switch (activityType) {
      case 'contact_added':
        updateData.contactsAdded = sql`${outreachWeeklyStats.contactsAdded} + 1`;
        break;
      case 'email_sent':
        updateData.emailsSent = sql`${outreachWeeklyStats.emailsSent} + 1`;
        // Check if this email triggers weekly bonus
        if (existingStats.emailsSent + 1 === WEEKLY_CONSISTENCY_THRESHOLD) {
          weeklyBonusEarned = true;
        }
        break;
      case 'response_received':
        updateData.responsesReceived = sql`${outreachWeeklyStats.responsesReceived} + 1`;
        break;
      case 'call_scheduled':
        updateData.callsScheduled = sql`${outreachWeeklyStats.callsScheduled} + 1`;
        break;
      case 'call_completed':
        updateData.callsCompleted = sql`${outreachWeeklyStats.callsCompleted} + 1`;
        break;
      case 'became_advocate':
        updateData.advocatesGained = sql`${outreachWeeklyStats.advocatesGained} + 1`;
        break;
    }

    await db
      .update(outreachWeeklyStats)
      .set(updateData)
      .where(eq(outreachWeeklyStats.id, existingStats.id));
  } else {
    // Create new weekly stats
    await db.insert(outreachWeeklyStats).values({
      userId,
      weekId,
      contactsAdded: activityType === 'contact_added' ? 1 : 0,
      emailsSent: activityType === 'email_sent' ? 1 : 0,
      responsesReceived: activityType === 'response_received' ? 1 : 0,
      callsScheduled: activityType === 'call_scheduled' ? 1 : 0,
      callsCompleted: activityType === 'call_completed' ? 1 : 0,
      advocatesGained: activityType === 'became_advocate' ? 1 : 0,
      totalPoints: points,
      activeDays: [dayOfWeek],
    });
  }

  // 3. Check for new achievements
  const newAchievements = await checkAndAwardAchievements(userId);

  return {
    pointsEarned: points,
    newAchievements,
    weeklyBonusEarned,
  };
}

// ─────────────────────────────────────────────────────────────
// ACHIEVEMENT CHECKING
// ─────────────────────────────────────────────────────────────

/**
 * Check and award any new achievements
 */
async function checkAndAwardAchievements(userId: string): Promise<AchievementType[]> {
  // Get current stats
  const stats = await getProgressStats(userId);

  // Get existing achievements
  const existingAchievementRows = await db
    .select({ type: userAchievements.achievementType })
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  const existingAchievements = new Set(existingAchievementRows.map((a) => a.type));

  // Check for new achievements
  const newAchievementTypes = checkAchievements(stats, existingAchievements);

  // Award new achievements
  for (const type of newAchievementTypes) {
    await db.insert(userAchievements).values({
      userId,
      achievementType: type,
      earnedAt: new Date(),
      celebrationShown: false,
    });
  }

  return newAchievementTypes;
}

/**
 * Get progress stats for achievement checking
 */
async function getProgressStats(userId: string): Promise<ProgressStats> {
  // Get total contacts
  const [contactCount] = await db
    .select({ count: count() })
    .from(outreachContacts)
    .where(eq(outreachContacts.userId, userId));

  // Get total emails sent
  const [emailCount] = await db
    .select({ count: count() })
    .from(outreachActivityLog)
    .where(
      and(
        eq(outreachActivityLog.userId, userId),
        eq(outreachActivityLog.activityType, 'email_sent')
      )
    );

  // Get active weeks for streak calculation
  const activeWeeks = await db
    .select({ weekId: outreachWeeklyStats.weekId })
    .from(outreachWeeklyStats)
    .where(eq(outreachWeeklyStats.userId, userId))
    .orderBy(desc(outreachWeeklyStats.weekId));

  const weekIds = activeWeeks.map((w) => w.weekId);
  const currentStreak = calculateStreak(weekIds);

  return {
    totalContacts: contactCount?.count || 0,
    totalEmails: emailCount?.count || 0,
    currentStreak,
    longestStreak: currentStreak, // TODO: track historical longest streak
  };
}

// ─────────────────────────────────────────────────────────────
// STATS RETRIEVAL
// ─────────────────────────────────────────────────────────────

/**
 * Get full gamification stats for a user
 */
export async function getGamificationStats(userId: string): Promise<GamificationStats> {
  // Get all weekly stats
  const weeklyStats = await db
    .select()
    .from(outreachWeeklyStats)
    .where(eq(outreachWeeklyStats.userId, userId))
    .orderBy(desc(outreachWeeklyStats.weekId));

  // Get all achievements
  const achievementRows = await db
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  // Calculate totals
  const totalPoints = weeklyStats.reduce((sum, w) => sum + w.totalPoints, 0);
  const totalContactsAdded = weeklyStats.reduce((sum, w) => sum + w.contactsAdded, 0);
  const totalEmailsSent = weeklyStats.reduce((sum, w) => sum + w.emailsSent, 0);
  const totalResponses = weeklyStats.reduce((sum, w) => sum + w.responsesReceived, 0);
  const totalCalls = weeklyStats.reduce((sum, w) => sum + w.callsCompleted, 0);

  // Calculate streak
  const weekIds = weeklyStats.map((w) => w.weekId);
  const currentStreak = calculateStreak(weekIds);

  // Get current week points
  const currentWeekId = getWeekId();
  const currentWeekStats = weeklyStats.find((w) => w.weekId === currentWeekId);
  const currentWeekPoints = currentWeekStats?.totalPoints || 0;

  // Format achievements
  const achievements: Achievement[] = achievementRows.map((a) => {
    const display = getAchievementDisplay(a.achievementType);
    return {
      type: a.achievementType,
      earnedAt: a.earnedAt.toISOString(),
      celebrationShown: a.celebrationShown,
      ...display,
    };
  });

  // Get progress stats for next milestone
  const progressStats: ProgressStats = {
    totalContacts: totalContactsAdded,
    totalEmails: totalEmailsSent,
    currentStreak,
    longestStreak: currentStreak,
  };

  const existingTypes = new Set(achievementRows.map((a) => a.achievementType));
  const nextMilestone = getNextMilestone(progressStats, existingTypes);

  // Format weekly activity (last 8 weeks)
  const weeklyActivity: WeeklyActivity[] = weeklyStats.slice(0, 8).map((w) => ({
    weekId: w.weekId,
    weekLabel: formatWeekLabel(w.weekId),
    contactsAdded: w.contactsAdded,
    emailsSent: w.emailsSent,
    points: w.totalPoints,
    activeDays: w.activeDays as number[] || [],
  }));

  return {
    totalPoints,
    currentWeekPoints,
    currentStreak,
    longestStreak: currentStreak,
    totalContactsAdded,
    totalEmailsSent,
    totalResponses,
    totalCalls,
    achievements,
    nextMilestone,
    weeklyActivity,
  };
}

/**
 * Get uncelebrated achievements (for showing celebration modal)
 */
export async function getUncelebratedAchievements(userId: string): Promise<Achievement[]> {
  const rows = await db
    .select()
    .from(userAchievements)
    .where(
      and(
        eq(userAchievements.userId, userId),
        eq(userAchievements.celebrationShown, false)
      )
    );

  return rows.map((a) => {
    const display = getAchievementDisplay(a.achievementType);
    return {
      type: a.achievementType,
      earnedAt: a.earnedAt.toISOString(),
      celebrationShown: a.celebrationShown,
      ...display,
    };
  });
}

/**
 * Mark achievement as celebrated
 */
export async function markAchievementCelebrated(
  userId: string,
  achievementType: AchievementType
): Promise<void> {
  await db
    .update(userAchievements)
    .set({ celebrationShown: true })
    .where(
      and(
        eq(userAchievements.userId, userId),
        eq(userAchievements.achievementType, achievementType)
      )
    );
}

// ─────────────────────────────────────────────────────────────
// LEADERBOARD
// ─────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  totalPoints: number;
  currentStreak: number;
  isCurrentUser: boolean;
}

/**
 * Get leaderboard data
 */
export async function getLeaderboard(
  userId: string,
  limit: number = 10
): Promise<{
  allTime: LeaderboardEntry[];
  thisMonth: LeaderboardEntry[];
  streaks: LeaderboardEntry[];
  userRank: { allTime: number | null; thisMonth: number | null; streaks: number | null };
}> {
  // All-time points
  const allTimeStats = await db
    .select({
      odUserId: outreachWeeklyStats.userId,
      totalPoints: sql<number>`SUM(${outreachWeeklyStats.totalPoints})::int`,
    })
    .from(outreachWeeklyStats)
    .groupBy(outreachWeeklyStats.userId)
    .orderBy(desc(sql`SUM(${outreachWeeklyStats.totalPoints})`))
    .limit(limit);

  // This month's points
  const now = new Date();
  const thisMonthStart = `${now.getFullYear()}-W${String(Math.ceil(now.getDate() / 7)).padStart(2, '0')}`;

  const thisMonthStats = await db
    .select({
      odUserId: outreachWeeklyStats.userId,
      totalPoints: sql<number>`SUM(${outreachWeeklyStats.totalPoints})::int`,
    })
    .from(outreachWeeklyStats)
    .where(sql`${outreachWeeklyStats.weekId} >= ${thisMonthStart}`)
    .groupBy(outreachWeeklyStats.userId)
    .orderBy(desc(sql`SUM(${outreachWeeklyStats.totalPoints})`))
    .limit(limit);

  // Format leaderboard entries
  const formatEntries = (
    stats: { odUserId: string; totalPoints: number }[],
    currentUserId: string
  ): LeaderboardEntry[] => {
    return stats.map((s, i) => ({
      rank: i + 1,
      userId: s.odUserId,
      displayName: s.odUserId === currentUserId ? 'You' : `User ${i + 1}`,
      totalPoints: s.totalPoints,
      currentStreak: 0, // Would need to calculate
      isCurrentUser: s.odUserId === currentUserId,
    }));
  };

  // Find user's rank
  const allTimeRank = allTimeStats.findIndex((s) => s.odUserId === userId);
  const thisMonthRank = thisMonthStats.findIndex((s) => s.odUserId === userId);

  return {
    allTime: formatEntries(allTimeStats, userId),
    thisMonth: formatEntries(thisMonthStats, userId),
    streaks: [], // TODO: implement streak leaderboard
    userRank: {
      allTime: allTimeRank >= 0 ? allTimeRank + 1 : null,
      thisMonth: thisMonthRank >= 0 ? thisMonthRank + 1 : null,
      streaks: null,
    },
  };
}
