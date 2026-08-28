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

  // Each source is rendered as a clickable href in ExplainSelection.jsx, and the
  // list comes from the model — so a non-http(s) scheme must never reach it.
  it('drops sources whose scheme is not http or https', () => {
    const sources = [
      { url: 'javascript:alert(document.cookie)', title: 'Click me' },
      { url: 'data:text/html,<script>alert(1)</script>', title: 'Docs' },
      { url: 'vbscript:msgbox(1)', title: 'Reference' },
      { url: 'file:///etc/passwd', title: 'Local' },
      { url: 'https://owasp.org/xss', title: 'XSS — OWASP' },
    ];
    expect(extractSources({ sources })).toEqual([
      { title: 'XSS — OWASP', url: 'https://owasp.org/xss' },
    ]);
  });

  it('keeps plain http as well as https', () => {
    const sources = [{ url: 'http://example.org/a', title: 'A' }];
    expect(extractSources({ sources })).toEqual([{ title: 'A', url: 'http://example.org/a' }]);
  });

  it('drops values that do not parse as a URL at all', () => {
    const sources = [{ url: 'not a url', title: 'Nope' }, { url: 'https://ok.com', title: 'OK' }];
    expect(extractSources({ sources })).toEqual([{ title: 'OK', url: 'https://ok.com' }]);
  });
});
