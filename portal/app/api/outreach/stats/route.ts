import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getGamificationStats, getUncelebratedAchievements } from '@/lib/outreach/activity-logger';

// GET /api/outreach/stats - Get gamification stats for current user
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getGamificationStats(userId);
    const uncelebratedAchievements = await getUncelebratedAchievements(userId);

    return NextResponse.json({
      ...stats,
      uncelebratedAchievements,
    });
  } catch (error) {
    console.error('Error fetching gamification stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
