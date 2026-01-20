'use client';

import { ContentSegment } from '@/lib/blocks';
import { Callout } from './Callout';
import { Quiz } from './Quiz';
import { Prompt } from './Prompt';
import { Checklist } from './Checklist';
import { KeyTakeaways } from './KeyTakeaways';

interface LessonContentProps {
  segments: ContentSegment[];
  className?: string;
}

export function LessonContent({ segments, className }: LessonContentProps) {
  return (
    <article className={className}>
      {segments.map((segment, idx) => {
        if (segment.type === 'html' && segment.content) {
          return (
            <div
              key={idx}
              dangerouslySetInnerHTML={{ __html: segment.content }}
            />
          );
        }

        if (segment.type === 'block' && segment.block) {
          return <BlockRenderer key={idx} block={segment.block} />;
        }

        return null;
      })}
    </article>
  );
}

interface BlockRendererProps {
  block: ContentSegment['block'];
}

function BlockRenderer({ block }: BlockRendererProps) {
  if (!block) return null;

  switch (block.type) {
    case 'callout':
      return (
        <Callout variant={block.variant} title={block.title}>
          {block.content}
        </Callout>
      );

    case 'quiz':
      return (
        <Quiz
          question={block.question}
          options={block.options}
          explanation={block.explanation}
        />
      );

    case 'prompt':
      return (
        <Prompt
          id={block.id}
          question={block.question}
          placeholder={block.placeholder}
          minRows={block.minRows}
        />
      );

    case 'checklist':
      return (
        <Checklist
          id={block.id}
          title={block.title}
          items={block.items}
        />
      );

    case 'keytakeaways':
      return (
        <KeyTakeaways
          title={block.title}
          items={block.items}
        />
      );

    default:
      return null;
  }
}
