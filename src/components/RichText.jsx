import CodeBlock from './CodeBlock';
import { parseBlocks } from '../utils/richTextParse';

// Renders the Markdown subset the AI endpoints are instructed to emit:
// fenced code blocks, inline code, **bold**, headings, and lists.
// Parsing lives in src/utils/richTextParse.js.

function InlineText({ text }) {
  const parts = [];
  const regex = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\s][^*\n]*\*)/g;
  let last = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('`')) {
      parts.push(
        <code key={key++} className="font-mono text-[0.85em] bg-coffee-100 text-coffee-800 px-1 py-0.5 rounded">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**')) {
      parts.push(<strong key={key++} className="font-semibold text-ink">{token.slice(2, -2)}</strong>);
    } else {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function RichText({ text }) {
  const blocks = parseBlocks(text);

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        if (block.type === 'code') {
          return (
            <div key={i} className="[&_.code-block]:my-0">
              <CodeBlock
                code={block.code}
                language={block.lang || 'text'}
                showLineNumbers={false}
              />
            </div>
          );
        }
        if (block.type === 'rule') {
          return <hr key={i} className="border-coffee-200" />;
        }
        if (block.type === 'table') {
          return (
            <div key={i} className="space-y-1">
              {block.rows.map((row, j) => (
                <p key={j} className="leading-relaxed">
                  <InlineText text={row} />
                </p>
              ))}
            </div>
          );
        }
        if (block.type === 'heading') {
          const sizeClass = block.level <= 1 ? 'text-lg' : block.level === 2 ? 'text-base' : 'text-sm';
          return (
            <p key={i} className={`font-display font-bold text-ink pt-1 ${sizeClass}`}>
              <InlineText text={block.text} />
            </p>
          );
        }
        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul';
          return (
            <Tag
              key={i}
              start={block.ordered && block.start !== 1 ? block.start : undefined}
              className={`space-y-1.5 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
            >
              {block.items.map((item, j) => {
                const ChildTag = item.children?.[0]?.ordered ? 'ol' : 'ul';
                return (
                  <li key={j} className="leading-relaxed">
                    <InlineText text={item.text} />
                    {item.children?.length > 0 && (
                      <ChildTag className={`mt-1.5 space-y-1.5 pl-5 ${item.children[0].ordered ? 'list-decimal' : 'list-disc'}`}>
                        {item.children.map((c, k) => (
                          <li key={k} className="leading-relaxed">
                            <InlineText text={c.text} />
                          </li>
                        ))}
                      </ChildTag>
                    )}
                  </li>
                );
              })}
            </Tag>
          );
        }
        return (
          <p key={i} className="leading-relaxed whitespace-pre-wrap">
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
