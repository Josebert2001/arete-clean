import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap, Shield, X } from 'lucide-react';
import ProgressDashboard from '../components/ProgressDashboard';
import { LevelGatePrompt } from '../components/LevelGatePrompt';
import { useLevelGate } from '../components/useLevelGate';

// Only the two active levels
const levelCards = [
  {
    level: 100,
    icon: GraduationCap,
    color: 'bg-moss',
    text: 'text-cream',
    description: 'Mathematics, Physics, Computing foundations, Intro Security',
  },
  {
    level: 200,
    icon: Shield,
    color: 'bg-ink',
    text: 'text-cream',
    description: 'Programming, Cybersecurity, Networking, Ethical Hacking',
  },
];

// ─── Onboarding banner (first visit only) ─────────────────────────────────────

const ONBOARDING_KEY = 'arete-onboarding-dismissed-v1';

function OnboardingBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(ONBOARDING_KEY) === '1';
    } catch {
      return false;
    }
  });

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(ONBOARDING_KEY, '1');
    } catch { /* private mode — banner just reappears next visit */ }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6">
      <div className="bg-moss/10 border border-moss/30 rounded-xl px-4 py-3 flex items-center gap-3 text-sm animate-fade-up">
        <Sparkles size={16} className="text-moss shrink-0" />
        <p className="text-ink flex-1 leading-snug">
          <span className="font-bold">New here?</span> Pick your level below → choose a course → start learning.
          Your progress is saved automatically as you complete modules.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss welcome message"
          className="text-coffee-700 hover:text-ink p-1 shrink-0 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  // Picking a level here routes through the same soft sign-in prompt as the
  // Course Hub; signed-in students and confirmed guests go straight to the year.
  const { gateLevel, requestLevel, continueAsGuest, gateSignIn, closeGate } =
    useLevelGate((level) => navigate(`/courses?level=${level}`));

  return (
    <div>

      <OnboardingBanner />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">

        {/* Two-column hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — welcome text */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-6">
              <Sparkles size={12} />
              <span>Dept of Cybersecurity · University of Uyo · 100L – 400L</span>
            </div>

            <div className="flex flex-wrap items-end gap-2 sm:gap-4 mb-3">
              <h1 className="display-heading text-4xl sm:text-7xl lg:text-8xl text-ink tracking-tight">Arete</h1>
              <span className="font-display text-lg text-coffee-600 italic hidden sm:inline">ἀρετή</span>
            </div>

            <p className="display-heading text-2xl sm:text-3xl text-coffee-700 mb-3 leading-snug">
              Your academic companion.<br />
              <span className="underline-sketch text-ink">All four years.</span>
            </p>

            <p className="text-base text-coffee-700 max-w-xl leading-relaxed mb-6">
              Every course from 100L to 400L — topic outlines, textbooks, study tips, interactive programming tracks, and an AI tutor that knows the full curriculum.
            </p>

            <Link to="/courses" className="btn-ghost text-sm">
              Browse all courses <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — level picker */}
          <div className="animate-fade-up lg:pt-2" style={{ animationDelay: '100ms' }}>
            <p className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">
              Pick your level to get started
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levelCards.map(({ level, icon: Icon, color, text, description }) => (
                <button
                  key={level}
                  onClick={() => requestLevel(level)}
                  className={`${color} ${text} rounded-2xl p-5 text-left group transition-all duration-200 flex flex-col gap-3 hover:scale-[1.03] hover:shadow-xl ring-2 ring-transparent hover:ring-white/20`}
                >
                  <Icon size={22} className="opacity-80" />
                  <div>
                    <div className="font-display font-bold text-2xl leading-none mb-1">{level}L</div>
                    <div className="text-xs opacity-70 leading-relaxed">{description}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium mt-auto opacity-80 group-hover:opacity-100 transition-opacity">
                    Browse courses <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-coffee-500 mt-3 font-mono">
              300L and 400L interactive track modules are planned
            </p>
          </div>

        </div>

      </section>

      {/* ── MY PROGRESS (only shows once a track is started) ─────────── */}
      <ProgressDashboard />

      {/* ── WHAT'S INSIDE ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <h2 className="display-heading text-4xl sm:text-5xl text-ink shrink-0">What's inside</h2>
          <div className="h-px flex-1 bg-coffee-200" />
        </div>

        <div className="border-t border-coffee-200">
          {[
            { num: '01', title: 'All 4 Years', body: 'Every course from 100L to 400L — study resources, topic outlines, recommended textbooks, and search terms for free online materials.' },
            { num: '02', title: '37 Modules', body: 'Java (COS 211), Python (COS 121), and C — full interactive tracks with theory, annotated code, live playgrounds, quizzes, and mini projects.' },
            { num: '03', title: 'AI Tutor', body: 'Ask any question about any course in the programme. Knows the full curriculum from 100L to 400L and explains concepts at the right level for your year.' },
            { num: '04', title: 'Code Explainer', body: "Paste Java, Python, C, or C++ code and get a plain-English breakdown. Useful when a lecturer's example isn't clicking or you're debugging your own code." },
          ].map((f, i) => (
            <div key={i} className="py-7 border-b border-coffee-200 flex gap-5 group">
              <span className="font-mono text-xs text-coffee-400 tabular-nums pt-1.5 w-6 shrink-0">{f.num}</span>
              <div className="flex-1 sm:flex sm:items-baseline sm:gap-6 md:gap-12">
                <h3 className="display-heading text-2xl text-ink group-hover:text-coffee-600 transition-colors duration-200 mb-1 sm:mb-0 sm:w-48 shrink-0">{f.title}</h3>
                <p className="text-coffee-700 leading-relaxed text-sm sm:text-base">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
        <div className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden md:block" aria-hidden>
          <span className="display-heading leading-none text-coffee-100" style={{ fontSize: 'clamp(10rem, 22vw, 20rem)' }}>ἀ</span>
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="display-heading text-ink leading-none mb-1" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}>
            "Excellence is never
          </p>
          <p className="display-heading text-coffee-500 leading-none mb-1 italic" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)', paddingLeft: 'clamp(1.5rem, 4vw, 4rem)' }}>
            an accident.
          </p>
          <p className="display-heading text-ink leading-none mb-10" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}>
            It is the result<br />of practice."
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-display text-sm text-coffee-600 italic">— Adapted from Aristotle</span>
            <div className="h-px bg-coffee-200 flex-1 min-w-12 max-w-32" />
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink border-b border-ink/25 hover:text-coffee-700 hover:border-coffee-700 transition-all pb-0.5"
            >
              Open course hub <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {gateLevel !== null && (
        <LevelGatePrompt
          level={gateLevel}
          onSignIn={gateSignIn}
          onGuest={continueAsGuest}
          onClose={closeGate}
        />
      )}

    </div>
  );
}
