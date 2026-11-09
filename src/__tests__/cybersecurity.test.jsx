import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import Cybersecurity from '../pages/Cybersecurity';
import CybersecurityLanding from '../components/CybersecurityLanding';
import { rememberSecurityEntry, hasSecurityEntry, clearSecurityEntry } from '../utils/learningEntry';

beforeEach(() => sessionStorage.clear());

describe('public cybersecurity entry', () => {
  it('lets a signed-out visitor try the exercise and receive feedback without an account', () => {
    render(<Cybersecurity />);
    const check = screen.getByRole('button', { name: 'Check my reasoning' });
    expect(check).toBeDisabled();
    fireEvent.click(screen.getByRole('radio', { name: /Reply with the sign-in link/ }));
    fireEvent.click(check);
    expect(screen.getByRole('status')).toHaveTextContent('Take another look');
    fireEvent.click(screen.getByRole('radio', { name: /Open the service through a saved address/ }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    fireEvent.click(check);
    expect(screen.getByRole('status')).toHaveTextContent('Good call');
    expect(screen.getByRole('link', { name: /Start learning/ })).toHaveAttribute('href', '/signin?learn=cybersecurity');
    expect(screen.getByRole('link', { name: /Discuss a team pilot/ })).toHaveAttribute('href', expect.stringContaining('mailto:'));
  });

  it('renders a readable sample, honest team availability, and working destinations without browser state', () => {
    const html = renderToStaticMarkup(<CybersecurityLanding />);
    expect(html).toContain('Reveal the reasoning');
    expect(html).toContain('not included in the current learner plan');
    expect(html).toContain('href="/signin?learn=cybersecurity"');
    expect(html).toContain('href="/courses"');
    // The prerendered page is what address harvesters read.
    expect(html).not.toContain('mailto:');
    expect(html).not.toMatch(/@gmail\.com/);
  });

  it('preserves only the fixed security entry, without accepting arbitrary redirect targets', () => {
    rememberSecurityEntry('?learn=https://untrusted.example');
    expect(hasSecurityEntry()).toBe(false);
    rememberSecurityEntry('?learn=cybersecurity');
    expect(hasSecurityEntry()).toBe(true);
    clearSecurityEntry();
    expect(hasSecurityEntry()).toBe(false);
  });
});
