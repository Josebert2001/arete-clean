import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile } from 'node:fs/promises';
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

describe('Welcome — no invented course codes', () => {
  beforeEach(() => { mockAuth.current = authFor(CYB_PROFILE); });

  it('renders without naming any course', async () => {
    const { container } = renderWelcome();
    await waitFor(() => expect(screen.getByText(/Ada Obi/)).toBeInTheDocument());
    // The page used to carry a hardcoded per-level "This year" list whose
    // codes had drifted from courses.js — 8 of its 12 named courses that do
    // not exist. Rather than derive the list here (which would drag the
    // ~800 kB catalogue onto a one-time screen), Welcome names no course at
    // all and routes to /courses for the real thing.
    for (const fake of ['CSC 101', 'MTH 101', 'CYB 201', 'CSC 201', 'MTH 202', 'CYB 301', 'CSC 301', 'CYB 401']) {
      expect(container.textContent).not.toContain(fake);
    }
    expect(container.textContent).not.toContain('This year');
  });

  it('stays lightweight — must not pull the course catalogue', async () => {
    // Guards the deliberate choice above: Welcome reads the small
    // departments.js registry, never useCatalogue/courses.js. If someone
    // wires the catalogue in here, every new student pays ~800 kB for a
    // screen they see once.
    // Vitest runs from the project root, so a repo-relative path resolves.
    // Matches real imports/calls only — the file explains this choice in a
    // comment, so a bare mention of the name must not trip the check.
    const source = await readFile('src/pages/Welcome.jsx', 'utf8');
    expect(source).not.toMatch(/from\s+['"][^'"]*\/(useCatalogue|courses)['"]/);
    expect(source).not.toMatch(/useCatalogue\s*\(/);
  });
});

describe('Welcome — foundation mode', () => {
  beforeEach(() => { mockAuth.current = authFor(FOUNDATION_PROFILE); });

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
