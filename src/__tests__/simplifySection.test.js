import { describe, it, expect, beforeEach } from 'vitest';
import {
  hashText,
  sectionToPlainText,
  sectionsToPlainText,
  groupToPlainText,
  canSimplifyGroup,
  MIN_SIMPLIFY_CHARS,
  MAX_SIMPLIFY_CHARS,
  getCachedSimplification,
  setCachedSimplification,
} from '../utils/simplifySection';

describe('hashText', () => {
  it('is stable for the same input', () => {
    expect(hashText('hello world')).toBe(hashText('hello world'));
  });

  it('differs for different inputs', () => {
    expect(hashText('hello')).not.toBe(hashText('world'));
  });
});

describe('sectionToPlainText', () => {
  it('serializes definition sections with their heading', () => {
    const out = sectionToPlainText({ type: 'definition', heading: 'Abstract', text: 'Dense prose.' });
    expect(out).toBe('Abstract\n\nDense prose.');
  });

  it('serializes bullets as a dashed list', () => {
    const out = sectionToPlainText({ type: 'bullets', items: ['one', 'two'] });
    expect(out).toBe('- one\n- two');
  });

  it('serializes termlists as term — def lines', () => {
    const out = sectionToPlainText({
      type: 'termlist',
      items: [{ term: 'KEM', def: 'key encapsulation' }, { term: 'Solo' }],
    });
    expect(out).toContain('- KEM — key encapsulation');
    expect(out).toContain('- Solo');
  });

  it('serializes tables with headers and pipe-joined rows', () => {
    const out = sectionToPlainText({
      type: 'table',
      headers: ['A', 'B'],
      rows: [['1', '2'], ['3', '4']],
    });
    expect(out).toBe('A | B\n\n1 | 2\n3 | 4');
  });

  it('serializes proscons with both halves labelled', () => {
    const out = sectionToPlainText({ type: 'proscons', advantages: ['fast'], disadvantages: ['costly'] });
    expect(out).toContain('Advantages:\n- fast');
    expect(out).toContain('Disadvantages:\n- costly');
  });

  it('returns empty for unknown types and empty sections', () => {
    expect(sectionToPlainText({ type: 'image', src: 'x.png' })).toBe('');
    expect(sectionToPlainText({ type: 'mosca', heading: 'Try It' })).toBe('');
    expect(sectionToPlainText(null)).toBe('');
    // A heading with no body is not worth an AI call.
    expect(sectionToPlainText({ type: 'bullets', heading: 'Empty' })).toBe('');
  });
});

describe('sectionsToPlainText', () => {
  it('folds in note and casestudy sections, which sectionToPlainText skips', () => {
    const out = sectionsToPlainText([
      { type: 'note', text: 'Clarification here', items: ['extra point'] },
      { type: 'casestudy', title: 'Bank breach', prompt: 'What went wrong?', tasks: ['Identify the flaw'] },
    ]);
    expect(out).toContain('Clarification here');
    expect(out).toContain('- extra point');
    expect(out).toContain('Bank breach');
    expect(out).toContain('1. Identify the flaw');
  });

  // Without these two, the maths and programming courses lose most of their
  // body text and almost no heading clears the floor — MTH 121 offered the
  // button on 10 of 103 headings before they were folded in.
  it('includes math sections as their LaTeX plus caption', () => {
    const out = sectionsToPlainText([{ type: 'math', tex: 'x^2 - 9 \\neq 0', caption: 'excluding ±3' }]);
    expect(out).toContain('x^2 - 9 \\neq 0');
    expect(out).toContain('excluding ±3');
  });

  it('includes code sections, fenced', () => {
    const out = sectionsToPlainText([{ type: 'code', code: 'print("hi")' }]);
    expect(out).toBe('```\nprint("hi")\n```');
  });

  it('drops sections that serialise to nothing', () => {
    expect(sectionsToPlainText([{ type: 'image', src: 'x.png' }, { type: 'mosca' }])).toBe('');
  });

  it('tolerates a missing list', () => {
    expect(sectionsToPlainText(undefined)).toBe('');
  });
});

describe('groupToPlainText', () => {
  // The bug this feature fixes: the substance of a heading usually lives in the
  // sections *after* it, so the heading alone falls under the length floor.
  it('includes the sections under the heading, not just the heading section', () => {
    const head = { type: 'text', heading: 'Firewalls', text: 'Short intro.' };
    const tail = [
      { type: 'bullets', items: ['packet filtering', 'stateful inspection'] },
      { type: 'note', text: 'Examined every year.' },
    ];
    const out = groupToPlainText(head, tail);
    expect(out).toContain('Firewalls');
    expect(out).toContain('- packet filtering');
    expect(out).toContain('Examined every year.');
    expect(out.length).toBeGreaterThan(sectionToPlainText(head).length);
  });

  it('handles a heading with nothing under it', () => {
    expect(groupToPlainText({ type: 'text', heading: 'H', text: 'Body.' }, undefined))
      .toBe('H\n\nBody.');
  });
});

describe('canSimplifyGroup', () => {
  it('rejects a group too short to be worth rewriting', () => {
    expect(canSimplifyGroup('x'.repeat(MIN_SIMPLIFY_CHARS - 1))).toBe(false);
  });

  it('accepts a group at the floor', () => {
    expect(canSimplifyGroup('x'.repeat(MIN_SIMPLIFY_CHARS))).toBe(true);
  });

  it('rejects a group past the API ceiling', () => {
    expect(canSimplifyGroup('x'.repeat(MAX_SIMPLIFY_CHARS + 1))).toBe(false);
  });

  it('has no section-type filter — any mix of types qualifies on length alone', () => {
    const plain = groupToPlainText(
      { type: 'text', heading: 'Overview', text: 'y'.repeat(300) },
      [{ type: 'casestudy', title: 'Case', prompt: 'Why?' }],
    );
    expect(canSimplifyGroup(plain)).toBe(true);
  });

  it('treats missing text as not simplifiable', () => {
    expect(canSimplifyGroup(undefined)).toBe(false);
    expect(canSimplifyGroup('')).toBe(false);
  });
});

describe('simplification cache', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips through localStorage', () => {
    setCachedSimplification('dense text', 'simple text');
    expect(getCachedSimplification('dense text')).toBe('simple text');
  });

  it('misses for unseen text', () => {
    expect(getCachedSimplification('never stored')).toBeNull();
  });
});
