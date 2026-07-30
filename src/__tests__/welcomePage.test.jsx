import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Welcome is the first screen a new student ever sees, and it is auth-gated,
// so it cannot be reached in a signed-out browser. Mock the auth context so
// the real render path (rather than the loading skeleton) is exercised.
// useCatalogue reads the same module, so the mocked profile also drives which
// department catalogue resolves.
const { mockAuth } = vi.hoisted(() => ({ mockAuth: { current: null } }));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => mockAuth.current,
}));

const Welcome = (await import('../pages/Welcome')).default;

const authFor = (profile) => ({
  user: { id: 'u1', email: 'student@example.com' },
  profile,
  authLoading: false,
  profileLoading: false,
  profileComplete: true,
  authEnabled: true,
});

const CYB_PROFILE = {
  id: 'u1',
  full_name: 'Ada Obi',
  reg_number: 'CYB/22/1234',
  level: '100L',
  department: 'cybersecurity',
  department_other: null,
};

const FOUNDATION_PROFILE = {
  ...CYB_PROFILE,
  reg_number: 'MEC/22/1234',
  department: 'general',
  department_other: 'Mechanical Engineering',
};

const renderWelcome = () =>
  render(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>
  );

describe('Welcome — "This year" is derived, never hardcoded', () => {
  beforeEach(() => { mockAuth.current = authFor(CYB_PROFILE); });

  it('names real courses from the catalogue for the student\'s level', async () => {
    renderWelcome();
    await waitFor(() => expect(screen.getByText(/GST 111/)).toBeInTheDocument());
    // 16 courses / 33 units is the real 100L total in courses.js.
    expect(screen.getByText(/16 courses · 33 units/)).toBeInTheDocument();
  });

  it('never shows the fabricated course codes the hardcoded table used to', async () => {
    const { container } = renderWelcome();
    await waitFor(() => expect(screen.getByText(/GST 111/)).toBeInTheDocument());
    // These named courses that do not exist anywhere in courses.js.
    for (const fake of ['CSC 101', 'MTH 101', 'CYB 201', 'CSC 201', 'MTH 202', 'CYB 301', 'CSC 301', 'CYB 401']) {
      expect(container.textContent).not.toContain(fake);
    }
  });
});

describe('Welcome — foundation mode', () => {
  beforeEach(() => { mockAuth.current = authFor(FOUNDATION_PROFILE); });

  it('scopes the year list to the shared catalogue, not the full one', async () => {
    renderWelcome();
    // 13 shared 100L courses vs the Cybersecurity catalogue's 16.
    await waitFor(() => expect(screen.getByText(/13 courses · 27 units/)).toBeInTheDocument());
  });

  it('does not promise a "full curriculum" it cannot deliver', async () => {
    const { container } = renderWelcome();
    await waitFor(() => expect(screen.getByText(/Foundation mode/)).toBeInTheDocument());
    // The old copy contradicted the foundation note sitting right above it.
    expect(container.textContent).not.toContain('Your full curriculum');
    expect(container.textContent).toContain('Mechanical Engineering');
  });

  it('still offers the course picker', async () => {
    renderWelcome();
    await waitFor(() =>
      expect(screen.getByText(/Pick the courses that match your programme/)).toBeInTheDocument()
    );
  });
});

describe('Welcome — quick links', () => {
  beforeEach(() => { mockAuth.current = authFor(CYB_PROFILE); });

  it('surfaces the security rooms and the study planner', async () => {
    const { container } = renderWelcome();
    await waitFor(() => expect(screen.getByText(/Build a Study Plan/)).toBeInTheDocument());
    // Code Lab used to advertise only "Java, Python, C" and omit the 12 CTF rooms.
    expect(container.textContent).toContain('capture-the-flag');
  });
});
