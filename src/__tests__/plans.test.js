import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PREMIUM_PASS, PREMIUM_DAILY_LIMITS, FREE_DAILY_LIMITS, FEATURE_LABELS, FREE_CTF_ROOMS, formatNaira, planComparison } from '../data/plans';
import { usedToday, recordUse, todayKey } from '../utils/dailyUsage';
import { isQuotaExceeded, announceQuotaExceeded, QUOTA_EVENT } from '../utils/quotaEvents';
import { referenceFromSearch } from '../utils/billingApi';

describe('plans config', () => {
  it('prices the Semester Pass at ₦2,500 for 180 days, in kobo', () => {
    expect(PREMIUM_PASS.priceKobo).toBe(250000);
    expect(PREMIUM_PASS.currency).toBe('NGN');
    expect(PREMIUM_PASS.durationDays).toBe(180);
    expect(formatNaira(PREMIUM_PASS.priceKobo)).toBe('₦2,500');
  });

  it('gives every metered feature a positive whole-number limit and a label', () => {
    for (const [feature, limit] of Object.entries(FREE_DAILY_LIMITS)) {
      expect(Number.isInteger(limit) && limit > 0, feature).toBe(true);
      expect(FEATURE_LABELS[feature], feature).toBeTruthy();
    }
  });

  it('gives all six server-metered features a higher Premium fair-use allowance', () => {
    const features = ['tutor', 'explainer', 'simplify', 'summarize', 'research', 'run'];
    expect(Object.keys(PREMIUM_DAILY_LIMITS).sort()).toEqual(features.sort());
    for (const feature of features) {
      expect(Number.isInteger(PREMIUM_DAILY_LIMITS[feature]), feature).toBe(true);
      expect(PREMIUM_DAILY_LIMITS[feature], feature).toBeGreaterThan(FREE_DAILY_LIMITS[feature]);
    }
  });

  it('quotes the real Premium cap on every server-metered row, never "Unlimited"', () => {
    const rows = Object.fromEntries(planComparison().map((r) => [r.feature, r.premium]));
    const P = PREMIUM_DAILY_LIMITS;
    const metered = { 'AI Tutor': [P.tutor], 'Live code explanations': [P.explainer], 'Simplify / Key points': [P.simplify, P.summarize], 'Explain-this web lookups': [P.research], 'Code playground runs': [P.run] };
    for (const [feature, caps] of Object.entries(metered)) {
      expect(rows[feature], feature).not.toMatch(/unlimited/i);
      for (const cap of caps) expect(rows[feature], feature).toContain(String(cap));
    }
    for (const feature of ['Course outlines, lecture notes, flashcards', 'Pre-written code walkthroughs', 'Practice quizzes (MCQ)', 'Written exam prep']) {
      expect(rows[feature], feature).toBe('Unlimited');
    }
  });

  it('never meters the lecture notes', () => {
    expect(Object.keys(FREE_DAILY_LIMITS).some((k) => /note/i.test(k))).toBe(false);
    const notesRow = planComparison().find((r) => /lecture notes/i.test(r.feature));
    expect(notesRow.free).toBe('Unlimited');
  });

  it('advertises exactly the limits the code enforces', () => {
    const rows = Object.fromEntries(planComparison().map((r) => [r.feature, r.free]));
    expect(rows['AI Tutor']).toContain(String(FREE_DAILY_LIMITS.tutor));
    expect(rows['Practice quizzes (MCQ)']).toContain(String(FREE_DAILY_LIMITS.quiz));
    expect(rows['Security CTF challenges']).toContain(String(FREE_CTF_ROOMS));
  });
});

describe('dailyUsage', () => {
  beforeEach(() => localStorage.clear());

  it('counts per account and per feature, and refills the next day', () => {
    const monday = new Date(2026, 10, 9, 10);
    const tuesday = new Date(2026, 10, 10, 0, 1);
    expect(recordUse('quiz', 'a', monday)).toBe(1);
    expect(recordUse('quiz', 'a', monday)).toBe(2);
    expect(usedToday('quiz', 'a', monday)).toBe(2);
    expect(usedToday('quiz', 'b', monday)).toBe(0);
    expect(usedToday('examPrep', 'a', monday)).toBe(0);
    expect(usedToday('quiz', 'a', tuesday)).toBe(0);
  });

  it('prunes earlier days when it writes', () => {
    recordUse('quiz', 'a', new Date(2026, 10, 9));
    recordUse('quiz', 'a', new Date(2026, 10, 10));
    const stored = JSON.parse(localStorage.getItem('arete-daily-usage-v1'));
    expect(Object.values(stored).every((v) => v.day === todayKey(new Date(2026, 10, 10)))).toBe(true);
  });

  it('treats corrupt storage as a fresh allowance rather than a lockout', () => {
    localStorage.setItem('arete-daily-usage-v1', '{not json');
    expect(usedToday('quiz', 'a')).toBe(0);
  });
});

describe('quotaEvents', () => {
  it('recognises only the daily-quota 429, not the short rate limit', () => {
    expect(isQuotaExceeded(429, { kind: 'quota_exceeded' })).toBe(true);
    expect(isQuotaExceeded(429, { kind: 'rate_limited' })).toBe(false);
    expect(isQuotaExceeded(200, { kind: 'quota_exceeded' })).toBe(false);
  });

  it('broadcasts the feature and message', () => {
    const listener = vi.fn();
    window.addEventListener(QUOTA_EVENT, listener);
    announceQuotaExceeded({ feature: 'tutor', limit: 10, error: 'used up' });
    window.removeEventListener(QUOTA_EVENT, listener);
    expect(listener.mock.calls[0][0].detail).toEqual({ feature: 'tutor', limit: 10, message: 'used up' });
  });
});

describe('referenceFromSearch', () => {
  it('reads either of the parameters Paystack appends', () => {
    expect(referenceFromSearch('?trxref=arete_x&reference=arete_x')).toBe('arete_x');
    expect(referenceFromSearch('?trxref=arete_y')).toBe('arete_y');
    expect(referenceFromSearch('')).toBe('');
  });
});
