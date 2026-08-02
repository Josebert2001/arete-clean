import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Courses from '../pages/Courses';
import { LEVEL_STORAGE_KEY } from '../components/useLevelGate';

// Mirrors AuthContext's own default context value, so the original
// (unmocked) describe block below keeps behaving exactly like a signed-out
// visitor once this mock is in place — only the new describe block at the
// bottom overrides it, to exercise profile-driven level seeding.
const DEFAULT_AUTH = {
  user: null,
  profile: null,
  authLoading: false,
  profileLoading: false,
  profileComplete: false,
  authEnabled: false,
  signInWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
};

const { mockAuth } = vi.hoisted(() => ({ mockAuth: { current: null } }));
mockAuth.current = DEFAULT_AUTH;

vi.mock('../context/AuthContext', () => ({
  useAuth: () => mockAuth.current,
}));

// The Course Hub resolves its catalogue asynchronously (useCatalogue →
// departments.js → dynamic import). The FIRST render therefore always has
// catalogue === null, so every level/levelMeta read on that pass must tolerate
// it — otherwise the page throws before the chunk ever resolves. These render
// the real component (no AuthProvider needed: useAuth falls back to its
// default context value, i.e. a signed-out visitor).

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Courses />
    </MemoryRouter>
  );

describe('Courses page — first render while the catalogue is still loading', () => {
  beforeEach(() => {
    localStorage.clear();
    // Courses.jsx resets scroll on each picker step; jsdom has no real
    // implementation and logs a noisy "Not implemented" for every call.
    window.scrollTo = () => {};
  });
  afterEach(() => localStorage.clear());

  it('renders the level-picker path without throwing', () => {
    expect(() => renderAt('/courses')).not.toThrow();
  });

  it('renders the level-tabs path (?level=100) without throwing', () => {
    expect(() => renderAt('/courses?level=100')).not.toThrow();
  });

  it('renders the all-years path (?level=all) without throwing', () => {
    expect(() => renderAt('/courses?level=all')).not.toThrow();
  });

  it('renders the semester path (?level=100&semester=1) without throwing', () => {
    expect(() => renderAt('/courses?level=100&semester=1')).not.toThrow();
  });

  it('shows real catalogue content once the chunk resolves', async () => {
    renderAt('/courses?level=100&semester=1');
    // A 100L first-semester course from the resolved catalogue. Generous
    // timeout: this waits on a real dynamic import of the ~800 kB catalogue,
    // which routinely exceeds waitFor's 1s default.
    await waitFor(() => expect(screen.getByText(/GST 111/)).toBeInTheDocument(), { timeout: 15000 });
  });
});

describe('Courses page — level resolution precedence', () => {
  const authFor = (profile) => ({
    ...DEFAULT_AUTH,
    user: { id: 'u1', email: 'student@example.com' },
    profile,
    profileComplete: true,
    authEnabled: true,
  });

  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = () => {};
  });
  afterEach(() => {
    localStorage.clear();
    mockAuth.current = DEFAULT_AUTH;
  });

  it("seeds the level from the signed-in student's profile when nothing else says otherwise", async () => {
    mockAuth.current = authFor({ level: '200L' });
    renderAt('/courses');
    await waitFor(
      () => expect(screen.getByText(/Which semester are you in\?/)).toBeInTheDocument(),
      { timeout: 15000 }
    );
    expect(screen.getByText(/200L · Pick a semester/)).toBeInTheDocument();
  });

  it('lets a previously stored level win over the profile level', async () => {
    localStorage.setItem(LEVEL_STORAGE_KEY, '300');
    mockAuth.current = authFor({ level: '100L' });
    renderAt('/courses');
    await waitFor(
      () => expect(screen.getByText(/300L · Pick a semester/)).toBeInTheDocument(),
      { timeout: 15000 }
    );
  });

  it('lets an explicit URL param win over both stored and profile levels', async () => {
    localStorage.setItem(LEVEL_STORAGE_KEY, '300');
    mockAuth.current = authFor({ level: '100L' });
    renderAt('/courses?level=200&semester=1');
    await waitFor(
      () => expect(screen.getByText(/200L · (First|Second) Semester/)).toBeInTheDocument(),
      { timeout: 15000 }
    );
  });

  it('falls back to the level picker for a level the catalogue does not have', async () => {
    mockAuth.current = authFor({ level: '500L' });
    renderAt('/courses');
    await waitFor(
      () => expect(screen.getByText('Pick your level')).toBeInTheDocument(),
      { timeout: 15000 }
    );
  });

  it('leaves a signed-out visitor on the level picker (no profile to seed from)', async () => {
    mockAuth.current = DEFAULT_AUTH;
    renderAt('/courses');
    await waitFor(
      () => expect(screen.getByText('Pick your level')).toBeInTheDocument(),
      { timeout: 15000 }
    );
  });
});

// Regression: the SIWES section used to be gated on `level === 300`, which is
// only true of the Cybersecurity catalogue. A foundation-mode student, whose
// shared 300L second semester is empty, got a "Second Semester — SIWES ·
// 0 components · 0 units" heading plus a paragraph about placements "in
// cybersecurity, IT, or technology roles" — for a programme Areté doesn't
// even carry. It is now derived from the courses actually present.
describe('Courses page — SIWES section is data-driven, not level-driven', () => {
  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = () => {};
    mockAuth.current = {
      ...DEFAULT_AUTH,
      user: { id: 'u1' },
      profile: { id: 'p1', department: 'general', level: '300L' },
      profileComplete: true,
    };
  });
  afterEach(() => {
    localStorage.clear();
    mockAuth.current = DEFAULT_AUTH;
  });

  it('shows no SIWES section for a foundation student browsing all years', async () => {
    renderAt('/courses?level=all');
    // Wait for the foundation catalogue to resolve — GST 111 is shared. It
    // appears both as a course card and in the CoursePicker, hence getAllBy.
    await waitFor(() => expect(screen.getAllByText(/GST 111/).length).toBeGreaterThan(0), { timeout: 15000 });
    expect(screen.queryByText(/SIWES/)).not.toBeInTheDocument();
    expect(screen.queryByText(/0 courses/)).not.toBeInTheDocument();
  });

  it('still shows it for a Cybersecurity student, whose 300L second semester is SIWES', async () => {
    mockAuth.current = {
      ...DEFAULT_AUTH,
      user: { id: 'u1' },
      profile: { id: 'p1', department: 'cybersecurity', level: '300L' },
      profileComplete: true,
    };
    renderAt('/courses?level=all');
    await waitFor(() => expect(screen.getAllByText(/SIWES/).length).toBeGreaterThan(0), { timeout: 15000 });
  });
});
