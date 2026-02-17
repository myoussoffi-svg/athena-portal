/**
 * Seed script for products
 *
 * Run with: npx tsx db/seed-products.ts
 *
 * This creates the initial product entries in the database.
 * After running this, use the Stripe sync to create/link Stripe products.
 */

import { config } from 'dotenv';
import { products } from './schema';
import { eq } from 'drizzle-orm';

// Load environment variables before importing db
config({ path: '.env.local' });

const PRODUCTS = [
  {
    slug: 'investment-banking-interview-prep',
    name: 'Investment Banking Interview Prep',
    description: 'Comprehensive preparation for investment banking analyst interviews. Includes technical questions, behavioral prep, resume feedback, and mock interview practice.',
    priceUsdCents: 25000, // $250.00
    grantedTrackSlugs: ['investment-banking-interview-prep'], // Track slug that this product grants access to
    isActive: true,
  },
  {
    slug: 'private-equity-interview-prep',
    name: 'Private Equity Interview Prep',
    description: 'Rigorous preparation for private equity recruiting. Master LBO modeling under pressure, case study frameworks, investment judgment, and deal walkthroughs to pass PE interviews at top firms.',
    priceUsdCents: 29500, // $295.00
    grantedTrackSlugs: ['private-equity-interview-prep'],
    isActive: true,
  },
];

async function seedProducts() {
  // Dynamic import to ensure env vars are loaded first
  const { db } = await import('./index');

  console.log('Seeding products...\n');

  for (const product of PRODUCTS) {
    // Check if product already exists
    const existing = await db.query.products.findFirst({
      where: eq(products.slug, product.slug),
    });

    if (existing) {
      console.log(`Product "${product.slug}" already exists, updating...`);
      await db
        .update(products)
        .set({
          name: product.name,
          description: product.description,
          priceUsdCents: product.priceUsdCents,
          grantedTrackSlugs: product.grantedTrackSlugs,
          isActive: product.isActive,
          updatedAt: new Date(),
        })
        .where(eq(products.slug, product.slug));
      console.log(`  Updated: ${product.name}`);
    } else {
      console.log(`Creating product "${product.slug}"...`);
      await db.insert(products).values({
        slug: product.slug,
        name: product.name,
        description: product.description,
        priceUsdCents: product.priceUsdCents,
        grantedTrackSlugs: product.grantedTrackSlugs,
        isActive: product.isActive,
      });
      console.log(`  Created: ${product.name}`);
    }

    console.log(`  Price: $${(product.priceUsdCents / 100).toFixed(2)}`);
    console.log(`  Active: ${product.isActive}`);
    console.log(`  Grants access to: ${product.grantedTrackSlugs.join(', ')}`);
    console.log('');
  }

  console.log('Done! Products seeded successfully.\n');
  console.log('Next steps:');
  console.log('1. Run database migration: npm run db:push');
  console.log('2. Set up Stripe environment variables');
  console.log('3. Sync products to Stripe (via admin API or script)');

  process.exit(0);
}

seedProducts().catch((error) => {
  console.error('Error seeding products:', error);
  process.exit(1);
});
