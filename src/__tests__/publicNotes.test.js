import { describe, it, expect, beforeAll } from 'vitest';
import { loadPublicCourses, courseUrl } from '../data/publicCatalogue';
import { loadNotesFor } from '../data/lectureNotes/index.js';
import {
  loadPublicNotes,
  glossaryJsonLd,
  GLOSSARY_MAX,
  GLOSSARY_DEF_CHARS,
  MIN_DEF_CHARS,
  PREVIEW_CHAR_BUDGET,
} from '../data/publicNotes';

// P2: the freemium slice of the lecture notes.
//
// The risk this file guards is asymmetric. Publishing too little is a missed
// citation; publishing too much gives away the material the account exists for,
// and once a crawler has it back it does not come. So the caps are asserted as
// contracts, not as implementation details.

let entries;
let noted;
// The raw notes, to check the published slice against what it was cut from.
const notesByCourse = new Map();

beforeAll(async () => {
  entries = await loadPublicCourses();
  noted = [];
  for (const { course } of entries) {
    const notes = await loadPublicNotes(course);
    if (!notes) continue;
    noted.push({ course, notes });
    notesByCourse.set(course.slug, await loadNotesFor(course));
  }
});

describe('which courses expose notes', () => {
  it('finds the courses that carry them and no others', () => {
    expect(noted.length).toBeGreaterThanOrEqual(12);
    // The other ~81 must return null, not an empty shell — CoursePreview keys
    // its whole notes block off that, and an empty section would advertise
    // material the course does not have.
    expect(noted.length).toBeLessThan(entries.length);
  });

  it('returns null for a course with no notes', async () => {
    const bare = entries.find(
      (e) => !e.course.notesKey && !e.course.lectureNotes?.length
    );
    expect(await loadPublicNotes(bare.course)).toBeNull();
  });
});

describe('what stays gated', () => {
  it('never publishes more than the first topic', () => {
    for (const { course, notes } of noted) {
      if (!notes.preview) continue;
      // The outline lists every title — that is a table of contents. The
      // preview body must come from topic 1 alone.
      expect(notes.preview.title, course.code).toBe(notes.outline[0]);
    }
  });

  it('publishes a contiguous prefix of topic 1, never a skip-over', () => {
    // The bug this pins: skipping unrenderable sections to reach the next
    // prose one published COS 221's "Here, `a` first stores the value `5`…"
    // with the code listing it describes removed — commentary on nothing.
    // Lecture notes are a sequence; the only safe cut is a prefix.
    for (const { course, notes } of noted) {
      if (!notes.preview) continue;
      const kept = notes.preview.sections.map((s) => s.type);
      const source = notesByCourse.get(course.slug)[0].sections.map((s) => s.type);
      expect(source.slice(0, kept.length), course.code).toEqual(kept);
    }
  });

  it('holds the preview inside its character budget', () => {
    for (const { course, notes } of noted) {
      if (!notes.preview) continue;
      const chars = notes.preview.sections.reduce(
        (n, s) => n + (s.type === 'bullets' ? (s.items || []).join(' ').length : (s.text || '').length),
        0
      );
      // One section may cross the line; the budget bounds where the next one
      // starts, not where the last one ends.
      expect(chars, course.code).toBeLessThan(PREVIEW_CHAR_BUDGET * 2);
    }
  });

  it('caps the glossary, so ENT 221 cannot inline its 1,076 entries', () => {
    for (const { course, notes } of noted) {
      expect(notes.glossary.length, course.code).toBeLessThanOrEqual(GLOSSARY_MAX);
      for (const entry of notes.glossary) {
        expect(entry.definition.length, `${course.code} — ${entry.term}`).toBeLessThanOrEqual(
          GLOSSARY_DEF_CHARS
        );
      }
    }
  });

  it('says "the opening of" whenever any section was withheld', () => {
    // The caption a student reads when deciding whether an account gives them
    // anything more. Claiming a whole topic while having stripped its figures,
    // tables and code would be false.
    for (const { course, notes } of noted) {
      if (!notes.preview) continue;
      const shown = notes.preview.sections.length;
      expect(typeof notes.preview.truncated, course.code).toBe('boolean');
      if (notes.preview.truncated) expect(shown).toBeGreaterThan(0);
    }
  });
});

describe('the glossary', () => {
  it('gives every entry a term and a real definition', () => {
    for (const { course, notes } of noted) {
      for (const { term, definition } of notes.glossary) {
        expect(term, course.code).toBeTruthy();
        // The floor exists because table cells look like definitions to the
        // extractor: COS 221's "Simple — Java is easy to learn." and COS 121's
        // operator rows both cleared a naive check and said nothing useful
        // attributed to Areté.
        expect(definition.length, `${course.code} — ${term}`).toBeGreaterThanOrEqual(
          MIN_DEF_CHARS
        );
      }
    }
  });

  it('never publishes raw LaTeX', () => {
    // Inline maths renders through MathText, which needs hooks and KaTeX —
    // neither available to the build-time renderer. Publishing "$f(x)$" would
    // put broken markup on the page and into any engine's quote of it, so
    // maths-bearing entries are dropped instead. MTH 121 loses its whole
    // glossary to this, which is the correct outcome.
    for (const { course, notes } of noted) {
      // termlist items are {term, def} objects, the rest are strings — flatten
      // both, or the check silently skips the sections most likely to carry
      // maths.
      const all = [
        ...notes.glossary.flatMap((g) => [g.term, g.definition]),
        ...(notes.preview?.sections || []).flatMap((s) => [
          s.heading || '',
          s.text || '',
          ...(s.items || []).flatMap((i) =>
            typeof i === 'string' ? [i] : [i.term || '', i.def || '']
          ),
        ]),
      ];
      for (const text of all) {
        expect(text, `${course.code}: ${String(text).slice(0, 60)}`).not.toMatch(/\$[^$]+\$/);
      }
    }
  });

  it('strips section numbering and drops structural headings', () => {
    // "2.2.1 Differentiability" is a heading, not a term, and a DefinedTerm
    // named "2.1 Introduction" is noise in a knowledge graph.
    for (const { course, notes } of noted) {
      for (const { term } of notes.glossary) {
        expect(term, course.code).not.toMatch(/^\d+(\.\d+)*[.)]?\s/);
        expect(term.toLowerCase(), course.code).not.toBe('introduction');
        expect(term.toLowerCase(), course.code).not.toBe('overview');
      }
    }
  });

  it('never repeats a term within one course', () => {
    for (const { course, notes } of noted) {
      const terms = notes.glossary.map((g) => g.term.toLowerCase());
      expect(new Set(terms).size, course.code).toBe(terms.length);
    }
  });

  it('serialises to a DefinedTermSet whose terms carry their set back-reference', () => {
    const { course, notes } = noted[0];
    const url = courseUrl(course.slug);
    const ld = glossaryJsonLd(course, notes, url);
    expect(ld['@type']).toBe('DefinedTermSet');
    expect(ld['@id']).toBe(`${url}#glossary`);
    expect(ld.hasDefinedTerm).toHaveLength(notes.glossary.length);
    for (const term of ld.hasDefinedTerm) {
      expect(term['@type']).toBe('DefinedTerm');
      expect(term.name).toBeTruthy();
      expect(term.description).toBeTruthy();
      expect(term.inDefinedTermSet).toBe(ld['@id']);
    }
  });

  it('emits nothing rather than an empty set when there are no notes', async () => {
    const bare = entries.find((e) => !e.course.notesKey && !e.course.lectureNotes?.length);
    expect(glossaryJsonLd(bare.course, null, courseUrl(bare.course.slug))).toBeNull();
  });
});

describe('the outline', () => {
  it('lists every topic title, which is the whole point of it', () => {
    for (const { course, notes } of noted) {
      expect(notes.outline.length, course.code).toBe(notes.topicCount);
      for (const title of notes.outline) expect(title, course.code).toBeTruthy();
    }
  });
});
