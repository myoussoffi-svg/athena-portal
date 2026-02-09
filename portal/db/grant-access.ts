/**
 * Grant access to a user
 *
 * Run with: npx tsx db/grant-access.ts <userId>
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

const userId = process.argv[2];

if (!userId) {
  console.error('Usage: npx tsx db/grant-access.ts <userId>');
  process.exit(1);
}

async function grant() {
  const { db } = await import('./index');
  const { products, purchases } = await import('./schema');
  const { eq } = await import('drizzle-orm');

  // Get product
  const product = await db.query.products.findFirst({
    where: eq(products.slug, 'investment-banking-interview-prep')
  });

  if (!product) {
    console.error('Product not found');
    process.exit(1);
  }

  console.log('Product:', product.name, '- ID:', product.id);

  // Check if already has access
  const existing = await db.query.purchases.findFirst({
    where: (p, { and, eq }) => and(
      eq(p.userId, userId),
      eq(p.productId, product.id),
      eq(p.status, 'active')
    )
  });

  if (existing) {
    console.log('User already has access!');
    process.exit(0);
  }

  // Insert purchase
  const [newPurchase] = await db.insert(purchases).values({
    userId: userId,
    productId: product.id,
    amountPaidCents: 25000,
    status: 'active',
    purchasedAt: new Date(),
  }).returning();

  console.log('Access granted!');
  console.log('  User:', userId);
  console.log('  Purchase ID:', newPurchase.id);

  process.exit(0);
}

grant().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
