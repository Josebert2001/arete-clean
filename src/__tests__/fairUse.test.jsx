import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { fetchJsonWithFallback } from '../utils/apiClient';
import { streamTutor } from '../utils/tutorStream';
import { QUOTA_EVENT } from '../utils/quotaEvents';
import CodePlayground from '../components/CodePlayground';

vi.mock('../lib/supabase', () => ({ authHeaders: async () => ({}), getAccessToken: async () => null }));

const message = "You've reached today's fair-use limit of 40 code runs. It resets in about 5 hours.";
const reply = (kind = 'fair_use') => ({
  status: 429,
  headers: { get: (name) => name.toLowerCase() === 'content-type' ? 'application/json' : '18000' },
  json: async () => ({ kind, error: message, feature: 'run' }),
});

beforeEach(() => { localStorage.clear(); });
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('fair-use responses', () => {
  it.each(['json', 'tutor'])('%s keeps the server message without announcing an upgrade', async (client) => {
    vi.stubGlobal('fetch', vi.fn(async () => reply()));
    const listener = vi.fn();
    window.addEventListener(QUOTA_EVENT, listener);
    try {
      const result = client === 'json'
        ? await fetchJsonWithFallback('/api/run', {}, 'fallback')
        : await streamTutor({ messages: [] });
      expect(result).toMatchObject({ kind: 'fair_use', error: message, responseStatus: 429 });
      expect(result.quotaExceeded).toBeUndefined();
      expect(listener).not.toHaveBeenCalled();
    } finally {
      window.removeEventListener(QUOTA_EVENT, listener);
    }
  });

  it('leaves shared code credits intact when personal fair use is spent', async () => {
    const key = 'jdoodle-credits-' + new Date().toISOString().slice(0, 10);
    localStorage.setItem(key, '12');
    vi.stubGlobal('fetch', vi.fn(async () => reply()));
    render(<CodePlayground initialCode="print('hello')" language="python" />);
    fireEvent.click(screen.getByRole('button', { name: 'Run' }));
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.getByText('12/20 runs left')).toBeInTheDocument();
    expect(localStorage.getItem(key)).toBe('12');
    expect(screen.getByRole('button', { name: 'Run' })).toBeEnabled();
  });
});
