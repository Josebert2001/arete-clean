// Turning lecture-note data into words a voice can say.
//
// Deliberately dependency-free — no React, no fetch, no browser globals — so a
// pre-generation script can import it under plain Node, exactly like the
// noteText.js it sits beside. Everything here is a pure function over section
// objects.
//
// ── Why this is not noteText.js ─────────────────────────────────────────────
// noteText.js serialises notes for a LANGUAGE MODEL, and its output is right for
// that: it emits `math` as raw LaTeX (a model reads \dfrac{1}{3} fine), `code`
// as a fenced block, and `table` as `A | B | A and B` pipe rows. Handed to a
// speech engine those become "backslash dee-frac open brace one close brace",
// "backtick backtick backtick", and "A bar B bar A and B" — the audio version of
// the raw-TeX defect publicNotes.js documents at length. Same sections, two
// consumers, opposite needs.
//
// It is also a separate file rather than an extra mode on noteText.js because
// that module's output is CONTENT-HASHED into the Simplify and Explain caches
// (hashText → generated/*.simplified.json, *.explained.json). Changing one
// character of what it emits makes every pre-generated entry miss and silently
// fall back to a live API call.
//
// ── The three rules that matter ─────────────────────────────────────────────
// 1. SKIPPED CONTENT IS ANNOUNCED, NEVER SILENTLY DROPPED. Lecture prose leans
//    on the thing above it — "Here, `a` first stores the value 5…" is commentary
//    on a listing. Drop the listing without a word and the next sentence is
//    commentary on nothing. publicNotes.js solved the same problem for text with
//    a contiguous-prefix rule; audio cannot take a prefix (the student asked for
//    the whole topic), so the spoken marker is the equivalent safeguard.
// 2. MARKERS DO NOT COUNT AS CONTENT. `speakableCharCount` counts body prose
//    only — no markers, no headings — because nine real topics are almost
//    entirely listings and would otherwise clear any length gate on the strength
//    of their own "code listing on screen" markers. See MIN_NARRATE_CHARS.
// 3. MATHS IS INLINE, NOT JUST A SECTION TYPE. 205 `text`/`bullets`/`definition`
//    sections carry $...$ spans inside their prose — MTH 121 is built from them
//    and COS 221 uses them too. Handling only `type: 'math'` leaves "dollar
//    backslash frac open brace d y" in the middle of an otherwise fine sentence,
//    which is the same defect as rendering raw TeX, just audible. See
//    mathToSpeech.

import { buildOutline, hashText } from './noteText.js';

// Section types that carry speakable prose. Everything else is either announced
// as a marker (code/math/table/image/mosca) or silently dropped (resource — it
// is a download link, and buildOutline already treats it as not-prose).
//
// This set is also what speakableCharCount measures, so it is the definition the
// MIN_NARRATE_CHARS floor is calibrated against — keep them in step.
const SPEAKABLE_TYPES = new Set([
  'text', 'definition', 'bullets', 'termlist', 'fivers', 'note', 'casestudy', 'proscons',
]);

// Below this a topic is listings with a sentence of glue, and narrating it
// produces a few seconds of "code listing on screen" repeated. Nine topics in
// the corpus sit here — COS 121's "Arrays and Lists" carries 74 chars of prose
// around its listings. They already have the button they want, and it is Code
// Walkthrough, not Listen.
//
// A length floor rather than a type rule, mirroring canSimplifyGroup: the
// substance can arrive in any mix of types, so the only question that matters is
// how much of it came out.
export const MIN_NARRATE_CHARS = 400;

// Words per second at a typical 150wpm narration. Only an estimate — Option A
// (Web Speech) never learns a real duration, and pre-rendered audio overwrites
// it with the encoded file's true length.
const WORDS_PER_SECOND = 2.5;

// ── Maths ───────────────────────────────────────────────────────────────────
//
// Not a LaTeX-to-speech engine, and deliberately not trying to be. It covers the
// shapes that actually appear in these notes and REFUSES everything else, because
// a wrong reading of an equation is worse than being told to look at the screen.
// `complete: false` is the refusal, and the caller turns it into a spoken marker.

const MATH_COMMANDS = [
  [/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '$1 over $2'],
  [/\\sqrt\s*\{([^{}]*)\}/g, 'the square root of $1'],
  [/\\sqrt\b/g, 'the square root'],
  [/\\int\b/g, 'the integral'],
  [/\\sum\b/g, 'the sum'],
  [/\\times\b/g, ' times '],
  [/\\div\b/g, ' divided by '],
  [/\\cdot\b/g, ' times '],
  [/\\pm\b/g, ' plus or minus '],
  [/\\leq?\b/g, ' is less than or equal to '],
  [/\\geq?\b/g, ' is greater than or equal to '],
  [/\\neq\b/g, ' is not equal to '],
  [/\\approx\b/g, ' is approximately '],
  [/\\infty\b/g, 'infinity'],
  [/\\ldots|\\cdots|\\dots/g, ' and so on'],
  [/\\(alpha|beta|gamma|delta|theta|lambda|mu|sigma|phi|pi|omega)\b/g, '$1'],
  [/\\(?:left|right|,|;|!|quad|qquad)/g, ' '],
  [/\\text\s*\{([^{}]*)\}/g, '$1'],
];

// "squared"/"cubed" are a reading of the WHOLE exponent, so the exponent has to
// be identified before it can be named. Matching a bare `2` wherever it followed
// a caret read `I^2R` as "I squaredR" and `2^256` as "2 squared56" — and the
// latter with `complete: true`, so the refusal above could not catch it.
//
// The two shapes are LaTeX's own: braces take everything inside them, and an
// unbraced caret takes exactly one character (`I^2R` is I²R, not I to the 2R).
function powerPhrase(exponent) {
  const e = exponent.trim();
  if (e === '2') return ' squared ';
  if (e === '3') return ' cubed ';
  return ` to the power ${e} `;
}

const POWERS = [
  [/\^\s*\{([^{}]+)\}/g, (_m, exp) => powerPhrase(exp)],
  [/\^\s*([A-Za-z0-9])/g, (_m, exp) => powerPhrase(exp)],
];

/**
 * One LaTeX fragment → spoken words.
 *
 * @returns {{ speech: string, complete: boolean }} `complete: false` means a
 *   construct was left that this does not cover; the caller must announce the
 *   expression rather than read the result.
 */
export function mathToSpeech(tex) {
  let s = String(tex ?? '').trim();
  if (!s) return { speech: '', complete: true };

  for (const [re, to] of MATH_COMMANDS) s = s.replace(re, to);
  for (const [re, to] of POWERS) s = s.replace(re, to);

  s = s
    .replace(/_\s*\{([^{}]+)\}/g, ' sub $1')
    .replace(/_\s*([A-Za-z0-9]+)/g, ' sub $1')
    // "f(x)" → "f of x", the single commonest shape in MTH 121. Only after a
    // lone letter, so "(a + b)" stays a bracket rather than becoming "of".
    .replace(/\b([A-Za-z])\s*\(\s*([^()]{1,12})\s*\)/g, '$1 of $2')
    .replace(/\s*=\s*/g, ' equals ')
    .replace(/\s*\+\s*/g, ' plus ')
    // Only a binary minus: a leading "-3" stays "minus 3" too, which is right,
    // but "x-axis" must not become "x minus axis".
    .replace(/(\d|\))\s*-\s*(?=[\dA-Za-z(])/g, '$1 minus ')
    .replace(/\s*\/\s*/g, ' over ');

  // Anything still carrying LaTeX structure is beyond this translator. `|` is in
  // the list because it is a delimiter with several meanings here (absolute
  // value, set-builder, a stray table pipe) and guessing wrong reads as
  // nonsense — announce instead.
  const complete = !/[\\{}^_|]/.test(s);

  return { speech: s.replace(/\s+/g, ' ').trim(), complete };
}

// Inline $...$ spans inside otherwise ordinary prose. $$...$$ is matched first
// so a display block is not read as two empty inline spans.
//
// The inline arm allows newlines — bounded to 200 chars so an unmatched `$`
// cannot swallow half a topic. A span wrapping a line break is real in these
// notes (MTH 121 writes conditions for continuity across two lines), and the
// earlier single-line rule left both of its `$` behind as strays.
const INLINE_MATH = /\$\$([\s\S]+?)\$\$|\$([^$]{1,200}?)\$/g;

/**
 * Replaces every $...$ span in a prose string with spoken words, or with an
 * announcement where mathToSpeech refuses.
 *
 * @returns {{ text: string, skipped: Array<{ kind: string, label: string }> }}
 */
function convertInlineMath(text) {
  const skipped = [];
  if (!text || !text.includes('$')) return { text: String(text ?? ''), skipped };

  const out = String(text).replace(INLINE_MATH, (match, display, inline) => {
    const { speech, complete } = mathToSpeech(display ?? inline);
    if (complete && speech) return speech;
    const label = 'an expression on screen';
    skipped.push({ kind: 'math', label });
    return label;
  });

  return { text: out, skipped };
}

// ── Pronunciation ───────────────────────────────────────────────────────────

// Read as individual letters. A generic engine says "ozzy" for OSI and "skwal"
// for SQL, which is not what a UniUyo lecturer says and not what the student
// will hear in the exam hall.
//
// Matched case-sensitively and on word boundaries, so "MAC address" is spelled
// out while "Mac" and the MAC inside "MACROS" are left alone.
const SAY_AS_LETTERS = [
  // Networking
  'OSI', 'TCP', 'UDP', 'IP', 'DNS', 'DHCP', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'MAC', 'NAT',
  'VLAN', 'DMZ', 'VPN', 'LAN', 'WAN', 'SIP', 'STUN', 'TURN', 'ICE',
  // Security
  'CIA', 'IDS', 'IPS', 'SIEM', 'DLP', 'XSS', 'CSRF', 'SSRF', 'JWT', 'PKI', 'TLS', 'SSL',
  'AES', 'DES', 'RSA', 'ECC', 'SHA', 'MD5', 'HSM', 'KMS', 'MFA', 'RBAC', 'DAC', 'ABAC',
  'OWASP', 'CVE', 'CVSS', 'APT', 'IOC', 'OSINT', 'CSPM', 'SAST', 'DAST',
  // Data, law, standards
  'GDPR', 'NDPR', 'NDPA', 'NIST', 'ISO', 'SQL', 'ETL', 'OLAP', 'OLTP', 'ER',
  // Programming
  'JVM', 'JDBC', 'OOP', 'CRUD', 'API', 'REST', 'GUI', 'IDE', 'HTML', 'CSS', 'XML', 'JSON',
  // Hardware / IoT
  'CPU', 'RAM', 'ROM', 'HDD', 'SSD', 'BIOS', 'MQTT',
  // Metrics and Nigerian institutions
  'FAR', 'FRR', 'EER', 'ALE', 'ARO', 'SLE', 'RTO', 'RPO', 'SDLC', 'UML', 'UAT',
  'SIWES', 'NYSC', 'GST', 'CAC', 'EFCC', 'ITF',
];

// Longest first so HTTPS is never matched as HTTP followed by a stray S.
const LETTERS_RE = new RegExp(
  `\\b(${[...SAY_AS_LETTERS].sort((a, b) => b.length - a.length).join('|')})\\b`,
  'g',
);

// Slash pairs read as "slash" otherwise, which is not how anyone says TCP/IP.
const SLASH_PAIRS = /\b([A-Z]{2,6})\/([A-Z0-9]{2,6})\b/g;

// Expanded rather than spelled: read as letters these are wrong, read as written
// they are worse.
const PHRASES = [
  [/\be\.g\.,?/gi, 'for example,'],
  [/\bi\.e\.,?/gi, 'that is,'],
  [/\betc\.?/gi, 'and so on'],
  [/\bvs\.?\b/gi, 'versus'],
  [/\bFig\.\s*/gi, 'Figure '],
  [/\bNo\.\s*(?=\d)/g, 'number '],
  [/\bIoT\b/g, 'I o T'],
  [/\bVoIP\b/g, 'voice over I P'],
  [/\bCoAP\b/g, 'co app'],
  [/&/g, ' and '],
  // Real currency, not maths — CYB 122 quotes breach losses as "$500,000".
  // Must run before the structural strip below, which would otherwise drop the
  // symbol and leave a bare number.
  //
  // The abbreviated scales are not optional extras: the corpus writes "$3.4M"
  // and "$234K" (cyb122.js) far more often than it spells the word out, and
  // knowing only the words left the letter stranded on the wrong side of the
  // unit — "3.4 dollarsM". The letters need the lookahead so a genuine word
  // starting with one ("$25 million", "$40 billed") cannot be read as a scale.
  // The whitespace lives INSIDE the optional group so that a number followed by
  // an ordinary word ("$25 million" vs "$40 billed monthly") does not have its
  // separating space eaten on the way to not matching a scale.
  [/\$\s?([\d,.]+)(?:\s*(?:(million|billion|trillion|thousand|bn)|([mkbt])(?![a-z])))?/gi,
    (_m, n, word, letter) => {
      const spelled = word?.toLowerCase();
      const scale = (spelled === 'bn' ? 'billion' : spelled)
        ?? { m: 'million', k: 'thousand', b: 'billion', t: 'trillion' }[letter?.toLowerCase()];
      return `${n}${scale ? ` ${scale}` : ''} dollars`;
    }],
];

/**
 * Rewrites a speech string so a synthesiser pronounces this curriculum's
 * vocabulary correctly. Applied to spoken text ONLY — never to anything
 * displayed, which must keep reading "OSI".
 */
export function applyPronunciation(text) {
  if (!text) return '';
  let out = String(text);

  // Markdown residue first: ** and ` are read aloud as "star star" / "backtick"
  // by some engines and as nothing by others. Strip rather than gamble.
  out = out
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/[*`_]/g, ' ');

  for (const [re, to] of PHRASES) out = out.replace(re, to);

  // Before the single-acronym pass, so both halves survive as letters.
  out = out.replace(SLASH_PAIRS, (m, a, b) => `${a} ${b}`);
  out = out.replace(LETTERS_RE, (m) => m.split('').join(' '));

  // Structural leftovers, dropped rather than spoken. Two things reach here and
  // both are better silent. Prose that DISCUSSES a symbol already carries the
  // words — COS 221 writes "the curly braces {" and "the currency symbol ($)",
  // so the meaning survives losing the character. And a stray delimiter from an
  // unbalanced span is an authoring slip a student should never hear read out as
  // "dollar" or "open brace".
  //
  // Deliberately last: convertInlineMath and the currency rule above have
  // already claimed everything here that carries meaning.
  //
  // The lone backslash in the character class is not redundant with the named-
  // command alternative in front of it. COS 221's "Java String API" topic
  // teaches escape sequences and prints `\\` and `\t` as prose, and a Windows
  // path in a CYB 123 example does the same — none of those are followed by a
  // run of letters, so a command-only strip left them to be read as "backslash".
  out = out.replace(/\\[a-zA-Z]+|[\\${}^|]/g, ' ');

  // Collapse the whitespace all of the above introduces, and the orphaned
  // punctuation a dropped symbol can leave behind ("( )." → ".").
  return out
    .replace(/\(\s*\)/g, ' ')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Assembly helpers ────────────────────────────────────────────────────────

// A voice pauses on punctuation and runs straight on without it, so every piece
// that is joined to another has to end in something.
function endSentence(value) {
  const s = String(value ?? '').trim();
  if (!s) return '';
  return /[.!?:;]$/.test(s) ? s : `${s}.`;
}

function join(parts) {
  return parts.map(endSentence).filter(Boolean).join(' ');
}

function itemToText(item) {
  if (item && typeof item === 'object') {
    // "Term — definition" becomes "Term. Definition." — the dash is invisible to
    // a voice, the full stop is the pause that separates the two.
    return item.def ? `${endSentence(item.term)} ${item.def}` : String(item.term ?? '');
  }
  return String(item ?? '');
}

function listToText(items) {
  return Array.isArray(items) ? join(items.map(itemToText)) : '';
}

// Spoken language name for a code marker. Returned as-is where the acronym pass
// will letter-space it (HTML, CSS, XML).
const LANGUAGE_LABEL = {
  java: 'Java',
  python: 'Python',
  c: 'C',
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  xml: 'XML',
  sql: 'SQL',
  text: '',
};

function lineCount(code) {
  return String(code ?? '').replace(/\n+$/, '').split('\n').length;
}

// ── One section ─────────────────────────────────────────────────────────────

/**
 * @param {Object} section a lecture-note section
 * @returns {{ speech: string, prose: string, skipped: Array<{kind, label}> }}
 *   `speech` is everything to say, heading and markers included. `prose` is the
 *   body content only — no heading, no markers — and is what the
 *   MIN_NARRATE_CHARS floor measures. `skipped` is what the UI captions as
 *   "3 code listings skipped".
 */
export function sectionToSpeech(section) {
  if (!section) return { speech: '', prose: '', skipped: [] };

  const heading = section.heading ? endSentence(section.heading) : '';

  // Body prose, with any inline maths converted or announced. The heading is
  // NOT part of `prose`: a heading is a label, and counting it would let a
  // topic of listings clear the narration floor on its own section titles.
  const spoken = (body) => {
    const { text, skipped } = convertInlineMath(body);
    return { speech: join([heading, text]), prose: text, skipped };
  };

  const marker = (kind, label) => ({
    speech: join([heading, label]),
    prose: '',
    skipped: [{ kind, label }],
  });

  switch (section.type) {
    case 'text':
    case 'definition':
      return spoken(String(section.text ?? ''));

    case 'bullets':
    case 'termlist':
    case 'fivers':
      return spoken(listToText(section.items));

    case 'note':
      // Prefixed so the listener hears the change of register that the box
      // around it conveys on screen.
      return spoken(join(['Note', String(section.text ?? ''), listToText(section.items)]));

    case 'casestudy':
      return spoken(join([
        // The note files key this as `title`, the four inline-note courses as
        // `heading` — both shapes are real, so accept both.
        String(section.title ?? ''),
        String(section.prompt ?? ''),
        ...(Array.isArray(section.tasks) ? section.tasks.map((t, i) => `Task ${i + 1}. ${t}`) : []),
      ]));

    case 'proscons':
      return spoken(join([
        Array.isArray(section.advantages) && section.advantages.length
          ? `Advantages. ${join(section.advantages)}` : '',
        Array.isArray(section.disadvantages) && section.disadvantages.length
          ? `Disadvantages. ${join(section.disadvantages)}` : '',
      ]));

    // ── Announced, never read verbatim ───────────────────────────────────────

    case 'code': {
      // `language: 'output'` is a program's output, not a listing — the same
      // distinction ExplainCode makes when it refuses to offer a walkthrough on
      // one. Calling it a code listing would send the student looking for code
      // that is not there.
      if (section.language === 'output') {
        return marker('output', 'Program output on screen');
      }
      const label = LANGUAGE_LABEL[section.language] ?? '';
      const n = lineCount(section.code);
      return marker(
        'code',
        `Code listing on screen${label ? ` — ${label}` : ''}, ${n} line${n === 1 ? '' : 's'}`,
      );
    }

    case 'math': {
      // NEVER emit section.tex raw. Short, covered expressions are spoken;
      // anything mathToSpeech will not vouch for is announced instead.
      const { speech, complete } = mathToSpeech(section.tex);
      const caption = section.caption ? ` ${endSentence(section.caption)}` : '';
      if (complete && speech && speech.length <= 120) {
        const body = `${speech}.${caption}`;
        return { speech: join([heading, body]), prose: '', skipped: [] };
      }
      return marker('math', section.caption
        ? `An equation on screen — ${section.caption}`
        : 'An equation on screen');
    }

    case 'table': {
      // The headers are short and genuinely orienting; the rows are not. A truth
      // table read aloud is "F bar F bar F bar T" and tells nobody anything.
      const headers = Array.isArray(section.headers) ? section.headers.filter(Boolean) : [];
      return marker('table', headers.length
        ? `A table on screen comparing ${headers.join(', ')}`
        : 'A table on screen');
    }

    case 'image': {
      // The caption is authored prose and worth hearing; the picture is not
      // describable. Counted as a marker rather than content so a figure-heavy
      // topic cannot clear the narration floor on captions alone.
      const caption = section.caption || section.alt || '';
      return marker('image', caption ? `Figure. ${caption}` : 'A figure on screen');
    }

    case 'mosca':
      return marker('widget', 'An interactive calculator on screen');

    // `resource` is a download link, not prose — buildOutline already treats it
    // as standalone for the same reason. Nothing to announce mid-listen.
    default:
      return { speech: '', prose: '', skipped: [] };
  }
}

// ── A whole topic ───────────────────────────────────────────────────────────

/**
 * Splits a topic into the units playback actually works in: one per heading
 * group, which is what buildOutline already produces. That gives the player a
 * chapter list and skip controls for free, instead of one unskippable
 * twelve-minute blob.
 *
 * Order is buildOutline's order, always. A unit that produced no speech at all
 * is dropped rather than played as silence.
 *
 * @returns {Array<{ id: string, hash: string, heading: string, speech: string,
 *   proseChars: number, charCount: number, estimatedSeconds: number,
 *   skipped: Array<{ kind: string, label: string }> }>}
 */
export function topicToSpeechUnits(topic) {
  const units = [];

  for (const [index, item] of buildOutline(topic?.sections).entries()) {
    const sections = item.head ? [item.head, ...(item.tail ?? [])] : [item.standalone];

    const speechParts = [];
    const skipped = [];
    let proseChars = 0;

    for (const section of sections) {
      const result = sectionToSpeech(section);
      if (result.speech) speechParts.push(result.speech);
      skipped.push(...result.skipped);
      if (SPEAKABLE_TYPES.has(section?.type)) proseChars += result.prose.length;
    }

    const speech = applyPronunciation(speechParts.join(' '));
    if (!speech) continue;

    const words = speech.split(/\s+/).length;
    units.push({
      id: `unit-${index}`,
      // Content-addressed, so a pre-rendered audio file for this unit is invalid
      // the moment the note changes — the same guarantee *.simplified.json and
      // *.explained.json already rely on.
      hash: hashText(speech),
      heading: item.head?.heading ?? '',
      speech,
      proseChars,
      charCount: speech.length,
      estimatedSeconds: Math.round(words / WORDS_PER_SECOND),
      skipped,
    });
  }

  return units;
}

/** The whole topic as one string — the generation input for pre-rendered audio. */
export function topicToSpeechText(topic) {
  const title = topic?.title ? applyPronunciation(endSentence(topic.title)) : '';
  const body = topicToSpeechUnits(topic).map((u) => u.speech).join(' ');
  return [title, body].filter(Boolean).join(' ');
}

/**
 * Genuine body prose only — no markers, no headings, which is the entire point.
 * Measured on the same section set MIN_NARRATE_CHARS was calibrated against.
 */
export function speakableCharCount(topic) {
  return topicToSpeechUnits(topic).reduce((sum, u) => sum + u.proseChars, 0);
}

/** Whether to offer a Listen button for this topic at all. */
export function canNarrate(topic) {
  if (!topic?.sections?.length) return false;
  return speakableCharCount(topic) >= MIN_NARRATE_CHARS;
}

/** Flattened skip counts for a topic, for the "what you'll miss" caption. */
export function skippedSummary(topic) {
  const counts = {};
  for (const unit of topicToSpeechUnits(topic)) {
    for (const s of unit.skipped) counts[s.kind] = (counts[s.kind] ?? 0) + 1;
  }
  return counts;
}

// Singular/plural wording for each `skipped.kind` sectionToSpeech emits. It
// lives here rather than in the player so the wording and the kinds it describes
// cannot drift apart — a kind added above with no entry here is silently
// dropped from the caption rather than printed as a raw key.
const SKIP_LABELS = {
  code: ['code listing', 'code listings'],
  output: ['output block', 'output blocks'],
  math: ['equation', 'equations'],
  table: ['table', 'tables'],
  image: ['figure', 'figures'],
  widget: ['interactive panel', 'interactive panels'],
};

/**
 * { code: 12, table: 1 } → { text: '12 code listings and 1 table', total: 13 }
 *
 * The list punctuation and the number agreement are both easy to get subtly
 * wrong, and both end up in front of every student who opens a practical.
 */
export function describeSkips(counts) {
  const entries = Object.entries(counts ?? {}).filter(([kind]) => SKIP_LABELS[kind]);
  const total = entries.reduce((sum, [, n]) => sum + n, 0);
  const parts = entries.map(([kind, n]) => `${n} ${SKIP_LABELS[kind][n === 1 ? 0 : 1]}`);

  if (parts.length === 0) return { text: '', total: 0 };
  const text = parts.length === 1
    ? parts[0]
    : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
  return { text, total };
}
