import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

// ─── "Install Areté" ──────────────────────────────────────────────────────────
// Chromium fires `beforeinstallprompt` once the app meets its install criteria
// (HTTPS, a linked manifest, 192px + 512px icons, and a service worker with a
// fetch handler — the last of which Areté only gained with the offline work).
//
// That event is the only handle on the install dialog: it cannot be summoned
// later from a click on its own, so we capture it, keep it, and spend it when
// the student actually asks. Until one arrives there is nothing to offer and
// the button renders nothing — which is also what happens in Safari, where the
// event does not exist at all and installing means Share → Add to Home Screen,
// a flow no API can open. A button that cannot deliver would be worse than no
// button, so on iOS there isn't one.

// Already installed? Then the browser is running us from the home screen and
// there is nothing left to offer. `navigator.standalone` is the iOS spelling.
function isInstalled() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(display-mode: standalone)').matches === true
    || window.navigator.standalone === true;
}

export default function InstallAppButton({ className = '' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(isInstalled);

  useEffect(() => {
    const onBeforeInstallPrompt = (e) => {
      // Chrome shows its own mini-infobar unless the event is cancelled.
      // Cancelling moves the timing under our control so the offer appears in
      // the nav, beside the other controls, instead of over the page.
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    // The event is single-use whichever way the student answers. Drop it either
    // way: Chrome issues a fresh one on a later visit if they stay eligible,
    // and reusing a spent event throws.
    try {
      await deferredPrompt.userChoice;
    } finally {
      setDeferredPrompt(null);
    }
  };

  if (installed || !deferredPrompt) return null;

  return (
    <button
      type="button"
      onClick={install}
      // The label is icon-only below lg, so name the button explicitly rather
      // than leaning on text that isn't always rendered.
      aria-label="Install Areté"
      title="Install Areté"
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2.5 text-ink transition-colors hover:bg-coffee-100 ${className}`}
    >
      <Download size={20} aria-hidden="true" />
      <span className="hidden text-sm font-medium lg:inline">Install</span>
    </button>
  );
}
