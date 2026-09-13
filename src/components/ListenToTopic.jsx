// ─── "Listen" — the player for a lecture-note topic ──────────────────────────
// A pill that matches the Key points and Plain English buttons above it, which
// expands into a control bar once playback starts. Everything it renders comes
// from useSpeech (playback) and speechText (what there is to say).
//
// Two things here are not decoration:
//
//   The SKIPPED CAPTION. A quarter of these notes is code, equations, tables and
//   figures, and none of it is read aloud. The voice announces each one as it
//   passes ("Code listing on screen — Python, 12 lines"), but a student deciding
//   whether to press play deserves to know that up front rather than discovering
//   it four minutes in.
//
//   The INTERRUPTED NOTICE. Mobile browsers suspend speech synthesis when the
//   screen locks. That is the API's defined behaviour and cannot be worked
//   around (docs/audio-playback-plan.md §4.3), so the one thing we can do is say
//   what happened instead of going quiet and looking broken.

import { useEffect, useMemo, useRef, useState, useId } from 'react';
import { Volume2, Play, Pause, SkipBack, SkipForward, X, Sun } from 'lucide-react';
import { topicToSpeechUnits, canNarrateUnits, skippedIn, describeSkips } from '../utils/speechText';
import { useSpeech, SPEECH_RATES } from './useSpeech';

function formatDuration(seconds) {
  if (seconds < 60) return `${Math.max(1, Math.round(seconds))} sec`;
  return `${Math.round(seconds / 60)} min`;
}

export default function ListenToTopic({ topic, onFinished, onSpeakingOutlineIndex }) {
  const [open, setOpen] = useState(false);
  const voiceSelectId = useId();

  // ONE serialisation per topic, and everything else is derived from it.
  // topicToSpeechUnits is the expensive call — buildOutline, every section, then
  // ~40 pronunciation passes — and the topic-taking forms of the next two each
  // run it again internally, so asking all three cost three full passes per open
  // accordion. "Expand all" on a 26-topic course made that 78.
  const units = useMemo(() => topicToSpeechUnits(topic), [topic]);
  const skips = useMemo(() => describeSkips(skippedIn(units)), [units]);
  const totalSeconds = useMemo(
    () => units.reduce((sum, u) => sum + u.estimatedSeconds, 0),
    [units],
  );
  // Memoised as well as derived: this sits on the render path of every open
  // accordion, so unmemoised it would re-run on every re-render of the notes —
  // a read marker ticking over, a section toggling.
  const narratable = useMemo(() => canNarrateUnits(units, topic), [units, topic]);

  const speech = useSpeech(units, { onFinished });
  const {
    supported, status, playing, paused, interrupted, failed, unitIndex, unitCount,
    play, pause, resume, stop, next, prev, voices, voice, setVoice, rate, setRate,
    keepAwake, setKeepAwake, wakeLockSupported,
  } = speech;

  // Tell the page which outline item the voice is on, so the section being read
  // can be marked on screen. Only while actually PLAYING: a paused or finished
  // player should not leave a section lit as though it were still being spoken.
  //
  // Reported upward rather than highlighted from in here because the sections
  // are the parent's to render — this component sits above them, not around
  // them. Must run before the early return below, like any other hook.
  const speakingOutlineIndex = playing ? (units[unitIndex]?.outlineIndex ?? null) : null;

  // Through a ref, so a parent that passes a fresh arrow every render does not
  // turn this into a report on every render — the same reason useSpeech holds
  // onFinished in finishedRef rather than depending on its identity.
  const reportRef = useRef(onSpeakingOutlineIndex);
  useEffect(() => { reportRef.current = onSpeakingOutlineIndex; }, [onSpeakingOutlineIndex]);
  useEffect(() => { reportRef.current?.(speakingOutlineIndex); }, [speakingOutlineIndex]);
  // Collapsing the topic must clear the highlight it left behind.
  useEffect(() => () => reportRef.current?.(null), []);

  // Nothing to offer: no Web Speech API, or a topic that is listings with a
  // sentence of glue (see MIN_NARRATE_CHARS — narrating one of those is a few
  // seconds of "code listing on screen" repeated).
  if (!supported || !narratable || unitCount === 0) return null;

  const englishVoices = voices.filter((v) => /^en([-_]|$)/i.test(v.lang || ''));

  const start = () => { setOpen(true); play(0); };
  const close = () => { stop(); setOpen(false); };
  const cycleRate = () => {
    const i = SPEECH_RATES.indexOf(rate);
    setRate(SPEECH_RATES[(i + 1) % SPEECH_RATES.length]);
  };

  if (!open) {
    return (
      <div className="flex justify-end mb-3">
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-1.5 rounded-full border border-coffee-200 bg-paper px-3 py-1.5 text-xs font-mono font-medium text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink"
        >
          <Volume2 size={12} className="text-ember-500" />
          Listen · {formatDuration(totalSeconds)}
        </button>
      </div>
    );
  }

  const current = units[unitIndex];

  return (
    <div
      role="group"
      aria-label="Listen to this topic"
      className="rounded-xl border border-coffee-200 bg-coffee-50 p-3 mb-4"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={prev}
          disabled={unitIndex === 0}
          aria-label="Previous section"
          className="rounded-full border border-coffee-200 bg-paper p-1.5 text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink disabled:opacity-40"
        >
          <SkipBack size={14} />
        </button>

        <button
          type="button"
          // From 'ended', unitIndex is the LAST section: replaying from there
          // gave the student the closing paragraph again, and because it did not
          // start at 0 the run counted as unclean, so finishing it never marked
          // the topic read. Play on a finished topic means play the topic.
          onClick={playing ? pause : (paused ? resume : () => play(status === 'ended' ? 0 : unitIndex))}
          aria-label={playing ? 'Pause' : 'Play'}
          className="rounded-full border border-ember-500/40 bg-ember-500/10 p-2 text-ember-500 transition-colors hover:bg-ember-500/20"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          type="button"
          onClick={next}
          disabled={unitIndex >= unitCount - 1}
          aria-label="Next section"
          className="rounded-full border border-coffee-200 bg-paper p-1.5 text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink disabled:opacity-40"
        >
          <SkipForward size={14} />
        </button>

        <span className="text-xs font-mono text-coffee-500 shrink-0">
          {unitIndex + 1}/{unitCount}
        </span>

        <span className="flex-1 min-w-0 text-xs text-coffee-600 truncate">
          {current?.heading || topic.title}
        </span>

        <button
          type="button"
          onClick={cycleRate}
          aria-label={`Playback speed, currently ${rate} times`}
          className="rounded-full border border-coffee-200 bg-paper px-2.5 py-1 text-xs font-mono font-medium text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink shrink-0"
        >
          {rate}×
        </button>

        {/* Opt-in and off by default — a wake lock costs battery, and it only
            helps the student who is reading along. It does nothing for a phone
            in a pocket, which is the case this whole option cannot serve. */}
        {wakeLockSupported && (
          <button
            type="button"
            onClick={() => setKeepAwake(!keepAwake)}
            aria-pressed={keepAwake}
            aria-label="Keep the screen on while listening"
            title="Keep the screen on while listening"
            className={`rounded-full border p-1.5 transition-colors shrink-0 ${
              keepAwake
                ? 'border-ember-500/40 bg-ember-500/10 text-ember-500'
                : 'border-coffee-200 bg-paper text-coffee-500 hover:border-coffee-400 hover:text-ink'
            }`}
          >
            <Sun size={14} />
          </button>
        )}

        {/* Only worth showing when the device actually offers a choice. */}
        {englishVoices.length > 1 && (
          <>
            <label htmlFor={voiceSelectId} className="sr-only">Voice</label>
            <select
              id={voiceSelectId}
              value={voice?.name ?? ''}
              onChange={(e) => setVoice(e.target.value)}
              className="rounded-full border border-coffee-200 bg-paper px-2 py-1 text-xs font-mono text-coffee-600 max-w-[8rem] shrink-0"
            >
              {englishVoices.map((v) => (
                <option key={v.name} value={v.name}>{v.name}</option>
              ))}
            </select>
          </>
        )}

        <button
          type="button"
          onClick={close}
          aria-label="Stop and close"
          className="rounded-full border border-coffee-200 bg-paper p-1.5 text-coffee-500 transition-colors hover:border-rust/40 hover:text-rust shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {/* What the voice will announce but not read. Said before the student has
          invested ten minutes in finding out. */}
      {skips.text && (
        <p className="mt-2 text-xs text-coffee-500">
          {skips.text} {skips.total === 1 ? 'is' : 'are'} announced, not read aloud — {skips.total === 1 ? 'it stays' : 'they stay'} on screen.
        </p>
      )}

      {/* Neither of these is a student-initiated pause, and they have different
          remedies — one is the platform suspending synthesis on screen lock, the
          other is a voice that cannot speak at all.

          The live region is mounted UNCONDITIONALLY and only its text changes.
          A screen reader announces updates to a region it was already watching;
          one that appears with its message already in it is usually missed
          entirely, which defeats the point of saying anything. */}
      <p aria-live="polite" className={failed || interrupted ? 'mt-2 text-xs text-rust' : 'sr-only'}>
        {failed
          ? 'This device could not play the audio. Try a different voice, if it offers one.'
          : interrupted
            ? 'Paused — audio stops when the screen locks or you switch apps. Press play to carry on.'
            : ''}
      </p>
    </div>
  );
}
