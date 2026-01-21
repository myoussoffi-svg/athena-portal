'use client';

import { useState, useEffect, useCallback } from 'react';
import { CaseStudyAccordion, type AccordionStep } from './CaseStudyAccordion';
import { safeGetItem, safeSetItem } from '@/lib/storage';

interface CaseStudyContentProps {
  caseStudySlug: string;
  moduleSlug: string;
  content: string;
}

interface ParsedContent {
  intro: string;
  steps: AccordionStep[];
  outro: string;
}

/**
 * Parse case study markdown content to extract accordion steps.
 *
 * Format expected:
 * - Regular markdown before steps (intro)
 * - Steps marked with ```accordion-step code blocks
 * - Regular markdown after steps (outro)
 *
 * Each accordion-step block:
 * ```accordion-step
 * id: step-1
 * stepNumber: 1
 * title: Step Title
 * challenge: |
 *   The challenge text...
 * hint: Optional hint
 * solution: |
 *   The solution text...
 * ```
 */
function parseContent(content: string): ParsedContent {
  // Normalize line endings to \n for consistent parsing
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const steps: AccordionStep[] = [];

  // Regex to find accordion-step blocks
  const blockRegex = /```accordion-step\n([\s\S]*?)```/g;

  let intro = '';
  let outro = '';
  let match;
  let firstMatchStart: number | null = null;
  let lastMatchEnd = 0;

  while ((match = blockRegex.exec(normalizedContent)) !== null) {
    if (firstMatchStart === null) {
      firstMatchStart = match.index;
      intro = normalizedContent.slice(0, firstMatchStart).trim();
    }

    lastMatchEnd = match.index + match[0].length;

    // Parse the YAML-like content
    const blockContent = match[1];
    const step = parseAccordionStep(blockContent);
    if (step) {
      steps.push(step);
    }
  }

  if (lastMatchEnd > 0) {
    outro = normalizedContent.slice(lastMatchEnd).trim();
  } else {
    // No accordion steps found - just return all content as intro
    intro = normalizedContent;
  }

  return { intro, steps, outro };
}

function parseAccordionStep(blockContent: string): AccordionStep | null {
  const lines = blockContent.split('\n');
  const result: Partial<AccordionStep> = {};

  let currentKey: string | null = null;
  let currentValue: string[] = [];
  let isMultiline = false;

  for (const line of lines) {
    // Check for key: value or key: | (multiline start)
    // A key line starts at column 0 (no indentation)
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);

    // If we find a key at column 0, it ends any multiline block
    if (keyMatch) {
      // Save previous key if exists
      if (currentKey && currentValue.length > 0) {
        (result as Record<string, string>)[currentKey] = currentValue.join('\n').trim();
      }

      currentKey = keyMatch[1];
      const value = keyMatch[2].trim();

      if (value === '|') {
        isMultiline = true;
        currentValue = [];
      } else {
        isMultiline = false;
        currentValue = [value];
      }
    } else if (isMultiline && currentKey) {
      // Continue multiline value
      // Remove leading indentation (usually 2 spaces)
      const trimmedLine = line.replace(/^  /, '');
      currentValue.push(trimmedLine);
    }
  }

  // Save last key
  if (currentKey && currentValue.length > 0) {
    (result as Record<string, string>)[currentKey] = currentValue.join('\n').trim();
  }

  // Validate required fields
  if (!result.id || !result.title || !result.challenge || !result.solution) {
    return null;
  }

  return {
    id: result.id as string,
    stepNumber: parseInt(result.stepNumber as unknown as string) || 1,
    title: result.title as string,
    challenge: convertMarkdownToHtml(result.challenge as string),
    solution: convertMarkdownToHtml(result.solution as string),
    hint: result.hint as string | undefined,
  };
}

/**
 * Simple markdown to HTML conversion for inline content.
 * Handles: bold, italic, code, line breaks, paragraphs, lists, tables
 */
function convertMarkdownToHtml(md: string): string {
  if (!md) return '';

  // Split into lines for processing
  const lines = md.split('\n');
  let html = '';
  let inTable = false;
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table handling
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        html += '<table>';
        inTable = true;
      }

      // Skip separator row
      if (line.includes('---')) continue;

      const cells = line.split('|').slice(1, -1);
      const isHeader = i === 0 || (lines[i - 1] && !lines[i - 1].includes('|'));
      const cellTag = isHeader ? 'th' : 'td';

      html += '<tr>';
      for (const cell of cells) {
        html += `<${cellTag}>${processInline(cell.trim())}</${cellTag}>`;
      }
      html += '</tr>';
      continue;
    } else if (inTable) {
      html += '</table>';
      inTable = false;
    }

    // List handling
    const ulMatch = line.match(/^[-*]\s+(.+)$/);
    const olMatch = line.match(/^\d+\.\s+(.+)$/);

    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) html += `</${listType}>`;
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${processInline(ulMatch[1])}</li>`;
      continue;
    } else if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) html += `</${listType}>`;
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${processInline(olMatch[1])}</li>`;
      continue;
    } else if (inList && line.trim() === '') {
      html += `</${listType}>`;
      inList = false;
      listType = null;
      continue;
    } else if (inList) {
      html += `</${listType}>`;
      inList = false;
      listType = null;
    }

    // Empty line = paragraph break
    if (line.trim() === '') {
      continue;
    }

    // Horizontal rule
    if (line.trim().match(/^-{3,}$/) || line.trim().match(/^\*{3,}$/)) {
      html += '<hr />';
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      html += `<h${level}>${processInline(text)}</h${level}>`;
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      let codeContent = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeContent += lines[i] + '\n';
        i++;
      }
      html += `<pre><code>${escapeHtml(codeContent.trim())}</code></pre>`;
      continue;
    }

    // Regular paragraph
    html += `<p>${processInline(line)}</p>`;
  }

  // Close any open tags
  if (inTable) html += '</table>';
  if (inList) html += `</${listType}>`;

  return html;
}

function processInline(text: string): string {
  // Escape HTML first
  text = escapeHtml(text);

  // Bold: **text** or __text__
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');

  // Inline code: `code`
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');

  return text;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function CaseStudyContent({ caseStudySlug, moduleSlug, content }: CaseStudyContentProps) {
  const [parsed, setParsed] = useState<ParsedContent | null>(null);

  useEffect(() => {
    setParsed(parseContent(content));
  }, [content]);

  const handleComplete = useCallback(() => {
    // Mark this case study as complete in localStorage
    const storageKey = `athena-case-studies-${moduleSlug}`;
    const stored = safeGetItem(storageKey);
    let completed: string[] = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          completed = parsed;
        }
      } catch {
        // Ignore parse errors
      }
    }

    if (!completed.includes(caseStudySlug)) {
      completed.push(caseStudySlug);
      safeSetItem(storageKey, JSON.stringify(completed));
    }
  }, [caseStudySlug, moduleSlug]);

  if (!parsed) {
    return null;
  }

  return (
    <>
      <style>{`
        .case-study-content {
          font-size: 15px;
          line-height: 1.7;
          color: #0A0A0A;
        }
        .case-study-intro,
        .case-study-outro {
          margin-bottom: 32px;
        }
        .case-study-intro p,
        .case-study-outro p {
          margin: 0 0 16px;
        }
        .case-study-intro p:last-child,
        .case-study-outro p:last-child {
          margin-bottom: 0;
        }
        .case-study-intro h2,
        .case-study-outro h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 32px 0 16px;
          color: #0A0A0A;
        }
        .case-study-intro h3,
        .case-study-outro h3 {
          font-size: 17px;
          font-weight: 600;
          margin: 24px 0 12px;
          color: #0A0A0A;
        }
        .case-study-intro h4,
        .case-study-outro h4 {
          font-size: 15px;
          font-weight: 600;
          margin: 20px 0 10px;
          color: #0A0A0A;
        }
        .case-study-intro hr,
        .case-study-outro hr {
          border: none;
          border-top: 1px solid rgba(10, 10, 10, 0.1);
          margin: 32px 0;
        }
        .case-study-intro table,
        .case-study-outro table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 14px;
        }
        .case-study-intro th,
        .case-study-intro td,
        .case-study-outro th,
        .case-study-outro td {
          border: 1px solid rgba(10, 10, 10, 0.1);
          padding: 10px 12px;
          text-align: left;
        }
        .case-study-intro th,
        .case-study-outro th {
          background: rgba(10, 10, 10, 0.03);
          font-weight: 600;
        }
        .case-study-intro pre,
        .case-study-outro pre {
          background: rgba(10, 10, 10, 0.04);
          padding: 14px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 16px 0;
        }
        .case-study-intro code,
        .case-study-outro code {
          background: rgba(10, 10, 10, 0.06);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
        }
        .case-study-intro pre code,
        .case-study-outro pre code {
          background: none;
          padding: 0;
        }
        .case-study-intro ul,
        .case-study-intro ol,
        .case-study-outro ul,
        .case-study-outro ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        .case-study-intro li,
        .case-study-outro li {
          margin: 8px 0;
        }
        .case-study-steps {
          margin: 32px 0;
        }
        .case-study-steps-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #416D89;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }
        .case-study-steps-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(65, 109, 137, 0.2) 0%, rgba(65, 109, 137, 0.05) 100%);
        }
      `}</style>

      <div className="case-study-content">
        {/* Intro content - rendered as-is for now (could use react-markdown for full MD support) */}
        {parsed.intro && (
          <div
            className="case-study-intro"
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(parsed.intro) }}
          />
        )}

        {/* Interactive accordion steps */}
        {parsed.steps.length > 0 && (
          <div className="case-study-steps">
            <div className="case-study-steps-label">
              <span>Interactive Walkthrough</span>
              <div className="case-study-steps-line" />
            </div>
            <CaseStudyAccordion
              caseStudySlug={caseStudySlug}
              moduleSlug={moduleSlug}
              steps={parsed.steps}
              onComplete={handleComplete}
            />
          </div>
        )}

        {/* Outro content */}
        {parsed.outro && (
          <div
            className="case-study-outro"
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(parsed.outro) }}
          />
        )}
      </div>
    </>
  );
}
