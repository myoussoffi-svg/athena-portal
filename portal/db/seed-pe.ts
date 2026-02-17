/**
 * Database seed script for PE Interview Simulation
 *
 * Run with: npx tsx db/seed-pe.ts
 *
 * Seeds PE-specific prompt version, evaluator version, and updates activeVersions pointer.
 */

import { config } from 'dotenv';
import { promptVersions, evaluatorVersions, activeVersions } from './schema';

// Load environment variables before importing db (which reads DATABASE_URL)
config({ path: '.env.local' });

const PROMPT_VERSION_ID = '2025-01-pe-v1';
const EVALUATOR_VERSION_ID = '2025-01-pe-v1';

// ─────────────────────────────────────────────────────────────
// PE-SPECIFIC PROMPT DEFINITIONS
// ─────────────────────────────────────────────────────────────

const prompts = [
  // BEHAVIORAL / FIT (4 prompts)
  {
    id: 1,
    type: 'behavioral',
    text: 'Walk me through your most impactful deal.',
    evaluationCriteria: {
      primary: 'Deal selection, structure, personal contribution, investment thinking',
      strongSignals: [
        'Selects a deal with meaningful complexity or outcome',
        'Clear structure: context → role → analysis → outcome',
        'Articulates specific personal contributions',
        'Shows judgment—can explain why decisions were made',
        'Could answer "would you invest?" with conviction',
      ],
      weakSignals: [
        'Vague about personal role or contributions',
        'Just describes process without showing judgment',
        'Cannot explain key deal drivers or decisions',
        'Deal sounds routine or not impactful',
        'Cannot articulate learning or investment perspective',
      ],
    },
  },
  {
    id: 2,
    type: 'behavioral',
    text: 'Why private equity?',
    evaluationCriteria: {
      primary: 'Specificity, understanding of PE vs. banking, self-awareness',
      strongSignals: [
        'Specific reasons tied to ownership, value creation, long-term perspective',
        'Demonstrates understanding of how PE differs from banking',
        'Honest about what draws them to the buyside',
        'Not generic—could not apply to any finance job',
      ],
      weakSignals: [
        "Generic phrases: 'more ownership', 'interested in investing'",
        'No evidence they understand what PE associates do',
        'Could apply the same answer to hedge funds or VC',
        'Sounds like they just want to exit banking',
      ],
    },
  },
  {
    id: 3,
    type: 'behavioral',
    text: 'Tell me about a time you had to make a judgment call with incomplete information.',
    evaluationCriteria: {
      primary: 'Investment judgment, decision-making under uncertainty, ownership',
      strongSignals: [
        'Specific situation with real stakes',
        'Explains how they approached the uncertainty',
        'Made a clear decision and defended it',
        'Shows ownership of the outcome',
      ],
      weakSignals: [
        'Vague or trivial example',
        'Deferred all decisions to seniors',
        'Cannot articulate the tradeoffs considered',
        'No evidence of learning from the experience',
      ],
    },
  },
  {
    id: 4,
    type: 'behavioral',
    text: 'Why this firm specifically?',
    evaluationCriteria: {
      primary: 'Research depth, fit, genuine interest',
      strongSignals: [
        'References specific deals, sectors, or strategy',
        'Connects their background to firm focus',
        'Shows they have done real diligence',
        'Genuine reasons beyond prestige',
      ],
      weakSignals: [
        'Generic praise without specifics',
        'Cannot name deals or differentiate from competitors',
        'Sounds rehearsed or insincere',
        'No connection to their own interests or background',
      ],
    },
  },

  // TECHNICAL - LBO & RETURNS (6 prompts)
  {
    id: 5,
    type: 'technical',
    text: 'Walk me through a paper LBO. A company has $100M EBITDA, you pay 10x, use 5x debt, and EBITDA grows 10% annually for 5 years. Exit at 10x. What\'s the approximate IRR?',
    evaluationCriteria: {
      primary: 'Paper LBO mechanics, mental math, structured approach',
      strongSignals: [
        'Correct entry math: $1B EV, $500M debt, $500M equity',
        'Correct exit math: $161M EBITDA × 10x = $1.61B EV',
        'Debt paydown considered or simplified appropriately',
        'IRR approximation: equity doubles in ~5 years ≈ 15% or slightly higher',
        'Shows structured approach and explains assumptions',
      ],
      weakSignals: [
        'Math errors on entry or exit',
        'Cannot structure the problem',
        'No attempt at mental math or approximation',
        'Confuses IRR and MOIC',
        'Panics or gives up',
      ],
    },
  },
  {
    id: 6,
    type: 'technical',
    text: 'What drives returns in an LBO?',
    evaluationCriteria: {
      primary: 'Value creation levers and their relative importance',
      strongSignals: [
        'Names all four: EBITDA growth, multiple expansion, debt paydown, cash generation',
        'Can explain which typically matters most (EBITDA growth)',
        'Understands how deleveraging amplifies equity returns',
        'Can discuss sensitivity of returns to each driver',
      ],
      weakSignals: [
        'Missing key drivers',
        'Cannot explain why leverage matters',
        'No sense of relative importance',
        'Confuses MOIC and IRR concepts',
      ],
    },
  },
  {
    id: 7,
    type: 'technical',
    text: 'If a deal generates 2.5x MOIC over 5 years, what\'s the approximate IRR?',
    evaluationCriteria: {
      primary: 'IRR-MOIC relationship, mental math',
      strongSignals: [
        'Uses Rule of 72 or doubling logic: 2x in 5 years ≈ 15%',
        '2.5x is between 2x and 3x, so IRR is ~20%',
        'Correct approximation range: 18-22%',
        'Shows understanding that IRR depends on holding period',
      ],
      weakSignals: [
        'No method for approximation',
        'Wildly incorrect answer',
        'Confuses MOIC with IRR',
        'Cannot explain the relationship',
      ],
    },
  },
  {
    id: 8,
    type: 'technical',
    text: 'Walk me through the sources and uses in an LBO.',
    evaluationCriteria: {
      primary: 'Sources and uses mechanics, understanding of deal funding',
      strongSignals: [
        'Uses: Purchase equity + refinance debt + transaction fees + OID',
        'Sources: Sponsor equity + rollover equity + debt tranches + cash on balance sheet',
        'Explains that sources must equal uses',
        'Understands order of priority (debt is cheaper, equity fills the gap)',
      ],
      weakSignals: [
        'Missing key components',
        'Confuses sources and uses',
        'Cannot explain why items appear where they do',
        'No understanding of how the table balances',
      ],
    },
  },
  {
    id: 9,
    type: 'technical',
    text: 'What happens to returns if you increase leverage in an LBO? What are the risks?',
    evaluationCriteria: {
      primary: 'Leverage impact on returns and risk understanding',
      strongSignals: [
        'More leverage = higher returns if deal works (less equity invested)',
        'But also higher risk: more interest burden, covenant risk, less flexibility',
        'Discusses the tradeoff between return amplification and downside risk',
        'May mention debt capacity constraints',
      ],
      weakSignals: [
        'Does not understand leverage amplification',
        'Ignores risk side of equation',
        'Cannot explain why returns increase with leverage',
        'Provides one-dimensional answer',
      ],
    },
  },
  {
    id: 10,
    type: 'technical',
    text: 'What is PIK interest and when would you use it?',
    evaluationCriteria: {
      primary: 'PIK mechanics and strategic use cases',
      strongSignals: [
        'PIK = payment-in-kind, interest accrues to principal instead of cash',
        'Preserves cash for operations or growth',
        'Used in higher-leverage deals or growth situations',
        'Increases debt over time, affects exit debt levels',
        'Understands tradeoff: cash flexibility vs. higher exit debt',
      ],
      weakSignals: [
        'Cannot define PIK',
        'Does not understand cash flow impact',
        'Cannot articulate when it is appropriate',
        'Confuses with other debt structures',
      ],
    },
  },

  // TECHNICAL - CASE STUDY / JUDGMENT (4 prompts)
  {
    id: 11,
    type: 'technical',
    text: 'You\'re evaluating a software company for acquisition. What are the top 3 things you\'d diligence first?',
    evaluationCriteria: {
      primary: 'Investment judgment, prioritization, sector awareness',
      strongSignals: [
        'Prioritizes revenue quality: recurring vs. non-recurring, churn, expansion',
        'Customer concentration and stickiness',
        'Growth drivers and sustainability',
        'May mention unit economics, competitive moat, or management',
        'Shows framework for how they would prioritize',
      ],
      weakSignals: [
        'Generic answers that apply to any company',
        'Cannot prioritize—lists everything',
        'No software-specific insight',
        'Cannot explain why their priorities matter for LBO',
      ],
    },
  },
  {
    id: 12,
    type: 'technical',
    text: 'What makes a good LBO candidate?',
    evaluationCriteria: {
      primary: 'LBO investment criteria, practical judgment',
      strongSignals: [
        'Stable, predictable cash flows',
        'Low capex requirements (high FCF conversion)',
        'Opportunities for operational improvement',
        'Strong market position or competitive moat',
        'May mention: tangible assets, margin expansion potential, add-on opportunities',
      ],
      weakSignals: [
        'Just says "good company" without specifics',
        'Mentions high growth (not typically LBO focus)',
        'Cannot explain why characteristics matter for debt service',
        'No framework for evaluation',
      ],
    },
  },
  {
    id: 13,
    type: 'technical',
    text: 'How would you construct an investment thesis for a PE acquisition?',
    evaluationCriteria: {
      primary: 'Thesis construction, value creation, judgment',
      strongSignals: [
        'Identifies value creation levers specific to the opportunity',
        'Explains why now is the right time to invest',
        'Articulates the exit path and who would buy',
        'Acknowledges key risks and how to mitigate',
        'Structured and conviction-driven',
      ],
      weakSignals: [
        'Generic framework without specifics',
        'Cannot articulate a real thesis',
        'No view on value creation or exit',
        'Ignores risks entirely',
      ],
    },
  },
  {
    id: 14,
    type: 'technical',
    text: 'A company you\'re evaluating has customer concentration: top customer is 25% of revenue. How do you think about this?',
    evaluationCriteria: {
      primary: 'Risk assessment, judgment, mitigation thinking',
      strongSignals: [
        'Acknowledges it is a real risk worth diligencing',
        'Asks follow-ups: contract length, relationship tenure, switching costs',
        'Considers pricing risk, termination scenarios, path to diversification',
        'May factor into valuation or structure (earnouts, price protection)',
        'Balanced view—not dismissive or overly alarmed',
      ],
      weakSignals: [
        'Dismisses the risk without analysis',
        'Cannot articulate how to diligence it',
        'No practical mitigation ideas',
        'Treats all concentration the same regardless of context',
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────
// PE EVALUATOR SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────

const evaluatorSystemPrompt = `You are a senior Private Equity Vice President evaluating a candidate's interview performance. You have conducted hundreds of PE interviews and participate in hiring decisions at a leading middle-market or megafund PE firm.

Your task is to evaluate a transcript of a candidate's recorded interview responses and produce internal feedback—the kind you would submit to a hiring committee after a Superday.

## Your Perspective

You care about:
- Whether this person can think like an investor
- Whether they demonstrate judgment and ownership beyond banking execution
- Whether their technical foundation is strong enough for modeling tests and deal work
- Whether they can articulate investment theses and defend recommendations
- Whether they would represent the firm well in management meetings
- Red flags that would concern you or embarrass the firm

You are:
- Direct and professional
- Focused on investment judgment, not just technical accuracy
- Specific in your observations—cite what the candidate actually said
- Honest about concerns without being dismissive
- Looking for evidence of transition from banking mindset to investor mindset

You are NOT:
- A tutor or coach
- Encouraging or supportive
- Giving advice on how to improve
- Softening your assessment

## Evaluation Dimensions

For each response, consider:

1. Investment Judgment
   - Did they show they can think like an owner?
   - Did they identify what matters most in the analysis?
   - Did they demonstrate conviction and defend their views?

2. Technical Accuracy (for technical prompts)
   - Were mechanics correct (LBO math, returns, structures)?
   - Could they do mental math competently?
   - Did they show depth beyond surface-level knowledge?

3. Deal Experience Translation
   - Did they articulate their banking experience compellingly?
   - Did they show they can extract investment lessons from execution work?
   - Did they demonstrate progression and ownership?

4. Communication & Presence
   - Would they be effective in a management meeting?
   - Were answers structured and concise?
   - Did they project confidence without arrogance?

5. Red Flags
   - Dishonesty or exaggeration about deal involvement
   - Cannot do basic LBO math or paper LBO
   - No evidence of transition from banker to investor thinking
   - Arrogance or dismissiveness
   - Fundamental gaps in preparation

## Thin Segment Handling

If a segment is marked as "thin" (low transcript content relative to duration), note this in your assessment. Evaluate based on available content but flag that the response may have been incomplete, unclear, or too brief.

## Output Format

Your feedback must follow this exact JSON structure:

{
  "promptAssessments": [
    {
      "promptId": 1,
      "promptText": "Walk me through your most impactful deal.",
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
- Behavioral prompts test investment judgment and ownership—not just "story structure."
- Technical prompts test depth and mental math ability—not just whether they know the formula.
- Deal walkthroughs should show investment thinking, not just process description.
- A candidate can have strong technicals but lack investment judgment, or vice versa. Reflect this nuance.
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
  // Dynamic import to ensure env vars are loaded first
  const { db } = await import('./index');

  console.log('Seeding PE interview database...');

  // Insert prompt version
  console.log('Inserting PE prompt version:', PROMPT_VERSION_ID);
  await db
    .insert(promptVersions)
    .values({
      id: PROMPT_VERSION_ID,
      prompts: prompts,
    })
    .onConflictDoNothing();

  // Insert evaluator version
  console.log('Inserting PE evaluator version:', EVALUATOR_VERSION_ID);
  await db
    .insert(evaluatorVersions)
    .values({
      id: EVALUATOR_VERSION_ID,
      systemPrompt: evaluatorSystemPrompt,
      outputSchema: outputSchema,
    })
    .onConflictDoNothing();

  // Insert or update active versions for PE track
  const PE_TRACK_SLUG = 'private-equity-interview-prep';
  console.log('Setting active versions for track:', PE_TRACK_SLUG);
  await db
    .insert(activeVersions)
    .values({
      trackSlug: PE_TRACK_SLUG,
      activePromptVersionId: PROMPT_VERSION_ID,
      activeEvaluatorVersionId: EVALUATOR_VERSION_ID,
      updatedBy: 'seed-pe-script',
    })
    .onConflictDoUpdate({
      target: activeVersions.trackSlug,
      set: {
        activePromptVersionId: PROMPT_VERSION_ID,
        activeEvaluatorVersionId: EVALUATOR_VERSION_ID,
        updatedAt: new Date(),
        updatedBy: 'seed-pe-script',
      },
    });

  console.log('PE seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('PE seed failed:', err);
  process.exit(1);
});
