import CodeBlock from './CodeBlock';

// Renders the Markdown subset the AI endpoints are instructed to emit:
// fenced code blocks, inline code, **bold**, headings, and lists. The model
// doesn't always obey, so common strays (*italics*, --- rules, table rows)
// degrade gracefully instead of showing raw markup.

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

const isRuleLine = (l) => /^\s*([-*_])\s*(\1\s*){2,}$/.test(l);
const isTableLine = (l) => /^\s*\|.*\|\s*$/.test(l);
const isTableSeparator = (l) => /^\s*\|[\s\-:|]+\|\s*$/.test(l);

function parseBlocks(text) {
  const lines = (text || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    const fence = line.match(/^```\s*(\w*)\s*$/);
    if (fence) {
      const lang = fence[1].toLowerCase();
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence (or run past EOF on unterminated fences)
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    // Heading — keep the level so #/##/### render at distinct sizes.
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      i++;
      continue;
    }

    // Horizontal rule (---, ***, ___) — the model emits these despite
    // instructions; show a subtle divider instead of raw dashes.
    if (isRuleLine(line)) {
      blocks.push({ type: 'rule' });
      i++;
      continue;
    }

    // Table rows — flatten each row to a text line (cells joined by " — ")
    // since the app deliberately doesn't render tables.
    if (isTableLine(line)) {
      const rows = [];
      while (i < lines.length && isTableLine(lines[i])) {
        if (!isTableSeparator(lines[i])) {
          const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()).filter(Boolean);
          if (cells.length) rows.push(cells.join(' — '));
        }
        i++;
      }
      if (rows.length) blocks.push({ type: 'table', rows });
      continue;
    }

    // List (bullet or numbered) — consecutive list lines form one block
    const isListLine = (l) => /^\s*([-*+]|\d+[.)])\s+/.test(l);
    if (isListLine(line)) {
      const ordered = /^\s*\d/.test(line);
      const items = [];
      while (i < lines.length && isListLine(lines[i]) && !isRuleLine(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*+]|\d+[.)])\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    // Blank line — paragraph separator
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph — consume until a blank line or another block type starts
    const para = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^```/.test(lines[i]) &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !isListLine(lines[i]) &&
      !isRuleLine(lines[i]) &&
      !isTableLine(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'paragraph', text: para.join('\n') });
  }

  return blocks;
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
            <Tag key={i} className={`space-y-1.5 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
              {block.items.map((item, j) => (
                <li key={j} className="leading-relaxed">
                  <InlineText text={item} />
                </li>
              ))}
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
