// Reading progress is the only study signal on Areté that a student produces by
// doing nothing but reading, so the parts worth guarding are the ones with no
// other feedback: that the bar counts what is actually on the page, that the
// manual toggle round-trips, and that a mark survives a remount (which is what
// "my progress was still there tomorrow" means in practice).
//
// jsdom has no IntersectionObserver, so auto-marking is inert here by design —
// the hook degrades to the manual toggle, which is exactly what this exercises.
// The dwell/observer logic is covered by unit tests on dwellMsFor.
//
// Interaction goes through fireEvent rather than user-event, matching
// profileForm.test.jsx — user-event is not a dependency of this project.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LectureNotes from '../components/LectureNotes';
import { READING_STORAGE_KEY, topicReadId, useReadingProgress } from '../components/useReadingProgress';

// Both AI buttons probe their endpoint on mount. Unmocked in jsdom the fetch
// rejects and both hide, which would make the Key points assertions vacuous.
vi.mock('../utils/apiClient', async (importOriginal) => ({
  ...(await importOriginal()),
  useApiAvailability: (url) => (url === '/api/summarize' ? 'ready' : 'unavailable'),
}));

const longText = 'Untrusted data is sent to an interpreter as part of a command or query. '.repeat(20);

const topics = [
  {
    number: '1',
    title: 'Foundations: Web & Mobile Applications',
    sections: [{ type: 'definition', heading: 'Introduction', text: longText }],
  },
  {
    number: '2',
    title: 'Website Attacks',
    sections: [{ type: 'bullets', heading: 'Kinds', items: ['SQL injection', 'Cross-site scripting'] }],
  },
];

// Mirrors CourseDetail: the page owns the reading state and passes it down, so
// its tab badge and the notes' own bar move together. Rendering LectureNotes
// bare would test a wiring the app does not use.
function NotesHost({ topics: t = topics }) {
  const reading = useReadingProgress('uuy-cyb-222');
  return (
    <LectureNotes
      topics={t}
      reading={reading}
      context={{ courseCode: 'UUY-CYB 222', courseTitle: 'Web and Mobile Applications Security' }}
    />
  );
}

const renderNotes = () => render(<NotesHost />);

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => vi.unstubAllGlobals());

// Speech stub in the style of listenToTopic.test.jsx: utterances never end on
// their own (the test decides), so the caption the strip shows is the test's
// to assert on.
function installSynth() {
  const state = { spoken: [], current: null, speaking: false, paused: false };
  vi.stubGlobal('speechSynthesis', {
    getVoices: () => [{ name: 'NG', lang: 'en-NG', default: true }],
    addEventListener: () => {},
    removeEventListener: () => {},
    speak: (u) => {
      state.spoken.push(u);
      state.current = u;
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

describe('reading progress', () => {
  it('starts at zero and counts the topics on the page', () => {
    renderNotes();
    expect(screen.getByText('0 of 2 topics read')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '2');
  });

  it('marks a topic read from the end-of-topic toggle', () => {
    renderNotes();
    // Only the first topic is open by default, so there is exactly one toggle.
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));

    expect(screen.getByText('1 of 2 topics read')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
    expect(screen.getByLabelText('Read')).toBeInTheDocument();
  });

  it('un-marks again — the manual toggle always wins', () => {
    renderNotes();
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));
    fireEvent.click(screen.getByRole('button', { name: 'Read — mark unread' }));

    expect(screen.getByText('0 of 2 topics read')).toBeInTheDocument();
    expect(screen.queryByLabelText('Read')).not.toBeInTheDocument();
  });

  it('persists under its own storage key and survives a remount', () => {
    const { unmount } = renderNotes();
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));
    unmount();

    const stored = JSON.parse(localStorage.getItem(READING_STORAGE_KEY));
    expect(stored.completedModules).toContain(topicReadId('uuy-cyb-222', topics[0]));
    // Must not have leaked into the quiz-score record.
    expect(localStorage.getItem('course-quizzes-v1')).toBeNull();

    renderNotes();
    expect(screen.getByText('1 of 2 topics read')).toBeInTheDocument();
  });

  it('celebrates a finished course once every topic is read', () => {
    renderNotes();
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));
    // Open the second topic to reach its toggle.
    fireEvent.click(screen.getByRole('button', { name: /Website Attacks/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));

    expect(screen.getByText('All 2 topics read')).toBeInTheDocument();
    expect(screen.queryByText(/of 2 topics read/)).not.toBeInTheDocument();
  });

  it('ignores read marks belonging to another course', () => {
    localStorage.setItem(
      READING_STORAGE_KEY,
      JSON.stringify({ completedModules: [topicReadId('cyb-122', topics[0])], quizScores: {} }),
    );
    renderNotes();
    expect(screen.getByText('0 of 2 topics read')).toBeInTheDocument();
  });
});

describe('key points button', () => {
  it('is offered on a substantial topic', () => {
    renderNotes();
    expect(screen.getByRole('button', { name: /Key points/ })).toBeInTheDocument();
  });

  it('is not offered on a topic too short to need a recap', () => {
    render(<NotesHost topics={[topics[1]]} />);
    expect(screen.queryByRole('button', { name: /Key points/ })).not.toBeInTheDocument();
  });
});

describe('without a reading owner', () => {
  it('renders the notes with no progress UI rather than a bar that does nothing', () => {
    render(<LectureNotes topics={topics} context={{ courseCode: 'UUY-CYB 222' }} />);
    expect(screen.getByText('2 topics')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Mark as read' })).not.toBeInTheDocument();
  });
});

describe('read-along strip', () => {
  it('renders the spoken words above the section being read, not in the player bar', async () => {
    installSynth();
    renderNotes();
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    const bar = await screen.findByRole('group', { name: 'Listen to this topic' });

    await waitFor(() => expect(document.querySelector('[data-read-along]')).toBeInTheDocument());
    const strip = document.querySelector('[data-read-along]');
    expect(strip.textContent).toMatch(/Untrusted data is sent/);
    // In the text flow — carried by the player, placed by the page.
    expect(bar).not.toContainElement(strip);
  });

  it('leaves no strip behind once the player is closed', async () => {
    installSynth();
    renderNotes();
    fireEvent.click(screen.getByRole('button', { name: /Listen ·/ }));
    await waitFor(() => expect(document.querySelector('[data-read-along]')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'Stop and close' }));
    await screen.findByRole('button', { name: /Listen ·/ });
    await waitFor(() => expect(document.querySelector('[data-read-along]')).toBeNull());
  });
});
