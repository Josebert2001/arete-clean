import { describe, it, expect, beforeEach } from 'vitest';
import {
  LEVELS, SHELF_PREVIEW, buildCatalogue, filterCatalogue, shelfItems, pickResume, trackSummary, stepsDone,
} from '../utils/labCatalogue';
import { trackMeta } from '../data/trackMeta';
import { recordLocation, readLastModulePath, readLastLocation } from '../utils/lastLocation';

const tracks = Object.values(trackMeta);
const security = trackMeta.security;
const ids = security.moduleIndex.map(m => m.id);

describe('buildCatalogue', () => {
  it('lists every module of every track from the lightweight index', () => {
    const items = buildCatalogue(tracks);
    expect(items).toHaveLength(tracks.reduce((sum, t) => sum + t.moduleCount, 0));
    expect(new Set(items.map(i => i.key)).size).toBe(items.length);
    for (const item of items) {
      expect(LEVELS).toContain(item.level);
      expect(item.hours).toBeGreaterThan(0);
      expect(item.steps).toBeGreaterThan(1);
      expect(item.status).toBe('new');
      expect(item.path).toBe(`/tracks/${item.trackSlug}/${item.id}`);
    }
  });

  it('marks completed and started modules from progress', () => {
    const items = buildCatalogue([security], { security: [ids[0]] }, [`${ids[1]}#learn-1`, `${ids[1]}#check`, 'other#learn-1']);
    expect(items[0]).toMatchObject({ status: 'done', stepsDone: items[0].steps });
    expect(items[1]).toMatchObject({ status: 'started', stepsDone: 2 });
    expect(items[2].status).toBe('new');
  });

  it('never reports more steps done than a module has, and ignores another module sharing a prefix', () => {
    expect(stepsDone('sec-intro', Array.from({ length: 40 }, (_, i) => `sec-intro#k${i}`), 7)).toBe(7);
    expect(stepsDone('sec', ['sec-intro#learn-1', 42, null], 7)).toBe(0);
  });
});

describe('filters and shelves', () => {
  const items = buildCatalogue(tracks);

  it('filters by path, by level, and by both', () => {
    expect(filterCatalogue(items, { track: 'c' }).every(i => i.trackSlug === 'c')).toBe(true);
    expect(filterCatalogue(items, { level: 'Advanced' }).every(i => i.level === 'Advanced')).toBe(true);
    const both = filterCatalogue(items, { track: 'java', level: 'Beginner' });
    expect(both.length).toBeGreaterThan(0);
    expect(both.every(i => i.trackSlug === 'java' && i.level === 'Beginner')).toBe(true);
    expect(filterCatalogue(items)).toHaveLength(items.length);
  });

  it('previews a shelf from the next unfinished module, and shows everything once filtered', () => {
    const fresh = buildCatalogue([security]);
    expect(shelfItems(fresh).map(i => i.number)).toEqual([1, 2, 3, 4]);

    const midway = buildCatalogue([security], { security: ids.slice(0, 5) });
    expect(shelfItems(midway).map(i => i.number)).toEqual([6, 7, 8, 9]);

    const nearEnd = buildCatalogue([security], { security: ids.slice(0, 11) });
    expect(shelfItems(nearEnd).map(i => i.number)).toEqual([9, 10, 11, 12]);

    const finished = buildCatalogue([security], { security: ids });
    expect(shelfItems(finished)).toHaveLength(SHELF_PREVIEW);

    expect(shelfItems(fresh, { track: 'security' })).toHaveLength(security.moduleCount);
    expect(shelfItems(fresh, { level: 'Beginner' })).toHaveLength(fresh.length);
  });

  it('summarises a path', () => {
    const summary = trackSummary(buildCatalogue([security], { security: ids.slice(0, 3) }));
    expect(summary).toMatchObject({ total: 12, done: 3 });
    expect(summary.hours).toBeGreaterThan(0);
  });
});

describe('pickResume', () => {
  it('offers nothing to a learner with no history', () => {
    expect(pickResume(buildCatalogue(tracks))).toBeNull();
  });

  it('prefers the module last open when it is in progress', () => {
    const items = buildCatalogue(tracks, {}, [`${ids[3]}#learn-1`, 'loops#learn-1']);
    expect(pickResume(items, `/tracks/security/${ids[3]}`)).toMatchObject({ reason: 'last', item: { id: ids[3] } });
  });

  it('falls back to any started module, then to a module merely opened', () => {
    const started = buildCatalogue(tracks, {}, ['loops#learn-1']);
    expect(pickResume(started, `/tracks/security/${ids[0]}`)).toMatchObject({ reason: 'started', item: { id: 'loops' } });
    expect(pickResume(buildCatalogue(tracks), `/tracks/security/${ids[2]}`)).toMatchObject({ reason: 'last', item: { id: ids[2] } });
  });

  it('never resumes a completed module; it moves to the next one in the busiest path', () => {
    const items = buildCatalogue(tracks, { security: ids.slice(0, 2), java: ['foundations'] });
    expect(pickResume(items, `/tracks/security/${ids[0]}`)).toMatchObject({ reason: 'next', item: { id: ids[2] } });
  });
});

describe('last module path', () => {
  beforeEach(() => localStorage.clear());

  it('survives the visit to Code Lab that overwrites the general last location', () => {
    recordLocation('/tracks/security/sec-hashing');
    recordLocation('/lab');
    expect(readLastLocation()).toBe('/lab');
    expect(readLastModulePath()).toBe('/tracks/security/sec-hashing');
  });

  it('ignores track lists and anything that is not a module page', () => {
    recordLocation('/tracks/security');
    expect(readLastModulePath()).toBeNull();
    localStorage.setItem('arete-last-module-v1', 'https://evil.example/');
    expect(readLastModulePath()).toBeNull();
  });
});
