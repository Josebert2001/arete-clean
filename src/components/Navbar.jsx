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
    <nav className="border-b border-coffee-200 bg-paper/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Arete logo mark */}
          <div className="w-10 h-10 rounded-lg bg-ink flex items-center justify-center group-hover:bg-coffee-700 transition-colors">
            <span className="font-display font-bold text-coffee-300 text-[1.35rem] leading-none">a</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-ink text-xl tracking-tight">Arete</div>
            <div className="text-xs text-coffee-700 -mt-0.5 tracking-wider">Dept of Cybersecurity · UniUyo</div>
          </div>
        </Link>

        <button
          className="md:hidden text-ink p-3"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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
        <div className="md:hidden border-t border-coffee-200 bg-paper">
          <div className="px-6 py-3 flex flex-col gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
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
