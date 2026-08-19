// Turning lecture-note data into plain text, and grouping it by heading.
//
// Deliberately dependency-free — no React, no fetch, no browser globals — so
// `scripts/pregenerate-simplify.mjs` can import it under plain Node and produce
// byte-identical groups to the ones the browser renders. If the script grouped
// or serialised text even slightly differently, every hash would differ and
// every pre-generated rewrite would miss.
//
// The browser-side helpers (localStorage cache, the API call) live in
// simplifySection.js, which re-exports everything here for its existing callers.

// djb2 — tiny, stable, good enough for cache keys (not security).
export function hashText(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

function itemToLine(item) {
  if (item && typeof item === 'object') {
    return item.def ? `${item.term} — ${item.def}` : String(item.term ?? '');
  }
  return String(item ?? '');
}

// Flattens one lecture-note section into plain text.
// Returns '' for section types with nothing meaningful to simplify.
export function sectionToPlainText(section) {
  if (!section) return '';
  const parts = [];
  if (section.heading) parts.push(section.heading);

  switch (section.type) {
    case 'text':
    case 'definition':
      if (section.text) parts.push(section.text);
      break;
    case 'bullets':
      if (Array.isArray(section.items)) parts.push(section.items.map((i) => `- ${itemToLine(i)}`).join('\n'));
      break;
    case 'termlist':
    case 'fivers':
      if (Array.isArray(section.items)) parts.push(section.items.map((i) => `- ${itemToLine(i)}`).join('\n'));
      break;
    case 'table':
      if (Array.isArray(section.headers)) parts.push(section.headers.join(' | '));
      if (Array.isArray(section.rows)) parts.push(section.rows.map((r) => r.join(' | ')).join('\n'));
      break;
    case 'proscons':
      if (Array.isArray(section.advantages)) parts.push(`Advantages:\n${section.advantages.map((a) => `- ${a}`).join('\n')}`);
      if (Array.isArray(section.disadvantages)) parts.push(`Disadvantages:\n${section.disadvantages.map((d) => `- ${d}`).join('\n')}`);
      break;
    default:
      return '';
  }

  // Heading alone isn't worth an AI call.
  return parts.length > (section.heading ? 1 : 0) ? parts.join('\n\n') : '';
}

// Section types sectionToPlainText returns '' for, but which carry prose a
// reader of the group would want included. Kept separate from the switch above
// so that function's output — and therefore nothing measured against it — moves.
export function extraSectionToPlainText(section) {
  const lines = [];
  if (section?.type === 'note') {
    if (section.text) lines.push(section.text);
    if (Array.isArray(section.items)) lines.push(...section.items.map((i) => `- ${i}`));
  } else if (section?.type === 'casestudy') {
    if (section.title) lines.push(section.title);
    if (section.prompt) lines.push(section.prompt);
    if (Array.isArray(section.tasks)) lines.push(...section.tasks.map((t, i) => `${i + 1}. ${t}`));
  } else if (section?.type === 'math') {
    // Raw LaTeX. The model reads it fine; the prompt is what stops it writing
    // LaTeX back, since the result card renders Markdown only.
    if (section.tex) lines.push(section.tex);
    if (section.caption) lines.push(section.caption);
  } else if (section?.type === 'code') {
    // Fenced, so the model sees where the snippet starts and ends — and so any
    // snippet it echoes comes back in a form RichText already renders.
    if (section.code) lines.push('```\n' + section.code + '\n```');
  }
  return lines.join('\n');
}

// Serialises any run of sections, falling back to the extras above. Shared with
// summarizeTopic.js's topicToPlainText so the two can't drift.
export function sectionsToPlainText(sections) {
  const parts = [];
  for (const section of sections ?? []) {
    const text = sectionToPlainText(section) || extraSectionToPlainText(section);
    if (text) parts.push(text);
  }
  return parts.join('\n\n');
}

// Splits a topic's flat section list into heading groups: each `{ head, tail }`
// is a heading and everything under it, and anything before the first heading
// (or a `resource` card, which is a link, not prose) stands alone.
export function buildOutline(sections) {
  const items = [];
  let lastGroup = null;
  for (const s of sections ?? []) {
    if (s.type === 'resource') {
      items.push({ standalone: s });
    } else if (s.heading) {
      lastGroup = { head: s, tail: [] };
      items.push(lastGroup);
    } else if (lastGroup) {
      lastGroup.tail.push(s);
    } else {
      items.push({ standalone: s });
    }
  }
  return items;
}

// One heading plus everything under it, as buildOutline groups them.
export function groupToPlainText(head, tail) {
  return sectionsToPlainText([head, ...(tail ?? [])]);
}

// Below this the group is already short enough to read as written, and a
// rewrite would be longer than the original.
export const MIN_SIMPLIFY_CHARS = 260;
// Must stay at or below MAX_TEXT_CHARS in api/simplify.js, or the button offers
// a call the endpoint rejects with a 400.
export const MAX_SIMPLIFY_CHARS = 10000;

// Whether a group is worth rewriting. Deliberately no section-type filter: the
// substance can sit in any mix of types, so the only question that matters is
// whether enough text came out of it.
export function canSimplifyGroup(plainText) {
  const len = (plainText ?? '').length;
  return len >= MIN_SIMPLIFY_CHARS && len <= MAX_SIMPLIFY_CHARS;
}

// Every simplifiable group in a topic — the unit both the runtime lookup and the
// pre-generation script work in.
export function simplifiableGroups(topic) {
  const out = [];
  for (const it of buildOutline(topic?.sections)) {
    if (!it.head) continue;
    const text = groupToPlainText(it.head, it.tail);
    if (canSimplifyGroup(text)) out.push({ hash: hashText(text), text, heading: it.head.heading });
  }
  return out;
}
