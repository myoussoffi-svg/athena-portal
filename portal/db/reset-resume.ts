/**
 * Reset resume feedback submissions
 * Run with: npx tsx db/reset-resume.ts
 */

import { config } from 'dotenv';
import { resumeFeedback } from './schema';
import { eq } from 'drizzle-orm';

config({ path: '.env.local' });

const userIds = [
  'user_38wtsIMBhIPsSbcCL7wmZynP3GO',
  'user_38BifzpCdOTFSWb4yprYBbmhGou',
];

async function reset() {
  const { db } = await import('./index');

  console.log('Resetting resume feedback submissions...\n');

  for (const userId of userIds) {
    const deleted = await db
      .delete(resumeFeedback)
      .where(eq(resumeFeedback.userId, userId))
      .returning();
    console.log(`Deleted ${deleted.length} submissions for ${userId}`);
  }

  console.log('\nDone!');
  process.exit(0);
}

reset().catch((e) => {
  console.error(e);
  process.exit(1);
});
