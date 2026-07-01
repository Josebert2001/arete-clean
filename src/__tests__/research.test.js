import { describe, it, expect } from 'vitest';
import { extractSources } from '../../api/research.js';

describe('extractSources', () => {
  it('returns [] when there are no sources', () => {
    expect(extractSources({})).toEqual([]);
    expect(extractSources({ sources: null })).toEqual([]);
    expect(extractSources(undefined)).toEqual([]);
  });

  it('maps url sources to { title, url }', () => {
    const result = {
      sources: [
        { url: 'https://owasp.org/xss', title: 'XSS — OWASP' },
        { url: 'https://developer.mozilla.org/csp' },
      ],
    };
    expect(extractSources(result)).toEqual([
      { title: 'XSS — OWASP', url: 'https://owasp.org/xss' },
      { title: 'developer.mozilla.org', url: 'https://developer.mozilla.org/csp' },
    ]);
  });

  it('falls back to the bare hostname when there is no title', () => {
    const [source] = extractSources({ sources: [{ url: 'https://www.example.com/a/b' }] });
    expect(source.title).toBe('example.com');
  });

  it('dedupes repeated urls and skips entries without a url', () => {
    const result = {
      sources: [
        { url: 'https://a.com', title: 'A' },
        { url: 'https://a.com', title: 'A again' },
        { title: 'no url here' },
      ],
    };
    expect(extractSources(result)).toEqual([{ title: 'A', url: 'https://a.com' }]);
  });

  it('caps the list at 5 sources', () => {
    const sources = Array.from({ length: 8 }, (_, i) => ({ url: `https://s${i}.com`, title: `S${i}` }));
    expect(extractSources({ sources })).toHaveLength(5);
  });
});
