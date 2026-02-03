/**
 * Stripe integration for course purchases
 *
 * Handles checkout sessions, webhooks, and refunds
 */

import Stripe from 'stripe';
import { db } from '@/db';
import { products, purchases, adminActions } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Initialize Stripe client
function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  return new Stripe(secretKey);
}

/**
 * Create a Stripe Checkout session for a product purchase
 *
 * @param productSlug - The product slug to purchase
 * @param userId - Clerk user ID
 * @param userEmail - User's email for Stripe
 * @param successUrl - URL to redirect after successful payment
 * @param cancelUrl - URL to redirect if user cancels
 * @returns Checkout session URL
 */
export async function createCheckoutSession(
  productSlug: string,
  userId: string,
  userEmail: string,
  successUrl: string,
  cancelUrl: string
): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripeClient();

  // Get product from database
  const product = await db.query.products.findFirst({
    where: eq(products.slug, productSlug),
  });

  if (!product) {
    throw new Error(`Product not found: ${productSlug}`);
  }

  if (!product.isActive) {
    throw new Error(`Product is not available for purchase: ${productSlug}`);
  }

  if (!product.stripePriceId) {
    throw new Error(`Product is not configured for Stripe: ${productSlug}`);
  }

  // Check if user already has this product
  const existingPurchase = await db.query.purchases.findFirst({
    where: (purchases, { and, eq }) =>
      and(
        eq(purchases.userId, userId),
        eq(purchases.productId, product.id),
        eq(purchases.status, 'active')
      ),
  });

  if (existingPurchase) {
    throw new Error('You already own this course');
  }

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [
      {
        price: product.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      productId: product.id,
      productSlug: product.slug,
    },
    // Collect billing address for tax/fraud purposes
    billing_address_collection: 'required',
    // Allow promotion codes if you set them up in Stripe
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error('Failed to create checkout session');
  }

  return {
    url: session.url,
    sessionId: session.id,
  };
}

/**
 * Handle Stripe webhook events
 *
 * @param payload - Raw request body
 * @param signature - Stripe signature header
 * @returns Processing result
 */
export async function handleStripeWebhook(
  payload: string,
  signature: string
): Promise<{ received: boolean; type: string; error?: string }> {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { received: false, type: 'error', error: `Webhook signature verification failed: ${message}` };
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      await handleChargeRefunded(charge);
      break;
    }

    case 'charge.dispute.created': {
      const dispute = event.data.object as Stripe.Dispute;
      await handleDisputeCreated(dispute);
      break;
    }

    default:
      // Ignore other event types
      break;
  }

  return { received: true, type: event.type };
}

/**
 * Handle successful checkout - create purchase record
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const userId = session.metadata?.userId;
  const productId = session.metadata?.productId;

  if (!userId || !productId) {
    console.error('Missing metadata in checkout session:', session.id);
    return;
  }

  // Check if purchase already exists (idempotency)
  const existing = await db.query.purchases.findFirst({
    where: eq(purchases.stripeCheckoutSessionId, session.id),
  });

  if (existing) {
    console.log('Purchase already exists for session:', session.id);
    return;
  }

  // Create purchase record
  await db.insert(purchases).values({
    userId,
    productId,
    stripeCustomerId: session.customer as string,
    stripePaymentIntentId: session.payment_intent as string,
    stripeCheckoutSessionId: session.id,
    amountPaidCents: session.amount_total || 0,
    status: 'active',
    purchasedAt: new Date(),
  });

  console.log('Purchase created for user:', userId, 'product:', productId);
}

/**
 * Handle refund - revoke access
 */
async function handleChargeRefunded(charge: Stripe.Charge): Promise<void> {
  const paymentIntentId = charge.payment_intent as string;

  if (!paymentIntentId) {
    console.error('No payment intent on refunded charge:', charge.id);
    return;
  }

  // Find the purchase by payment intent
  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.stripePaymentIntentId, paymentIntentId),
  });

  if (!purchase) {
    console.error('No purchase found for payment intent:', paymentIntentId);
    return;
  }

  // Update purchase status
  await db
    .update(purchases)
    .set({
      status: 'refunded',
      refundedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(purchases.id, purchase.id));

  console.log('Purchase refunded:', purchase.id);
}

/**
 * Handle dispute/chargeback - immediately revoke access
 */
async function handleDisputeCreated(dispute: Stripe.Dispute): Promise<void> {
  const paymentIntentId = dispute.payment_intent as string;

  if (!paymentIntentId) {
    console.error('No payment intent on dispute:', dispute.id);
    return;
  }

  // Find the purchase by payment intent
  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.stripePaymentIntentId, paymentIntentId),
  });

  if (!purchase) {
    console.error('No purchase found for disputed payment intent:', paymentIntentId);
    return;
  }

  // Update purchase status
  await db
    .update(purchases)
    .set({
      status: 'disputed',
      disputedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(purchases.id, purchase.id));

  console.log('Purchase disputed:', purchase.id);
}

/**
 * Issue a refund for a purchase (admin action)
 *
 * @param purchaseId - The purchase ID to refund
 * @param adminUserId - The admin user performing the action
 * @param reason - Reason for the refund
 * @returns Refund result
 */
export async function issueRefund(
  purchaseId: string,
  adminUserId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  const stripe = getStripeClient();

  // Get the purchase
  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.id, purchaseId),
  });

  if (!purchase) {
    return { success: false, error: 'Purchase not found' };
  }

  if (purchase.status !== 'active') {
    return { success: false, error: `Purchase is already ${purchase.status}` };
  }

  if (!purchase.stripePaymentIntentId) {
    return { success: false, error: 'No Stripe payment intent found' };
  }

  try {
    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: purchase.stripePaymentIntentId,
      reason: 'requested_by_customer',
    });

    // Update purchase status
    await db
      .update(purchases)
      .set({
        status: 'refunded',
        refundedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(purchases.id, purchaseId));

    // Log admin action
    await db.insert(adminActions).values({
      adminUserId,
      actionType: 'issue_refund',
      targetUserId: purchase.userId,
      purchaseId: purchase.id,
      reason,
      stripeRefundId: refund.id,
      refundAmountCents: refund.amount,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: `Stripe refund failed: ${message}` };
  }
}

/**
 * Grant free access to a user (admin action)
 *
 * @param userId - User to grant access to
 * @param productSlug - Product to grant
 * @param adminUserId - Admin performing the action
 * @param reason - Reason for granting free access
 */
export async function grantFreeAccess(
  userId: string,
  productSlug: string,
  adminUserId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  // Get product
  const product = await db.query.products.findFirst({
    where: eq(products.slug, productSlug),
  });

  if (!product) {
    return { success: false, error: 'Product not found' };
  }

  // Check if user already has access
  const existing = await db.query.purchases.findFirst({
    where: (purchases, { and, eq }) =>
      and(
        eq(purchases.userId, userId),
        eq(purchases.productId, product.id),
        eq(purchases.status, 'active')
      ),
  });

  if (existing) {
    return { success: false, error: 'User already has access to this product' };
  }

  // Create purchase record (with 0 amount paid)
  const [newPurchase] = await db
    .insert(purchases)
    .values({
      userId,
      productId: product.id,
      amountPaidCents: 0,
      status: 'active',
      purchasedAt: new Date(),
    })
    .returning();

  // Log admin action
  await db.insert(adminActions).values({
    adminUserId,
    actionType: 'grant_access',
    targetUserId: userId,
    purchaseId: newPurchase.id,
    reason,
  });

  return { success: true };
}

/**
 * Revoke access from a user (admin action)
 *
 * @param purchaseId - Purchase to revoke
 * @param adminUserId - Admin performing the action
 * @param reason - Reason for revoking
 */
export async function revokeAccess(
  purchaseId: string,
  adminUserId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.id, purchaseId),
  });

  if (!purchase) {
    return { success: false, error: 'Purchase not found' };
  }

  if (purchase.status !== 'active') {
    return { success: false, error: `Purchase is already ${purchase.status}` };
  }

  // Update status (use 'refunded' status for revocations)
  await db
    .update(purchases)
    .set({
      status: 'refunded',
      refundedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(purchases.id, purchaseId));

  // Log admin action
  await db.insert(adminActions).values({
    adminUserId,
    actionType: 'revoke_access',
    targetUserId: purchase.userId,
    purchaseId: purchase.id,
    reason,
  });

  return { success: true };
}

/**
 * Sync a product to Stripe (create or update)
 *
 * @param productSlug - Product to sync
 * @returns Updated product with Stripe IDs
 */
export async function syncProductToStripe(productSlug: string): Promise<{
  success: boolean;
  stripeProductId?: string;
  stripePriceId?: string;
  error?: string;
}> {
  const stripe = getStripeClient();

  const product = await db.query.products.findFirst({
    where: eq(products.slug, productSlug),
  });

  if (!product) {
    return { success: false, error: 'Product not found' };
  }

  try {
    let stripeProduct: Stripe.Product;

    if (product.stripeProductId) {
      // Update existing product
      stripeProduct = await stripe.products.update(product.stripeProductId, {
        name: product.name,
        description: product.description || undefined,
        active: product.isActive,
      });
    } else {
      // Create new product
      stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description || undefined,
        active: product.isActive,
        metadata: {
          productSlug: product.slug,
          productId: product.id,
        },
      });
    }

    // Create or update price
    let stripePrice: Stripe.Price;

    if (product.stripePriceId) {
      // Prices are immutable in Stripe, so we need to create a new one if price changed
      const existingPrice = await stripe.prices.retrieve(product.stripePriceId);
      if (existingPrice.unit_amount !== product.priceUsdCents) {
        // Archive old price and create new one
        await stripe.prices.update(product.stripePriceId, { active: false });
        stripePrice = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: product.priceUsdCents,
          currency: 'usd',
        });
      } else {
        stripePrice = existingPrice;
      }
    } else {
      // Create new price
      stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.priceUsdCents,
        currency: 'usd',
      });
    }

    // Update database with Stripe IDs
    await db
      .update(products)
      .set({
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
        updatedAt: new Date(),
      })
      .where(eq(products.id, product.id));

    return {
      success: true,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: `Stripe sync failed: ${message}` };
  }
}
