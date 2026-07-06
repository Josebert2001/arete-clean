import { describe, it, expect } from 'vitest';
import { toDisplayText, STREAM_ERROR_MARKER } from '../utils/tutorStream';

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
