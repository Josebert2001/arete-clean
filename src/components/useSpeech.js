// ─── Speaking a lecture-note topic aloud ─────────────────────────────────────
// Drives window.speechSynthesis over the units speechText.js produces. No
// network, no API key, no bytes on the student's data bundle — the voice is the
// one already on their device.
//
// Everything awkward in here is a browser defect, not a design choice. Four of
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
//      forbid.
//
// cancel() is the other sharp edge: it fires `end` on some browsers and `error`
// on others, both asynchronously, so a stale callback can advance the queue of a
// playback run that is already over. Every callback is therefore gated on a run
// id (see `runRef`).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Chrome's ~15s cut-off at a normal 150wpm is about 220 characters. 200 leaves
// headroom, and a slower `rate` only makes chunks shorter in wall-clock terms,
// never longer.
const MAX_CHUNK_CHARS = 200;

// A full stop that is not the end of a sentence. The prose here really does
// contain "Prof. Ntiedo J. Umoren and Sunday S. Akpan, Ph.D." (ENT 221) and
// "13.2 Java String Methods" (COS 221), and splitting inside either produces a
// hard stop mid-name. Decimals need no rule — "2.1" has no space after the dot,
// so the sentence split never sees it as a boundary.
const NOT_SENTENCE_END = /(?:\s[A-Z]|\b(?:Prof|Dr|Mr|Mrs|Ms|St|Vol|No|Ch|Sec|Inc|Ltd|Ph\.D))\.$/;

const VOICE_PREF_KEY = 'arete:speech:voice';
const RATE_PREF_KEY = 'arete:speech:rate';
const AWAKE_PREF_KEY = 'arete:speech:awake';

export const SPEECH_RATES = [0.75, 1, 1.25, 1.5];

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
    if (previous && NOT_SENTENCE_END.test(previous)) {
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

function readPref(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw;
  } catch {
    // Storage disabled or private mode — preferences just do not persist.
    return fallback;
  }
}

function writePref(key, value) {
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
  const [voiceName, setVoiceName] = useState(() => readPref(VOICE_PREF_KEY, ''));
  const [rate, setRateState] = useState(() => Number(readPref(RATE_PREF_KEY, '1')) || 1);
  const [keepAwake, setKeepAwakeState] = useState(() => readPref(AWAKE_PREF_KEY, '0') === '1');
  // True when the browser suspended us rather than the student pausing — the UI
  // needs to say which, or a phone-lock stop looks like a bug.
  const [interrupted, setInterrupted] = useState(false);

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
  const wakeLockGenRef = useRef(0);      // invalidates an in-flight request()
  const wakeLockPendingRef = useRef(false);
  // This instance's claim on the one global speechSynthesis — see claimDevice.
  const [deviceId] = useState(() => { nextDeviceId += 1; return nextDeviceId; });
  // True while the current run has played straight through from unit 0. Any
  // skip clears it, which is what stops "skip to the end" from counting as
  // having listened to the topic.
  const cleanRunRef = useRef(false);
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
    if (!keepAwake || wakeLockRef.current || wakeLockPendingRef.current) return;
    const gen = wakeLockGenRef.current;
    wakeLockPendingRef.current = true;
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
      wakeLockPendingRef.current = false;
    }
  }, [keepAwake]);

  const setKeepAwake = useCallback((value) => {
    setKeepAwakeState(value);
    writePref(AWAKE_PREF_KEY, value ? '1' : '0');
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
    setStatus('idle');
    setUnitIndex(0);
    setInterrupted(false);
    releaseWakeLock();
  }, [releaseWakeLock]);

  // Held in a ref so the callback the module registry keeps can never be a stale
  // closure, the same reason finishedRef exists below.
  const standDownRef = useRef(standDown);
  useEffect(() => { standDownRef.current = standDown; }, [standDown]);
  const notifyStandDown = useCallback(() => standDownRef.current?.(), []);

  // ── The queue ─────────────────────────────────────────────────────────────

  const speakFrom = useCallback((index, run) => {
    const api = synth();
    if (!api || run !== runRef.current) return;

    const item = queue[index];
    if (!item) {
      setStatus('ended');
      releaseWakeLock();
      // The flag matters: a caller that marks the topic read off this must not
      // be fooled by a student who pressed skip until the end.
      finishedRef.current?.(cleanRunRef.current);
      return;
    }

    cursorRef.current = index;
    setUnitIndex(item.unitIndex);

    const utterance = new window.SpeechSynthesisUtterance(item.text);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    // Left at the browser default deliberately: pitch and volume are the
    // student's system preferences, not ours to override.

    const advance = () => {
      // Landmine: cancel() delivers end/error asynchronously, so a callback from
      // a run we already abandoned must not move this one along.
      if (run !== runRef.current) return;
      if (pausedRef.current) return; // resume() picks up from cursorRef
      speakFromRef.current?.(index + 1, run);
    };

    utterance.onend = advance;
    utterance.onerror = (event) => {
      // 'interrupted' and 'canceled' are what our own cancel() produces — not
      // failures, and not something to report.
      if (event?.error === 'interrupted' || event?.error === 'canceled') return;
      if (run !== runRef.current) return;
      // A genuine synthesis failure on one chunk should not end the topic.
      advance();
    };

    api.speak(utterance);
  }, [queue, voice, rate, releaseWakeLock]);

  useEffect(() => { speakFromRef.current = speakFrom; }, [speakFrom]);

  const stop = useCallback(() => {
    runRef.current += 1;
    pausedRef.current = false;
    cursorRef.current = 0;
    // Only if we are the one talking: another topic's player may hold the device.
    if (ownsDevice(deviceId)) resetDevice(synth());
    releaseDevice(deviceId);
    setStatus('idle');
    setUnitIndex(0);
    setInterrupted(false);
    releaseWakeLock();
  }, [releaseWakeLock, deviceId]);

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
    setInterrupted(false);

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
    // Android Chrome's pause() is unreliable. Because we queue one chunk at a
    // time, the worst case is that the current sentence finishes and `advance`
    // then stops on pausedRef — a graceful degradation rather than a stuck
    // player.
    synth()?.pause();
    setStatus('paused');
    releaseWakeLock();
  }, [supported, status, releaseWakeLock]);

  const resume = useCallback(() => {
    if (!supported || status !== 'paused') return;
    const api = synth();
    pausedRef.current = false;
    setStatus('playing');
    setInterrupted(false);
    acquireWakeLock();

    if (api.paused && api.speaking) {
      api.resume();
    } else {
      // pause() did not take (Android) or the utterance already ended while
      // paused — restart from the chunk we stopped on.
      runRef.current += 1;
      claimDevice(deviceId, notifyStandDown);
      resetDevice(api);
      speakFrom(cursorRef.current, runRef.current);
    }
  }, [supported, status, speakFrom, acquireWakeLock, deviceId, notifyStandDown]);

  const skipTo = useCallback((target) => {
    const clamped = Math.max(0, Math.min(target, (units?.length ?? 1) - 1));
    if (status === 'playing' || status === 'paused') play(clamped, { viaSkip: true });
    else setUnitIndex(clamped);
  }, [units, status, play]);

  const next = useCallback(() => skipTo(unitIndex + 1), [skipTo, unitIndex]);
  const prev = useCallback(() => skipTo(unitIndex - 1), [skipTo, unitIndex]);

  const setVoice = useCallback((name) => {
    setVoiceName(name);
    writePref(VOICE_PREF_KEY, name);
  }, []);

  const setRate = useCallback((value) => {
    setRateState(value);
    writePref(RATE_PREF_KEY, value);
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
        // callback cannot resurrect it, and tell the student what happened.
        runRef.current += 1;
        if (ownsDevice(deviceId)) resetDevice(api);
        pausedRef.current = true;
        setStatus('paused');
        setInterrupted(true);
      } else {
        // Desktop: it carried on talking the whole time. Just re-take the lock.
        acquireWakeLock();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [supported, releaseWakeLock, acquireWakeLock, deviceId]);

  // A changed voice or rate only takes effect on the NEXT utterance, so a
  // student who changes either mid-topic would otherwise hear no difference
  // until the current chunk ends. Restart from the current chunk instead.
  const settingsRef = useRef({ voice, rate });
  useEffect(() => {
    const changed = settingsRef.current.voice !== voice || settingsRef.current.rate !== rate;
    settingsRef.current = { voice, rate };
    if (!changed || status !== 'playing') return;
    runRef.current += 1;
    claimDevice(deviceId, notifyStandDown);
    resetDevice(synth());
    speakFrom(cursorRef.current, runRef.current);
  }, [voice, rate, status, speakFrom, deviceId, notifyStandDown]);

  // Leaving the page mid-sentence must not leave the browser talking — but
  // collapsing ONE topic accordion unmounts only that topic's player, and it
  // must not silence a different topic that is mid-sentence. Hence the guard:
  // an instance stops the device only while it is the one using it.
  useEffect(() => () => {
    runRef.current += 1;
    if (ownsDevice(deviceId)) {
      resetDevice(synth());
      releaseDevice(deviceId);
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
    if (ownsDevice(deviceId)) { resetDevice(synth()); releaseDevice(deviceId); }
    pausedRef.current = false;
    cursorRef.current = 0;
    setStatus('idle');
    setUnitIndex(0);
    setInterrupted(false);
  }, [signature, deviceId]);

  return {
    supported,
    status,
    playing: status === 'playing',
    paused: status === 'paused',
    interrupted,
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
