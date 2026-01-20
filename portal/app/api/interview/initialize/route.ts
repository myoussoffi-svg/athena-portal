import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import {
  interviewAttempts,
  candidateLockouts,
  activeVersions,
  promptVersions,
} from '@/db/schema';
import { eq, and, inArray, sql } from 'drizzle-orm';
import { generateUploadUrl } from '@/lib/r2';

export async function POST() {
  try {
    // 1. Require authentication - candidateId from Clerk session
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    // 2. Run initialization in a transaction
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

          throw {
            type: 'LOCKED',
            reason: lockout.lockReason,
            unlockRequestAllowed: unlockRequestAllowed && !requestPending,
            requestPending,
          };
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

      // Get active versions
      const [versions] = await tx.select().from(activeVersions).limit(1);

      if (!versions) {
        throw { type: 'CONFIG_ERROR', message: 'No active versions configured' };
      }

      // Create attempt record
      // Partial unique index will reject if active attempt already exists
      const [attempt] = await tx
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

      // Get prompts for client
      const promptVersion = await tx.query.promptVersions.findFirst({
        where: eq(promptVersions.id, versions.activePromptVersionId),
      });

      if (!promptVersion) {
        throw { type: 'CONFIG_ERROR', message: 'Prompt version not found' };
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

    return NextResponse.json(result);
  } catch (error: unknown) {
    // Handle known error types
    if (error && typeof error === 'object' && 'type' in error) {
      const err = error as { type: string; [key: string]: unknown };

      if (err.type === 'LOCKED') {
        return NextResponse.json(
          {
            error: 'LOCKED',
            reason: err.reason,
            unlockRequestAllowed: err.unlockRequestAllowed,
            requestPending: err.requestPending,
          },
          { status: 403 }
        );
      }

      if (err.type === 'CONFIG_ERROR') {
        console.error('Configuration error:', err.message);
        return NextResponse.json(
          { error: 'INTERNAL_SERVER_ERROR' },
          { status: 500 }
        );
      }
    }

    // Handle Postgres unique constraint violation (active attempt exists)
    // The error code can be on the error itself or nested in error.cause
    const pgErrorCode =
      (error && typeof error === 'object' && 'code' in error && error.code) ||
      (error && typeof error === 'object' && 'cause' in error &&
       error.cause && typeof error.cause === 'object' && 'code' in error.cause && error.cause.code);

    if (pgErrorCode === '23505') {
      // Find the existing active attempt
      const existing = await db.query.interviewAttempts.findFirst({
        where: and(
          eq(interviewAttempts.candidateId, (await auth()).userId!),
          inArray(interviewAttempts.status, ['in_progress', 'processing'])
        ),
      });

      return NextResponse.json(
        {
          error: 'IN_PROGRESS',
          existingAttemptId: existing?.id,
        },
        { status: 409 }
      );
    }

    console.error('Initialize error:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
