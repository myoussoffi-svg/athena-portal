import Anthropic from '@anthropic-ai/sdk';
import type { Feedback, Prompt } from './interview/types';

// Initialize Anthropic client
function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

// Segment with transcript for evaluation
interface TranscribedSegment {
  promptId: number;
  startTimeSeconds: number;
  endTimeSeconds: number;
  transcriptText: string;
}

// Prompt with evaluation criteria from the prompt version
interface PromptWithCriteria {
  id: number;
  type: 'behavioral' | 'technical';
  text: string;
  evaluationCriteria: {
    primary: string;
    strongSignals: string[];
    weakSignals: string[];
  };
}

/**
 * Format the interview transcript for Claude evaluation.
 * Creates a structured prompt with each question and response.
 */
function formatTranscriptForEvaluation(
  segments: TranscribedSegment[],
  prompts: PromptWithCriteria[]
): string {
  const promptMap = new Map(prompts.map((p) => [p.id, p]));

  let formatted = '# Interview Transcript\n\n';

  for (const segment of segments) {
    const prompt = promptMap.get(segment.promptId);
    if (!prompt) continue;

    const durationSec = (segment.endTimeSeconds - segment.startTimeSeconds) / 1000;
    const wordCount = segment.transcriptText.split(/\s+/).filter(Boolean).length;
    const isThin = wordCount < 20 && durationSec > 30;

    formatted += `## Question ${segment.promptId}: ${prompt.text}\n`;
    formatted += `**Type:** ${prompt.type}\n`;
    formatted += `**Duration:** ${durationSec.toFixed(1)} seconds\n`;
    if (isThin) {
      formatted += `**Note:** This segment appears thin (${wordCount} words in ${durationSec.toFixed(0)}s)\n`;
    }
    formatted += `\n**Candidate Response:**\n${segment.transcriptText}\n\n`;
    formatted += `**Evaluation Criteria:**\n`;
    formatted += `- Primary: ${prompt.evaluationCriteria.primary}\n`;
    formatted += `- Strong signals: ${prompt.evaluationCriteria.strongSignals.join('; ')}\n`;
    formatted += `- Weak signals: ${prompt.evaluationCriteria.weakSignals.join('; ')}\n`;
    formatted += '\n---\n\n';
  }

  return formatted;
}

/**
 * Evaluate an interview transcript using Claude.
 *
 * @param segments - Transcribed segments with timing and text
 * @param prompts - Prompt definitions with evaluation criteria
 * @param systemPrompt - The evaluator system prompt from evaluatorVersions
 * @returns Structured feedback matching the Feedback type
 */
export async function evaluateInterview(
  segments: TranscribedSegment[],
  prompts: PromptWithCriteria[],
  systemPrompt: string
): Promise<Feedback> {
  const client = getAnthropicClient();

  const transcriptContent = formatTranscriptForEvaluation(segments, prompts);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Please evaluate the following interview transcript and provide your assessment in JSON format.\n\n${transcriptContent}`,
      },
    ],
  });

  // Extract text content from response
  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  // Parse JSON from response - Claude may wrap it in markdown code blocks
  let jsonText = textBlock.text;

  // Remove markdown code blocks if present
  const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }

  // Parse and validate the response
  const feedback = JSON.parse(jsonText.trim()) as Feedback;

  // Basic validation
  if (!feedback.promptAssessments || !Array.isArray(feedback.promptAssessments)) {
    throw new Error('Invalid feedback: missing promptAssessments array');
  }
  if (!feedback.overallAssessment || typeof feedback.overallAssessment !== 'string') {
    throw new Error('Invalid feedback: missing overallAssessment');
  }
  if (!['hire', 'borderline', 'no_hire'].includes(feedback.hireInclination)) {
    throw new Error(`Invalid feedback: invalid hireInclination "${feedback.hireInclination}"`);
  }

  // Ensure arrays exist
  feedback.strengthsSummary = feedback.strengthsSummary || [];
  feedback.concernsSummary = feedback.concernsSummary || [];
  feedback.followUpQuestions = feedback.followUpQuestions || [];

  return feedback;
}

/**
 * Type guard to convert database prompt to typed prompt
 */
export function asPromptWithCriteria(prompt: Prompt): PromptWithCriteria {
  return prompt as PromptWithCriteria;
}
