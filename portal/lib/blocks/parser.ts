/**
 * Block Parser for Athena Lessons
 *
 * Parses special block syntax from markdown content and extracts interactive block definitions.
 *
 * Supported syntax:
 *
 * ```callout:tip
 * Title: Pro Tip
 * This is the callout content.
 * ```
 *
 * ```quiz
 * question: What is the formula for Enterprise Value?
 * options:
 *   - text: Market Cap + Net Debt
 *     correct: true
 *     explanation: Correct! EV = Market Cap + Total Debt - Cash
 *   - text: Market Cap - Net Debt
 *   - text: Market Cap + Cash
 *   - text: EBITDA * Multiple
 * explanation: Enterprise Value represents the total value of a company...
 * ```
 *
 * ```prompt
 * id: reflection-1
 * question: How would you approach a situation where...
 * placeholder: Consider the key stakeholders...
 * ```
 *
 * ```checklist
 * id: pre-meeting
 * title: Pre-Meeting Prep
 * items:
 *   - text: Review the CIM
 *     subtext: Focus on business model and financials
 *   - text: Prepare initial questions
 *   - text: Check comparable transactions
 * ```
 *
 * ```keytakeaways
 * title: Key Takeaways
 * items:
 *   - Always verify assumptions with data
 *   - Consider multiple scenarios
 *   - Document your reasoning
 * ```
 *
 * ```calculation
 * title: Present Value of Uneven Cash Flows
 * given:
 *   - Cash flows: $100, $150, $200 over 3 years
 *   - Discount rate: 8%
 * steps:
 *   - "Year 1: $100 ÷ (1.08)¹ = $92.59"
 *   - "Year 2: $150 ÷ (1.08)² = $128.60"
 *   - "Year 3: $200 ÷ (1.08)³ = $158.77"
 * result: "Total NPV = $379.96"
 * note: Optional additional context or explanation
 * ```
 */

import * as yaml from 'yaml';

/**
 * Pass-through for HTML content.
 * Content comes from trusted markdown files processed by remark,
 * so no sanitization is needed (no user input).
 */
export function sanitizeHtml(html: string): string {
  return html;
}

export type BlockType = 'callout' | 'quiz' | 'prompt' | 'checklist' | 'keytakeaways' | 'calculation';

export interface CalloutBlock {
  type: 'callout';
  variant: 'note' | 'tip' | 'warning' | 'important' | 'success';
  title?: string;
  content: string;
}

export interface QuizOption {
  text: string;
  correct?: boolean;
  explanation?: string;
}

export interface QuizBlock {
  type: 'quiz';
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export interface PromptBlock {
  type: 'prompt';
  id: string;
  question: string;
  placeholder?: string;
  minRows?: number;
}

export interface ChecklistItem {
  text: string;
  subtext?: string;
}

export interface ChecklistBlock {
  type: 'checklist';
  id: string;
  title?: string;
  items: ChecklistItem[];
}

export interface KeyTakeawaysBlock {
  type: 'keytakeaways';
  title?: string;
  items: string[];
}

export interface CalculationBlock {
  type: 'calculation';
  title: string;
  given?: string[];
  steps: string[];
  result: string;
  note?: string;
}

export type Block = CalloutBlock | QuizBlock | PromptBlock | ChecklistBlock | KeyTakeawaysBlock | CalculationBlock;

export interface ContentSegment {
  type: 'html' | 'block';
  content?: string;
  block?: Block;
}

/**
 * Extracts block definitions from markdown content.
 * Returns the markdown with blocks replaced by placeholders, and the extracted blocks.
 */
export function extractBlocks(markdown: string): { cleanMarkdown: string; blocks: Map<string, Block> } {
  const blocks = new Map<string, Block>();
  let blockIndex = 0;

  // Match code blocks with special block types
  const blockPattern = /```(callout(?::\w+)?|quiz|prompt|checklist|keytakeaways|calculation)\n([\s\S]*?)```/g;

  const cleanMarkdown = markdown.replace(blockPattern, (match, blockType: string, content: string) => {
    const block = parseBlock(blockType, content.trim());
    if (block) {
      const placeholder = `<!--ATHENA_BLOCK_${blockIndex}-->`;
      blocks.set(placeholder, block);
      blockIndex++;
      return placeholder;
    }
    return match; // Keep original if parsing fails
  });

  return { cleanMarkdown, blocks };
}

function parseBlock(blockType: string, content: string): Block | null {
  try {
    // Handle callout with variant
    if (blockType.startsWith('callout')) {
      return parseCallout(blockType, content);
    }

    // Parse YAML content for other block types
    const data = yaml.parse(content);

    switch (blockType) {
      case 'quiz':
        return parseQuiz(data);
      case 'prompt':
        return parsePrompt(data);
      case 'checklist':
        return parseChecklist(data);
      case 'keytakeaways':
        return parseKeyTakeaways(data);
      case 'calculation':
        return parseCalculation(data);
      default:
        return null;
    }
  } catch (e) {
    console.error(`Failed to parse block of type ${blockType}:`, e);
    return null;
  }
}

function parseCallout(blockType: string, content: string): CalloutBlock {
  const variantMatch = blockType.match(/callout:(\w+)/);
  const variant = (variantMatch?.[1] as CalloutBlock['variant']) || 'note';

  // Check for title line
  const lines = content.split('\n');
  let title: string | undefined;
  let bodyStart = 0;

  if (lines[0]?.toLowerCase().startsWith('title:')) {
    title = lines[0].slice(6).trim();
    bodyStart = 1;
  }

  const body = lines.slice(bodyStart).join('\n').trim();

  return {
    type: 'callout',
    variant,
    title,
    content: body,
  };
}

function parseQuiz(data: Record<string, unknown>): QuizBlock {
  return {
    type: 'quiz',
    question: String(data.question || ''),
    options: Array.isArray(data.options)
      ? data.options.map((opt: Record<string, unknown>) => ({
          text: String(opt.text || ''),
          correct: Boolean(opt.correct),
          explanation: opt.explanation ? String(opt.explanation) : undefined,
        }))
      : [],
    explanation: data.explanation ? String(data.explanation) : undefined,
  };
}

function parsePrompt(data: Record<string, unknown>): PromptBlock {
  return {
    type: 'prompt',
    id: String(data.id || `prompt-${Date.now()}`),
    question: String(data.question || ''),
    placeholder: data.placeholder ? String(data.placeholder) : undefined,
    minRows: typeof data.minRows === 'number' ? data.minRows : undefined,
  };
}

function parseChecklist(data: Record<string, unknown>): ChecklistBlock {
  return {
    type: 'checklist',
    id: String(data.id || `checklist-${Date.now()}`),
    title: data.title ? String(data.title) : undefined,
    items: Array.isArray(data.items)
      ? data.items.map((item: Record<string, unknown> | string) => {
          if (typeof item === 'string') {
            return { text: item };
          }
          return {
            text: String(item.text || ''),
            subtext: item.subtext ? String(item.subtext) : undefined,
          };
        })
      : [],
  };
}

function parseKeyTakeaways(data: Record<string, unknown>): KeyTakeawaysBlock {
  return {
    type: 'keytakeaways',
    title: data.title ? String(data.title) : undefined,
    items: Array.isArray(data.items) ? data.items.map(String) : [],
  };
}

function parseCalculation(data: Record<string, unknown>): CalculationBlock {
  return {
    type: 'calculation',
    title: String(data.title || 'Calculation'),
    given: Array.isArray(data.given) ? data.given.map(String) : undefined,
    steps: Array.isArray(data.steps) ? data.steps.map(String) : [],
    result: String(data.result || ''),
    note: data.note ? String(data.note) : undefined,
  };
}

/**
 * Splits HTML content with block placeholders into segments.
 * HTML content is sanitized to prevent XSS attacks.
 */
export function segmentContent(html: string, blocks: Map<string, Block>): ContentSegment[] {
  const segments: ContentSegment[] = [];

  // Split by block placeholders
  const parts = html.split(/(<!--ATHENA_BLOCK_\d+-->)/);

  for (const part of parts) {
    if (!part.trim()) continue;

    if (part.startsWith('<!--ATHENA_BLOCK_')) {
      const block = blocks.get(part);
      if (block) {
        segments.push({ type: 'block', block });
      }
    } else {
      // Sanitize HTML content before adding to segments
      segments.push({ type: 'html', content: sanitizeHtml(part) });
    }
  }

  return segments;
}
