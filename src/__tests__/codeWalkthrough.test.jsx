// The Code Walkthrough tab is the night-before view: every practical, in order,
// with the listing already explained. Two things decide whether it is worth
// having, and both are guarded here:
//
//   1. The explanation must be on the page, not behind a click. That only works
//      because it is pre-generated — so the inline path must actually be taken
//      when a bundle exists, and must fall back to the live button when it does
//      not, rather than showing an empty card.
//   2. Which topics count as practicals. Theory topics have no listings and must
//      not appear; a run transcript (`language: 'output'`) is not a listing.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CodeWalkthrough from '../components/CodeWalkthrough';
import { topicsWithCode } from '../utils/explainCode';

const LISTING = `import socket

def start_server(host="127.0.0.1", port=65432):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((host, port))
        s.listen()`;

const practical = {
  number: '14',
  title: 'Practical 5: Client-Server Application',
  sections: [
    { type: 'bullets', heading: 'Objective', items: ['Create a simple TCP server'] },
    { type: 'code', heading: 'Program Listing', language: 'python', code: LISTING },
    { type: 'code', heading: 'Verified Output', language: 'output', code: '[SERVER] Listening on 127.0.0.1:65432' },
    { type: 'note', items: ['The client port is ephemeral, so it differs every run.'] },
  ],
};

const theory = {
  number: '3',
  title: 'Firewalls',
  sections: [{ type: 'definition', heading: 'Definition', text: 'A firewall enforces a policy.' }],
};

const course = {
  slug: 'uuy-cyb-221',
  examPrep: [
    { type: 'longform', source: 'Topic 14 · Practical 5 · Program Listing', question: 'Write the server.' },
    { type: 'longform', source: 'Topic 14 · Practical 5 · Notes', question: 'Map the socket calls.' },
    { type: 'longform', source: 'Topic 3 · Firewall Technologies', question: 'Name the ICSA categories.' },
  ],
};

const bundled = {
  hasPregenerated: true,
  getPregenerated: async () => 'The server binds a socket and waits.',
};

describe('topicsWithCode', () => {
  it('keeps topics with a program listing and drops theory and transcripts', () => {
    const outputOnly = { number: '9', title: 'Output only', sections: [theory.sections[0], practical.sections[2]] };
    expect(topicsWithCode([theory, practical, outputOnly])).toEqual([practical]);
  });
});

describe('CodeWalkthrough', () => {
  it('shows the pre-generated walkthrough inline, with no button to press', async () => {
    render(<CodeWalkthrough topics={[theory, practical]} course={course} explanations={bundled} />);

    expect(await screen.findByText('The server binds a socket and waits.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /line by line/i })).not.toBeInTheDocument();
  });

  it('shows the gotchas and the count of questions set on that practical', async () => {
    render(
      <CodeWalkthrough topics={[practical]} course={course} explanations={bundled} onOpenExam={() => {}} />,
    );

    await screen.findByText('The server binds a socket and waits.');
    expect(screen.getByText(/ephemeral/)).toBeInTheDocument();
    // Two of the three questions carry a Topic 14 source; the firewall one does not.
    expect(screen.getByRole('button', { name: /2 exam questions/ })).toBeInTheDocument();
  });

  // A course that has not been generated yet must still be usable — it just
  // costs a click and a network call, exactly as the notes tab does.
  it('falls back to the live button when nothing is bundled', () => {
    render(
      <CodeWalkthrough
        topics={[practical]}
        course={course}
        explainReady
        explanations={{ hasPregenerated: false, getPregenerated: async () => null }}
      />,
    );

    expect(screen.getByRole('button', { name: /line by line/i })).toBeInTheDocument();
  });
});
