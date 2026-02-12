import { NextRequest } from 'next/server';
import { db, outreachSettings, outreachContacts, purchases, outreachWeeklyStats } from '@/db';
import { requireAdmin, Errors, ApiError } from '@/lib/auth';
import { desc, sql, count } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';

interface UserData {
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  profile: {
    userName: string | null;
    userSchool: string | null;
    userYear: string | null;
    userMajor: string | null;
    userInterest: string | null;
    userPreviousExperience: string | null;
    userHometown: string | null;
  } | null;
  stats: {
    totalContacts: number;
    totalPoints: number;
    totalEmailsSent: number;
  };
  hasPurchased: boolean;
  purchasedAt: string | null;
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    // Get users with outreach settings (those who have used the outreach feature)
    const settingsResult = await db
      .select()
      .from(outreachSettings)
      .orderBy(desc(outreachSettings.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: count() })
      .from(outreachSettings);

    const totalUsers = countResult[0]?.count || 0;

    // Get Clerk users for email/name info
    const client = await clerkClient();
    const clerkUserIds = settingsResult.map(s => s.userId);

    // Batch fetch clerk users
    const clerkUsersResponse = clerkUserIds.length > 0
      ? await client.users.getUserList({ userId: clerkUserIds })
      : { data: [] };

    const clerkUsersMap = new Map(
      clerkUsersResponse.data.map(u => [u.id, u])
    );

    // Get contact counts for each user
    const contactCounts = clerkUserIds.length > 0 ? await db
      .select({
        userId: outreachContacts.userId,
        count: count(),
      })
      .from(outreachContacts)
      .where(sql`${outreachContacts.userId} IN (${sql.join(clerkUserIds.map(id => sql`${id}`), sql`, `)})`)
      .groupBy(outreachContacts.userId) : [];

    const contactCountsMap = new Map(
      contactCounts.map(c => [c.userId, c.count])
    );

    // Get weekly stats totals for each user
    const statsAggregates = clerkUserIds.length > 0 ? await db
      .select({
        userId: outreachWeeklyStats.userId,
        totalPoints: sql<number>`SUM(${outreachWeeklyStats.totalPoints})`,
        totalEmailsSent: sql<number>`SUM(${outreachWeeklyStats.emailsSent})`,
      })
      .from(outreachWeeklyStats)
      .where(sql`${outreachWeeklyStats.userId} IN (${sql.join(clerkUserIds.map(id => sql`${id}`), sql`, `)})`)
      .groupBy(outreachWeeklyStats.userId) : [];

    const statsMap = new Map(
      statsAggregates.map(s => [s.userId, { totalPoints: s.totalPoints || 0, totalEmailsSent: s.totalEmailsSent || 0 }])
    );

    // Get purchase info for each user
    const purchaseInfo = clerkUserIds.length > 0 ? await db
      .select({
        userId: purchases.userId,
        purchasedAt: purchases.purchasedAt,
      })
      .from(purchases)
      .where(sql`${purchases.userId} IN (${sql.join(clerkUserIds.map(id => sql`${id}`), sql`, `)}) AND ${purchases.status} = 'active'`) : [];

    const purchaseMap = new Map(
      purchaseInfo.map(p => [p.userId, p.purchasedAt])
    );

    // Build response
    const users: UserData[] = settingsResult.map(settings => {
      const clerkUser = clerkUsersMap.get(settings.userId);
      const stats = statsMap.get(settings.userId) || { totalPoints: 0, totalEmailsSent: 0 };
      const purchasedAt = purchaseMap.get(settings.userId);

      return {
        clerkId: settings.userId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || 'Unknown',
        firstName: clerkUser?.firstName || null,
        lastName: clerkUser?.lastName || null,
        createdAt: settings.createdAt.toISOString(),
        profile: {
          userName: settings.userName,
          userSchool: settings.userSchool,
          userYear: settings.userYear,
          userMajor: settings.userMajor,
          userInterest: settings.userInterest,
          userPreviousExperience: settings.userPreviousExperience,
          userHometown: settings.userHometown,
        },
        stats: {
          totalContacts: contactCountsMap.get(settings.userId) || 0,
          totalPoints: stats.totalPoints,
          totalEmailsSent: stats.totalEmailsSent,
        },
        hasPurchased: !!purchasedAt,
        purchasedAt: purchasedAt?.toISOString() || null,
      };
    });

    // Filter by search if provided
    const filteredUsers = search
      ? users.filter(u =>
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.profile?.userName?.toLowerCase().includes(search.toLowerCase()) ||
          u.profile?.userSchool?.toLowerCase().includes(search.toLowerCase())
        )
      : users;

    return Response.json({
      users: filteredUsers,
      pagination: {
        page,
        limit,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return error.toResponse();
    }
    console.error('Admin users list error:', error);
    return Errors.internal().toResponse();
  }
}
