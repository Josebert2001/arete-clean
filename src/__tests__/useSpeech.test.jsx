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
      if (!state.paused) state.speaking = true;
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

  it('treats our own cancel error as normal, not as a failure', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two.')));
    act(() => result.current.play());
    const utterance = state.spoken[0];

    act(() => utterance.onerror?.({ error: 'interrupted' }));
    // Still playing — an interruption we caused must not end the topic.
    expect(result.current.status).toBe('playing');
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

  it('flags an interruption when the phone suspended synthesis while away', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units(multiChunk(3))));
    act(() => result.current.play());

    act(() => { setVisibility('hidden'); document.dispatchEvent(new Event('visibilitychange')); });
    // What a locked phone does: synthesis simply stops.
    act(() => { state.speaking = false; state.paused = false; state.current = null; });
    act(() => { setVisibility('visible'); document.dispatchEvent(new Event('visibilitychange')); });

    await waitFor(() => expect(result.current.status).toBe('paused'));
    // The distinction the UI needs: the student did not do this.
    expect(result.current.interrupted).toBe(true);

    act(() => result.current.resume());
    expect(result.current.interrupted).toBe(false);
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
