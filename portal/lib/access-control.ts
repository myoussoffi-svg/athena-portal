/**
 * Access control utilities for course entitlements
 *
 * This module provides functions to check if a user has access to courses
 * based on their purchases.
 */

import { db } from '@/db';
import { purchases, products } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: 'no_purchase' | 'refunded' | 'disputed' | 'expired';
  purchase?: {
    id: string;
    productId: string;
    status: 'active' | 'refunded' | 'disputed';
    purchasedAt: Date;
    expiresAt: Date | null;
  };
}

/**
 * Check if a user has access to a specific track/course
 *
 * @param userId - Clerk user ID
 * @param trackSlug - The track slug to check access for (e.g., 'ib-interview-prep')
 * @returns AccessCheckResult with hasAccess boolean and details
 */
export async function checkTrackAccess(
  userId: string,
  trackSlug: string
): Promise<AccessCheckResult> {
  // Find all active purchases for this user
  const userPurchases = await db
    .select({
      purchase: purchases,
      product: products,
    })
    .from(purchases)
    .innerJoin(products, eq(purchases.productId, products.id))
    .where(eq(purchases.userId, userId));

  if (userPurchases.length === 0) {
    return { hasAccess: false, reason: 'no_purchase' };
  }

  // Check each purchase to see if any grants access to this track
  for (const { purchase, product } of userPurchases) {
    // Get the granted track slugs from the product
    const grantedSlugs = (product.grantedTrackSlugs as string[]) || [];

    // Check if this product grants access to the requested track
    if (!grantedSlugs.includes(trackSlug)) {
      continue; // This product doesn't grant access to this track
    }

    // Check purchase status
    if (purchase.status === 'refunded') {
      return {
        hasAccess: false,
        reason: 'refunded',
        purchase: {
          id: purchase.id,
          productId: purchase.productId,
          status: purchase.status,
          purchasedAt: purchase.purchasedAt,
          expiresAt: purchase.expiresAt,
        },
      };
    }

    if (purchase.status === 'disputed') {
      return {
        hasAccess: false,
        reason: 'disputed',
        purchase: {
          id: purchase.id,
          productId: purchase.productId,
          status: purchase.status,
          purchasedAt: purchase.purchasedAt,
          expiresAt: purchase.expiresAt,
        },
      };
    }

    // Check expiration (if applicable)
    if (purchase.expiresAt && purchase.expiresAt < new Date()) {
      return {
        hasAccess: false,
        reason: 'expired',
        purchase: {
          id: purchase.id,
          productId: purchase.productId,
          status: purchase.status,
          purchasedAt: purchase.purchasedAt,
          expiresAt: purchase.expiresAt,
        },
      };
    }

    // User has valid access!
    return {
      hasAccess: true,
      purchase: {
        id: purchase.id,
        productId: purchase.productId,
        status: purchase.status,
        purchasedAt: purchase.purchasedAt,
        expiresAt: purchase.expiresAt,
      },
    };
  }

  // User has purchases but none grant access to this track
  return { hasAccess: false, reason: 'no_purchase' };
}

/**
 * Get all tracks a user has access to
 *
 * @param userId - Clerk user ID
 * @returns Array of track slugs the user can access
 */
export async function getAccessibleTracks(userId: string): Promise<string[]> {
  const userPurchases = await db
    .select({
      purchase: purchases,
      product: products,
    })
    .from(purchases)
    .innerJoin(products, eq(purchases.productId, products.id))
    .where(
      and(
        eq(purchases.userId, userId),
        eq(purchases.status, 'active')
      )
    );

  const accessibleTracks = new Set<string>();

  for (const { purchase, product } of userPurchases) {
    // Skip expired purchases
    if (purchase.expiresAt && purchase.expiresAt < new Date()) {
      continue;
    }

    // Add all granted tracks
    const grantedSlugs = (product.grantedTrackSlugs as string[]) || [];
    for (const slug of grantedSlugs) {
      accessibleTracks.add(slug);
    }
  }

  return Array.from(accessibleTracks);
}

/**
 * Check if a user has any active purchases
 *
 * @param userId - Clerk user ID
 * @returns boolean indicating if user has any active purchases
 */
export async function hasAnyPurchase(userId: string): Promise<boolean> {
  const activePurchase = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(
      and(
        eq(purchases.userId, userId),
        eq(purchases.status, 'active')
      )
    )
    .limit(1);

  return activePurchase.length > 0;
}

/**
 * Get a user's purchase for a specific product
 *
 * @param userId - Clerk user ID
 * @param productSlug - Product slug
 * @returns Purchase record or null
 */
export async function getUserPurchaseForProduct(
  userId: string,
  productSlug: string
): Promise<{
  purchase: typeof purchases.$inferSelect;
  product: typeof products.$inferSelect;
} | null> {
  const result = await db
    .select({
      purchase: purchases,
      product: products,
    })
    .from(purchases)
    .innerJoin(products, eq(purchases.productId, products.id))
    .where(
      and(
        eq(purchases.userId, userId),
        eq(products.slug, productSlug)
      )
    )
    .limit(1);

  return result[0] || null;
}
