import { db } from '@/db';
import {
  interviewAttempts,
  candidateLockouts,
  activeVersions,
  promptVersions,
} from '@/db/schema';
import { eq, and, inArray, sql } from 'drizzle-orm';
import { generateUploadUrl } from '@/lib/r2';
import { withErrorHandling, requireAuth, ApiError, Errors } from '@/lib/auth';

export const POST = withErrorHandling(async (request) => {
  const userId = await requireAuth();

  // Get trackSlug from request body
  let trackSlug: string;
  try {
    const body = await request.json();
    trackSlug = body.trackSlug;
    if (!trackSlug) {
      throw new ApiError(400, 'BAD_REQUEST', 'trackSlug is required');
    }
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(400, 'BAD_REQUEST', 'Invalid request body');
  }

  // Run initialization in a transaction
  const result = await db.transaction(async (tx) => {
    // Check lockout status
    const lockout = await tx.query.candidateLockouts.findFirst({
      where: eq(candidateLockouts.candidateId, userId),
    });

    if (lockout?.isLocked) {
      // Check if cooldown expired
      if (
        lockout.lockReason === 'cooldown' &&
        lockout.lockedUntil &&
        new Date() > lockout.lockedUntil
      ) {
        // Cooldown expired, unlock
        await tx
          .update(candidateLockouts)
          .set({
            isLocked: false,
            lockReason: null,
            lockedUntil: null,
            updatedAt: new Date(),
          })
          .where(eq(candidateLockouts.candidateId, userId));
      } else {
        // Still locked
        const unlockRequestAllowed =
          lockout.lockReason === 'abandoned' ||
          lockout.lockReason === 'admin_hold';
        const requestPending = lockout.unlockDecision === 'pending';

        throw new ApiError(403, 'LOCKED', 'Account is locked', {
          reason: lockout.lockReason,
          unlockRequestAllowed: unlockRequestAllowed && !requestPending,
          requestPending,
          lockedUntil: lockout.lockedUntil?.toISOString(),
        });
      }
    }

    // Get or create lockout record and increment attempt counter (row-level lock)
    await tx
      .insert(candidateLockouts)
      .values({
        candidateId: userId,
        totalAttempts: 0,
        abandonedAttempts: 0,
      })
      .onConflictDoNothing();

    const [updatedLockout] = await tx
      .update(candidateLockouts)
      .set({
        totalAttempts: sql`total_attempts + 1`,
        updatedAt: new Date(),
      })
      .where(eq(candidateLockouts.candidateId, userId))
      .returning();

    const attemptNumber = updatedLockout.totalAttempts;

    // Get active versions for this track
    const [versions] = await tx
      .select()
      .from(activeVersions)
      .where(eq(activeVersions.trackSlug, trackSlug))
      .limit(1);

    if (!versions) {
      throw new ApiError(404, 'NOT_FOUND', `No interview configuration found for track: ${trackSlug}`);
    }

    // Create attempt record
    // Partial unique index will reject if active attempt already exists
    let attempt;
    try {
      [attempt] = await tx
        .insert(interviewAttempts)
        .values({
          candidateId: userId,
          attemptNumber,
          status: 'in_progress',
          processingStage: 'upload_pending',
          promptVersionId: versions.activePromptVersionId,
          evaluatorVersionId: versions.activeEvaluatorVersionId,
          integritySchemaVersion: 'v1',
          startedAt: new Date(),
        })
        .returning();
    } catch (insertError: unknown) {
      // Handle Postgres unique constraint violation (active attempt exists)
      const pgErrorCode =
        (insertError && typeof insertError === 'object' && 'code' in insertError && insertError.code) ||
        (insertError && typeof insertError === 'object' && 'cause' in insertError &&
         insertError.cause && typeof insertError.cause === 'object' && 'code' in insertError.cause && insertError.cause.code);

      if (pgErrorCode === '23505') {
        // Find the existing active attempt
        const existing = await db.query.interviewAttempts.findFirst({
          where: and(
            eq(interviewAttempts.candidateId, userId),
            inArray(interviewAttempts.status, ['in_progress', 'processing'])
          ),
        });

        throw new ApiError(409, 'IN_PROGRESS', 'An interview attempt is already in progress', {
          existingAttemptId: existing?.id,
        });
      }
      throw insertError;
    }

    // Get prompts for client
    const promptVersion = await tx.query.promptVersions.findFirst({
      where: eq(promptVersions.id, versions.activePromptVersionId),
    });

    if (!promptVersion) {
      throw Errors.internal('Prompt version not found');
    }

    // Generate presigned upload URL
    const { uploadUrl, objectKey, expiresAt } = await generateUploadUrl(attempt.id);

    // Store the object key on the attempt
    await tx
      .update(interviewAttempts)
      .set({ videoObjectKey: objectKey })
      .where(eq(interviewAttempts.id, attempt.id));

    return {
      attemptId: attempt.id,
      attemptNumber,
      uploadUrl,
      uploadUrlExpiresAt: expiresAt.toISOString(),
      prompts: promptVersion.prompts,
      promptVersionId: versions.activePromptVersionId,
      evaluatorVersionId: versions.activeEvaluatorVersionId,
    };
  });

  return Response.json(result);
});
