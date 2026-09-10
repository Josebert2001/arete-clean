import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Install from '../pages/Install';
import InstallPreview from '../components/InstallPreview';
import { tracks } from '../data/installGuides';

// The install guide is the site's only procedural content and the one page a
// student is sent to before they own an account. Its steps moved out of the
// page into src/data/installGuides.js so the prerenderer can read them too;
// these assert the two renders stay in agreement about what the guide says.

describe('Install page', () => {
  it('opens on the Java track and switches tracks on click', () => {
    render(<Install />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Install Java');

    fireEvent.click(screen.getByRole('button', { name: 'Python' }));
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Install Python + JupyterLab'
    );

    fireEvent.click(screen.getByRole('button', { name: 'C' }));
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Install C (GCC + NetBeans)');
  });

  it('still ticks a checklist item', () => {
    render(<Install />);
    const item = screen.getByRole('checkbox', { name: 'Download JDK 17 (LTS — stable, widely used)' });
    expect(item).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(item);
    expect(item).toHaveAttribute('aria-checked', 'true');
  });
});

describe('InstallPreview (what a crawler gets)', () => {
  it('renders all three guides at once, not one behind a tab', () => {
    // The whole point of the static version: no JavaScript means no tab
    // picker, so an engine asked about GCC must find the C steps in the same
    // bytes as the Java ones.
    const { container } = render(<InstallPreview />);
    for (const track of tracks) {
      expect(container.querySelector(`#${track.key}`), track.key).toBeTruthy();
      expect(screen.getByRole('heading', { level: 2, name: track.title })).toBeInTheDocument();
    }
  });

  it('gives every step the id its HowTo block points at', () => {
    const { container } = render(<InstallPreview />);
    for (const track of tracks) {
      track.steps.forEach((_, i) => {
        expect(
          container.querySelector(`#${track.key}-step-${i + 1}`),
          `${track.key}-step-${i + 1}`
        ).toBeTruthy();
      });
    }
  });

  it('prints every checklist line, since there is nothing to click', () => {
    render(<InstallPreview />);
    for (const track of tracks) {
      for (const step of track.steps) {
        for (const line of step.checklist) {
          expect(screen.getAllByText(line).length, line).toBeGreaterThan(0);
        }
      }
    }
  });
});
