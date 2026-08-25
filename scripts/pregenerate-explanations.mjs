// ============================================================================
//  Arete — Pre-generate the code walkthroughs
//
//  The practical listings are static authored content, so every one produces the
//  same explanation every time. Running them once here turns "Explain this code"
//  from a live API call into bundled text: instant, free, offline, and — the
//  actual point — not subject to a rate limit a whole class shares. The
//  explainer allows 8 requests per ten minutes per IP, and a hall on campus WiFi
//  is one IP; the ninth student to ask on revision night is told the AI is busy.
//
//  Writes src/data/lectureNotes/generated/<key>.explained.json, a flat
//  { [contentHash]: explanation } map, beside the .simplified.json files and
//  keyed the same way (notesKey, else slug). Content-addressed on purpose: edit
//  a listing and its entry simply stops matching, so the runtime falls back to
//  the live API rather than showing a walkthrough of code that has changed.
//
//  Both modes are generated, because both are offered in the UI:
//    · walkthrough — notes listings, and exam-prep model answers
//    · study       — exam-prep question stems, where the verdict is withheld
//
//  Usage:
//    node scripts/pregenerate-explanations.mjs               # fill in what's missing
//    node scripts/pregenerate-explanations.mjs --only cyb221 # one course
//    node scripts/pregenerate-explanations.mjs --force       # redo entries that exist
//    node scripts/pregenerate-explanations.mjs --dry         # count the work, call nothing
//
//  Needs GEMINI_API_KEY (or GROQ_API_KEY / OPENROUTER_API_KEY) in the
//  environment; buildModelChain puts Gemini first. Resumable: existing entries
//  are kept unless --force, so an interrupted run picks up where it stopped.
// ============================================================================

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { noteLoaders } from '../src/data/lectureNotes/index.js';
import { courses } from '../src/data/courses.js';
import { courses as dataScienceCourses } from '../src/data/dataScienceCourses.js';
import { listingsInTopic, listingsInExamPrep } from '../src/utils/explainCode.js';
import { SYSTEM_PROMPT, STUDY_SYSTEM_PROMPT, buildExplainPrompt } from '../api/explainer.js';
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

// Every listing a student can ask about, grouped by the key its file lives
// under. A course contributes its notes (shared via notesKey, so two
// departments' entries land in one file) and its own exam bank. Deduplicated by
// hash, since the same shared notes are reached through several courses.
async function collectSources() {
  const byKey = new Map();

  const add = (key, listings) => {
    if (!key || listings.length === 0) return;
    const bucket = byKey.get(key) ?? new Map();
    for (const listing of listings) {
      if (!bucket.has(listing.hash)) bucket.set(listing.hash, listing);
    }
    byKey.set(key, bucket);
  };

  for (const course of [...courses, ...dataScienceCourses]) {
    const key = course.notesKey || course.slug;
    const topics = course.notesKey
      ? (await noteLoaders[course.notesKey]?.()) ?? []
      : course.lectureNotes ?? [];
    for (const topic of topics) add(key, listingsInTopic(topic));
    add(key, listingsInExamPrep(course.examPrep));
  }

  const sources = [...byKey.entries()].map(([key, bucket]) => ({
    key,
    listings: [...bucket.values()],
  }));
  return only ? sources.filter((s) => s.key === only) : sources;
}

function readExisting(key) {
  const file = join(OUT_DIR, `${key}.explained.json`);
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
  const file = join(OUT_DIR, `${key}.explained.json`);
  // Sorted keys so a rerun that adds one entry produces a one-line diff rather
  // than reshuffling the whole file.
  const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(file, `${JSON.stringify(sorted, null, 2)}\n`);
}

// The same system prompt and user prompt the endpoint would have used, so the
// bundled text is indistinguishable from a live answer.
async function explain(chain, listing) {
  const study = listing.mode === 'study';
  const outcome = await generateTextWithFallback({
    chain,
    system: study ? STUDY_SYSTEM_PROMPT : SYSTEM_PROMPT,
    prompt: buildExplainPrompt(listing.code, listing.language, listing.mode),
    maxOutputTokens: 6000,
    temperature: 0.5,
    // Must match api/explainer.js's call exactly — bundled text has to be the
    // same answer the endpoint would give. Gemini 3.5 Flash spends hidden
    // reasoning tokens out of maxOutputTokens by default (measured ~900 on one
    // listing), which was cutting real answers short; this listing needs no
    // multi-step reasoning to explain.
    providerOptions: { google: { thinkingConfig: { thinkingBudget: 0, includeThoughts: false } } },
  });
  if (outcome.text) return outcome.text;
  throw outcome.error ?? new Error('no text returned');
}

async function main() {
  const chain = dry ? [] : buildModelChain('strong');
  if (!dry && chain.length === 0) {
    console.error('No model provider key set (GEMINI_API_KEY / GROQ_API_KEY / OPENROUTER_API_KEY).');
    process.exit(1);
  }

  const sources = await collectSources();
  if (sources.length === 0) {
    console.error(only ? `No listings found for "${only}".` : 'No listings found.');
    process.exit(1);
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const { key, listings } of sources) {
    const map = force ? {} : readExisting(key);
    const pending = listings.filter((l) => {
      if (map[l.hash]) { skipped++; return false; }
      return true;
    });

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
    for (const [i, listing] of pending.entries()) {
      try {
        map[listing.hash] = await explain(chain, listing);
        generated++;
      } catch (err) {
        // Keep going: one bad listing must not cost the rest of the run, and the
        // runtime falls back to the live API for anything missing here.
        failed++;
        console.warn(`  ! ${listing.mode} · ${listing.label?.slice(0, 60) ?? listing.hash}: ${err?.message ?? err}`);
      }
      // Written every time, so an interrupted run keeps everything so far.
      write(key, map);
      if (i < pending.length - 1) await sleep(DELAY_MS);
    }
    console.log(`${key}: done (${Object.keys(map).length} entries)`);
  }

  console.log(
    dry
      ? `\nDry run: ${generated} listings would be generated, ${skipped} already present.`
      : `\nGenerated ${generated}, skipped ${skipped} already present, ${failed} failed.`,
  );
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
