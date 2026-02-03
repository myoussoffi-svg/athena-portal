/**
 * Stripe Checkout Session Creation
 *
 * Creates a checkout session for purchasing a course
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { createCheckoutSession } from '@/lib/stripe';
import { z } from 'zod';

const checkoutRequestSchema = z.object({
  productSlug: z.string().min(1),
});

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

    // Get user email
    const user = await currentUser();
    if (!user?.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      );
    }
    const userEmail = user.emailAddresses[0].emailAddress;

    // Parse request body
    const body = await request.json();
    const parseResult = checkoutRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { productSlug } = parseResult.data;

    // Build URLs for success/cancel
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || '';
    const successUrl = `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/courses/${productSlug}`;

    // Create checkout session
    const { url, sessionId } = await createCheckoutSession(
      productSlug,
      userId,
      userEmail,
      successUrl,
      cancelUrl
    );

    return NextResponse.json({ url, sessionId });
  } catch (error) {
    console.error('Checkout error:', error);

    const message = error instanceof Error ? error.message : 'Failed to create checkout session';

    // Handle known error cases
    if (message.includes('already own')) {
      return NextResponse.json(
        { error: message },
        { status: 409 }
      );
    }

    if (message.includes('not found') || message.includes('not available')) {
      return NextResponse.json(
        { error: message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
