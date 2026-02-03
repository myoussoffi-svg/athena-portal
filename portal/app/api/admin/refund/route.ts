/**
 * Admin Refund API
 *
 * Allows admins to issue refunds for purchases
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { issueRefund } from '@/lib/stripe';
import { db } from '@/db';
import { interviewViewers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const refundRequestSchema = z.object({
  purchaseId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});

// Check if user is an admin
async function isAdmin(userId: string): Promise<boolean> {
  const viewer = await db.query.interviewViewers.findFirst({
    where: eq(interviewViewers.userId, userId),
  });
  return viewer?.role === 'admin';
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check admin status
    const adminCheck = await isAdmin(userId);
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const parseResult = refundRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { purchaseId, reason } = parseResult.data;

    // Issue refund
    const result = await issueRefund(purchaseId, userId, reason);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: 'Refund processed successfully' });
  } catch (error) {
    console.error('Admin refund error:', error);
    return NextResponse.json(
      { error: 'Failed to process refund' },
      { status: 500 }
    );
  }
}
