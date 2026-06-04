export default function Footer() {
  return (
    <footer className="border-t border-coffee-200 mt-20 bg-cream/50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-ink flex items-center justify-center">
                <span className="font-display font-bold text-coffee-300 text-[1.1rem] leading-none">a</span>
              </div>
              <span className="font-display text-lg font-bold text-ink">Arete</span>
            </div>
            <p className="text-sm text-coffee-700 leading-relaxed">
              Code your excellence. An interactive learning platform built for students who want to learn properly — from foundations up.
            </p>
            <p className="text-xs text-coffee-600 mt-3 italic font-display">ἀρετή · Greek for "excellence through practice"</p>
          </div>

          <div>
            <h4 className="font-display font-bold text-ink mb-3">Three tracks</h4>
            <ul className="space-y-2 text-sm text-coffee-700">
              <li>Java · Python · C</li>
              <li>37 interactive modules</li>
              <li>Practice quizzes &amp; mini projects</li>
              <li>Runnable in-browser playgrounds</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-ink mb-3">Built by</h4>
            <p className="text-sm text-coffee-700 leading-relaxed">
              The <span className="font-medium text-ink">Department of Cybersecurity</span><br/>
              University of Uyo
            </p>
          </div>
        </div>

        <div className="border-t border-coffee-200 pt-6 text-xs text-coffee-700">
          <p>© {new Date().getFullYear()} Arete by JRsolvy. Built for learners, everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
