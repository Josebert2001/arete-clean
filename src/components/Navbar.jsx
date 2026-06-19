import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import AuthButton from './AuthButton';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Tracks, Install, Code Explainer, and Cheatsheet all live inside Code Lab,
  // so the Code Lab item stays highlighted while browsing any of them.
  const links = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/lab', label: 'Code Lab', also: ['/tracks', '/install', '/explainer', '/cheatsheet'] },
    { to: '/tutor', label: 'AI Tutor' },
  ];

  const isLinkActive = (link, isActive) =>
    isActive || (link.also || []).some(p => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <nav className="sticky top-0 z-50 border-b border-coffee-200 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/arete.svg"
            alt="Arete logo"
            className="h-10 w-10 rounded-lg transition-transform group-hover:scale-105"
          />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
              Arete
            </div>
            <div className="max-w-[12rem] truncate text-[11px] tracking-wide text-coffee-700 sm:max-w-none sm:text-xs sm:tracking-wider">
              Dept of Cybersecurity · UniUyo
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-1 md:hidden">
          <AuthButton />
          <button
            ref={toggleRef}
            className="rounded-lg p-2.5 text-ink transition-colors hover:bg-coffee-100"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className="hidden flex-wrap items-center justify-end gap-1 md:flex">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isLinkActive(l, isActive) ? 'bg-ink text-cream' : 'text-ink hover:bg-coffee-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <AuthButton />
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-coffee-200 bg-paper md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-medium ${
                    isLinkActive(l, isActive) ? 'bg-ink text-cream' : 'text-ink hover:bg-coffee-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
