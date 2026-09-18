// ─── "Listen" — the player for a lecture-note topic ──────────────────────────
// A pill that matches the Key points and Plain English buttons above it, which
// expands into a control bar once playback starts. Everything it renders comes
// from useSpeech (playback) and speechText (what there is to say).
//
// Five things here are not decoration:
//
//   The KARAOKE CAPTION. The section-level wash says which paragraph the voice
//   is in; this says which word, live, in a caption line reading useSpeech's own
//   utterance text — never the displayed note — so it cannot drift out of sync
//   with what is actually heard. Word-accurate only where the engine reports
//   `boundary` events (Chrome, Edge); Safari fires none, so there the caption
//   still tracks the chunk but nothing inside it is picked out.
//
//   The SKIPPED CAPTION. A quarter of these notes is code, equations, tables and
//   figures, and none of it is read aloud. The voice announces each one as it
//   passes ("Code listing on screen — Python, 12 lines"), but a student deciding
//   whether to press play deserves to know that up front rather than discovering
//   it four minutes in.
//
//   The INTERRUPTED NOTICE. Mobile browsers suspend speech synthesis when the
//   screen locks. That is the API's defined behaviour and cannot be worked
//   around (docs/audio-playback-plan.md §4.3). useSpeech now tries to carry on
//   by itself when the page comes back, so this notice is what is left when even
//   that is refused — the honest end of the road, not the first response.
//
//   The DOCKED BAR. The control bar sits at the top of the topic, and a topic is
//   several screens long: by the time the voice is halfway through it, pausing
//   meant scrolling back up to find the buttons. So once the real bar scrolls
//   off, a compact copy of the transport docks to the bottom of the window. It
//   is the same player — same hook, same state — not a second one.
//
//   The FOLLOW TOGGLE. The wash that marks the section being read is no use if
//   it is two screens below where the student is looking. The page itself does
//   the scrolling (it owns the sections); this only carries the preference, and
//   reports it upward alongside the section index.

import { useEffect, useMemo, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, Play, Pause, SkipBack, SkipForward, X, Sun, LocateFixed } from 'lucide-react';
import MathText from './MathText';
import { topicToSpeechUnits, canNarrateUnits, skippedIn, describeSkips } from '../utils/speechText';
import { useSpeech, SPEECH_RATES, readSpeechPref, writeSpeechPref } from './useSpeech';

const FOLLOW_PREF_KEY = 'arete:speech:follow';

// Follow is ONE setting shared by every player on the page, and LectureNotes
// keeps a player mounted per open topic — so the toggle has to reach all of
// them, not just the bar it was clicked in. Reading the preference at mount left
// a second, already-open topic reporting `follow: true` after the student had
// turned it off in the first, and scrolling the page for a setting that was
// saved as off. `storage` events are no use here: they fire in OTHER tabs only.
const followListeners = new Set();

function formatDuration(seconds) {
  if (seconds < 60) return `${Math.max(1, Math.round(seconds))} sec`;
  return `${Math.round(seconds / 60)} min`;
}

// Prev / play / next / position — the four controls that have to be reachable
// wherever the student is on the page. Shared so the docked copy cannot drift
// from the real bar; the speed, voice and wake-lock controls stay in the real
// bar only, because a docked bar has to stay one line on a phone.
function Transport({ playing, onPlayPause, onPrev, onNext, atStart, atEnd, position, compact = false }) {
  const pad = compact ? 'p-1' : 'p-1.5';
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={atStart}
        aria-label="Previous section"
        className={`shrink-0 rounded-full border border-coffee-200 bg-paper ${pad} text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink disabled:opacity-40`}
      >
        <SkipBack size={14} />
      </button>

      <button
        type="button"
        onClick={onPlayPause}
        aria-label={playing ? 'Pause' : 'Play'}
        className={`shrink-0 rounded-full border border-ember-500/40 bg-ember-500/10 ${compact ? 'p-1.5' : 'p-2'} text-ember-500 transition-colors hover:bg-ember-500/20`}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={atEnd}
        aria-label="Next section"
        className={`shrink-0 rounded-full border border-coffee-200 bg-paper ${pad} text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink disabled:opacity-40`}
      >
        <SkipForward size={14} />
      </button>

      <span className="text-xs font-mono text-coffee-500 shrink-0">{position}</span>
    </>
  );
}

export default function ListenToTopic({ topic, onFinished, onSpeakingOutlineIndex }) {
  const [open, setOpen] = useState(false);
  const voiceSelectId = useId();
  // Whether the real control bar is on screen. Starts true so a browser without
  // IntersectionObserver (an old WebView, jsdom) simply never docks, rather than
  // docking permanently.
  const [barOnScreen, setBarOnScreen] = useState(true);
  const [follow, setFollowState] = useState(() => readSpeechPref(FOLLOW_PREF_KEY, '1') !== '0');
  const barRef = useRef(null);

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
    supported, status, playing, paused, interrupted, failed, caption, unitIndex, unitCount,
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
  // `follow` rides along with the index rather than being plumbed separately:
  // the page needs both at the same moment and neither means anything without
  // the other. Re-reported when the toggle changes so turning it on takes the
  // student to the voice now, not at the next section.
  useEffect(() => {
    reportRef.current?.(speakingOutlineIndex, { follow });
  }, [speakingOutlineIndex, follow]);
  // Collapsing the topic must clear the highlight it left behind.
  useEffect(() => () => reportRef.current?.(null, { follow: false }), []);

  useEffect(() => {
    followListeners.add(setFollowState);
    return () => { followListeners.delete(setFollowState); };
  }, []);

  // Dock the transport once the real bar has scrolled away. Watching the bar
  // itself rather than the topic panel: the bar is what the student is looking
  // for, and the panel is several screens tall, so a panel-level test would dock
  // nothing until the whole topic had gone.
  useEffect(() => {
    const el = barRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setBarOnScreen(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  // The campus-map and help buttons are `fixed` in the two bottom corners at
  // z-50, which on a phone is exactly where the docked bar's transport and close
  // controls are. They step up out of the way while it is there — see
  // `.docked-player-open` in index.css. A class on <html> rather than a prop
  // because neither button knows this component exists, and neither should.
  // 'ended' belongs here as much as playing and paused do: a topic that finished
  // while the student was reading further down left them with no Play and no
  // Previous until they scrolled back up, which is the complaint this docked bar
  // exists to answer. 'idle' does not — that is a player another topic has stood
  // down, and docking it would put two bars on the same edge of the window.
  const docked = open && !barOnScreen && (playing || paused || status === 'ended');
  useEffect(() => {
    if (!docked) return undefined;
    const root = document.documentElement;
    root.classList.add('docked-player-open');
    return () => root.classList.remove('docked-player-open');
  }, [docked]);

  // Nothing to offer: no Web Speech API, or a topic that is listings with a
  // sentence of glue (see MIN_NARRATE_CHARS — narrating one of those is a few
  // seconds of "code listing on screen" repeated).
  if (!supported || !narratable || unitCount === 0) return null;

  const englishVoices = voices.filter((v) => /^en([-_]|$)/i.test(v.lang || ''));

  const start = () => { setOpen(true); play(0); };
  // `barOnScreen` has to go back to true here, not just `open` to false. Closing
  // from the DOCKED bar means closing while the real one is off screen, and the
  // observer's first callback after the next Listen is a frame or two away — so
  // the reopened player rendered a docked bar at the bottom of the window, and
  // shoved the floating buttons up, before correcting itself.
  const close = () => { stop(); setOpen(false); setBarOnScreen(true); };
  const cycleRate = () => {
    const i = SPEECH_RATES.indexOf(rate);
    setRate(SPEECH_RATES[(i + 1) % SPEECH_RATES.length]);
  };
  // Through the broadcast rather than straight to state, so this player is
  // updated by the same path as every other one — there is no case where the bar
  // that was clicked and the bars that were not can disagree.
  const setFollow = (value) => {
    writeSpeechPref(FOLLOW_PREF_KEY, value ? '1' : '0');
    for (const listener of followListeners) listener(value);
  };
  // From 'ended', unitIndex is the LAST section: replaying from there gave the
  // student the closing paragraph again, and because it did not start at 0 the
  // run counted as unclean, so finishing it never marked the topic read. Play on
  // a finished topic means play the topic.
  const playPause = () => {
    if (playing) pause();
    else if (paused) resume();
    else play(status === 'ended' ? 0 : unitIndex);
  };

  // Rendered in BOTH states. Living only inside the expanded bar defeated its
  // entire purpose: the point of this line is that a student deciding whether to
  // press play knows what will not be read to them, rather than finding out four
  // minutes in. It has to be readable before the first click.
  const skippedCaption = skips.text ? (
    <p className="mt-2 text-xs text-coffee-500">
      {skips.text} {skips.total === 1 ? 'is' : 'are'} announced, not read aloud — {skips.total === 1 ? 'it stays' : 'they stay'} on screen.
    </p>
  ) : null;

  if (!open) {
    return (
      <div className="mb-3">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-1.5 rounded-full border border-coffee-200 bg-paper px-3 py-1.5 text-xs font-mono font-medium text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink"
          >
            <Volume2 size={12} className="text-ember-500" />
            Listen · {formatDuration(totalSeconds)}
          </button>
        </div>
        {skippedCaption && <div className="text-right">{skippedCaption}</div>}
      </div>
    );
  }

  const current = units[unitIndex];
  const heading = <MathText text={current?.heading || topic.title} />;
  const transport = (
    <Transport
      playing={playing}
      onPlayPause={playPause}
      onPrev={prev}
      onNext={next}
      atStart={unitIndex === 0}
      atEnd={unitIndex >= unitCount - 1}
      position={`${unitIndex + 1}/${unitCount}`}
    />
  );

  return (
    <>
      <div
        ref={barRef}
        role="group"
        aria-label="Listen to this topic"
        className="rounded-xl border border-coffee-200 bg-coffee-50 p-3 mb-4"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {transport}

          {/* Through MathText, like the headings in the notes themselves. These
              are the same strings — MTH 121 has seven carrying inline maths — so
              printed raw the player showed "Integrating powers of $x$" while the
              section above it read properly. */}
          <span className="flex-1 min-w-0 text-xs text-coffee-600 truncate">
            {heading}
          </span>

          {/* On by default. The wash marking the section being read is the whole
              point of following along, and on a phone it is usually a screen and
              a half below the player by the time the voice gets there. */}
          <button
            type="button"
            onClick={() => setFollow(!follow)}
            aria-pressed={follow}
            aria-label="Scroll to the section being read"
            title="Scroll to the section being read"
            className={`rounded-full border p-1.5 transition-colors shrink-0 ${
              follow
                ? 'border-ember-500/40 bg-ember-500/10 text-ember-500'
                : 'border-coffee-200 bg-paper text-coffee-500 hover:border-coffee-400 hover:text-ink'
            }`}
          >
            <LocateFixed size={14} />
          </button>

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

        {/* Karaoke caption — the chunk actually being spoken, with the exact word
            the engine just reported lit up. It reads useSpeech's own utterance
            text, not the note on screen: the same words, but letter-spaced
            acronyms and skip markers included, exactly as heard. That is what
            keeps it perfectly in sync with no mapping back to the rendered note
            to maintain — the section-level wash above already marks *where* in
            the notes the voice is; this says exactly *what* it is saying right
            now. `caption.start === -1` is a chunk that has started but has not
            had its first word boundary yet (always true on Safari, which fires
            none at all) — shown plain, with nothing picked out. Hidden from
            assistive tech: the same words are already in the document as the
            actual note text, so a screen reader repeating this every few hundred
            milliseconds would just be noise. */}
        {caption && (
          <p aria-hidden="true" className="mt-3 rounded-lg border border-coffee-200 bg-paper px-3 py-2 text-sm leading-relaxed text-coffee-600">
            {caption.start >= 0 ? (
              <>
                {caption.text.slice(0, caption.start)}
                <span className="rounded bg-ember-500/20 px-0.5 font-semibold text-ink">
                  {caption.text.slice(caption.start, caption.end)}
                </span>
                {caption.text.slice(caption.end)}
              </>
            ) : caption.text}
          </p>
        )}

        {/* What the voice will announce but not read — the same line the collapsed
            pill shows, so it does not appear to change on opening. */}
        {skippedCaption}

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

      {/* Through a portal, not just `position: fixed`: a fixed element is
          positioned against the nearest ancestor with a transform or a filter,
          and the notes are full of animated panels. The body has no such
          ancestor by definition. */}
      {docked && createPortal(
        <div
          role="group"
          aria-label="Listen controls"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-coffee-200 bg-paper/95 px-4 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <Transport
              playing={playing}
              onPlayPause={playPause}
              onPrev={prev}
              onNext={next}
              atStart={unitIndex === 0}
              atEnd={unitIndex >= unitCount - 1}
              position={`${unitIndex + 1}/${unitCount}`}
              compact
            />
            {/* Which topic, not just which section — several can be open at
                once, and a bar with no name on it is a bar you do not trust. */}
            <span className="flex-1 min-w-0 truncate text-xs text-coffee-600">
              <span className="font-mono text-coffee-500">Topic {topic.number} · </span>
              {heading}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Stop and close"
              className="shrink-0 rounded-full border border-coffee-200 bg-paper p-1.5 text-coffee-500 transition-colors hover:border-rust/40 hover:text-rust"
            >
              <X size={14} />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
