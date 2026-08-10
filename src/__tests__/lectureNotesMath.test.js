// Guards the maths in every authored lecture note.
//
// Lecture-note maths is hand-transcribed LaTeX in a plain JS string, so a typo
// is invisible until the page renders it — MathText deliberately degrades to a
// red code span rather than throwing, which means a broken formula would ship
// silently. These tests render every expression through KaTeX at build time
// instead, and check the $-delimiters are paired so no prose gets swallowed
// into an expression.

import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { courses } from '../data/courses';
import { loadNotesFor } from '../data/lectureNotes/index.js';
import { parseMathSegments } from '../utils/mathText';

// Walks a lecture-note tree and yields every expression with a readable path.
// `tex` fields are display maths; every other string may carry inline $...$.
function collectExpressions(notes, coursePath) {
  const found = [];

  const walk = (node, where) => {
    if (typeof node === 'string') {
      for (const seg of parseMathSegments(node)) {
        if (seg.type === 'math') found.push({ tex: seg.value, display: false, where, source: node });
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((n, i) => walk(n, `${where}[${i}]`));
      return;
    }
    if (node && typeof node === 'object') {
      const here = node.heading ? `${where} «${node.heading}»` : where;
      for (const [key, value] of Object.entries(node)) {
        if (key === 'tex' && typeof value === 'string') {
          found.push({ tex: value, display: true, where: `${here}.tex` });
        } else {
          walk(value, `${here}.${key}`);
        }
      }
    }
  };

  notes.forEach((topic) => walk(topic, `${coursePath} unit ${topic.number}`));
  return found;
}

// Notes are lazily chunked (data/lectureNotes/index.js), so resolve them up
// front — top-level await keeps the rest of this file synchronous.
const resolved = await Promise.all(
  courses.map(async (c) => ({ code: c.code, notes: await loadNotesFor(c) }))
);
const withNotes = resolved.filter((r) => r.notes.length);
const allExpressions = withNotes.flatMap((r) => collectExpressions(r.notes, r.code));

describe('lecture-note maths', () => {
  it('actually collects expressions to check', () => {
    // Without this the walker could quietly stop matching and every assertion
    // below would pass over an empty list.
    expect(withNotes.length).toBeGreaterThan(0);
    expect(allExpressions.length).toBeGreaterThan(300); // MTH 121 alone has ~390
  });

  it('renders every expression through KaTeX without error', () => {
    const failures = [];
    for (const { tex, display, where } of allExpressions) {
      try {
        katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'ignore' });
      } catch (err) {
        failures.push(`${where}\n    ${tex}\n    → ${err.message.split('\n')[0]}`);
      }
    }
    expect(failures, `${failures.length} expression(s) failed to render:\n\n${failures.join('\n\n')}`)
      .toEqual([]);
  });

  it('leaves no stray $ in a string that also carries maths', () => {
    // A lone $ in prose is fine and deliberate — "$4.88M in 2024" is currency,
    // and mathText.js goes out of its way to leave it alone. What signals a
    // real authoring bug is a string that parsed *some* maths and still has an
    // unescaped $ sitting in its text: a delimiter that failed to pair up.
    const stray = [];

    const check = (node, where) => {
      if (typeof node === 'string') {
        const segments = parseMathSegments(node);
        if (!segments.some((s) => s.type === 'math')) return;
        const leftover = segments
          .filter((s) => s.type === 'text')
          .some((s) => /(?<!\\)\$/.test(s.value));
        if (leftover) stray.push(`${where}\n    ${node.slice(0, 120)}`);
        return;
      }
      if (Array.isArray(node)) return node.forEach((n, i) => check(n, `${where}[${i}]`));
      if (node && typeof node === 'object') {
        for (const [key, value] of Object.entries(node)) {
          // `tex` is pure LaTeX with no delimiters of its own.
          if (key !== 'tex') check(value, `${where}.${key}`);
        }
      }
    };

    for (const entry of withNotes) {
      entry.notes.forEach((topic) => check(topic, `${entry.code} unit ${topic.number}`));
    }

    expect(stray, `unpaired $ delimiter in:\n\n${stray.join('\n\n')}`).toEqual([]);
  });

  it('does not swallow prose into an expression', () => {
    // Two consecutive long lowercase words inside maths (once TeX commands are
    // stripped) means a $ paired with the wrong partner and ate the sentence.
    const suspects = allExpressions
      .filter(({ display }) => !display)
      .filter(({ tex }) => /[a-z]{5,}\s+[a-z]{5,}/.test(tex.replace(/\\[a-zA-Z]+/g, ' ')))
      .map(({ where, tex }) => `${where}\n    ${tex.slice(0, 120)}`);

    expect(suspects, `prose captured as maths in:\n\n${suspects.join('\n\n')}`).toEqual([]);
  });
});
