import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, ShieldCheck, LogIn } from 'lucide-react';
import ProgressDashboard from '../components/ProgressDashboard';
import StudentDashboard from '../components/StudentDashboard';
import { useAuth } from '../context/AuthContext';
import IndependentLearningHome from '../components/IndependentLearningHome';
import { trackMeta } from '../data/trackMeta';
import { SECURITY_SIGN_IN } from '../utils/learningEntry';

// The two doors. Each says who it is for in its own words, so nobody has to
// decode the other audience's vocabulary (levels, SIWES, capture-the-flag).
const doors = [
  {
    key: 'student',
    icon: GraduationCap,
    eyebrow: 'University of Uyo',
    title: "I'm a UniUyo student",
    body: 'Your courses, 100L to 400L, with what you need for the exam.',
    points: [
      'Outlines, textbooks and study tips for every course on Areté',
      'Lecture notes and practice questions for a growing set of courses',
      'Java, Python and C tracks for your programming courses',
    ],
    to: '/courses',
    cta: 'Find my courses',
    signIn: '/signin',
  },
  {
    key: 'independent',
    icon: ShieldCheck,
    eyebrow: 'Learning on my own',
    title: "I'm learning cybersecurity or coding",
    body: 'No university needed. Start in your browser, at your own pace.',
    points: [
      `${trackMeta.security.moduleCount} hands-on security rooms, each ending in a flag to capture`,
      'Guided Java, Python and C paths with code you run in the browser',
      'An AI tutor that gives hints, not just answers',
    ],
    to: '/cybersecurity',
    cta: 'Try a free exercise',
    signIn: SECURITY_SIGN_IN,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { user, profile, authEnabled, authLoading } = useAuth();

  // With auth configured, a visitor needs an account to study; without it
  // (local/keyless) the account links would lead to a disabled sign-in page.
  const signedOut = authEnabled && !user;

  // Signed-in students get their daily dashboard, not the marketing page.
  // Wait out the session restore so the landing page never flashes first.
  if (authLoading) return null;
  if (authEnabled && user) return profile?.learning_mode === 'independent'
    ? <IndependentLearningHome profile={profile} /> : <StudentDashboard />;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-20">

      {/* ── ONE QUESTION ──────────────────────────────────────────────
          Two audiences arrive here: University of Uyo students, and people
          learning cybersecurity or coding on their own. The page used to serve
          both at once — a security banner over a "100L – 400L" level grid and a
          six-item feature list — so a non-student had to work out which half
          was theirs. Now it asks, and everything else sits behind the answer.
          The prerendered HomePreview keeps the fuller text for search engines. */}
      <section className="animate-fade-up text-center">
        <div className="flex items-end justify-center gap-3 mb-4">
          <h1 className="display-heading text-5xl sm:text-7xl text-ink tracking-tight">Areté</h1>
          <span className="font-display text-lg text-coffee-600 italic hidden sm:inline mb-2">ἀρετή</span>
        </div>
        <p className="display-heading text-2xl sm:text-3xl text-coffee-700 leading-snug mb-2">
          Learn it properly, one step at a time.
        </p>
        <p className="text-base text-coffee-600">Free to start. Which describes you?</p>
      </section>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {doors.map(({ key, icon: Icon, eyebrow, title, body, points, to, cta, signIn }) => (
          <div key={key} className="flex flex-col rounded-2xl border border-coffee-200 bg-paper p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-coffee-600 mb-4">
              <Icon size={14} /> {eyebrow}
            </div>
            <h2 className="display-heading text-2xl sm:text-3xl text-ink mb-3">{title}</h2>
            <p className="text-coffee-700 leading-relaxed mb-4">{body}</p>
            <ul className="space-y-1.5 text-sm text-coffee-700 mb-8">
              {points.map(point => (
                <li key={point} className="flex gap-2">
                  <ArrowRight size={14} className="mt-0.5 shrink-0 text-ember-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link to={to} className="btn-primary text-sm inline-flex items-center gap-1.5">
                {cta} <ArrowRight size={14} />
              </Link>
              {signedOut && (
                <Link to={signIn} className="text-sm font-medium text-coffee-700 underline underline-offset-4 hover:text-ink">
                  Create a free account
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>

      {signedOut && (
        <p className="mt-8 text-center text-sm text-coffee-600">
          Already have an account?{' '}
          <Link to="/signin" className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-4">
            <LogIn size={13} /> Sign in
          </Link>
        </p>
      )}

      {/* Shows only once this browser has track progress (keyless/local use). */}
      <ProgressDashboard />

    </div>
  );
}
