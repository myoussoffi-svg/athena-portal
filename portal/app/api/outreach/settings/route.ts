import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { outreachSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { updateSettingsSchema } from '@/lib/outreach/schemas';

// GET /api/outreach/settings - Get user's outreach settings
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [settings] = await db
      .select()
      .from(outreachSettings)
      .where(eq(outreachSettings.userId, userId));

    if (!settings) {
      // Return empty settings if none exist
      return NextResponse.json({
        userName: null,
        userSchool: null,
        userYear: null,
        userMajor: null,
        userInterest: null,
      });
    }

    return NextResponse.json({
      userName: settings.userName,
      userSchool: settings.userSchool,
      userYear: settings.userYear,
      userMajor: settings.userMajor,
      userInterest: settings.userInterest,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PATCH /api/outreach/settings - Update user's outreach settings
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Upsert settings
    const [settings] = await db
      .insert(outreachSettings)
      .values({
        userId,
        userName: data.userName ?? null,
        userSchool: data.userSchool ?? null,
        userYear: data.userYear ?? null,
        userMajor: data.userMajor ?? null,
        userInterest: data.userInterest ?? null,
      })
      .onConflictDoUpdate({
        target: outreachSettings.userId,
        set: {
          userName: data.userName ?? undefined,
          userSchool: data.userSchool ?? undefined,
          userYear: data.userYear ?? undefined,
          userMajor: data.userMajor ?? undefined,
          userInterest: data.userInterest ?? undefined,
          updatedAt: new Date(),
        },
      })
      .returning();

    return NextResponse.json({
      userName: settings.userName,
      userSchool: settings.userSchool,
      userYear: settings.userYear,
      userMajor: settings.userMajor,
      userInterest: settings.userInterest,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
