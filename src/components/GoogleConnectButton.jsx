import { useState } from 'react';
import { Link2, Link2Off, Loader2 } from 'lucide-react';
import { useGoogleConnection } from './useGoogleConnection';

// Small reusable "Connect Google" / "Google connected" control, shared by the
// Planner (Calendar sync) and Course Materials (Drive import) entry points.
export default function GoogleConnectButton({ returnTo, className = '' }) {
  const { connected, configured, loading, connect, disconnect } = useGoogleConnection();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!configured) return null;
  if (loading) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs text-coffee-500 ${className}`}>
        <Loader2 size={12} className="animate-spin" /> Checking Google connection…
      </span>
    );
  }

  async function handleConnect() {
    setBusy(true);
    setError('');
    try {
      await connect(returnTo);
    } catch (err) {
      setError(err?.message ?? 'Could not connect Google.');
      setBusy(false);
    }
  }

  async function handleDisconnect() {
    setBusy(true);
    setError('');
    try {
      await disconnect();
    } catch {
      setError('Could not disconnect. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (connected) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-moss">
          <Link2 size={13} /> Google connected
        </span>
        <button
          type="button"
          onClick={handleDisconnect}
          disabled={busy}
          className="text-xs text-coffee-500 hover:text-rust transition-colors disabled:opacity-50"
        >
          Disconnect
        </button>
        {error && <span className="text-xs text-rust">{error}</span>}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleConnect}
        disabled={busy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-coffee-200 text-xs font-medium text-coffee-700 hover:border-coffee-400 hover:text-ink transition-colors disabled:opacity-50"
      >
        {busy ? <Loader2 size={13} className="animate-spin" /> : <Link2Off size={13} />}
        Connect Google
      </button>
      {error && <span className="text-xs text-rust">{error}</span>}
    </div>
  );
}
