/**
 * Admin Grant Access API
 *
 * Grants free access to a product for admin/testing purposes.
 * Restricted to admin users only.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { products, purchases, interviewViewers } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

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
    const { productSlug, targetUserId } = body;

    if (!productSlug) {
      return NextResponse.json(
        { error: 'productSlug is required' },
        { status: 400 }
      );
    }

    // Use targetUserId if provided (for admin granting to others), otherwise grant to self
    const userToGrant = targetUserId || userId;

    // Get product
    const product = await db.query.products.findFirst({
      where: eq(products.slug, productSlug),
    });

    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${productSlug}` },
        { status: 404 }
      );
    }

    // Check if user already has access
    const existing = await db.query.purchases.findFirst({
      where: and(
        eq(purchases.userId, userToGrant),
        eq(purchases.productId, product.id),
        eq(purchases.status, 'active')
      ),
    });

    if (existing) {
      return NextResponse.json(
        { error: 'User already has access to this product', purchaseId: existing.id },
        { status: 409 }
      );
    }

    // Create purchase record with $0 amount
    const [newPurchase] = await db
      .insert(purchases)
      .values({
        userId: userToGrant,
        productId: product.id,
        amountPaidCents: 0,
        status: 'active',
        purchasedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: `Access granted to ${product.name}`,
      purchaseId: newPurchase.id,
      userId: userToGrant,
    });
  } catch (error) {
    console.error('Grant access error:', error);
    return NextResponse.json(
      { error: 'Failed to grant access' },
      { status: 500 }
    );
  }
}
