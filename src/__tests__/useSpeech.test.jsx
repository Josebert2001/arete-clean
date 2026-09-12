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
      state.speaking = true;
      state.paused = false;
    },
    cancel: () => {
      state.cancels += 1;
      const victim = state.current;
      state.current = null;
      state.speaking = false;
      state.paused = false;
      // Real browsers deliver this asynchronously — the whole reason the hook
      // gates its callbacks on a run id.
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

  it('tracks which unit is playing and finishes once', async () => {
    const state = install([{ name: 'NG', lang: 'en-NG' }]);
    const onFinished = vi.fn();
    const { result } = renderHook(() => useSpeech(units('First.', 'Second.'), { onFinished }));

    act(() => result.current.play());
    expect(result.current.unitIndex).toBe(0);

    act(() => state.endCurrent());
    await waitFor(() => expect(result.current.unitIndex).toBe(1));

    act(() => state.endCurrent());
    await waitFor(() => expect(result.current.status).toBe('ended'));
    expect(onFinished).toHaveBeenCalledTimes(1);
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

  it('pauses and flags an interruption when the screen locks — landmine 4', async () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech(units('One. Two.')));
    act(() => result.current.play());

    act(() => {
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    await waitFor(() => expect(result.current.status).toBe('paused'));
    // The distinction the UI needs: the student did not do this.
    expect(result.current.interrupted).toBe(true);

    act(() => {
      Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    });
    act(() => result.current.resume());
    expect(result.current.interrupted).toBe(false);
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

  it('does nothing useful but does not throw with no units', () => {
    install([{ name: 'NG', lang: 'en-NG' }]);
    const { result } = renderHook(() => useSpeech([]));
    act(() => result.current.play());
    expect(result.current.status).toBe('idle');
    expect(result.current.unitCount).toBe(0);
  });
});
