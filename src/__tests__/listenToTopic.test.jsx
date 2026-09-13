// The Listen control bar. useSpeech's own suite covers the playback mechanics;
// this covers what the student can actually see and click — including the two
// pieces of copy that exist to prevent a confused student: the skipped-content
// caption, and the notice that distinguishes a screen-lock suspension from a
// pause they chose.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListenToTopic from '../components/ListenToTopic.jsx';
import { describeSkips } from '../utils/speechText.js';

function installSynth(voices = [{ name: 'NG', lang: 'en-NG', default: true }]) {
  const state = { spoken: [], current: null, speaking: false, paused: false, listeners: {} };
  vi.stubGlobal('speechSynthesis', {
    getVoices: () => voices,
    addEventListener: (t, fn) => { (state.listeners[t] ??= []).push(fn); },
    removeEventListener: () => {},
    speak: (u) => { state.spoken.push(u); state.current = u; state.speaking = true; },
    cancel: () => { state.current = null; state.speaking = false; state.paused = false; },
    pause: () => { state.paused = true; },
    resume: () => { state.paused = false; },
    get speaking() { return state.speaking; },
    get paused() { return state.paused; },
  });
  vi.stubGlobal('SpeechSynthesisUtterance', class {
    constructor(text) { this.text = text; this.rate = 1; this.voice = null; }
  });
  return state;
}

// Long enough to clear MIN_NARRATE_CHARS (400 chars of body prose).
const prose = (label) =>
  `${label} is a way of organising information so that it can be retrieved, `
  + 'processed and protected. It matters because every later topic in this course '
  + 'assumes you already understand it, and examiners ask about it directly. '
  + 'Read it twice before moving on to the practical work that follows here.';

const richTopic = {
  title: 'Network Services',
  number: 4,
  sections: [
    { type: 'text', heading: 'Overview', text: prose('A network service') },
    { type: 'code', language: 'python', code: 'a = 1\nb = 2' },
    { type: 'code', language: 'python', code: 'c = 3' },
    { type: 'table', headers: ['A', 'B'], rows: [['1', '2']] },
    { type: 'text', heading: 'In practice', text: prose('Configuration') },
  ],
};

const thinTopic = {
  title: 'Arrays and Lists',
  number: 2,
  sections: [
    { type: 'text', text: 'Try these.' },
    { type: 'code', language: 'python', code: 'x = [1, 2, 3]\nprint(x)' },
  ],
};

beforeEach(() => {
  try { localStorage.clear(); } catch { /* unavailable */ }
});
afterEach(() => vi.unstubAllGlobals());

describe('describeSkips', () => {
  it('agrees in number and punctuates the list', () => {
    expect(describeSkips({ code: 1 })).toEqual({ text: '1 code listing', total: 1 });
    expect(describeSkips({ code: 12 }).text).toBe('12 code listings');
    expect(describeSkips({ code: 12, table: 1 }).text).toBe('12 code listings and 1 table');
    expect(describeSkips({ code: 2, table: 1, image: 3 }).text)
      .toBe('2 code listings, 1 table and 3 figures');
  });

  it('ignores a kind it has no wording for, rather than printing the raw key', () => {
    expect(describeSkips({ code: 1, mystery: 4 }).text).toBe('1 code listing');
  });

  it('is empty when nothing was skipped', () => {
    expect(describeSkips({})).toEqual({ text: '', total: 0 });
    expect(describeSkips(undefined).text).toBe('');
  });
});

describe('ListenToTopic', () => {
  it('renders nothing without the Web Speech API', () => {
    vi.stubGlobal('speechSynthesis', undefined);
    const { container } = render(<ListenToTopic topic={richTopic} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for a topic that is listings with a sentence of glue', () => {
    installSynth();
    const { container } = render(<ListenToTopic topic={thinTopic} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('offers a pill with an estimated duration before anything plays', () => {
    const state = installSynth();
    render(<ListenToTopic topic={richTopic} />);
    expect(screen.getByRole('button', { name: /Listen ·/ })).toBeInTheDocument();
    expect(state.spoken).toHaveLength(0);
  });

  it('starts speaking only once the student clicks — the iOS gesture rule', async () => {
    const state = installSynth();
    render(<ListenToTopic topic={richTopic} />);

    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await waitFor(() => expect(state.spoken.length).toBeGreaterThan(0));
    expect(screen.getByRole('group', { name: 'Listen to this topic' })).toBeInTheDocument();
  });

  it('warns which content is announced rather than read', async () => {
    installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    // Two code listings and a table in this topic.
    expect(await screen.findByText(/2 code listings and 1 table are announced, not read aloud/))
      .toBeInTheDocument();
  });

  it('toggles play and pause', async () => {
    installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    const pauseBtn = await screen.findByRole('button', { name: 'Pause' });
    fireEvent.click(pauseBtn);
    expect(await screen.findByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('moves between sections and disables the ends', async () => {
    installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    expect(await screen.findByText('1/2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous section' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Next section' }));
    await waitFor(() => expect(screen.getByText('2/2')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Next section' })).toBeDisabled();
  });

  it('cycles the playback speed and remembers it', async () => {
    installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    fireEvent.click(await screen.findByRole('button', { name: /Playback speed/ }));
    expect(await screen.findByRole('button', { name: /currently 1.25 times/ })).toBeInTheDocument();
    expect(localStorage.getItem('arete:speech:rate')).toBe('1.25');
  });

  it('offers a voice picker only when the device has a real choice', async () => {
    installSynth([{ name: 'NG', lang: 'en-NG', default: true }]);
    const { unmount } = render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('group', { name: 'Listen to this topic' });
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    unmount();

    installSynth([
      { name: 'NG', lang: 'en-NG', default: true },
      { name: 'GB', lang: 'en-GB' },
    ]);
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    expect(await screen.findByRole('combobox')).toBeInTheDocument();
  });

  it('stops and collapses on close', async () => {
    installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    fireEvent.click(await screen.findByRole('button', { name: 'Stop and close' }));
    expect(await screen.findByRole('button', { name: /Listen ·/ })).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Listen to this topic' })).not.toBeInTheDocument();
  });

  it('offers the keep-screen-on toggle only where the platform has the API', async () => {
    installSynth();
    const originalNavigator = navigator;

    vi.stubGlobal('navigator', { ...originalNavigator, wakeLock: undefined });
    const { unmount } = render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('group', { name: 'Listen to this topic' });
    expect(screen.queryByRole('button', { name: /Keep the screen on/ })).not.toBeInTheDocument();
    unmount();

    installSynth();
    vi.stubGlobal('navigator', {
      ...originalNavigator,
      wakeLock: { request: vi.fn().mockResolvedValue({ release: vi.fn().mockResolvedValue() }) },
    });
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    const toggle = await screen.findByRole('button', { name: /Keep the screen on/ });
    // Opt-in: a wake lock costs battery, so it is never on by default.
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(toggle);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-pressed', 'true'));
    expect(localStorage.getItem('arete:speech:awake')).toBe('1');
  });

  it('reports a clean finish so the caller can mark the topic read', async () => {
    const state = installSynth();
    const onFinished = vi.fn();
    render(<ListenToTopic topic={richTopic} onFinished={onFinished} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    // Play every chunk through to the end without touching the skip buttons.
    for (let i = 0; i < 20 && !onFinished.mock.calls.length; i += 1) {
      const utterance = state.current;
      if (!utterance) break;
      state.current = null;
      state.speaking = false;
      await waitFor(() => utterance.onend?.());
    }

    await waitFor(() => expect(onFinished).toHaveBeenCalledWith(true));
  });

  it('explains a screen-lock suspension instead of just going quiet', async () => {
    const state = installSynth();
    const visibility = (v) =>
      Object.defineProperty(document, 'visibilityState', { value: v, configurable: true });

    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('button', { name: 'Pause' });

    // The suspension is detected on RETURN, not predicted on leaving — a
    // backgrounded desktop tab keeps speaking and must not be paused.
    visibility('hidden');
    fireEvent(document, new Event('visibilitychange'));
    state.speaking = false;
    state.paused = false;
    state.current = null;
    visibility('visible');
    fireEvent(document, new Event('visibilitychange'));

    expect(await screen.findByText(/audio stops when the screen locks/)).toBeInTheDocument();
    visibility('visible');
  });

  it('replays the whole topic after it ends, not just the closing section', async () => {
    const state = installSynth();
    render(<ListenToTopic topic={richTopic} onFinished={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('button', { name: 'Pause' });

    // Play it out: each chunk ends, the queue walks to the last unit and stops.
    for (let i = 0; i < 40 && state.current; i += 1) {
      const utterance = state.current;
      state.current = null;
      state.speaking = false;
      await waitFor(() => expect(utterance.onend).toBeTypeOf('function'));
      fireEvent(window, new Event('noop')); // flush pending React work
      utterance.onend();
    }

    const play = await screen.findByRole('button', { name: 'Play' });
    state.spoken.length = 0;
    fireEvent.click(play);

    // From 'ended', unitIndex is the LAST section. Replaying from there gave the
    // student the closing paragraph alone, and because the run did not start at
    // unit 0 it counted as unclean, so finishing it never marked the topic read.
    await waitFor(() => expect(state.spoken.length).toBeGreaterThan(0));
    expect(state.spoken[0].text).toContain('A network service');
  });
});
