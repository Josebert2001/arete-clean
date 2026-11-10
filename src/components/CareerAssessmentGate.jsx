import { Link } from 'react-router-dom';
import { useCareer } from './useCareer';

export default function CareerAssessmentGate({ children }) {
  const { status, assessmentEnabled, error, refresh } = useCareer();

  if (status === 'loading') {
    return (
      <p role="status" className="mx-auto max-w-4xl px-6 py-12">
        Checking assessment availability…
      </p>
    );
  }

  if (status === 'ready' && assessmentEnabled) return children;

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="display-heading mb-4 text-3xl text-ink">
        Independent assessments are not available
      </h1>
      {status === 'error' ? (
        <>
          <p role="alert" className="mb-4 text-coffee-700">
            {error}
          </p>
          <button type="button" onClick={refresh} className="btn-ghost mb-5">
            Try again
          </button>
        </>
      ) : (
        <p className="mb-5 text-coffee-700">
          You can still take the placement quiz and follow your career roadmap.
        </p>
      )}
      <Link to="/career" className="btn-primary">
        Your career roadmap
      </Link>
    </section>
  );
}
