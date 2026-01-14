import { inngest } from './inngest';
import { db } from '@/db';
import { interviewAttempts, candidateLockouts } from '@/db/schema';
import { eq, and, lt, inArray, isNotNull } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { deleteObject } from './r2';

/**
 * Detect and mark abandoned attempts.
 * Runs every 10 minutes.
 * Marks attempts stuck in 'in_progress' for >1 hour as abandoned.
 * This clears the unique-index blocker, allowing new attempts after unlock.
 */
export const detectAbandonedAttempts = inngest.createFunction(
  { id: 'detect-abandoned-attempts' },
  { cron: '*/10 * * * *' },
  async ({ step }) => {
    // Find attempts stuck in 'in_progress' for >1 hour
    const staleAttempts = await step.run('find-stale-attempts', async () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      return db.query.interviewAttempts.findMany({
        where: and(
          eq(interviewAttempts.status, 'in_progress'),
          lt(interviewAttempts.startedAt, oneHourAgo)
        ),
      });
    });

    let abandonedCount = 0;

    for (const attempt of staleAttempts) {
      await step.run(`abandon-attempt-${attempt.id}`, async () => {
        await db.transaction(async (tx) => {
          // Mark attempt as abandoned (clears unique-index blocker)
          await tx
            .update(interviewAttempts)
            .set({
              status: 'abandoned',
              updatedAt: new Date(),
            })
            .where(eq(interviewAttempts.id, attempt.id));

          // Update or create lockout record
          await tx
            .insert(candidateLockouts)
            .values({
              candidateId: attempt.candidateId,
              isLocked: true,
              lockReason: 'abandoned',
              lockedAt: new Date(),
              abandonedAttempts: 1,
              totalAttempts: 1,
            })
            .onConflictDoUpdate({
              target: candidateLockouts.candidateId,
              set: {
                isLocked: true,
                lockReason: 'abandoned',
                lockedAt: new Date(),
                abandonedAttempts: sql`abandoned_attempts + 1`,
                // Clear any previous unlock decision
                unlockDecision: null,
                unlockRequestText: null,
                unlockRequestedAt: null,
                updatedAt: new Date(),
              },
            });
        });

        abandonedCount++;
      });
    }

    return { abandoned: abandonedCount };
  }
);

/**
 * Clean up expired videos.
 * Runs daily at 3 AM.
 * Deletes videos from R2 that have passed their expiry date.
 */
export const cleanupExpiredVideos = inngest.createFunction(
  { id: 'cleanup-expired-videos' },
  { cron: '0 3 * * *' },
  async ({ step }) => {
    // Find attempts with expired videos
    const expiredAttempts = await step.run('find-expired-videos', async () => {
      return db.query.interviewAttempts.findMany({
        where: and(
          isNotNull(interviewAttempts.videoObjectKey),
          eq(interviewAttempts.videoDeleted, false),
          lt(interviewAttempts.videoExpiresAt, new Date())
        ),
      });
    });

    let deletedCount = 0;

    for (const attempt of expiredAttempts) {
      await step.run(`delete-video-${attempt.id}`, async () => {
        if (attempt.videoObjectKey) {
          try {
            // Delete from R2
            await deleteObject(attempt.videoObjectKey);
          } catch (error) {
            // Log but don't fail - video might already be deleted
            console.error(`Failed to delete video ${attempt.videoObjectKey}:`, error);
          }

          // Mark as deleted in DB
          await db
            .update(interviewAttempts)
            .set({
              videoDeleted: true,
              updatedAt: new Date(),
            })
            .where(eq(interviewAttempts.id, attempt.id));

          deletedCount++;
        }
      });
    }

    return { deleted: deletedCount };
  }
);

/**
 * Process interview submission.
 * Triggered when a candidate submits their interview.
 * Handles transcription, segmentation, and evaluation.
 *
 * NOTE: Full implementation requires OpenAI Whisper and Anthropic Claude APIs.
 * This is a skeleton that updates status through the pipeline.
 */
export const processInterviewSubmission = inngest.createFunction(
  { id: 'process-interview-submission' },
  { event: 'interview/submitted' },
  async ({ event, step }) => {
    const { attemptId } = event.data;

    // Step 1: Update to transcribing
    await step.run('start-transcription', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'transcribing',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // TODO: Implement actual Whisper transcription
      // const attempt = await db.query.interviewAttempts.findFirst({
      //   where: eq(interviewAttempts.id, attemptId),
      // });
      // const videoBuffer = await downloadObject(attempt.videoObjectKey);
      // const transcript = await whisper.transcribe(videoBuffer);
    });

    // Step 2: Segment transcript
    await step.run('segment-transcript', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'segmenting',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // TODO: Implement segment alignment
      // Map Whisper segments to prompt boundaries
    });

    // Step 3: Evaluate with Claude
    await step.run('evaluate-transcript', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'evaluating',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // TODO: Implement Claude evaluation
      // Send transcript + prompts to Claude with evaluator system prompt
      // Parse structured JSON response
    });

    // Step 4: Finalize
    await step.run('finalize', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'finalizing',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // For now, mark as complete with placeholder feedback
      // TODO: Replace with actual feedback from Claude
      await db
        .update(interviewAttempts)
        .set({
          status: 'complete',
          completedAt: new Date(),
          feedbackJson: {
            message: 'Processing pipeline complete. Full evaluation pending API integration.',
          },
          hireInclination: 'borderline',
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));
    });

    return { success: true, attemptId };
  }
);

// Export all functions for the Inngest serve handler
export const functions = [
  detectAbandonedAttempts,
  cleanupExpiredVideos,
  processInterviewSubmission,
];
