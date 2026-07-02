// Parses the Markdown subset the AI endpoints are instructed to emit into
// render-ready blocks (see src/components/RichText.jsx). The model doesn't
// always obey, so common strays (*italics*, --- rules, table rows) degrade
// gracefully instead of showing raw markup. Kept separate from the component
// so the parsing is unit-testable (and fast-refresh friendly).

const isRuleLine = (l) => /^\s*([-*_])\s*(\1\s*){2,}$/.test(l);
const isTableLine = (l) => /^\s*\|.*\|\s*$/.test(l);
const isTableSeparator = (l) => /^\s*\|[\s\-:|]+\|\s*$/.test(l);
const LIST_RE = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;

export function parseBlocks(text) {
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

    // List (bullet or numbered). Handles one level of nesting by indentation,
    // keeps a numbered list going across blank-line gaps (the model separates
    // its numbered points with blank lines, which used to restart the list at
    // "1." every time), and folds indented continuation lines into their item.
    const isListLine = (l) => LIST_RE.test(l);
    if (isListLine(line)) {
      const first = line.match(LIST_RE);
      const blockOrdered = /\d/.test(first[2]);
      const base = first[1].length;
      const flat = [];
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim()) {
          // Peek past blank lines: same block only for a nested item or
          // another item of the same list kind at the base level.
          let j = i + 1;
          while (j < lines.length && !lines[j].trim()) j++;
          const next = j < lines.length && !isRuleLine(lines[j]) ? lines[j].match(LIST_RE) : null;
          if (next && (next[1].length > base || /\d/.test(next[2]) === blockOrdered)) {
            i = j;
            continue;
          }
          break;
        }
        if (isRuleLine(l)) break;
        const m = l.match(LIST_RE);
        if (m) {
          flat.push({ indent: m[1].length, ordered: /\d/.test(m[2]), num: parseInt(m[2], 10), text: m[3] });
          i++;
          continue;
        }
        // Indented non-list line — a hanging wrap of the previous item.
        if (/^\s{2,}\S/.test(l) && flat.length) {
          flat[flat.length - 1].text += ` ${l.trim()}`;
          i++;
          continue;
        }
        break;
      }
      const items = [];
      for (const it of flat) {
        if (it.indent > base && items.length) {
          (items[items.length - 1].children ??= []).push({ text: it.text, ordered: it.ordered });
        } else {
          items.push({ text: it.text, children: null });
        }
      }
      blocks.push({
        type: 'list',
        ordered: blockOrdered,
        start: Number.isFinite(flat[0].num) ? flat[0].num : 1,
        items,
      });
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
