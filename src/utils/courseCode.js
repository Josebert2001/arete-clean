// Matches the code shapes in the Cybersecurity and Data Science catalogues.
const COURSE_CODE_PATTERN = /^(?:[A-Z]{3}|(?:UUY|UNIUYO)-[A-Z]{3}) [0-9]{3}$/;
const WHITESPACE_CLASS = String.raw`[ \t\n\v\f\r\u00A0\uFEFF\u2000-\u200B\u202F\u205F\u3000]`;
const EDGE_WHITESPACE = new RegExp(`^${WHITESPACE_CLASS}+|${WHITESPACE_CLASS}+$`, 'g');
const INNER_WHITESPACE = new RegExp(`${WHITESPACE_CLASS}+`, 'g');

export function normalizeCourseCode(value) {
  const normalized = String(value ?? '')
    .toUpperCase()
    .replace(EDGE_WHITESPACE, '')
    .replace(INNER_WHITESPACE, ' ')
    .replace(/([A-Z])([0-9]{3})$/, '$1 $2');
  return COURSE_CODE_PATTERN.test(normalized) ? normalized : null;
}
