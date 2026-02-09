/**
 * Sync product price to Stripe
 *
 * Run with: npx tsx db/sync-stripe-price.ts
 */

import { config } from 'dotenv';

// Load environment variables before importing anything else
config({ path: '.env.local' });

async function main() {
  console.log('Syncing IB course price to Stripe...\n');

  // Dynamic import after env is loaded
  const { syncProductToStripe } = await import('../lib/stripe');

  const result = await syncProductToStripe('investment-banking-interview-prep');

  if (result.success) {
    console.log('Success!');
    console.log('  Stripe Product ID:', result.stripeProductId);
    console.log('  Stripe Price ID:', result.stripePriceId);
    console.log('\nThe new price ($250) is now active in Stripe.');
  } else {
    console.error('Failed:', result.error);
  }

  process.exit(result.success ? 0 : 1);
}

main();
