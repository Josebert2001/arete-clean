import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from '../App';

vi.mock('@sentry/react', async importOriginal => ({
  ...await importOriginal(),
  captureException: vi.fn(),
}));

const crashRender = vi.fn();
function Crash() {
  crashRender();
  throw new Error('route crashed');
}

function CourseRoute() {
  const { search } = useLocation();
  return search === '?level=broken' ? <Crash /> : <p>Working page content</p>;
}

function BoundaryRoutes() {
  const { key, pathname } = useLocation();
  return (
    <>
      <Link to="/courses?level=broken">Go to broken page</Link>
      <Link to="/broken">Go to broken route</Link>
      <Link to="/courses?level=300">Change level</Link>
      <ErrorBoundary locationKey={key} pathname={pathname}>
        <Routes>
          <Route path="/courses" element={<CourseRoute />} />
          <Route path="/broken" element={<Crash />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

describe('ErrorBoundary', () => {
  it('reports a throwing destination once and clears the fallback on query navigation', () => {
    const errorOutput = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      render(<MemoryRouter initialEntries={['/courses?level=200']}><BoundaryRoutes /></MemoryRouter>);
      expect(screen.getByText('Working page content')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('link', { name: 'Go to broken page' }));
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
      // React's development renderer retries the thrown render internally.
      expect(crashRender).toHaveBeenCalledTimes(5);
      expect(Sentry.captureException).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByRole('link', { name: 'Change level' }));
      expect(screen.getByText('Working page content')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
    } finally {
      errorOutput.mockRestore();
      crashRender.mockClear();
      vi.mocked(Sentry.captureException).mockClear();
    }
  });

  it('does not render a throwing destination again after the boundary catches it', () => {
    const errorOutput = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      render(<MemoryRouter initialEntries={['/courses']}><BoundaryRoutes /></MemoryRouter>);
      fireEvent.click(screen.getByRole('link', { name: 'Go to broken route' }));
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
      expect(crashRender).toHaveBeenCalledTimes(4);
      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    } finally {
      errorOutput.mockRestore();
      crashRender.mockClear();
      vi.mocked(Sentry.captureException).mockClear();
    }
  });
});
