import { describe, expect, it } from 'vitest';
import { rateLimitMessage } from '../utils/rateLimitMessage.js';

describe('rate limit messages', () => {
  it('names the feature and rounds the retry time up to minutes', () => {
    expect(rateLimitMessage('/api/research', '91')).toBe('Explain-this request limit reached. Try again in about 2 minutes.');
    expect(rateLimitMessage('/api/extract', null)).toContain('Upload request limit reached');
    expect(rateLimitMessage('/api/tutor', '20')).toContain('about 1 minute.');
  });
});
