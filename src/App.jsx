import { Component, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation, useNavigate, useParams as useRouteParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingHelp from './components/FloatingHelp';
import FeedbackTab from './components/FeedbackTab';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { StudyDaysProvider, useStudyDays } from './context/StudyDaysContext';
import { recordLocation, readLastLocation } from './utils/lastLocation';
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CodeLab = lazy(() => import('./pages/CodeLab'));
const TrackModules = lazy(() => import('./pages/TrackModules'));
const TrackModuleDetail = lazy(() => import('./pages/TrackModuleDetail'));
const Install = lazy(() => import('./pages/Install'));
const AITutor = lazy(() => import('./pages/AITutor'));
const CodeExplainer = lazy(() => import('./pages/CodeExplainer'));
const Cheatsheet = lazy(() => import('./pages/Cheatsheet'));
const Planner = lazy(() => import('./pages/Planner'));
const Review = lazy(() => import('./pages/Review'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SetupProfile = lazy(() => import('./pages/SetupProfile'));
const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));
const Welcome = lazy(() => import('./pages/Welcome'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Report the crash to Sentry (no-op when Sentry isn't configured) while still
  // showing the friendly fallback UI below.
  componentDidCatch(error, info) {
    Sentry.captureException(error, {
      contexts: { react: { componentStack: info?.componentStack } },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-lg font-semibold text-coffee-800 mb-2">Something went wrong.</p>
          <p className="text-sm text-coffee-600 mb-6">Try reloading the page. If the problem persists, contact support.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-semibold text-ember-500 hover:underline"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function JavaModuleRedirect() {
  const { id } = useRouteParams();
  return <Navigate to={`/tracks/java/${id}`} replace />;
}

// react-router keeps the scroll position across navigations; reset it so a
// click deep in a long list never opens the next page mid-scroll.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Records the current study page so a returning user can resume it next login,
// and marks today as a study day for the dashboard's streak counter.
function LastLocationTracker() {
  const { pathname } = useLocation();
  const { recordToday } = useStudyDays();
  useEffect(() => {
    recordLocation(pathname);
    recordToday(pathname);
  }, [pathname, recordToday]);
  return null;
}

const AUTH_PAGES = ['/signin', '/setup-profile', '/welcome'];

// After a fresh sign-in, sends returning users back to where they left off
// (instead of the landing page); also forces profile setup when incomplete.
function AuthStateWatcher() {
  const { user, profileComplete, authLoading, profileLoading } = useAuth();
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (authLoading || profileLoading) return;

    // One-shot resume after a real sign-in (flag set in AuthContext). Only act
    // when the user landed on the home/sign-in page so a spurious SIGNED_IN
    // while reading a page can never yank them away mid-study.
    let justSignedIn = false;
    try { justSignedIn = sessionStorage.getItem('arete-just-signed-in') === '1'; } catch { /* ignore */ }
    if (justSignedIn) {
      try { sessionStorage.removeItem('arete-just-signed-in'); } catch { /* ignore */ }
      if (user && profileComplete && (pathname === '/' || pathname === '/signin')) {
        const target = readLastLocation();
        if (target && target !== pathname) {
          navigate(target, { replace: true });
          return;
        }
      }
    }

    if (user && !profileComplete && !AUTH_PAGES.includes(pathname)) {
      navigate('/setup-profile', { replace: true });
    }
  }, [user, profileComplete, authLoading, profileLoading, pathname, navigate]);

  return null;
}

// Hard auth gate for study pages: every active learner must be a signed-in,
// known user. The landing page stays public as the marketing front door. When
// Supabase isn't configured (authEnabled false) the gate stands down — locking
// the app behind a sign-in that can't work would brick local/keyless deploys.
// LastLocationTracker records the attempted page before this redirect commits,
// so AuthStateWatcher returns the user to it right after they sign in.
function RequireAuth({ children }) {
  const { user, authLoading, authEnabled } = useAuth();
  if (authLoading) return <RouteLoading />;
  if (authEnabled && !user) return <Navigate to="/signin" replace />;
  return children;
}

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-3">404</p>
      <h1 className="display-heading text-4xl text-ink mb-3">Page not found</h1>
      <p className="text-coffee-700 mb-8">
        That page doesn't exist — it may have moved, or the link has a typo.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="btn-primary text-sm">Go home</Link>
        <Link to="/courses" className="btn-ghost text-sm">Browse courses</Link>
      </div>
    </div>
  );
}

function RouteLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 animate-pulse" role="status" aria-label="Loading page">
      <div className="h-4 w-48 bg-coffee-100 rounded mb-6" />
      <div className="h-12 w-2/3 max-w-md bg-coffee-100 rounded mb-4" />
      <div className="h-4 w-full max-w-xl bg-coffee-100 rounded mb-2" />
      <div className="h-4 w-3/4 max-w-lg bg-coffee-100 rounded mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-40 bg-coffee-100 rounded-xl" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  // The tutor chat owns the full viewport below the navbar — the footer and
  // floating help chip would sit under (or overlap) its pinned composer.
  const { pathname } = useLocation();
  const isChatPage = pathname === '/tutor';

  return (
    <ThemeProvider>
    <AuthProvider>
    <StudyDaysProvider>
    <div className="min-h-screen flex flex-col paper-texture">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <LastLocationTracker />
      <AuthStateWatcher />
      <Navbar />
      <main id="main" className="flex-1 relative z-10">
        <ErrorBoundary>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<RequireAuth><Courses /></RequireAuth>} />
            <Route path="/courses/:slug" element={<RequireAuth><CourseDetail /></RequireAuth>} />
            <Route path="/lab" element={<RequireAuth><CodeLab /></RequireAuth>} />
            <Route path="/tracks" element={<Navigate to="/lab" replace />} />
            <Route path="/tracks/:lang" element={<RequireAuth><TrackModules /></RequireAuth>} />
            <Route path="/tracks/:lang/:id" element={<RequireAuth><TrackModuleDetail /></RequireAuth>} />
            <Route path="/modules" element={<Navigate to="/tracks/java" replace />} />
            <Route path="/modules/:id" element={<JavaModuleRedirect />} />
            <Route path="/install" element={<Install />} />
            <Route path="/tutor" element={<RequireAuth><AITutor /></RequireAuth>} />
            <Route path="/explainer" element={<RequireAuth><CodeExplainer /></RequireAuth>} />
            <Route path="/cheatsheet" element={<RequireAuth><Cheatsheet /></RequireAuth>} />
            <Route path="/planner" element={<RequireAuth><Planner /></RequireAuth>} />
            <Route path="/review" element={<RequireAuth><Review /></RequireAuth>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/setup-profile" element={<SetupProfile />} />
            <Route path="/profile" element={<RequireAuth><ProfileSettings /></RequireAuth>} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      {!isChatPage && <Footer />}
      {!isChatPage && <FloatingHelp />}
      {!isChatPage && <FeedbackTab />}
      <PWAUpdatePrompt />
    </div>
    </StudyDaysProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}
