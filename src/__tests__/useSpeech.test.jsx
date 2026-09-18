// useSpeech drives window.speechSynthesis, and almost everything in it exists to
// work around a browser defect that fails SILENTLY: voices that arrive late,
// utterances Chrome cuts at ~15s, a first speak() iOS refuses, and a phone lock
// that suspends synthesis outright. None of those throw. These tests are the
// only thing that can tell whether the workarounds still work.
//
// The stub below is a deliberately hostile speechSynthesis: it does not
// auto-complete utterances (the test decides when one ends), and cancel()
// delivers its callbacks the way a real browser does — asynchronously, which is
// what makes stale-callback bugs possible in the first place.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSpeech, chunkSpeech, pickVoice, SPEECH_RATES } from '../components/useSpeech.js';

// ── A controllable speechSynthesis ──────────────────────────────────────────

function makeSynth(voices = []) {
  const state = {
    spoken: [],        // every utterance handed to speak(), in order
    current: null,
    paused: false,
    speaking: false,
    cancels: 0,
    listeners: {},
    refuse: false,
    voices,
  };

  const api = {
    getVoices: () => state.voices,
    addEventListener: (type, fn) => { (state.listeners[type] ??= []).push(fn); },
    removeEventListener: (type, fn) => {
      state.listeners[type] = (state.listeners[type] ?? []).filter((f) => f !== fn);
    },
    speak: (utterance) => {
      state.spoken.push(utterance);
      state.current = utterance;
      // A PAUSED synth queues an utterance without voicing it — it does not
      // un-pause itself. Modelling speak() as always starting the voice is what
      // let a silent player pass this suite: after pause() → cancel() the flag
      // is still set, and everything queued behind it goes unheard.
      // `refuse` is the iOS-after-a-screen-lock device: it accepts the
      // utterance and then does nothing with it — no voice, no start, no error.
      if (!state.paused && !state.refuse) {
        state.speaking = true;
        // `onstart` is what tells the stall watchdog a chunk got a voice at all,
        // and that is the difference between "something cut it, say it again"
        // and "the platform is refusing, stop and say so". A stub that never
        // fires it models a device that never speaks.
        queueMicrotask(() => { if (state.current === utterance) utterance.onstart?.(); });
      }
    },
    cancel: () => {
      state.cancels += 1;
      const victim = state.current;
      state.current = null;
      state.speaking = false;
      // NOT `paused = false`. Verified in Chrome: pause() then cancel() leaves
      // speechSynthesis.paused true, and a speak() while paused queues the
      // utterance without ever voicing it. The stub used to clear the flag here,
      // which is precisely why it could not catch the silent player that
      // Pause → Next and Pause → close → Listen produced.
      if (victim) queueMicrotask(() => victim.onerror?.({ error: 'canceled' }));
    },
    pause: () => { if (state.speaking) state.paused = true; },
    resume: () => { state.paused = false; },
    get speaking() { return state.speaking; },
    get paused() { return state.paused; },
  };

  // Test-side controls.
  state.endCurrent = () => {
    const u = state.current;
    state.current = null;
    state.speaking = false;
    u?.onend?.();
  };
  state.emitVoicesChanged = (list) => {
    state.voices = list;
    for (const fn of state.listeners.voiceschanged ?? []) fn();
  };

  return { api, state };
}

function install(voices) {
  const { api, state } = makeSynth(voices);
  vi.stubGlobal('speechSynthesis', api);
  vi.stubGlobal('SpeechSynthesisUtterance', class {
    constructor(text) {
      this.text = text;
      this.rate = 1;
      this.voice = null;
      this.onstart = null;
      this.onboundary = null;
      this.onend = null;
      this.onerror = null;
    }
  });
  return state;
}

const units = (...texts) => texts.map((speech, i) => ({
  id: `u${i}`, hash: `h${i}-${speech.length}`, speech, heading: `H${i}`,
}));

// ~165 chars, so three of these become three separate chunks under the 200-char
// cap. "One. Two. Three." is a single chunk and cannot exercise the queue walk.
const sentence = (n) => `Sentence number ${n} ${'with padding words here '.repeat(6)}.`;
const multiChunk = (count = 3) =>
  Array.from({ length: count }, (_, i) => sentence(i + 1)).join(' ');

beforeEach(() => {
  try { localStorage.clear(); } catch { /* not available in this env */ }
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ── chunkSpeech — landmine 2 ────────────────────────────────────────────────

describe('chunkSpeech', () => {
  it('keeps every chunk under the cap Chrome cuts at', () => {
    const long = 'This is a sentence about networking. '.repeat(30);
    for (const chunk of chunkSpeech(long)) expect(chunk.length).toBeLessThanOrEqual(200);
  });

  it('budgets for the SLOWEST rate, since the cut-off is a duration', () => {
    // 200 chars is the ~15s budget at rate 1. At 0.75× the same text runs about
    // 20 seconds and trips the cut-off, so the default cap has to assume the
    // slowest speed the control bar offers.
    const slowest = Math.min(...SPEECH_RATES);
    const long = 'This is a sentence about networking. '.repeat(30);
    for (const chunk of chunkSpeech(long)) {
      expect(chunk.length).toBeLessThanOrEqual(Math.floor(200 * slowest));
    }
  });

  it('splits on sentence boundaries, not mid-thought', () => {
    expect(chunkSpeech('One thing. Two things. Three things.', 20))
      .toEqual(['One thing.', 'Two things.', 'Three things.']);
  });

  it('does not split inside a name or a numbered heading', () => {
    // Both shapes are real: ENT 221 credits "Prof. Ntiedo J. Umoren", COS 221
    // numbers its sections "13.2 Java String Methods".
    const chunks = chunkSpeech('Authors: Prof. Ntiedo J. Umoren and Sunday S. Akpan, Ph.D. Next.');
    expect(chunks[0]).toContain('Prof. Ntiedo J. Umoren');
    expect(chunks[0]).toContain('Ph.D.');
    expect(chunks.some((c) => c.startsWith('Umoren'))).toBe(false);
  });

  it('keeps a decimal intact', () => {
    expect(chunkSpeech('Section 13.2 covers methods.')).toEqual(['Section 13.2 covers methods.']);
  });

  it('breaks an over-long sentence without cutting a word in half', () => {
    const sentence = `${'alpha bravo charlie delta '.repeat(30)}end.`;
    const chunks = chunkSpeech(sentence, 60);
    for (const chunk of chunks) expect(chunk.length).toBeLessThanOrEqual(60);
    expect(chunks.join(' ').replace(/\s+/g, ' ')).toBe(sentence.replace(/\s+/g, ' '));
  });

  it('returns nothing for empty input', () => {
    expect(chunkSpeech('')).toEqual([]);
    expect(chunkSpeech(null)).toEqual([]);
  });

  it('ends a sentence after a spelled-out acronym, but not after an initial', () => {
    // applyPronunciation runs BEFORE chunking and manufactures these by the
    // hundred: "…over TCP." arrives here as "…over T C P.", and the lone-capital
    // rule read that final "P." as somebody's initial.
    expect(chunkSpeech('Data goes over T C P. The next layer adds routing.', 40))
      .toEqual(['Data goes over T C P.', 'The next layer adds routing.']);
    // An initial is still an initial — one capital standing alone, not a run.
    expect(chunkSpeech('Authors: Sunday S. Akpan wrote it. Another sentence follows.', 40))
      .toEqual(['Authors: Sunday S. Akpan wrote it.', 'Another sentence follows.']);
  });

  it('is written without regex lookbehind, which older iOS Safari cannot parse', () => {
    // Not a style preference. A lookbehind is an early SyntaxError on an engine
    // that lacks it — thrown when this MODULE is parsed — and LectureNotes
    // imports it, so it would have taken the whole notes renderer down on an
    // iPhone below iOS 16.4 rather than merely hiding the Listen button.
    const source = readFileSync(
      resolve(process.cwd(), 'src/components/useSpeech.js'), 'utf8',
    ).replace(/\/\*[\s\S]*?\*\//g, ''); // the doc comment names the construct
    expect(source).not.toMatch(/\(\?<[=!]/);
  });
});

// ── pickVoice ───────────────────────────────────────────────────────────────

describe('pickVoice', () => {
  const v = (name, lang, isDefault = false) => ({ name, lang, default: isDefault });

  it('prefers Nigerian English — these are University of Uyo students', () => {
    const list = [v('US', 'en-US', true), v('GB', 'en-GB'), v('NG', 'en-NG')];
    expect(pickVoice(list).name).toBe('NG');
  });

  it('falls back to British before American', () => {
    expect(pickVoice([v('US', 'en-US', true), v('GB', 'en-GB')]).name).toBe('GB');
  });

  it('honours a saved preference over the ranking', () => {
    const list = [v('NG', 'en-NG'), v('US', 'en-US')];
    expect(pickVoice(list, 'US').name).toBe('US');
    // A saved voice that is no longer installed falls back rather than breaking.
    expect(pickVoice(list, 'Gone').name).toBe('NG');
  });

  it('takes a non-English voice only when there is nothing else', () => {
    expect(pickVoice([v('FR', 'fr-FR', true)]).name).toBe('FR');
    expect(pickVoice([])).toBeNull();
  });
});

// ── The hook ────────────────────────────────────────────────────────────────

describe('useSpeech', () => {
  it('reports unsupported without throwing when the API is absent', () => {
    vi.stubGlobal('speechSynthesis', undefined);
    const { result } = renderHook(() => useSpeech(units('Hello.')));
    expect(result.current.supported).toBe(false);
    act(() => result.current.play());
    expect(result.current.status).toBe('idle');
  });

  it('picks up voices that arrive on voiceschanged — landmine 1', async () => {
    const state = install([]); // Chrome's empty first getVoices()
    const { result } = renderHook(() => useSpeech(units('Hello.')));
    expect(result.current.voice).toBeNull();

    act(() => state.emitVoicesChanged([{ name: 'NG', lang: 'en-NG', default: true }]));
    await waitFor(() => expect(result.current.voice?.name).toBe('NG'));
  });

  it('speaks nothing until play() is called — landmine 3', () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    renderHook(() => useSpeech(units('Hello there.')));
    expect(state.spoken).toHaveLength(0);
  });

  it('speaks one chunk at a time and walks the queue on end', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));

    // One utterance in flight, never the whole topic queued at once — that is
    // what keeps every utterance under Chrome's cut-off.
    act(() => result.current.play());
    expect(state.spoken).toHaveLength(1);
    expect(result.current.status).toBe('playing');
    for (const u of state.spoken) expect(u.text.length).toBeLessThanOrEqual(200);

    act(() => state.endCurrent());
    await waitFor(() => expect(state.spoken).toHaveLength(2));

    act(() => state.endCurrent());
    await waitFor(() => expect(state.spoken).toHaveLength(3));
  });

  it('tracks which unit is playing and finishes once, cleanly', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const onFinished = vi.fn();
    const { result } = renderHook(() => useSpeech(units('First.', 'Second.'), { onFinished }));

    act(() => result.current.play());
    expect(result.current.unitIndex).toBe(0);

    act(() => state.endCurrent());
    await waitFor(() => expect(result.current.unitIndex).toBe(1));

    act(() => state.endCurrent());
    await waitFor(() => expect(result.current.status).toBe('ended'));
    // `true` = played start to finish with no skipping, which is what lets the
    // caller treat it as proof the student actually listened.
    expect(onFinished).toHaveBeenCalledTimes(1);
    expect(onFinished).toHaveBeenCalledWith(true);
  });

  it('reports an unclean finish when the student skipped to the end', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const onFinished = vi.fn();
    const { result } = renderHook(() => useSpeech(units('First.', 'Second.'), { onFinished }));

    act(() => result.current.play());
    act(() => result.current.next());        // jumped — did not listen to unit 1
    act(() => state.endCurrent());

    await waitFor(() => expect(onFinished).toHaveBeenCalled());
    expect(onFinished).toHaveBeenCalledWith(false);
  });

  it('counts a pause and resume as still clean', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const onFinished = vi.fn();
    // One unit, one chunk — so ending it once exhausts the queue.
    const { result } = renderHook(() => useSpeech(units('A short unit.'), { onFinished }));

    act(() => result.current.play());
    act(() => result.current.pause());
    act(() => result.current.resume());
    act(() => state.endCurrent());
    await waitFor(() => expect(onFinished).toHaveBeenCalled());
    expect(onFinished).toHaveBeenCalledWith(true);
  });

  it('does not advance on a callback from a cancelled run', async () => {
    // The defect the run id exists for: cancel() delivers its error
    // asynchronously, and without the guard that callback would queue the next
    // chunk of a run the student already stopped.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two. Three. Four.')));

    act(() => result.current.play());
    const spokenBefore = state.spoken.length;

    act(() => result.current.stop());
    await Promise.resolve(); // let the queued microtask fire

    expect(state.spoken).toHaveLength(spokenBefore);
    expect(result.current.status).toBe('idle');
  });

  // Landmine 5. These two are a pair: the same error code means opposite things
  // depending on whose cancel produced it, and the run id is what tells them
  // apart. Every internal cancel bumps it BEFORE calling cancel(), so one that
  // arrives still carrying the CURRENT id came from outside the page.
  it('says the chunk again when something outside the page cut it', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    await act(async () => { await Promise.resolve(); }); // let onstart land
    const cut = state.spoken[0];
    const before = state.spoken.length;

    act(() => cut.onerror?.({ error: 'interrupted' }));

    // Ignoring this — which is what it used to do — left the bar showing Pause
    // with nothing coming out and no way back but pressing play.
    await waitFor(() => expect(state.spoken.length).toBeGreaterThan(before));
    expect(state.spoken[state.spoken.length - 1].text).toBe(cut.text);
    expect(result.current.status).toBe('playing');
  });

  it('gives up on a chunk that is cut twice running, and says so', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    await act(async () => { await Promise.resolve(); });

    act(() => state.spoken[state.spoken.length - 1].onerror?.({ error: 'interrupted' }));
    await waitFor(() => expect(state.spoken).toHaveLength(2));
    await act(async () => { await Promise.resolve(); });
    act(() => state.spoken[state.spoken.length - 1].onerror?.({ error: 'interrupted' }));

    // Twice on the same chunk is the platform, not the chunk. Saying the same
    // sentence forever is not resilience.
    await waitFor(() => expect(result.current.status).toBe('paused'));
    expect(result.current.interrupted).toBe(true);
  });

  it('says the chunk again when the engine wedges and fires nothing at all', async () => {
    // The worst shape of landmine 5: the utterance starts, the audio dies, and
    // no end and no error ever arrive. Without the watchdog the chain simply
    // stops while the bar still says Pause — silence the player cannot see.
    vi.useFakeTimers();
    try {
      const state = install([{ name: 'NG', lang: 'en-NG' }]);
      const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
      act(() => result.current.play());
      await act(async () => { await Promise.resolve(); }); // onstart lands
      const stuck = state.spoken[state.spoken.length - 1];
      const before = state.spoken.length;

      // Past this chunk's budget, but not past the retry's — a second silence
      // would give up, and that is the next test's job.
      act(() => { vi.advanceTimersByTime(25000); });

      expect(state.spoken.length).toBeGreaterThan(before);
      expect(state.spoken[state.spoken.length - 1].text).toBe(stuck.text);
      expect(result.current.status).toBe('playing');
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps watching the retry when the browser fires `end` on our own cancel', async () => {
    // Some browsers deliver `end` rather than `error` for a cancelled
    // utterance. Every cancel-and-respeak path arms the replacement's watchdog
    // synchronously, so a stale `end` that clears the timer before checking the
    // run id disarms the chunk that is now in flight — and the retry inside
    // recover() is the one that must never go unwatched, or a chunk that wedges
    // twice never reaches the notice.
    vi.useFakeTimers();
    try {
      const state = install([{ name: 'NG', lang: 'en-NG' }]);
      const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
      act(() => result.current.play());
      await act(async () => { await Promise.resolve(); });
      const first = state.spoken[0];

      act(() => { vi.advanceTimersByTime(25000); });          // first stall → retry
      await act(async () => { await Promise.resolve(); });
      act(() => first.onend?.());                             // the cancelled one, late
      act(() => { vi.advanceTimersByTime(25000); });          // the retry wedges too

      expect(result.current.status).toBe('paused');
      expect(result.current.interrupted).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not restart itself behind a bar that says Play', async () => {
    // pause() stops the clock but does not bump runRef, so a `boundary` landing
    // just after the click used to re-arm a watchdog nothing would ever clear —
    // and recover() then started the voice again while the UI showed Paused,
    // with pause() refusing to act on a status that is already 'paused'.
    vi.useFakeTimers();
    try {
      const state = install([{ name: 'NG', lang: 'en-NG' }]);
      const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
      act(() => result.current.play());
      const utterance = state.spoken[0];
      act(() => result.current.pause());
      const before = state.spoken.length;

      act(() => utterance.onboundary?.({ name: 'word' }));
      act(() => { vi.advanceTimersByTime(60000); });

      expect(state.spoken).toHaveLength(before);
      expect(result.current.status).toBe('paused');
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not let a sentence-granularity boundary cut working audio', async () => {
    // BOUNDARY_SILENCE_MS is a word-rate heartbeat. An engine that reports
    // 'sentence' boundaries can legitimately go longer than that inside one
    // chunk, and cutting it would repeat the sentence and then blame a screen
    // lock on a device that never locked.
    vi.useFakeTimers();
    try {
      const state = install([{ name: 'NG', lang: 'en-NG' }]);
      const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
      act(() => result.current.play());
      await act(async () => { await Promise.resolve(); });
      const before = state.spoken.length;

      act(() => state.spoken[0].onboundary?.({ name: 'sentence' }));
      act(() => { vi.advanceTimersByTime(8000); }); // past 4s, inside the chunk's own budget

      expect(state.spoken).toHaveLength(before);
      expect(result.current.status).toBe('playing');
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps going when one chunk genuinely fails to synthesise', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());

    // One bad chunk must not cost the student the rest of the topic.
    act(() => state.spoken[0].onerror?.({ error: 'synthesis-failed' }));
    await waitFor(() => expect(state.spoken).toHaveLength(2));
    expect(result.current.status).toBe('playing');
  });

  it('pauses and resumes', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two. Three.')));

    act(() => result.current.play());
    act(() => result.current.pause());
    expect(result.current.status).toBe('paused');
    expect(state.paused).toBe(true);

    act(() => result.current.resume());
    expect(result.current.status).toBe('playing');
    expect(state.paused).toBe(false);
  });

  it('restarts the current chunk when pause() did not take — Android Chrome', () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two. Three.')));

    act(() => result.current.play());
    act(() => result.current.pause());
    // Simulate the platform ignoring pause() and the utterance running out.
    act(() => { state.speaking = false; state.paused = false; });

    const before = state.spoken.length;
    act(() => result.current.resume());
    expect(state.spoken.length).toBeGreaterThan(before);
    expect(result.current.status).toBe('playing');
  });

  it('does not advance past a pause when the current chunk ends', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two. Three.')));

    act(() => result.current.play());
    act(() => result.current.pause());
    const before = state.spoken.length;

    act(() => state.spoken[before - 1].onend?.());
    expect(state.spoken).toHaveLength(before);
  });

  it('skips between units', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('First unit.', 'Second unit.', 'Third.')));

    act(() => result.current.play());
    act(() => result.current.next());
    await waitFor(() => expect(result.current.unitIndex).toBe(1));

    act(() => result.current.prev());
    await waitFor(() => expect(result.current.unitIndex).toBe(0));
  });

  it('clamps a skip to the available units', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One.', 'Two.')));
    act(() => result.current.play());

    act(() => result.current.skipTo(99));
    await waitFor(() => expect(result.current.unitIndex).toBe(1));
    act(() => result.current.skipTo(-5));
    await waitFor(() => expect(result.current.unitIndex).toBe(0));
  });

  // Landmine 4 is DETECTED on return rather than predicted on leaving — see the
  // comment on the visibilitychange effect. These two tests are the pair that
  // justifies it: the same event has to mean different things on the two
  // platforms, and the only honest signal is whether anything is still speaking.
  const setVisibility = (value) =>
    Object.defineProperty(document, 'visibilityState', { value, configurable: true });

  afterEach(() => setVisibility('visible'));

  it('picks the chunk back up when the phone suspended synthesis while away', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    const cut = state.spoken[state.spoken.length - 1];
    const before = state.spoken.length;

    act(() => { setVisibility('hidden'); document.dispatchEvent(new Event('visibilitychange')); });
    // What a locked phone does: synthesis simply stops.
    act(() => { state.speaking = false; state.paused = false; state.current = null; });
    act(() => { setVisibility('visible'); document.dispatchEvent(new Event('visibilitychange')); });

    // The student never pressed pause, so what they are waiting for is the next
    // sentence, not a notice. This used to stop dead and make them find the bar.
    await waitFor(() => expect(state.spoken.length).toBeGreaterThan(before));
    expect(state.spoken[state.spoken.length - 1].text).toBe(cut.text);
    expect(result.current.status).toBe('playing');
  });

  it('falls back to the screen-lock notice when the platform will not restart', async () => {
    // iOS wants a fresh gesture after a lock, so the restart above gets no
    // voice at all. The watchdog is the only thing that can tell — nothing
    // errors, nothing ends.
    vi.useFakeTimers();
    try {
      const state = install([{ name: 'NG', lang: 'en-NG' }]);
      const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
      act(() => result.current.play());

      // A device that takes the utterance and never speaks it.
      state.refuse = true;

      act(() => { setVisibility('hidden'); document.dispatchEvent(new Event('visibilitychange')); });
      act(() => { state.speaking = false; state.paused = false; state.current = null; });
      act(() => { setVisibility('visible'); document.dispatchEvent(new Event('visibilitychange')); });

      act(() => { vi.advanceTimersByTime(60000); });

      expect(result.current.status).toBe('paused');
      expect(result.current.interrupted).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('leaves desktop playback alone when a background tab kept speaking', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    const spokenBefore = state.spoken.length;

    act(() => { setVisibility('hidden'); document.dispatchEvent(new Event('visibilitychange')); });
    // Desktop Chrome/Edge/Firefox carry on in a background tab.
    act(() => { setVisibility('visible'); document.dispatchEvent(new Event('visibilitychange')); });

    expect(result.current.status).toBe('playing');
    expect(result.current.interrupted).toBe(false);
    expect(state.spoken).toHaveLength(spokenBefore);
  });

  it('stops talking when the component unmounts', () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result, unmount } = renderHook(() => useSpeech(units('One. Two.')));
    act(() => result.current.play());

    const before = state.cancels;
    unmount();
    expect(state.cancels).toBeGreaterThan(before);
  });

  it('persists voice and rate, and applies the rate to new utterances', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }, { name: 'GB', lang: 'en-GB' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two.')));

    act(() => result.current.setRate(1.5));
    act(() => result.current.setVoice('GB'));
    await waitFor(() => expect(result.current.voice?.name).toBe('GB'));

    act(() => result.current.play());
    expect(state.spoken.at(-1).rate).toBe(1.5);
    expect(state.spoken.at(-1).voice.name).toBe('GB');
    expect(SPEECH_RATES).toContain(1.5);
  });

  it('applies a mid-playback rate change immediately', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two. Three.')));
    act(() => result.current.play());
    expect(state.spoken.at(-1).rate).toBe(1);

    act(() => result.current.setRate(0.75));
    await waitFor(() => expect(state.spoken.at(-1).rate).toBe(0.75));
  });

  it('abandons playback when the topic changes', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result, rerender } = renderHook(({ u }) => useSpeech(u), {
      initialProps: { u: units('First topic.') },
    });
    act(() => result.current.play());

    const before = state.cancels;
    rerender({ u: units('A different topic.') });

    await waitFor(() => expect(result.current.status).toBe('idle'));
    expect(state.cancels).toBeGreaterThan(before);
  });

  it('persists the keep-awake preference and reports platform support', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const request = vi.fn().mockResolvedValue({ release: vi.fn().mockResolvedValue(undefined) });
    vi.stubGlobal('navigator', { ...navigator, wakeLock: { request } });

    const { result } = renderHook(() => useSpeech(units(multiChunk(2))));
    expect(result.current.wakeLockSupported).toBe(true);
    expect(result.current.keepAwake).toBe(false); // opt-in, never on by default

    act(() => result.current.setKeepAwake(true));
    await waitFor(() => expect(result.current.keepAwake).toBe(true));
    expect(localStorage.getItem('arete:speech:awake')).toBe('1');

    act(() => result.current.play());
    await waitFor(() => expect(request).toHaveBeenCalledWith('screen'));
  });

  it('reacquires the wake lock when a pause lands while the request is in flight', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);

    // A request() we control, so the pause can land mid-flight.
    let settle;
    const locks = [];
    const request = vi.fn(() => new Promise((resolve) => {
      settle = () => { const lock = { release: vi.fn().mockResolvedValue() }; locks.push(lock); resolve(lock); };
    }));
    vi.stubGlobal('navigator', { ...navigator, wakeLock: { request } });

    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.setKeepAwake(true));
    await waitFor(() => expect(result.current.keepAwake).toBe(true));

    act(() => result.current.play());
    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    // Pause while the first request is still pending, then resume immediately.
    act(() => result.current.pause());
    act(() => result.current.resume());
    await act(async () => { settle(); await Promise.resolve(); });

    // The resume must have asked again; blocking on the stale pending request
    // left playback running with the screen free to sleep.
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
  });

  it('takes the wake lock back when it carries on after a suspension', async () => {
    // Hiding releases the lock, and the restart branch used not to ask for it
    // again — so the first screen lock quietly turned "Keep screen on" off for
    // the rest of the topic, and the next lock interrupted the same listen.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const request = vi.fn().mockResolvedValue({ release: vi.fn().mockResolvedValue() });
    vi.stubGlobal('navigator', { ...navigator, wakeLock: { request } });

    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.setKeepAwake(true));
    await waitFor(() => expect(result.current.keepAwake).toBe(true));
    act(() => result.current.play());
    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));

    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    act(() => { state.speaking = false; state.paused = false; state.current = null; });
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    act(() => document.dispatchEvent(new Event('visibilitychange')));

    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
  });

  it('plays on regardless when the platform refuses a wake lock', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    vi.stubGlobal('navigator', {
      ...navigator,
      wakeLock: { request: vi.fn().mockRejectedValue(new Error('denied')) },
    });

    const { result } = renderHook(() => useSpeech(units(multiChunk(2))));
    act(() => result.current.setKeepAwake(true));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));
  });

  it('does nothing useful but does not throw with no units', () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech([]));
    act(() => result.current.play());
    expect(result.current.status).toBe('idle');
    expect(result.current.unitCount).toBe(0);
  });
});

// ─── The two defects a single-hook test could not reach ──────────────────────
//
// Both were found by driving the real page rather than the stub, and both fail
// silently: the control bar goes on showing a running player with nothing coming
// out of the speakers. See docs/audio-playback-plan.md §4.8.

describe('useSpeech — recovering the device after a pause', () => {
  beforeEach(() => { localStorage.clear(); });
  afterEach(() => { vi.unstubAllGlobals(); });

  it('speaks again after pause → skip, instead of queueing onto a paused synth', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(2), multiChunk(2))));

    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));

    act(() => result.current.pause());
    expect(state.paused).toBe(true);

    // cancel() does not lift the pause, so a play() that only cancels leaves the
    // synth paused and every utterance it queues is silent.
    const before = state.spoken.length;
    act(() => result.current.play(1, { viaSkip: true }));

    await waitFor(() => expect(result.current.status).toBe('playing'));
    expect(state.spoken.length).toBeGreaterThan(before);
    expect(state.paused).toBe(false); // the new utterance can actually be voiced
  });

  it('lifts the pause on stop too, so the next Listen is not born mute', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(2))));

    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));
    act(() => result.current.pause());
    act(() => result.current.stop());

    expect(state.paused).toBe(false);
  });
});

describe('useSpeech — the arrows on a finished topic', () => {
  beforeEach(() => { localStorage.clear(); });
  afterEach(() => { vi.unstubAllGlobals(); });

  it('leaves the chosen section standing, instead of Play throwing it away', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. ', multiChunk(2), multiChunk(2))));

    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));

    // Play it out to 'ended'.
    for (let i = 0; i < 30 && state.current; i += 1) act(() => state.endCurrent());
    await waitFor(() => expect(result.current.status).toBe('ended'));

    // Now pick a section with the arrows. Status must leave 'ended', or the
    // Play button — which reads 'ended' as "start over" — discards the choice.
    act(() => result.current.prev());
    expect(result.current.unitIndex).toBe(1);
    expect(result.current.status).not.toBe('ended');
  });
});

describe('useSpeech — a voice that cannot speak', () => {
  beforeEach(() => { localStorage.clear(); });
  afterEach(() => { vi.unstubAllGlobals(); });

  const failEverything = (state) => {
    // Every chunk errors the moment it is handed over, the way a device with a
    // broken voice behaves (synthesis-failed / synthesis-unavailable).
    const realSpeak = speechSynthesis.speak;
    vi.stubGlobal('speechSynthesis', new Proxy(speechSynthesis, {
      get(target, prop) {
        if (prop !== 'speak') return Reflect.get(target, prop);
        return (utterance) => {
          realSpeak.call(target, utterance);
          state.speaking = false;
          queueMicrotask(() => utterance.onerror?.({ error: 'synthesis-failed' }));
        };
      },
    }));
  };

  it('stops and says so, instead of draining the queue and reporting a finish', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const onFinished = vi.fn();
    const { result } = renderHook(() => useSpeech(units(multiChunk(3), multiChunk(3)), { onFinished }));

    failEverything(state);
    act(() => result.current.play());

    await waitFor(() => expect(result.current.failed).toBe(true));
    expect(result.current.status).toBe('paused');

    // The whole point: every chunk erroring used to walk the queue to its end in
    // milliseconds and call onFinished(true), which marks the topic READ with no
    // audio ever played and nothing shown to the student.
    expect(onFinished).not.toHaveBeenCalled();
  });

  it('does not report a clean listen when nothing was ever spoken', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const onFinished = vi.fn();
    // One unit, one chunk — too short to ever hit the consecutive-error cut-off,
    // so the empty-slot finish is what has to refuse.
    const { result } = renderHook(() => useSpeech(units('Short one.'), { onFinished }));

    failEverything(state);
    act(() => result.current.play());

    await waitFor(() => expect(onFinished).toHaveBeenCalled());
    expect(onFinished).toHaveBeenCalledWith(false);
  });

  it('says so on screen too, rather than showing a normal finish', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    // Same one-chunk topic: too short for the error streak, so the exhaustion
    // path is the only thing that can tell the student anything.
    const { result } = renderHook(() => useSpeech(units('Short one.')));

    failEverything(state);
    act(() => result.current.play());

    await waitFor(() => expect(result.current.failed).toBe(true));
    expect(result.current.status).toBe('paused');
    expect(result.current.status).not.toBe('ended');
  });

  it('does not call a run clean when one chunk failed in the middle of it', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const onFinished = vi.fn();
    const { result } = renderHook(() => useSpeech(units(multiChunk(3)), { onFinished }));

    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));

    // First chunk fails, every later chunk succeeds.
    const first = state.current;
    state.current = null;
    act(() => first.onerror({ error: 'synthesis-failed' }));
    for (let i = 0; i < 30 && state.current; i += 1) act(() => state.endCurrent());

    await waitFor(() => expect(onFinished).toHaveBeenCalled());
    // That sentence was never heard, so the topic must not be marked read.
    expect(onFinished).toHaveBeenCalledWith(false);
  });

  it('recovers when a single chunk fails and the rest are fine', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));

    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));

    const first = state.current;
    state.current = null;
    act(() => first.onerror({ error: 'synthesis-failed' }));

    await waitFor(() => expect(state.spoken.length).toBeGreaterThan(1));
    expect(result.current.failed).toBe(false);
    expect(result.current.status).toBe('playing');
  });
});

describe('useSpeech — one device, many mounted players', () => {
  beforeEach(() => { localStorage.clear(); });
  afterEach(() => { vi.unstubAllGlobals(); });

  it('does not silence a playing topic when another topic unmounts', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);

    // Two accordions open at once — LectureNotes keeps a Set of open topics.
    const playing = renderHook(() => useSpeech(units(multiChunk(3))));
    const other = renderHook(() => useSpeech(units(multiChunk(2))));

    act(() => playing.result.current.play());
    await waitFor(() => expect(playing.result.current.status).toBe('playing'));
    const cancelsBefore = state.cancels;

    other.unmount(); // collapse the OTHER topic

    expect(state.cancels).toBe(cancelsBefore); // it never touched the device
    expect(playing.result.current.status).toBe('playing');
    expect(state.speaking).toBe(true);

    playing.unmount();
  });

  it('stands the previous player down when another topic takes over', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);

    const first = renderHook(() => useSpeech(units(multiChunk(3))));
    const second = renderHook(() => useSpeech(units(multiChunk(2))));

    act(() => first.result.current.play());
    await waitFor(() => expect(first.result.current.status).toBe('playing'));

    act(() => second.result.current.play());
    await waitFor(() => expect(second.result.current.status).toBe('playing'));

    // Two bars both reading "Pause" is the thing to avoid: only one can be live.
    await waitFor(() => expect(first.result.current.status).toBe('idle'));

    first.unmount();
    second.unmount();
  });

  it('does not restart the chunk when the voice list first arrives mid-listen', async () => {
    // Landmine 1: getVoices() is empty on the first Chrome call. A student who
    // presses Listen before `voiceschanged` lands begins with voice === null,
    // and treating null → the real voice as a settings change restarted the
    // chunk in flight — so they heard the opening sentence twice.
    const state = install([]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    expect(result.current.voice).toBeNull();

    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));
    const spokenBefore = state.spoken.length;

    act(() => state.emitVoicesChanged([{ name: 'NG', lang: 'en-NG', default: true }]));
    await waitFor(() => expect(result.current.voice?.name).toBe('NG'));

    expect(state.spoken.length).toBe(spokenBefore); // nothing re-spoken
    expect(result.current.status).toBe('playing');
  });

  it('still stops the device when the player that owns it unmounts', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result, unmount } = renderHook(() => useSpeech(units(multiChunk(3))));

    act(() => result.current.play());
    await waitFor(() => expect(result.current.status).toBe('playing'));

    const cancelsBefore = state.cancels;
    unmount();

    expect(state.cancels).toBeGreaterThan(cancelsBefore);
    expect(state.speaking).toBe(false);
  });
});

describe('useSpeech — the karaoke caption', () => {
  beforeEach(() => { localStorage.clear(); });
  afterEach(() => { vi.unstubAllGlobals(); });

  it('shows the chunk once it starts speaking, with no word picked out yet', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());

    await waitFor(() => expect(result.current.caption).not.toBeNull());
    expect(result.current.caption.text).toBe(state.spoken[0].text);
    expect(result.current.caption.start).toBe(-1);
  });

  it('picks out the exact word the engine reports', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 3 }));

    expect(result.current.caption.start).toBe(4);
    expect(result.current.caption.end).toBe(7);
    expect(result.current.caption.text.slice(4, 7)).toBe('two');
  });

  it('finds the word boundary itself when the engine reports no charLength', async () => {
    // Some Android WebViews send a word boundary with charIndex only. The
    // caption cannot show a one-character highlight in that case — it has to
    // scan forward the way the engine itself just did.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4 }));

    const { start, end, text } = result.current.caption;
    expect(text.slice(start, end)).toBe('two');
  });

  it('only a word boundary moves the highlight, never a sentence one', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 3 }));
    const before = result.current.caption;

    act(() => state.spoken[0].onboundary?.({ name: 'sentence', charIndex: 0 }));

    expect(result.current.caption).toEqual(before);
  });

  it('freezes rather than clearing on pause', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 3 }));

    act(() => result.current.pause());

    expect(result.current.caption?.start).toBe(4);
  });

  it('clears on stop, so a fresh Listen does not open on stale text', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    act(() => result.current.stop());

    expect(result.current.caption).toBeNull();
  });

  it('drops the caption when the topic changes underneath it', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result, rerender } = renderHook(({ u }) => useSpeech(u), {
      initialProps: { u: units('First topic.') },
    });
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    rerender({ u: units('A different topic.') });

    await waitFor(() => expect(result.current.caption).toBeNull());
  });

  it('stands down silently when another topic takes the device', async () => {
    // claimDevice's standDown() is a separate reset path from stop() — the
    // caption has to be cleared there too, or a second topic's Listen leaves
    // the first one's last sentence lit up behind an idle bar.
    install([{ name: 'NG', lang: 'en-NG' }]);
    const first = renderHook(() => useSpeech(units(multiChunk(3))));
    const second = renderHook(() => useSpeech(units(multiChunk(2))));

    act(() => first.result.current.play());
    await waitFor(() => expect(first.result.current.caption).not.toBeNull());

    act(() => second.result.current.play());
    await waitFor(() => expect(first.result.current.status).toBe('idle'));
    expect(first.result.current.caption).toBeNull();

    first.unmount();
    second.unmount();
  });

  it('clears the caption when nothing was ever heard', async () => {
    // The "reached the end having spoken nothing" branch sets failed=true but
    // is a separate exit from stop()/standDown() — it needs its own clear, or
    // the chunk that started right before it errored goes on looking read.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('Short one.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    act(() => state.spoken[0].onerror?.({ error: 'synthesis-failed' }));

    await waitFor(() => expect(result.current.failed).toBe(true));
    expect(result.current.caption).toBeNull();
  });

  it('clears the caption when the voice fails repeatedly mid-topic', async () => {
    // The MAX_ERROR_STREAK branch is a third exit that sets failed=true — same
    // requirement, different code path, so it needs its own assertion.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    for (let i = 0; i < 3; i += 1) {
      const u = state.current;
      act(() => u?.onerror?.({ error: 'synthesis-failed' }));
    }

    await waitFor(() => expect(result.current.failed).toBe(true));
    expect(result.current.caption).toBeNull();
  });

  it('clears the frozen caption when picking a new section from a finished topic', async () => {
    // From 'ended' the caption is frozen on the closing chunk. skipTo's
    // not-playing branch moves unitIndex and the heading above the caption
    // without touching the caption itself, so Previous from a finished topic
    // left the old chunk's text sitting under the newly-picked section.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One.', 'Two.', 'Three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    for (let i = 0; i < 30 && state.current; i += 1) act(() => state.endCurrent());
    await waitFor(() => expect(result.current.status).toBe('ended'));
    expect(result.current.caption).not.toBeNull();

    act(() => result.current.prev());

    expect(result.current.caption).toBeNull();
  });

  it('clears the caption when a chunk stalls twice and playback gives up', async () => {
    // Landmine 5's giveUp() is a fourth failure exit, separate from the three
    // above — the caption must not go on showing the wedged chunk under the
    // screen-lock notice.
    vi.useFakeTimers();
    try {
      const state = install([{ name: 'NG', lang: 'en-NG' }]);
      const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
      act(() => result.current.play());
      await act(async () => { await Promise.resolve(); });
      expect(result.current.caption).not.toBeNull();
      const first = state.spoken[0];

      act(() => { vi.advanceTimersByTime(25000); });          // first stall → retry
      await act(async () => { await Promise.resolve(); });
      act(() => first.onend?.());                             // the cancelled one, late
      act(() => { vi.advanceTimersByTime(25000); });          // the retry wedges too

      expect(result.current.status).toBe('paused');
      expect(result.current.interrupted).toBe(true);
      expect(result.current.caption).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it('treats a non-numeric charLength as missing rather than concatenating it', async () => {
    // A non-conforming engine reporting charLength as a numeric STRING used to
    // make `start + length` concatenate ("4" + "3" = "43") instead of add,
    // slicing a multi-word span instead of the one word actually spoken.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: '3' }));

    const { start, end, text } = result.current.caption;
    expect(text.slice(start, end)).toBe('two');
  });

  it('clamps an oversized charLength instead of overshooting the word', async () => {
    // A numeric but implausibly large charLength (trailing punctuation or
    // whitespace folded in by a non-conforming engine) used to extend the
    // highlight straight past the word actually spoken.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 20 }));

    const { start, end, text } = result.current.caption;
    expect(text.slice(start, end)).toBe('two');
  });

  it('freezes even if the engine keeps sending boundaries after pause — Android', async () => {
    // pause() does not reliably stop Android's engine (see armStall's own
    // comment on this), so boundaries for the rest of the sentence can keep
    // arriving after the click. The caption must not keep advancing through
    // them behind a bar that reads Paused.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 0, charLength: 3 }));
    const before = result.current.caption;

    act(() => result.current.pause());
    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 3 }));

    expect(result.current.caption).toEqual(before);
  });

  it('does not let a late onstart update the caption once pause has landed', async () => {
    // speak() is synchronous but onstart is not (queued as a microtask by the
    // stub, the way a real engine defers it too). A Pause click in that gap
    // used to still have onstart overwrite the caption once it finally fired.
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    act(() => result.current.pause());
    expect(result.current.caption).toBeNull();

    await act(async () => { await Promise.resolve(); }); // the queued onstart fires

    expect(result.current.caption).toBeNull();
  });

  it('clears the caption when only the final chunk errors after earlier ones played cleanly', async () => {
    // errorStreakRef is reset by onend and only incremented by onerror, so a
    // nonzero value at the normal 'ended' branch means the LAST chunk errored
    // rather than finished — its onstart set the caption, but no onend ever
    // confirmed it was heard. Distinct from the "spoke nothing" branch: earlier
    // chunks here played fine.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One.', 'Two.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    act(() => state.endCurrent()); // first unit's chunk finishes cleanly
    expect(result.current.unitIndex).toBe(1);
    // Let the last chunk's own onstart actually land before it errors — a
    // real engine never fires onstart AFTER onerror for the same utterance,
    // and firing them out of order here would leave that late onstart's own
    // setCaption to race the fix under test.
    await act(async () => { await Promise.resolve(); });

    act(() => state.current?.onerror?.({ error: 'synthesis-failed' })); // the last chunk fails instead

    await waitFor(() => expect(result.current.status).toBe('ended'));
    expect(result.current.caption).toBeNull();
  });

  it('ignores a non-finite charIndex rather than producing a NaN highlight', async () => {
    // typeof NaN === 'number', so the existing type check alone does not
    // exclude it.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    const before = result.current.caption;

    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: NaN, charLength: 3 }));

    expect(result.current.caption).toEqual(before);
  });

  it('clamps an out-of-range charIndex into the chunk instead of highlighting nothing', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    const text = state.spoken[0].text;

    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: text.length + 50, charLength: 3 }));

    const { start, end } = result.current.caption;
    expect(start).toBeLessThan(text.length);
    expect(end).toBeGreaterThan(start);
  });

  it('clears the caption on a mid-playback voice change', async () => {
    // The restart's own onstart is async — the OLD caption, possibly further
    // into the sentence than where the restarted chunk actually begins, must
    // not sit on screen implying the voice picked up further along than it did.
    const state = install([{ name: 'NG', lang: 'en-NG' }, { name: 'GB', lang: 'en-GB' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 3 }));

    act(() => result.current.setVoice('GB'));

    expect(result.current.caption).toBeNull();
  });

  it('clears the frozen caption on resume, before the restarted chunk speaks again', async () => {
    // resume() always restarts the current chunk from ITS OWN beginning
    // rather than the exact paused position — so the caption frozen by pause()
    // is stale the instant resume is pressed, not just once the restarted
    // chunk's own onstart eventually lands.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One two three.')));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 3 }));

    act(() => result.current.pause());
    act(() => result.current.resume());

    expect(result.current.caption).toBeNull();
  });

  it('clears the caption when a stalled chunk is retried', async () => {
    // Landmine 5's one-retry-before-giving-up path restarts the same chunk
    // from its beginning — same stale-caption gap as every other restart.
    vi.useFakeTimers();
    try {
      install([{ name: 'NG', lang: 'en-NG' }]);
      const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
      act(() => result.current.play());
      await act(async () => { await Promise.resolve(); });
      expect(result.current.caption).not.toBeNull();

      act(() => { vi.advanceTimersByTime(25000); }); // stall → retry

      expect(result.current.caption).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it('clears the caption when picking back up after a screen-lock suspension', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());

    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    act(() => { state.speaking = false; state.paused = false; state.current = null; });
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });

    act(() => document.dispatchEvent(new Event('visibilitychange')));

    expect(result.current.caption).toBeNull();
  });

  it('clears the caption immediately when a mid-topic chunk fails without ending the run', async () => {
    // One failed chunk below MAX_ERROR_STREAK does not end the run — advance()
    // moves straight to the next chunk instead. That chunk's own onstart is
    // async and can lag well behind this handler on a real engine, so the
    // caption has to clear here rather than wait for it to arrive.
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());
    await waitFor(() => expect(result.current.caption).not.toBeNull());
    act(() => state.spoken[0].onboundary?.({ name: 'word', charIndex: 4, charLength: 3 }));

    const first = state.current;
    act(() => first?.onerror?.({ error: 'synthesis-failed' }));

    expect(result.current.caption).toBeNull();
  });
});
