import { Component, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation, useNavigate, useParams as useRouteParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingHelp from './components/FloatingHelp';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
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
const SignIn = lazy(() => import('./pages/SignIn'));
const SetupProfile = lazy(() => import('./pages/SetupProfile'));
const Welcome = lazy(() => import('./pages/Welcome'));

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
            className="text-sm font-semibold text-ember-600 hover:underline"
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

// Records the current study page so a returning user can resume it next login.
function LastLocationTracker() {
  const { pathname } = useLocation();
  useEffect(() => { recordLocation(pathname); }, [pathname]);
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
  return (
    <ThemeProvider>
    <AuthProvider>
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
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/lab" element={<CodeLab />} />
            <Route path="/tracks" element={<Navigate to="/lab" replace />} />
            <Route path="/tracks/:lang" element={<TrackModules />} />
            <Route path="/tracks/:lang/:id" element={<TrackModuleDetail />} />
            <Route path="/modules" element={<Navigate to="/tracks/java" replace />} />
            <Route path="/modules/:id" element={<JavaModuleRedirect />} />
            <Route path="/install" element={<Install />} />
            <Route path="/tutor" element={<AITutor />} />
            <Route path="/explainer" element={<CodeExplainer />} />
            <Route path="/cheatsheet" element={<Cheatsheet />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/setup-profile" element={<SetupProfile />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingHelp />
    </div>
    </AuthProvider>
    </ThemeProvider>
  );
}
