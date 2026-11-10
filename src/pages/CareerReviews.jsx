import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { careerRequest } from '../utils/careerApi';
import { blueRubric, blueReportFields } from '../data/blueAssessment';
import InvestigationEvidence from '../components/InvestigationEvidence';
import { usePageTitle } from '../utils/usePageTitle';

function ReviewItem({ item, ownerId }) {
  const [levels, setLevels] = useState({});
  const [feedback, setFeedback] = useState({});
  const [review, setReview] = useState(item.review);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (!confirm || busy) return;
    setBusy(true);
    setError('');
    try {
      const result = await careerRequest(
        'reviewSubmit',
        { attemptId: item.attempt.id, levels, feedback },
        ownerId,
      );
      setReview(result.review);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <article className="border border-coffee-200 rounded-xl p-5 sm:p-7 mb-7">
      <h2 className="font-display text-2xl text-ink mb-3">Case {item.attempt.case_version}</h2>
      <p className="text-xs font-mono text-coffee-600">
        Attempt {item.attempt.id} · rubric {item.attempt.rubric_version}
      </p>
      <InvestigationEvidence evidence={item.case} />
      <details className="mb-5 border border-coffee-200 p-4 rounded-lg">
        <summary className="cursor-pointer font-semibold text-ink">
          Reviewer interpretation and simulator snapshot
        </summary>
        <p className="text-sm text-coffee-700 mt-3">
          Relevant account: {item.interpretation.account}; session: {item.interpretation.session};
          rule: {item.interpretation.rule}. Evaluate alternatives, benign activity and evidence
          gaps; delivery/click/failure records alone do not prove the compromise vector or data
          loss. Accept defensible alternative reasoning.
        </p>
        <pre className="whitespace-pre-wrap break-words text-xs text-coffee-700 mt-4">
          {JSON.stringify(item.submission.simulation, null, 2)}
        </pre>
      </details>
      <h3 className="font-display text-xl text-ink mb-4">Frozen learner report</h3>
      {blueReportFields.map(([id, label]) => (
        <section key={id} className="mb-5">
          <h4 className="font-semibold text-ink">{label}</h4>
          <p className="text-sm text-coffee-700 whitespace-pre-line">
            {item.submission.report[id]}
          </p>
        </section>
      ))}
      <p className="text-sm text-coffee-600 mb-6">
        References: {item.submission.report.citations.join(', ')}
      </p>
      {review ? (
        <p role="status" className="text-moss">
          Published: {review.result.decision.replaceAll('_', ' ')} · {review.result.score}/100. This
          result is frozen; corrections require the pilot support process.
        </p>
      ) : (
        <form onSubmit={submit}>
          <p className="text-sm text-coffee-700 mb-5">
            Levels: 0 absent/wrong; 1 major gaps; 2 partial; 3 competent; 4 strong, supported work.
            Explain each level using the report and cited evidence. The server calculates the total
            and critical-criterion pass rule.
          </p>
          {blueRubric.map((criterion) => (
            <fieldset key={criterion.id} className="mb-5 border border-coffee-200 rounded-lg p-4">
              <legend className="font-semibold text-ink">
                {criterion.label} · {criterion.weight}%{criterion.critical ? ' · critical' : ''}
              </legend>
              <label
                htmlFor={`level-${item.attempt.id}-${criterion.id}`}
                className="text-sm text-coffee-700"
              >
                Level
              </label>
              <select
                id={`level-${item.attempt.id}-${criterion.id}`}
                required
                value={levels[criterion.id] ?? ''}
                onChange={(event) =>
                  setLevels((current) => ({
                    ...current,
                    [criterion.id]: Number(event.target.value),
                  }))
                }
                className="block w-full rounded-lg border border-coffee-300 bg-paper text-ink p-3 my-2"
              >
                <option value="">Choose level</option>
                {[0, 1, 2, 3, 4].map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
              <label
                htmlFor={`feedback-${item.attempt.id}-${criterion.id}`}
                className="text-sm text-coffee-700"
              >
                Evidence-based explanation and improvement
              </label>
              <textarea
                id={`feedback-${item.attempt.id}-${criterion.id}`}
                required
                minLength={30}
                maxLength={1200}
                rows={4}
                value={feedback[criterion.id] || ''}
                onChange={(event) =>
                  setFeedback((current) => ({ ...current, [criterion.id]: event.target.value }))
                }
                className="block w-full rounded-lg border border-coffee-300 bg-paper text-ink p-3 mt-2"
              />
            </fieldset>
          ))}
          <label className="flex gap-3 text-sm text-coffee-700 mb-5">
            <input
              type="checkbox"
              checked={confirm}
              onChange={(event) => setConfirm(event.target.checked)}
              required
            />
            I reviewed the complete evidence and submission. Publish this explained result to the
            learner.
          </label>
          {error && (
            <p role="alert" className="text-rust mb-4">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy || !confirm} className="btn-primary">
            {busy ? 'Publishing…' : 'Publish human review'}
          </button>
        </form>
      )}
    </article>
  );
}
function ReviewQueue({ ownerId }) {
  const [queue, setQueue] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    careerRequest('reviewQueue', {}, ownerId)
      .then((data) => {
        if (active) setQueue(data.queue);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [ownerId]);
  if (error)
    return (
      <p role="alert" className="text-coffee-700">
        {error}
      </p>
    );
  if (!queue) return <p role="status">Loading assigned reviews…</p>;
  if (!queue.length)
    return (
      <p className="text-coffee-700">
        No submitted investigations are assigned to you. Academic administrator status does not
        grant assessment-review access.
      </p>
    );
  return queue.map((item) => <ReviewItem key={item.attempt.id} item={item} ownerId={ownerId} />);
}
export default function CareerReviews() {
  usePageTitle('Assigned career reviews');
  const { user } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/career" className="text-sm underline text-coffee-600">
        Career roadmap
      </Link>
      <h1 className="display-heading text-4xl text-ink my-7">Assigned investigation reviews</h1>
      {user ? (
        <ReviewQueue key={user.id} ownerId={user.id} />
      ) : (
        <Link to="/signin?learn=career" className="btn-primary">
          Sign in
        </Link>
      )}
    </div>
  );
}
