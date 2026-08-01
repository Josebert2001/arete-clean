// Inline-maths parsing for lecture-note strings.
//
// Lecture notes are authored as plain JS strings, so inline maths is marked the
// TeX way — $...$ — while standalone equations get their own `math` section.
// The catch is that real notes also contain currency: "$4.88M in 2024"
// (courses.js) would be mangled by naive $-pair matching. Three rules borrowed
// from KaTeX's own auto-render extension keep prose intact:
//
//   1. an opening $ must be followed by a non-space character
//   2. a closing $ must be preceded by a non-space character
//   3. a closing $ must not be followed by a digit  ("$5 and $10")
//
// A $ that finds no valid partner stays literal text. \$ is always literal.

const isSpace = (ch) => ch === undefined || /\s/.test(ch);
const isDigit = (ch) => ch !== undefined && ch >= '0' && ch <= '9';

// Finds the closing $ for maths opened just before `from`, or -1 if there
// isn't a valid one.
function findClose(str, from) {
  for (let i = from; i < str.length; i++) {
    if (str[i] === '\\') {
      i += 1; // skip the escaped character, so \$ and \\ can't close the span
      continue;
    }
    if (str[i] === '$' && !isSpace(str[i - 1]) && !isDigit(str[i + 1])) {
      return i;
    }
  }
  return -1;
}

/**
 * Splits a string into `{ type: 'text' | 'math', value }` segments.
 * A string with no maths returns a single text segment (or none, when empty),
 * so callers can cheaply detect the common case.
 */
export function parseMathSegments(input) {
  const str = typeof input === 'string' ? input : String(input ?? '');
  // Fast path: the overwhelming majority of lecture-note strings have no maths.
  if (!str.includes('$')) return str ? [{ type: 'text', value: str }] : [];

  const segments = [];
  let buf = '';
  let i = 0;

  const flush = () => {
    if (buf) {
      segments.push({ type: 'text', value: buf });
      buf = '';
    }
  };

  while (i < str.length) {
    const ch = str[i];

    if (ch === '\\' && str[i + 1] === '$') {
      buf += '$';
      i += 2;
      continue;
    }

    if (ch === '$' && !isSpace(str[i + 1])) {
      const close = findClose(str, i + 1);
      const tex = close === -1 ? '' : str.slice(i + 1, close);
      if (tex.trim()) {
        flush();
        segments.push({ type: 'math', value: tex });
        i = close + 1;
        continue;
      }
    }

    buf += ch;
    i += 1;
  }

  flush();
  return segments;
}

/** True if the string contains at least one inline-maths span. */
export function hasMath(input) {
  return parseMathSegments(input).some((seg) => seg.type === 'math');
}
