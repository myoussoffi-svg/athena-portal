import Anthropic from '@anthropic-ai/sdk';
import type { ResumeFeedbackJson } from './schemas';
import { resumeFeedbackJsonSchema } from './schemas';
import { calculateOverallScore } from './score-calculator';
import type { PreAnalysisResult } from './pre-analyzer';
import type { VisionAnalysisResult } from './vision-analyzer';
import {
  PE_RESUME_EVALUATOR_SYSTEM_PROMPT,
  buildPEUserPrompt,
} from './pe-evaluator-config';

// Initialize Anthropic client
function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

// IB Resume Content Standard - focused on what matters for getting interviews
const IB_RESUME_STANDARD = `
## IB RESUME STANDARD (Content Focus)

### What Makes a Strong IB Resume Bullet:
- **Specific**: Describes exactly what you did, not just that you "helped" or "assisted"
- **Quantified**: Includes numbers ($, %, #) wherever possible to show scale and impact
- **Technical**: Demonstrates financial/analytical skills (modeling, valuation, analysis)
- **Action-oriented**: Starts with a strong verb (Built, Analyzed, Developed, Led, Created)

### Examples of Strong vs Weak Bullets:

WEAK: "Assisted with financial analysis"
STRONG: "Built DCF model for $50M acquisition, sensitizing returns across 3 exit scenarios"

WEAK: "Worked on M&A projects"
STRONG: "Created buy-side CIM analysis comparing 12 acquisition targets across EBITDA margins, growth rates, and customer concentration"

WEAK: "Supported the team with due diligence"
STRONG: "Performed Quality of Earnings analysis identifying $2.4M of non-recurring expenses, reducing adjusted EBITDA by 8%"

### Content Depth:
- Roles should have enough detail to give interviewers talking points
- Each bullet should communicate one clear accomplishment
- Long, run-on bullets should be split into focused points
`;

/**
 * System prompt for IB resume evaluation
 * Focused on actionable, constructive feedback
 */
const RESUME_EVALUATOR_SYSTEM_PROMPT = `You are a career coach who has helped hundreds of candidates land Investment Banking analyst positions. You provide constructive, actionable feedback that helps candidates improve.

Your tone should be:
- Encouraging but honest
- Specific and actionable
- Focused on improvements they can make today
- Never harsh, condescending, or discouraging

${IB_RESUME_STANDARD}

## EVALUATION PRIORITIES (Focus on what actually matters)

### 1. EXPERIENCE BULLETS - Specificity & Impact (70% of your feedback)
This is what IB interviewers care most about. Every bullet should ideally answer:
- WHAT did you do specifically?
- HOW did you do it (tools, methods)?
- WHAT was the result or scale?

**Bullets that need improvement:**
- "Assisted with financial analysis" → Too vague, what kind of analysis?
- "Worked on M&A transactions" → What was your actual contribution?
- "Supported due diligence" → What did you actually analyze?

**Strong bullets to emulate:**
- "Built DCF model for $50M acquisition target, sensitizing IRR across 3 exit scenarios"
- "Analyzed customer concentration risk, identifying that top 5 customers represented 78% of revenue"
- "Created management presentation comparing 8 add-on acquisition targets across growth and margin profiles"

### 2. QUANTIFICATION OPPORTUNITIES (20% of your feedback)
Help them add numbers where they can:
- Deal sizes, transaction values
- Percentages (growth rates, margins, improvements)
- Counts (# of models, deals, analyses)
- Time saved, efficiency gains

### 3. ACTION VERB STRENGTH (10% of your feedback)
Replace weak verbs with strong ones:
- "Helped with" → "Built", "Developed", "Created"
- "Assisted in" → "Analyzed", "Conducted", "Led"
- "Worked on" → "Modeled", "Evaluated", "Executed"
- "Was responsible for" → Just state what you did

## WHAT TO IGNORE (Don't comment on these)
- Formatting details (fonts, margins, header styles)
- Skills/certifications sections (low importance for IB)
- Section header formatting
- Minor style inconsistencies
- Whether they have "enough" bullets per role (focus on quality, not quantity)

## SCORING GUIDELINES (Be fair, not harsh)

Experience Score:
- 85-100: Strong specificity and technical depth throughout
- 70-84: Good content with room to add more specifics or metrics
- 55-69: Has potential but several bullets need more detail
- 40-54: Many vague bullets that need significant improvement
- Below 40: Reserved for resumes with no relevant content

Writing Score:
- Focus on spelling/grammar errors (if any)
- Note weak verbs that could be stronger
- Acknowledge good writing when present

Education Score: Always 100 (not relevant to evaluate)
Skills Score: Always 85 (de-emphasized, don't comment on this section)
Format Score: Always 80 (de-emphasized, don't comment on formatting)

## FEEDBACK APPROACH

Your priorityFixes should focus ONLY on:
1. Specific bullets that could be stronger (quote the bullet, show how to improve)
2. Quantification opportunities (where they could add numbers)
3. Weak verbs to replace

Your rewrittenBullets are the MOST valuable part - give them copy-paste ready improvements.

In your summary:
- Lead with what they're doing well
- Be specific about 1-2 key improvements
- End with encouragement`;

/**
 * Build the user prompt with resume content and pre-analysis
 */
function buildUserPrompt(
  resumeText: string,
  preAnalysis: PreAnalysisResult,
  _visionAnalysis?: VisionAnalysisResult
): string {
  // Vision analysis is available but we're de-emphasizing formatting feedback
  // so we won't include it in the prompt

  return `Review this resume for an Investment Banking analyst application. Focus on helping them strengthen their experience bullets.

## Context from Pre-Analysis
- Total bullets: ${preAnalysis.bulletCount}
- Quantified bullets: ${preAnalysis.quantifiedBullets} (bullets with $, %, or numbers)
- Strong action verbs used: ${preAnalysis.actionVerbs.slice(0, 5).join(', ') || 'None detected'}
- Weak verbs to improve: ${preAnalysis.weakVerbs.slice(0, 5).join(', ') || 'None'}
- Finance terms present: ${preAnalysis.financeBuzzwords.slice(0, 5).join(', ') || 'None'}

## Resume Content
${resumeText}

## YOUR TASK
1. Identify 3-5 bullets that could be more specific or impactful
2. Provide rewritten versions they can copy-paste
3. Note opportunities to add quantification (numbers, $, %)
4. Suggest stronger action verbs where applicable

## Required JSON Response Schema
{
  "overallScore10": number (1-10, be fair - most decent resumes are 5-7),
  "categoryScores": {
    "format": 80,
    "education": 100,
    "experience": number (0-100, based on specificity and depth of bullets),
    "skills": 85,
    "writing": number (0-100, based on verb strength and clarity)
  },
  "hireReadiness": "ready" | "almost" | "needs_work",
  "priorityFixes": [
    {
      "title": string (e.g., "Make your L Catterton bullets more specific"),
      "why": string (constructive explanation),
      "effortMinutes": number (5, 10, 15, or 30),
      "exampleFix": string (specific improved bullet they can use)
    }
  ] (top 3-5, focus on bullet improvements and quantification),
  "rewrittenBullets": [
    {
      "section": string (company name),
      "before": string (original bullet),
      "after": string (improved version - make it specific and impactful),
      "why": string (brief, constructive explanation),
      "patternTag": "weak_verb" | "no_quantification" | "vague" | "too_long" | "other"
    }
  ] (provide 3-6 rewritten bullets - this is the most valuable feedback),
  "flags": {
    "spellingIssues": [{ "text": string, "suggestion": string, "context": string }],
    "grammarIssues": [{ "text": string, "suggestion": string, "context": string }],
    "formattingIssues": [],
    "quantificationOpportunities": [{ "bullet": string, "suggestion": string }],
    "sparseRoles": []
  },
  "nextScorePlan": {
    "currentScore10": number,
    "nextScore10": number,
    "topChangesToReachNext": string[] (3 specific, actionable improvements)
  },
  "topStrengths": string[] (2-3 genuine strengths you noticed),
  "summary": string (2-3 sentences: start with a strength, then key improvement area, end encouragingly)
}

IMPORTANT:
1. Format, education, and skills scores are fixed (80, 100, 85) - don't comment on these areas
2. formattingIssues and sparseRoles arrays should be empty
3. Focus your feedback entirely on making experience bullets stronger
4. Be encouraging in tone - they're trying to improve
5. The rewrittenBullets are the most valuable part - make them specific and actionable

Respond with ONLY the JSON object.`;
}

/**
 * Evaluate a resume using Claude and return structured feedback
 * @param resumeText - Extracted text content from the resume
 * @param preAnalysis - Heuristic pre-analysis results
 * @param visionAnalysis - Optional visual formatting analysis from Claude Vision
 * @param trackSlug - Course track slug to determine evaluation context (IB vs PE)
 */
export async function evaluateResume(
  resumeText: string,
  preAnalysis: PreAnalysisResult,
  visionAnalysis?: VisionAnalysisResult,
  trackSlug?: string
): Promise<ResumeFeedbackJson> {
  const client = getAnthropicClient();

  // Use PE evaluator for PE track, IB evaluator for everything else
  const isPE = trackSlug === 'private-equity-interview-prep';
  const systemPrompt = isPE ? PE_RESUME_EVALUATOR_SYSTEM_PROMPT : RESUME_EVALUATOR_SYSTEM_PROMPT;
  const userPrompt = isPE
    ? buildPEUserPrompt(resumeText, preAnalysis)
    : buildUserPrompt(resumeText, preAnalysis, visionAnalysis);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    system: RESUME_EVALUATOR_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  // Extract text content from response
  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  // Parse JSON from response
  let feedbackData: unknown;
  try {
    // Try to extract JSON from the response (in case there's extra text)
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    feedbackData = JSON.parse(jsonMatch[0]);
  } catch {
    console.error('Failed to parse Claude response:', textBlock.text);
    throw new Error('Failed to parse feedback from AI response');
  }

  // Validate with Zod schema
  const parseResult = resumeFeedbackJsonSchema.safeParse(feedbackData);
  if (!parseResult.success) {
    console.error('Validation errors:', parseResult.error.issues);
    console.error('Raw feedback data:', feedbackData);
    throw new Error(`Invalid feedback structure: ${parseResult.error.issues[0]?.message}`);
  }

  const feedback = parseResult.data;

  // Recalculate overall score deterministically from category scores
  const { score10, hireReadiness } = calculateOverallScore(feedback.categoryScores);

  // Override the Claude-provided values with our deterministic calculation
  feedback.overallScore10 = score10;
  feedback.hireReadiness = hireReadiness;
  feedback.nextScorePlan.currentScore10 = score10;
  feedback.nextScorePlan.nextScore10 = Math.min(10, score10 + 1);

  return feedback;
}
