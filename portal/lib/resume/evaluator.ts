import Anthropic from '@anthropic-ai/sdk';
import type { ResumeFeedbackJson } from './schemas';
import { resumeFeedbackJsonSchema } from './schemas';
import { calculateOverallScore } from './score-calculator';
import type { PreAnalysisResult } from './pre-analyzer';
import type { VisionAnalysisResult } from './vision-analyzer';

// Initialize Anthropic client
function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

// Montana Resume Standard - the gold standard for IB resumes
const IB_RESUME_STANDARD = `
## IB RESUME STANDARD (Gold Standard Format)

### Content Density Requirements (CRITICAL)
- Each work experience MUST have 3-5 detailed bullet points minimum
- A role with only 1-2 bullets is ALWAYS flagged as needing more content
- Sub-bullets (○) should be used to show depth and detail on key accomplishments
- Bullets should be specific and detailed, not generic one-liners

### What "Detailed" Means:
- BAD: "Assisted with financial analysis" (vague, no specifics)
- BAD: "Worked on M&A projects" (what did you DO?)
- GOOD: "Built Mini-LBO model to arrive at 80MM purchase price (6x FTM EBITDA) and created an IOI to send to banker"
- GOOD: "Analyzed interest coverage ratio and debt/EBITDA to ensure accordance with LOC covenants during merger"

### Formatting Standard:
- Name: Large, centered, serif font (Times New Roman)
- Contact: Single line with format: City, State | Phone | Email
- Section headers: ALL CAPS, bold, underlined with horizontal rule
- Company: Bold left-aligned, Location right-aligned
- Title: Italics left-aligned, Dates italics right-aligned
- Margins: 0.5-0.7 inches (tight but readable)
`;

/**
 * System prompt for IB resume evaluation
 * Incorporates the detailed rubric and Montana standard
 */
const RESUME_EVALUATOR_SYSTEM_PROMPT = `You are an expert Investment Banking recruiting evaluator with 10+ years of experience at Goldman Sachs and Morgan Stanley. You review resumes from students applying for IB analyst positions.

Your task is to provide CRITICAL, HONEST feedback. Do NOT be lenient - students need to hear what's wrong to improve.

${IB_RESUME_STANDARD}

## CRITICAL EVALUATION CRITERIA (Ranked by Importance)

### 1. CONTENT QUALITY & DEPTH (40% weight)
**Focus on specificity and technical depth.**

**CONTENT DEPTH:**
- If a role seems thin (1-2 bullets), suggest adding more detail to fill space and give interviewers more insight
- Don't mandate a specific number - just note where more detail would help
- Vague, generic bullets should be made specific

### 2. SPECIFICITY - Vague vs Detailed (40% weight)
Every bullet must answer: WHAT did you do? HOW did you do it? WHAT was the result?

**VAGUE (penalize heavily):**
- "Assisted with financial analysis"
- "Worked on M&A transactions"
- "Supported the team with various projects"
- "Participated in due diligence"

**SPECIFIC (this is the standard):**
- "Built Mini-LBO model to arrive at 80MM purchase price (6x FTM EBITDA) and created an IOI to send to banker"
- "Performed Quality of Earnings analysis in due diligence to adjust for bad debt and restructuring expense"
- "Created a 3-statement model for a Potato chip manufacturing company to forecast cash flow for debt repayment"
- "Analyzed interest coverage ratio and debt/EBITDA to ensure accordance with LOC covenants during merger"

### 3. Writing Quality & Bullet Structure (15% weight)
- No spelling errors (critical)
- No grammar issues
- Strong action verbs (Built, Analyzed, Conducted, Created, Developed, Led)
- Avoid weak verbs (helped, assisted, worked on, was responsible for, participated)
- No first-person pronouns

**BULLET STRUCTURE (CRITICAL):**
- Each bullet should communicate ONE clear idea
- Ideal length: 15-25 words per bullet
- If a bullet has multiple semicolons or tries to cover multiple accomplishments, it should be SPLIT
- Use main bullet + sub-bullets (○) for complex achievements

**BAD (run-on, multiple ideas packed together):**
"Led work streams for $140M company; built 13-week cash flow forecast with scenario toggles; Created daily cash model and dynamic budget templates; automated board reporting."

**GOOD (split into clear, focused bullets):**
• Led restructuring work streams for $140M EBITDA resin packaging company
  ○ Built 13-week cash flow forecast with scenario toggles for liquidity optimization
  ○ Developed model as foundation for DIP budget negotiations
• Created daily cash monitoring model and dynamic budget templates
• Automated board reporting package, reducing preparation time by 60%

### 4. Format (5% weight)
- Section headers should be ALL CAPS, bold, underlined
- Company/Title formatting should be consistent
- Dates should be consistently formatted

## SCORING GUIDELINES

Experience Score Guidelines:
- 90-100: Excellent specificity, technical content, quantified results throughout
- 75-89: Good specificity, could add more detail or metrics in places
- 60-74: Some vague content that needs to be made specific
- 45-59: Multiple vague bullets, lacks technical depth
- 0-44: Generic descriptions throughout, no specifics

## PRIORITY FIXES - BE HELPFUL

When suggesting priorityFixes, prioritize:
1. **VAGUE BULLETS** - Generic descriptions that need specifics
2. **BULLET STRUCTURE** - Run-on bullets that should be split into focused points
3. Weak verbs that need replacing
4. Spelling/grammar errors

For roles that could use more detail, suggest:
"Consider adding more detail to [Company Name] to fill space and give interviewers more insight into your work."

## Response Format
Respond ONLY with valid JSON. Be critical and specific in your feedback.

Key guidelines:
1. Call out sparse roles BY NAME - don't be vague about which roles need work
2. Quote the actual weak bullets and show how to improve them
3. Be direct - "This is too vague" not "This could perhaps be improved"
4. If content is thin, say so clearly
5. Provide specific rewritten bullets they can copy-paste`;

/**
 * Build the user prompt with resume content and pre-analysis
 */
function buildUserPrompt(
  resumeText: string,
  preAnalysis: PreAnalysisResult,
  visionAnalysis?: VisionAnalysisResult
): string {
  let visionContext = '';
  if (visionAnalysis) {
    visionContext = `
## Visual Formatting Analysis (from image)
- Overall impression: ${visionAnalysis.overallImpression}
- Header: Name centered: ${visionAnalysis.header.nameCentered}, Contact formatted: ${visionAnalysis.header.contactInfoFormatted}
- Sections: ALL CAPS headers: ${visionAnalysis.sections.headersAreAllCaps}, Underlined: ${visionAnalysis.sections.headersHaveUnderline}
- Typography: Professional font: ${visionAnalysis.typography.fontAppearsProfessional}, Estimated font: ${visionAnalysis.typography.estimatedFont || 'Unknown'}
- Layout: Margins balanced: ${visionAnalysis.layout.marginsAppearBalanced}, Too narrow: ${visionAnalysis.layout.marginsAppearTooNarrow}
- Content density: Rich: ${visionAnalysis.density.appearsContentRich}, Has sub-bullets: ${visionAnalysis.density.hasSubBullets}
- SPARSE ROLES DETECTED: ${visionAnalysis.density.experienceSectionsSparse.length > 0 ? visionAnalysis.density.experienceSectionsSparse.join(', ') : 'None'}
- Critical formatting gaps: ${visionAnalysis.ibStandardComparison.criticalGaps.join('; ') || 'None'}
`;
  }

  return `Analyze this resume for Investment Banking analyst applications. Be CRITICAL and SPECIFIC.

## YOUR PRIMARY TASK
1. Flag vague, generic bullets that lack specific details
2. Identify run-on bullets that should be split into focused points
3. Suggest where more detail could help fill space and provide interviewer insight

## Pre-Analysis Results
- Email found: ${preAnalysis.hasEmail}
- Sections detected: ${preAnalysis.sectionHeaders.join(', ') || 'None clearly detected'}
- Contact on single line: ${preAnalysis.contactOnSingleLine ? 'Yes' : 'Could improve'}
- Total bullets: ${preAnalysis.bulletCount}
- Has sub-bullets: ${preAnalysis.hasSubBullets ? 'Yes' : 'No - consider adding'}
- Quantified bullets: ${preAnalysis.quantifiedBullets}
- Finance buzzwords found: ${preAnalysis.financeBuzzwords.join(', ') || 'None'}
- Strong action verbs: ${preAnalysis.actionVerbs.join(', ') || 'None'}
- Weak verbs to replace: ${preAnalysis.weakVerbs.join(', ') || 'None'}
- Vague phrases found: ${preAnalysis.vaguePhrases.join(', ') || 'None'}
- First-person pronouns: ${preAnalysis.firstPersonPronouns.join(', ') || 'None'}

## ROLES WITH BULLET COUNTS
${preAnalysis.estimatedRolesWithBulletCounts.length > 0
  ? preAnalysis.estimatedRolesWithBulletCounts.map(r =>
      `- ${r.role}: ${r.bulletCount} bullets ${r.bulletCount < 3 ? '(could add more detail)' : ''}`
    ).join('\n')
  : 'Unable to detect roles from text extraction'}

## BULLET STRUCTURE ANALYSIS
- Average bullet length: ${Math.round(preAnalysis.avgBulletLength)} words ${preAnalysis.avgBulletLength > 30 ? '⚠️ TOO VERBOSE' : preAnalysis.avgBulletLength > 25 ? '(slightly long)' : '✓'}
- Verbose/run-on bullets found: ${preAnalysis.verboseBullets.length}
${preAnalysis.verboseBullets.length > 0 ? preAnalysis.verboseBullets.slice(0, 3).map(b =>
  `  ⚠️ [${b.issueType.toUpperCase()}] "${b.bullet}" (${b.wordCount} words)`
).join('\n') : ''}
${visionContext}
## Resume Content
${resumeText}

## SCORING INSTRUCTIONS

**EXPERIENCE SCORE (40% weight) - BE STRICT:**
- Count bullets per company/role
- If ANY role has only 1 bullet: max score is 65
- If ANY role has only 2 bullets: max score is 75
- If bullets are vague/generic: reduce score by 10-20 points
- Only give 85+ if EVERY role has 3+ detailed, specific bullets

**WRITING SCORE (40% weight):**
- Penalize weak verbs (helped, assisted, worked on)
- Penalize vague language
- Check for spelling/grammar

**FORMAT SCORE (15% weight):**
- Check section header formatting (should be ALL CAPS, bold, underlined)
- Check date/location alignment
- Check overall consistency

## Required JSON Response Schema
{
  "overallScore10": number (1-10),
  "categoryScores": {
    "format": number (0-100),
    "education": 100,
    "experience": number (0-100, BE STRICT - see scoring instructions),
    "skills": number (0-100),
    "writing": number (0-100)
  },
  "hireReadiness": "ready" | "almost" | "needs_work",
  "priorityFixes": [
    {
      "title": string (e.g., "Add more bullets to L Catterton"),
      "why": string (e.g., "This role only has 1 bullet - IB resumes need 3-5 per role"),
      "effortMinutes": number (5, 10, 15, or 30),
      "exampleFix": string (specific example bullet to add)
    }
  ] (top 5 - PRIORITIZE SPARSE ROLES FIRST),
  "rewrittenBullets": [
    {
      "section": string (company name),
      "before": string (original bullet),
      "after": string (improved version with specifics),
      "why": string,
      "patternTag": "weak_verb" | "no_quantification" | "vague" | "too_long" | "grammar" | "sparse_section" | "other"
    }
  ],
  "flags": {
    "spellingIssues": [{ "text": string, "suggestion": string, "context": string }],
    "grammarIssues": [{ "text": string, "suggestion": string, "context": string }],
    "formattingIssues": [{ "issue": string, "location": string, "fix": string }],
    "quantificationOpportunities": [{ "bullet": string, "suggestion": string }],
    "sparseRoles": [{ "company": string, "bulletCount": number, "recommendation": string }]
  },
  "nextScorePlan": {
    "currentScore10": number,
    "nextScore10": number,
    "topChangesToReachNext": string[] (3-5 specific actions)
  },
  "topStrengths": string[] (2-3 items),
  "summary": string (2-3 sentences - be direct about what's wrong)
}

CRITICAL:
1. Education score ALWAYS = 100
2. If you see sparse roles (1-2 bullets), the FIRST priorityFix MUST address this
3. Be direct in the summary about content density issues
4. Rewrite vague bullets to show what SPECIFIC looks like

Respond with ONLY the JSON object.`;
}

/**
 * Evaluate a resume using Claude and return structured feedback
 * @param resumeText - Extracted text content from the resume
 * @param preAnalysis - Heuristic pre-analysis results
 * @param visionAnalysis - Optional visual formatting analysis from Claude Vision
 */
export async function evaluateResume(
  resumeText: string,
  preAnalysis: PreAnalysisResult,
  visionAnalysis?: VisionAnalysisResult
): Promise<ResumeFeedbackJson> {
  const client = getAnthropicClient();

  const userPrompt = buildUserPrompt(resumeText, preAnalysis, visionAnalysis);

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
