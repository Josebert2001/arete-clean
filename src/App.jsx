import { Component, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useParams as useRouteParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingHelp from './components/FloatingHelp';
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Tracks = lazy(() => import('./pages/Tracks'));
const TrackModules = lazy(() => import('./pages/TrackModules'));
const TrackModuleDetail = lazy(() => import('./pages/TrackModuleDetail'));
const Install = lazy(() => import('./pages/Install'));
const AITutor = lazy(() => import('./pages/AITutor'));
const CodeExplainer = lazy(() => import('./pages/CodeExplainer'));
const Cheatsheet = lazy(() => import('./pages/Cheatsheet'));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
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

function RouteLoading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="text-sm font-mono uppercase tracking-wider text-coffee-700">Loading section...</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col paper-texture">
      <Navbar />
      <main className="flex-1 relative z-10">
        <ErrorBoundary>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/tracks/:lang" element={<TrackModules />} />
            <Route path="/tracks/:lang/:id" element={<TrackModuleDetail />} />
            <Route path="/modules" element={<Navigate to="/tracks/java" replace />} />
            <Route path="/modules/:id" element={<JavaModuleRedirect />} />
            <Route path="/install" element={<Install />} />
            <Route path="/tutor" element={<AITutor />} />
            <Route path="/explainer" element={<CodeExplainer />} />
            <Route path="/cheatsheet" element={<Cheatsheet />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingHelp />
    </div>
  );
}
