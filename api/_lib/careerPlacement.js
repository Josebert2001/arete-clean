import { ENTRY_PATHS, PLACEMENT_VERSION, placementQuestions } from '../../src/data/careers.js';

// Deliberately server-only. This guidance quiz is not a certification or hiring test.
const KEY = { B1: 0, B2: 1, B3: 1, B4: 1, B5: 0, B6: 2 };
const JUDGMENT_CREDIT = {
  J1: [2, 1, 0, 0], J2: [1, 2, 0, 0], J3: [1, 2, 0, 0], J4: [0, 2, 1, 0],
  J5: [0, 1, 2, 0], J6: [0, 1, 2, 0], J7: [1, 2, 0, 0], J8: [2, 1, 0, 0],
  J9: [0, 1, 2, 0], J10: [0, 1, 2, 0], J11: [0, 1, 2, 0], J12: [2, 1, 0, 0],
};
const round = value => Math.round(value * 10) / 10;

export function scorePlacement(version, answers) {
  if (version !== PLACEMENT_VERSION) throw new Error('The quiz has changed. Reload it before submitting.');
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)
    || Object.keys(answers).length !== placementQuestions.length) throw new Error('Answer all 30 questions before submitting.');
  for (const question of placementQuestions) {
    const answer = answers[question.id];
    if (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length) throw new Error(`Choose a valid answer for ${question.id}.`);
  }
  const ranked = ENTRY_PATHS.map(path => {
    const interest = placementQuestions.filter(q => q.path === path && q.kind === 'interest');
    const judgment = placementQuestions.filter(q => q.path === path && q.kind === 'judgment');
    const interestScore = interest.reduce((sum, q) => sum + answers[q.id], 0) / 12 * 100;
    const credit = judgment.reduce((sum, q) => sum + JUDGMENT_CREDIT[q.id][answers[q.id]], 0);
    const correct = judgment.filter(q => JUDGMENT_CREDIT[q.id][answers[q.id]] === 2).length;
    const judgmentScore = credit / 6 * 100;
    return { path, interest: round(interestScore), judgment: round(judgmentScore), score: round(interestScore * 0.65 + judgmentScore * 0.35), credit, correct };
  }).sort((a, b) => b.score - a.score || ENTRY_PATHS.indexOf(a.path) - ENTRY_PATHS.indexOf(b.path));
  const foundations = placementQuestions.filter(q => q.kind === 'foundation');
  const missedFoundations = foundations.filter(q => answers[q.id] !== KEY[q.id]).map(q => q.id);
  const foundationCorrect = foundations.length - missedFoundations.length;
  const discovery = placementQuestions.filter(q => q.kind === 'interest').every(q => answers[q.id] === 2) || ranked[0].score < 35;
  const closeMatches = ranked.filter(path => ranked[0].score - path.score <= 10).map(path => path.path);
  // Never use array order to turn an exact tie into a claimed recommendation.
  const tied = ranked.filter(path => path.score === ranked[0].score).length > 1;
  return {
    version: PLACEMENT_VERSION, ranked, foundationCorrect, missedFoundations,
    needsBridge: foundationCorrect < 4, discovery, closeMatches,
    recommendedPath: discovery || tied ? null : ranked[0].path,
    purpleInterest: !discovery && closeMatches.includes('blue') && closeMatches.includes('red'),
  };
}
