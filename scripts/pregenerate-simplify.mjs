// ============================================================================
//  Arete — Pre-generate the plain-English lecture-note rewrites
//
//  The notes are static transcriptions of the lecturer's workbook, so every
//  heading group produces the same rewrite every time. Running them once here
//  turns Simplify from a per-heading API call into bundled text: instant, free,
//  offline, and — the actual point — cheap enough to render a whole topic at
//  once behind the "Plain English" toggle. Twelve live calls in a row is not a
//  feature a student will wait through.
//
//  Writes src/data/lectureNotes/generated/<key>.simplified.json, a flat
//  { [contentHash]: rewrite } map. Content-addressed on purpose: edit a note and
//  its entry simply stops matching, so the runtime falls back to the live API
//  rather than showing a rewrite of text that is no longer on the page.
//
//  Usage:
//    node scripts/pregenerate-simplify.mjs               # fill in what's missing
//    node scripts/pregenerate-simplify.mjs --only cyb221 # one course
//    node scripts/pregenerate-simplify.mjs --force       # redo entries that exist
//    node scripts/pregenerate-simplify.mjs --dry         # count the work, call nothing
//
//  Needs GEMINI_API_KEY (or GROQ_API_KEY / OPENROUTER_API_KEY) in the
//  environment. Resumable: existing entries are kept unless --force, so an
//  interrupted run picks up where it stopped. Expect roughly an hour for a full
//  first run — Gemini's free tier is 15 requests/minute and the pacing below
//  stays under it.
// ============================================================================

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { noteLoaders } from '../src/data/lectureNotes/index.js';
import { courses } from '../src/data/courses.js';
// noteText, not simplifySection: the latter pulls in apiClient (and therefore
// React), which has no business in a build script.
import { simplifiableGroups } from '../src/utils/noteText.js';
import { SYSTEM_PROMPT } from '../api/simplify.js';
import { buildModelChain, generateTextWithFallback } from '../api/_lib/model.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'src', 'data', 'lectureNotes', 'generated');

// Just under Gemini's free-tier 15 requests/minute, with headroom for retries.
const DELAY_MS = 4500;

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const force = args.includes('--force');
const dry = args.includes('--dry');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Every source of notes, as { key, topics }. Keyed courses share one file per
// notesKey (the notes themselves are shared between departments); the four
// courses that still hold their notes inline are keyed by slug, matching
// simplifiedKeyFor() in src/data/lectureNotes/simplified.js.
async function collectSources() {
  const sources = [];
  for (const [key, load] of Object.entries(noteLoaders)) {
    sources.push({ key, topics: (await load()) ?? [] });
  }
  for (const course of courses) {
    if (!course.notesKey && course.lectureNotes?.length) {
      sources.push({ key: course.slug, topics: course.lectureNotes });
    }
  }
  return only ? sources.filter((s) => s.key === only) : sources;
}

function readExisting(key) {
  const file = join(OUT_DIR, `${key}.simplified.json`);
  if (!existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (err) {
    // A corrupt file would otherwise be silently overwritten, throwing away a
    // long run's worth of generated text.
    throw new Error(`${file} is not valid JSON — move it aside before rerunning. (${err.message})`);
  }
}

function write(key, map) {
  mkdirSync(OUT_DIR, { recursive: true });
  const file = join(OUT_DIR, `${key}.simplified.json`);
  // Sorted keys so a rerun that adds one entry produces a one-line diff rather
  // than reshuffling the whole file.
  const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(file, `${JSON.stringify(sorted, null, 2)}\n`);
}

async function simplify(chain, text, setting) {
  const outcome = await generateTextWithFallback({
    chain,
    system: SYSTEM_PROMPT,
    prompt: `${setting ? `Course context: ${setting}\n\n` : ''}Lecture-note excerpt:\n\n${text}`,
    maxOutputTokens: 1400,
    temperature: 0.4,
    // Keep in step with api/simplify.js — Gemini 3.5 Flash otherwise spends
    // hidden thinking out of this same budget and truncates the rewrite.
    providerOptions: { google: { thinkingConfig: { thinkingBudget: 0, includeThoughts: false } } },
  });
  if (outcome.text) return outcome.text;
  throw outcome.error ?? new Error('no text returned');
}

async function main() {
  const chain = dry ? [] : buildModelChain('light');
  if (!dry && chain.length === 0) {
    console.error('No model provider key set (GEMINI_API_KEY / GROQ_API_KEY / OPENROUTER_API_KEY).');
    process.exit(1);
  }

  const sources = await collectSources();
  if (sources.length === 0) {
    console.error(only ? `No notes found for "${only}".` : 'No note sources found.');
    process.exit(1);
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const { key, topics } of sources) {
    const map = force ? {} : readExisting(key);
    const pending = [];

    for (const topic of topics) {
      for (const group of simplifiableGroups(topic)) {
        if (map[group.hash]) { skipped++; continue; }
        pending.push({ ...group, topicTitle: topic.title });
      }
    }

    if (pending.length === 0) {
      console.log(`${key}: up to date`);
      continue;
    }
    if (dry) {
      console.log(`${key}: ${pending.length} to generate`);
      generated += pending.length;
      continue;
    }

    console.log(`${key}: generating ${pending.length}…`);
    for (const [i, group] of pending.entries()) {
      try {
        map[group.hash] = await simplify(chain, group.text, `${key} — ${group.topicTitle}`);
        generated++;
      } catch (err) {
        // Keep going: one bad group must not cost the rest of the run, and the
        // runtime falls back to the live API for anything missing here.
        failed++;
        console.warn(`  ! ${group.heading?.slice(0, 60) ?? group.hash}: ${err?.message ?? err}`);
      }
      // Written every time, so an interrupted run keeps everything so far.
      write(key, map);
      if (i < pending.length - 1) await sleep(DELAY_MS);
    }
    console.log(`${key}: done (${Object.keys(map).length} entries)`);
  }

  console.log(
    dry
      ? `\nDry run: ${generated} groups would be generated, ${skipped} already present.`
      : `\nGenerated ${generated}, skipped ${skipped} already present, ${failed} failed.`,
  );
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
