import { describe, it, expect, vi, afterEach } from 'vitest';
import { toDisplayText, streamTutor, STREAM_ERROR_MARKER } from '../utils/tutorStream';

vi.mock('../lib/supabase', () => ({ getAccessToken: async () => null }));

// toDisplayText is what keeps the tutor's internal markers (status + error
// sentinel) out of the rendered answer. A regression here would leak
// "<<arete:status:...>>" into the chat, so pin the behaviour.

describe('toDisplayText', () => {
  it('leaves plain answers untouched', () => {
    expect(toDisplayText('Pointers store memory addresses.')).toBe('Pointers store memory addresses.');
  });

  it('strips a complete status marker but keeps the answer', () => {
    const raw = '<<arete:status:Looking up CYB 224>>Here is the answer.';
    expect(toDisplayText(raw)).toBe('Here is the answer.');
  });

  it('strips multiple status markers', () => {
    const raw = '<<arete:status:Checking your progress>><<arete:status:Looking up COS 211>>Answer.';
    expect(toDisplayText(raw)).toBe('Answer.');
  });

  it('holds back a partial marker split across chunks (no flash)', () => {
    // Mid-stream, only "<<arete:stat" has arrived — it must not show as text.
    expect(toDisplayText('Some text <<arete:stat')).toBe('Some text ');
    expect(toDisplayText('<<arete:status:Look')).toBe('');
  });

  it('strips the error sentinel', () => {
    expect(toDisplayText(`Partial answer${STREAM_ERROR_MARKER}`)).toBe('Partial answer');
  });

  it('handles status + text + trailing error sentinel together', () => {
    const raw = `<<arete:status:Reading java module 8>>The answer.${STREAM_ERROR_MARKER}`;
    expect(toDisplayText(raw)).toBe('The answer.');
  });
});

// Students here are on intermittent mobile data, so losing the connection
// part-way through an answer is routine rather than exceptional. A half-answer
// must never come back looking like a finished one — the caller decides whether
// to show the "cut off" notice based purely on the `truncated` flag.

const encoder = new TextEncoder();

// Minimal stand-in for a streaming fetch Response: yields each chunk, then
// either ends cleanly or throws `failWith` to simulate a mid-stream failure.
function textStreamResponse(chunks, failWith = null) {
  let i = 0;
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'text/plain; charset=utf-8' },
    body: {
      getReader: () => ({
        read: async () => {
          if (i < chunks.length) return { done: false, value: encoder.encode(chunks[i++]) };
          if (failWith) throw failWith;
          return { done: true, value: undefined };
        },
      }),
    },
  };
}

describe('streamTutor — incomplete answers are flagged', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('marks the answer truncated when the connection drops mid-stream', async () => {
    // What a dropped mobile connection actually throws from reader.read().
    const dropped = new TypeError('network error');
    vi.stubGlobal('fetch', async () => textStreamResponse(['Pointers store '], dropped));

    const res = await streamTutor({ messages: [{ role: 'user', content: 'q' }] });

    expect(res.truncated).toBe(true);
    expect(res.answer).toBe('Pointers store');
  });

  it('reports an error when the connection drops before any text arrives', async () => {
    vi.stubGlobal('fetch', async () => textStreamResponse([], new TypeError('network error')));

    const res = await streamTutor({ messages: [{ role: 'user', content: 'q' }] });

    expect(res.answer).toBeUndefined();
    expect(res.error).toMatch(/interrupted/i);
  });

  it('does not flag a stream that completes normally', async () => {
    vi.stubGlobal('fetch', async () => textStreamResponse(['Pointers store ', 'addresses.']));

    const res = await streamTutor({ messages: [{ role: 'user', content: 'q' }] });

    expect(res.answer).toBe('Pointers store addresses.');
    expect(res.truncated).toBeUndefined();
  });

  it('still treats a caller abort as an abort, not a failure', async () => {
    const abort = Object.assign(new Error('aborted'), { name: 'AbortError' });
    vi.stubGlobal('fetch', async () => textStreamResponse(['Half an ans'], abort));

    const res = await streamTutor({ messages: [{ role: 'user', content: 'q' }] });

    expect(res.aborted).toBe(true);
    expect(res.truncated).toBeUndefined();
  });
});
