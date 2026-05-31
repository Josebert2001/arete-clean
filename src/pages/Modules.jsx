import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { modules } from '../data/modules';
import { useProgress } from '../components/useProgress';

export default function Modules() {
  const { isComplete, progress } = useProgress();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">Full Curriculum</div>
        <h1 className="display-heading text-5xl text-ink mb-4">All 13 Modules</h1>
        <p className="text-lg text-coffee-700 max-w-2xl">
          Work through them in order, or jump to what you need. Each module has theory, code examples,
          a practice quiz, and a mini project.
        </p>
      </div>

      <div className="space-y-3">
        {modules.map(m => (
          <Link
            key={m.id}
            to={`/modules/${m.id}`}
            className="block bg-paper border border-coffee-200 rounded-xl p-5 sm:p-6 hover:border-coffee-500 hover:shadow-md transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Number circle */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-display text-xl font-bold flex-shrink-0 ${
                isComplete(m.id)
                  ? 'bg-moss text-cream'
                  : 'bg-ink text-cream'
              }`}>
                {isComplete(m.id) ? <CheckCircle2 size={22} /> : String(m.number).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h2 className="font-display text-xl font-bold text-ink group-hover:text-coffee-700 transition-colors">
                    {m.title}
                  </h2>
                  <span className="text-xs font-mono text-coffee-700">
                    {'●'.repeat(m.difficulty)}{'○'.repeat(5 - m.difficulty)}
                  </span>
                </div>
                <p className="text-sm text-coffee-700 mb-2">{m.subtitle}</p>
                <div className="flex items-center gap-4 text-xs text-coffee-700">
                  <span className="flex items-center gap-1"><Clock size={12} /> ~{m.estimatedHours}h</span>
                  <span>{m.practiceQuestions.length} questions</span>
                  <span>{m.codeExamples.length} examples</span>
                  {progress.quizScores[m.id] && (
                    <span className="text-moss">
                      Quiz: {progress.quizScores[m.id].score}/{progress.quizScores[m.id].total}
                    </span>
                  )}
                </div>
              </div>

              <ArrowRight size={18} className="text-coffee-700 group-hover:text-ink group-hover:translate-x-1 transition-all hidden sm:block" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-cream border border-coffee-200 rounded-xl">
        <h3 className="font-display font-bold text-ink mb-2">Final Project</h3>
        <p className="text-sm text-coffee-700">
          After completing all 13 modules, build a complete Java desktop app combining OOP, file/database storage, GUI, and exception handling.
          Ideas: Student Management System, Library Tracker, ATM Simulation, Expense Tracker.
        </p>
      </div>
    </div>
  );
}
