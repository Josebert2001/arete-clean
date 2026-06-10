import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// items: [{ label, to }] — the last item is the current page (no `to` needed).
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-coffee-700">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2 min-w-0">
              {isLast || !item.to ? (
                <span className="text-ink font-medium truncate" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-ink transition-colors truncate">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight size={12} className="text-coffee-400 shrink-0" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
