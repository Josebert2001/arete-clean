// Versioned unseen cases are delivered only to their assigned signed-in owner.
// Interpretation keys remain in this server-only module.
import { blueRubric } from '../../src/data/blueAssessment.js';

function makeCase(version, account, session, rule, clock) {
  return {
    version, title: 'Investigate unexpected mailbox activity',
    brief: 'You are assisting a fictional organization’s incident lead. External forwarding requires approval. Investigate the supplied records, distinguish facts from hypotheses, take proportionate actions in the simulator, verify the effect, and hand over a report. All activity is simulated; no external testing is required.',
    artifacts: [
      { id: 'EMAIL-01', source: 'email', text: `${clock}:42 UTC: An invoice-themed message is delivered to ${account}. Visible sender: billing@vendor.example; Reply-To: invoices@billing-check.example. These headers alone do not establish compromise.` },
      { id: 'WEB-01', source: 'gateway', text: `${clock}:47 UTC: Device D-7 associated with ${account} requests hxxps://billing-check[.]example/invoice. This export has no form or encrypted-content visibility.` },
      { id: 'AUTH-01', source: 'authentication', text: `${clock}:49 UTC: Six failed sign-ins for ${account}; no successful session is created by these events.` },
      { id: 'AUTH-02', source: 'authentication', text: `${Number(clock) + 1}:51 UTC+1: Successful access for ${account}, unfamiliar device D-19, session ${session}. Preserve the raw time and normalize it.` },
      { id: 'MAIL-01', source: 'mailbox audit', text: `${clock}:54 UTC: Session ${session} creates rule ${rule}, forwarding messages externally to archive@case-mail.example.` },
      { id: 'NOTE-01', source: 'owner interview', text: `${account} says the forwarding rule was not requested. The incident lead authorizes revoking suspicious sessions and removing unauthorized rules. Preserve available evidence first.` },
      { id: 'VPN-01', source: 'approved change', text: 'Account dana uses device D-2, session S-APPROVED and rule R-APPROVED for an approved internal workflow. The unfamiliar network address is an approved VPN egress. Disabling these interrupts legitimate work.' },
      { id: 'TICKET-01', source: 'change records', text: `No approval is recorded for ${rule}. The mailbox audit is complete only for this time window; historical message-delivery records are unavailable.` },
    ],
    sessions: [session, 'S-APPROVED'], rules: [rule, 'R-APPROVED'],
    environment: 'Source times refer to one fictional incident day. Simulator audit times record your exercise session, not that incident day. Revoking a session blocks its next access. Removing a rule stops future forwarding through that rule. Neither proves whether past messages were forwarded. Verify after making changes.',
    key: { account, session, rule },
  };
}
export const blueCases = {
  'blue-case-a-v1': makeCase('blue-case-a-v1', 'mira', 'S-17', 'R-17', '08'),
  'blue-case-b-v1': makeCase('blue-case-b-v1', 'tobi', 'S-42', 'R-42', '13'),
};
// In B, the message and failed logins are benign context, not the likely cause.
blueCases['blue-case-b-v1'].artifacts[0].text = '13:42 UTC: An expected supplier renewal reaches tobi. Both sender and reply-to are billing@vendor.example; the purchasing team confirms the renewal was requested. This does not explain the later mailbox change.';
blueCases['blue-case-b-v1'].artifacts[1].text = '13:47 UTC: Device D-7 requests the approved vendor receipt page. Gateway records alone do not establish credential disclosure.';
blueCases['blue-case-b-v1'].artifacts[2].text = '13:49 UTC: Failed logins for a separate service account occur during a documented client-password update. They create no session and have no established link to tobi.';
// Difficulty/equivalence still require practitioner calibration before a pilot.
export function learnerCase(version) {
  const entry = blueCases[version];
  if (!entry) throw new Error('Unknown assessment version.');
  const { key: _key, ...visible } = entry;
  return visible;
}
export function initialSimulation(version) {
  const entry = blueCases[version];
  return { sessions: Object.fromEntries(entry.sessions.map(id => [id, true])), rules: Object.fromEntries(entry.rules.map(id => [id, true])), verified: false, log: [] };
}
export function applySimulation(version, state, operation, target, reason) {
  const entry = blueCases[version];
  if (!entry || !['revoke_session', 'remove_rule', 'verify'].includes(operation)) throw new Error('Choose a supported simulator action.');
  if (typeof reason !== 'string' || reason.trim().length < 15 || reason.length > 1000) throw new Error('Explain the action in 15–1,000 characters.');
  if (state.log.length >= 30) throw new Error('The simulator action limit has been reached.');
  const next = structuredClone(state);
  if (operation === 'revoke_session') {
    if (!entry.sessions.includes(target)) throw new Error('Choose a session in this case.');
    next.sessions[target] = false; next.verified = false;
  } else if (operation === 'remove_rule') {
    if (!entry.rules.includes(target)) throw new Error('Choose a rule in this case.');
    next.rules[target] = false; next.verified = false;
  } else {
    next.verified = true;
  }
  next.log.push({ operation, target: operation === 'verify' ? null : target, reason: reason.trim(), at: new Date().toISOString(), observations: operation === 'verify' ? { sessions: { ...next.sessions }, rules: { ...next.rules } } : undefined });
  return next;
}
export function validateBlueReport(version, report) {
  const entry = blueCases[version];
  if (!report || typeof report !== 'object' || Array.isArray(report)) throw new Error('Complete the report.');
  const clean = {};
  for (const field of ['summary', 'findings', 'timeline', 'containment', 'recommendations']) {
    if (typeof report[field] !== 'string' || report[field].trim().length < 60 || report[field].length > 2000) throw new Error('Each report section needs 60–2,000 characters.');
    clean[field] = report[field].trim();
  }
  const ids = new Set(entry.artifacts.map(item => item.id));
  if (!Array.isArray(report.citations) || report.citations.length > 20 || report.citations.some(id => typeof id !== 'string' || !ids.has(id))) throw new Error('Use artifact IDs from your assigned case.');
  clean.citations = [...new Set(report.citations)];
  const sources = new Set(entry.artifacts.filter(item => clean.citations.includes(item.id)).map(item => item.source));
  if (clean.citations.length < 6 || sources.size < 3) throw new Error('Cite at least six artifacts across three source types.');
  if (report.assistanceDeclaration !== true) throw new Error('Acknowledge the assistance declaration before submitting.');
  clean.assistanceDeclaration = true;
  return clean;
}
export function validateBlueDraft(report) {
  if (!report || typeof report !== 'object' || Array.isArray(report)) throw new Error('Invalid report draft.');
  const clean = {};
  for (const field of ['summary', 'findings', 'timeline', 'containment', 'recommendations']) {
    const value = report[field] ?? '';
    if (typeof value !== 'string' || value.length > 2000) throw new Error('Keep each draft section within 2,000 characters.');
    clean[field] = value;
  }
  if (!Array.isArray(report.citations) || report.citations.length > 20 || report.citations.some(id => typeof id !== 'string' || id.length > 40)) throw new Error('Use up to 20 short artifact references.');
  clean.citations = report.citations;
  clean.assistanceDeclaration = report.assistanceDeclaration === true;
  return clean;
}
export function scoreBlueReview(levels, feedback) {
  if (!levels || typeof levels !== 'object' || !feedback || typeof feedback !== 'object') throw new Error('Complete every rubric criterion and explanation.');
  const cleanLevels = {}, cleanFeedback = {};
  let total = 0;
  for (const criterion of blueRubric) {
    const level = levels[criterion.id], note = feedback[criterion.id];
    if (!Number.isInteger(level) || level < 0 || level > 4 || typeof note !== 'string' || note.trim().length < 30 || note.length > 1200) throw new Error('Give each criterion a level from 0–4 and 30–1,200 characters of evidence-based feedback.');
    cleanLevels[criterion.id] = level; cleanFeedback[criterion.id] = note.trim();
    total += criterion.weight * level / 4;
  }
  return { levels: cleanLevels, feedback: cleanFeedback, score: Math.round(total * 10) / 10, decision: total >= 70 && blueRubric.filter(c => c.critical).every(c => levels[c.id] >= 3) ? 'pass' : 'needs_revision' };
}
