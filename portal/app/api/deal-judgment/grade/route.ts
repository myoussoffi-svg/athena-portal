import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Anthropic from '@anthropic-ai/sdk';
import { dealJudgmentGradeSchema, dealFeedbackSchema } from '@/lib/deal-judgment/schemas';
import { DEAL_GRADING_SYSTEM_PROMPT, buildGradingPrompt } from '@/lib/deal-judgment/prompts';
import { DEAL_SCENARIOS } from '@/lib/deal-judgment/scenarios';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = dealJudgmentGradeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const scenario = DEAL_SCENARIOS.find(s => s.id === parsed.data.scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: 'Scenario not found' }, { status: 404 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });
    const userPrompt = buildGradingPrompt(scenario, parsed.data.decision, parsed.data.reasoning);

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: DEAL_GRADING_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('');

    // Strip markdown code blocks if present
    const cleaned = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

    const json = JSON.parse(cleaned);
    const validated = dealFeedbackSchema.parse(json);

    return NextResponse.json({ feedback: validated });
  } catch (error) {
    console.error('Deal judgment grading error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
