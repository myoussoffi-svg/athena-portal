import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { waitlist } from '@/db/schema';
import { sendWaitlistNotificationEmail } from '@/lib/email';
import { z } from 'zod';

const WaitlistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  trackSlug: z.string().min(1, 'trackSlug is required'),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, trackSlug } = parsed.data;

  try {
    const normalizedEmail = email.toLowerCase();
    const inserted = await db
      .insert(waitlist)
      .values({ name, email: normalizedEmail, trackSlug })
      .onConflictDoNothing({
        target: [waitlist.email, waitlist.trackSlug],
      })
      .returning({ id: waitlist.id });

    if (inserted.length > 0) {
      try {
        const notify = await sendWaitlistNotificationEmail({
          name,
          email: normalizedEmail,
          trackSlug,
        });
        if (!notify.success) {
          console.error('Waitlist notification email failed:', notify.error);
        }
      } catch (notifyError) {
        // Never let notification failures break a successful signup
        console.error('Waitlist notification threw:', notifyError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to add to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
