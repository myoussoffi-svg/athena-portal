import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { markAchievementCelebrated } from '@/lib/outreach/activity-logger';
import type { AchievementType } from '@/lib/outreach/schemas';

type RouteParams = { params: Promise<{ id: string }> };

// PATCH /api/outreach/achievements/[id] - Mark achievement as celebrated
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const achievementType = id as AchievementType;

    await markAchievementCelebrated(userId, achievementType);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking achievement celebrated:', error);
    return NextResponse.json(
      { error: 'Failed to update achievement' },
      { status: 500 }
    );
  }
}
