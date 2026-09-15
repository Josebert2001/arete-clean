// The Listen control bar. useSpeech's own suite covers the playback mechanics;
// this covers what the student can actually see and click — including the two
// pieces of copy that exist to prevent a confused student: the skipped-content
// caption, and the notice that distinguishes a screen-lock suspension from a
// pause they chose.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ListenToTopic from '../components/ListenToTopic.jsx';
import { describeSkips } from '../utils/speechText.js';

function installSynth(voices = [{ name: 'NG', lang: 'en-NG', default: true }]) {
  const state = { spoken: [], current: null, speaking: false, paused: false, listeners: {}, refuse: false };
  vi.stubGlobal('speechSynthesis', {
    getVoices: () => voices,
    addEventListener: (t, fn) => { (state.listeners[t] ??= []).push(fn); },
    removeEventListener: () => {},
    // `refuse` is the device that takes the utterance and never speaks it —
    // iOS after a screen lock, which wants a fresh gesture. No voice, no
    // `onstart`, no error: the stall watchdog is the only thing that can tell.
    speak: (u) => {
      state.spoken.push(u);
      state.current = u;
      if (state.refuse) return;
      state.speaking = true;
      queueMicrotask(() => { if (state.current === u) u.onstart?.(); });
    },
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

  const visibility = (v) =>
    Object.defineProperty(document, 'visibilityState', { value: v, configurable: true });

  it('carries on by itself when the phone comes back', async () => {
    const state = installSynth();

    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('button', { name: 'Pause' });
    const before = state.spoken.length;

    // The suspension is detected on RETURN, not predicted on leaving — a
    // backgrounded desktop tab keeps speaking and must not be paused.
    visibility('hidden');
    fireEvent(document, new Event('visibilitychange'));
    state.speaking = false;
    state.paused = false;
    state.current = null;
    visibility('visible');
    fireEvent(document, new Event('visibilitychange'));

    // The student never pressed pause. Making them find the bar and press play
    // was the single most-reported thing wrong with this player.
    await waitFor(() => expect(state.spoken.length).toBeGreaterThan(before));
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    visibility('visible');
  });

  it('explains a screen-lock suspension instead of just going quiet', async () => {
    vi.useFakeTimers();
    try {
      const state = installSynth();

      render(<ListenToTopic topic={richTopic} />);
      fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
      expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();

      // A device that will not start again without a fresh gesture: the restart
      // above is attempted and gets nowhere, and the notice is what is left.
      state.refuse = true;
      visibility('hidden');
      fireEvent(document, new Event('visibilitychange'));
      state.speaking = false;
      state.paused = false;
      state.current = null;
      visibility('visible');
      fireEvent(document, new Event('visibilitychange'));

      act(() => { vi.advanceTimersByTime(60000); });

      expect(screen.getByText(/audio stops when the screen locks/)).toBeInTheDocument();
      visibility('visible');
    } finally {
      vi.useRealTimers();
    }
  });

  it('shows what will be skipped BEFORE the student presses play', () => {
    installSynth();
    render(<ListenToTopic topic={richTopic} />);

    // The whole point of this line is the decision to press play. Living only
    // inside the expanded bar meant it could not be read until after the click.
    const caption = describeSkips({ code: 2, table: 1 });
    expect(screen.getByText(new RegExp(caption.text.split(' ')[0]))).toBeInTheDocument();
    expect(screen.getByText(/announced, not read aloud/)).toBeInTheDocument();
    // Still collapsed — no transport controls yet.
    expect(screen.queryByRole('button', { name: 'Pause' })).toBeNull();
  });

  it('renders a maths heading in the bar, rather than printing its LaTeX', async () => {
    installSynth();
    // MTH 121 has seven headings like this. The notes render them through
    // MathText; the player printed the same string raw, so the student saw
    // "Integrating powers of $x$" in the bar while the section above read fine.
    const topic = {
      title: 'Integration',
      number: 4,
      sections: [
        { type: 'text', heading: 'Integrating powers of $x$', text: prose('The power rule') },
        { type: 'text', heading: 'Plain heading', text: prose('Something else') },
      ],
    };

    render(<ListenToTopic topic={topic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));

    const bar = await screen.findByRole('group', { name: 'Listen to this topic' });
    expect(bar.textContent).not.toContain('$');
    expect(bar.textContent).toContain('Integrating powers of');
  });

  it('reports the outline item being spoken, and clears it when stopped', async () => {
    const state = installSynth();
    const reports = [];
    render(<ListenToTopic topic={richTopic} onSpeakingOutlineIndex={(i) => reports.push(i)} />);

    // Nothing is playing yet, so the page has been told to highlight nothing.
    expect(reports.at(-1)).toBe(null);

    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await waitFor(() => expect(reports.at(-1)).toBe(0));

    fireEvent.click(screen.getByRole('button', { name: 'Next section' }));
    await waitFor(() => expect(reports.at(-1)).toBeGreaterThan(0));

    // A pause is not "still reading this" — the wash has to come off.
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    await waitFor(() => expect(reports.at(-1)).toBe(null));
    expect(state.spoken.length).toBeGreaterThan(0);
  });

  it('carries the follow preference to the page, and remembers it', async () => {
    installSynth();
    const reports = [];
    render(
      <ListenToTopic
        topic={richTopic}
        onSpeakingOutlineIndex={(i, opts) => reports.push(opts?.follow)}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await waitFor(() => expect(reports.at(-1)).toBe(true));

    // Turning it off has to reach the page immediately — it is the page that
    // scrolls, and a preference that only lands at the next section is a
    // toggle that looks broken.
    fireEvent.click(screen.getByRole('button', { name: /Scroll to the section being read/ }));
    await waitFor(() => expect(reports.at(-1)).toBe(false));
    expect(localStorage.getItem('arete:speech:follow')).toBe('0');
  });

  it('docks the transport once the real bar has scrolled away', async () => {
    // The bar sits at the top of a topic that is several screens long, so by the
    // time the voice is halfway through it, pausing meant scrolling back up to
    // find the buttons. The docked copy is the same player, not a second one.
    const observers = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {}
      disconnect() {}
    });
    installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('group', { name: 'Listen to this topic' });

    // On screen: one bar, one set of controls.
    expect(screen.queryByRole('group', { name: 'Listen controls' })).toBeNull();

    act(() => observers.at(-1).callback([{ isIntersecting: false }]));
    expect(screen.getByRole('group', { name: 'Listen controls' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Pause' })).toHaveLength(2);

    // …and it goes away again when the real bar comes back, rather than
    // stacking two players on a short topic.
    act(() => observers.at(-1).callback([{ isIntersecting: true }]));
    expect(screen.queryByRole('group', { name: 'Listen controls' })).toBeNull();
  });

  it('keeps the docked bar on a topic that finished off screen', async () => {
    // Play on a finished topic means play the topic — but that control lived
    // only in the real bar, so a student who let a topic run out while reading
    // further down had to scroll back up to reach it. That is the complaint the
    // docked bar exists to answer.
    const observers = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {}
      disconnect() {}
    });
    const state = installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('group', { name: 'Listen to this topic' });
    act(() => observers.at(-1).callback([{ isIntersecting: false }]));

    for (let i = 0; i < 20; i += 1) {
      const utterance = state.current;
      if (!utterance) break;
      state.current = null;
      state.speaking = false;
      await waitFor(() => utterance.onend?.());
    }

    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Play' }).length).toBeGreaterThan(0));
    expect(screen.getByRole('group', { name: 'Listen controls' })).toBeInTheDocument();
  });

  it('reaches every open topic when the follow toggle is clicked in one of them', async () => {
    // LectureNotes keeps a player mounted per open topic, and follow is one
    // shared setting. Reading it at mount left the other topics reporting
    // `follow: true` after it had been turned off, and scrolling the page for a
    // preference that was saved as off.
    installSynth();
    const second = [];
    render(
      <>
        <ListenToTopic topic={richTopic} />
        <ListenToTopic
          topic={{ ...richTopic, title: 'Another topic', number: 5 }}
          onSpeakingOutlineIndex={(i, opts) => second.push(opts?.follow)}
        />
      </>,
    );
    const pills = screen.getAllByRole('button', { name: /Listen ·/ });
    fireEvent.click(pills[1]);
    await waitFor(() => expect(second.at(-1)).toBe(true));

    // Clicked in the FIRST topic's bar; the second topic is the one playing.
    fireEvent.click(pills[0]);
    const toggles = await screen.findAllByRole('button', { name: /Scroll to the section being read/ });
    fireEvent.click(toggles[0]);

    await waitFor(() => expect(second.at(-1)).toBe(false));
    expect(localStorage.getItem('arete:speech:follow')).toBe('0');
  });

  it('does not dock at all where there is no IntersectionObserver', async () => {
    // An old WebView, and jsdom. Docking permanently would be worse than never
    // docking, so the bar starts out considered visible.
    vi.stubGlobal('IntersectionObserver', undefined);
    installSynth();
    render(<ListenToTopic topic={richTopic} />);
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await screen.findByRole('group', { name: 'Listen to this topic' });
    expect(screen.queryByRole('group', { name: 'Listen controls' })).toBeNull();
  });

  it('clears the highlight when the player unmounts', async () => {
    installSynth();
    const reports = [];
    const { unmount } = render(
      <ListenToTopic topic={richTopic} onSpeakingOutlineIndex={(i) => reports.push(i)} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await waitFor(() => expect(reports.at(-1)).toBe(0));

    unmount(); // the student collapsed the topic mid-listen
    expect(reports.at(-1)).toBe(null);
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
