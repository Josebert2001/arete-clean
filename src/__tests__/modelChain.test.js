import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { buildModelChain } from '../../api/_lib/model.js';

// Why this file exists: the Gemini thinking cap (thinkingBudget: 0) used to be
// copied into the providerOptions of every caller. api/summarize.js was written
// without it, its recap truncated in production, and gemini-3.7-flash was
// blamed and reverted for a fault that was really a missing option at one call
// site. The cap now rides on the chain entries themselves, and nothing else in
// the suite touches api/_lib/model.js — so these tests are what stops it
// quietly coming off again, and what makes a model swap a visible edit.

const KEYS = [
  'GEMINI_API_KEY',
  'GOOGLE_GENERATIVE_AI_API_KEY',
  'GROQ_API_KEY',
  'OPENROUTER_API_KEY',
];

let saved;

beforeEach(() => {
  saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));
  KEYS.forEach((k) => { delete process.env[k]; });
});

afterEach(() => {
  KEYS.forEach((k) => {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  });
});

const geminiEntries = (tier) => buildModelChain(tier).filter((e) => e.name.startsWith('gemini'));
const thinkingBudgetOf = (entry) => entry?.providerOptions?.google?.thinkingConfig?.thinkingBudget;

describe('buildModelChain — Gemini thinking cap', () => {
  it('caps hidden thinking on every Gemini entry of both tiers', () => {
    process.env.GEMINI_API_KEY = 'test-key';

    for (const tier of ['strong', 'light']) {
      const entries = geminiEntries(tier);
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(thinkingBudgetOf(entry)).toBe(0);
        expect(entry.providerOptions.google.thinkingConfig.includeThoughts).toBe(false);
      }
    }
  });

  it('applies the cap when the key comes from GOOGLE_GENERATIVE_AI_API_KEY too', () => {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-key';
    expect(geminiEntries('strong').every((e) => thinkingBudgetOf(e) === 0)).toBe(true);
  });

  it('never sets a temperature on Gemini — 3.x is tuned for its defaults', () => {
    process.env.GEMINI_API_KEY = 'test-key';
    for (const entry of geminiEntries('strong')) {
      expect(entry.options?.temperature).toBeUndefined();
    }
  });
});

describe('buildModelChain — tier structure', () => {
  beforeEach(() => { process.env.GEMINI_API_KEY = 'test-key'; });

  it('leads the strong tier with the strong model, then falls back to flash-lite', () => {
    const names = buildModelChain('strong').map((e) => e.name);
    expect(names).toEqual(['gemini-strong', 'gemini-lite']);
  });

  it('skips the strong model on the light tier but keeps flash-lite', () => {
    const names = buildModelChain('light').map((e) => e.name);
    expect(names).toEqual(['gemini-lite']);
  });

  it('defaults to the strong tier', () => {
    expect(buildModelChain().map((e) => e.name)).toEqual(buildModelChain('strong').map((e) => e.name));
  });

  it('keeps the two Gemini steps on distinct models', () => {
    // If both ids resolved to the same model the strong chain would have no real
    // second step, and an unavailable strong id would drop straight to Groq's
    // 8K-capped free tier — the 413 the Gemini step exists to absorb.
    const [strong, lite] = buildModelChain('strong');
    expect(strong.model.modelId).toBeTruthy();
    expect(strong.model.modelId).not.toBe(lite.model.modelId);
  });
});

describe('buildModelChain — other providers', () => {
  it('keeps Groq reasoning effort low so it does not eat the answer budget', () => {
    process.env.GROQ_API_KEY = 'test-key';
    const groq = buildModelChain('strong').find((e) => e.name === 'groq');
    expect(groq.providerOptions.groq.reasoningEffort).toBe('low');
  });

  it('orders the full chain Gemini → Groq → OpenRouter', () => {
    process.env.GEMINI_API_KEY = 'test-key';
    process.env.GROQ_API_KEY = 'test-key';
    process.env.OPENROUTER_API_KEY = 'test-key';
    expect(buildModelChain('strong').map((e) => e.name)).toEqual([
      'gemini-strong', 'gemini-lite', 'groq', 'openrouter',
    ]);
  });

  it('includes only the providers whose keys are set', () => {
    process.env.GROQ_API_KEY = 'test-key';
    expect(buildModelChain('strong').map((e) => e.name)).toEqual(['groq']);
  });

  it('returns an empty chain when no provider key is set, so callers can degrade', () => {
    expect(buildModelChain('strong')).toEqual([]);
  });
});
