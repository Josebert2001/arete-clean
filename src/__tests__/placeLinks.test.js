import { describe, it, expect } from 'vitest';
import { placeCoords, placeLink, filterPlaces } from '../utils/placeLinks';
import { places, PLACE_CATEGORIES } from '../data/campusPlaces';

describe('placeCoords', () => {
  it('accepts a position inside Uyo', () => {
    expect(placeCoords({ lat: 5.04, lng: 7.97 })).toEqual({ lat: 5.04, lng: 7.97 });
  });

  it('rejects the old prototype placeholders, ~68 km north of Uyo', () => {
    expect(placeCoords({ lat: 5.65, lng: 7.93 })).toBeNull();
  });

  it('rejects missing or malformed coordinates', () => {
    expect(placeCoords({ lat: null, lng: null })).toBeNull();
    expect(placeCoords({ lat: '', lng: 7.97 })).toBeNull();
    expect(placeCoords({ lat: 'abc', lng: 7.97 })).toBeNull();
    expect(placeCoords(undefined)).toBeNull();
  });
});

describe('placeLink', () => {
  it('gives walking directions when the place has trusted coordinates', () => {
    const { kind, href } = placeLink({ name: 'Library', lat: 5.04, lng: 7.97 });
    expect(kind).toBe('directions');
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/dir/');
    expect(url.searchParams.get('api')).toBe('1');
    expect(url.searchParams.get('destination')).toBe('5.04,7.97');
    expect(url.searchParams.get('travelmode')).toBe('walking');
  });

  it('falls back to a name search scoped to the university', () => {
    const { kind, href } = placeLink({ name: "Vice Chancellor's Office & Co", lat: null, lng: null });
    expect(kind).toBe('search');
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/search/');
    expect(url.searchParams.get('query')).toBe("Vice Chancellor's Office & Co, University of Uyo, Uyo");
  });

  it('never builds directions to an out-of-town position', () => {
    expect(placeLink({ name: 'X', lat: 5.65, lng: 7.93 }).kind).toBe('search');
  });
});

describe('filterPlaces', () => {
  const list = [
    { id: 'a', name: 'University Library', category: 'building' },
    { id: 'b', name: 'Cafeteria', category: 'facility' },
  ];

  it('matches names case-insensitively', () => {
    expect(filterPlaces(list, '  LIBR ').map((p) => p.id)).toEqual(['a']);
  });

  it('filters by category', () => {
    expect(filterPlaces(list, '', 'facility').map((p) => p.id)).toEqual(['b']);
  });

  it('returns everything for an empty query and "all"', () => {
    expect(filterPlaces(list, '')).toHaveLength(2);
  });
});

describe('campusPlaces data', () => {
  it('has unique ids and known categories', () => {
    const ids = places.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    places.forEach((p) => expect(PLACE_CATEGORIES[p.category]).toBeDefined());
  });

  it('only records coordinates that land in Uyo', () => {
    places
      .filter((p) => p.lat != null || p.lng != null)
      .forEach((p) => expect(placeCoords(p), p.id).not.toBeNull());
  });
});
