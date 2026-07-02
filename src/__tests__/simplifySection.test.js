import { describe, it, expect, beforeEach } from 'vitest';
import {
  hashText,
  sectionToPlainText,
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
