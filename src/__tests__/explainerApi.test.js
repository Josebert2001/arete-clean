import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../lib/supabase', () => ({
  authHeaders: async () => ({ Authorization: 'Bearer test-token' }),
}));

import { askExplainer } from '../utils/explainerApi';

describe('askExplainer', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('sends the signed-in student\'s token, which /api/explainer requires', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ explanation: 'ok' }), {
      status: 200, headers: { 'content-type': 'application/json' },
    }));
    vi.stubGlobal('fetch', fetchMock);

    const data = await askExplainer('print(1)', 'python');

    expect(data.explanation).toBe('ok');
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/explainer');
    expect(options.headers.Authorization).toBe('Bearer test-token');
    expect(JSON.parse(options.body)).toEqual({ code: 'print(1)', language: 'python' });
  });
});
