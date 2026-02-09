import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server';

// Maximum concurrent sessions allowed per user
const MAX_SESSIONS = 2;

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  // Handle the event
  const eventType = evt.type;

  if (eventType === 'session.created') {
    const { user_id } = evt.data;

    if (user_id) {
      try {
        await enforceSessionLimit(user_id);
      } catch (error) {
        console.error('Error enforcing session limit:', error);
        // Don't fail the webhook - log and continue
      }
    }
  }

  return new Response('OK', { status: 200 });
}

async function enforceSessionLimit(userId: string) {
  const client = await clerkClient();

  // Get all active sessions for this user
  const sessionsResponse = await client.sessions.getSessionList({
    userId,
    status: 'active',
  });

  const sessions = sessionsResponse.data;

  if (sessions.length <= MAX_SESSIONS) {
    return; // Within limit, nothing to do
  }

  // Sort by creation time (oldest first)
  const sortedSessions = sessions.sort((a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Revoke oldest sessions, keeping only MAX_SESSIONS newest
  const sessionsToRevoke = sortedSessions.slice(0, sessions.length - MAX_SESSIONS);

  for (const session of sessionsToRevoke) {
    try {
      await client.sessions.revokeSession(session.id);
      console.log(`Revoked session ${session.id} for user ${userId} (exceeded limit)`);
    } catch (error) {
      console.error(`Failed to revoke session ${session.id}:`, error);
    }
  }

  console.log(`Enforced session limit for user ${userId}: revoked ${sessionsToRevoke.length} session(s), kept ${MAX_SESSIONS}`);
}
