import { lazy, Suspense } from 'react';
import { usePageTitle } from '../utils/usePageTitle';
import { MapPin, AlertTriangle } from 'lucide-react';

const CampusMap = lazy(() => import('../components/CampusMap'));

export default function CampusMapPage() {
  usePageTitle('Campus Map');

  return (
    <div className="h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-4.5rem)] flex flex-col min-h-0">
      <div className="px-4 sm:px-6 py-3 bg-cream border-b border-coffee-200 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-ink text-cream flex items-center justify-center">
            <MapPin size={18} />
          </div>
          <div>
            <h1 className="font-display font-bold text-ink text-lg leading-tight">Campus Map</h1>
            <p className="text-xs text-coffee-600">
              Find your way around University of Uyo
            </p>
          </div>
        </div>
      </div>

      {/* The old warning said the positions were invented placeholders around
          5.65N 7.93E. That is no longer true — the geometry is now real,
          generated from the OpenStreetMap survey of the campus. What is still
          missing is the *naming*: OSM outlines 34 buildings here and names one
          of them, so most pins read "Unnamed building N" until someone walks the
          campus. Overstating the problem is as bad as understating it, so this
          banner now says exactly which half is unfinished.

          Narrow this as campusOverrides.js fills up; delete it when the
          destinations are named and the inferred bridges are surveyed. */}
      <div className="px-4 sm:px-6 py-2 bg-rust/10 border-b border-rust/25 flex-shrink-0">
        <p className="max-w-6xl mx-auto flex items-start gap-2 text-xs text-rust">
          <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
          <span>
            <strong className="font-semibold">Being surveyed.</strong>{' '}
            Building outlines and paths come from OpenStreetMap and are real, but most
            buildings are not named yet and a few connecting paths are estimated — so
            check the map against what you can see before relying on it.
          </span>
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center animate-pulse">
            <p className="text-sm text-coffee-500">Loading campus map…</p>
          </div>
        }
      >
        <CampusMap />
      </Suspense>
    </div>
  );
}
