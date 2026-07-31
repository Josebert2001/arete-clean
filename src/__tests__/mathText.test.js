import { describe, it, expect } from 'vitest';
import { parseMathSegments, hasMath } from '../utils/mathText';

const texts = (segs) => segs.filter((s) => s.type === 'text').map((s) => s.value);
const maths = (segs) => segs.filter((s) => s.type === 'math').map((s) => s.value);
const plain = (segs) => segs.map((s) => s.value).join('');

describe('parseMathSegments', () => {
  it('returns a single text segment for a string with no maths', () => {
    expect(parseMathSegments('Limits and continuity')).toEqual([
      { type: 'text', value: 'Limits and continuity' },
    ]);
  });

  it('returns nothing for an empty string', () => {
    expect(parseMathSegments('')).toEqual([]);
  });

  it('coerces non-string input rather than throwing', () => {
    expect(parseMathSegments(null)).toEqual([]);
    expect(parseMathSegments(42)).toEqual([{ type: 'text', value: '42' }]);
  });

  it('extracts a lone expression', () => {
    expect(parseMathSegments('$x^2$')).toEqual([{ type: 'math', value: 'x^2' }]);
  });

  it('splits maths out of surrounding prose', () => {
    const segs = parseMathSegments('If $f(x)=\\sin x$ then $f\'(x)=\\cos x$.');
    expect(maths(segs)).toEqual(['f(x)=\\sin x', "f'(x)=\\cos x"]);
    expect(texts(segs)).toEqual(['If ', ' then ', '.']);
  });

  it('handles adjacent expressions, which the DOCX export produces', () => {
    // mammoth flattens "$a$\n$b$" into "$a$$b$" when the source had a line break
    expect(maths(parseMathSegments('$xy - y = x + 2$$x(y-1) = 2 + y$'))).toEqual([
      'xy - y = x + 2',
      'x(y-1) = 2 + y',
    ]);
  });

  describe('leaves currency alone', () => {
    it('for a single dollar amount', () => {
      const segs = parseMathSegments('data breach cost reached $4.88M in 2024 (IBM)');
      expect(maths(segs)).toEqual([]);
      expect(plain(segs)).toBe('data breach cost reached $4.88M in 2024 (IBM)');
    });

    it('for two amounts that would otherwise pair up', () => {
      // The closing-$ rules reject this: the second $ is preceded by a space,
      // and is followed by a digit.
      const segs = parseMathSegments('costs $5 and $10 in total');
      expect(maths(segs)).toEqual([]);
      expect(plain(segs)).toBe('costs $5 and $10 in total');
    });

    it('for an income threshold', () => {
      expect(hasMath('node on income (≤ or > $75,000), then on family size')).toBe(false);
    });
  });

  describe('delimiter edge cases', () => {
    it('treats \\$ as a literal dollar', () => {
      const segs = parseMathSegments('costs \\$5 today');
      expect(maths(segs)).toEqual([]);
      expect(plain(segs)).toBe('costs $5 today');
    });

    it('does not let \\$ inside an expression close it', () => {
      expect(maths(parseMathSegments('$a \\$ b$'))).toEqual(['a \\$ b']);
    });

    it('does not let \\\\ swallow the closing delimiter', () => {
      expect(maths(parseMathSegments('$a \\\\ b$'))).toEqual(['a \\\\ b']);
    });

    it('leaves an unclosed delimiter as text', () => {
      expect(plain(parseMathSegments('$x + 1 is unclosed'))).toBe('$x + 1 is unclosed');
    });

    it('will not open on a space', () => {
      expect(hasMath('$ x$')).toBe(false);
    });

    it('ignores an empty expression', () => {
      expect(plain(parseMathSegments('a $$ b'))).toBe('a $$ b');
      expect(hasMath('a $$ b')).toBe(false);
    });
  });

  it('round-trips the text of a real workbook line', () => {
    const line =
      'Let $X$ and $Y$ be nonempty sets, then a mapping from $X$ to $Y$ is a rule '
      + 'that assigns a unique object $y \\in Y$ to each object $x \\in X$.';
    const segs = parseMathSegments(line);
    expect(maths(segs)).toEqual(['X', 'Y', 'X', 'Y', 'y \\in Y', 'x \\in X']);
    expect(plain(segs)).toBe(line.replace(/\$/g, ''));
  });
});

describe('hasMath', () => {
  it('is true only when a valid expression is present', () => {
    expect(hasMath('$x^2$')).toBe(true);
    expect(hasMath('plain prose')).toBe(false);
    expect(hasMath('$4.88M')).toBe(false);
  });
});
