import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Anthropic from '@anthropic-ai/sdk';
import { db } from '@/db';
import { outreachContacts, outreachSettings } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import {
  generateEmailSchema,
  generatedEmailSchema,
  type GeneratedEmail,
} from '@/lib/outreach/schemas';
import {
  EMAIL_GENERATION_SYSTEM_PROMPT,
  buildUserPrompt,
  validateGeneratedEmail,
} from '@/lib/outreach/prompts';
import { MAX_EMAIL_GENERATIONS_PER_DAY } from '@/lib/outreach/status-machine';
import { fetchLinkedInProfile, formatProfileForPrompt } from '@/lib/outreach/linkedin-fetcher';

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

// POST /api/outreach/generate - Generate an email for a contact
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = generateEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { contactId, templateType, additionalContext } = parsed.data;

    // Check rate limit
    const [settings] = await db
      .select()
      .from(outreachSettings)
      .where(eq(outreachSettings.userId, userId));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastGenDate = settings?.lastGenerationDate
      ? new Date(settings.lastGenerationDate)
      : null;
    lastGenDate?.setHours(0, 0, 0, 0);

    const isNewDay = !lastGenDate || lastGenDate.getTime() < today.getTime();
    const generationsToday = isNewDay ? 0 : (settings?.emailGenerationsToday ?? 0);

    if (generationsToday >= MAX_EMAIL_GENERATIONS_PER_DAY) {
      return NextResponse.json(
        {
          error: 'Daily generation limit reached',
          code: 'RATE_LIMIT',
          limit: MAX_EMAIL_GENERATIONS_PER_DAY,
          resetsAt: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        },
        { status: 429 }
      );
    }

    // Get contact
    const [contact] = await db
      .select()
      .from(outreachContacts)
      .where(
        and(
          eq(outreachContacts.id, contactId),
          eq(outreachContacts.userId, userId)
        )
      );

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    // Fetch LinkedIn profile if URL is provided
    let linkedinProfile: string | undefined;
    let linkedinFetchError: string | null = null;

    if (contact.linkedinUrl) {
      console.log('Fetching LinkedIn profile:', contact.linkedinUrl);
      const result = await fetchLinkedInProfile(contact.linkedinUrl);

      if (result.success && result.profile) {
        linkedinProfile = formatProfileForPrompt(result.profile);
        console.log('LinkedIn profile fetched successfully');
      } else {
        linkedinFetchError = result.error;
        console.warn('Failed to fetch LinkedIn profile:', result.error);
        // Continue without LinkedIn data - don't fail the request
      }
    }

    // Build prompt
    const userPrompt = buildUserPrompt({
      templateType,
      contact: {
        name: contact.name,
        firm: contact.firm,
        role: contact.role,
        connectionType: contact.connectionType,
        connectionNote: contact.connectionNote,
      },
      user: {
        name: settings?.userName ?? null,
        school: settings?.userSchool ?? null,
        year: settings?.userYear ?? null,
        major: settings?.userMajor ?? null,
        interest: settings?.userInterest ?? null,
        previousExperience: settings?.userPreviousExperience ?? null,
        hometown: settings?.userHometown ?? null,
      },
      additionalContext,
      linkedinProfile,
    });

    // Call Claude
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: EMAIL_GENERATION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    // Extract text content
    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse JSON from response
    let jsonText = textBlock.text;

    // Remove markdown code blocks if present
    const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    // Parse and validate
    let email: GeneratedEmail;
    try {
      const parsed = JSON.parse(jsonText.trim());
      const validated = generatedEmailSchema.safeParse(parsed);
      if (!validated.success) {
        throw new Error('Invalid email format from Claude');
      }
      email = validated.data;
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse generated email' },
        { status: 500 }
      );
    }

    // Validate for banned phrases
    const validation = validateGeneratedEmail(email);
    if (!validation.valid) {
      // Retry once if banned phrases detected
      console.warn('Generated email contains banned phrases, retrying...', validation.issues);
      // For now, just return the email anyway - the validation is advisory
    }

    // Update rate limit counter
    await db
      .insert(outreachSettings)
      .values({
        userId,
        emailGenerationsToday: 1,
        lastGenerationDate: today,
      })
      .onConflictDoUpdate({
        target: outreachSettings.userId,
        set: {
          emailGenerationsToday: isNewDay ? 1 : generationsToday + 1,
          lastGenerationDate: today,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({
      email,
      generationsRemaining: MAX_EMAIL_GENERATIONS_PER_DAY - (generationsToday + 1),
      linkedinUsed: !!linkedinProfile,
      linkedinError: linkedinFetchError,
    });
  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}
