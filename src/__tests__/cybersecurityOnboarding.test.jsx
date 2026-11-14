import { beforeEach, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SetupProfile from '../pages/SetupProfile';

const mocks = vi.hoisted(() => ({ upsert: vi.fn(), refreshProfile: vi.fn(), profileComplete: false }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => ({
  user: { id: 'new-learner' }, profileComplete: mocks.profileComplete, profileLoading: false,
  authLoading: false, authEnabled: true, refreshProfile: mocks.refreshProfile,
}) }));
vi.mock('../lib/supabase', () => ({ supabase: { from: () => ({ upsert: mocks.upsert }) } }));

beforeEach(() => {
  sessionStorage.clear();
  mocks.profileComplete = false;
  mocks.upsert.mockReset().mockResolvedValue({ error: null });
  mocks.refreshProfile.mockReset().mockResolvedValue(undefined);
});

it('takes an existing account straight to security without leaving a stale entry preference', async () => {
  mocks.profileComplete = true;
  sessionStorage.setItem('arete-learning-entry', 'cybersecurity');
  render(<MemoryRouter initialEntries={['/signin?learn=cybersecurity']}><Routes>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/tracks/security" element={<p>Security rooms</p>} />
  </Routes></MemoryRouter>);
  expect(await screen.findByText('Security rooms')).toBeInTheDocument();
  expect(sessionStorage.getItem('arete-learning-entry')).toBeNull();
  expect(mocks.upsert).not.toHaveBeenCalled();
});

it('takes an existing career learner to their roadmap without changing their academic profile', async () => {
  mocks.profileComplete = true;
  render(<MemoryRouter initialEntries={['/signin?learn=career']}><Routes>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/career" element={<p>Career roadmap reached</p>} />
  </Routes></MemoryRouter>);
  expect(await screen.findByText('Career roadmap reached')).toBeInTheDocument();
  expect(mocks.upsert).not.toHaveBeenCalled();
  expect(sessionStorage.getItem('arete-learning-entry')).toBeNull();
});

it('honors an explicit security entry over an abandoned career sign-in', async () => {
  mocks.profileComplete = true;
  sessionStorage.setItem('arete-learning-entry', 'career');
  render(<MemoryRouter initialEntries={['/signin?learn=cybersecurity']}><Routes>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/tracks/security" element={<p>Explicit security destination</p>} />
    <Route path="/career" element={<p>Wrong career destination</p>} />
  </Routes></MemoryRouter>);
  expect(await screen.findByText('Explicit security destination')).toBeInTheDocument();
  expect(screen.queryByText('Wrong career destination')).not.toBeInTheDocument();
});

it('carries career discovery through independent profile setup to the roadmap', async () => {
  render(<MemoryRouter initialEntries={['/signin?learn=career']}><Routes>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/setup-profile" element={<SetupProfile />} />
    <Route path="/career" element={<p>Career roadmap reached</p>} />
  </Routes></MemoryRouter>);
  expect(await screen.findByRole('radio', { name: /Learn cybersecurity and coding/ })).toBeChecked();
  fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: 'Ada' } });
  fireEvent.click(screen.getByRole('button', { name: 'Set up my profile' }));
  expect(await screen.findByText('Career roadmap reached')).toBeInTheDocument();
  expect(mocks.upsert).toHaveBeenCalledWith(expect.objectContaining({ learning_mode: 'independent', department: 'general', level: null }));
  expect(sessionStorage.getItem('arete-learning-entry')).toBeNull();
});

it('carries the security entry through sign-in to independent setup and saves a real nonacademic profile', async () => {
  render(<MemoryRouter initialEntries={['/signin?learn=cybersecurity']}><Routes>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/setup-profile" element={<SetupProfile />} />
    <Route path="/welcome" element={<p>Welcome route reached</p>} />
  </Routes></MemoryRouter>);
  expect(await screen.findByRole('radio', { name: /Learn cybersecurity and coding/ })).toBeChecked();
  expect(screen.queryByLabelText(/Reg number/)).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: 'Ada' } });
  fireEvent.click(screen.getByRole('button', { name: 'Set up my profile' }));
  await waitFor(() => expect(mocks.upsert).toHaveBeenCalledWith(expect.objectContaining({
    id: 'new-learner', learning_mode: 'independent', full_name: 'Ada',
    department: 'general', department_other: null, reg_number: null, level: null,
  })));
  expect(await screen.findByText('Welcome route reached')).toBeInTheDocument();
  expect(mocks.refreshProfile).toHaveBeenCalled();
  expect(sessionStorage.getItem('arete-learning-entry')).toBeNull();
});
