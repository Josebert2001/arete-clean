import { useEffect } from 'react';
import { RefreshCw, WifiOff, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

// ─── Service-worker registration + update UX ──────────────────────────────────
// Registers the SW (registerType 'prompt', see vite.config.js) and surfaces the
// two moments a PWA must communicate: a waiting new version ("Reload") and a
// one-time "ready to work offline" notice. Mounts once, high in App.jsx, and
// renders null until there is something to say.

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // hourly
const OFFLINE_NOTICE_MS = 6000;

export default function PWAUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // Installed apps stay open for days — poll so an update is noticed without
    // waiting for a fresh launch. registration is undefined if support is off.
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      setInterval(() => { registration.update(); }, UPDATE_CHECK_INTERVAL);
    },
  });

  useEffect(() => {
    if (!offlineReady) return undefined;
    const t = setTimeout(() => setOfflineReady(false), OFFLINE_NOTICE_MS);
    return () => clearTimeout(t);
  }, [offlineReady, setOfflineReady]);

  if (!needRefresh && !offlineReady) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[70] mx-auto flex max-w-md items-center gap-3 rounded-xl border border-coffee-200 bg-paper px-4 py-3 shadow-xl animate-fade-in"
    >
      {needRefresh ? (
        <>
          <RefreshCw size={16} className="shrink-0 text-ember-500" aria-hidden="true" />
          <p className="flex-1 text-sm text-coffee-700">A new version of Areté is available.</p>
          <button
            onClick={() => updateServiceWorker(true)}
            className="shrink-0 rounded-lg bg-ink px-3 py-1.5 text-sm font-semibold text-cream transition-colors hover:bg-coffee-700"
          >
            Reload
          </button>
          <button
            onClick={() => setNeedRefresh(false)}
            aria-label="Dismiss update notice"
            className="shrink-0 text-coffee-500 transition-colors hover:text-ink"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <>
          <WifiOff size={16} className="shrink-0 text-moss" aria-hidden="true" />
          <p className="flex-1 text-sm text-coffee-700">Areté is ready to work offline.</p>
          <button
            onClick={() => setOfflineReady(false)}
            aria-label="Dismiss offline notice"
            className="shrink-0 text-coffee-500 transition-colors hover:text-ink"
          >
            <X size={16} />
          </button>
        </>
      )}
    </div>
  );
}
