import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { bankEmailFormats } from '@/db/schema';
import { eq, ilike, or, sql } from 'drizzle-orm';
import { normalizeBankName } from '@/lib/outreach/email-format';

// GET /api/outreach/banks - List all banks or lookup specific bank
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (name) {
      // Lookup specific bank by name
      const normalized = normalizeBankName(name);

      // Try exact match first
      let [bank] = await db
        .select()
        .from(bankEmailFormats)
        .where(eq(bankEmailFormats.bankNameNormalized, normalized));

      // If no exact match, try fuzzy match
      if (!bank) {
        [bank] = await db
          .select()
          .from(bankEmailFormats)
          .where(
            or(
              ilike(bankEmailFormats.bankName, `%${name}%`),
              sql`${bankEmailFormats.aliases}::jsonb @> ${JSON.stringify([name])}::jsonb`
            )
          )
          .limit(1);
      }

      if (!bank) {
        return NextResponse.json({ found: false, bank: null });
      }

      return NextResponse.json({
        found: true,
        bank: {
          id: bank.id,
          name: bank.bankName,
          format: bank.emailFormat,
          domain: bank.domain,
          isVerified: bank.isVerified,
        },
      });
    }

    // List all banks
    const banks = await db
      .select({
        id: bankEmailFormats.id,
        name: bankEmailFormats.bankName,
        format: bankEmailFormats.emailFormat,
        domain: bankEmailFormats.domain,
        isVerified: bankEmailFormats.isVerified,
      })
      .from(bankEmailFormats)
      .orderBy(bankEmailFormats.bankName);

    return NextResponse.json({ banks });
  } catch (error) {
    console.error('Error fetching banks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banks' },
      { status: 500 }
    );
  }
}
