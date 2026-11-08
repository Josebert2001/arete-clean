// Areté Premium — the one place prices and free-tier limits live.
//
// Read by BOTH sides: the browser (pricing page, client-side gates on quizzes,
// exam prep and CTF rooms) and the Vercel functions (api/_lib/plan.js charges
// the AI and code-run quotas; api/billing.js charges the price). A leaf module
// with no imports on purpose, so the API bundle pulls in nothing else.
//
// Change a number here and both sides move together. A price change does not
// touch payments already in flight: checkout copies amount and duration onto the
// billing_payments row, and the grant reads them from there.
//
// Lecture notes are never on this list. They are what a coursemate shares the
// link for (docs/business-model.md, "Never paywall the notes"); Premium sells
// the tools around them.

// One-time payment, not a recurring subscription: most students pay by bank
// transfer or USSD and have no card to keep on file. Buying while already
// Premium extends the current pass rather than overlapping it.
export const PREMIUM_PASS = Object.freeze({
  id: 'semester',
  name: 'Semester Pass',
  priceKobo: 250000, // ₦2,500 — Paystack amounts are in kobo
  currency: 'NGN',
  // A semester plus its exams, with room to spare. Six months also makes two
  // passes cover a full session.
  durationDays: 180,
});

// Free-tier allowance per 24 hours. A feature missing from this map is not
// metered. Premium has no daily cap; the short per-10-minute limits in each
// endpoint still apply to everyone and are what bound abuse.
//
// Server-enforced (cannot be bypassed from the browser): tutor, explainer,
// simplify, summarize, research, run.
// Client-enforced (counted in this browser): quiz, examPrep. Their question
// banks ship in the bundle, so a determined student can always reach them; the
// gate is a nudge, not a lock.
export const FREE_DAILY_LIMITS = Object.freeze({
  tutor: 10,
  explainer: 5,
  simplify: 10,
  summarize: 5,
  research: 3,
  run: 5,
  quiz: 3,
  examPrep: 3,
});

// Phrased to finish "You've used today's 3 free …".
export const FEATURE_LABELS = Object.freeze({
  tutor: 'AI Tutor messages',
  explainer: 'code explanations',
  simplify: 'Simplify rewrites',
  summarize: 'Key points recaps',
  research: 'Explain-this lookups',
  run: 'code runs',
  quiz: 'practice quizzes',
  examPrep: 'exam-prep sessions',
});

// The first N Security rooms keep their capture-the-flag challenge free; later
// rooms need Premium for the challenge only. Every room's theory and quiz stay
// open, so a free student can still learn the material.
export const FREE_CTF_ROOMS = 4;

export const DAY_MS = 24 * 60 * 60 * 1000;

export function formatNaira(kobo) {
  const naira = Math.round(Number(kobo) / 100);
  return `₦${naira.toLocaleString('en-NG')}`;
}

// What the pricing page compares, row by row. Kept beside the limits so the
// page cannot advertise a number the code does not enforce.
export function planComparison() {
  const L = FREE_DAILY_LIMITS;
  return [
    { feature: 'Course outlines, lecture notes, flashcards', free: 'Unlimited', premium: 'Unlimited' },
    { feature: 'Pre-written code walkthroughs', free: 'Unlimited', premium: 'Unlimited' },
    { feature: 'AI Tutor', free: `${L.tutor} messages a day`, premium: 'Unlimited' },
    { feature: 'Live code explanations', free: `${L.explainer} a day`, premium: 'Unlimited' },
    { feature: 'Simplify / Key points', free: `${L.simplify} / ${L.summarize} a day`, premium: 'Unlimited' },
    { feature: 'Explain-this web lookups', free: `${L.research} a day`, premium: 'Unlimited' },
    { feature: 'Practice quizzes (MCQ)', free: `${L.quiz} a day`, premium: 'Unlimited' },
    { feature: 'Written exam prep', free: `${L.examPrep} sessions a day`, premium: 'Unlimited' },
    { feature: 'Security CTF challenges', free: `First ${FREE_CTF_ROOMS} rooms`, premium: 'All 12 rooms' },
    { feature: 'Code playground runs', free: `${L.run} a day`, premium: 'Unlimited*' },
  ];
}
