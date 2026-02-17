/**
 * Grant free access to a user
 * Run with: npx tsx db/grant-access.ts <email-or-userId> <product-slug>
 */

import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { db } = await import('./index');
  const { products, purchases } = await import('./schema');
  const { eq, and } = await import('drizzle-orm');

  const userIdOrEmail = process.argv[2];
  const productSlug = process.argv[3] || 'private-equity-interview-prep';

  if (!userIdOrEmail) {
    // List recent users from purchases table
    console.log('Usage: npx tsx db/grant-access.ts <userId> <product-slug>');
    console.log('\nLooking for existing users in purchases...\n');
    
    const existingPurchases = await db.query.purchases.findMany({
      limit: 10,
      orderBy: (p, { desc }) => [desc(p.purchasedAt)],
    });
    
    if (existingPurchases.length > 0) {
      console.log('Recent user IDs:');
      const uniqueUsers = [...new Set(existingPurchases.map(p => p.userId))];
      uniqueUsers.forEach(u => console.log(`  - ${u}`));
    } else {
      console.log('No existing purchases found.');
      console.log('\nTo find your Clerk user ID:');
      console.log('1. Sign in to the app');
      console.log('2. Check browser dev tools > Application > Cookies > __clerk_db_jwt');
      console.log('3. Or check Clerk dashboard');
    }
    process.exit(0);
  }

  // Get product
  const product = await db.query.products.findFirst({
    where: eq(products.slug, productSlug),
  });

  if (!product) {
    console.error(`Product not found: ${productSlug}`);
    process.exit(1);
  }

  // Check if already has access
  const existing = await db.query.purchases.findFirst({
    where: and(
      eq(purchases.userId, userIdOrEmail),
      eq(purchases.productId, product.id),
      eq(purchases.status, 'active')
    ),
  });

  if (existing) {
    console.log('User already has access to this product.');
    process.exit(0);
  }

  // Grant access
  await db.insert(purchases).values({
    userId: userIdOrEmail,
    productId: product.id,
    amountPaidCents: 0,
    status: 'active',
    purchasedAt: new Date(),
  });

  console.log(`✓ Granted free access to ${productSlug} for user ${userIdOrEmail}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
