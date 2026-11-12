import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { careerRequest } from '../utils/careerApi';
import { blueRubric, blueReportFields } from '../data/blueAssessment';
import InvestigationEvidence from '../components/InvestigationEvidence';
import { usePageTitle } from '../utils/usePageTitle';

function download(value) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = 'arete-blue-investigation.json';
  link.click();
  URL.revokeObjectURL(url);
}
function ReportForm({ attempt, busy, perform }) {
  const [report, setReport] = useState(attempt.draft || {});
  const [references, setReferences] = useState((attempt.draft?.citations || []).join(', '));
  const [confirmed, setConfirmed] = useState(false);
  const [saved, setSaved] = useState(false);
  const payload = { ...report, citations: references.split(/[\s,]+/).filter(Boolean) };
  async function saveDraft() {
    const success = await perform('assessmentDraft', { report: payload });
    setSaved(success);
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (confirmed) perform('assessmentSubmit', { report: payload });
      }}
      className="mt-8"
    >
      <h2 className="font-display text-2xl text-ink mb-3">Your final report</h2>
      <p className="text-sm text-coffee-700 mb-5">
        Use 60–2,000 characters per section and at least six artifact references across three source
        types. Separate observations, inferences and unknowns. Save a draft before leaving;
        submission freezes the report and simulator record.
      </p>
      {blueReportFields.map(([id, label]) => (
        <div key={id} className="mb-5">
          <label htmlFor={`report-${id}`} className="block font-semibold text-ink mb-2">
            {label}
          </label>
          <textarea
            id={`report-${id}`}
            rows={5}
            minLength={60}
            maxLength={2000}
            required
            value={report[id] || ''}
            disabled={busy}
            onChange={(event) => {
              setReport((current) => ({ ...current, [id]: event.target.value }));
              setSaved(false);
            }}
            className="w-full border border-coffee-300 rounded-xl bg-paper p-4 text-ink focus:ring-2 focus:ring-moss"
          />
        </div>
      ))}
      <label htmlFor="report-citations" className="block font-semibold text-ink mb-2">
        Artifact references, separated by commas
      </label>
      <input
        id="report-citations"
        value={references}
        maxLength={600}
        required
        onChange={(event) => {
          setReferences(event.target.value);
          setSaved(false);
        }}
        className="w-full border border-coffee-300 rounded-lg bg-paper text-ink p-3 mb-5"
        placeholder="EMAIL-01, AUTH-02, MAIL-01, …"
      />
      <label className="flex gap-3 text-sm text-coffee-700 mb-4">
        <input
          type="checkbox"
          checked={report.assistanceDeclaration === true}
          onChange={(event) =>
            setReport((current) => ({ ...current, assistanceDeclaration: event.target.checked }))
          }
          required
        />
        I wrote this report myself using permitted notes and references. Another person or
        generative tool did not compose it. Accessibility tools are permitted.
      </label>
      <label className="flex gap-3 text-sm text-coffee-700 mb-5">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
        />
        I understand that submission freezes this report and records it for human review.
      </label>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={saveDraft} disabled={busy} className="btn-ghost">
          Save report draft
        </button>
        <button
          type="button"
          onClick={() =>
            download({
              caseVersion: attempt.case_version,
              draft: payload,
              limitation: 'Draft, not an assessed result',
            })
          }
          className="btn-ghost"
        >
          Download draft
        </button>
        <button type="submit" disabled={busy || !confirmed} className="btn-primary">
          {busy ? 'Saving…' : 'Submit final report'}
        </button>
      </div>
      {saved && (
        <p role="status" className="text-sm text-moss mt-4">
          Report draft saved to your account.
        </p>
      )}
    </form>
  );
}
function InvestigationWorkspace({ ownerId }) {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [operation, setOperation] = useState('revoke_session');
  const [target, setTarget] = useState('');
  const [reason, setReason] = useState('');
  useEffect(() => {
    let active = true;
    careerRequest('assessmentStatus', {}, ownerId)
      .then((value) => {
        if (active) setData(value);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [ownerId]);
  async function reload() {
    setError('');
    try {
      setData(await careerRequest('assessmentStatus', {}, ownerId));
    } catch (err) {
      setError(err.message);
    }
  }
  async function perform(action, fields = {}) {
    if (busy) return false;
    setBusy(true);
    setError('');
    try {
      const result = await careerRequest(
        action,
        { attemptId: data?.attempt?.id, revision: data?.attempt?.revision, ...fields },
        ownerId,
      );
      if (result.submission) await reload();
      else setData((current) => ({ ...current, ...result }));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  }
  if (!data)
    return (
      <div>
        {error ? (
          <>
            <p role="alert" className="text-coffee-700 mb-4">
              {error}
            </p>
            <button onClick={reload} className="btn-ghost">
              Check availability again
            </button>
          </>
        ) : (
          <p role="status">Loading your investigation…</p>
        )}
      </div>
    );
  const { attempt, case: evidence, submission, review } = data;
  if (!attempt && data.eligible === false)
    return (
      <section className="bg-paper border border-coffee-200 rounded-xl p-6">
        <h2 className="font-display text-2xl text-ink mb-3">Invited assessment pilot</h2>
        <p className="text-coffee-700 mb-5">
          Starting an assessed investigation requires an invitation from the pilot coordinator so
          that reviewer places are available. You can continue starter practice while arranging an
          invitation.
        </p>
        <Link to="/career/practice/blue" className="btn-primary">
          Continue blue-team starter practice
        </Link>
      </section>
    );
  if (!attempt)
    return (
      <section className="bg-paper border border-coffee-200 rounded-2xl p-7">
        <h2 className="font-display text-2xl text-ink mb-3">
          An independent mailbox investigation
        </h2>
        <p className="text-coffee-700 mb-5">
          Work through a fresh synthetic case, justify simulated containment, verify its effect, and
          submit your report. This is an open-book, unproctored introductory assessment linked to
          your account. A reviewer must be assigned before a human-reviewed result can be published.
        </p>
        <p className="text-sm text-coffee-600 mb-5">
          Expected effort: 2–3 hours within a seven-day window. Two unseen variants are available.
          No automatic skills pass or employment guarantee.
        </p>
        {error && (
          <p role="alert" className="text-rust mb-4">
            {error}
          </p>
        )}
        <button onClick={() => perform('assessmentStart')} disabled={busy} className="btn-primary">
          {busy ? 'Preparing…' : 'Start independent investigation'}
        </button>
      </section>
    );
  // The database enforces the deadline on every write. Keep the local draft
  // downloadable even if a session expires while the learner is typing.
  const editable = attempt.status === 'in_progress' && !attempt.expired;
  return (
    <>
      <p className="text-sm text-coffee-600">
        Case {attempt.case_version} · {attempt.status.replaceAll('_', ' ')} · Deadline{' '}
        {new Date(attempt.deadline_at).toLocaleString()}
      </p>
      <details className="mt-5 border border-coffee-200 rounded-xl p-4">
        <summary className="cursor-pointer font-semibold text-ink">
          Assessment rubric and pass rule
        </summary>
        <p className="text-sm text-coffee-700 my-3">
          Each criterion uses 0–4: absent/wrong, major gaps, partial, competent, or strong supported
          work. Pass requires 70/100 and level 3 in every critical criterion. Citation counts
          validate completeness, not reasoning quality.
        </p>
        <ul className="list-disc pl-5 text-sm text-coffee-700 space-y-1">
          {blueRubric.map((item) => (
            <li key={item.id}>
              {item.label}: {item.weight}%{item.critical ? ' · critical' : ''}
            </li>
          ))}
        </ul>
      </details>
      {error && (
        <p role="alert" className="text-rust border border-rust/30 rounded-xl p-4 mt-5">
          {error} Save or download your report draft before leaving this page.
        </p>
      )}
      <InvestigationEvidence evidence={evidence} />
      <section className="bg-ink text-cream p-6 rounded-2xl">
        <h2 className="font-display text-2xl mb-3">Containment simulator</h2>
        <p className="text-sm text-cream/80 mb-4">
          Select a scoped target and explain the action. These are server-recorded simulated state
          changes, not commands on a real Linux machine.
        </p>
        {editable && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              perform('assessmentAction', { operation, target, reason });
            }}
          >
            <label htmlFor="sim-operation" className="block text-sm mb-2">
              Action
            </label>
            <select
              id="sim-operation"
              value={operation}
              onChange={(event) => {
                setOperation(event.target.value);
                setTarget('');
              }}
              className="w-full p-3 rounded-lg bg-paper text-ink mb-4"
            >
              <option value="revoke_session">Revoke session</option>
              <option value="remove_rule">Remove forwarding rule</option>
              <option value="verify">Verify current controls</option>
            </select>
            {operation !== 'verify' && (
              <>
                <label htmlFor="sim-target" className="block text-sm mb-2">
                  Target from the case
                </label>
                <select
                  id="sim-target"
                  required
                  value={target}
                  onChange={(event) => setTarget(event.target.value)}
                  className="w-full p-3 rounded-lg bg-paper text-ink mb-4"
                >
                  <option value="">Choose a target</option>
                  {(operation === 'revoke_session' ? evidence.sessions : evidence.rules).map(
                    (id) => (
                      <option key={id}>{id}</option>
                    ),
                  )}
                </select>
              </>
            )}
            <label htmlFor="sim-reason" className="block text-sm mb-2">
              Rationale and expected effect
            </label>
            <textarea
              id="sim-reason"
              required
              minLength={15}
              maxLength={1000}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="w-full rounded-lg p-3 bg-paper text-ink mb-4"
            />
            <button className="btn-primary" disabled={busy}>
              Record simulated action
            </button>
          </form>
        )}
        <ol className="mt-5 space-y-3 text-sm">
          {attempt.simulation.log.map((item, index) => (
            <li key={index} className="border-t border-cream/20 pt-3">
              <p>
                {index + 1}. {item.operation.replaceAll('_', ' ')} {item.target} · {item.reason}
              </p>
              {item.observations && (
                <pre className="whitespace-pre-wrap break-words mt-2 text-xs">
                  {JSON.stringify(item.observations, null, 2)}
                </pre>
              )}
            </li>
          ))}
        </ol>
        <p className="text-xs text-cream/70 mt-4">
          Verification recorded for current state: {attempt.simulation.verified ? 'yes' : 'no'}. A
          recorded verification does not itself establish correct containment.
        </p>
      </section>
      {editable && <ReportForm key={attempt.id} attempt={attempt} busy={busy} perform={perform} />}
      {!editable && !submission && (
        <section className="mt-6">
          <p className="text-coffee-700 mb-4">
            This attempt is no longer editable. You can download its saved draft and contact support
            about the deadline.
          </p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() =>
              download({
                caseVersion: attempt.case_version,
                draft: attempt.draft,
                limitation: 'Expired draft; not submitted or assessed',
              })
            }
          >
            Download expired draft
          </button>
          {data.remainingAttempts > 0 && data.eligible !== false && (
            <button
              type="button"
              disabled={busy}
              onClick={() => perform('assessmentStart')}
              className="btn-ghost ml-3"
            >
              Start remaining unseen case
            </button>
          )}
        </section>
      )}
      {submission && (
        <section className="mt-8 border border-coffee-200 p-6 rounded-xl">
          <h2 className="font-display text-2xl text-ink mb-3">
            {review ? 'Human review published' : 'Report submitted · awaiting review'}
          </h2>
          <p className="text-sm text-coffee-700 mb-4">
            Receipt: {submission.attempt_id} · {new Date(submission.submitted_at).toLocaleString()}.
            The report and simulator snapshot are frozen. Review timing is agreed for the staffed
            pilot.
          </p>
          {review && (
            <>
              <p className="font-semibold text-ink mb-4">
                {review.result.decision === 'pass' ? 'Pass' : 'Needs revision'} ·{' '}
                {review.result.score}/100 · {review.result.method}
              </p>
              {blueRubric.map((item) => (
                <div key={item.id} className="mb-4">
                  <h3 className="font-semibold text-ink">
                    {item.label}: {review.levels[item.id]}/4
                  </h3>
                  <p className="text-sm text-coffee-700 whitespace-pre-line">
                    {review.feedback[item.id]}
                  </p>
                </div>
              ))}
              <p className="text-xs text-coffee-600 mb-4">
                This reflects work on a synthetic, open-book, unproctored case. Account
                authentication does not verify professional identity or guarantee employment.
                Request clarification through the pilot support contact if you dispute the result.
              </p>
            </>
          )}
          <button
            type="button"
            className="btn-ghost"
            onClick={() =>
              download({
                task: attempt.case_version,
                rubric: attempt.rubric_version,
                submission,
                review,
                limitation:
                  'Synthetic open-book account-linked case; not a professional certification',
              })
            }
          >
            Download submission and result
          </button>
          <button type="button" onClick={reload} className="btn-ghost ml-3">
            Refresh review status
          </button>
          {review?.result.decision === 'needs_revision' &&
            data.remainingAttempts > 0 &&
            data.eligible !== false && (
              <div className="mt-5">
                <p className="text-sm text-coffee-700 mb-3">
                  Revisit the relevant starter feedback before using the remaining unseen variant.
                  Previous work and results remain recorded.
                </p>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => perform('assessmentStart')}
                  className="btn-ghost"
                >
                  Start an unseen reassessment
                </button>
              </div>
            )}
        </section>
      )}
    </>
  );
}
export default function BlueInvestigation() {
  usePageTitle('Blue-team independent investigation');
  const { user } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/career" className="text-sm underline text-coffee-600">
        Your career roadmap
      </Link>
      <h1 className="display-heading text-4xl text-ink mt-7 mb-7">Investigate. Explain. Verify.</h1>
      {user ? (
        <InvestigationWorkspace key={user.id} ownerId={user.id} />
      ) : (
        <Link to="/signin?learn=career" className="btn-primary">
          Sign in to investigate
        </Link>
      )}
    </div>
  );
}
