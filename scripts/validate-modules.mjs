// Validates the module data for every track.
// Catches the kind of typos that would silently break a quiz or playground —
// out-of-range correctIndex, missing fields, duplicate ids, broken numbering.
// Runs automatically before `npm run build` via the `prebuild` script.

import { modules } from '../src/data/modules.js';
import { pythonModules } from '../src/data/pythonModules.js';
import { cModules } from '../src/data/cModules.js';

const tracks = [
  { name: 'java',   modules },
  { name: 'python', modules: pythonModules },
  { name: 'c',      modules: cModules },
];

const errors = [];
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const check = (cond, msg) => { if (!cond) errors.push(msg); };

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
  }

  // numbers should be 1..N sequential
  const sorted = [...numbers].sort((a, b) => a - b);
  sorted.forEach((n, i) => {
    if (n !== i + 1) errors.push(`[${name}] module numbering broken: expected ${i + 1} at position ${i}, got ${n}`);
  });
}

if (errors.length > 0) {
  console.error(`\n✗ Module validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):\n`);
  for (const e of errors) console.error(`  · ${e}`);
  console.error('');
  process.exit(1);
}

const total = tracks.reduce((sum, t) => sum + t.modules.length, 0);
console.log(`✓ Module data OK (${total} modules across ${tracks.length} tracks).`);
