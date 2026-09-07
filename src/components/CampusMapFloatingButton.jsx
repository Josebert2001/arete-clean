import { Link, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';

// Always-visible floating campus map launcher, bottom-left. Bigger than the
// other floating widgets on purpose — it should read unmistakably as the
// school map. Hidden on the tutor chat page (same as the other floating
// widgets) and on the map page itself.
export default function CampusMapFloatingButton() {
  const { pathname } = useLocation();
  if (pathname === '/campus-map') return null;

  return (
    <Link
      to="/campus-map"
      aria-label="Open school campus map"
      title="Campus Map"
      className="float-bob fixed bottom-4 left-4 z-50 print:hidden sm:bottom-6 sm:left-6 flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 text-cream shadow-[0_6px_24px_rgba(0,0,0,0.25)] ring-1 ring-cream/20 transition-all hover:scale-[1.03] hover:bg-coffee-700 sm:px-5 sm:py-3"
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ember-500 text-cream shadow-inner">
        <MapPin size={20} />
      </span>
      <span className="text-sm font-semibold tracking-tight sm:text-base">Campus Map</span>
    </Link>
  );
}