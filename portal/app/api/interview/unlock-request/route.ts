import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { candidateLockouts } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * POST /api/interview/unlock-request
 *
 * Allows a locked-out candidate to request an unlock.
 * Body: { reason: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { reason } = body;

    if (!reason || typeof reason !== 'string' || reason.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a reason with at least 10 characters' },
        { status: 400 }
      );
    }

    // Check if candidate has a lockout record
    const existingLockout = await db
      .select()
      .from(candidateLockouts)
      .where(eq(candidateLockouts.candidateId, userId))
      .limit(1);

    if (existingLockout.length === 0) {
      return NextResponse.json(
        { error: 'No lockout record found' },
        { status: 404 }
      );
    }

    const lockout = existingLockout[0];

    // Check if already unlocked
    if (!lockout.isLocked) {
      return NextResponse.json(
        { error: 'You are not currently locked out' },
        { status: 400 }
      );
    }

    // Check if there's already a pending request
    if (lockout.unlockDecision === 'pending') {
      return NextResponse.json(
        { error: 'You already have a pending unlock request' },
        { status: 409 }
      );
    }

    // Check if locked reason allows unlock requests
    // For 'cooldown' - they should wait until the cooldown expires
    // For 'abandoned' and 'admin_hold' - allow unlock requests
    if (lockout.lockReason === 'cooldown' && lockout.lockedUntil) {
      const now = new Date();
      if (lockout.lockedUntil > now) {
        const remainingMs = lockout.lockedUntil.getTime() - now.getTime();
        const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
        return NextResponse.json(
          {
            error: `You are in a cooldown period. Please wait ${remainingHours} hour(s) before trying again.`,
            lockedUntil: lockout.lockedUntil.toISOString(),
          },
          { status: 400 }
        );
      }
    }

    // Update lockout record with unlock request
    await db
      .update(candidateLockouts)
      .set({
        unlockRequestText: reason.trim(),
        unlockRequestedAt: new Date(),
        unlockDecision: 'pending',
      })
      .where(eq(candidateLockouts.candidateId, userId));

    return NextResponse.json({
      success: true,
      message: 'Your unlock request has been submitted. An administrator will review it shortly.',
    });

  } catch (error) {
    console.error('Unlock request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit unlock request' },
      { status: 500 }
    );
  }
}
