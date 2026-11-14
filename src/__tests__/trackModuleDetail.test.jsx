import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mocks = vi.hoisted(() => ({ gatesActive: false }));

const room = (id, number, title) => ({
  id, number, title, subtitle: `${title} subtitle`, difficulty: 3, estimatedHours: 2,
  theory: [{ heading: `${title}: first idea`, body: 'First idea body.' }, { heading: `${title}: second idea`, body: 'Second idea body.' }],
  codeExamples: [{ title: 'Worked example', language: 'text', code: 'echo hi', explanation: 'It prints hi.' }],
  practiceQuestions: [{ question: 'Q?', options: ['a', 'b'], correctIndex: 0, explanation: 'because' }],
  challenge: { title: 'Find the flag' },
  miniProject: { title: 'Build a thing', description: 'Make it.', hints: ['First hint', 'Second hint'] },
});
const modules = [room('sec-one', 1, 'Room One'), room('sec-two', 2, 'Room Two'), room('sec-three', 3, 'Room Three')];
const track = {
  slug: 'security', label: 'Security', language: 'text', storageKey: 'security-test-progress',
  listPath: '/tracks/security', detailPath: id => `/tracks/security/${id}`,
  accentBg: 'bg-ink', accentText: 'text-cream', dotColor: 'bg-moss',
  modules, getModuleById: id => modules.find(m => m.id === id),
};

vi.mock('../data/useTrack', () => ({ useTrack: () => ({ track, status: 'ready' }) }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: null }) }));
vi.mock('../context/PlanContext', () => ({ usePlan: () => ({ gatesActive: mocks.gatesActive }) }));
vi.mock('../lib/supabase', () => ({ supabase: null }));
vi.mock('../data/plans', async importOriginal => ({ ...await importOriginal(), FREE_CTF_ROOMS: 2 }));
vi.mock('../components/CodeBlock', () => ({ default: ({ code }) => <pre>{code}</pre> }));
vi.mock('../components/CodePlayground', () => ({ default: () => <div>playground</div> }));
vi.mock('../components/Diagram', () => ({ default: () => null }));
vi.mock('../components/ExplainSelection', () => ({ default: ({ children }) => children }));
vi.mock('../components/UpgradePrompt', () => ({ default: ({ title }) => <p>{title}</p> }));
vi.mock('../components/Quiz', () => ({
  default: ({ onComplete }) => <button onClick={() => onComplete(1, 1)}>Finish quiz</button>,
}));
vi.mock('../components/FlagChallenge', () => ({
  default: ({ onSolve }) => <button onClick={onSolve}>Submit flag</button>,
}));

import TrackModuleDetail from '../pages/TrackModuleDetail';

function open(id = 'sec-two') {
  return render(
    <MemoryRouter initialEntries={[`/tracks/security/${id}`]}>
      <Routes><Route path="/tracks/:lang/:id" element={<TrackModuleDetail />} /></Routes>
    </MemoryRouter>,
  );
}
const stepTitles = () => screen.getAllByRole('heading', { level: 2 }).map(h => h.textContent);
const rail = () => screen.getByRole('navigation', { name: 'Steps in this module' });

beforeEach(() => {
  localStorage.clear();
  mocks.gatesActive = false;
  window.scrollTo = vi.fn();
});

describe('guided module page', () => {
  it('lays the room out as numbered steps with its place in the path', () => {
    open();
    expect(screen.getByRole('heading', { level: 1, name: 'Room Two' })).toBeInTheDocument();
    expect(screen.getByText('Room 2 of 3')).toBeInTheDocument();
    expect(stepTitles()).toEqual([
      'What you are here to do', 'Room Two: first idea', 'Room Two: second idea',
      'Read the worked example', 'Check yourself', 'Find the flag', 'Build a thing', 'Wrap up',
    ]);
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getAllByText('About 2 hours').length).toBeGreaterThan(0);
    expect(screen.getByText(/follows “Room One”/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next: Room Three/ })).toHaveAttribute('href', '/tracks/security/sec-three');
  });

  it('step by step shows explanations; some guidance folds them until asked', () => {
    open();
    expect(screen.getByText('First idea body.')).toBeInTheDocument();
    expect(screen.getByText('First hint')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('radio', { name: /Some guidance/ }));
    expect(screen.queryByText('First idea body.')).not.toBeInTheDocument();
    expect(screen.queryByText('First hint')).not.toBeInTheDocument();
    expect(stepTitles()).toHaveLength(8);

    fireEvent.click(screen.getAllByRole('button', { name: 'Show the explanation' })[0]);
    expect(screen.getByText('First idea body.')).toBeInTheDocument();
    expect(screen.queryByText('Second idea body.')).not.toBeInTheDocument();
  });

  it('on my own keeps only the brief and the tasks, and remembers the choice', () => {
    const first = open();
    fireEvent.click(screen.getByRole('radio', { name: /On my own/ }));
    expect(stepTitles()).toEqual(['What you are here to do', 'Check yourself', 'Find the flag', 'Build a thing', 'Wrap up']);
    expect(screen.queryByText('First hint')).not.toBeInTheDocument();
    first.unmount();

    open('sec-one');
    expect(screen.getByRole('radio', { name: /On my own/ })).toBeChecked();
  });

  it('counts ticked steps and keeps them per room', () => {
    const first = open();
    expect(within(rail()).getByText('0 of 6')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark done' })[0]);
    expect(within(rail()).getByText('1 of 6')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toHaveAttribute('aria-pressed', 'true');
    first.unmount();

    const other = open('sec-one');
    expect(within(rail()).getByText('0 of 6')).toBeInTheDocument();
    other.unmount();

    open();
    expect(within(rail()).getByText('1 of 6')).toBeInTheDocument();
  });

  it('finishing the quiz ticks its step; capturing the flag completes the room', () => {
    open();
    fireEvent.click(screen.getByRole('button', { name: 'Finish quiz' }));
    expect(within(rail()).getByText('1 of 6')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mark as complete' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Submit flag' }));
    expect(within(rail()).getByText('2 of 6')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
  });

  it('keeps a note on this device and puts it in the downloaded write-up', async () => {
    const blobs = [];
    URL.createObjectURL = vi.fn(blob => { blobs.push(blob); return 'blob:write-up'; });
    URL.revokeObjectURL = vi.fn();
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    const first = open();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add a note for your write-up' })[1]);
    fireEvent.change(screen.getByLabelText('What did this teach you?'), { target: { value: 'Encoding hides nothing.' } });
    first.unmount();

    open();
    expect(screen.getByLabelText('What did this teach you?')).toHaveValue('Encoding hides nothing.');
    fireEvent.click(screen.getByRole('button', { name: /Download my write-up/ }));
    expect(click).toHaveBeenCalledTimes(1);
    const text = await blobs[0].text();
    expect(text).toContain('# Room Two');
    expect(text).toContain('> Encoding hides nothing.');
    click.mockRestore();
  });

  it('locks only the flag step of a later room on the free tier', () => {
    mocks.gatesActive = true;
    const locked = open('sec-three');
    expect(screen.getByText("Room 3's challenge is part of Premium")).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Submit flag' })).not.toBeInTheDocument();
    expect(screen.getByText('Free · flag needs Premium')).toBeInTheDocument();
    // Theory and practice stay free.
    expect(screen.getByText('First idea body.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Finish quiz' })).toBeInTheDocument();
    locked.unmount();

    open('sec-two');
    expect(screen.getByRole('button', { name: 'Submit flag' })).toBeInTheDocument();
  });
});
