// Truncate on a boundary a reader would choose.
//
// A bare .slice() cuts mid-word, and a description that ends "...access control
// mecha" is quoted back verbatim by an answer engine — the one place the text
// is guaranteed to be read aloud is the place it must not be broken. Prefers
// the last sentence end in the back two-fifths of the budget, falls back to the
// last word plus an ellipsis.
//
// Lives in its own module because publicCatalogue.js and publicNotes.js both
// need it and publicNotes must not import publicCatalogue (publicCatalogue
// reads publicNotes for the glossary schema — that way round only).
export function clip(text, max) {
  const value = String(text ?? '');
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  const space = cut.lastIndexOf(' ');
  return `${cut.slice(0, space > 0 ? space : max).replace(/[\s,;:—-]+$/, '')}…`;
}
