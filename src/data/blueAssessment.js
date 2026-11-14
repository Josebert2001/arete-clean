export const BLUE_RUBRIC_VERSION = 'blue-investigation-v1';
export const blueRubric = [
  { id: 'triage', label: 'Initial triage', weight: 10 },
  { id: 'scope', label: 'Account and incident scope', weight: 20, critical: true },
  { id: 'timeline', label: 'Timeline and correlation', weight: 15 },
  { id: 'evidence', label: 'Evidence and uncertainty', weight: 20, critical: true },
  { id: 'containment', label: 'Containment and verification', weight: 20, critical: true },
  { id: 'report', label: 'Report and recommendations', weight: 15 },
];
export const blueReportFields = [
  ['summary', 'Executive summary'], ['findings', 'Findings, scope and unknowns'],
  ['timeline', 'UTC timeline with artifact references'], ['containment', 'Containment rationale, verification and residual risk'],
  ['recommendations', 'Prioritized recommendations, owners and recovery checks'],
];
