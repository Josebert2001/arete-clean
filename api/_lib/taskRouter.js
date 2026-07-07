// ============================================================================
//  Arete — Tutor task router
//  Decides whether a tutor turn needs the STRONG Gemini model or can use the
//  fast LIGHT one. Pure heuristic: no extra LLM call, so it adds zero latency.
//
//  Bias is toward 'strong' — the tutor should be smart. We only downgrade to
//  'light' for clearly trivial turns (greetings, acknowledgements, empty), so a
//  real question is never answered by the weaker model. Both tiers are Gemini
//  models chosen in buildModelChain(); this only picks which one leads.
// ============================================================================

// Whole-message greeting ("hello", "good morning!", "hey 👋"). Anchored so
// "hello, can you explain subnetting" does NOT match — that's a real question.
const GREETING_RE = /^(hi+|hey+|hello+|yo|sup|howdy|greetings|good\s+(morning|afternoon|evening|day))[\s!.,👋🙂😊]*$/iu;

// Whole-message acknowledgement / filler with no question in it.
const ACK_RE = /^(thanks?|thank you|tysm|ty|ok(ay)?|k|cool|nice|great|awesome|got it|gotcha|alright|understood|sure|yes|yeah|yep|no|nah|👍|🙏)[\s!.,👍🙏]*$/iu;

// Strip a leading "[Studying: ...]" tag the tutor endpoint may prepend before
// classification, so the router sees the student's actual words.
function stripStudyingTag(text) {
  return text.replace(/^\[Studying:[^\]]*\]\s*/i, '');
}

/**
 * @param {Array<{role:string, content:string}>} messages  conversation so far
 * @returns {'strong'|'light'}
 */
export function classifyTaskTier(messages) {
  const last = Array.isArray(messages) ? messages[messages.length - 1] : null;
  const text = stripStudyingTag(typeof last?.content === 'string' ? last.content : '').trim();

  if (!text) return 'light';

  // Only a bare greeting or acknowledgement (and nothing else) uses the light
  // tier. Anything with an actual question or task falls through to 'strong'.
  if (GREETING_RE.test(text) || ACK_RE.test(text)) return 'light';

  return 'strong';
}
