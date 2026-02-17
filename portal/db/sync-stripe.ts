/**
 * Sync products to Stripe
 * Run with: npx tsx db/sync-stripe.ts
 */

import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables FIRST
config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  // Dynamic import after env vars loaded
  const { syncProductToStripe } = await import('../lib/stripe');

  const productSlugs = [
    'investment-banking-interview-prep',
    'private-equity-interview-prep',
  ];

  for (const slug of productSlugs) {
    console.log(`Syncing ${slug} to Stripe...`);
    const result = await syncProductToStripe(slug);

    if (result.success) {
      console.log(`  ✓ Product ID: ${result.stripeProductId}`);
      console.log(`  ✓ Price ID: ${result.stripePriceId}`);
    } else {
      console.log(`  ✗ Error: ${result.error}`);
    }
    console.log('');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
