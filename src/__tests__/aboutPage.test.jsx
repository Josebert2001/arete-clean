import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import AboutPreview from '../components/AboutPreview';

// /about is the page the author entity in index.html's structured data points
// at, and the only page on the site whose whole job is to be checkable. Two
// things have to hold: it renders without a Router or a browser (the
// prerenderer has neither), and it actually carries the claims the schema and
// the site FAQ promise are on it.

describe('the about page', () => {
  it('renders through renderToStaticMarkup, as the prerenderer calls it', () => {
    // The constraint every *Preview component is under: no hooks, no context,
    // no react-router. A useNavigate or a useAuth in here fails the build, and
    // it fails it in scripts/prerender.mjs, a long way from this file.
    const html = renderToStaticMarkup(<AboutPreview />);
    expect(html).toContain('About Areté');
    expect(html).not.toContain('undefined');
  });

  it('disclaims official status in words, not only in the FAQ on "/"', () => {
    render(<AboutPreview />);
    const disclaimer = screen.getByText(/not affiliated with, endorsed by/i);
    expect(disclaimer).toBeInTheDocument();
    // The page writes a typographic apostrophe; match either form.
    expect(disclaimer.textContent).toMatch(/not the university['’]s official learning platform/i);
  });

  it('says where the material comes from, which is the point of the page', () => {
    render(<AboutPreview />);
    expect(screen.getByText(/Lecture notes/)).toBeInTheDocument();
    expect(screen.getByText(/transcribed from lecturers' workbooks/i)).toBeInTheDocument();
    // The negative half matters as much: what Areté does NOT publish.
    expect(screen.getByText(/Past question papers are not republished/i)).toBeInTheDocument();
  });

  it('names the people already credited in the footer, and invents no others', () => {
    render(<AboutPreview />);
    expect(screen.getByText('Josebert')).toBeInTheDocument();
    expect(screen.getByText('Barry')).toBeInTheDocument();
    const html = renderToStaticMarkup(<AboutPreview />);
    // No founding date, no headcount, no qualification — nothing a reader
    // could check and find made up.
    expect(html).not.toMatch(/founded in \d{4}|since \d{4}|\d+ students use/i);
  });

  it('links onward to the pages a reader lands here from', () => {
    render(<AboutPreview />);
    expect(screen.getByRole('link', { name: /browse all course outlines/i })).toHaveAttribute(
      'href',
      '/courses'
    );
  });
});
