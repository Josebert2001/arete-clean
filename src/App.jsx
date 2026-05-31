import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import Install from './pages/Install';
import AITutor from './pages/AITutor';
import CodeExplainer from './pages/CodeExplainer';
import Cheatsheet from './pages/Cheatsheet';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col paper-texture">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:id" element={<ModuleDetail />} />
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
