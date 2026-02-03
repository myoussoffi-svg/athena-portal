/**
 * Update Stripe IDs for products
 *
 * Run with: npx tsx db/update-stripe-ids.ts
 */

import { config } from 'dotenv';
import { products } from './schema';
import { eq } from 'drizzle-orm';

// Load environment variables before importing db
config({ path: '.env.local' });

const STRIPE_IDS = {
  'investment-banking-interview-prep': {
    stripePriceId: 'price_1Sv2CsJyd4dNOvqA2cGXM22E',
    priceUsdCents: 26500, // $265.00
  },
};

async function updateStripeIds() {
  const { db } = await import('./index');

  console.log('Updating Stripe IDs...\n');

  for (const [slug, data] of Object.entries(STRIPE_IDS)) {
    console.log(`Updating ${slug}...`);

    await db
      .update(products)
      .set({
        stripePriceId: data.stripePriceId,
        priceUsdCents: data.priceUsdCents,
        updatedAt: new Date(),
      })
      .where(eq(products.slug, slug));

    console.log(`  Price ID: ${data.stripePriceId}`);
    console.log(`  Price: $${(data.priceUsdCents / 100).toFixed(2)}`);
    console.log('');
  }

  console.log('Done!');
  process.exit(0);
}

updateStripeIds().catch((error) => {
  console.error('Error updating Stripe IDs:', error);
  process.exit(1);
});
