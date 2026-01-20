import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../db';
import { interviewAttempts } from '../db/schema';
import { eq, or } from 'drizzle-orm';

async function main() {
  console.log('Clearing stuck attempts...');
  await db
    .update(interviewAttempts)
    .set({ status: 'abandoned', updatedAt: new Date() })
    .where(or(
      eq(interviewAttempts.status, 'in_progress'),
      eq(interviewAttempts.status, 'processing')
    ));
  console.log('Done!');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
