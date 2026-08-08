// ─── Day-one "Getting started" checklist ──────────────────────────────────────
// Pure derivation of a first-run checklist so it stays testable without React.
// StudentDashboard shows GettingStartedCard instead of its returning-user
// layout (streak nag, daily challenge) until the student's first module is
// complete or they dismiss it — see GettingStartedCard.jsx.

const DISMISSED_KEY_PREFIX = 'arete-getting-started-dismissed-v1:';
const CLICKED_KEY_PREFIX = 'arete-getting-started-clicked-v1:';

// Keyed per user (not just per device) so a shared/lab computer doesn't carry
// one student's dismissal over to the next signed-in student.
export function readDismissed(userId) {
  if (!userId || typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(DISMISSED_KEY_PREFIX + userId) === '1';
  } catch {
    return false;
  }
}

export function writeDismissed(userId) {
  if (!userId || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(DISMISSED_KEY_PREFIX + userId, '1');
  } catch { /* private mode — card just reappears next visit */ }
}

export function readClicked(userId) {
  if (!userId || typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CLICKED_KEY_PREFIX + userId);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

// Returns the updated map so the caller can update its own state without a
// re-read; storage is best-effort (private mode just re-asks next visit).
export function writeClicked(userId, stepId) {
  const next = { ...readClicked(userId), [stepId]: true };
  if (!userId || typeof localStorage === 'undefined') return next;
  try {
    localStorage.setItem(CLICKED_KEY_PREFIX + userId, JSON.stringify(next));
  } catch { /* private mode — step just re-shows as pending next visit */ }
  return next;
}

// Steps for the first-run checklist, in display order. Inputs are plain
// values (no React, no storage reads) so this is unit-testable in isolation.
// `clicked` is the persisted map of step ids the student has tapped.
export function deriveGettingStartedSteps({
  levelNumber = null,
  isFoundation = false,
  hasSelectedCourses = false,
  hasRegNumber = false,
  completedCount = 0,
  lastPath = null,
  clicked = {},
}) {
  const steps = [];

  steps.push(
    isFoundation
      ? {
          id: 'courses',
          label: "Pick the courses your programme takes",
          to: '/courses',
          done: hasSelectedCourses,
        }
      : {
          id: 'courses',
          label: levelNumber ? `Open your ${levelNumber}L courses` : 'Open your courses',
          to: levelNumber ? `/courses?level=${levelNumber}` : '/courses',
          done: Boolean(clicked.courses) || Boolean(lastPath?.startsWith('/courses')),
        }
  );

  steps.push({
    id: 'module',
    label: 'Finish your first module in the Code Lab',
    to: '/lab',
    // Terminal — completing any module retires the whole card via
    // shouldShowGettingStarted, so this step is never seen "done" for long.
    done: completedCount > 0,
  });

  steps.push({
    id: 'tutor',
    label: 'Ask the AI Tutor a question',
    to: '/tutor',
    done: Boolean(clicked.tutor) || lastPath === '/tutor',
  });

  // Only present while there's something to add — once a reg number exists
  // there's nothing left to prompt for, so the step disappears rather than
  // sitting there permanently checked off.
  if (!hasRegNumber) {
    steps.push({
      id: 'reg',
      label: 'Add your reg number',
      to: '/profile',
      done: false,
    });
  }

  return steps;
}

// Shown while the student hasn't completed a module yet and hasn't dismissed
// the card. Once either happens, the dashboard reverts to its standard
// layout for good — dismissal is a permanent per-user, per-device choice.
export function shouldShowGettingStarted({ completedCount, dismissed }) {
  return completedCount === 0 && !dismissed;
}
