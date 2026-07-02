import { describe, it, expect } from 'vitest';
import { parseBlocks } from '../utils/richTextParse';

describe('parseBlocks — list handling', () => {
  it('keeps a numbered list as one block across blank-line gaps, nesting indented bullets', () => {
    // The shape gpt-oss-120b actually emits for structured answers — this
    // used to render as three separate lists all restarting at "1.".
    const text = [
      '1. **Validate & Sanitize Input**',
      '   - Accept only expected formats.',
      '   - Reject dangerous characters.',
      '',
      '2. **Least-Privilege Database Accounts**',
      '   - Application accounts should have only the permissions they need.',
      '',
      '3. **Web Application Firewalls**',
    ].join('\n');

    const blocks = parseBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe('list');
    expect(blocks[0].ordered).toBe(true);
    expect(blocks[0].start).toBe(1);
    expect(blocks[0].items).toHaveLength(3);
    expect(blocks[0].items[0].children).toHaveLength(2);
    expect(blocks[0].items[0].children[0].text).toBe('Accept only expected formats.');
    expect(blocks[0].items[2].children).toBeNull();
  });

  it('preserves an explicit start number', () => {
    const blocks = parseBlocks('4. fourth\n5. fifth');
    expect(blocks[0].start).toBe(4);
    expect(blocks[0].items.map(i => i.text)).toEqual(['fourth', 'fifth']);
  });

  it('does not merge a bullet list with a following numbered list', () => {
    const blocks = parseBlocks('- one\n- two\n\n1. first\n2. second');
    expect(blocks).toHaveLength(2);
    expect(blocks[0].ordered).toBe(false);
    expect(blocks[1].ordered).toBe(true);
  });

  it('folds indented continuation lines into their item', () => {
    const blocks = parseBlocks('1. a long point\n   that wraps onto a second line\n2. next');
    expect(blocks[0].items[0].text).toBe('a long point that wraps onto a second line');
    expect(blocks[0].items).toHaveLength(2);
  });

  it('still ends the list at a paragraph', () => {
    const blocks = parseBlocks('- item\n\nA closing paragraph.');
    expect(blocks).toHaveLength(2);
    expect(blocks[0].type).toBe('list');
    expect(blocks[1].type).toBe('paragraph');
  });
});
