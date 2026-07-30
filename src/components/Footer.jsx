import { Link } from 'react-router-dom';
import { trackMeta } from '../data/trackMeta';

export default function Footer() {
  const totalModules = Object.values(trackMeta).reduce((sum, t) => sum + t.moduleCount, 0);
  return (
    <footer className="border-t border-coffee-200 mt-20 bg-cream/50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/arete.svg" alt="Areté logo" className="w-8 h-8 rounded-md" />
              <span className="font-display text-lg font-bold text-ink">Areté</span>
            </div>
            <p className="text-sm text-coffee-700 leading-relaxed">
              Academic companion for University of Uyo students — courses, interactive programming tracks, and an AI tutor, all four years.
            </p>
            <p className="text-xs text-coffee-600 mt-3 italic font-display">ἀρετή · Greek for "excellence through practice"</p>
          </div>

          <div>
            <h4 className="font-display font-bold text-ink mb-3">What's inside</h4>
            <ul className="space-y-2 text-sm text-coffee-700">
              <li>All courses · 100L to 400L</li>
              <li>Java · Python · C interactive tracks</li>
              <li>{totalModules} modules · quizzes · playgrounds</li>
              <li>AI Tutor · Code Lab</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-ink mb-3">Built by</h4>
            <div className="space-y-3 text-sm text-coffee-700 leading-relaxed">
              <p>
                <span className="font-medium text-ink">Josebert</span><br/>
                Director of Software & Hardware
              </p>
              <p>
                <span className="font-medium text-ink">Barry</span><br/>
                Director of Academic
              </p>
              <p className="text-coffee-600">Cybersecurity Dept., UniUyo</p>
            </div>
          </div>
        </div>

        <div className="border-t border-coffee-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-coffee-700">
          <p>© {new Date().getFullYear()} Areté by JRsolvy. Built for learners, everywhere.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ink transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
