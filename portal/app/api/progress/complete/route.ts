import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { lessonCompletions } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

// Request body schema for lesson completion
const LessonCompletionSchema = z.object({
  trackSlug: z.string().min(1, 'trackSlug is required'),
  moduleSlug: z.string().min(1, 'moduleSlug is required'),
  lessonSlug: z.string().min(1, 'lessonSlug is required'),
});

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // Validate request body with Zod
  const parsed = LessonCompletionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { trackSlug, moduleSlug, lessonSlug } = parsed.data;

  try {
    // Upsert: insert or update if already exists
    await db
      .insert(lessonCompletions)
      .values({
        userId,
        trackSlug,
        moduleSlug,
        lessonSlug,
        completedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [
          lessonCompletions.userId,
          lessonCompletions.trackSlug,
          lessonCompletions.moduleSlug,
          lessonCompletions.lessonSlug,
        ],
        set: {
          // Only update completedAt on re-completion
          // updatedAt is redundant and can be removed in a future migration
          completedAt: new Date(),
        },
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to mark lesson complete:', error);
    return NextResponse.json(
      { error: 'Failed to mark lesson complete' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // Validate request body with Zod
  const parsed = LessonCompletionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { trackSlug, moduleSlug, lessonSlug } = parsed.data;

  try {
    await db
      .delete(lessonCompletions)
      .where(
        and(
          eq(lessonCompletions.userId, userId),
          eq(lessonCompletions.trackSlug, trackSlug),
          eq(lessonCompletions.moduleSlug, moduleSlug),
          eq(lessonCompletions.lessonSlug, lessonSlug)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to unmark lesson complete:', error);
    return NextResponse.json(
      { error: 'Failed to unmark lesson complete' },
      { status: 500 }
    );
  }
}
