// ============================================================================
//  Arete — multi-provider model chain with automatic fallback
//  Shared by the AI endpoints so provider selection lives in ONE place.
//
//  Order (strong tier, which the agentic tutor needs for tool calling; the
//  light tier is the same list minus step 1 — see buildModelChain):
//    1. Gemini strong (GEMINI_STRONG_MODEL) — leads only when tier is 'strong'.
//    2. Gemini flash-lite (GEMINI_LIGHT_MODEL) — leads the light tier and is the
//       second Gemini step of BOTH tiers. On Google's free tier (15 RPM,
//       1,500 req/day), supports tools, and is the cheapest Gemini if you ever
//       exceed the free tier. Its generous limits mean the requests that 413
//       Groq's 8K/req cap fit here.
//    3. Groq gpt-oss-120b — fast fallback.
//    4. OpenRouter's free router — best-effort last resort (no SLA; free models
//       can be slow/removed). `openrouter/free` auto-selects a free model that
//       supports the requested features, including tool calling.
//
//  NOTE: Gemini 3.x is a reasoning model tuned for its defaults — Google
//  recommends NOT sending temperature/top_p/top_k. So temperature is set
//  per-provider (Groq/OpenRouter) via `options`, and omitted for Gemini.
//
//  Gemini 3.x is NOT thinking-capped by default: hidden reasoning spends from
//  the same maxOutputTokens as the visible reply, which truncates answers on
//  endpoints with a tight budget. That cap therefore lives on the Gemini chain
//  entries below (`thinkingBudget: 0`), NOT at each call site. It used to be
//  copied into every caller, which is exactly how /api/summarize ended up
//  without it and made a model swap look broken (see the block above the model
//  ids). Callers pass only provider-agnostic options.
//
//  Each provider is included only when its key is set, so the app degrades
//  gracefully and you can run locally with just one key.
// ============================================================================

import { streamText, generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// Two Gemini tiers, both env-overridable. STRONG handles hard reasoning and
// coding; LIGHT (flash-lite) is fast/cheap for simple turns AND doubles as the
// proven fallback if the strong model id is ever unavailable. The task router
// (api/_lib/taskRouter.js) picks the tier per tutor turn.
// gemini-3.5-flash is GA/stable — strong at the tutor's agentic tool loop and
// coding, while staying fast and affordable.
//
// ─── BEFORE MOVING THIS TO gemini-3.7-flash, READ THIS ──────────────────────
// 3.7 was tried on 2026-08-29 and reverted the same day: /api/summarize came
// back 331 characters long, cut off mid-sentence at "* **Collection** requires",
// with the "Terms to know:" line that the prompt ends by asking for never
// emitted. 3.5-flash answered the same prompt in full.
//
// That test was INVALID, and the note it first produced here claimed 3.7
// ignores `thinkingBudget: 0`. Nothing measured supports that: back when each
// call site carried its own copy of the option, summarize.js was the one
// strong-tier caller that never sent it. The truncation is fully explained by
// an uncapped thinking pass against a 1400-token budget — 3.7 defaults to
// medium thinking and, unlike 3.5, has no "minimal" level. The cap now lives on
// the chain entries below, where a caller cannot skip it.
//
// So whether 3.7 honours thinkingBudget: 0 is UNKNOWN, not disproved. It is
// cheaper ($0.75/$3.75 per 1M in/out vs $1.50/$9.00) and better at agentic
// work, so it is worth retrying now the cap is applied everywhere. If a retry
// still truncates, do NOT compensate by raising maxOutputTokens: tutor.js caps
// at 1200 to hold Groq's request under its free-tier 8K limit, and
// `stopWhen: stepCountIs(4)` spends that budget per step, so the headroom an
// uncapped thinking pass needs is ~4x — which makes the Groq fallback 413, the
// exact failure this chain exists to absorb. Set an explicit low thinking level
// through whatever option @ai-sdk/google exposes for it instead.
//
// To verify a retry: /api/summarize is a valid probe again (it now gets the cap
// from the chain like every other caller) and is still the most sensitive one,
// with the largest input against the tightest budget. Ask it for a recap and
// check the "Terms to know:" line is present — it is the last thing the prompt
// asks for, so its absence is the truncation tell.
//
// Note also that a Google console banner announcing 3.5 Flash "will be taken
// down soon" was checked against the official deprecation page, which lists
// gemini-3.5-flash with "No shutdown date announced". There is no deadline
// forcing this migration.
// ────────────────────────────────────────────────────────────────────────────
//
// Both are env-overridable, and the env var WINS — a GEMINI_MODEL_STRONG set in
// the Vercel dashboard shadows this default silently, and whoever sets it there
// never sees the block above. Check it before concluding which model is live.
const GEMINI_STRONG_MODEL = process.env.GEMINI_MODEL_STRONG || 'gemini-3.5-flash';
// flash-lite is both the cheapest tier and the second Gemini step of BOTH
// tiers, so this has to stay a model id that actually exists: point it at a
// wrong or unreleased id and Gemini drops out of the strong chain as well as
// the light one, sending every request to Groq's 8K-capped free tier.
const GEMINI_LIGHT_MODEL = process.env.GEMINI_MODEL_LIGHT || 'gemini-3.5-flash-lite';

// Hidden reasoning otherwise spends from the same maxOutputTokens as the
// visible reply — measured at ~900 tokens on a single code listing — which
// truncates answers mid-sentence and occasionally leaks reasoning-style
// phrasing into the last line. Nothing this app asks Gemini for (explain a
// listing, rewrite a paragraph, recap a topic, answer from a tool lookup) needs
// a multi-step reasoning pass. It rides on the chain entries rather than being
// passed by each caller because the copy-per-caller version was forgotten at
// /api/summarize and cost a wrongly-diagnosed model revert; a new endpoint now
// gets it by construction.
const GEMINI_THINKING_OFF = { google: { thinkingConfig: { thinkingBudget: 0, includeThoughts: false } } };

/**
 * Build the ordered provider chain from whatever keys are configured.
 *
 * @param {'strong'|'light'} [tier='strong'] which Gemini model leads the chain.
 *   'strong' prepends the strong Gemini model; BOTH tiers then keep flash-lite
 *   as the next Gemini step, so an unavailable strong-model id degrades to
 *   flash-lite (still Gemini) rather than dropping to Groq's tighter free tier.
 */
export function buildModelChain(tier = 'strong') {
  const chain = [];

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (geminiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    // No temperature/top_p/top_k — Gemini 3.x is optimized for its defaults.
    if (tier === 'strong') {
      chain.push({ name: 'gemini-strong', model: google(GEMINI_STRONG_MODEL), providerOptions: GEMINI_THINKING_OFF });
    }
    chain.push({ name: 'gemini-lite', model: google(GEMINI_LIGHT_MODEL), providerOptions: GEMINI_THINKING_OFF });
  }

  if (process.env.GROQ_API_KEY) {
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
    chain.push({
      name: 'groq',
      model: groq('openai/gpt-oss-120b'),
      options: { temperature: 0.65 },
      // gpt-oss-120b is a reasoning model; keep effort low so reasoning tokens
      // don't eat the answer budget or stall the stream.
      providerOptions: { groq: { reasoningEffort: 'low' } },
    });
  }

  if (process.env.OPENROUTER_API_KEY) {
    const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
    chain.push({ name: 'openrouter', model: openrouter('openrouter/free'), options: { temperature: 0.65 } });
  }

  return chain;
}

// True when at least one provider key is configured.
export function hasAnyProvider() {
  return buildModelChain().length > 0;
}

/**
 * Stream text with automatic provider fallback.
 *
 * Fallback is only possible BEFORE the first byte reaches the client — once a
 * provider has streamed any text, we're committed to it (a failure after that
 * point is reported to the caller, which can append its own error marker).
 * Because the AI SDK may end a stream WITHOUT throwing when a provider rejects
 * the request, we also capture errors via onError and treat a run that produced
 * no text as a failure worth retrying on the next provider.
 *
 * @param {Object}   opts
 * @param {Array}    opts.chain      provider chain from buildModelChain()
 * @param {...}      opts.*          any streamText options (system, messages, tools, …)
 * @param {Function} onText          called with each text chunk; should write to the response
 * @param {Function} [onToolCall]    called with each tool-call chunk BEFORE text starts,
 *                                   so the caller can surface "what the AI is doing"
 * @returns {Promise<{ wroteText: boolean, provider: string|null, error: unknown }>}
 */
export async function streamTextWithFallback({ chain, ...options }, onText, onToolCall) {
  let lastError = null;

  for (const provider of chain) {
    let capturedError = null;
    let wroteText = false;

    const providerOptions = provider.providerOptions
      ? { ...(options.providerOptions || {}), ...provider.providerOptions }
      : options.providerOptions;

    try {
      const result = streamText({
        ...options,
        ...(provider.options || {}), // per-provider overrides (e.g. temperature)
        model: provider.model,
        ...(providerOptions ? { providerOptions } : {}),
        onError: ({ error }) => { capturedError = error; },
        // Surface tool activity, but only before the answer text starts — a tool
        // call mid-answer must not interrupt the streamed prose.
        onChunk: onToolCall
          ? ({ chunk }) => { if (!wroteText && chunk?.type === 'tool-call') onToolCall(chunk); }
          : undefined,
      });

      for await (const chunk of result.textStream) {
        if (chunk) { onText(chunk); wroteText = true; }
      }
    } catch (err) {
      // Catches both async stream errors AND synchronous provider errors thrown
      // at streamText() construction (e.g. an incompatible model-spec version).
      // Either way, no text was sent yet, so we fall through to the next
      // provider instead of letting the whole request abort.
      capturedError = err;
    }

    // Committed once any text is out — return, reporting a late failure if any.
    if (wroteText) {
      return { wroteText: true, provider: provider.name, error: capturedError };
    }

    // No text: remember why and let the next provider try.
    lastError = capturedError || new Error('Model produced no text output');
    if (capturedError) {
      console.error(`Tutor provider "${provider.name}" failed, falling back:`, capturedError);
    }
  }

  return { wroteText: false, provider: null, error: lastError };
}

/**
 * One-shot (non-streaming) text generation with the same provider fallback as
 * streamTextWithFallback — for the non-agentic endpoints (explainer, simplify)
 * that were previously hardwired to Groq and had no recovery from its free-tier
 * 413 / 429s. Tries each provider in chain order until one returns text.
 *
 * The reasoning caps — reasoningEffort for Groq, thinkingBudget for Gemini —
 * come from the per-provider entries in buildModelChain(), so callers pass only
 * provider-agnostic options (system, prompt, maxOutputTokens).
 * The `result` is returned too, so a caller that needs provider extras (e.g.
 * `.sources`) can reach them — though web-search endpoints stay Groq-only
 * (compound-mini).
 *
 * An optional `temperature` is applied ONLY to providers whose chain entry
 * already carries a temperature (Groq/OpenRouter) — never to Gemini 3.x, whose
 * entry deliberately omits it (Google tunes it for its defaults). This lets a
 * faithfulness-sensitive caller (e.g. simplify) pin a low temperature without
 * violating the Gemini rule.
 *
 * @param {Object} opts  { chain, temperature?, ...any generateText options }
 * @returns {Promise<{ text: string, provider: string|null, result: unknown, error: unknown }>}
 */
export async function generateTextWithFallback({ chain, temperature, ...options }) {
  let lastError = null;

  for (const provider of chain) {
    // Start from the provider's own overrides, then let the caller's temperature
    // replace it — but only when this provider already opts into a temperature,
    // so Gemini (no temperature key) is left untouched.
    const perProvider = { ...(provider.options || {}) };
    if (temperature != null && Object.prototype.hasOwnProperty.call(perProvider, 'temperature')) {
      perProvider.temperature = temperature;
    }

    const providerOptions = provider.providerOptions
      ? { ...(options.providerOptions || {}), ...provider.providerOptions }
      : options.providerOptions;

    try {
      const result = await generateText({
        ...options,
        ...perProvider, // per-provider overrides (temperature, etc.)
        model: provider.model,
        ...(providerOptions ? { providerOptions } : {}),
      });
      const text = (result?.text || '').trim();
      if (text) return { text, provider: provider.name, result, error: null };
      lastError = new Error('Model produced no text output');
    } catch (err) {
      lastError = err;
      console.error(`Provider "${provider.name}" failed, falling back:`, err);
    }
  }

  return { text: '', provider: null, result: null, error: lastError };
}
