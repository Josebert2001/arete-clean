// "Explain this code" is the answer to a student saying they do not understand
// a listing. Three things carry real risk and are guarded here:
//
//   1. It must be absent, not broken, when no model provider is configured —
//      every AI feature in this project degrades to nothing, and a button that
//      always errors is worse than no button.
//   2. The localStorage cache must actually hit. The practicals are a fixed set
//      of listings a whole class asks about in the same week, and every miss is
//      a model call charged against an 8-per-10-minute budget.
//   3. A failed call must say so and stay retryable, rather than hanging on
//      "Reading the code…".
//
// Interaction goes through fireEvent, matching the other component tests —
// user-event is not a dependency of this project.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExplainCode from '../components/ExplainCode';
import {
  canExplainCode,
  getCachedExplanation,
  setCachedExplanation,
  MIN_EXPLAIN_CHARS,
  MAX_EXPLAIN_CHARS,
} from '../utils/explainCode';

const LISTING = `def reverse_string(s):
    return s[::-1]

def read_and_reverse_write(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.read()
    with open(output_file, 'w') as file:
        file.write(reverse_string(content))`;

// fetchJsonWithFallback bails out unless the response claims to be JSON.
const jsonResponse = (body) => ({
  headers: { get: () => 'application/json' },
  status: 200,
  json: async () => body,
});

const explain = () => fireEvent.click(screen.getByRole('button', { name: /Explain this code/ }));

describe('canExplainCode', () => {
  it('refuses a snippet too short to walk through', () => {
    expect(canExplainCode('x = 1')).toBe(false);
    expect(canExplainCode('')).toBe(false);
    expect(canExplainCode(null)).toBe(false);
  });

  it('accepts a real listing', () => {
    expect(canExplainCode(LISTING)).toBe(true);
    expect(LISTING.length).toBeGreaterThan(MIN_EXPLAIN_CHARS);
  });

  // The endpoint rejects anything longer with a 400, so the button must not
  // offer the call. Both limits live in explainCode.js beside each other.
  it('refuses a listing past the endpoint limit', () => {
    expect(canExplainCode('#'.repeat(MAX_EXPLAIN_CHARS + 1))).toBe(false);
    expect(canExplainCode('#'.repeat(MAX_EXPLAIN_CHARS))).toBe(true);
  });
});

describe('the explanation cache', () => {
  beforeEach(() => localStorage.clear());

  it('keys on the language as well as the code', () => {
    setCachedExplanation(LISTING, 'python', 'a python walkthrough');
    expect(getCachedExplanation(LISTING, 'python')).toBe('a python walkthrough');
    expect(getCachedExplanation(LISTING, 'java')).toBeNull();
  });
});

describe('ExplainCode', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('renders nothing when no model provider is configured', () => {
    const { container } = render(<ExplainCode code={LISTING} language="python" ready={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for a snippet too short to be worth a call', () => {
    const { container } = render(<ExplainCode code="x = 1" language="python" ready />);
    expect(container).toBeEmptyDOMElement();
  });

  it('fetches a walkthrough, shows it, and lets the student hide it again', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ explanation: 'It reverses the file.' }));
    vi.stubGlobal('fetch', fetchMock);

    render(<ExplainCode code={LISTING} language="python" ready />);
    explain();

    expect(await screen.findByText('It reverses the file.')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      code: LISTING,
      language: 'python',
    });

    fireEvent.click(screen.getByRole('button', { name: /Hide walkthrough/ }));
    expect(screen.queryByText('It reverses the file.')).not.toBeInTheDocument();
  });

  // One model call per listing per device, ever — the whole point of the cache.
  it('serves a second reader from the cache without calling the API', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ explanation: 'It reverses the file.' }));
    vi.stubGlobal('fetch', fetchMock);

    const first = render(<ExplainCode code={LISTING} language="python" ready />);
    explain();
    await screen.findByText('It reverses the file.');
    first.unmount();

    render(<ExplainCode code={LISTING} language="python" ready />);
    explain();
    expect(await screen.findByText('It reverses the file.')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('surfaces an API error and offers a retry', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ error: 'The AI is busy.' }));
    vi.stubGlobal('fetch', fetchMock);

    render(<ExplainCode code={LISTING} language="python" ready />);
    explain();

    expect(await screen.findByText('The AI is busy.')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('button', { name: /Retry/ })).toBeInTheDocument());
  });

  it('surfaces a network failure rather than hanging', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline'); }));

    render(<ExplainCode code={LISTING} language="python" ready />);
    explain();

    expect(await screen.findByText(/Network error/)).toBeInTheDocument();
  });
});
