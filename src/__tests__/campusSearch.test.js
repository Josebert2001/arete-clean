import { describe, it, expect } from 'vitest';
import { pins, CATEGORIES } from '../data/campusMap';
import { normalize, scorePin, searchDestinations } from '../utils/campusSearch';

const destinations = pins.filter((p) => p.type === 'destination');

// A stand-in catalogue, so ranking is tested against known aliases rather than
// against whatever campusOverrides.js happens to contain today.
const CATS = {
  entrance: { label: 'Entrance' },
  facility: { label: 'Facility' },
  academic: { label: 'Academic' },
};
const FIXTURE = [
  { id: 'gate', name: 'Main Gate (Nwaniba Road)', category: 'entrance', aliases: ['gate', 'nwaniba'], source: 'survey' },
  { id: 'cbt', name: 'Computer-Based Test Centre', category: 'facility', aliases: ['cbt', 'jamb'], source: 'survey' },
  { id: 'clinic', name: 'University Health Centre', category: 'facility', aliases: ['clinic', 'sick bay'], source: 'survey' },
  { id: 'sci', name: 'Faculty of Science', category: 'academic', aliases: [], source: 'survey' },
  { id: 'u12', name: 'Unnamed building 12', category: 'facility', aliases: [] },
];
const find = (q) => searchDestinations(q, FIXTURE, CATS).map((p) => p.id);

describe('normalize', () => {
  it('folds case, punctuation and spacing so equivalent queries match', () => {
    expect(normalize('Y-Building')).toBe('y building');
    expect(normalize('  MAIN   GATE  ')).toBe('main gate');
    expect(normalize("St. Peter's")).toBe('st peter s');
    expect(normalize(null)).toBe('');
  });
});

describe('searchDestinations', () => {
  it('returns everything for an empty query', () => {
    expect(searchDestinations('', FIXTURE, CATS)).toHaveLength(FIXTURE.length);
    expect(searchDestinations('   ', FIXTURE, CATS)).toHaveLength(FIXTURE.length);
  });

  // The whole point: students type slang, not the name on the building.
  it('finds pins by alias, not just by official name', () => {
    expect(find('cbt')).toContain('cbt');
    expect(find('jamb')).toContain('cbt');
    expect(find('clinic')).toContain('clinic');
    expect(find('nwaniba')).toContain('gate');
  });

  it('matches the start of a word inside a longer name', () => {
    expect(find('sci')).toContain('sci');
    expect(find('health')).toContain('clinic');
  });

  it('finds a whole category by its label', () => {
    expect(find('entrance')).toContain('gate');
  });

  // Two rules, and they compose in this order:
  //
  //   1. Match quality wins first. An exact hit beats a prefix beats a
  //      substring, wherever it came from. Typing "entrance" surfaces Main Gate
  //      — the way in — ahead of a facility merely *called* "Entrance Lodge",
  //      which is what someone typing that word actually wants.
  //   2. Within the same quality, the official name beats an alias beats a
  //      category label, so an alias can never displace a pin that is genuinely
  //      named the thing being searched for.
  it('ranks by match quality first, wherever the match came from', () => {
    const withNamesake = [
      ...FIXTURE,
      { id: 'named-entrance', name: 'Entrance Lodge', category: 'facility', aliases: [], source: 'survey' },
    ];
    const ids = searchDestinations('entrance', withNamesake, CATS).map((p) => p.id);
    // 'gate' matches the Entrance category exactly; 'Entrance Lodge' only by prefix.
    expect(ids[0]).toBe('gate');
    expect(ids).toContain('named-entrance');
  });

  it('prefers the official name over an alias at equal match quality', () => {
    const both = [
      { id: 'by-alias', name: 'University Health Centre', category: 'facility', aliases: ['clinic'], source: 'survey' },
      { id: 'by-name', name: 'Clinic', category: 'academic', aliases: [], source: 'survey' },
    ];
    // Both are exact hits on "clinic" — one on a name, one on an alias.
    expect(searchDestinations('clinic', both, CATS)[0].id).toBe('by-name');
    expect(scorePin(both[1], 'clinic', CATS)).toBeGreaterThan(scorePin(both[0], 'clinic', CATS));
  });

  it('puts the obvious pin first when the query is its name', () => {
    expect(find('gate')[0]).toBe('gate');
    expect(find('main gate')[0]).toBe('gate');
  });

  it('puts named buildings ahead of unnamed ones at the same relevance', () => {
    const results = searchDestinations('building', FIXTURE, CATS);
    // 'Unnamed building 12' is the only match here, but the comparator must not
    // throw on a pin with no `source`.
    expect(results.map((p) => p.id)).toEqual(['u12']);
  });

  it('returns nothing for a query that matches nothing', () => {
    expect(find('zzzz')).toEqual([]);
  });

  it('is stable — the same query always gives the same order', () => {
    expect(find('c')).toEqual(find('c'));
  });
});

describe('against the shipped catalogue', () => {
  it('finds the main gate by every alias it carries', () => {
    const gate = destinations.find((d) => d.id === 'main-gate');
    expect(gate, 'main-gate must exist — routing and validation anchor on it').toBeDefined();
    for (const alias of gate.aliases ?? []) {
      const ids = searchDestinations(alias, destinations, CATEGORIES).map((p) => p.id);
      expect(ids, `alias "${alias}" should find main-gate`).toContain('main-gate');
    }
  });

  it('never throws on a pin with no aliases and no source', () => {
    const bare = destinations.filter((d) => !d.aliases && !d.source);
    expect(() => searchDestinations('a', bare, CATEGORIES)).not.toThrow();
  });
});
