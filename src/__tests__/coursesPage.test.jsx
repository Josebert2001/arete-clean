import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Courses from '../pages/Courses';

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
