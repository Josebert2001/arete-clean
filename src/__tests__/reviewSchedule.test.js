import { describe, it, expect } from 'vitest';
import {
  ITEM_KINDS,
  BOX_INTERVALS,
  MAX_BOX,
  LEECH_THRESHOLD,
  REVIEW_PASS_FRACTION,
  PRUNE_AFTER_DAYS,
  hashPrompt,
  itemId,
  quizItemId,
  examItemId,
  cardItemId,
  dayIndex,
  schedule,
  gradeFromMarks,
  isLeech,
  isDue,
  applyReviews,
  buildQueue,
  selectLeeches,
  dueCount,
  dueCountFromState,
  kindOf,
  trackedCount,
  pruneItems,
} from '../utils/reviewSchedule';

// Deterministic stand-in for the Fisher-Yates shuffle, so queue tests assert
// selection and ordering rather than fighting Math.random.
const noShuffle = (arr) => arr;

// ─── hashPrompt ───────────────────────────────────────────────────────────────

describe('hashPrompt', () => {
  it('is stable for the same input', () => {
    expect(hashPrompt('Define web-based risk.')).toBe(hashPrompt('Define web-based risk.'));
  });

  it('differs for different prompts', () => {
    expect(hashPrompt('Define web-based risk.')).not.toBe(hashPrompt('Define a website attack.'));
  });

  it('ignores whitespace reflowing, so rewrapping a source string keeps history', () => {
    const a = 'Differentiate between web application risk and mobile application risk.';
    const b = 'Differentiate between web application risk\n  and mobile application risk.';
    expect(hashPrompt(a)).toBe(hashPrompt(b));
  });

  it('ignores leading and trailing whitespace', () => {
    expect(hashPrompt('  Define QA.  ')).toBe(hashPrompt('Define QA.'));
  });

  it('treats a material rewording as a different item', () => {
    expect(hashPrompt('Define quality assurance.')).not.toBe(hashPrompt('Define quality assurance briefly.'));
  });

  it('handles null, undefined and empty input without throwing', () => {
    expect(hashPrompt(null)).toBe(hashPrompt(undefined));
    expect(typeof hashPrompt('')).toBe('string');
  });

  it('returns a compact base36 string', () => {
    expect(hashPrompt('Define web-based risk.')).toMatch(/^[0-9a-z]+$/);
  });
});

// ─── itemId ───────────────────────────────────────────────────────────────────

describe('itemId', () => {
  it('builds a kind:course:hash id', () => {
    const id = itemId(ITEM_KINDS.quiz, 'uuy-cyb-222', 'Define web-based risk.');
    expect(id).toMatch(/^q:uuy-cyb-222:[0-9a-z]+$/);
  });

  it('separates the same prompt across kinds', () => {
    const prompt = 'Define web-based risk.';
    expect(itemId(ITEM_KINDS.quiz, 'uuy-cyb-222', prompt))
      .not.toBe(itemId(ITEM_KINDS.exam, 'uuy-cyb-222', prompt));
  });

  it('separates the same prompt across courses', () => {
    const prompt = 'Define encryption.';
    expect(itemId(ITEM_KINDS.quiz, 'uuy-cyb-222', prompt))
      .not.toBe(itemId(ITEM_KINDS.quiz, 'cyb-222', prompt));
  });

  it('is unchanged by a question moving position within its bank', () => {
    const bank = ['Q one', 'Q two', 'Q three'];
    const reordered = ['Q three', 'Q one', 'Q two'];
    const ids = (arr) => arr.map((q) => itemId(ITEM_KINDS.quiz, 'c', q)).sort();
    expect(ids(bank)).toEqual(ids(reordered));
  });

  it('is unchanged by inserting a question mid-bank', () => {
    const idsFor = (bank) =>
      Object.fromEntries(bank.map((q) => [q, itemId(ITEM_KINDS.quiz, 'c', q)]));

    const before = idsFor(['Q one', 'Q two', 'Q three']);
    const after = idsFor(['Q one', 'Q one-and-a-half', 'Q two', 'Q three']);

    // Every original question keeps its id even though its index shifted. An
    // index-based id would silently re-point 'Q two' and 'Q three' here.
    for (const q of ['Q one', 'Q two', 'Q three']) {
      expect(after[q]).toBe(before[q]);
    }
    // And the inserted question gets a genuinely new id rather than inheriting one.
    expect(Object.values(before)).not.toContain(after['Q one-and-a-half']);
  });
});

// ─── Per-kind identity ────────────────────────────────────────────────────────

describe('quizItemId', () => {
  const q = {
    question: 'Which of these is a server-side technology?',
    options: ['HTML', 'CSS', 'PHP', 'A browser cookie'],
    correctIndex: 2,
  };

  it('is unaffected by option order, since Quiz.jsx reshuffles every attempt', () => {
    const shuffledOptions = { ...q, options: ['PHP', 'A browser cookie', 'HTML', 'CSS'] };
    expect(quizItemId('c', shuffledOptions)).toBe(quizItemId('c', q));
  });

  it('separates two questions that share a stem but test different things', () => {
    const other = { ...q, options: ['Java', 'Kotlin', 'Swift', 'Rust'] };
    expect(quizItemId('c', other)).not.toBe(quizItemId('c', q));
  });

  it('tolerates a question with no options', () => {
    expect(() => quizItemId('c', { question: 'Bare stem' })).not.toThrow();
  });
});

describe('examItemId', () => {
  it('identifies a written question by its prompt', () => {
    const a = { question: 'Define web-based risk.', marks: 5 };
    const b = { question: 'Define web-based risk.', marks: 10 };
    // Re-weighting a question does not make it a different question.
    expect(examItemId('uuy-cyb-222', b)).toBe(examItemId('uuy-cyb-222', a));
  });

  it('separates different written questions', () => {
    expect(examItemId('c', { question: 'Define QA.' }))
      .not.toBe(examItemId('c', { question: 'Define a website attack.' }));
  });
});

describe('cardItemId', () => {
  // Real case from the corpus: 45 terms in ENT 221 appear in more than one
  // termlist with genuinely different definitions. Hashing the term alone gave
  // both the same schedule, so a student could drill one definition and be
  // credited for the other.
  it('separates the same term carrying different definitions', () => {
    const noteOne = { term: 'Need for Achievement', def: "A strong drive to succeed and reach one's goals." };
    const noteTwo = { term: 'Need for Achievement', def: 'Driven by David C. McClelland\'s theory of "acquired need."' };
    expect(cardItemId('ent-221', noteTwo)).not.toBe(cardItemId('ent-221', noteOne));
  });

  it('collapses a card duplicated verbatim across two notes into one schedule', () => {
    const card = { term: 'Sequence Number', def: 'Identifies the datagrams sent as part of an SA.' };
    expect(cardItemId('uuy-cyb-221', { ...card })).toBe(cardItemId('uuy-cyb-221', card));
  });

  it('does not let term and definition bleed across the separator', () => {
    // Without a separator both of these would hash the same concatenation.
    const a = { term: 'Web app', def: 'risk model' };
    const b = { term: 'Web', def: 'app risk model' };
    expect(cardItemId('c', a)).not.toBe(cardItemId('c', b));
  });

  it('tolerates a card missing its definition', () => {
    expect(() => cardItemId('c', { term: 'Orphan' })).not.toThrow();
  });
});

// ─── dayIndex ─────────────────────────────────────────────────────────────────

describe('dayIndex', () => {
  it('gives the same index for two times on the same local day', () => {
    expect(dayIndex(new Date(2026, 7, 14, 0, 30))).toBe(dayIndex(new Date(2026, 7, 14, 23, 45)));
  });

  it('increments by one across a local midnight', () => {
    const d1 = dayIndex(new Date(2026, 7, 14, 23, 59));
    const d2 = dayIndex(new Date(2026, 7, 15, 0, 1));
    expect(d2 - d1).toBe(1);
  });

  it('accepts a timestamp as well as a Date', () => {
    const d = new Date(2026, 7, 14, 12, 0);
    expect(dayIndex(d.getTime())).toBe(dayIndex(d));
  });

  it('counts whole days between two dates', () => {
    expect(dayIndex(new Date(2026, 7, 24)) - dayIndex(new Date(2026, 7, 14))).toBe(10);
  });
});

// ─── schedule ─────────────────────────────────────────────────────────────────

describe('schedule', () => {
  const TODAY = 20_000;

  it('puts a new item answered correctly into box 2, not box 1', () => {
    const s = schedule(undefined, true, TODAY);
    expect(s.b).toBe(2);
    expect(s.d).toBe(TODAY + BOX_INTERVALS[1]);
  });

  it('puts a new item answered wrongly into box 1, due tomorrow', () => {
    const s = schedule(undefined, false, TODAY);
    expect(s.b).toBe(1);
    expect(s.d).toBe(TODAY + 1);
  });

  it('does not count a first-ever wrong answer as a lapse', () => {
    expect(schedule(undefined, false, TODAY).l).toBe(0);
  });

  it('advances one box on a correct answer', () => {
    const s = schedule({ b: 2, d: TODAY, n: 3, l: 0, t: 1 }, true, TODAY);
    expect(s.b).toBe(3);
    expect(s.d).toBe(TODAY + BOX_INTERVALS[2]);
  });

  it('caps the box at MAX_BOX', () => {
    const s = schedule({ b: MAX_BOX, d: TODAY, n: 9, l: 0, t: 1 }, true, TODAY);
    expect(s.b).toBe(MAX_BOX);
    expect(s.d).toBe(TODAY + BOX_INTERVALS[MAX_BOX - 1]);
  });

  it('drops straight to box 1 from any box on a wrong answer', () => {
    const s = schedule({ b: MAX_BOX, d: TODAY, n: 9, l: 0, t: 1 }, false, TODAY);
    expect(s.b).toBe(1);
    expect(s.d).toBe(TODAY + 1);
  });

  it('counts a lapse when a previously seen item is missed', () => {
    const s = schedule({ b: 3, d: TODAY, n: 4, l: 1, t: 1 }, false, TODAY);
    expect(s.l).toBe(2);
  });

  it('does not count a lapse on a correct answer', () => {
    const s = schedule({ b: 3, d: TODAY, n: 4, l: 2, t: 1 }, true, TODAY);
    expect(s.l).toBe(2);
  });

  it('increments the seen count every time', () => {
    expect(schedule(undefined, true, TODAY).n).toBe(1);
    expect(schedule({ b: 1, d: TODAY, n: 6, l: 0, t: 1 }, true, TODAY).n).toBe(7);
  });

  it('records the review timestamp for cross-device merge', () => {
    expect(schedule(undefined, true, TODAY, 1_700_000_000_000).t).toBe(1_700_000_000_000);
  });

  it('produces intervals that lengthen as the box rises', () => {
    let state;
    const seen = [];
    for (let i = 0; i < MAX_BOX + 1; i++) {
      state = schedule(state, true, TODAY);
      seen.push(state.d - TODAY);
    }
    const sorted = [...seen].sort((a, b) => a - b);
    expect(seen).toEqual(sorted);
    expect(seen[seen.length - 1]).toBe(BOX_INTERVALS[MAX_BOX - 1]);
  });

  it('never mutates the previous state', () => {
    const prev = { b: 2, d: TODAY, n: 1, l: 0, t: 1 };
    const snapshot = { ...prev };
    schedule(prev, false, TODAY);
    expect(prev).toEqual(snapshot);
  });
});

// ─── gradeFromMarks ───────────────────────────────────────────────────────────

describe('gradeFromMarks', () => {
  it('passes at or above the threshold fraction', () => {
    expect(gradeFromMarks(7, 10)).toBe(true);
    expect(gradeFromMarks(10, 10)).toBe(true);
  });

  it('fails below the threshold fraction', () => {
    expect(gradeFromMarks(6, 10)).toBe(false);
    expect(gradeFromMarks(0, 10)).toBe(false);
  });

  it('uses REVIEW_PASS_FRACTION as the boundary', () => {
    const marks = 10;
    expect(gradeFromMarks(REVIEW_PASS_FRACTION * marks, marks)).toBe(true);
  });

  it('handles the half-mark schemes real banks use', () => {
    // e.g. the steganography question: 2 + 1 + 1.5 + 1.5 out of 6
    expect(gradeFromMarks(4.5, 6)).toBe(true);
    expect(gradeFromMarks(3, 6)).toBe(false);
  });

  it('returns false rather than dividing by zero on a zero-mark question', () => {
    expect(gradeFromMarks(0, 0)).toBe(false);
    expect(gradeFromMarks(5, undefined)).toBe(false);
  });
});

// ─── isLeech / isDue ──────────────────────────────────────────────────────────

describe('isLeech', () => {
  it('is false below the threshold', () => {
    expect(isLeech({ b: 1, d: 0, n: 9, l: LEECH_THRESHOLD - 1, t: 1 })).toBe(false);
  });

  it('is true at and above the threshold', () => {
    expect(isLeech({ b: 1, d: 0, n: 9, l: LEECH_THRESHOLD, t: 1 })).toBe(true);
    expect(isLeech({ b: 1, d: 0, n: 20, l: LEECH_THRESHOLD + 5, t: 1 })).toBe(true);
  });

  it('is false for missing state', () => {
    expect(isLeech(undefined)).toBe(false);
  });
});

describe('isDue', () => {
  it('is true when the due day has arrived or passed', () => {
    expect(isDue({ b: 1, d: 100, n: 1, l: 0, t: 1 }, 100)).toBe(true);
    expect(isDue({ b: 1, d: 90, n: 1, l: 0, t: 1 }, 100)).toBe(true);
  });

  it('is false when the due day is still ahead', () => {
    expect(isDue({ b: 1, d: 101, n: 1, l: 0, t: 1 }, 100)).toBe(false);
  });

  it('is false for an item with no stored state', () => {
    expect(isDue(undefined, 100)).toBe(false);
  });
});

// ─── buildQueue ───────────────────────────────────────────────────────────────

describe('buildQueue', () => {
  const TODAY = 20_000;
  const item = (id, course = 'c1') => ({ id, course });

  it('returns an empty queue when there is nothing available', () => {
    expect(buildQueue({}, [], { today: TODAY })).toEqual([]);
  });

  it('includes items whose due day has arrived', () => {
    const available = [item('a'), item('b')];
    const items = {
      a: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      b: { b: 1, d: TODAY + 5, n: 1, l: 0, t: 1 },
    };
    const q = buildQueue(items, available, { today: TODAY, newCap: 0, shuffle: noShuffle });
    expect(q.map((i) => i.id)).toEqual(['a']);
  });

  it('orders the due selection most-overdue first', () => {
    const available = [item('a'), item('b'), item('c')];
    const items = {
      a: { b: 2, d: TODAY - 1, n: 1, l: 0, t: 1 },
      b: { b: 2, d: TODAY - 9, n: 1, l: 0, t: 1 },
      c: { b: 2, d: TODAY - 4, n: 1, l: 0, t: 1 },
    };
    const q = buildQueue(items, available, { today: TODAY, newCap: 0, shuffle: noShuffle });
    expect(q.map((i) => i.id)).toEqual(['b', 'c', 'a']);
  });

  it('breaks ties on due day by putting the weakest box first', () => {
    const available = [item('strong'), item('weak')];
    const items = {
      strong: { b: 4, d: TODAY, n: 6, l: 0, t: 1 },
      weak: { b: 1, d: TODAY, n: 2, l: 1, t: 1 },
    };
    const q = buildQueue(items, available, { today: TODAY, newCap: 0, shuffle: noShuffle });
    expect(q.map((i) => i.id)).toEqual(['weak', 'strong']);
  });

  it('introduces never-seen items up to newCap', () => {
    const available = [item('n1'), item('n2'), item('n3'), item('n4')];
    const q = buildQueue({}, available, { today: TODAY, newCap: 2, shuffle: noShuffle });
    expect(q).toHaveLength(2);
  });

  it('caps a huge unseen bank so one course cannot flood the queue', () => {
    // ENT 221 alone carries 367 MCQs and 767 flashcards.
    const available = Array.from({ length: 1134 }, (_, i) => item(`n${i}`));
    const q = buildQueue({}, available, { today: TODAY, shuffle: noShuffle });
    expect(q).toHaveLength(10);
  });

  it('never exceeds the overall limit', () => {
    const available = Array.from({ length: 50 }, (_, i) => item(`d${i}`));
    const items = Object.fromEntries(
      available.map((it) => [it.id, { b: 1, d: TODAY - 1, n: 1, l: 0, t: 1 }])
    );
    const q = buildQueue(items, available, { today: TODAY, limit: 20, shuffle: noShuffle });
    expect(q).toHaveLength(20);
  });

  it('gives due items priority over new ones when the limit is tight', () => {
    const available = [item('due1'), item('due2'), item('due3'), item('new1')];
    const items = {
      due1: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      due2: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      due3: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
    };
    const q = buildQueue(items, available, { today: TODAY, limit: 3, newCap: 10, shuffle: noShuffle });
    expect(q.map((i) => i.id)).not.toContain('new1');
    expect(q).toHaveLength(3);
  });

  it('fills the remaining room with new items when due work is light', () => {
    const available = [item('due1'), item('new1'), item('new2')];
    const items = { due1: { b: 1, d: TODAY, n: 1, l: 0, t: 1 } };
    const q = buildQueue(items, available, { today: TODAY, limit: 20, newCap: 10, shuffle: noShuffle });
    expect(q.map((i) => i.id)).toEqual(['due1', 'new1', 'new2']);
  });

  it('withholds leeches — they go to the source material instead', () => {
    const available = [item('ok'), item('leech')];
    const items = {
      ok: { b: 1, d: TODAY, n: 3, l: 1, t: 1 },
      leech: { b: 1, d: TODAY, n: 30, l: LEECH_THRESHOLD, t: 1 },
    };
    const q = buildQueue(items, available, { today: TODAY, newCap: 0, shuffle: noShuffle });
    expect(q.map((i) => i.id)).toEqual(['ok']);
  });

  it('returns nothing for a non-positive limit', () => {
    const available = [item('a')];
    const items = { a: { b: 1, d: TODAY, n: 1, l: 0, t: 1 } };
    expect(buildQueue(items, available, { today: TODAY, limit: 0 })).toEqual([]);
  });

  it('passes item objects through untouched, so callers keep their own fields', () => {
    const available = [{ id: 'a', kind: 'q', courseSlug: 'uuy-cyb-222', question: 'Define QA.' }];
    const q = buildQueue({}, available, { today: TODAY, shuffle: noShuffle });
    expect(q[0]).toEqual(available[0]);
  });

  it('does not mutate the caller\'s available array', () => {
    const available = [item('b'), item('a')];
    const snapshot = available.map((i) => i.id);
    const items = {
      a: { b: 1, d: TODAY - 5, n: 1, l: 0, t: 1 },
      b: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
    };
    buildQueue(items, available, { today: TODAY, shuffle: noShuffle });
    expect(available.map((i) => i.id)).toEqual(snapshot);
  });

  it('tolerates an empty or missing state map', () => {
    const available = [item('a')];
    expect(buildQueue(undefined, available, { today: TODAY, shuffle: noShuffle })).toHaveLength(1);
  });
});

// ─── selectLeeches ────────────────────────────────────────────────────────────

describe('selectLeeches', () => {
  it('returns only the items past the lapse threshold', () => {
    const available = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const items = {
      a: { b: 1, d: 0, n: 30, l: LEECH_THRESHOLD, t: 1 },
      b: { b: 3, d: 0, n: 5, l: 2, t: 1 },
    };
    expect(selectLeeches(items, available).map((i) => i.id)).toEqual(['a']);
  });

  it('returns an empty array when there are none', () => {
    expect(selectLeeches({}, [{ id: 'a' }])).toEqual([]);
  });
});

// ─── dueCount ─────────────────────────────────────────────────────────────────

describe('dueCount', () => {
  const TODAY = 20_000;

  it('counts due items', () => {
    const available = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const items = {
      a: { b: 1, d: TODAY - 1, n: 1, l: 0, t: 1 },
      b: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      c: { b: 1, d: TODAY + 1, n: 1, l: 0, t: 1 },
    };
    expect(dueCount(items, available, TODAY)).toBe(2);
  });

  it('excludes leeches, so the badge agrees with the queue', () => {
    const available = [{ id: 'a' }, { id: 'leech' }];
    const items = {
      a: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      leech: { b: 1, d: TODAY, n: 30, l: LEECH_THRESHOLD, t: 1 },
    };
    expect(dueCount(items, available, TODAY)).toBe(1);
    expect(buildQueue(items, available, { today: TODAY, newCap: 0 })).toHaveLength(1);
  });

  it('does not count never-seen items', () => {
    expect(dueCount({}, [{ id: 'a' }, { id: 'b' }], TODAY)).toBe(0);
  });
});

// ─── applyReviews ─────────────────────────────────────────────────────────────

describe('applyReviews', () => {
  const TODAY = 20_000;
  const NOW = 1_700_000_000_000;

  it('records every outcome in one pass', () => {
    const next = applyReviews({}, [
      { id: 'a', correct: true },
      { id: 'b', correct: false },
    ], TODAY, NOW);
    expect(next.a.b).toBe(2);
    expect(next.b.b).toBe(1);
  });

  it('advances items that already have history', () => {
    const items = { a: { b: 2, d: TODAY, n: 4, l: 0, t: 1 } };
    const next = applyReviews(items, [{ id: 'a', correct: true }], TODAY, NOW);
    expect(next.a.b).toBe(3);
    expect(next.a.n).toBe(5);
  });

  it('does not mutate the item map it is given', () => {
    const items = { a: { b: 2, d: TODAY, n: 4, l: 0, t: 1 } };
    applyReviews(items, [{ id: 'a', correct: false }], TODAY, NOW);
    expect(items.a.b).toBe(2);
  });

  it('leaves untouched items alone', () => {
    const items = { a: { b: 2, d: TODAY, n: 4, l: 0, t: 1 } };
    const next = applyReviews(items, [{ id: 'b', correct: true }], TODAY, NOW);
    expect(next.a).toEqual(items.a);
  });

  it('stamps every item in a batch with the same review timestamp', () => {
    const next = applyReviews({}, [
      { id: 'a', correct: true },
      { id: 'b', correct: true },
    ], TODAY, NOW);
    expect(next.a.t).toBe(NOW);
    expect(next.b.t).toBe(NOW);
  });

  it('ignores outcomes with no id', () => {
    const next = applyReviews({}, [{ correct: true }, { id: '', correct: true }], TODAY, NOW);
    expect(Object.keys(next)).toEqual([]);
  });

  it('coerces a missing correct flag to a wrong answer', () => {
    const next = applyReviews({}, [{ id: 'a' }], TODAY, NOW);
    expect(next.a.b).toBe(1);
  });

  it('applies duplicate ids in a batch in order', () => {
    const next = applyReviews({}, [
      { id: 'a', correct: true },
      { id: 'a', correct: false },
    ], TODAY, NOW);
    expect(next.a.b).toBe(1);
    expect(next.a.n).toBe(2);
  });

  it('prunes long-abandoned well-learned items while writing', () => {
    const items = {
      stale: { b: MAX_BOX, d: TODAY - PRUNE_AFTER_DAYS - 1, n: 9, l: 0, t: 1 },
    };
    const next = applyReviews(items, [{ id: 'fresh', correct: true }], TODAY, NOW);
    expect(next).not.toHaveProperty('stale');
    expect(next).toHaveProperty('fresh');
  });

  it('returns an unchanged (pruned) map for an empty batch', () => {
    const items = { a: { b: 2, d: TODAY, n: 1, l: 0, t: 1 } };
    expect(applyReviews(items, [], TODAY, NOW)).toEqual(items);
  });

  it('handles a missing item map', () => {
    expect(applyReviews(undefined, [{ id: 'a', correct: true }], TODAY, NOW).a.b).toBe(2);
  });
});

// ─── dueCountFromState ────────────────────────────────────────────────────────
// The catalogue-free counter the dashboard uses.

describe('dueCountFromState', () => {
  const TODAY = 20_000;

  it('counts due items without needing a candidate pool', () => {
    const items = {
      a: { b: 1, d: TODAY - 1, n: 1, l: 0, t: 1 },
      b: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      c: { b: 1, d: TODAY + 1, n: 1, l: 0, t: 1 },
    };
    expect(dueCountFromState(items, TODAY)).toBe(2);
  });

  it('excludes leeches, matching what the queue would offer', () => {
    const items = {
      a: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      leech: { b: 1, d: TODAY, n: 30, l: LEECH_THRESHOLD, t: 1 },
    };
    expect(dueCountFromState(items, TODAY)).toBe(1);
  });

  it('agrees with dueCount when every stored item is still in the pool', () => {
    const available = [{ id: 'a' }, { id: 'b' }];
    const items = {
      a: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      b: { b: 2, d: TODAY - 3, n: 2, l: 0, t: 1 },
    };
    expect(dueCountFromState(items, TODAY)).toBe(dueCount(items, available, TODAY));
  });

  it('reads high when an item is no longer in the catalogue — the documented trade', () => {
    const available = [{ id: 'a' }];               // 'stale' left another department behind
    const items = {
      a: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      stale: { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
    };
    expect(dueCountFromState(items, TODAY)).toBe(2);
    expect(dueCount(items, available, TODAY)).toBe(1);
  });

  it('handles empty and missing state', () => {
    expect(dueCountFromState({}, TODAY)).toBe(0);
    expect(dueCountFromState(undefined, TODAY)).toBe(0);
  });

  it('filters by kind, so a surface counts only what it can actually offer', () => {
    const items = {
      'q:c:1': { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      'x:c:2': { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
      'f:c:3': { b: 1, d: TODAY, n: 1, l: 0, t: 1 },
    };
    expect(dueCountFromState(items, TODAY)).toBe(3);
    expect(dueCountFromState(items, TODAY, [ITEM_KINDS.quiz])).toBe(1);
    expect(dueCountFromState(items, TODAY, [ITEM_KINDS.quiz, ITEM_KINDS.exam])).toBe(2);
  });
});

// ─── kindOf / trackedCount ────────────────────────────────────────────────────

describe('kindOf', () => {
  it('reads the kind back out of an id without a catalogue', () => {
    expect(kindOf('q:uuy-cyb-222:1f4c9a2b')).toBe(ITEM_KINDS.quiz);
    expect(kindOf('x:uuy-cyb-222:1f4c9a2b')).toBe(ITEM_KINDS.exam);
    expect(kindOf('f:ent-221:abc')).toBe(ITEM_KINDS.card);
  });

  it('returns null for anything that is not an id', () => {
    expect(kindOf('')).toBeNull();
    expect(kindOf(undefined)).toBeNull();
    expect(kindOf('nocolon')).toBeNull();
  });

  it('agrees with the ids the per-kind helpers actually produce', () => {
    expect(kindOf(quizItemId('c', { question: 'q', options: ['a'] }))).toBe(ITEM_KINDS.quiz);
    expect(kindOf(examItemId('c', { question: 'q' }))).toBe(ITEM_KINDS.exam);
    expect(kindOf(cardItemId('c', { term: 't', def: 'd' }))).toBe(ITEM_KINDS.card);
  });
});

describe('trackedCount', () => {
  const items = { 'q:c:1': {}, 'q:c:2': {}, 'x:c:3': {}, 'f:c:4': {} };

  it('counts everything when no kinds are given', () => {
    expect(trackedCount(items)).toBe(4);
  });

  it('counts only the kinds asked for', () => {
    expect(trackedCount(items, [ITEM_KINDS.quiz])).toBe(2);
    expect(trackedCount(items, [ITEM_KINDS.exam, ITEM_KINDS.card])).toBe(2);
  });

  it('handles empty and missing state', () => {
    expect(trackedCount({}, [ITEM_KINDS.quiz])).toBe(0);
    expect(trackedCount(undefined)).toBe(0);
  });
});

// ─── pruneItems ───────────────────────────────────────────────────────────────

describe('pruneItems', () => {
  const TODAY = 20_000;

  it('drops top-box items untouched for longer than the prune window', () => {
    const items = {
      stale: { b: MAX_BOX, d: TODAY - PRUNE_AFTER_DAYS - 1, n: 9, l: 0, t: 1 },
    };
    expect(pruneItems(items, TODAY)).toEqual({});
  });

  it('keeps top-box items still inside the window', () => {
    const items = {
      recent: { b: MAX_BOX, d: TODAY - 1, n: 9, l: 0, t: 1 },
    };
    expect(Object.keys(pruneItems(items, TODAY))).toEqual(['recent']);
  });

  it('keeps long-overdue items that are not yet well learned', () => {
    const items = {
      weak: { b: 2, d: TODAY - PRUNE_AFTER_DAYS - 50, n: 4, l: 3, t: 1 },
    };
    expect(Object.keys(pruneItems(items, TODAY))).toEqual(['weak']);
  });

  it('does not mutate the input', () => {
    const items = { stale: { b: MAX_BOX, d: TODAY - PRUNE_AFTER_DAYS - 1, n: 9, l: 0, t: 1 } };
    pruneItems(items, TODAY);
    expect(Object.keys(items)).toEqual(['stale']);
  });

  it('handles an empty map', () => {
    expect(pruneItems({}, TODAY)).toEqual({});
  });
});
