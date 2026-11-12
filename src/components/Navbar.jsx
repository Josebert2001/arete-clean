import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import AuthButton from './AuthButton';
import InstallAppButton from './InstallAppButton';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { usePlan } from '../context/PlanContext';
import { useLecturer } from './useLecturer';
import { getDepartment } from '../data/departments';

// Signed-in students see their own department; a signed-out visitor (who
// hasn't picked one yet) gets neutral, university-wide copy instead of
// assuming Cybersecurity.
//
// Reads the lightweight department registry directly rather than useCatalogue:
// the Navbar renders on every route, and useCatalogue would dynamic-import the
// student's whole course catalogue app-wide, undoing the per-department code
// splitting. Only the department's NAME is needed here — no course data.
function useTagline() {
  const { user, profile } = useAuth();
  const { pathname } = useLocation();
  if (profile?.learning_mode === 'independent' || pathname === '/cybersecurity') return 'Cybersecurity · Coding · Learn at your pace';
  if (!user || !profile) return 'Cybersecurity · Coding · University learning';
  const department = getDepartment(profile.department);
  if (department.status === 'foundation') {
    const own = profile.department_other?.trim();
    return own ? `${own} · UniUyo` : 'Foundation Track · UniUyo';
  }
  return `Dept of ${department.name} · UniUyo`;
}

const linkClass = (active, extra = '') =>
  `rounded-md text-sm font-medium transition-colors ${extra} ${
    active ? 'bg-ink text-cream' : 'text-ink hover:bg-coffee-100'
  }`;

// Desktop overflow menu for the links a student needs occasionally (attendance,
// campus, staff tools). Keeping them out of the main row is what stops the bar
// wrapping onto two or three lines.
function MoreMenu({ links, isActive }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onDown); };
  }, [open]);

  const anyActive = links.some(isActive);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="more-nav"
        className={linkClass(anyActive, 'inline-flex items-center gap-1 px-3 py-2')}
      >
        More <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id="more-nav" className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-coffee-200 bg-paper p-1.5 shadow-xl">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={isActive(l) ? 'page' : undefined}
              onClick={() => setOpen(false)}
              className={linkClass(isActive(l), 'block px-3 py-2')}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  const tagline = useTagline();

  // Who is this? Drives which attendance links appear. `isLecturer` reads the
  // user_roles table (see useLecturer); it is only ever true for an account an
  // admin granted the role to. The links below are a convenience — the real
  // guard is the RLS on every table plus the "Lecturers only" page gates, so
  // hiding a link is never the only thing standing between a student and
  // lecturer data.
  const { user, profile } = useAuth();
  const independent = profile?.learning_mode === 'independent';
  const { isLecturer, role, repScope } = useLecturer();
  const plan = usePlan();

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

  // The everyday study links — always in view. Tracks, Install, Code Explainer,
  // and Cheatsheet all live inside Code Lab, so the Code Lab item stays
  // highlighted while browsing any of them. The Cybersecurity landing page is
  // the public front door for visitors; a signed-in student reaches the same
  // rooms through Code Lab, so it is not repeated for them.
  const primaryLinks = [
    { to: '/', label: 'Home' },
    ...(!user ? [{ to: '/cybersecurity', label: 'Cybersecurity' }] : []),
    { to: '/courses', label: 'Courses' },
    { to: '/lab', label: 'Code Lab', also: ['/tracks', '/install', '/explainer', '/cheatsheet'] },
    { to: '/tutor', label: 'AI Tutor' },
    ...(plan.status === 'ready' && plan.enabled === true && !plan.isPremium
      ? [{ to: '/premium', label: 'Premium' }] : []),
  ];

  // Occasional links, grouped under "More". Attendance links depend on role:
  //  - signed out        → none
  //  - lecturer / admin  → Take Attendance + Register (never the student links),
  //                        plus Admin for an admin
  //  - student           → Check In (the actual check-in form) + My Attendance,
  //                        plus Course Rep for a student appointed rep
  const roleLinks = !user
    ? []
    : isLecturer
      ? [
          { to: '/teach', label: 'Take Attendance' },
          { to: '/register', label: 'Register' },
          ...(role === 'admin' ? [{ to: '/admin', label: 'Admin' }] : []),
        ]
      : independent ? [] : [
          { to: '/attendance', label: 'Check In' },
          { to: '/my-attendance', label: 'My Attendance' },
          ...(repScope?.active !== false && repScope ? [{ to: '/rep', label: 'Course Rep' }] : []),
        ];
  const secondaryLinks = [
    ...roleLinks,
    ...(user ? [{ to: '/planner', label: 'Study Planner' }] : []),
    ...(!independent ? [{ to: '/campus-map', label: 'Campus Places' }] : []),
  ];

  const matches = (link) =>
    (link.to === '/' ? pathname === '/' : pathname === link.to || pathname.startsWith(`${link.to}/`))
    || (link.also || []).some(p => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <nav className="sticky top-0 z-50 border-b border-coffee-200 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <img
            src="/arete.svg"
            alt="Areté logo"
            className="h-9 w-9 shrink-0 rounded-lg transition-transform group-hover:scale-105"
          />
          <div className="min-w-0 leading-tight">
            <div className="font-display text-lg font-bold tracking-tight text-ink">
              Areté
            </div>
            <div className="max-w-[12rem] truncate text-[11px] tracking-wide text-coffee-700 xl:max-w-none">
              {tagline}
            </div>
          </div>
        </Link>

        {/* Compact bar below `lg`: the full row of links does not fit a tablet
            without wrapping, and a wrapped sticky bar covered a third of the
            screen at 784px. */}
        <div className="flex items-center gap-1 lg:hidden">
          {/* Renders nothing until the browser offers an install — see the
              component. Phones are where installing matters most, so it sits in
              the bar itself rather than inside the menu. */}
          <InstallAppButton />
          <ThemeToggle />
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

        <div className="hidden items-center gap-1 lg:flex">
          {/* A "More" menu holding one item is a click for nothing — a lone
              secondary link (a signed-out visitor's Campus Places) sits inline. */}
          {(secondaryLinks.length === 1 ? [...primaryLinks, ...secondaryLinks] : primaryLinks).map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={() => linkClass(matches(l), 'px-3.5 py-2')}
            >
              {l.label}
            </NavLink>
          ))}
          {secondaryLinks.length > 1 && <MoreMenu links={secondaryLinks} isActive={matches} />}
          <span className="mx-1 h-6 w-px bg-coffee-200" aria-hidden />
          <InstallAppButton />
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-coffee-200 bg-paper lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-3 sm:px-6">
            {primaryLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={() => linkClass(matches(l), 'px-3 py-2.5')}
              >
                {l.label}
              </NavLink>
            ))}
            {secondaryLinks.length > 0 && (
              <>
                <p className="mt-3 px-3 pb-1 text-[11px] font-mono uppercase tracking-widest text-coffee-500">More</p>
                {secondaryLinks.map(l => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={() => linkClass(matches(l), 'px-3 py-2.5')}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
