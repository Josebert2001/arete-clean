// ============================================================================
//  Arete — multi-provider model chain with automatic fallback
//  Shared by the AI endpoints so provider selection lives in ONE place.
//
//  Order (for the agentic tutor, which needs tool calling):
//    1. Gemini 3.1 Flash-Lite — a GA model that's on Google's free tier (15 RPM,
//       1,500 req/day), supports tools, defaults to `minimal` thinking (fast +
//       cheap), and is the cheapest Gemini if you ever exceed the free tier.
//       Its generous limits mean the requests that 413 Groq's 8K/req cap fit here.
//    2. Groq gpt-oss-120b — fast fallback.
//    3. OpenRouter's free router — best-effort last resort (no SLA; free models
//       can be slow/removed). `openrouter/free` auto-selects a free model that
//       supports the requested features, including tool calling.
//
//  NOTE: Gemini 3.x is a reasoning model tuned for its defaults — Google
//  recommends NOT sending temperature/top_p/top_k. So temperature is set
//  per-provider (Groq/OpenRouter) via `options`, and omitted for Gemini.
//
//  Each provider is included only when its key is set, so the app degrades
//  gracefully and you can run locally with just one key.
// ============================================================================

import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// Build the ordered provider chain from whatever keys are configured.
export function buildModelChain() {
  const chain = [];

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (geminiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    // No temperature/top_p/top_k — Gemini 3.x is optimized for its defaults.
    // Leaving thinkingLevel unset uses flash-lite's `minimal` default (fast).
    chain.push({ name: 'gemini', model: google('gemini-3.1-flash-lite') });
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
 * @returns {Promise<{ wroteText: boolean, provider: string|null, error: unknown }>}
 */
export async function streamTextWithFallback({ chain, ...options }, onText) {
  let lastError = null;

  for (const provider of chain) {
    let capturedError = null;
    let wroteText = false;

    const providerOptions = provider.providerOptions
      ? { ...(options.providerOptions || {}), ...provider.providerOptions }
      : options.providerOptions;

    const result = streamText({
      ...options,
      ...(provider.options || {}), // per-provider overrides (e.g. temperature)
      model: provider.model,
      ...(providerOptions ? { providerOptions } : {}),
      onError: ({ error }) => { capturedError = error; },
    });

    try {
      for await (const chunk of result.textStream) {
        if (chunk) { onText(chunk); wroteText = true; }
      }
    } catch (err) {
      // Some provider errors surface as a throw here rather than via onError.
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
