/**
 * Vision-based resume formatting analyzer using Claude Vision
 * Analyzes a screenshot/image of the resume for visual formatting issues
 */

import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

// Schema for vision analysis response
const visionAnalysisSchema = z.object({
  // Overall visual assessment
  overallImpression: z.enum(['excellent', 'good', 'needs_improvement', 'poor']),

  // Header formatting
  header: z.object({
    nameVisible: z.boolean(),
    nameCentered: z.boolean(),
    nameFontSizeAppropriate: z.boolean(),
    contactInfoPresent: z.boolean(),
    contactInfoFormatted: z.boolean(), // Single line with separators
    headerIssues: z.array(z.string()),
  }),

  // Section formatting
  sections: z.object({
    hasVisibleSectionHeaders: z.boolean(),
    headersAreAllCaps: z.boolean(),
    headersAreBold: z.boolean(),
    headersHaveUnderline: z.boolean(),
    sectionSpacingConsistent: z.boolean(),
    sectionIssues: z.array(z.string()),
  }),

  // Typography
  typography: z.object({
    fontAppearsProfessional: z.boolean(),
    fontSizeReadable: z.boolean(),
    fontConsistentThroughout: z.boolean(),
    estimatedFont: z.string().optional(),
    typographyIssues: z.array(z.string()),
  }),

  // Layout and margins
  layout: z.object({
    marginsAppearBalanced: z.boolean(),
    marginsAppearTooNarrow: z.boolean(),
    marginsAppearTooWide: z.boolean(),
    contentFillsPageWell: z.boolean(),
    alignmentConsistent: z.boolean(), // Left dates, right-aligned locations, etc.
    layoutIssues: z.array(z.string()),
  }),

  // Content density (visual assessment)
  density: z.object({
    appearsContentRich: z.boolean(),
    hasBulletPoints: z.boolean(),
    hasSubBullets: z.boolean(),
    bulletsAppearDetailed: z.boolean(),
    experienceSectionsSparse: z.array(z.string()), // Names of roles that look thin
    densityIssues: z.array(z.string()),
  }),

  // Comparison to IB standard
  ibStandardComparison: z.object({
    matchesIBFormat: z.boolean(),
    comparisonNotes: z.string(),
    criticalGaps: z.array(z.string()),
  }),

  // Actionable recommendations
  topRecommendations: z.array(z.object({
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    issue: z.string(),
    fix: z.string(),
  })).max(5),
});

export type VisionAnalysisResult = z.infer<typeof visionAnalysisSchema>;

// The Montana resume formatting standard for reference in the prompt
const FORMATTING_STANDARD_DESCRIPTION = `
IB RESUME FORMATTING STANDARD (Montana Youssoffi Resume):

HEADER:
- Name: Large (18-20pt), centered, serif font (Times New Roman)
- Contact: Single centered line below name with format: "City, State ZIP | Phone | Email"

SECTION HEADERS:
- ALL CAPS, bold, with horizontal underline rule
- Examples: "EDUCATION", "WORK EXPERIENCE & LEADERSHIP EXPERIENCE", "ACTIVITIES & INTERESTS"

EXPERIENCE ENTRIES:
- Line 1: Company Name (bold, left) ... Location (right-aligned)
- Line 2: Title (italics, left) ... Dates (italics, right-aligned)
- Bullets: 3-5+ detailed bullets per role
- Sub-bullets: Use "○" for nested details under main bullets
- Content: Specific, quantified achievements with metrics

EDUCATION:
- School Name (bold, left) ... Location (right)
- Degree (italics, left) ... Graduation Date (italics, right)
- GPA and relevant coursework on separate lines

TYPOGRAPHY:
- Font: Times New Roman or similar professional serif
- Size: 10-11pt for body, larger for name
- Consistent throughout

MARGINS:
- 0.5-0.7 inches on all sides (tight but readable)
- Page should feel full but not cramped

OVERALL:
- Clean, professional, dense with content
- Every role should have substantial detail
- No sparse sections with only 1-2 bullets
`;

/**
 * Analyze a resume image using Claude Vision
 */
export async function analyzeResumeWithVision(
  imageBase64: string,
  imageMediaType: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif'
): Promise<VisionAnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }

  const client = new Anthropic({ apiKey });

  const systemPrompt = `You are an expert Investment Banking resume formatting evaluator. You analyze resume images to assess their visual formatting against top-tier IB standards.

${FORMATTING_STANDARD_DESCRIPTION}

Your task is to carefully examine the resume image and evaluate its formatting against these standards. Be specific and actionable in your feedback.

Focus on VISUAL formatting issues that would be noticed by a recruiter at a glance:
- Is the name prominently displayed and centered?
- Are section headers clearly formatted (ALL CAPS, bold, underlined)?
- Is the typography professional and consistent?
- Are margins appropriate (not too wide or narrow)?
- Does each experience section have enough content (3-5+ bullets)?
- Are there any roles that appear sparse or underdeveloped?

Respond ONLY with valid JSON matching the exact schema provided.`;

  const userPrompt = `Analyze this resume image for formatting and visual presentation. Compare it against IB resume standards.

CRITICAL - LOOK CAREFULLY AT THESE ISSUES:

1. **MARGINS (VERY IMPORTANT):**
   - Are margins too WIDE (wasting space, content doesn't fill page)?
   - Are margins too NARROW (looks cramped)?
   - Ideal: 0.5-0.7 inches - content should fill the page without feeling cramped
   - If you can see significant white space on sides, margins are TOO WIDE

2. **Header:**
   - Is name centered and large?
   - Is contact info on one line with separators (|)?

3. **Section headers:**
   - Are EDUCATION and EXPERIENCE in ALL CAPS, bold, underlined?
   - (Minor sections like Activities don't need to be ALL CAPS)

4. **Content density:**
   - Does each role have 3-5+ bullets?
   - Are any roles visually sparse?

5. **Typography:**
   - Professional serif font (Times New Roman preferred)?
   - Consistent sizing throughout?

Be specific about margin issues - this is often missed but very important for IB resumes.

Respond with JSON only, matching this structure:
{
  "overallImpression": "excellent" | "good" | "needs_improvement" | "poor",
  "header": {
    "nameVisible": boolean,
    "nameCentered": boolean,
    "nameFontSizeAppropriate": boolean,
    "contactInfoPresent": boolean,
    "contactInfoFormatted": boolean,
    "headerIssues": string[]
  },
  "sections": {
    "hasVisibleSectionHeaders": boolean,
    "headersAreAllCaps": boolean,
    "headersAreBold": boolean,
    "headersHaveUnderline": boolean,
    "sectionSpacingConsistent": boolean,
    "sectionIssues": string[]
  },
  "typography": {
    "fontAppearsProfessional": boolean,
    "fontSizeReadable": boolean,
    "fontConsistentThroughout": boolean,
    "estimatedFont": string (optional),
    "typographyIssues": string[]
  },
  "layout": {
    "marginsAppearBalanced": boolean,
    "marginsAppearTooNarrow": boolean,
    "marginsAppearTooWide": boolean,
    "contentFillsPageWell": boolean,
    "alignmentConsistent": boolean,
    "layoutIssues": string[]
  },
  "density": {
    "appearsContentRich": boolean,
    "hasBulletPoints": boolean,
    "hasSubBullets": boolean,
    "bulletsAppearDetailed": boolean,
    "experienceSectionsSparse": string[] (names of roles with too few bullets),
    "densityIssues": string[]
  },
  "ibStandardComparison": {
    "matchesIBFormat": boolean,
    "comparisonNotes": string,
    "criticalGaps": string[]
  },
  "topRecommendations": [
    {
      "priority": "critical" | "high" | "medium" | "low",
      "issue": string,
      "fix": string
    }
  ] (max 5)
}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: imageMediaType,
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: userPrompt,
          },
        ],
      },
    ],
    system: systemPrompt,
  });

  // Extract text content from response
  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude Vision');
  }

  // Parse JSON from response
  let analysisData: unknown;
  try {
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    analysisData = JSON.parse(jsonMatch[0]);
  } catch {
    console.error('Failed to parse Claude Vision response:', textBlock.text);
    throw new Error('Failed to parse formatting analysis from AI response');
  }

  // Validate with Zod schema
  const parseResult = visionAnalysisSchema.safeParse(analysisData);
  if (!parseResult.success) {
    console.error('Validation errors:', parseResult.error.issues);
    console.error('Raw analysis data:', analysisData);
    throw new Error(`Invalid vision analysis structure: ${parseResult.error.issues[0]?.message}`);
  }

  return parseResult.data;
}

/**
 * Convert vision analysis to a format score (0-100)
 */
export function scoreVisionAnalysis(analysis: VisionAnalysisResult): {
  score: number;
  breakdown: {
    header: number;
    sections: number;
    typography: number;
    layout: number;
    density: number;
  };
} {
  // Header score (20 points max)
  let headerScore = 20;
  if (!analysis.header.nameVisible) headerScore -= 10;
  if (!analysis.header.nameCentered) headerScore -= 5;
  if (!analysis.header.contactInfoPresent) headerScore -= 5;
  if (!analysis.header.contactInfoFormatted) headerScore -= 3;
  headerScore -= analysis.header.headerIssues.length * 2;
  headerScore = Math.max(0, headerScore);

  // Sections score (20 points max)
  let sectionsScore = 20;
  if (!analysis.sections.hasVisibleSectionHeaders) sectionsScore -= 10;
  if (!analysis.sections.headersAreAllCaps) sectionsScore -= 3;
  if (!analysis.sections.headersAreBold) sectionsScore -= 3;
  if (!analysis.sections.headersHaveUnderline) sectionsScore -= 2;
  if (!analysis.sections.sectionSpacingConsistent) sectionsScore -= 3;
  sectionsScore -= analysis.sections.sectionIssues.length * 2;
  sectionsScore = Math.max(0, sectionsScore);

  // Typography score (20 points max)
  let typographyScore = 20;
  if (!analysis.typography.fontAppearsProfessional) typographyScore -= 10;
  if (!analysis.typography.fontSizeReadable) typographyScore -= 5;
  if (!analysis.typography.fontConsistentThroughout) typographyScore -= 5;
  typographyScore -= analysis.typography.typographyIssues.length * 2;
  typographyScore = Math.max(0, typographyScore);

  // Layout score (20 points max)
  let layoutScore = 20;
  if (!analysis.layout.marginsAppearBalanced) layoutScore -= 5;
  if (analysis.layout.marginsAppearTooNarrow) layoutScore -= 5;
  if (analysis.layout.marginsAppearTooWide) layoutScore -= 3;
  if (!analysis.layout.contentFillsPageWell) layoutScore -= 5;
  if (!analysis.layout.alignmentConsistent) layoutScore -= 5;
  layoutScore -= analysis.layout.layoutIssues.length * 2;
  layoutScore = Math.max(0, layoutScore);

  // Density score (20 points max) - THIS IS CRITICAL
  let densityScore = 20;
  if (!analysis.density.appearsContentRich) densityScore -= 10;
  if (!analysis.density.hasBulletPoints) densityScore -= 5;
  if (!analysis.density.hasSubBullets) densityScore -= 3;
  if (!analysis.density.bulletsAppearDetailed) densityScore -= 5;
  // Big penalty for sparse sections
  densityScore -= analysis.density.experienceSectionsSparse.length * 5;
  densityScore -= analysis.density.densityIssues.length * 2;
  densityScore = Math.max(0, densityScore);

  const totalScore = headerScore + sectionsScore + typographyScore + layoutScore + densityScore;

  return {
    score: totalScore,
    breakdown: {
      header: headerScore,
      sections: sectionsScore,
      typography: typographyScore,
      layout: layoutScore,
      density: densityScore,
    },
  };
}

/**
 * Generate formatted feedback from vision analysis
 */
export function formatVisionFeedback(analysis: VisionAnalysisResult): {
  formattingIssues: Array<{
    issue: string;
    location: string;
    fix: string;
  }>;
  sparseRoles: string[];
  recommendations: string[];
} {
  const formattingIssues: Array<{ issue: string; location: string; fix: string }> = [];

  // Header issues
  for (const issue of analysis.header.headerIssues) {
    formattingIssues.push({
      issue,
      location: 'Header',
      fix: 'Center name in large font, format contact as: City, State | Phone | Email',
    });
  }

  // Section issues
  for (const issue of analysis.sections.sectionIssues) {
    formattingIssues.push({
      issue,
      location: 'Section Headers',
      fix: 'Use ALL CAPS, bold, with horizontal underline rule',
    });
  }

  // Typography issues
  for (const issue of analysis.typography.typographyIssues) {
    formattingIssues.push({
      issue,
      location: 'Typography',
      fix: 'Use Times New Roman or similar professional serif font consistently',
    });
  }

  // Layout issues
  for (const issue of analysis.layout.layoutIssues) {
    formattingIssues.push({
      issue,
      location: 'Layout/Margins',
      fix: 'Set margins to 0.5-0.7 inches, ensure balanced whitespace',
    });
  }

  // Density issues
  for (const issue of analysis.density.densityIssues) {
    formattingIssues.push({
      issue,
      location: 'Content Density',
      fix: 'Add 3-5 detailed bullets per role with sub-bullets for depth',
    });
  }

  // Recommendations
  const recommendations = analysis.topRecommendations.map(
    (rec) => `[${rec.priority.toUpperCase()}] ${rec.issue}: ${rec.fix}`
  );

  return {
    formattingIssues,
    sparseRoles: analysis.density.experienceSectionsSparse,
    recommendations,
  };
}
