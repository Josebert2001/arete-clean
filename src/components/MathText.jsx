import { useState, useEffect, useMemo } from 'react';
import { parseMathSegments } from '../utils/mathText';
import { loadKatex, getLoadedKatex } from '../utils/katexLoader';

// Renders lecture-note maths. Authors write inline maths as $...$ inside any
// ordinary string, and standalone equations as a `math` section.
//
// Strings with no $ never touch KaTeX and render byte-identically to before,
// so adding this to the shared section components can't change how the
// existing non-maths courses look.

function useKatex(needed) {
  const [katex, setKatex] = useState(getLoadedKatex);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!needed || katex) return undefined;
    let alive = true;
    loadKatex().then(
      (mod) => { if (alive) setKatex(() => mod); },
      () => { if (alive) setFailed(true); }
    );
    return () => { alive = false; };
  }, [needed, katex]);

  return { katex, failed };
}

// Renders one TeX expression. Falls back to showing the source — never a blank
// space — whether the failure is a bad expression or KaTeX not loading.
function Katex({ tex, display }) {
  const { katex, failed } = useKatex(true);

  const result = useMemo(() => {
    if (!katex) return null;
    try {
      return { html: katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'ignore' }) };
    } catch (err) {
      return { error: err?.message || 'Invalid LaTeX' };
    }
  }, [katex, tex, display]);

  // Loading, or the chunk failed: show the TeX source so the content stays
  // readable. `failed` is styled as an error so a broken deploy is visible.
  if (!result) {
    return (
      <code className={`font-mono text-[0.9em] ${failed ? 'text-rust' : 'text-coffee-500'}`}>
        {tex}
      </code>
    );
  }

  // A malformed expression is an authoring bug — surface it in review colours
  // rather than swallowing it into an empty span.
  if (result.error) {
    return (
      <code className="font-mono text-[0.9em] text-rust bg-rust/10 px-1 rounded" title={result.error}>
        {tex}
      </code>
    );
  }

  // KaTeX escapes its input and, with `trust` left at its default of false,
  // refuses to emit \href/\url — so its output carries no author-supplied
  // markup. The TeX itself comes from this repo, not from user input.
  return <span dangerouslySetInnerHTML={{ __html: result.html }} />;
}

/** A single inline expression, for callers that already have bare TeX. */
export function InlineMath({ tex }) {
  return <Katex tex={tex} display={false} />;
}

/** A centred display equation — the `math` lecture-note section type. */
export function MathBlock({ tex, caption }) {
  return (
    <div className="mb-5">
      {/* Long derivations must scroll inside the box rather than stretch the page */}
      <div className="overflow-x-auto rounded-xl border border-coffee-200 bg-coffee-50/60 px-5 py-4 text-center text-ink">
        <Katex tex={tex} display />
      </div>
      {caption && (
        <p className="mt-2 text-xs font-mono text-coffee-500 text-center">
          {/* Captions carry equation labels and asides that often need maths of
              their own, so they go through MathText like every other string. */}
          <MathText text={caption} />
        </p>
      )}
    </div>
  );
}

/** A lecture-note string, with any $...$ spans rendered as maths. */
export default function MathText({ text }) {
  const segments = useMemo(() => parseMathSegments(text), [text]);
  const hasMath = useMemo(() => segments.some((s) => s.type === 'math'), [segments]);

  if (!hasMath) return <>{text}</>;

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === 'math'
          ? <InlineMath key={i} tex={seg.value} />
          : <span key={i}>{seg.value}</span>
      )}
    </>
  );
}
