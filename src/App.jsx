import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Tracks from './pages/Tracks';
import TrackModules from './pages/TrackModules';
import TrackModuleDetail from './pages/TrackModuleDetail';
import Install from './pages/Install';
import AITutor from './pages/AITutor';
import CodeExplainer from './pages/CodeExplainer';
import Cheatsheet from './pages/Cheatsheet';

function JavaModuleRedirect() {
  const { id } = useParams();
  return <Navigate to={`/tracks/java/${id}`} replace />;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col paper-texture">
      <Navbar />
      <main className="flex-1 relative z-10">
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
      </main>
      <Footer />
    </div>
  );
}
