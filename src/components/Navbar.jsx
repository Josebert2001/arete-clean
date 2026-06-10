import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tracks', label: 'Tracks' },
    { to: '/courses', label: 'Courses' },
    { to: '/install', label: 'Install' },
    { to: '/tutor', label: 'AI Tutor' },
    { to: '/explainer', label: 'Code Explainer' },
    { to: '/cheatsheet', label: 'Cheatsheet' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-coffee-200 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink transition-colors group-hover:bg-coffee-700">
            <span className="font-display text-[1.35rem] font-bold leading-none text-coffee-300">a</span>
          </div>
          <div className="min-w-0 leading-tight">
            <div className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
              Arete
            </div>
            <div className="max-w-[12rem] truncate text-[11px] tracking-wide text-coffee-700 sm:max-w-none sm:text-xs sm:tracking-wider">
              Dept of Cybersecurity Â· UniUyo
            </div>
          </div>
        </Link>

        <button
          className="rounded-lg p-2.5 text-ink transition-colors hover:bg-coffee-100 md:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="hidden flex-wrap items-center justify-end gap-1 md:flex">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink text-cream' : 'text-ink hover:bg-coffee-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
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
                    isActive ? 'bg-ink text-cream' : 'text-ink hover:bg-coffee-100'
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
