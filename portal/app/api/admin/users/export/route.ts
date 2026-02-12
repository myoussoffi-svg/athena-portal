import { db, outreachSettings, outreachContacts, purchases, outreachWeeklyStats, lessonCompletions } from '@/db';
import { requireAdmin, Errors, ApiError } from '@/lib/auth';
import { desc, sql, count, eq } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    await requireAdmin();

    // Get all users with outreach settings
    const settingsResult = await db
      .select()
      .from(outreachSettings)
      .orderBy(desc(outreachSettings.createdAt));

    if (settingsResult.length === 0) {
      // Return empty CSV with headers
      const headers = [
        'Email',
        'Name',
        'School',
        'Year',
        'Major',
        'Interest',
        'Previous Experience',
        'Hometown',
        'Total Contacts',
        'Emails Sent',
        'Responses Received',
        'Total Points',
        'Lessons Completed',
        'Has Purchased',
        'Purchase Date',
        'Amount Paid',
        'Date Joined',
        'Last Sign In',
      ];
      return new Response(headers.join(',') + '\n', {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="athena-users-export-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Get Clerk users for email/name info
    const client = await clerkClient();
    const clerkUserIds = settingsResult.map(s => s.userId);

    const clerkUsersResponse = await client.users.getUserList({ userId: clerkUserIds, limit: 500 });
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
        totalResponses: sql<number>`SUM(${outreachWeeklyStats.responsesReceived})`,
      })
      .from(outreachWeeklyStats)
      .where(sql`${outreachWeeklyStats.userId} IN (${sql.join(clerkUserIds.map(id => sql`${id}`), sql`, `)})`)
      .groupBy(outreachWeeklyStats.userId) : [];

    const statsMap = new Map(
      statsAggregates.map(s => [s.userId, {
        totalPoints: s.totalPoints || 0,
        totalEmailsSent: s.totalEmailsSent || 0,
        totalResponses: s.totalResponses || 0,
      }])
    );

    // Get lesson completion counts
    const lessonCounts = clerkUserIds.length > 0 ? await db
      .select({
        userId: lessonCompletions.userId,
        count: count(),
      })
      .from(lessonCompletions)
      .where(sql`${lessonCompletions.userId} IN (${sql.join(clerkUserIds.map(id => sql`${id}`), sql`, `)})`)
      .groupBy(lessonCompletions.userId) : [];

    const lessonCountsMap = new Map(
      lessonCounts.map(c => [c.userId, c.count])
    );

    // Get purchase info for each user
    const purchaseInfo = clerkUserIds.length > 0 ? await db
      .select({
        userId: purchases.userId,
        purchasedAt: purchases.purchasedAt,
        amountPaidCents: purchases.amountPaidCents,
        status: purchases.status,
      })
      .from(purchases)
      .where(sql`${purchases.userId} IN (${sql.join(clerkUserIds.map(id => sql`${id}`), sql`, `)})`) : [];

    const purchaseMap = new Map(
      purchaseInfo.map(p => [p.userId, p])
    );

    // Build CSV
    const headers = [
      'Email',
      'Name',
      'School',
      'Year',
      'Major',
      'Interest',
      'Previous Experience',
      'Hometown',
      'Total Contacts',
      'Emails Sent',
      'Responses Received',
      'Total Points',
      'Lessons Completed',
      'Has Purchased',
      'Purchase Date',
      'Amount Paid',
      'Date Joined',
      'Last Sign In',
    ];

    const escapeCSV = (value: string | number | null | undefined): string => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const formatDate = (date: Date | number | null | undefined): string => {
      if (!date) return '';
      const d = typeof date === 'number' ? new Date(date) : date;
      return d.toISOString().split('T')[0];
    };

    const rows = settingsResult.map(settings => {
      const clerkUser = clerkUsersMap.get(settings.userId);
      const stats = statsMap.get(settings.userId) || { totalPoints: 0, totalEmailsSent: 0, totalResponses: 0 };
      const purchase = purchaseMap.get(settings.userId);

      return [
        escapeCSV(clerkUser?.emailAddresses[0]?.emailAddress || 'Unknown'),
        escapeCSV(settings.userName || clerkUser?.firstName || ''),
        escapeCSV(settings.userSchool),
        escapeCSV(settings.userYear),
        escapeCSV(settings.userMajor),
        escapeCSV(settings.userInterest),
        escapeCSV(settings.userPreviousExperience),
        escapeCSV(settings.userHometown),
        contactCountsMap.get(settings.userId) || 0,
        stats.totalEmailsSent,
        stats.totalResponses,
        stats.totalPoints,
        lessonCountsMap.get(settings.userId) || 0,
        purchase?.status === 'active' ? 'Yes' : 'No',
        formatDate(purchase?.purchasedAt),
        purchase ? `$${(purchase.amountPaidCents / 100).toFixed(2)}` : '',
        formatDate(clerkUser?.createdAt),
        formatDate(clerkUser?.lastSignInAt),
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="athena-users-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return error.toResponse();
    }
    console.error('Admin users export error:', error);
    return Errors.internal().toResponse();
  }
}
