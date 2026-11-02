import { useMemo, useState } from 'react';
import { usePageTitle } from '../utils/usePageTitle';
import { MapPin, Search, Navigation, ExternalLink } from 'lucide-react';
import { places, PLACE_CATEGORIES } from '../data/campusPlaces';
import { placeLink, filterPlaces } from '../utils/placeLinks';

// Campus Places — a searchable list of University of Uyo locations, each handing
// off to Google Maps for the actual map, GPS and walking directions. Replaced an
// in-app Leaflet map whose positions were placeholders (see campus-map-prototype.md).
export default function CampusMapPage() {
  usePageTitle('Campus Places');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const visible = useMemo(() => filterPlaces(places, query, category), [query, category]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <header className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-ink text-cream flex items-center justify-center flex-shrink-0">
          <MapPin size={20} />
        </div>
        <div>
          <h1 className="font-display font-bold text-ink text-2xl leading-tight">Campus Places</h1>
          <p className="text-sm text-coffee-600 mt-1">
            Find your way around University of Uyo. Tap a place to open it in Google Maps,
            which gives you walking directions from wherever you are.
          </p>
        </div>
      </header>

      <div className="flex items-center gap-2 px-3 py-2.5 mb-3 border border-coffee-300 rounded-lg bg-cream focus-within:border-coffee-500">
        <Search size={16} className="text-coffee-400 flex-shrink-0" />
        <input
          type="search"
          value={query}
          maxLength={80}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places…"
          aria-label="Search campus places"
          className="w-full bg-transparent text-sm text-ink placeholder:text-coffee-400 outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter by category">
        {[['all', 'All'], ...Object.entries(PLACE_CATEGORIES).map(([k, v]) => [k, v.label])].map(
          ([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              aria-pressed={category === key}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                category === key
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-cream text-coffee-600 border-coffee-300 hover:bg-paper'
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-coffee-500 italic">No places match “{query}”.</p>
      ) : (
        <ul className="space-y-2">
          {visible.map((place) => {
            const cat = PLACE_CATEGORIES[place.category] || PLACE_CATEGORIES.building;
            const link = placeLink(place);
            const isDirections = link.kind === 'directions';
            return (
              <li key={place.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-cream border border-coffee-200 rounded-xl hover:border-coffee-400 hover:bg-paper transition-colors"
                >
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cat.color}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-ink truncate">{place.name}</span>
                    <span className="block text-[11px] uppercase tracking-wide text-coffee-400">
                      {cat.label}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-ember flex-shrink-0">
                    {isDirections ? <Navigation size={14} /> : <ExternalLink size={14} />}
                    {isDirections ? 'Directions' : 'Find on map'}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-6 text-xs text-coffee-500 leading-relaxed">
        Opens Google Maps in a new tab. Places marked <strong>Find on map</strong> don’t have an
        exact position recorded yet, so Google searches for them by name — if it lands on the
        wrong spot, ask at the gate.
      </p>
    </div>
  );
}
