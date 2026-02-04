import { config } from 'dotenv';
config({ path: '.env.local' });

async function check() {
  const { db } = await import('./index');
  const { products, purchases } = await import('./schema');
  console.log('Checking database...\n');

  const allProducts = await db.select().from(products);
  console.log('Products:');
  allProducts.forEach(p => {
    console.log(`  - ${p.slug}: ${p.stripePriceId} (active: ${p.isActive})`);
  });

  const allPurchases = await db.select().from(purchases);
  console.log(`\nPurchases: ${allPurchases.length}`);
  allPurchases.forEach(p => {
    console.log(`  - User: ${p.userId}, Status: ${p.status}, Paid: $${(p.amountPaidCents || 0) / 100}`);
  });

  process.exit(0);
}

check().catch(e => {
  console.error(e);
  process.exit(1);
});
