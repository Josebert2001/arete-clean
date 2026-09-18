// ─── Speaking a lecture-note topic aloud ─────────────────────────────────────
// Drives window.speechSynthesis over the units speechText.js produces. No
// network, no API key, no bytes on the student's data bundle — the voice is the
// one already on their device.
//
// Everything awkward in here is a browser defect, not a design choice. Five of
// them, each of which silently breaks playback if unhandled:
//
//   1. getVoices() returns [] on the first call in Chrome. Voices arrive later
//      on a `voiceschanged` event, so a hook that reads once at mount picks no
//      voice at all for the first session.
//   2. Chrome stops an utterance at roughly 15 seconds with no error and no
//      `end` event the caller can distinguish from success. The fix is to never
//      hand it an utterance that long — see chunkSpeech.
//   3. iOS Safari refuses the first speak() unless it happens inside a user
//      gesture, so nothing here may be called from an effect on mount.
//   4. Mobile browsers suspend synthesis when the screen locks or the tab goes
//      to the background. That one is NOT fixable — it is the defined behaviour
//      of the API and the entire reason the pre-rendered-audio option exists
//      (docs/audio-playback-plan.md §4.3). We detect it and say so, because a
//      voice that just stops is exactly the silent failure the project rules
//      forbid — and then we try to carry on, because a student who never
//      pressed pause is waiting for the next sentence, not for a notice.
//   5. A chunk can die without the queue ever being told. Chrome reports
//      `interrupted` when something outside the page takes the audio, and
//      sometimes reports nothing at all — the engine simply wedges. Either way
//      the chain below stops dead while the bar still says Pause. Hence the
//      stall watchdog (see `armStall`), which is the only thing that can tell
//      a chunk still being read from one that will never end.
//
// cancel() is the other sharp edge: it fires `end` on some browsers and `error`
// on others, both asynchronously, so a stale callback can advance the queue of a
// playback run that is already over. Every callback is therefore gated on a run
// id (see `runRef`) — and because every internal cancel bumps that id BEFORE
// calling cancel(), an `interrupted` still carrying the current id is by
// definition not ours. That is what makes landmine 5 detectable at all.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// The speeds the control bar offers. Declared here because the chunk budget
// below is derived from the slowest of them.
export const SPEECH_RATES = [0.75, 1, 1.25, 1.5];

// Chrome's ~15s cut-off at a normal 150wpm is about 220 characters, and 200
// leaves headroom AT RATE 1.
//
// The cut-off is a duration, not a length, so a SLOWER rate makes a chunk of
// the same text run LONGER — 200 characters at 0.75× is about 20 seconds, well
// past it. (An earlier comment here claimed the opposite, which is how the cap
// came to ignore rate at all.)
//
// So the budget is set for the slowest rate offered rather than recomputed per
// playback. Rebuilding the queue when the speed changes was the alternative, and
// it is worse: `cursorRef` is an index INTO the queue, so re-chunking mid-topic
// silently moves the playback position. A few extra chunks at 1× costs one more
// `onend` hop each, which is the mechanism the queue already runs on.
const MAX_CHUNK_CHARS = Math.floor(200 * Math.min(...SPEECH_RATES));

// A full stop that is not the end of a sentence. The prose here really does
// contain "Prof. Ntiedo J. Umoren and Sunday S. Akpan, Ph.D." (ENT 221) and
// "13.2 Java String Methods" (COS 221), and splitting inside either produces a
// hard stop mid-name. Decimals need no rule — "2.1" has no space after the dot,
// so the sentence split never sees it as a boundary.
const NOT_SENTENCE_END = /(?:\s[A-Z]|\b(?:Prof|Dr|Mr|Mrs|Ms|St|Vol|No|Ch|Sec|Inc|Ltd|Ph\.D))\.$/;

// …except that the lone-capital arm above cannot tell an initial from the LAST
// letter of an acronym, and applyPronunciation manufactures those by the
// hundred: it runs before chunking, so "…carried over TCP." arrives here as
// "…carried over T C P." and "P." reads as an initial. 463 sentence ends in the
// corpus look like that, and every one of them lost its pause.
//
// An initial is a single capital standing alone ("Ntiedo J."); a spelled
// acronym is at least two in a row. So: two or more single capitals running up
// to the dot means the sentence really has ended.
const SPELLED_ACRONYM_END = /(?:\b[A-Z]\s){1,}[A-Z]\.$/;

function isSentenceEnd(text) {
  if (SPELLED_ACRONYM_END.test(text)) return true;
  return !NOT_SENTENCE_END.test(text);
}

const VOICE_PREF_KEY = 'arete:speech:voice';
const RATE_PREF_KEY = 'arete:speech:rate';
const AWAKE_PREF_KEY = 'arete:speech:awake';


// Consecutive failed chunks before we stop and say so. One is ordinary — the
// next sentence usually synthesises fine. Three in a row is the voice itself.
const MAX_ERROR_STREAK = 3;

// ── Landmine 5: the chunk that never ends ────────────────────────────────────
//
// One retry of a chunk that was cut, then we stop and say so. Saying a sentence
// again that the student only half-heard is the right trade; saying it forever
// is not.
const MAX_CHUNK_RETRIES = 1;

// Words per second at a typical 150wpm narration — the same figure speechText.js
// estimates a topic's length with. Used here only to budget how long a chunk may
// go without an event before we call it dead.
const WORDS_PER_SECOND = 2.5;
const AVG_WORD_CHARS = 5.5;

// Getting a cold engine talking is not instant, so the first budget of a chunk
// carries this on top of the chunk's own estimate. `onstart` replaces it.
const START_GRACE_MS = 2500;

// Chrome and Edge fire `onboundary` once per word, which is a liveness signal a
// wedged engine cannot fake: while they are arriving, four seconds of silence
// already means the voice is gone. Safari fires none, so a chunk that has never
// produced one falls back to the whole-chunk budget instead.
const BOUNDARY_SILENCE_MS = 4000;

/** How long a chunk may run before silence means something is wrong. */
function stallBudget(chars, rate) {
  const words = Math.max(1, chars / AVG_WORD_CHARS);
  const expected = (words / (WORDS_PER_SECOND * Math.max(rate, 0.1))) * 1000;
  // 1.6× covers a voice slower than the estimate; the flat three seconds covers
  // a short chunk, where the multiplier alone leaves almost no margin.
  return Math.round(expected * 1.6) + 3000;
}

// `onboundary` reports `charLength` on Chrome and Edge, but older builds and
// some Android WebViews send a word boundary with no length at all — so the
// caption needs its own way to find where the word ends. Scanning to the next
// whitespace is exactly what the engine itself just did to find the word.
function wordLengthAfter(text, index) {
  const start = Math.max(0, index);
  let end = start;
  while (end < text.length && !/\s/.test(text[end])) end += 1;
  return Math.max(1, end - start);
}

/**
 * `text.split(/(?<=[chars])\s+/)` without the lookbehind.
 *
 * Deliberately not a regex. A lookbehind is an early SyntaxError on engines that
 * do not implement it — thrown when the module is PARSED, not when the function
 * is called — and iOS Safari only shipped them in 16.4. LectureNotes imports
 * this file, so the two lookbehinds that used to be here would have taken the
 * whole lecture-note renderer down on an older iPhone, not merely hidden the
 * Listen button. There is no browserslist here and Vite's default target still
 * lists safari14, so nothing in the build would have caught it either.
 *
 * Splits at each whitespace run that follows one of `chars`, dropping the
 * whitespace, exactly as the lookbehind form did.
 */
function splitAfterChars(text, chars) {
  const parts = [];
  let start = 0;

  for (let i = 0; i < text.length; i += 1) {
    if (!chars.includes(text[i])) continue;

    let end = i + 1;
    while (end < text.length && /\s/.test(text[end])) end += 1;
    if (end === i + 1) continue; // no whitespace followed — not a boundary

    parts.push(text.slice(start, i + 1));
    start = end;
    i = end - 1;
  }

  parts.push(text.slice(start));
  return parts;
}

/**
 * Splits one unit's speech into utterance-sized pieces.
 *
 * Exported for its own test: the sentence rules are the kind of thing that looks
 * obviously right and is obviously wrong on real data.
 */
export function chunkSpeech(text, maxChars = MAX_CHUNK_CHARS) {
  const source = String(text ?? '').trim();
  if (!source) return [];

  // Split on sentence enders, then glue back anything that followed an
  // abbreviation rather than a real full stop.
  const sentences = [];
  for (const piece of splitAfterChars(source, '.!?')) {
    const previous = sentences[sentences.length - 1];
    if (previous && !isSentenceEnd(previous)) {
      sentences[sentences.length - 1] = `${previous} ${piece}`;
    } else {
      sentences.push(piece);
    }
  }

  const chunks = [];
  let current = '';

  const flush = () => {
    if (current.trim()) chunks.push(current.trim());
    current = '';
  };

  for (const sentence of sentences) {
    if (sentence.length > maxChars) {
      // One sentence longer than a whole chunk — break it at commas, and then,
      // if a fragment is still oversized, at whitespace. Never mid-word: a
      // synthesiser reading half a word is worse than a slightly long chunk.
      flush();
      for (const fragment of splitLongSentence(sentence, maxChars)) chunks.push(fragment);
      continue;
    }
    if (current && current.length + sentence.length + 1 > maxChars) flush();
    current = current ? `${current} ${sentence}` : sentence;
  }
  flush();

  return chunks;
}

function splitLongSentence(sentence, maxChars) {
  const out = [];
  let current = '';

  const parts = splitAfterChars(sentence, ',');
  for (const part of parts) {
    if (part.length > maxChars) {
      if (current.trim()) { out.push(current.trim()); current = ''; }
      let words = '';
      for (const word of part.split(/\s+/)) {
        if (words && words.length + word.length + 1 > maxChars) { out.push(words); words = ''; }
        words = words ? `${words} ${word}` : word;
      }
      if (words) out.push(words);
      continue;
    }
    if (current && current.length + part.length + 1 > maxChars) { out.push(current.trim()); current = ''; }
    current = current ? `${current} ${part}` : part;
  }
  if (current.trim()) out.push(current.trim());

  return out;
}

/**
 * Picks the best available voice.
 *
 * Nigerian English first — these are University of Uyo students, and a voice
 * that shares their accent reads the material as they hear it in a lecture
 * theatre. British English is the next best approximation; American is the
 * furthest, so it is only reached as a general `en` fallback.
 *
 * Exported for its own test.
 */
export function pickVoice(voices, preferredName) {
  const list = Array.isArray(voices) ? voices : [];
  if (list.length === 0) return null;

  if (preferredName) {
    const saved = list.find((v) => v.name === preferredName);
    if (saved) return saved;
  }

  const english = list.filter((v) => /^en([-_]|$)/i.test(v.lang || ''));
  return (
    english.find((v) => /^en[-_]NG/i.test(v.lang))
    || english.find((v) => /^en[-_]GB/i.test(v.lang))
    || english.find((v) => v.default)
    || english[0]
    || list.find((v) => v.default)
    || list[0]
    || null
  );
}

// Exported for the player's own preferences — the follow-the-voice toggle lives
// in ListenToTopic, not here, and a second copy of this try/catch is exactly the
// kind of thing that drifts.
export function readSpeechPref(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw;
  } catch {
    // Storage disabled or private mode — preferences just do not persist.
    return fallback;
  }
}

export function writeSpeechPref(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Quota or disabled storage; nothing to do and nothing worth surfacing.
  }
}

const synth = () => (typeof window !== 'undefined' ? window.speechSynthesis : null);

// ── Who owns the device ──────────────────────────────────────────────────────
//
// speechSynthesis is ONE global object, but there is one useSpeech per open
// topic: LectureNotes keeps a Set of open accordions, so a student reading with
// three topics expanded has three of these hooks mounted, each holding a cancel()
// that stops everything.
//
// That made collapsing an unrelated topic kill the audio of the one actually
// playing. The dead run's utterance came back as `error: 'interrupted'`, which
// the queue deliberately ignores, so the player was never told: its bar sat
// there showing Pause with nothing coming out — the exact silent failure the
// header comment above says this file exists to prevent.
//
// So cancel() is not a thing any instance may just call. An instance claims the
// device before it speaks, and only the claimant may cancel. Claiming also
// stands the previous owner down, which is what makes pressing Listen on a
// second topic reset the first one's bar instead of leaving two bars both
// claiming to be playing.
let deviceOwner = null; // { id, standDown }

function claimDevice(id, standDown) {
  if (deviceOwner && deviceOwner.id !== id) deviceOwner.standDown();
  deviceOwner = { id, standDown };
}

function releaseDevice(id) {
  if (deviceOwner?.id === id) deviceOwner = null;
}

function ownsDevice(id) {
  return deviceOwner?.id === id;
}

// cancel() does NOT clear the global paused flag (verified in Chrome: pause()
// then cancel() leaves speechSynthesis.paused true), and speak() on a paused
// synth queues the utterance without speaking it. So every cancel-then-speak
// path has to lift the pause, or playback after Pause → Next / Pause → close →
// Listen is silent while the UI shows a running player.
function resetDevice(api) {
  if (!api) return;
  api.cancel();
  if (api.paused) api.resume?.();
}

let nextDeviceId = 0;

// Chrome and Safari have both been seen dropping an utterance that no JavaScript
// reference points at any more: the audio stops mid-sentence and NO event fires,
// which from the queue's side is indistinguishable from a chunk still being
// read. Holding the live one costs nothing and is the documented workaround.
//
// Write-only on purpose: the reference IS the feature, and the lint rule cannot
// see a use that exists only to keep an object reachable.
// eslint-disable-next-line no-unused-vars -- see above
let liveUtterance = null;

/**
 * @param {Array} units  from topicToSpeechUnits(topic). Identity does not
 *   matter — the queue is keyed on unit CONTENT (see `signature`), so a caller
 *   that rebuilds the array every render does not restart playback.
 * @param {Object} [options]
 * @param {boolean} [options.keepAwake]  hold a screen wake lock while playing.
 *   Helps the "resting my eyes" case; does nothing for a locked phone.
 * @param {Function} [options.onFinished]  called when the last unit ends, with
 *   `true` only if the whole topic played start to finish with no skipping.
 *   Never called after stop(). The flag is what lets a caller treat finishing
 *   the audio as proof of attention — see LectureNotes' read marking.
 */
export function useSpeech(units, { onFinished } = {}) {
  // The VALUE, not just the key: `'speechSynthesis' in window` is true for a
  // property that exists and is undefined, which is what a test double or a
  // stripped-down webview leaves behind.
  const supported = typeof window !== 'undefined' && Boolean(window.speechSynthesis);

  const [status, setStatus] = useState('idle'); // idle | playing | paused | ended
  const [unitIndex, setUnitIndex] = useState(0);
  const [voices, setVoices] = useState([]);
  const [voiceName, setVoiceName] = useState(() => readSpeechPref(VOICE_PREF_KEY, ''));
  const [rate, setRateState] = useState(() => Number(readSpeechPref(RATE_PREF_KEY, '1')) || 1);
  const [keepAwake, setKeepAwakeState] = useState(() => readSpeechPref(AWAKE_PREF_KEY, '0') === '1');
  // True when the browser suspended us rather than the student pausing — the UI
  // needs to say which, or a phone-lock stop looks like a bug.
  const [interrupted, setInterrupted] = useState(false);
  // The device could not synthesise at all — a different message from the
  // screen-lock one, and a different remedy (try another voice).
  const [failed, setFailed] = useState(false);
  // The chunk currently being spoken, and (Chrome/Edge only — Safari fires no
  // `boundary` event at all) the word inside it the engine just reached. This
  // is the utterance's OWN text, after chunking and pronunciation — never
  // re-derived from the displayed note — so what lights up is always exactly
  // what is heard, with no mapping between the two to keep in sync. `start:
  // -1` means the chunk has started but no word boundary has arrived yet.
  const [caption, setCaption] = useState(null);

  // Keyed on CONTENT, not array identity. `topicToSpeechUnits(topic)` called in
  // a component body returns a fresh array every render, and keying the queue on
  // that made the "new topic" reset below fire on every render — so play() set
  // status to 'playing', the re-render rebuilt the array, and the reset put it
  // straight back to 'idle'. Pushing the memo burden onto every caller would
  // have been one forgotten useMemo away from the same bug in production.
  //
  // `hash` comes from topicToSpeechUnits and is a short djb2, so this is cheap;
  // the speech text is only the fallback for a hand-built unit.
  const signature = (units ?? []).map((u) => u?.hash ?? u?.speech ?? '').join('\u0000');

  const queue = useMemo(() => {
    const out = [];
    (units ?? []).forEach((unit, i) => {
      for (const text of chunkSpeech(unit.speech)) out.push({ text, unitIndex: i });
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, see above
  }, [signature]);

  const runRef = useRef(0);        // invalidates callbacks from a cancelled run
  const cursorRef = useRef(0);     // index into `queue`
  const pausedRef = useRef(false);
  const wakeLockRef = useRef(null);
  const spokeRef = useRef(0);            // chunks this run actually finished
  const errorStreakRef = useRef(0);      // consecutive synthesis failures
  const wakeLockGenRef = useRef(0);      // invalidates an in-flight request()
  // Generation of the in-flight request(), or -1 when none. A plain boolean
  // could not tell a live request from one already invalidated by a release.
  const wakeLockPendingGenRef = useRef(-1);
  // This instance's claim on the one global speechSynthesis — see claimDevice.
  const [deviceId] = useState(() => { nextDeviceId += 1; return nextDeviceId; });
  // True while the current run has played straight through from unit 0. Any
  // skip clears it, which is what stops "skip to the end" from counting as
  // having listened to the topic.
  const cleanRunRef = useRef(false);
  // Landmine 5: the watchdog on the chunk in flight, and how many times we have
  // already tried to re-speak that same chunk after it was cut.
  const stallRef = useRef(null);
  const retryRef = useRef({ index: -1, tries: 0 });
  // `status` as a ref, for the event handlers that would otherwise close over a
  // stale value (visibilitychange in particular fires long after its effect ran).
  const statusRef = useRef(status);
  useEffect(() => { statusRef.current = status; }, [status]);
  // Whether the page went away mid-playback, so the visibility handler knows
  // there is anything to check when it comes back.
  const hiddenWhilePlayingRef = useRef(false);
  // Held in a ref so a caller that passes a fresh arrow every render does not
  // rebuild the whole speak chain. Written in an effect, never during render.
  const finishedRef = useRef(onFinished);
  useEffect(() => { finishedRef.current = onFinished; }, [onFinished]);

  // speakFrom recurses to reach the next chunk. Going through a ref rather than
  // naming itself inside its own useCallback keeps the chain pointing at the
  // latest closure — otherwise a voice or rate change mid-topic would leave the
  // in-flight chain calling a stale one.
  const speakFromRef = useRef(null);

  // ── Landmine 1: voices arrive asynchronously ──────────────────────────────
  useEffect(() => {
    if (!supported) return undefined;
    const api = synth();

    const read = () => {
      const list = api.getVoices() || [];
      if (list.length) setVoices(list);
    };

    read();
    api.addEventListener?.('voiceschanged', read);
    return () => api.removeEventListener?.('voiceschanged', read);
  }, [supported]);

  const voice = useMemo(() => pickVoice(voices, voiceName), [voices, voiceName]);

  // ── Wake lock (opt-in) ────────────────────────────────────────────────────
  // request() is async, so a release that lands while one is in flight would
  // otherwise be a no-op against a null ref and the lock would arrive afterwards
  // with nobody holding it — the screen then stays on, with nothing playing,
  // until the tab closes. The generation counter is what the resolved request
  // checks itself against before keeping the lock it was handed.
  const releaseWakeLock = useCallback(() => {
    wakeLockGenRef.current += 1;
    wakeLockRef.current?.release?.().catch(() => {});
    wakeLockRef.current = null;
  }, []);

  const acquireWakeLock = useCallback(async () => {
    if (!keepAwake || wakeLockRef.current) return;
    const gen = wakeLockGenRef.current;
    // Only a request for the CURRENT generation blocks a new one. A pending
    // request that a release has already invalidated is destined for the bin,
    // and letting it block meant a pause-then-immediate-resume left playback
    // with no lock at all: the resume bailed out here, and the old request then
    // released the lock it was finally handed.
    if (wakeLockPendingGenRef.current === gen) return;
    wakeLockPendingGenRef.current = gen;
    try {
      const lock = await navigator.wakeLock.request('screen');
      if (gen !== wakeLockGenRef.current) {
        // Released while we were waiting — this lock is already unwanted.
        lock?.release?.().catch(() => {});
        return;
      }
      wakeLockRef.current = lock;
    } catch {
      // Unsupported, denied, or the document is not visible. Playback is
      // unaffected — the screen just dims on its own schedule.
      wakeLockRef.current = null;
    } finally {
      if (wakeLockPendingGenRef.current === gen) wakeLockPendingGenRef.current = -1;
    }
  }, [keepAwake]);

  const setKeepAwake = useCallback((value) => {
    setKeepAwakeState(value);
    writeSpeechPref(AWAKE_PREF_KEY, value ? '1' : '0');
  }, []);

  // Turning it on mid-topic should take effect now, not at the next play().
  useEffect(() => {
    if (keepAwake && statusRef.current === 'playing') acquireWakeLock();
    if (!keepAwake) releaseWakeLock();
  }, [keepAwake, acquireWakeLock, releaseWakeLock]);

  // Another topic's player has taken the device. Reset OUR state only: the new
  // owner is about to cancel and speak, and cancelling here would cut off the
  // audio it is in the middle of starting. Without this a student who pressed
  // Listen on a second topic was left looking at two control bars, both showing
  // Pause, only one of them connected to any sound.
  const standDown = useCallback(() => {
    runRef.current += 1;
    pausedRef.current = false;
    cursorRef.current = 0;
    if (stallRef.current !== null) { clearTimeout(stallRef.current); stallRef.current = null; }
    setStatus('idle');
    setUnitIndex(0);
    setInterrupted(false);
    setFailed(false);
    setCaption(null);
    releaseWakeLock();
  }, [releaseWakeLock]);

  // Held in a ref so the callback the module registry keeps can never be a stale
  // closure, the same reason finishedRef exists below.
  const standDownRef = useRef(standDown);
  useEffect(() => { standDownRef.current = standDown; }, [standDown]);
  const notifyStandDown = useCallback(() => standDownRef.current?.(), []);

  // ── The queue ─────────────────────────────────────────────────────────────

  const clearStall = useCallback(() => {
    if (stallRef.current !== null) {
      clearTimeout(stallRef.current);
      stallRef.current = null;
    }
  }, []);

  const speakFrom = useCallback((index, run) => {
    const api = synth();
    if (!api || run !== runRef.current) return;

    clearStall();

    const item = queue[index];
    if (!item) {
      releaseWakeLock();

      // Reaching the end having spoken NOTHING is a failure wearing a finish's
      // clothes. A one- or two-chunk topic whose every utterance errors never
      // reaches MAX_ERROR_STREAK, so without this the bar showed an ordinary
      // completed listen and the student was left to guess why it was silent.
      if (spokeRef.current === 0 && errorStreakRef.current > 0) {
        pausedRef.current = true;
        cursorRef.current = 0;
        setStatus('paused');
        setFailed(true);
        // Whatever chunk got as far as onstart before it errored must not go on
        // looking like it is still being read under a notice saying the device
        // could not play the audio.
        setCaption(null);
        finishedRef.current?.(false);
        return;
      }

      setStatus('ended');
      // errorStreakRef is reset to 0 by onend and only ever incremented by
      // onerror, so still carrying a nonzero value here means the LAST chunk
      // attempted errored rather than finished — its onstart set the caption,
      // but no matching onend ever confirmed it was actually heard. Earlier
      // chunks may well have played cleanly (spokeRef.current > 0, so this is
      // not the "spoke nothing" branch above), but the caption is left naming
      // a sentence that was, in fact, skipped.
      if (errorStreakRef.current > 0) setCaption(null);
      // The flag matters twice over. A caller that marks the topic read off this
      // must not be fooled by a student who pressed skip until the end, NOR by a
      // device whose voice failed on every chunk: those errors advance the queue
      // too, so without spokeRef the whole topic drained in milliseconds and
      // reported a complete, clean listen with nothing ever played.
      finishedRef.current?.(cleanRunRef.current && spokeRef.current > 0);
      return;
    }

    cursorRef.current = index;
    setUnitIndex(item.unitIndex);

    const utterance = new window.SpeechSynthesisUtterance(item.text);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    // Left at the browser default deliberately: pitch and volume are the
    // student's system preferences, not ours to override.
    liveUtterance = utterance; // landmine 5: out of the collector's reach

    // Landmine 5. Two ways a chunk dies without the chain below being told, and
    // they want opposite answers:
    //
    //   it had started — something cut it (an OS notification, another app
    //     taking the audio, the engine wedging). Say the chunk again: one
    //     repeated sentence is a far smaller loss than the rest of the topic.
    //   it never started — the platform is refusing us outright (iOS wants a
    //     fresh gesture after a screen lock). Trying again does not change that,
    //     so stop and say what happened.
    let started = false;

    const giveUp = () => {
      runRef.current += 1;
      if (ownsDevice(deviceId)) resetDevice(synth());
      pausedRef.current = true;
      // Left ON this chunk, not past it: nothing of it was heard, so pressing
      // play should pick it up rather than skip it.
      cursorRef.current = index;
      setStatus('paused');
      setInterrupted(true);
      // The same stale-caption defect as the other failure exits: nothing of
      // this chunk was heard, so it must not go on sitting in the caption
      // (word highlighted, mid-sentence) under the screen-lock notice.
      setCaption(null);
      releaseWakeLock();
    };

    // Deliberately does NOT clear cleanRunRef the way a synthesis error does:
    // the retry re-speaks the chunk from its start, so nothing is skipped and a
    // student whose phone buzzed mid-topic has still heard all of it.
    const recover = () => {
      if (run !== runRef.current) return;
      // A pause is dead air the student asked for. Recovering from one would
      // start the voice again behind a bar that says Play — and `pause()`
      // early-returns on a status that is already 'paused', so the only way out
      // would be to close the player.
      if (pausedRef.current) { clearStall(); return; }
      clearStall();

      retryRef.current = retryRef.current.index === index
        ? { index, tries: retryRef.current.tries + 1 }
        : { index, tries: 1 };

      if (!started || retryRef.current.tries > MAX_CHUNK_RETRIES) { giveUp(); return; }

      runRef.current += 1;
      const retryRun = runRef.current;
      claimDevice(deviceId, notifyStandDown);
      resetDevice(synth());
      speakFromRef.current?.(index, retryRun);
    };

    // Never arms during a pause. `pause()` does not bump runRef — it only stops
    // the clock — so a `start` or `boundary` that lands just after the click
    // would otherwise re-arm a watchdog that nothing will ever clear, since no
    // further events arrive while paused. Android is where that is routine: its
    // pause() is unreliable, so boundaries keep coming.
    const armStall = (ms) => {
      clearStall();
      if (pausedRef.current) return;
      stallRef.current = setTimeout(() => { stallRef.current = null; recover(); }, ms);
    };

    const advance = () => {
      // Landmine: cancel() delivers end/error asynchronously, so a callback from
      // a run we already abandoned must not move this one along.
      if (run !== runRef.current) return;
      if (pausedRef.current) {
        // This chunk FINISHED and we are paused, so what resume() should pick up
        // is the next one. Leaving the cursor here made the Android path — where
        // pause() did not take and the sentence ran to its end — replay the
        // sentence the student had already heard.
        cursorRef.current = index + 1;
        return;
      }
      speakFromRef.current?.(index + 1, run);
    };

    utterance.onstart = () => {
      if (run !== runRef.current) return;
      started = true;
      armStall(stallBudget(item.text.length, rate));
      // The caption tracks the chunk actually speaking, not the one queued —
      // set here rather than where the utterance was built, so a retry after
      // landmine 5 replaces stale text from the attempt that never started.
      //
      // Gated on pausedRef for the same reason `advance` is: speak() is
      // synchronous but onstart is not, so a Pause click in that gap already
      // has pausedRef.current true by the time this runs. Updating anyway
      // would change what the caption shows while the bar reads Paused.
      if (!pausedRef.current) setCaption({ text: item.text, start: -1, end: -1 });
    };

    // Not a progress display — a heartbeat. See BOUNDARY_SILENCE_MS.
    //
    // Only a WORD boundary is tight enough to shorten the deadline. The spec
    // allows `name` to be 'sentence' too, and an engine that emits those can
    // legitimately go longer than four seconds between them inside one chunk —
    // which would have the watchdog cut working audio, repeat the sentence, and
    // then show a screen-lock notice on a device that never locked.
    utterance.onboundary = (event) => {
      if (run !== runRef.current) return;
      started = true;
      armStall(event?.name === 'word' ? BOUNDARY_SILENCE_MS : stallBudget(item.text.length, rate));
      // The karaoke caption. Only a word boundary moves it — a sentence
      // boundary (some engines emit both) would jump the highlight to the
      // start of a sentence it has not reached yet. Gated on pausedRef too:
      // pause() does not stop Android's engine reliably (see armStall above),
      // so boundaries for the rest of the sentence can keep arriving after the
      // click — updating the caption through them would have it visibly
      // advance behind a bar that says Paused.
      //
      // `charIndex` gets the same distrust as `charLength` below: it is the
      // engine's own report, not this app's. `typeof x === 'number'` alone
      // does not exclude NaN — `typeof NaN` IS `'number'` — and an
      // out-of-range index would hand `wordLengthAfter` a start past the
      // text, degenerating to an empty highlight. Number.isFinite excludes
      // NaN/Infinity; the clamp keeps the index inside the chunk.
      if (
        event?.name === 'word'
        && typeof event.charIndex === 'number'
        && Number.isFinite(event.charIndex)
        && !pausedRef.current
      ) {
        const start = Math.max(0, Math.min(event.charIndex, item.text.length - 1));
        // The scan-based length doubles as a ceiling, not just a fallback:
        // `charLength` is a value the ENGINE hands back, not one this app
        // controls, and clamping to it is what stops two different
        // misbehaviours. A non-conforming engine reporting it as a numeric
        // STRING would otherwise make `start + length` concatenate
        // ("4" + "3" = "43") instead of add. And an engine reporting a
        // charLength that is numeric but genuinely too large — trailing
        // punctuation or whitespace folded into the word — would otherwise
        // extend the highlight past the word actually spoken; capping it at
        // the natural scan-to-whitespace length is the one bound a word
        // cannot legitimately cross.
        const scanned = wordLengthAfter(item.text, start);
        const reported = typeof event.charLength === 'number' && event.charLength > 0
          ? event.charLength : 0;
        const length = reported ? Math.min(reported, scanned) : scanned;
        setCaption({ text: item.text, start, end: start + length });
      }
    };

    utterance.onend = () => {
      // Stale first, watchdog included. Our own cancel() fires `end` rather than
      // `error` on some browsers (see the header), and every cancel-and-respeak
      // path arms a fresh watchdog synchronously — so clearing before this check
      // disarmed the REPLACEMENT chunk's timer a task later. That left the retry
      // inside recover() unwatched, which is the one thing that must not be:
      // a chunk that wedges twice would then never reach giveUp(), and the
      // notice this whole change exists to show would never appear.
      if (run !== runRef.current) return;
      clearStall();
      spokeRef.current += 1;
      errorStreakRef.current = 0;
      retryRef.current = { index: -1, tries: 0 };
      advance();
    };

    utterance.onerror = (event) => {
      // Stale first. Every internal cancel bumps runRef BEFORE calling cancel(),
      // so a callback carrying an old run id is one of ours and there is nothing
      // to do with it.
      if (run !== runRef.current) return;
      clearStall();

      // …and by that same token, an 'interrupted' still carrying the CURRENT run
      // id did not come from us: something outside the page took the audio.
      // Ignoring it — which is what this did — left the bar showing Pause with
      // nothing coming out and no way back but scrolling up and pressing play.
      // That is the commonest way this player went quiet.
      if (event?.error === 'interrupted' || event?.error === 'canceled') { recover(); return; }

      errorStreakRef.current += 1;
      // A chunk that failed was NOT heard, so this is no longer a clean listen
      // even if every chunk after it succeeds. Without this, one failed sentence
      // in the middle of a topic still ended with onFinished(true) and the topic
      // was marked read on audio the student never got.
      cleanRunRef.current = false;
      // One bad chunk should not end the topic — the next sentence usually
      // synthesises fine. A run of them means the voice itself cannot speak
      // (synthesis-failed, synthesis-unavailable, audio-busy), and advancing
      // through the rest is not resilience: it empties the queue in
      // milliseconds and looks exactly like a finished listen.
      if (errorStreakRef.current >= MAX_ERROR_STREAK) {
        runRef.current += 1;
        pausedRef.current = true;
        setStatus('paused');
        setFailed(true);
        // Otherwise the last chunk that DID speak stays lit under a notice
        // saying the device could not play the audio — a frozen caption
        // implying playback is still live when it has just stopped for good.
        setCaption(null);
        releaseWakeLock();
        return;
      }
      advance();
    };

    try {
      api.speak(utterance);
    } catch {
      // Some platforms throw rather than failing quietly — same outcome as an
      // utterance that never starts.
      giveUp();
      return;
    }
    // Nothing has started yet, so this first budget carries the engine's
    // start-up on top of the chunk's own estimate.
    armStall(START_GRACE_MS + stallBudget(item.text.length, rate));
  }, [queue, voice, rate, releaseWakeLock, clearStall, deviceId, notifyStandDown]);

  useEffect(() => { speakFromRef.current = speakFrom; }, [speakFrom]);

  const stop = useCallback(() => {
    runRef.current += 1;
    pausedRef.current = false;
    cursorRef.current = 0;
    clearStall();
    // Only if we are the one talking: another topic's player may hold the device.
    if (ownsDevice(deviceId)) resetDevice(synth());
    releaseDevice(deviceId);
    setStatus('idle');
    setUnitIndex(0);
    setInterrupted(false);
    setFailed(false);
    setCaption(null);
    releaseWakeLock();
  }, [releaseWakeLock, deviceId, clearStall]);

  // Landmine 3: this must be reached from a click, never from an effect.
  //
  // `viaSkip` is set only by skipTo — a caller asking to start somewhere other
  // than the beginning is still a clean listen if they chose it deliberately
  // from idle, but jumping mid-playback is not.
  const play = useCallback((fromUnit = 0, { viaSkip = false } = {}) => {
    if (!supported || queue.length === 0) return;
    const api = synth();

    runRef.current += 1;
    const run = runRef.current;
    pausedRef.current = false;
    cleanRunRef.current = !viaSkip && fromUnit === 0;
    spokeRef.current = 0;
    errorStreakRef.current = 0;
    retryRef.current = { index: -1, tries: 0 };
    setInterrupted(false);
    setFailed(false);
    setCaption(null);

    // Take the device first: this stands down whichever topic was playing, so
    // its bar resets instead of sitting there claiming to still be running.
    claimDevice(deviceId, notifyStandDown);
    resetDevice(api); // clear anything the previous run left queued, pause included
    const start = queue.findIndex((q) => q.unitIndex >= fromUnit);
    setStatus('playing');
    acquireWakeLock();
    speakFrom(start === -1 ? 0 : start, run);
  }, [supported, queue, speakFrom, acquireWakeLock, deviceId, notifyStandDown]);

  const pause = useCallback(() => {
    if (!supported || status !== 'playing') return;
    pausedRef.current = true;
    // The watchdog measures dead air, and a pause is dead air the student asked
    // for. Leaving it armed would have it "recover" from the pause.
    clearStall();
    // Android Chrome's pause() is unreliable. Because we queue one chunk at a
    // time, the worst case is that the current sentence finishes and `advance`
    // then stops on pausedRef — a graceful degradation rather than a stuck
    // player.
    synth()?.pause();
    setStatus('paused');
    releaseWakeLock();
  }, [supported, status, releaseWakeLock, clearStall]);

  // Always restarts the chunk rather than calling speechSynthesis.resume() on
  // the one in flight. Resuming mid-utterance saves the student half a sentence
  // and costs them the watchdog: there is no event left to hang one on, so an
  // engine that does not actually pick the chunk back up leaves the bar showing
  // Pause with nothing coming out — the very failure this file now guards. It
  // also deletes the whole Android "pause() did not take" branch, since
  // `advance` has already moved the cursor past a chunk that ran to its end.
  const resume = useCallback(() => {
    if (!supported || status !== 'paused') return;
    pausedRef.current = false;
    errorStreakRef.current = 0;
    retryRef.current = { index: -1, tries: 0 };
    setStatus('playing');
    setInterrupted(false);
    setFailed(false);
    acquireWakeLock();

    runRef.current += 1;
    claimDevice(deviceId, notifyStandDown);
    resetDevice(synth());
    speakFrom(cursorRef.current, runRef.current);
  }, [supported, status, speakFrom, acquireWakeLock, deviceId, notifyStandDown]);

  const skipTo = useCallback((target) => {
    const clamped = Math.max(0, Math.min(target, (units?.length ?? 1) - 1));
    if (status === 'playing' || status === 'paused') play(clamped, { viaSkip: true });
    else {
      setUnitIndex(clamped);
      // Leaving 'ended' set here made the arrows look broken from a finished
      // topic: they moved the counter, and then Play — which treats 'ended' as
      // "start over" — threw the choice away and went back to section one.
      if (status === 'ended') setStatus('idle');
      // The caption is frozen on whatever last spoke — from 'ended', that is
      // the topic's closing chunk. Left in place, Previous/Next from a finished
      // topic moved the heading above the caption to the newly-picked section
      // while the caption itself kept naming the old one.
      setCaption(null);
    }
  }, [units, status, play]);

  const next = useCallback(() => skipTo(unitIndex + 1), [skipTo, unitIndex]);
  const prev = useCallback(() => skipTo(unitIndex - 1), [skipTo, unitIndex]);

  const setVoice = useCallback((name) => {
    setVoiceName(name);
    writeSpeechPref(VOICE_PREF_KEY, name);
  }, []);

  const setRate = useCallback((value) => {
    setRateState(value);
    writeSpeechPref(RATE_PREF_KEY, value);
  }, []);

  // ── Landmine 4: the screen locks and synthesis is suspended ───────────────
  //
  // DETECTED on return, not predicted on leaving. Pausing whenever the document
  // hides is wrong on desktop, where Chrome, Edge and Firefox all keep speaking
  // in a background tab — a student who switched tabs to take notes would have
  // had the audio stop for no reason. Mobile is the platform that suspends, and
  // the reliable signal is simply that nothing is speaking any more when the
  // page comes back. No user-agent sniffing, and correct on both.
  useEffect(() => {
    if (!supported) return undefined;

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        hiddenWhilePlayingRef.current = statusRef.current === 'playing';
        // The browser drops the lock on hide regardless; keep our handle honest.
        releaseWakeLock();
        return;
      }

      if (!hiddenWhilePlayingRef.current) return;
      hiddenWhilePlayingRef.current = false;

      const api = synth();
      if (statusRef.current !== 'playing' || !api) return;

      if (!api.speaking && !api.paused) {
        // Suspended while we were away. Abandon the dead chain so a late
        // callback cannot resurrect it — and then carry on, rather than leaving
        // a notice and a play button. The student never pressed pause; they put
        // the phone down and picked it back up, and what they are waiting for is
        // the next sentence. If the platform refuses (iOS wants a fresh gesture
        // after a screen lock) nothing starts, and the stall watchdog turns that
        // into the honest "audio stops when the screen locks" notice a few
        // seconds later — the same message, arrived at by trying first.
        runRef.current += 1;
        const run = runRef.current;
        claimDevice(deviceId, notifyStandDown);
        resetDevice(api);
        // Hiding released the lock (above), and playback is about to carry on —
        // so take it back, exactly as the branch below does. Without this the
        // first screen lock quietly turned "Keep screen on" off for the rest of
        // the topic, and the next lock interrupted the same listen again.
        acquireWakeLock();
        speakFromRef.current?.(cursorRef.current, run);
      } else {
        // Desktop: it carried on talking the whole time. Just re-take the lock.
        acquireWakeLock();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [supported, releaseWakeLock, acquireWakeLock, deviceId, notifyStandDown]);

  // A changed voice or rate only takes effect on the NEXT utterance, so a
  // student who changes either mid-topic would otherwise hear no difference
  // until the current chunk ends. Restart from the current chunk instead.
  const settingsRef = useRef({ voice, rate });
  useEffect(() => {
    const previous = settingsRef.current;
    settingsRef.current = { voice, rate };

    // The FIRST voice to arrive is not a change the student made. Landmine 1 at
    // the top of this file: getVoices() is empty on the first call in Chrome, so
    // a listen started before `voiceschanged` lands begins with voice === null —
    // and treating null → the real voice as a settings change restarted the
    // chunk in flight, so the student heard the opening sentence twice.
    //
    // Compared by name rather than identity for the same reason: some browsers
    // hand back fresh SpeechSynthesisVoice objects on each getVoices() call.
    const voiceChanged = previous.voice !== null && previous.voice?.name !== voice?.name;
    const changed = voiceChanged || previous.rate !== rate;
    if (!changed || status !== 'playing') return;
    runRef.current += 1;
    claimDevice(deviceId, notifyStandDown);
    resetDevice(synth());
    // The restarted chunk's own onstart is about to set this again — but that
    // is async, and the OLD caption (possibly a word or two further into the
    // sentence than where the restarted chunk will actually begin) would
    // otherwise sit on screen until it does, implying the voice picked up
    // further along than it really did.
    setCaption(null);
    speakFrom(cursorRef.current, runRef.current);
  }, [voice, rate, status, speakFrom, deviceId, notifyStandDown]);

  // Leaving the page mid-sentence must not leave the browser talking — but
  // collapsing ONE topic accordion unmounts only that topic's player, and it
  // must not silence a different topic that is mid-sentence. Hence the guard:
  // an instance stops the device only while it is the one using it.
  useEffect(() => () => {
    runRef.current += 1;
    if (stallRef.current !== null) { clearTimeout(stallRef.current); stallRef.current = null; }
    if (ownsDevice(deviceId)) {
      resetDevice(synth());
      releaseDevice(deviceId);
      liveUtterance = null;
    }
    wakeLockGenRef.current += 1; // a request still in flight must not keep its lock
    wakeLockRef.current?.release?.().catch(() => {});
    wakeLockRef.current = null;
  }, [deviceId]);

  // New topic (or notes that finished loading) — abandon whatever was playing.
  // Keyed on the content signature, so this fires when the material genuinely
  // changed and not merely because the caller rebuilt its array.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    runRef.current += 1;
    if (stallRef.current !== null) { clearTimeout(stallRef.current); stallRef.current = null; }
    if (ownsDevice(deviceId)) { resetDevice(synth()); releaseDevice(deviceId); }
    pausedRef.current = false;
    cursorRef.current = 0;
    retryRef.current = { index: -1, tries: 0 };
    setStatus('idle');
    setUnitIndex(0);
    setInterrupted(false);
    // Or the "this device could not play the audio" line survives the reset and
    // sits under a player that is back to idle — the realistic path being lazily
    // loaded notes replacing the topic after a voice failure.
    setFailed(false);
    setCaption(null);
  }, [signature, deviceId]);

  return {
    supported,
    status,
    playing: status === 'playing',
    paused: status === 'paused',
    interrupted,
    failed,
    caption,
    unitIndex,
    unitCount: units?.length ?? 0,
    play,
    pause,
    resume,
    stop,
    next,
    prev,
    skipTo,
    voices,
    voice,
    setVoice,
    rate,
    setRate,
    keepAwake,
    setKeepAwake,
    // No point offering a toggle the platform will refuse. Safari on iOS has no
    // Wake Lock API at all, which is also where it would have helped most.
    // The VALUE again, not the key — same reason as `supported` above.
    wakeLockSupported: typeof navigator !== 'undefined' && Boolean(navigator.wakeLock),
  };
}
