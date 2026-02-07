import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { outreachContacts, bankEmailFormats } from '@/db/schema';
import { eq, count } from 'drizzle-orm';
import {
  parseName,
  generateEmail,
  normalizeBankName,
  normalizeHeader,
  parseRole,
  parseConnectionType,
  type EmailFormatType,
} from '@/lib/outreach/email-format';
import { MAX_CONTACTS_PER_USER } from '@/lib/outreach/status-machine';
import { logActivity } from '@/lib/outreach/activity-logger';
import type { ImportPreviewRow, ImportPreviewResponse } from '@/lib/outreach/schemas';

// POST /api/outreach/import - Preview import from file data
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, rows: rawRows } = body;

    if (action === 'preview') {
      return handlePreview(rawRows, userId);
    } else if (action === 'confirm') {
      return handleConfirm(rawRows, userId);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in import:', error);
    return NextResponse.json(
      { error: 'Failed to process import' },
      { status: 500 }
    );
  }
}

interface RawRow {
  [key: string]: string | undefined;
}

async function handlePreview(rawRows: RawRow[], userId: string): Promise<NextResponse> {
  if (!Array.isArray(rawRows) || rawRows.length === 0) {
    return NextResponse.json({ error: 'No data provided' }, { status: 400 });
  }

  // Check current contact count
  const [currentCount] = await db
    .select({ count: count() })
    .from(outreachContacts)
    .where(eq(outreachContacts.userId, userId));

  const remainingSlots = MAX_CONTACTS_PER_USER - (currentCount?.count || 0);

  // Get all bank formats for lookup
  const allBanks = await db.select().from(bankEmailFormats);
  const bankLookup = new Map<string, typeof allBanks[0]>();

  for (const bank of allBanks) {
    bankLookup.set(bank.bankNameNormalized, bank);
    // Also index by aliases
    const aliases = bank.aliases as string[] || [];
    for (const alias of aliases) {
      bankLookup.set(normalizeBankName(alias), bank);
    }
  }

  const previewRows: ImportPreviewRow[] = [];
  const banksUnmatched = new Set<string>();
  let banksMatched = 0;

  for (let i = 0; i < rawRows.length; i++) {
    const raw = rawRows[i];
    const errors: string[] = [];
    const warnings: string[] = [];

    // Normalize headers
    const normalized: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      const normalizedKey = normalizeHeader(key);
      normalized[normalizedKey] = (value || '').trim();
    }

    // Extract fields
    let firstName = normalized.firstName || '';
    let lastName = normalized.lastName || '';

    // If we have fullName but not firstName/lastName, parse it
    if (!firstName && !lastName && normalized.fullName) {
      const parsed = parseName(normalized.fullName);
      firstName = parsed.firstName;
      lastName = parsed.lastName;
    }

    // If we have name (generic), parse it
    if (!firstName && !lastName && normalized.name) {
      const parsed = parseName(normalized.name);
      firstName = parsed.firstName;
      lastName = parsed.lastName;
    }

    const bank = normalized.bank || normalized.firm || normalized.company || '';
    const email = normalized.email || '';
    const role = normalized.role || normalized.title || '';
    const linkedinUrl = normalized.linkedinUrl || normalized.linkedin || '';
    const connectionType = normalized.connectionType || normalized.connection || '';
    const notes = normalized.notes || '';

    // Validate required fields
    if (!firstName) errors.push('First name is required');
    if (!lastName) errors.push('Last name is required');
    if (!bank) errors.push('Bank/Company is required');

    // Look up bank format
    const bankNormalized = normalizeBankName(bank);
    const bankInfo = bankLookup.get(bankNormalized);

    let generatedEmail = '';
    let emailConfidence: 'high' | 'medium' | 'low' = 'low';
    let bankMatched = false;

    if (bankInfo && firstName && lastName) {
      generatedEmail = generateEmail(
        firstName,
        lastName,
        bankInfo.domain,
        bankInfo.emailFormat as EmailFormatType
      );
      emailConfidence = bankInfo.isVerified ? 'high' : 'medium';
      bankMatched = true;
      banksMatched++;
    } else if (bank && !bankInfo) {
      banksUnmatched.add(bank);
      warnings.push(`Bank "${bank}" not found in database - email won't be generated`);
    }

    // Use provided email if available
    const finalEmail = email || generatedEmail;

    previewRows.push({
      rowNumber: i + 1,
      firstName,
      lastName,
      bank,
      email: finalEmail,
      role: parseRole(role),
      linkedinUrl,
      connectionType: parseConnectionType(connectionType),
      notes,
      generatedEmail: generatedEmail || null,
      emailConfidence,
      bankMatched,
      errors,
      warnings,
    });
  }

  const validRows = previewRows.filter((r) => r.errors.length === 0).length;
  const errorRows = previewRows.length - validRows;

  // Warn if importing more than available slots
  if (validRows > remainingSlots) {
    return NextResponse.json({
      error: `You can only import ${remainingSlots} more contacts (limit: ${MAX_CONTACTS_PER_USER})`,
      code: 'LIMIT_EXCEEDED',
    }, { status: 400 });
  }

  const response: ImportPreviewResponse = {
    rows: previewRows,
    totalRows: previewRows.length,
    validRows,
    errorRows,
    banksMatched,
    banksUnmatched: Array.from(banksUnmatched),
  };

  return NextResponse.json(response);
}

interface ConfirmRow {
  firstName: string;
  lastName: string;
  bank: string;
  email?: string;
  role?: string;
  linkedinUrl?: string;
  connectionType?: string;
  notes?: string;
  useGeneratedEmail?: boolean;
}

async function handleConfirm(rows: ConfirmRow[], userId: string): Promise<NextResponse> {
  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: 'No data provided' }, { status: 400 });
  }

  // Check current contact count
  const [currentCount] = await db
    .select({ count: count() })
    .from(outreachContacts)
    .where(eq(outreachContacts.userId, userId));

  const remainingSlots = MAX_CONTACTS_PER_USER - (currentCount?.count || 0);

  if (rows.length > remainingSlots) {
    return NextResponse.json({
      error: `You can only import ${remainingSlots} more contacts (limit: ${MAX_CONTACTS_PER_USER})`,
      code: 'LIMIT_EXCEEDED',
    }, { status: 400 });
  }

  // Get bank formats for email generation
  const allBanks = await db.select().from(bankEmailFormats);
  const bankLookup = new Map<string, typeof allBanks[0]>();

  for (const bank of allBanks) {
    bankLookup.set(bank.bankNameNormalized, bank);
    const aliases = bank.aliases as string[] || [];
    for (const alias of aliases) {
      bankLookup.set(normalizeBankName(alias), bank);
    }
  }

  // Generate a batch ID for this import
  const batchId = crypto.randomUUID();

  const insertedContacts: string[] = [];
  const errors: { row: number; error: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    try {
      // Skip rows with missing required fields
      if (!row.firstName || !row.lastName || !row.bank) {
        errors.push({ row: i + 1, error: 'Missing required fields' });
        continue;
      }

      const fullName = `${row.firstName} ${row.lastName}`;

      // Determine email
      let email = row.email || '';
      let emailGenerated = false;

      if (!email && row.useGeneratedEmail !== false) {
        const bankInfo = bankLookup.get(normalizeBankName(row.bank));
        if (bankInfo) {
          email = generateEmail(
            row.firstName,
            row.lastName,
            bankInfo.domain,
            bankInfo.emailFormat as EmailFormatType
          );
          emailGenerated = true;
        }
      }

      // Insert contact
      const [contact] = await db
        .insert(outreachContacts)
        .values({
          userId,
          name: fullName,
          firstName: row.firstName,
          lastName: row.lastName,
          firm: row.bank,
          email: email || null,
          emailGenerated,
          emailVerified: false,
          role: (row.role as 'analyst' | 'associate' | 'vp' | 'director' | 'md' | 'other') || null,
          linkedinUrl: row.linkedinUrl || null,
          connectionType: (row.connectionType as 'alumni' | 'referral' | 'cold' | 'event' | 'other') || null,
          notes: row.notes || null,
          importBatchId: batchId,
          status: 'identified',
        })
        .returning({ id: outreachContacts.id });

      insertedContacts.push(contact.id);

      // Log activity for gamification
      await logActivity(userId, 'contact_added', contact.id);
    } catch (error) {
      console.error(`Error inserting row ${i + 1}:`, error);
      errors.push({ row: i + 1, error: 'Failed to insert' });
    }
  }

  return NextResponse.json({
    success: true,
    imported: insertedContacts.length,
    batchId,
    errors,
  });
}
