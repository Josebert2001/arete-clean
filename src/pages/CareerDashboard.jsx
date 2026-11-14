import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCareer } from '../components/useCareer';
import {
  ENTRY_PATHS,
  PLACEMENT_VERSION,
  getCareerPath,
  foundationTopics,
  careerResources,
} from '../data/careers';
import { careerRequest } from '../utils/careerApi';
import { usePageTitle } from '../utils/usePageTitle';
import { CAREER_SIGN_IN } from '../utils/learningEntry';

function Roadmap() {
  const { user } = useAuth();
  const { status, profile, assessmentEnabled, error, refresh } = useCareer();
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState('');
  if (status === 'loading')
    return (
      <p role="status" className="text-coffee-600">
        Loading your career roadmap…
      </p>
    );
  if (status === 'error')
    return (
      <div className="rounded-xl border border-coffee-200 p-6">
        <p role="alert" className="text-coffee-700 mb-4">
          {error}
        </p>
        <button onClick={refresh} className="btn-ghost">
          Try again
        </button>
        <Link to="/careers" className="inline-block ml-4 underline text-sm">
          Explore directions and starter tasks
        </Link>
      </div>
    );
  if (!profile)
    return (
      <section className="bg-paper border border-coffee-200 rounded-2xl p-8">
        <h2 className="font-display text-2xl text-ink mb-3">Choose a starting direction</h2>
        <p className="text-coffee-700 mb-6">
          The discovery quiz compares your interests and practical judgment across blue team, red
          team, GRC, and application security.
        </p>
        <Link to="/career-quiz" className="btn-primary">
          Take the career quiz <ArrowRight size={15} />
        </Link>
      </section>
    );
  const result = profile.result;
  const chosen = getCareerPath(profile.chosen_path);
  const recommended = getCareerPath(result.recommendedPath);
  async function choose(path) {
    setBusy(true);
    setSaveError('');
    try {
      await careerRequest('choose', { path, attemptId: profile.attempt_id }, user.id);
      refresh();
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      {result.version !== PLACEMENT_VERSION && (
        <p className="text-sm text-coffee-700 mb-5">
          This saved result uses earlier guidance rules. It has not been rescored.{' '}
          <Link to="/career-quiz" className="underline">
            Retake the current quiz
          </Link>{' '}
          when you want an updated recommendation.
        </p>
      )}
      <section className="bg-ink text-cream rounded-2xl p-6 sm:p-8 mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-cream/70 mb-3">
          {chosen ? 'Your chosen direction' : 'Explore before choosing'}
        </p>
        <h2 className="font-display text-3xl mb-3">
          {chosen?.name || 'More than one direction could fit'}
        </h2>
        <p className="text-cream/80 leading-relaxed mb-4">
          {result.discovery
            ? 'Your answers suggest trying short tasks before settling on a direction. Explore the starter worksheets below and choose the work you want to practise.'
            : recommended
              ? `We recommend ${recommended.name.toLowerCase()} as a starting point based on your interest responses and practical-judgment answers. You can choose another direction.`
              : 'Your strongest scores are tied. Try the closest directions before choosing; we have not assigned a career based on a tie-breaker.'}
        </p>
        {chosen && (
          <>
            <p className="text-sm text-cream/70 mb-5">{chosen.description}</p>
            <Link to={`/career/practice/${chosen.id}`} className="btn-primary">
              Start: {chosen.practice} <ArrowRight size={15} />
            </Link>
          </>
        )}
      </section>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <section className="bg-paper border border-coffee-200 rounded-xl p-6">
          <h2 className="font-display text-xl text-ink mb-3">Preparation comes first</h2>
          <p className="text-sm text-coffee-700 mb-3">
            {result.foundationCorrect}/6 foundations questions answered correctly.{' '}
            {result.needsBridge
              ? 'Start with the short foundations bridge before your starter task.'
              : 'Review the topics you missed, then try a starter task.'}
          </p>
          <div className="space-y-3 mb-4">
            {foundationTopics
              .filter((topic) => result.needsBridge || result.missedFoundations.includes(topic.id))
              .map((topic) => (
                <details key={topic.id} className="border border-coffee-200 rounded-lg p-3">
                  <summary className="cursor-pointer text-sm font-semibold text-ink">
                    Review: {topic.title}
                  </summary>
                  <p className="text-sm text-coffee-700 leading-relaxed mt-3">
                    {topic.explanation}
                  </p>
                </details>
              ))}
          </div>
          <Link
            to="/tracks/security/sec-intro"
            className="text-sm font-semibold underline text-ink"
          >
            Open security foundations
          </Link>
          {chosen && (
            <>
              <p className="mt-4 text-xs text-coffee-600">
                For {chosen.name}: {chosen.preparation}
              </p>
              <ul className="mt-3 space-y-2">
                {careerResources[chosen.id].map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="text-sm text-coffee-700 underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
        <section className="border border-coffee-200 rounded-xl p-6">
          <h2 className="font-display text-xl text-ink mb-3">How to read your result</h2>
          <p className="text-sm text-coffee-700 mb-4">
            Your interests receive 65% of the recommendation weight and judgment receives 35%.
            Judgment options earn 0, 1, or 2 points for mistaken, incomplete, or best-supported
            reasoning. Foundations are separate. These are provisional guidance rules, not measured
            probabilities of success. Version: {result.version}.
          </p>
          <p className="text-sm text-coffee-700">
            Starter worksheets are available now. Full pathways, reviewed capstones, career
            mentoring, employer referrals, and Linux VMs are in development.
          </p>
          {result.purpleInterest && (
            <p className="mt-4 text-sm text-moss">
              Both blue and red appear among your close matches. Purple-team collaboration could be
              a later goal after practical foundations in both.
            </p>
          )}
        </section>
      </div>
      <h2 className="font-display text-2xl text-ink mb-4">Compare and change your direction</h2>
      {saveError && (
        <p role="alert" className="text-rust mb-4">
          {saveError}
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {result.ranked.map((match) => {
          const path = getCareerPath(match.path);
          if (!path || !ENTRY_PATHS.includes(path.id)) return null;
          return (
            <article
              key={path.id}
              className={`rounded-xl border p-5 ${chosen?.id === path.id ? 'border-moss bg-moss/5' : 'border-coffee-200 bg-paper'}`}
            >
              <h3 className="font-display text-xl text-ink mb-2">
                {path.name}
                {chosen?.id === path.id && (
                  <CheckCircle2 size={17} className="inline ml-2 text-moss" aria-label="Selected" />
                )}
              </h3>
              <p className="text-sm text-coffee-700 mb-3">
                Interest signal: {match.interest}/100 ·{' '}
                {match.credit !== undefined
                  ? `Judgment credit: ${match.credit}/6`
                  : `Judgment: ${match.correct}/3`}
              </p>
              <p className="text-xs text-coffee-600 mb-4">
                {result.closeMatches.includes(path.id) && !result.discovery
                  ? 'Close to your strongest match. '
                  : ''}
                {path.skills.join(' · ')}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  className="btn-ghost text-sm"
                  disabled={busy || chosen?.id === path.id}
                  onClick={() => choose(path.id)}
                >
                  {chosen?.id === path.id
                    ? 'Current direction'
                    : busy
                      ? 'Saving…'
                      : 'Choose this direction'}
                </button>
                <Link
                  className="underline text-sm text-coffee-700"
                  to={`/career/practice/${path.id}`}
                >
                  Try a starter task
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <section className="border-t border-coffee-200 pt-6">
        <h2 className="font-display text-xl text-ink mb-2">Your next career action</h2>
        <p className="text-sm text-coffee-700 mb-4">
          Write a cited starter reflection, compare it with the feedback, and identify one skill to
          practise next. You can export that reflection. It is introductory practice, not an
          independently reviewed credential.
        </p>
        {assessmentEnabled && chosen?.id === 'blue' && (
          <Link to="/career/investigation" className="btn-primary mb-5">
            Independent blue-team investigation · pilot
          </Link>
        )}
        <div className="flex flex-wrap gap-5">
          <Link to="/career-quiz" className="text-sm underline text-ink">
            Retake the quiz
          </Link>
          <Link to="/careers" className="text-sm underline text-ink">
            Explore all career directions
          </Link>
          {assessmentEnabled && (
            <Link to="/career/reviews" className="text-sm underline text-coffee-600">
              Assigned reviewer workspace
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
export default function CareerDashboard() {
  usePageTitle('Your cybersecurity career roadmap');
  const { user } = useAuth();
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rust mb-4">
        <Compass size={16} /> Discover and practise
      </p>
      <h1 className="display-heading text-4xl text-ink mb-8">Your career roadmap</h1>
      {user ? (
        <Roadmap key={user.id} />
      ) : (
        <Link to={CAREER_SIGN_IN} className="btn-primary">
          Sign in to build your roadmap
        </Link>
      )}
    </div>
  );
}
