import Anthropic from '@anthropic-ai/sdk';
import type { ResumeFeedbackJson } from './schemas';
import { resumeFeedbackJsonSchema } from './schemas';
import { calculateOverallScore } from './score-calculator';
import type { PreAnalysisResult } from './pre-analyzer';

// Initialize Anthropic client
function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

/**
 * System prompt for IB resume evaluation
 * Incorporates the detailed rubric from the plan
 */
const RESUME_EVALUATOR_SYSTEM_PROMPT = `You are an expert Investment Banking recruiting evaluator. You review resumes from sophomore and junior college students applying for Investment Banking analyst positions at top banks (Goldman Sachs, Morgan Stanley, JPMorgan, etc.).

Your task is to provide detailed, actionable feedback that will help the candidate improve their resume for IB recruiting.

## MOST IMPORTANT Evaluation Criteria (prioritize these)
1. **Descriptive, specific content** - Every bullet should tell a concrete story with specific details
2. **Quantified achievements** - Numbers, dollar amounts, percentages make bullets compelling
3. **No spelling or grammar mistakes** - Instant disqualifier at top banks
4. **Consistent formatting** - Dates, punctuation, capitalization should be uniform throughout

## Evaluation Categories (Score 0-100 each)

### 1. Writing Quality (35% weight) - MOST IMPORTANT
- No spelling errors (critical - check very carefully)
- No grammar issues
- Concise, impactful language
- Professional tone
- No first-person pronouns (I, my, me)

### 2. Experience Section (30% weight)
- Strong action verbs (Built, Analyzed, Spearheaded, Conducted, Led, Managed)
- Quantified achievements with specific numbers ($, %, #)
- Specific rather than vague descriptions - concrete examples matter
- Each bullet should demonstrate impact and results
- Avoid weak verbs (helped, assisted, worked on, was responsible for)

### 3. Format & Structure (25% weight)
- Clean, professional layout
- Consistent formatting (fonts, spacing, alignment, date formats)
- Clear section headers (Education, Experience, etc.)
- Consistent bullet punctuation (either all with periods or all without)
- NOTE: Do NOT comment on page length - we cannot determine this from text extraction

### 4. Education Section (5% weight) - MINOR
- University name and expected graduation date
- Major/minor clearly stated
- NOTE: Do NOT penalize for GPA - whether displayed or not, GPA should not affect the score

### 5. Skills & Other (5% weight) - MINOR
- NOTE: Technical skills section is a minor factor - do not prioritize as a fix
- NOTE: LinkedIn URL is optional - do not recommend adding it as a priority fix
- Languages are nice to have if multilingual

## Priority Fix Guidelines
When suggesting priorityFixes, focus on:
1. Spelling/grammar errors (highest priority)
2. Vague bullets that need specific details or quantification
3. Weak verbs that should be replaced with strong action verbs
4. Formatting inconsistencies

Do NOT include as priority fixes:
- Adding LinkedIn URL
- Adding technical skills section
- GPA-related suggestions
- Page length concerns

## Scoring Guidelines
- 90-100: Excellent descriptive content, no errors, consistent formatting
- 75-89: Strong content, minor improvements to specificity needed
- 60-74: Good foundation but bullets need more concrete details
- 45-59: Multiple vague bullets, formatting issues, or writing errors
- 0-44: Major gaps in content specificity or numerous errors

## Response Format
Respond ONLY with valid JSON matching the exact schema provided. Do not include any text before or after the JSON.

Key guidelines for feedback:
1. Be specific - reference actual bullets from the resume
2. Be actionable - tell them exactly how to add specific details or quantify
3. Provide rewritten bullets they can copy-paste
4. Focus on making content more specific and impactful
5. Be direct but constructive - this is professional coaching`;

/**
 * Build the user prompt with resume content and pre-analysis
 */
function buildUserPrompt(
  resumeText: string,
  preAnalysis: PreAnalysisResult
): string {
  return `Analyze this resume for Investment Banking analyst applications. Consider the pre-analysis results and provide detailed feedback.

IMPORTANT: This resume was uploaded as a Word document. We cannot determine page count from text extraction, so do NOT comment on page length.

## Pre-Analysis Results
- Email found: ${preAnalysis.hasEmail}
- Sections detected: ${preAnalysis.sectionHeaders.join(', ') || 'None clearly detected'}
- Total bullets: ${preAnalysis.bulletCount}
- Quantified bullets: ${preAnalysis.quantifiedBullets}
- Finance buzzwords found: ${preAnalysis.financeBuzzwords.join(', ') || 'None'}
- Strong action verbs: ${preAnalysis.actionVerbs.join(', ') || 'None'}
- Weak verbs to replace: ${preAnalysis.weakVerbs.join(', ') || 'None'}
- Vague phrases found: ${preAnalysis.vaguePhrases.join(', ') || 'None'}
- First-person pronouns: ${preAnalysis.firstPersonPronouns.join(', ') || 'None'}
- Date formats used: ${preAnalysis.dateFormats.join(', ') || 'Unclear'}
- Bullet punctuation: ${preAnalysis.bulletPunctuation.withPeriod} with period, ${preAnalysis.bulletPunctuation.withoutPeriod} without${preAnalysis.bulletPunctuation.inconsistent ? ' (INCONSISTENT)' : ''}

## Resume Content
${resumeText}

## Required JSON Response Schema
{
  "overallScore10": number (1-10, will be calculated from category scores),
  "categoryScores": {
    "format": number (0-100),
    "education": number (0-100),
    "experience": number (0-100),
    "skills": number (0-100),
    "writing": number (0-100)
  },
  "hireReadiness": "ready" | "almost" | "needs_work",
  "priorityFixes": [
    {
      "title": string (short description),
      "why": string (why this matters for IB recruiting),
      "effortMinutes": number (5, 10, 15, or 30),
      "exampleFix": string (specific example or rewrite)
    }
  ] (top 5 most important fixes),
  "rewrittenBullets": [
    {
      "section": string,
      "before": string (original bullet),
      "after": string (improved version),
      "why": string (brief explanation),
      "patternTag": "weak_verb" | "no_quantification" | "vague" | "too_long" | "grammar" | "other"
    }
  ],
  "flags": {
    "spellingIssues": [{ "text": string, "suggestion": string, "context": string }],
    "grammarIssues": [{ "text": string, "suggestion": string, "context": string }],
    "formattingIssues": [{ "issue": string, "location": string, "fix": string }],
    "quantificationOpportunities": [{ "bullet": string, "suggestion": string }]
  },
  "nextScorePlan": {
    "currentScore10": number,
    "nextScore10": number,
    "topChangesToReachNext": string[] (3-5 specific actions)
  },
  "topStrengths": string[] (2-3 items),
  "summary": string (2-3 sentence overview)
}

Respond with ONLY the JSON object, no other text.`;
}

/**
 * Evaluate a resume using Claude and return structured feedback
 */
export async function evaluateResume(
  resumeText: string,
  preAnalysis: PreAnalysisResult
): Promise<ResumeFeedbackJson> {
  const client = getAnthropicClient();

  const userPrompt = buildUserPrompt(resumeText, preAnalysis);

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
