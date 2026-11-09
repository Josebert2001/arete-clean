import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import CareerExplorer from '../components/CareerExplorer';
import Careers from '../pages/Careers';
import CareerQuiz from '../pages/CareerQuiz';
import CareerDashboard from '../pages/CareerDashboard';
import CareerPractice from '../pages/CareerPractice';
import { scorePlacement } from '../../api/_lib/careerPlacement.js';
import { placementQuestions, PLACEMENT_VERSION } from '../data/careers';
import { useCareer } from '../components/useCareer';

const mocks = vi.hoisted(() => ({ user: { id: 'learner-a' }, request: vi.fn() }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: mocks.user }) }));
vi.mock('../utils/careerApi', () => ({ careerRequest: mocks.request }));

function renderAt(path, element) {
  return render(<MemoryRouter initialEntries={[path]}><Routes>
    <Route path="/careers" element={<Careers />} /><Route path="/career-quiz" element={element || <CareerQuiz />} />
    <Route path="/career" element={element || <CareerDashboard />} /><Route path="/career/practice/:path" element={<CareerPractice />} />
  </Routes></MemoryRouter>);
}
beforeEach(() => { mocks.user = { id: 'learner-a' }; mocks.request.mockReset().mockResolvedValue({ profile: null, notes: [] }); });

describe('career discovery experience', () => {
  it('renders public career descriptions and truthful availability without router or account context', () => {
    const html = renderToStaticMarkup(<CareerExplorer />);
    expect(html).toContain('Blue team');
    expect(html).toContain('Starter practice available');
    expect(html).toContain('Planned specialization');
    expect(html).toContain('href="/signin?learn=career"');
    expect(html).not.toContain('referral guaranteed');
  });
  it('offers public directions and distinguishes starter work from planned full pathways', () => {
    mocks.user = null;
    renderAt('/careers');
    expect(screen.getByRole('link', { name: /Find my direction/ })).toHaveAttribute('href', '/signin?learn=career');
    expect(screen.getByRole('heading', { name: 'Blue team', exact: true })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Red team', exact: true })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Purple team', exact: true })).toBeInTheDocument();
    expect(screen.getByText(/Full assessed pathways, practitioner reviews/)).toBeInTheDocument();
  });
  it.each(['__proto__', 'constructor', 'purple'])('does not open an unavailable or inherited starter: %s', path => {
    renderAt(`/career/practice/${path}`);
    expect(screen.getByRole('heading', { name: 'This starter is not available' })).toBeInTheDocument();
    expect(mocks.request).not.toHaveBeenCalled();
  });
  it('requires answers, preserves them on back navigation, and submits all 30 for server scoring', async () => {
    renderAt('/career-quiz');
    expect(await screen.findByRole('button', { name: 'Continue' })).toBeDisabled();
    for (let page = 0; page < 6; page++) {
      for (const fieldset of screen.getAllByRole('group')) fireEvent.click(within(fieldset).getAllByRole('radio')[0]);
      if (page === 0) {
        fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
        fireEvent.click(screen.getByRole('button', { name: 'Back' }));
        expect(screen.getAllByRole('radio').filter(r => r.checked)).toHaveLength(5);
      }
      fireEvent.click(screen.getByRole('button', { name: page === 5 ? 'Find my direction' : 'Continue' }));
    }
    await screen.findByRole('heading', { name: 'Your career roadmap' });
    const submission = mocks.request.mock.calls.find(([action]) => action === 'submit')[1];
    expect(Object.keys(submission.answers)).toHaveLength(30);
    expect(submission.version).toBe(PLACEMENT_VERSION);
    expect(submission.attemptId).toMatch(/^[a-f0-9-]{36}$/);
  });
  it('shows a saved recommendation, preparation needs, and a working next task', async () => {
    const answers = Object.fromEntries(placementQuestions.map(q => [q.id, q.kind === 'interest' ? (q.path === 'red' ? 4 : 0) : 3]));
    mocks.request.mockResolvedValue({ profile: { attempt_id: 'attempt-1', chosen_path: 'red', result: scorePlacement(PLACEMENT_VERSION, answers) }, notes: [] });
    renderAt('/career');
    expect(await screen.findByRole('heading', { name: 'Red team', exact: true, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Start with the short foundations bridge/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start: Review a scoped test finding/ })).toHaveAttribute('href', '/career/practice/red');
  });
  it('does not offer an automatic career for an uncertain result', async () => {
    const answers = Object.fromEntries(placementQuestions.map(q => [q.id, q.kind === 'interest' ? 2 : 3]));
    mocks.request.mockResolvedValue({ profile: { attempt_id: 'attempt-1', chosen_path: null, result: scorePlacement(PLACEMENT_VERSION, answers) }, notes: [] });
    renderAt('/career');
    expect(await screen.findByRole('heading', { name: /More than one direction/ })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Choose this direction' })).toHaveLength(4);
  });
  it('saves a cited reflection without presenting self-review as an assessed pass', async () => {
    renderAt('/career/practice/blue');
    const input = await screen.findByLabelText('Your evidence-backed reflection');
    fireEvent.change(input, { target: { value: 'AUTH-02 and MAIL-01 warrant investigation. Data loss remains unproven.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Compare with feedback' }));
    expect(screen.getByText(/No human review or pass has been recorded/)).toBeInTheDocument();
    mocks.request.mockResolvedValue({ saved: true });
    fireEvent.click(screen.getByRole('button', { name: 'Save reflection' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Reflection saved to your account');
    expect(mocks.request).toHaveBeenCalledWith('practice', expect.objectContaining({ path: 'blue', reflected: true }), 'learner-a');
  });
  it('keeps private work out of shared browser storage', async () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');
    renderAt('/career/practice/grc');
    fireEvent.change(await screen.findByLabelText('Your evidence-backed reflection'), { target: { value: 'POL-01 needs supporting evidence.' } });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
  it('checks availability before asking a learner to fill in the quiz', async () => {
    mocks.request.mockRejectedValue(new Error('Career saving is unavailable.'));
    renderAt('/career-quiz');
    expect(await screen.findByRole('alert')).toHaveTextContent('unavailable');
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /starter tasks/ })).toHaveAttribute('href', '/careers');
  });
  it('drops previous-account state immediately and ignores a delayed response', async () => {
    let resolveOld;
    mocks.request.mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; }))
      .mockResolvedValue({ profile: { chosen_path: 'red' }, notes: [] });
    function Probe() { const state = useCareer(); return <p>{state.profile?.chosen_path || state.status}</p>; }
    const view = render(<Probe />);
    mocks.user = { id: 'learner-b' }; view.rerender(<Probe />);
    expect(screen.getByText('loading')).toBeInTheDocument();
    await screen.findByText('red');
    await act(async () => { resolveOld({ profile: { chosen_path: 'blue' }, notes: [] }); });
    await waitFor(() => expect(screen.queryByText('blue')).not.toBeInTheDocument());
  });
});
