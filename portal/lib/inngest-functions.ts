import { inngest } from './inngest';
import { db } from '@/db';
import {
  interviewAttempts,
  candidateLockouts,
  promptVersions,
  evaluatorVersions,
  resumeFeedback,
} from '@/db/schema';
import { eq, and, lt, isNotNull, ne, count } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { deleteObject, downloadObject } from './r2';
import { transcribeAudio, alignTranscriptToSegments } from './openai-client';
import { evaluateInterview } from './anthropic-client';
import type { Prompt } from './interview/types';
import { extractDocText, validateDocMetadata } from './resume/doc-extractor';
import { analyzeResume, getFormattingIssues } from './resume/pre-analyzer';
import { evaluateResume } from './resume/evaluator';
import { RESUME_QUOTA_LIMIT } from './resume/schemas';

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
 */
export const processInterviewSubmission = inngest.createFunction(
  { id: 'process-interview-submission', retries: 2 },
  { event: 'interview/submitted' },
  async ({ event, step }) => {
    const { attemptId } = event.data;

    // Step 1: Fetch attempt and related data
    const attemptData = await step.run('fetch-attempt-data', async () => {
      const attempt = await db.query.interviewAttempts.findFirst({
        where: eq(interviewAttempts.id, attemptId),
      });

      if (!attempt) {
        throw new Error(`Attempt ${attemptId} not found`);
      }

      if (!attempt.videoObjectKey) {
        throw new Error(`Attempt ${attemptId} has no video object key`);
      }

      // Fetch prompt version
      const promptVersion = await db.query.promptVersions.findFirst({
        where: eq(promptVersions.id, attempt.promptVersionId),
      });

      if (!promptVersion) {
        throw new Error(`Prompt version ${attempt.promptVersionId} not found`);
      }

      // Fetch evaluator version
      const evaluatorVersion = await db.query.evaluatorVersions.findFirst({
        where: eq(evaluatorVersions.id, attempt.evaluatorVersionId),
      });

      if (!evaluatorVersion) {
        throw new Error(`Evaluator version ${attempt.evaluatorVersionId} not found`);
      }

      return {
        attempt,
        prompts: promptVersion.prompts as Prompt[],
        systemPrompt: evaluatorVersion.systemPrompt,
        segmentBoundaries: (attempt.segments || []) as Array<{
          promptId: number;
          startTimeSeconds: number;
          endTimeSeconds: number;
          transcriptText: string | null;
        }>,
      };
    });

    // Step 2: Download video and transcribe with Whisper
    const transcription = await step.run('transcribe-video', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'transcribing',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // Download video from R2
      const videoBuffer = await downloadObject(attemptData.attempt.videoObjectKey!);

      // Transcribe with Whisper
      const result = await transcribeAudio(videoBuffer, 'recording.webm');

      return result;
    });

    // Step 3: Align transcript to segment boundaries
    const alignedSegments = await step.run('align-segments', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'segmenting',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // Align transcript words to segment boundaries
      const aligned = alignTranscriptToSegments(
        transcription,
        attemptData.segmentBoundaries
      );

      // Update segments in database with transcript text
      await db
        .update(interviewAttempts)
        .set({
          segments: aligned,
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      return aligned;
    });

    // Step 4: Evaluate with Claude
    const feedback = await step.run('evaluate-with-claude', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'evaluating',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // Evaluate interview with Claude
      const result = await evaluateInterview(
        alignedSegments,
        attemptData.prompts,
        attemptData.systemPrompt
      );

      return result;
    });

    // Step 5: Finalize and store feedback
    await step.run('finalize', async () => {
      await db
        .update(interviewAttempts)
        .set({
          processingStage: 'finalizing',
          lastStageUpdatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));

      // Store feedback and mark as complete
      await db
        .update(interviewAttempts)
        .set({
          status: 'complete',
          completedAt: new Date(),
          feedbackJson: feedback as unknown as Record<string, unknown>,
          hireInclination: feedback.hireInclination,
          updatedAt: new Date(),
        })
        .where(eq(interviewAttempts.id, attemptId));
    });

    return { success: true, attemptId };
  }
);

/**
 * Process resume submission.
 * Triggered when a user submits their resume for feedback.
 * Handles Word document extraction, pre-analysis, and Claude evaluation.
 */
export const processResumeSubmission = inngest.createFunction(
  { id: 'process-resume-submission', retries: 2 },
  { event: 'resume/submitted' },
  async ({ event, step }) => {
    const { feedbackId, userId, resumeObjectKey } = event.data;

    // Helper to update status and handle failures
    const updateStatus = async (
      status: 'extracting' | 'analyzing' | 'complete' | 'failed',
      extra?: Partial<{
        errorMessage: string;
        pageCount: number;
        wordCount: number;
        overallScore10: number;
        scoreFormat: number;
        scoreEducation: number;
        scoreExperience: number;
        scoreSkills: number;
        scoreWriting: number;
        feedbackJson: Record<string, unknown>;
        completedAt: Date;
        r2DeletedAt: Date;
      }>
    ) => {
      await db
        .update(resumeFeedback)
        .set({
          status,
          updatedAt: new Date(),
          ...extra,
        })
        .where(eq(resumeFeedback.id, feedbackId));
    };

    try {
      // Step 1: Defensive quota check (in case of race condition)
      await step.run('verify-quota', async () => {
        const [quotaResult] = await db
          .select({ count: count() })
          .from(resumeFeedback)
          .where(
            and(
              eq(resumeFeedback.userId, userId),
              ne(resumeFeedback.status, 'failed'),
              ne(resumeFeedback.id, feedbackId)
            )
          );

        const used = quotaResult?.count ?? 0;

        if (used >= RESUME_QUOTA_LIMIT) {
          throw new Error('QUOTA_EXCEEDED');
        }
      });

      // Step 2: Download Word document and extract text
      const extractionResult = await step.run('extract-doc', async () => {
        await updateStatus('extracting');

        // Download Word document from R2
        const docBuffer = await downloadObject(resumeObjectKey);

        // Extract text and metadata
        const extracted = await extractDocText(docBuffer);

        // Validate metadata
        const validation = validateDocMetadata(extracted);
        if (!validation.valid) {
          throw new Error(validation.error);
        }

        return extracted;
      });

      // Step 3: Update with metadata
      await step.run('store-metadata', async () => {
        await db
          .update(resumeFeedback)
          .set({
            wordCount: extractionResult.wordCount,
            updatedAt: new Date(),
          })
          .where(eq(resumeFeedback.id, feedbackId));
      });

      // Step 4: Pre-analyze with heuristics
      const preAnalysis = await step.run('pre-analyze', async () => {
        return analyzeResume(extractionResult.text);
      });

      // Step 5: Evaluate with Claude
      const feedback = await step.run('evaluate-with-claude', async () => {
        await updateStatus('analyzing');

        const result = await evaluateResume(extractionResult.text, preAnalysis);

        // Merge in formatting issues from pre-analysis
        const heuristicIssues = getFormattingIssues(preAnalysis);
        result.flags.formattingIssues = [
          ...result.flags.formattingIssues,
          ...heuristicIssues,
        ];

        return result;
      });

      // Step 6: Store feedback and cleanup
      await step.run('finalize', async () => {
        // Delete Word document from R2 (privacy - don't store resume text)
        try {
          await deleteObject(resumeObjectKey);
        } catch (deleteError) {
          console.error('Failed to delete resume from R2:', deleteError);
          // Continue anyway - not critical
        }

        // Store feedback and mark complete
        await updateStatus('complete', {
          overallScore10: feedback.overallScore10,
          scoreFormat: feedback.categoryScores.format,
          scoreEducation: feedback.categoryScores.education,
          scoreExperience: feedback.categoryScores.experience,
          scoreSkills: feedback.categoryScores.skills,
          scoreWriting: feedback.categoryScores.writing,
          feedbackJson: feedback as unknown as Record<string, unknown>,
          completedAt: new Date(),
          r2DeletedAt: new Date(),
        });
      });

      return { success: true, feedbackId, score: feedback.overallScore10 };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      console.error(`Resume processing failed for ${feedbackId}:`, error);

      // Mark as failed (doesn't count against quota)
      await updateStatus('failed', { errorMessage });

      // Don't delete the R2 file on failure - retain for debugging (7 days)
      // A separate cleanup job can handle this

      throw error; // Re-throw for Inngest retry logic
    }
  }
);

// Export all functions for the Inngest serve handler
export const functions = [
  detectAbandonedAttempts,
  cleanupExpiredVideos,
  processInterviewSubmission,
  processResumeSubmission,
];
