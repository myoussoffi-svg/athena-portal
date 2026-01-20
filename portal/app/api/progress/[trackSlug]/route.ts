import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { lessonCompletions, interviewAttempts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getModulesForTrack, getLessonsForModule } from '@/lib/content';

interface ModuleProgress {
  moduleSlug: string;
  lessonsCompleted: number;
  totalLessons: number;
  completedLessonSlugs: string[];
  interviewCompleted: boolean;
  lastInterviewResult: 'hire' | 'borderline' | 'no_hire' | null;
}

interface TrackProgress {
  trackSlug: string;
  modules: ModuleProgress[];
  totalLessonsCompleted: number;
  totalLessons: number;
  modulesWithAllLessonsComplete: number;
  totalModules: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackSlug: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { trackSlug } = await params;

  try {
    // Get all modules for this track
    const modules = await getModulesForTrack(trackSlug);

    // Get all lesson completions for this user and track
    const completions = await db.query.lessonCompletions.findMany({
      where: and(
        eq(lessonCompletions.userId, userId),
        eq(lessonCompletions.trackSlug, trackSlug)
      ),
    });

    // Get completed interview attempts for this user
    const completedInterviews = await db.query.interviewAttempts.findMany({
      where: and(
        eq(interviewAttempts.candidateId, userId),
        eq(interviewAttempts.status, 'complete')
      ),
      orderBy: (attempts, { desc }) => [desc(attempts.completedAt)],
    });

    // Build progress for each module
    const moduleProgress: ModuleProgress[] = await Promise.all(
      modules.map(async (module) => {
        const lessons = await getLessonsForModule(trackSlug, module.slug);
        const moduleCompletions = completions.filter(
          (c) => c.moduleSlug === module.slug
        );
        const completedLessonSlugs = moduleCompletions.map((c) => c.lessonSlug);

        // Check if user has completed an interview (interviews are track-level for now)
        const latestInterview = completedInterviews[0];

        return {
          moduleSlug: module.slug,
          lessonsCompleted: completedLessonSlugs.length,
          totalLessons: lessons.length,
          completedLessonSlugs,
          interviewCompleted: !!latestInterview,
          lastInterviewResult: latestInterview?.hireInclination || null,
        };
      })
    );

    // Calculate totals
    const totalLessonsCompleted = moduleProgress.reduce(
      (sum, m) => sum + m.lessonsCompleted,
      0
    );
    const totalLessons = moduleProgress.reduce(
      (sum, m) => sum + m.totalLessons,
      0
    );
    const modulesWithAllLessonsComplete = moduleProgress.filter(
      (m) => m.lessonsCompleted === m.totalLessons && m.totalLessons > 0
    ).length;

    const progress: TrackProgress = {
      trackSlug,
      modules: moduleProgress,
      totalLessonsCompleted,
      totalLessons,
      modulesWithAllLessonsComplete,
      totalModules: modules.length,
    };

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Failed to fetch progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
