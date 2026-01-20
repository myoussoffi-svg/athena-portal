import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { outreachContacts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import {
  createContactSchema,
  type ContactListResponse,
  type ContactWithMeta,
} from '@/lib/outreach/schemas';
import {
  isFollowUpDue,
  daysSinceDate,
  MAX_CONTACTS_PER_USER,
} from '@/lib/outreach/status-machine';

// GET /api/outreach/contacts - List all contacts for the user
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await db
      .select()
      .from(outreachContacts)
      .where(eq(outreachContacts.userId, userId))
      .orderBy(desc(outreachContacts.updatedAt));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const contactsWithMeta: ContactWithMeta[] = contacts.map((c) => ({
      id: c.id,
      name: c.name,
      firm: c.firm,
      role: c.role,
      email: c.email,
      linkedinUrl: c.linkedinUrl,
      connectionType: c.connectionType,
      connectionNote: c.connectionNote,
      status: c.status,
      lastContactDate: c.lastContactDate?.toISOString() ?? null,
      followUpDue: c.followUpDue?.toISOString() ?? null,
      notes: c.notes,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
      isFollowUpDue: isFollowUpDue(c.followUpDue),
      daysSinceContact: daysSinceDate(c.lastContactDate),
    }));

    const followUpsDue = contactsWithMeta.filter((c) => c.isFollowUpDue).length;

    const response: ContactListResponse = {
      contacts: contactsWithMeta,
      total: contacts.length,
      followUpsDue,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST /api/outreach/contacts - Create a new contact
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check contact limit
    const existingCount = await db
      .select({ id: outreachContacts.id })
      .from(outreachContacts)
      .where(eq(outreachContacts.userId, userId));

    if (existingCount.length >= MAX_CONTACTS_PER_USER) {
      return NextResponse.json(
        {
          error: 'Contact limit reached',
          code: 'LIMIT_REACHED',
          limit: MAX_CONTACTS_PER_USER,
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = createContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const [contact] = await db
      .insert(outreachContacts)
      .values({
        userId,
        name: data.name,
        firm: data.firm,
        role: data.role ?? null,
        email: data.email || null,
        linkedinUrl: data.linkedinUrl || null,
        connectionType: data.connectionType ?? null,
        connectionNote: data.connectionNote ?? null,
        notes: data.notes ?? null,
        status: 'identified',
      })
      .returning();

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
