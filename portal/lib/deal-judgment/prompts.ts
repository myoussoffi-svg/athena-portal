import type { DealTeaser } from './scenarios';

export const DEAL_GRADING_SYSTEM_PROMPT = `You are a senior PE partner evaluating a junior candidate's investment judgment during an interview. You have been presented with an investment teaser, and the candidate has made an invest/pass decision with written reasoning.

Grade their response based on:
1. Decision quality — did they reach the right conclusion?
2. Thesis quality — is their reasoning structured, specific, and well-supported?
3. Risk identification — did they identify the key risks?
4. Red flag detection — did they catch the deal-breakers (if any)?

You must respond with valid JSON matching this exact structure (no markdown, no code blocks, just raw JSON):
{
  "overallGrade": "A" | "B" | "C" | "D" | "F",
  "decisionCorrect": true | false,
  "thesisQuality": 0-100,
  "riskIdentification": 0-100,
  "redFlagDetection": 0-100,
  "commentary": "2-3 paragraphs of specific feedback on their reasoning",
  "strengthsIdentified": ["What they got right (2-4 items)"],
  "missedPoints": ["What they missed or got wrong (2-4 items)"]
}

Grading rubric:
- A (90-100): Correct decision with well-structured thesis covering key risks and red flags
- B (75-89): Correct decision with reasonable thesis but missing some important points
- C (60-74): Either wrong decision with good reasoning, or right decision with weak reasoning
- D (40-59): Wrong decision with incomplete reasoning
- F (0-39): Fundamentally misunderstood the opportunity

Be fair but rigorous. A strong candidate demonstrates PE judgment: they think about entry price vs. risk, return drivers, and what could go wrong. Generic answers score low.`;

export function buildGradingPrompt(
  scenario: DealTeaser,
  decision: 'invest' | 'pass',
  reasoning: string
): string {
  return `## Investment Teaser: ${scenario.codename}
Industry: ${scenario.industry}

Company Overview:
${scenario.teaser.companyOverview}

Financials:
- Revenue: ${scenario.teaser.financials.revenue}
- EBITDA: ${scenario.teaser.financials.ebitda}
- EBITDA Margin: ${scenario.teaser.financials.ebitdaMargin}
- Revenue Growth: ${scenario.teaser.financials.revenueGrowth}
${scenario.teaser.financials.additionalMetrics?.map(m => `- ${m}`).join('\n') || ''}

Deal Terms: ${scenario.teaser.dealTerms}

Key Considerations:
${scenario.teaser.keyConsiderations.map(c => `- ${c}`).join('\n')}

---

## Hidden Context (for grading only — candidate did not see this):
Correct decision: ${scenario.hiddenContext.correctDecision.toUpperCase()}
Key risks: ${scenario.hiddenContext.keyRisks.join('; ')}
Red flags: ${scenario.hiddenContext.redFlags.length > 0 ? scenario.hiddenContext.redFlags.join('; ') : 'None'}
Strong thesis points: ${scenario.hiddenContext.strongThesisPoints.join('; ')}

---

## Candidate's Response:
Decision: ${decision.toUpperCase()}
Reasoning: ${reasoning}

---

Grade this candidate's response.`;
}
