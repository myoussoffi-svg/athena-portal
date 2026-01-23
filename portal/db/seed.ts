/**
 * Database seed script for Interview Simulation
 *
 * Run with: npx tsx db/seed.ts
 *
 * Seeds initial prompt version, evaluator version, and activeVersions pointer.
 */

import { config } from 'dotenv';
import { promptVersions, evaluatorVersions, activeVersions } from './schema';

// Load environment variables before importing db (which reads DATABASE_URL)
config({ path: '.env.local' });

// Dynamic import to ensure env vars are loaded first
const { db } = await import('./index');

const PROMPT_VERSION_ID = '2025-01-v1';
const EVALUATOR_VERSION_ID = '2025-01-v1';

// ─────────────────────────────────────────────────────────────
// PROMPT DEFINITIONS
// ─────────────────────────────────────────────────────────────

const prompts = [
  // BEHAVIORAL (4 prompts)
  {
    id: 1,
    type: 'behavioral',
    text: 'Walk me through your resume.',
    evaluationCriteria: {
      primary: 'Chronological structure, narrative flow, prioritization of relevant experience',
      strongSignals: [
        'Clear chronological progression',
        'Connects each step with logical reasoning',
        'Emphasizes most relevant experience',
        'Concise—does not dwell on irrelevant details',
      ],
      weakSignals: [
        'Non-chronological or confusing structure',
        'Excessive time on irrelevant experience',
        'No clear throughline or narrative',
        'Rambling without self-editing',
      ],
    },
  },
  {
    id: 2,
    type: 'behavioral',
    text: 'Why investment banking?',
    evaluationCriteria: {
      primary: 'Specificity, understanding of the role, self-awareness',
      strongSignals: [
        'Specific reasons tied to deal work and the analyst role',
        'Demonstrates understanding of what the job actually entails',
        'Honest about tradeoffs considered',
        'Not generic—could not apply to any other job',
      ],
      weakSignals: [
        "Generic phrases: 'fast-paced', 'learn a lot', 'challenging'",
        'No evidence they understand what analysts do',
        'Could apply the same answer to consulting, PE, or any other job',
        'Defensive when the answer is thin',
      ],
    },
  },
  {
    id: 3,
    type: 'behavioral',
    text: 'Tell me about a time you worked on a team to complete a difficult project. What was your role and what was the outcome?',
    evaluationCriteria: {
      primary: 'Teamwork, ownership, clarity of personal contribution',
      strongSignals: [
        'Specific situation with clear context',
        'Clearly articulates their personal role vs. team effort',
        'Honest about challenges faced',
        'Concrete outcome with their contribution evident',
      ],
      weakSignals: [
        'Vague or generic story',
        'Unclear what they personally did',
        'Takes credit for team effort without specificity',
        'Deflects responsibility for difficulties',
      ],
    },
  },
  {
    id: 4,
    type: 'behavioral',
    text: 'Tell me about a time you made a mistake or faced a setback. How did you handle it?',
    evaluationCriteria: {
      primary: 'Self-awareness, accountability, learning orientation',
      strongSignals: [
        'Honest acknowledgment of a real mistake',
        'Takes responsibility without deflecting',
        'Explains what they learned and how they changed',
        'Demonstrates growth',
      ],
      weakSignals: [
        'Gives a fake weakness or trivial example',
        'Deflects blame to others or circumstances',
        'No evidence of learning or growth',
        'Defensive or dismissive of the mistake',
      ],
    },
  },

  // TECHNICAL (10 prompts)
  {
    id: 5,
    type: 'technical',
    text: 'Walk me through how you get from revenue to unlevered free cash flow, step by step.',
    evaluationCriteria: {
      primary: 'Precise step-by-step mechanics from revenue through UFCF',
      strongSignals: [
        'Correct sequence: Revenue → COGS → Gross Profit → SG&A → EBITDA → D&A → EBIT → Tax → NOPAT → Add back D&A → Subtract CapEx → Adjust for NWC',
        'Explains each step, not just lists',
        'Correct treatment of NWC (increase = use of cash)',
        'Understands why we add back D&A after taxing',
      ],
      weakSignals: [
        'Skips steps or gets sequence wrong',
        'Confuses levered vs. unlevered cash flow',
        'Wrong direction on NWC adjustment',
        'Cannot explain why steps are taken',
      ],
    },
  },
  {
    id: 6,
    type: 'technical',
    text: 'Once you have projected unlevered free cash flows, how do you discount them to present value? What discount rate do you use, and why?',
    evaluationCriteria: {
      primary: 'Discounting mechanics and rationale for WACC',
      strongSignals: [
        'Discount each year\'s cash flow by (1 + WACC)^n',
        'Uses WACC because cash flows are unlevered (available to all capital providers)',
        'Understands mid-year convention if mentioned',
        'Can explain why not cost of equity',
      ],
      weakSignals: [
        'Uses cost of equity for unlevered cash flows',
        'Cannot explain why WACC is appropriate',
        'Mechanics of discounting are unclear',
        'Confuses discount rate selection',
      ],
    },
  },
  {
    id: 7,
    type: 'technical',
    text: 'What are the two methods for calculating terminal value? When would you use one versus the other?',
    evaluationCriteria: {
      primary: 'Perpetuity growth method vs. exit multiple method, and judgment on when to use each',
      strongSignals: [
        'Correctly identifies: Gordon Growth (perpetuity) and Exit Multiple',
        'Gordon Growth: FCF × (1+g) / (WACC - g)',
        'Exit Multiple: Terminal EBITDA × Multiple',
        'Judgment: Gordon Growth for stable mature businesses; Exit Multiple when comparables are reliable',
      ],
      weakSignals: [
        'Cannot name both methods',
        'Wrong formula for perpetuity growth',
        'No judgment on when to use each',
        'Confuses the two methods',
      ],
    },
  },
  {
    id: 8,
    type: 'technical',
    text: 'What is a reasonable range for a terminal growth rate? What happens to your valuation if you set it too high?',
    evaluationCriteria: {
      primary: 'Understanding of terminal growth constraints and sensitivity',
      strongSignals: [
        'Reasonable range: 2-3%, should not exceed long-term GDP/inflation',
        'If too high: valuation explodes, especially as g approaches WACC',
        'Understands this is a key sensitivity in any DCF',
        'May mention that growth > WACC breaks the formula',
      ],
      weakSignals: [
        'Suggests unreasonably high growth rates (5%+)',
        'Does not understand the sensitivity',
        'Cannot explain why high g is problematic',
        'No awareness of the mathematical constraint',
      ],
    },
  },
  {
    id: 9,
    type: 'technical',
    text: 'Walk me through the components of WACC. How do you calculate the cost of equity?',
    evaluationCriteria: {
      primary: 'WACC components and CAPM for cost of equity',
      strongSignals: [
        'WACC = (E/V × Re) + (D/V × Rd × (1-T))',
        'Cost of equity via CAPM: Rf + β × (Rm - Rf)',
        'Understands each component: risk-free rate, beta, market risk premium',
        'Knows why debt is tax-adjusted',
      ],
      weakSignals: [
        'Missing components or wrong formula',
        'Cannot articulate CAPM',
        'Does not know why debt is tax-adjusted',
        'Confuses cost of equity with cost of debt',
      ],
    },
  },
  {
    id: 10,
    type: 'technical',
    text: 'What is beta and what does it measure? How would you find beta for a private company?',
    evaluationCriteria: {
      primary: 'Beta definition and unlevering/relevering for private companies',
      strongSignals: [
        'Beta measures systematic risk / sensitivity to market movements',
        'For private company: find comparable public companies, unlever their betas, average, relever for target\'s capital structure',
        'Understands levered vs. unlevered beta',
        'May mention Hamada equation or similar',
      ],
      weakSignals: [
        'Vague definition of beta',
        'Does not know how to estimate for private company',
        'Confuses levered and unlevered beta',
        "Suggests just 'looking it up' with no process",
      ],
    },
  },
  {
    id: 11,
    type: 'technical',
    text: 'What is the difference between enterprise value and equity value? Walk me through the bridge from one to the other.',
    evaluationCriteria: {
      primary: 'EV vs. Equity Value distinction and bridge',
      strongSignals: [
        'EV = value of core operations, available to all capital providers',
        'Equity Value = value available to equity holders only',
        'Bridge: EV = Equity Value + Debt + Preferred + Minority Interest - Cash',
        'Or: Equity Value = EV - Debt - Preferred - Minority Interest + Cash',
        'Understands why each item is added/subtracted',
      ],
      weakSignals: [
        'Confuses EV and Equity Value',
        'Incomplete bridge (missing items)',
        'Wrong direction on cash or debt',
        'Cannot explain why items are added/subtracted',
      ],
    },
  },
  {
    id: 12,
    type: 'technical',
    text: 'When calculating enterprise value, why do we add debt and subtract cash?',
    evaluationCriteria: {
      primary: 'Intuition behind EV bridge adjustments',
      strongSignals: [
        "Add debt: acquirer assumes the debt, so it's part of the 'true' purchase price",
        'Subtract cash: acquirer gets the cash, offsets purchase price',
        "EV represents what you'd pay for the operating business",
        "May frame as: 'EV is what a buyer actually pays net of cash acquired'",
      ],
      weakSignals: [
        'Cannot explain the intuition',
        'Just states the formula without understanding',
        'Reverses the logic',
        'Confused about what EV represents',
      ],
    },
  },
  {
    id: 13,
    type: 'technical',
    text: 'If depreciation increases by $10, walk me through the impact on all three financial statements. Assume a 25% tax rate.',
    evaluationCriteria: {
      primary: 'Three-statement linkage with correct tax impact',
      strongSignals: [
        'Income Statement: Operating income down $10, tax savings of $2.50 (10 × 25%), net income down $7.50',
        'Cash Flow Statement: Net income down $7.50, add back D&A $10, net cash from operations up $2.50',
        'Balance Sheet: PP&E down $10, cash up $2.50, retained earnings down $7.50 → balances',
        'Clear step-by-step walkthrough',
      ],
      weakSignals: [
        'Wrong tax calculation',
        'Forgets to add back depreciation on CFS',
        "Balance sheet doesn't balance",
        'Cannot trace through all three statements',
      ],
    },
  },
  {
    id: 14,
    type: 'technical',
    text: 'What is the difference between cash flow from operations and free cash flow? When would they differ significantly?',
    evaluationCriteria: {
      primary: 'CFO vs. FCF distinction and drivers of difference',
      strongSignals: [
        'CFO = cash generated from operating activities (from cash flow statement)',
        'FCF = CFO - CapEx (and sometimes other adjustments)',
        'They differ significantly when CapEx is high (capital-intensive businesses)',
        'May mention: companies can have positive CFO but negative FCF if investing heavily',
      ],
      weakSignals: [
        'Confuses the two',
        'Does not know that CapEx is the key difference',
        "Cannot give an example of when they'd differ",
        'Vague or incorrect definitions',
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────
// EVALUATOR SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────

const evaluatorSystemPrompt = `You are a senior investment banking Vice President evaluating a candidate's interview performance. You have conducted hundreds of interviews and participate in hiring decisions at a top-tier investment bank.

Your task is to evaluate a transcript of a candidate's recorded interview responses and produce internal feedback—the kind you would submit to a hiring committee after a Superday.

## Your Perspective

You care about:
- Whether you would staff this person on a live deal
- Whether they can hold a conversation with a client
- Whether they demonstrate the judgment and ownership expected of a junior banker
- Whether their technical foundation is solid enough to trust their work product
- Red flags that would concern you or embarrass the firm

You are:
- Direct and professional
- Neutral in tone—not encouraging, not harsh
- Specific in your observations—cite what the candidate actually said
- Honest about concerns without being dismissive

You are NOT:
- A tutor or coach
- Encouraging or supportive
- Giving advice on how to improve
- Softening your assessment

## Evaluation Dimensions

For each response, consider:

1. Structure & Organization
   - Did the answer have a clear beginning, middle, and end?
   - Did the candidate prioritize effectively?
   - Was there a logical flow?

2. Technical Accuracy (for technical prompts)
   - Were mechanics correct?
   - Were linkages between concepts accurate?
   - Did the candidate demonstrate understanding or just recitation?

3. Judgment & Prioritization
   - Did the candidate identify what matters most?
   - Were their choices defensible?
   - Did they demonstrate commercial awareness?

4. Seniority / Ownership Signal
   - Did the candidate take responsibility?
   - Did they communicate like someone who could be client-facing?
   - Did they show initiative in how they framed answers?

5. Communication Clarity
   - Was the response concise and direct?
   - Was the level of detail appropriate?
   - Could this person explain something to a client or senior banker?

6. Red Flags
   - Dishonesty or exaggeration
   - Arrogance without substance
   - Inability to acknowledge uncertainty
   - Fundamental gaps in preparation
   - Panic or disorganization that didn't recover

## Thin Segment Handling

If a segment is marked as "thin" (low transcript content relative to duration), note this in your assessment. Evaluate based on available content but flag that the response may have been incomplete, unclear, or too brief.

## Output Format

Your feedback must follow this exact JSON structure:

{
  "promptAssessments": [
    {
      "promptId": 1,
      "promptText": "Walk me through your resume.",
      "observations": "2-4 sentences describing specifically what the candidate said and how they structured their response.",
      "strengths": "1-2 specific strengths, or null if weak throughout",
      "concerns": "1-2 specific concerns, or null if strong throughout"
    }
  ],
  "overallAssessment": "2-3 sentences summarizing performance as if briefing a colleague.",
  "strengthsSummary": ["3-5 specific strengths observed across the interview"],
  "concernsSummary": ["3-5 specific concerns or gaps"],
  "followUpQuestions": ["2-4 questions a subsequent interviewer should probe"],
  "hireInclination": "hire | borderline | no_hire",
  "hireRationale": "2-3 sentences explaining the inclination"
}

## Important Guidelines

- Be specific. Reference what the candidate actually said. Avoid generic feedback.
- Behavioral prompts test narrative, structure, self-awareness, and judgment—not just "content."
- Technical prompts test precision and understanding—not just whether they mentioned the right terms.
- A candidate can have strong technicals but weak behavioral presence, or vice versa. Reflect this nuance.
- "Borderline" is a legitimate assessment. Use it when the candidate showed potential but raised enough concerns that you would want another interviewer's read.
- Do not provide coaching, advice, or suggestions for improvement. This is assessment, not instruction.`;

// ─────────────────────────────────────────────────────────────
// OUTPUT SCHEMA
// ─────────────────────────────────────────────────────────────

const outputSchema = {
  type: 'object',
  required: [
    'promptAssessments',
    'overallAssessment',
    'strengthsSummary',
    'concernsSummary',
    'followUpQuestions',
    'hireInclination',
    'hireRationale',
  ],
  properties: {
    promptAssessments: {
      type: 'array',
      items: {
        type: 'object',
        required: ['promptId', 'promptText', 'observations'],
        properties: {
          promptId: { type: 'number' },
          promptText: { type: 'string' },
          observations: { type: 'string' },
          strengths: { type: ['string', 'null'] },
          concerns: { type: ['string', 'null'] },
        },
      },
    },
    overallAssessment: { type: 'string' },
    strengthsSummary: { type: 'array', items: { type: 'string' } },
    concernsSummary: { type: 'array', items: { type: 'string' } },
    followUpQuestions: { type: 'array', items: { type: 'string' } },
    hireInclination: { type: 'string', enum: ['hire', 'borderline', 'no_hire'] },
    hireRationale: { type: 'string' },
  },
};

// ─────────────────────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding database...');

  // Insert prompt version
  console.log('Inserting prompt version:', PROMPT_VERSION_ID);
  await db
    .insert(promptVersions)
    .values({
      id: PROMPT_VERSION_ID,
      prompts: prompts,
    })
    .onConflictDoNothing();

  // Insert evaluator version
  console.log('Inserting evaluator version:', EVALUATOR_VERSION_ID);
  await db
    .insert(evaluatorVersions)
    .values({
      id: EVALUATOR_VERSION_ID,
      systemPrompt: evaluatorSystemPrompt,
      outputSchema: outputSchema,
    })
    .onConflictDoNothing();

  // Insert or update active versions pointer
  console.log('Setting active versions...');
  await db
    .insert(activeVersions)
    .values({
      id: 1,
      activePromptVersionId: PROMPT_VERSION_ID,
      activeEvaluatorVersionId: EVALUATOR_VERSION_ID,
      updatedBy: 'seed-script',
    })
    .onConflictDoUpdate({
      target: activeVersions.id,
      set: {
        activePromptVersionId: PROMPT_VERSION_ID,
        activeEvaluatorVersionId: EVALUATOR_VERSION_ID,
        updatedAt: new Date(),
        updatedBy: 'seed-script',
      },
    });

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
