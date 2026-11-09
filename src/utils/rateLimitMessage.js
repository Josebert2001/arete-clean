const FEATURE_NAMES = {
  tutor: 'AI Tutor', explainer: 'Code Explainer', simplify: 'Simplify',
  summarize: 'Key points', research: 'Explain-this', extract: 'Upload', run: 'Code run',
};

export function rateLimitMessage(endpoint, retryAfter) {
  const key = String(endpoint).split('/').pop();
  const feature = FEATURE_NAMES[key] || 'Request';
  const seconds = Number(retryAfter);
  const minutes = Number.isFinite(seconds) && seconds > 0
    ? Math.max(1, Math.ceil(seconds / 60)) : 10;
  return `${feature} request limit reached. Try again in about ${minutes} minute${minutes === 1 ? '' : 's'}.`;
}
