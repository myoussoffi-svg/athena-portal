/**
 * Stripe Webhook Handler
 *
 * Handles incoming webhook events from Stripe:
 * - checkout.session.completed: Grant access after successful payment
 * - charge.refunded: Revoke access on refund
 * - charge.dispute.created: Revoke access on chargeback
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleStripeWebhook } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const result = await handleStripeWebhook(payload, signature);

    if (!result.received) {
      console.error('Webhook error:', result.error);
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ received: true, type: result.type });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Stripe webhooks must not be cached
export const dynamic = 'force-dynamic';
