// Matches the code shapes in the Cybersecurity and Data Science catalogues.
const COURSE_CODE_PATTERN = /^(?:[A-Z]{3}|(?:UUY|UNIUYO)-[A-Z]{3}) [0-9]{3}$/;

export function normalizeCourseCode(value) {
  const normalized = String(value ?? '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .replace(/([A-Z])([0-9]{3})$/, '$1 $2');
  return COURSE_CODE_PATTERN.test(normalized) ? normalized : null;
}
