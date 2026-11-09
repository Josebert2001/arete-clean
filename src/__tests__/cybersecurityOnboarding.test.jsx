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
