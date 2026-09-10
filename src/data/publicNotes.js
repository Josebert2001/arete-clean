// The publicly readable slice of the transcribed lecture notes.
//
// 14 of the 95 public courses carry notes (~1.4 MB of them), and every word was
// behind RequireAuth — so the material that makes Areté worth an account was
// also the material no search or answer engine could see. This module decides
// exactly how much of it a signed-out visitor and a crawler get.
//
// Three things, in descending order of how much they give away:
//
//   1. `outline` — the titles of every topic in the notes. Costs nothing (it is
//      a table of contents, not the content) and is the single most useful
//      thing a student weighing an account can read: "does this actually cover
//      what my lecturer taught?"
//   2. `glossary` — term/definition pairs pulled from the notes' own
//      `definition` and `termlist` sections. This is the part answer engines
//      cite: a definitional query is what they answer best, and a definition is
//      inherently a fragment, so quoting it does not replace reading the notes.
//   3. `preview` — the prose of the first topic, capped. Enough to show the
//      notes are real and written for these students, not enough to be the
//      notes.
//
// Everything past that — the remaining topics, the figures, the worked code,
// the question banks, the flashcards, the tutor — stays gated. The account is
// what the rest is for.
//
// Both callers are async already: scripts/prerender.mjs at build time and
// CoursePublic.jsx in a React effect.

import { loadNotesFor } from './lectureNotes/index.js';
import { clip } from '../utils/text.js';

// Roughly two screens of prose. Big enough to be a real read and to carry
// several extractable sentences; small enough that it cannot stand in for the
// topic, and that it does not add meaningful weight to 14 prerendered files.
export const PREVIEW_CHAR_BUDGET = 2400;

// The cap exists for one file in particular: ENT 221 carries 309 definitions
// and 767 term-list entries, which is ~378 kB of JSON. Inlining that into an
// HTML page would make the page slower than the thing it is advertising.
export const GLOSSARY_MAX = 28;
export const GLOSSARY_DEF_CHARS = 320;

// The self-contained prose types — the ones whose meaning survives with the
// figures and listings around them removed. `note` (a callout) and `termlist`
// (term/definition pairs) qualify as much as a paragraph does; excluding them
// at first cost CYB 224 its whole preview, because its topic 1 opens on a
// `note`, and cut COS 221's to a single paragraph.
//
// Images, code, maths, tables and case studies stay out: they need the
// components LectureNotes.jsx owns, and CoursePreview is deliberately
// hook-free and build-rendered.
const PREVIEW_TYPES = new Set(['text', 'definition', 'bullets', 'note', 'termlist']);

// What the reader actually sees from one section, for budgeting.
function sectionBody(section) {
  if (section.type === 'bullets') return (section.items || []).join(' ');
  if (section.type === 'termlist') {
    return (section.items || []).map((i) => `${i.term} ${i.def}`).join(' ');
  }
  if (section.type === 'note') {
    return [section.text || '', ...(section.items || [])].join(' ');
  }
  return section.text || '';
}

// Inline maths is written as $...$ and rendered by MathText, which uses hooks
// and lazy-loads KaTeX — neither available here. Publishing the raw source
// would put "$f(x)$" on the page and, worse, into an answer engine's quote of
// it. MTH 121 loses its glossary to this; a course with no public glossary is
// better than one whose definitions read as broken markup.
const hasMath = (s) => /\$[^$]+\$/.test(String(s ?? ''));

// Note headings double as structure ("2.2.1 Differentiability") and as terms.
// A DefinedTerm named "2.1 Introduction" is noise in a knowledge graph, so the
// numbering comes off and the purely structural headings are dropped.
const STRUCTURAL = new Set([
  'introduction', 'general introduction', 'overview', 'summary', 'conclusion',
  'objectives', 'learning objectives', 'aims', 'scope', 'background', 'preamble',
  'recap', 'revision', 'exam focus', 'key takeaways', 'further reading',
]);

function cleanTerm(raw) {
  const term = String(raw ?? '').replace(/^\s*\d+(?:\.\d+)*[.)]?\s+/, '').trim();
  if (!term || term.length > 80) return null;
  if (STRUCTURAL.has(term.toLowerCase())) return null;
  return term;
}

// A definition shorter than this is a table cell, not a definition — COS 221's
// "Simple — Java is easy to learn." and COS 121's operator rows both land here.
// Published on their own they say nothing, and attributed to Areté by an answer
// engine they say something worse.
export const MIN_DEF_CHARS = 40;

function previewFrom(topic) {
  if (!topic?.sections?.length) return null;
  const kept = [];
  let used = 0;

  // A CONTIGUOUS run from the start, stopping at the first section that cannot
  // be rendered — never skipping over one to reach the next.
  //
  // Skipping published prose about things no longer on the page. COS 221's
  // topic 1 has a code listing followed by "Here, `a` first stores the value
  // `5`. Then `b` stores the text…", and with the listing gone that paragraph
  // was commentary on nothing. Lecture notes are written as a sequence in which
  // paragraphs lean on the figure or listing above them, so the only safe cut
  // is a prefix.
  for (const section of topic.sections) {
    if (!PREVIEW_TYPES.has(section.type)) break;
    const body = sectionBody(section);
    if (!body.trim()) break;
    // Maths ends the run for the same reason it is dropped from the glossary:
    // MathText loads KaTeX in an effect, effects never run under
    // renderToStaticMarkup, and the fallback it renders is the raw "$f(x)$".
    if (hasMath(body) || hasMath(section.heading)) break;
    if (used + body.length > PREVIEW_CHAR_BUDGET && kept.length) break;

    kept.push({
      type: section.type,
      heading: section.heading,
      text: section.text,
      items: section.items,
    });
    used += body.length;
    if (used >= PREVIEW_CHAR_BUDGET) break;
  }

  if (!kept.length) return null;
  // Measured against EVERY section, not just the prose ones. A topic whose
  // figures, tables and code listings were all stripped has not been shown in
  // full, and the page's caption is read by a student deciding whether an
  // account would give them anything more — so it must not claim otherwise.
  return {
    title: topic.title,
    sections: kept,
    truncated: kept.length < topic.sections.length,
  };
}

// Term/definition pairs, deduped by term. `definition` sections carry the
// heading as the term; `termlist` items already are the pair.
//
// Ordered by first appearance rather than by anything clever: the notes teach
// in a deliberate order, so the earliest terms are the foundational ones, which
// is also what a student searching a bare term most likely wants.
function glossaryFrom(notes) {
  const seen = new Set();
  const out = [];

  for (const topic of notes) {
    for (const section of topic.sections || []) {
      const pairs =
        section.type === 'definition'
          ? [{ term: section.heading, def: section.text }]
          : section.type === 'termlist'
            ? section.items || []
            : [];

      for (const { term, def } of pairs) {
        if (!term || !def) continue;
        if (hasMath(term) || hasMath(def)) continue;

        const name = cleanTerm(term);
        if (!name) continue;

        const body = String(def).replace(/\s+/g, ' ').trim();
        if (body.length < MIN_DEF_CHARS) continue;

        const key = name.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);

        out.push({
          term: name,
          definition: clip(body, GLOSSARY_DEF_CHARS),
          source: topic.title,
        });
        if (out.length >= GLOSSARY_MAX) return out;
      }
    }
  }
  return out;
}

// null when the course has no notes — most courses. Callers render nothing
// rather than an empty section promising material that does not exist.
export async function loadPublicNotes(course) {
  const notes = await loadNotesFor(course);
  if (!notes?.length) return null;

  const glossary = glossaryFrom(notes);
  const preview = previewFrom(notes[0]);
  if (!glossary.length && !preview) return null;

  return {
    topicCount: notes.length,
    outline: notes.map((t) => t.title).filter(Boolean),
    glossary,
    glossaryTruncated: glossary.length >= GLOSSARY_MAX,
    preview,
  };
}

// schema.org DefinedTermSet. The reason the glossary exists at all: a
// definitional query ("what is due care", "what is a MAN network") is the
// shape of question an answer engine answers from structured data first, and
// this is the only place on the site those definitions are public.
//
// `inDefinedTermSet` back-references the set on each term so a term lifted on
// its own still carries its provenance.
export function glossaryJsonLd(course, notes, courseUrl) {
  if (!notes?.glossary?.length) return null;
  const id = `${courseUrl}#glossary`;
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': id,
    name: `${course.code} key concepts`,
    description: `Key terms and definitions from the ${course.code} (${course.title}) lecture notes at the University of Uyo.`,
    url: id,
    inLanguage: 'en',
    hasDefinedTerm: notes.glossary.map((entry) => ({
      '@type': 'DefinedTerm',
      name: entry.term,
      description: entry.definition,
      inDefinedTermSet: id,
    })),
  };
}
