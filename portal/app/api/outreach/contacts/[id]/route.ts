import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { outreachContacts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { updateContactSchema } from '@/lib/outreach/schemas';
import {
  canTransitionTo,
  calculateFollowUpDue,
  type OutreachStatus,
} from '@/lib/outreach/status-machine';
import { logActivity } from '@/lib/outreach/activity-logger';

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/outreach/contacts/[id] - Get a single contact
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const [contact] = await db
      .select()
      .from(outreachContacts)
      .where(
        and(eq(outreachContacts.id, id), eq(outreachContacts.userId, userId))
      );

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

// PATCH /api/outreach/contacts/[id] - Update a contact
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Get current contact
    const [existing] = await db
      .select()
      .from(outreachContacts)
      .where(
        and(eq(outreachContacts.id, id), eq(outreachContacts.userId, userId))
      );

    if (!existing) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Validate status transition
    if (data.status && data.status !== existing.status) {
      if (!canTransitionTo(existing.status, data.status as OutreachStatus)) {
        return NextResponse.json(
          {
            error: 'Invalid status transition',
            code: 'INVALID_TRANSITION',
            currentStatus: existing.status,
            requestedStatus: data.status,
          },
          { status: 400 }
        );
      }
    }

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.firm !== undefined) updateData.firm = data.firm;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.email !== undefined) updateData.email = data.email || null;
    if (data.linkedinUrl !== undefined) updateData.linkedinUrl = data.linkedinUrl || null;
    if (data.connectionType !== undefined) updateData.connectionType = data.connectionType;
    if (data.connectionNote !== undefined) updateData.connectionNote = data.connectionNote;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.status !== undefined) updateData.status = data.status;

    // Handle lastContactDate
    if (data.lastContactDate !== undefined) {
      updateData.lastContactDate = data.lastContactDate
        ? new Date(data.lastContactDate)
        : null;
    }

    // Handle followUpDue - can be explicit or auto-calculated
    if (data.followUpDue !== undefined) {
      updateData.followUpDue = data.followUpDue
        ? new Date(data.followUpDue)
        : null;
    } else if (data.status !== undefined || data.lastContactDate !== undefined) {
      // Auto-calculate follow-up if status or lastContactDate changed
      const newStatus = (data.status as OutreachStatus) ?? existing.status;
      const newLastContact = data.lastContactDate
        ? new Date(data.lastContactDate)
        : existing.lastContactDate;
      updateData.followUpDue = calculateFollowUpDue(newStatus, newLastContact);
    }

    const [updated] = await db
      .update(outreachContacts)
      .set(updateData)
      .where(
        and(eq(outreachContacts.id, id), eq(outreachContacts.userId, userId))
      )
      .returning();

    // Log activity for gamification based on status change
    if (data.status && data.status !== existing.status) {
      switch (data.status) {
        case 'contacted':
          await logActivity(userId, 'email_sent', id);
          break;
        case 'responded':
          await logActivity(userId, 'response_received', id);
          break;
        case 'scheduled':
          await logActivity(userId, 'call_scheduled', id);
          break;
        case 'spoke':
          await logActivity(userId, 'call_completed', id);
          break;
        case 'advocate':
          await logActivity(userId, 'became_advocate', id);
          break;
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE /api/outreach/contacts/[id] - Delete a contact
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const result = await db
      .delete(outreachContacts)
      .where(
        and(eq(outreachContacts.id, id), eq(outreachContacts.userId, userId))
      )
      .returning({ id: outreachContacts.id });

    if (result.length === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
