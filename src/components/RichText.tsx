import { Fragment, type ReactNode } from 'react';
import { INLINE_PATTERN } from '@/lib/richTextMarkup';

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let index = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${index++}`;
    if (match[1] !== undefined) {
      nodes.push(<strong key={key}>{parseInline(match[1], key)}</strong>);
    } else {
      nodes.push(
        <span key={key} style={{ color: match[2] }}>
          {parseInline(match[3], key)}
        </span>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

interface RichTextProps {
  text: string;
  className?: string;
}

export const RichText = ({ text, className }: RichTextProps) => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, pIndex) => {
        const lines = paragraph.split('\n');
        return (
          <p key={pIndex} className={pIndex > 0 ? 'mt-4' : undefined}>
            {lines.map((line, lIndex) => (
              <Fragment key={lIndex}>
                {parseInline(line, `p${pIndex}-l${lIndex}`)}
                {lIndex < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};
