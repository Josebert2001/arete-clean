import { lazy, Suspense } from 'react';
import { usePageTitle } from '../utils/usePageTitle';
import { MapPin } from 'lucide-react';

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
