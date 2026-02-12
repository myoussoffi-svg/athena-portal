import { NextRequest } from 'next/server';
import { db, outreachSettings, outreachContacts, purchases, outreachWeeklyStats, userAchievements, lessonCompletions, resumeFeedback } from '@/db';
import { requireAdmin, Errors, ApiError } from '@/lib/auth';
import { eq, desc, count } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await requireAdmin();

    const { userId } = await params;

    // Get Clerk user info
    const client = await clerkClient();
    let clerkUser;
    try {
      clerkUser = await client.users.getUser(userId);
    } catch {
      throw Errors.notFound('User');
    }

    // Get outreach settings (profile)
    const settings = await db.query.outreachSettings.findFirst({
      where: eq(outreachSettings.userId, userId),
    });

    // Get all contacts
    const contacts = await db
      .select()
      .from(outreachContacts)
      .where(eq(outreachContacts.userId, userId))
      .orderBy(desc(outreachContacts.createdAt))
      .limit(100);

    // Get weekly stats
    const weeklyStats = await db
      .select()
      .from(outreachWeeklyStats)
      .where(eq(outreachWeeklyStats.userId, userId))
      .orderBy(desc(outreachWeeklyStats.weekId))
      .limit(12);

    // Get achievements
    const achievements = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.earnedAt));

    // Get lesson completions
    const lessonCompletionCount = await db
      .select({ count: count() })
      .from(lessonCompletions)
      .where(eq(lessonCompletions.userId, userId));

    // Get resume feedback history
    const resumeHistory = await db
      .select({
        id: resumeFeedback.id,
        status: resumeFeedback.status,
        overallScore10: resumeFeedback.overallScore10,
        createdAt: resumeFeedback.createdAt,
      })
      .from(resumeFeedback)
      .where(eq(resumeFeedback.userId, userId))
      .orderBy(desc(resumeFeedback.createdAt))
      .limit(10);

    // Get purchase history
    const purchaseHistory = await db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, userId))
      .orderBy(desc(purchases.purchasedAt));

    // Calculate stats
    const totalStats = weeklyStats.reduce(
      (acc, week) => ({
        totalPoints: acc.totalPoints + week.totalPoints,
        totalEmailsSent: acc.totalEmailsSent + week.emailsSent,
        totalContactsAdded: acc.totalContactsAdded + week.contactsAdded,
        totalResponses: acc.totalResponses + week.responsesReceived,
      }),
      { totalPoints: 0, totalEmailsSent: 0, totalContactsAdded: 0, totalResponses: 0 }
    );

    return Response.json({
      user: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || 'Unknown',
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        createdAt: clerkUser.createdAt,
        lastSignInAt: clerkUser.lastSignInAt,
      },
      profile: settings
        ? {
            userName: settings.userName,
            userSchool: settings.userSchool,
            userYear: settings.userYear,
            userMajor: settings.userMajor,
            userInterest: settings.userInterest,
            userPreviousExperience: settings.userPreviousExperience,
            userHometown: settings.userHometown,
            createdAt: settings.createdAt,
            updatedAt: settings.updatedAt,
          }
        : null,
      stats: {
        ...totalStats,
        totalContacts: contacts.length,
        lessonsCompleted: lessonCompletionCount[0]?.count || 0,
        resumesSubmitted: resumeHistory.length,
        achievementsEarned: achievements.length,
      },
      contacts: contacts.map(c => ({
        id: c.id,
        name: c.name,
        firm: c.firm,
        role: c.role,
        email: c.email,
        status: c.status,
        connectionType: c.connectionType,
        lastContactDate: c.lastContactDate,
        createdAt: c.createdAt,
      })),
      weeklyStats: weeklyStats.map(w => ({
        weekId: w.weekId,
        contactsAdded: w.contactsAdded,
        emailsSent: w.emailsSent,
        responsesReceived: w.responsesReceived,
        totalPoints: w.totalPoints,
      })),
      achievements: achievements.map(a => ({
        type: a.achievementType,
        earnedAt: a.earnedAt,
      })),
      resumeHistory: resumeHistory.map(r => ({
        id: r.id,
        status: r.status,
        overallScore: r.overallScore10,
        createdAt: r.createdAt,
      })),
      purchaseHistory: purchaseHistory.map(p => ({
        id: p.id,
        status: p.status,
        amountPaid: p.amountPaidCents / 100,
        purchasedAt: p.purchasedAt,
      })),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return error.toResponse();
    }
    console.error('Admin user details error:', error);
    return Errors.internal().toResponse();
  }
}
