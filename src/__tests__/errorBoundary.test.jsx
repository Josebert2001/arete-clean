import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '../App';

function Crash() {
  throw new Error('route crashed');
}

function BoundaryRoutes() {
  const { pathname } = useLocation();
  return (
    <>
      <Link to="/working">Go to working page</Link>
      <ErrorBoundary pathname={pathname}>
        <Routes>
          <Route path="/broken" element={<Crash />} />
          <Route path="/working" element={<p>Working page content</p>} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

describe('ErrorBoundary', () => {
  it('shows the fallback after a crash and clears it on pathname change', () => {
    const errorOutput = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      render(<MemoryRouter initialEntries={['/broken']}><BoundaryRoutes /></MemoryRouter>);
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('link', { name: 'Go to working page' }));
      expect(screen.getByText('Working page content')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
    } finally {
      errorOutput.mockRestore();
    }
  });
});
