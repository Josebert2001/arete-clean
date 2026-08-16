// Validates the module data for every track.
// Catches the kind of typos that would silently break a quiz or playground —
// out-of-range correctIndex, missing fields, duplicate ids, broken numbering.
// Runs automatically before `npm run build` via the `prebuild` script.

import { modules } from '../src/data/modules.js';
import { pythonModules } from '../src/data/pythonModules.js';
import { cModules } from '../src/data/cModules.js';
import { securityModules } from '../src/data/securityModules.js';
import { trackMeta } from '../src/data/trackMeta.js';
import { courses as cybersecurityCourses } from '../src/data/courses.js';
import { courses as dataScienceCourses } from '../src/data/dataScienceCourses.js';

// Every department catalogue, so the course checks below cover all of them.
// A new department must be added here too — otherwise its courses are silently
// skipped by the prebuild validator (see CLAUDE.md → Adding a department).
const catalogues = [
  { department: 'cybersecurity', courses: cybersecurityCourses },
  { department: 'dataScience',   courses: dataScienceCourses },
];

const tracks = [
  { name: 'java',     modules },
  { name: 'python',   modules: pythonModules },
  { name: 'c',        modules: cModules },
  { name: 'security', modules: securityModules },
];

const isHex64 = (v) => typeof v === 'string' && /^[0-9a-f]{64}$/.test(v);
const VALID_MATERIAL_TYPES = new Set(['code', 'terminal', 'text', 'table']);

const errors = [];
const warnings = [];
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const check = (cond, msg) => { if (!cond) errors.push(msg); };

// ── The "longest option is the answer" tell ──────────────────────────────────
// An MCQ bank is worthless if the correct option can be picked by length alone,
// and it happens without anyone intending it: the correct answer gets written as
// a careful, complete, hedged definition while the distractors are quick
// throwaway wrong answers, so the right one ends up visibly the longest.
//
// Measured Aug 2026, the catalogue sat at 62% strictly-longest across 1,505
// questions — chance is 25% with four options — and UUY-CYB 222 at 74%, meaning
// a student could score ~79% on it knowing no security at all.
//
// Rebalancing 900+ questions at once is not realistic, so this is a ratchet:
// banks listed below are held to the threshold and fail the build if they drift
// back; every other bank reports a warning, so the remaining work stays visible
// instead of being forgotten. Add a course code here once its bank is balanced.
const LENGTH_BALANCED_BANKS = new Set(['UUY-CYB 222']);

// Chance is 1/options. 0.40 leaves real headroom above the 0.25 four-option
// baseline: this exists to catch a bank sliding back, not to police the noise in
// an honest one.
const LONGEST_ANSWER_MAX_RATE = 0.40;

// A bank can sit under that rate and still contain one question whose answer is
// unmissable, so the individual case is bounded too.
const LONGEST_ANSWER_MAX_GAP = 25;

for (const { name, modules: list } of tracks) {
  const where = (m, suffix) => `[${name}] module "${m?.id ?? '?'}" (#${m?.number ?? '?'}): ${suffix}`;

  if (!Array.isArray(list) || list.length === 0) {
    errors.push(`[${name}] modules export is empty or not an array`);
    continue;
  }

  const ids = new Set();
  const numbers = new Set();

  for (const m of list) {
    check(isNonEmptyString(m.id),                                  where(m, 'id missing'));
    check(typeof m.number === 'number',                            where(m, 'number missing or not a number'));
    check(isNonEmptyString(m.title),                               where(m, 'title missing'));
    check(isNonEmptyString(m.subtitle),                            where(m, 'subtitle missing'));
    check(typeof m.difficulty === 'number' && m.difficulty >= 1 && m.difficulty <= 5,
          where(m, `difficulty must be 1-5 (got ${m.difficulty})`));
    check(typeof m.estimatedHours === 'number' && m.estimatedHours > 0,
          where(m, `estimatedHours must be > 0 (got ${m.estimatedHours})`));

    if (ids.has(m.id))     errors.push(where(m, `duplicate id "${m.id}"`));
    if (numbers.has(m.number)) errors.push(where(m, `duplicate number ${m.number}`));
    ids.add(m.id);
    numbers.add(m.number);

    check(Array.isArray(m.theory) && m.theory.length > 0, where(m, 'theory must be a non-empty array'));
    (m.theory || []).forEach((t, ti) => {
      check(isNonEmptyString(t?.heading), where(m, `theory[${ti}].heading missing`));
      check(isNonEmptyString(t?.body),    where(m, `theory[${ti}].body missing`));
    });

    check(Array.isArray(m.codeExamples) && m.codeExamples.length > 0,
          where(m, 'codeExamples must be a non-empty array'));
    (m.codeExamples || []).forEach((ex, ei) => {
      check(isNonEmptyString(ex?.title),       where(m, `codeExamples[${ei}].title missing`));
      check(isNonEmptyString(ex?.code),        where(m, `codeExamples[${ei}].code missing`));
      check(isNonEmptyString(ex?.explanation), where(m, `codeExamples[${ei}].explanation missing`));
    });

    check(Array.isArray(m.practiceQuestions) && m.practiceQuestions.length > 0,
          where(m, 'practiceQuestions must be a non-empty array'));
    (m.practiceQuestions || []).forEach((q, qi) => {
      const at = `practiceQuestions[${qi}]`;
      check(isNonEmptyString(q?.question),                where(m, `${at}.question missing`));
      check(Array.isArray(q?.options) && q.options.length >= 2,
            where(m, `${at}.options must have at least 2 entries`));
      check(typeof q?.correctIndex === 'number',          where(m, `${at}.correctIndex missing`));
      if (Array.isArray(q?.options) && typeof q?.correctIndex === 'number') {
        check(q.correctIndex >= 0 && q.correctIndex < q.options.length,
              where(m, `${at}.correctIndex out of range (got ${q.correctIndex}, ${q.options.length} options)`));
      }
      (q?.options || []).forEach((opt, oi) => {
        check(isNonEmptyString(opt), where(m, `${at}.options[${oi}] empty`));
      });
      check(isNonEmptyString(q?.explanation), where(m, `${at}.explanation missing`));
    });

    check(m.miniProject && typeof m.miniProject === 'object', where(m, 'miniProject missing'));
    if (m.miniProject) {
      check(isNonEmptyString(m.miniProject.title),       where(m, 'miniProject.title missing'));
      check(isNonEmptyString(m.miniProject.description), where(m, 'miniProject.description missing'));
      check(Array.isArray(m.miniProject.hints) && m.miniProject.hints.length > 0,
            where(m, 'miniProject.hints must be a non-empty array'));
      (m.miniProject.hints || []).forEach((h, hi) => {
        check(isNonEmptyString(h), where(m, `miniProject.hints[${hi}] empty`));
      });
    }

    // Security-track CTF challenge (optional field). If present, the flag hash
    // must be a valid SHA-256 hex string or the challenge can never be solved.
    if (m.challenge) {
      const c = m.challenge;
      check(isNonEmptyString(c.title), where(m, 'challenge.title missing'));
      check(isNonEmptyString(c.brief), where(m, 'challenge.brief missing'));
      check(isHex64(c.flagHash), where(m, `challenge.flagHash must be a 64-char SHA-256 hex string (got "${c.flagHash}")`));
      check(isNonEmptyString(c.writeup), where(m, 'challenge.writeup missing'));
      check(Array.isArray(c.hints) && c.hints.length > 0, where(m, 'challenge.hints must be a non-empty array'));
      (c.hints || []).forEach((h, hi) => {
        check(isNonEmptyString(h), where(m, `challenge.hints[${hi}] empty`));
      });
      check(Array.isArray(c.material) && c.material.length > 0, where(m, 'challenge.material must be a non-empty array'));
      (c.material || []).forEach((b, bi) => {
        check(b && VALID_MATERIAL_TYPES.has(b.type),
              where(m, `challenge.material[${bi}].type must be one of ${[...VALID_MATERIAL_TYPES].join(', ')} (got "${b?.type}")`));
        if (b?.type === 'table') {
          check(Array.isArray(b.columns) && b.columns.length > 0, where(m, `challenge.material[${bi}] (table) needs columns`));
          check(Array.isArray(b.rows) && b.rows.length > 0, where(m, `challenge.material[${bi}] (table) needs rows`));
          (b.rows || []).forEach((row, ri) => {
            check(Array.isArray(row) && row.length === (b.columns || []).length,
                  where(m, `challenge.material[${bi}] (table) row ${ri} has ${row?.length} cells, expected ${(b.columns || []).length}`));
          });
        } else {
          check(isNonEmptyString(b?.content), where(m, `challenge.material[${bi}].content missing`));
        }
      });
    }
  }

  // numbers should be 1..N sequential
  const sorted = [...numbers].sort((a, b) => a - b);
  sorted.forEach((n, i) => {
    if (n !== i + 1) errors.push(`[${name}] module numbering broken: expected ${i + 1} at position ${i}, got ${n}`);
  });
}

// trackMeta.moduleIndex is a lightweight copy of id/number/title used by pages
// that must not bundle the full module content. Make sure it never drifts.
for (const { name, modules: list } of tracks) {
  const meta = trackMeta[name];
  if (!meta || !Array.isArray(meta.moduleIndex)) {
    errors.push(`[${name}] trackMeta is missing a moduleIndex array`);
    continue;
  }
  if (meta.moduleIndex.length !== list.length) {
    errors.push(`[${name}] trackMeta.moduleIndex has ${meta.moduleIndex.length} entries but there are ${list.length} modules`);
    continue;
  }
  list.forEach((m, i) => {
    const idx = meta.moduleIndex[i];
    if (idx.id !== m.id || idx.number !== m.number || idx.title !== m.title) {
      errors.push(`[${name}] trackMeta.moduleIndex[${i}] (${idx.id} #${idx.number} "${idx.title}") does not match module (${m.id} #${m.number} "${m.title}")`);
    }
  });
}

for (const { department, courses } of catalogues) {
  // A duplicate slug silently shadows a course: /courses/:slug resolves to
  // whichever entry comes first and the other becomes unreachable. Cheap to
  // check, and the likeliest mistake in a hand-authored catalogue.
  //
  // Codes are deliberately NOT checked — courses.js repeats CYB 311/312/313 on
  // purpose (each is both a taught course and a SIWES placement), which is why
  // slugs, not codes, are the unique key. findCourseEntry() in
  // api/_lib/courseData.js resolves that ambiguity for the tutor.
  const seenSlugs = new Set();
  for (const c of courses) {
    if (seenSlugs.has(c.slug)) errors.push(`[${department}] duplicate course slug "${c.slug}"`);
    seenSlugs.add(c.slug);
  }

  // Some courses ship a practice-quiz bank (course.quiz). Students pick how many
  // questions to draw, so there is no fixed count — but every question must still
  // be well-formed, with an in-range correctIndex, or a quiz could break silently.
  for (const c of courses) {
    if (!c.quiz) continue;
    const where = (qi, suffix) => `[${department}] course ${c.code ?? c.slug ?? '?'} quiz[${qi}]: ${suffix}`;
    if (!Array.isArray(c.quiz) || c.quiz.length === 0) {
      errors.push(`[${department}] course ${c.code ?? c.slug}: quiz must be a non-empty array`);
      continue;
    }
    c.quiz.forEach((q, qi) => {
      check(isNonEmptyString(q?.question), where(qi, 'question missing'));
      check(Array.isArray(q?.options) && q.options.length >= 2,
            where(qi, 'options must have at least 2 entries'));
      check(typeof q?.correctIndex === 'number', where(qi, 'correctIndex missing'));
      if (Array.isArray(q?.options) && typeof q?.correctIndex === 'number') {
        check(q.correctIndex >= 0 && q.correctIndex < q.options.length,
              where(qi, `correctIndex out of range (got ${q.correctIndex}, ${q.options.length} options)`));
      }
      (q?.options || []).forEach((opt, oi) => {
        check(isNonEmptyString(opt), where(qi, `options[${oi}] empty`));
      });
      check(isNonEmptyString(q?.explanation), where(qi, 'explanation missing'));
    });

    // See LENGTH_BALANCED_BANKS above for why this is a ratchet rather than a
    // flat rule. Only well-formed questions are measured — a malformed one has
    // already raised its own error and would skew the rate.
    const measurable = c.quiz.filter(
      (q) => Array.isArray(q?.options) && q.options.length > 1
        && typeof q?.correctIndex === 'number'
        && q.options.every(isNonEmptyString)
        && q.correctIndex >= 0 && q.correctIndex < q.options.length
    );
    if (measurable.length > 0) {
      const ratcheted = LENGTH_BALANCED_BANKS.has(c.code);
      let longest = 0;
      measurable.forEach((q, qi) => {
        const lens = q.options.map((o) => o.trim().length);
        const correct = lens[q.correctIndex];
        const bestDistractor = Math.max(...lens.filter((_, oi) => oi !== q.correctIndex));
        // Strictly longest — a tie gives the student nothing to go on.
        if (correct > bestDistractor) longest += 1;
        if (ratcheted && correct - bestDistractor > LONGEST_ANSWER_MAX_GAP) {
          errors.push(where(qi,
            `correct option is ${correct - bestDistractor} chars longer than the longest distractor ` +
            `(max ${LONGEST_ANSWER_MAX_GAP}) — it can be picked by length alone`));
        }
      });
      const rate = longest / measurable.length;
      const summary =
        `${c.code ?? c.slug}: correct option is strictly the longest in ` +
        `${longest}/${measurable.length} questions (${Math.round(rate * 100)}%)`;
      if (ratcheted && rate > LONGEST_ANSWER_MAX_RATE) {
        errors.push(`[${department}] ${summary} — exceeds ${Math.round(LONGEST_ANSWER_MAX_RATE * 100)}%; ` +
                    'the bank is answerable by length alone');
      } else if (!ratcheted && rate > LONGEST_ANSWER_MAX_RATE) {
        warnings.push(`[${department}] ${summary} — not yet rebalanced`);
      }
    }
  }

  // Courses examined on paper ship a written-exam bank (course.examPrep) instead
  // of, or alongside, the MCQ bank. It is deliberately NOT validated as a quiz:
  // a written question has no options and no correctIndex. The checks that matter
  // here are that each mark scheme's per-point marks add up to the question's
  // stated total — the component derives the student's self-marked score from
  // those trailing "(2)" values, so a scheme that doesn't balance silently makes
  // full marks unreachable — and that a recall drill has one item per mark.
  for (const c of courses) {
    if (!c.examPrep) continue;
    const where = (qi, suffix) => `[${department}] course ${c.code ?? c.slug ?? '?'} examPrep[${qi}]: ${suffix}`;
    if (!Array.isArray(c.examPrep) || c.examPrep.length === 0) {
      errors.push(`[${department}] course ${c.code ?? c.slug}: examPrep must be a non-empty array`);
      continue;
    }
    c.examPrep.forEach((q, qi) => {
      check(['longform', 'recall'].includes(q?.type),
            where(qi, `type must be 'longform' or 'recall' (got ${JSON.stringify(q?.type)})`));
      check(isNonEmptyString(q?.question), where(qi, 'question missing'));
      check(isNonEmptyString(q?.source), where(qi, 'source missing — students need the section to re-read'));
      check(typeof q?.marks === 'number' && q.marks > 0, where(qi, 'marks must be a positive number'));

      if (q?.type === 'longform') {
        check(isNonEmptyString(q?.modelAnswer), where(qi, 'modelAnswer missing'));
        check(Array.isArray(q?.markScheme) && q.markScheme.length > 0,
              where(qi, 'markScheme must be a non-empty array'));
        let total = 0;
        let parseable = true;
        (q?.markScheme || []).forEach((point, pi) => {
          check(isNonEmptyString(point), where(qi, `markScheme[${pi}] empty`));
          const m = String(point).match(/\(([0-9.]+)\)\s*$/);
          if (!m) {
            parseable = false;
            errors.push(where(qi, `markScheme[${pi}] must end with its mark value in parentheses, e.g. "… (2)"`));
          } else {
            total += parseFloat(m[1]);
          }
        });
        if (parseable && typeof q?.marks === 'number') {
          check(Math.abs(total - q.marks) < 0.001,
                where(qi, `markScheme totals ${total} but the question is worth ${q.marks}`));
        }
      }

      if (q?.type === 'recall') {
        check(Array.isArray(q?.items) && q.items.length > 0,
              where(qi, 'items must be a non-empty array'));
        if (Array.isArray(q?.items) && typeof q?.marks === 'number') {
          check(q.items.length === q.marks,
                where(qi, `recall drills score a mark per item — ${q.items.length} items but marks is ${q.marks}`));
        }
        (q?.items || []).forEach((item, ii) => {
          check(isNonEmptyString(item?.name), where(qi, `items[${ii}].name missing`));
          check(isNonEmptyString(item?.explain), where(qi, `items[${ii}].explain missing`));
          check(item?.aliases === undefined || Array.isArray(item.aliases),
                where(qi, `items[${ii}].aliases must be an array when present`));
        });
      }
    });
  }
}

// Warnings never fail the build — they mark work that is known and outstanding,
// so printing them before the errors would bury the thing that actually broke.
if (warnings.length > 0) {
  console.warn(`\n! ${warnings.length} warning${warnings.length === 1 ? '' : 's'}:\n`);
  for (const w of warnings) console.warn(`  · ${w}`);
  console.warn('');
}

if (errors.length > 0) {
  console.error(`\n✗ Module validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):\n`);
  for (const e of errors) console.error(`  · ${e}`);
  console.error('');
  process.exit(1);
}

const total = tracks.reduce((sum, t) => sum + t.modules.length, 0);
const courseTotal = catalogues.reduce((sum, c) => sum + c.courses.length, 0);
console.log(
  `✓ Module data OK (${total} modules across ${tracks.length} tracks; ` +
  `${courseTotal} courses across ${catalogues.length} department catalogues).`
);
