import { describe, it, expect } from 'vitest';
import { cyb224Map } from '../data/lectureNotes/cyb224Map.js';
import { courses } from '../data/courses';

// The note map is pure cross-reference data: every entry points at another
// note by number. Nothing in the app fails loudly when one of those numbers is
// wrong — a broken link just renders a button that scrolls nowhere, which is
// exactly the confusion the map exists to remove. These tests are the thing
// that fails instead.

const course = courses.find((c) => c.code === 'CYB 224');
const NOTE_NUMBERS = course.lectureNotes.map((n) => String(n.number));

const RELATIONS = ['buildsOn', 'continuesIn', 'alsoSee'];
const linksOf = (entry) => RELATIONS.flatMap((r) => (entry?.[r] || []).map((l) => ({ ...l, r })));

// Is `a` connected to `b` by any relation at all, in that direction?
const connected = (a, b) =>
  linksOf(cyb224Map.topics[String(a)]).some((l) => String(l.n) === String(b));

describe('CYB 224 note map', () => {
  it('is attached to the course', () => {
    expect(course.noteMap).toBe(cyb224Map);
  });

  it('maps every lecture note, and no note that does not exist', () => {
    expect(Object.keys(cyb224Map.topics).sort()).toEqual([...NOTE_NUMBERS].sort());
  });

  it('places every note in exactly one part', () => {
    const placed = cyb224Map.parts.flatMap((p) => p.topics.map(String));
    expect(placed.sort()).toEqual([...NOTE_NUMBERS].sort());
    expect(new Set(placed).size).toBe(placed.length);
  });

  it('agrees with itself about which part each note is in', () => {
    const partById = new Map();
    cyb224Map.parts.forEach((p) => p.topics.forEach((n) => partById.set(String(n), p.id)));
    Object.entries(cyb224Map.topics).forEach(([n, entry]) => {
      if (entry.part) expect(entry.part, `note ${n}`).toBe(partById.get(n));
    });
  });

  it('never links to a note that does not exist, or to itself', () => {
    Object.entries(cyb224Map.topics).forEach(([n, entry]) => {
      linksOf(entry).forEach((l) => {
        expect(NOTE_NUMBERS, `note ${n}.${l.r}`).toContain(String(l.n));
        expect(String(l.n), `note ${n}.${l.r} links to itself`).not.toBe(n);
      });
    });
  });

  it('gives a reason for every link', () => {
    // The reason is the whole value — "Topic 14" alone tells a student nothing
    // about why they are being sent there.
    Object.entries(cyb224Map.topics).forEach(([n, entry]) => {
      linksOf(entry).forEach((l) => {
        expect(l.why, `note ${n}.${l.r} -> ${l.n}`).toBeTruthy();
      });
    });
  });

  it('does not list the same target twice within one relation', () => {
    Object.entries(cyb224Map.topics).forEach(([n, entry]) => {
      RELATIONS.forEach((r) => {
        const targets = (entry[r] || []).map((l) => String(l.n));
        expect(new Set(targets).size, `note ${n}.${r} has a duplicate`).toBe(targets.length);
      });
    });
  });

  it('reciprocates every forward link, so a student can navigate either way', () => {
    // A "continues in" or "same idea in" that the target does not acknowledge
    // is only half a link: arriving at note 18 you would never learn that note
    // 14 explains the metrics it prints. `buildsOn` is exempt — a hub topic
    // does not need to list all four topics that depend on it.
    Object.entries(cyb224Map.topics).forEach(([n, entry]) => {
      ['continuesIn', 'alsoSee'].forEach((r) => {
        (entry[r] || []).forEach((l) => {
          expect(connected(l.n, n), `note ${n} -> ${l.n} (${r}) is one-way`).toBe(true);
        });
      });
    });
  });

  it('leaves no note isolated, and keeps the whole course reachable', () => {
    const adj = Object.fromEntries(NOTE_NUMBERS.map((n) => [n, new Set()]));
    Object.entries(cyb224Map.topics).forEach(([n, entry]) => {
      linksOf(entry).forEach((l) => { adj[n].add(String(l.n)); adj[String(l.n)].add(n); });
    });
    NOTE_NUMBERS.forEach((n) => expect(adj[n].size, `note ${n} has no links`).toBeGreaterThan(0));

    const seen = new Set([NOTE_NUMBERS[0]]);
    const queue = [NOTE_NUMBERS[0]];
    while (queue.length) {
      adj[queue.shift()].forEach((x) => { if (!seen.has(x)) { seen.add(x); queue.push(x); } });
    }
    expect([...seen].sort()).toEqual([...NOTE_NUMBERS].sort());
  });

  it('only references real notes from strands and threads', () => {
    cyb224Map.strands.forEach((s) => {
      expect(s.steps.length, `strand ${s.name}`).toBeGreaterThan(0);
      s.steps.forEach((st) => expect(NOTE_NUMBERS, `strand ${s.name}`).toContain(String(st.n)));
    });
    cyb224Map.threads.forEach((t) => {
      // A thread is the claim "this idea is spread out"; one note is not spread.
      expect(t.notes.length, `thread ${t.name}`).toBeGreaterThan(1);
      t.notes.forEach((n) => expect(NOTE_NUMBERS, `thread ${t.name}`).toContain(String(n)));
    });
  });
});
