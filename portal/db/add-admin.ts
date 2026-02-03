/**
 * Add admin user script
 *
 * Run with: npx tsx db/add-admin.ts <clerk_user_id>
 *
 * To find your Clerk user ID:
 * 1. Go to Clerk Dashboard → Users
 * 2. Click on your user
 * 3. Copy the "User ID" (starts with "user_")
 */

import { config } from 'dotenv';
import { interviewViewers } from './schema';
import { eq } from 'drizzle-orm';

// Load environment variables
config({ path: '.env.local' });

async function addAdmin() {
  const userId = process.argv[2];

  if (!userId) {
    console.error('Usage: npx tsx db/add-admin.ts <clerk_user_id>');
    console.error('');
    console.error('To find your Clerk user ID:');
    console.error('1. Go to Clerk Dashboard → Users');
    console.error('2. Click on your user');
    console.error('3. Copy the "User ID" (starts with "user_")');
    process.exit(1);
  }

  if (!userId.startsWith('user_')) {
    console.error('Error: Clerk user IDs start with "user_"');
    console.error(`You provided: ${userId}`);
    process.exit(1);
  }

  const { db } = await import('./index');

  console.log(`Adding admin: ${userId}\n`);

  // Check if already exists
  const existing = await db.query.interviewViewers.findFirst({
    where: eq(interviewViewers.userId, userId),
  });

  if (existing) {
    if (existing.role === 'admin') {
      console.log('User is already an admin.');
    } else {
      // Update to admin
      await db
        .update(interviewViewers)
        .set({ role: 'admin' })
        .where(eq(interviewViewers.userId, userId));
      console.log('Updated user to admin role.');
    }
  } else {
    // Insert new admin (self-assigned for initial setup)
    await db.insert(interviewViewers).values({
      userId,
      role: 'admin',
      addedBy: 'system-setup',
    });
    console.log('Admin user created.');
  }

  console.log('\nDone! You can now access admin features.');
  process.exit(0);
}

addAdmin().catch((error) => {
  console.error('Error adding admin:', error);
  process.exit(1);
});
