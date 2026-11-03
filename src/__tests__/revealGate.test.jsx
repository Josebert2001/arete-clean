import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import RevealGate from '../components/RevealGate';
import { cos211LectureNotes } from '../data/lectureNotes/cos211';

describe('RevealGate', () => {
  it('renders children unchanged when there is no reveal', () => {
    const { getByText, queryByRole } = render(<RevealGate><p>answer</p></RevealGate>);
    expect(getByText('answer')).toBeInTheDocument();
    expect(queryByRole('button')).toBeNull();
  });

  it('hides the answer until the toggle is pressed, and hides it again', () => {
    const { getByRole, queryByText } = render(
      <RevealGate reveal={{ label: 'Show the corrected code' }}><p>answer</p></RevealGate>
    );
    const button = getByRole('button', { name: 'Show the corrected code' });
    expect(queryByText('answer')).toBeNull();
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(queryByText('answer')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(getByRole('button', { name: 'Hide' }));
    expect(queryByText('answer')).toBeNull();
  });
});

describe('COS 211 debugging exercises', () => {
  // The three "deliberate errors" exercises in lab Module 2 keep their
  // corrected code behind a reveal, explanation included, so a student
  // attempts the fix before seeing it.
  it('gates every corrected listing, with its explanation inside the gate', () => {
    const sections = cos211LectureNotes.flatMap((t) => t.sections);
    const gated = sections.filter((s) => s.reveal);
    expect(gated).toHaveLength(3);
    for (const s of gated) {
      expect(s.type).toBe('code');
      expect(s.reveal.label).toBeTruthy();
      expect(s.reveal.note).toBeTruthy();
    }
    expect(sections.filter((s) => /Corrected Reference Code/.test(s.heading ?? '') && !s.reveal)).toEqual([]);
  });
});
