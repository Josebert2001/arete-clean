# Tailwind 4 migration

Branch: `chore/tailwind-v4`, based on master `26e24ed20eb4df41bc8c094e5bc4dc82d9003df7`.
The migration is isolated from the career-pathways branch and the other checkout's
unfinished catalogue/content work. Do not merge while visual differences remain
unresolved or unapproved.

## Configuration

- Tailwind and `@tailwindcss/postcss` are 4.3.5. Autoprefixer is no longer a direct dependency.
- `src/styles/tailwind-theme.css` replaces `tailwind.config.js`: cream, paper,
  ink, the coffee ramp, ember, moss, rust, Fraunces, Inter, JetBrains Mono,
  reading sizes, noise texture and animations are configured with `@theme`.
- Colour aliases use `@theme inline` so `.dark` resolves the existing runtime
  RGB channels on each element. The actual light/dark palette in `src/index.css`
  is unchanged. Class-based dark mode and the previous hover behavior remain.
- `src/styles/reading.css` keeps justified reading text before utilities, so
  explicit `text-left` still works.
- `src/styles/tailwind-compat.css` keeps the existing shadow/radius/blur sizes,
  fixed default text line heights, border/placeholder/ring defaults, button
  cursors, native option/table padding and `flex-shrink-0` alias.
- `outline-none` usages become `outline-hidden`, retaining forced-colour focus
  support with the Tailwind 4 utility name.

The split imports in `src/index.css` intentionally keep preflight and utilities
unlayered. Existing authored app CSS relied on the v3 cascade. Simply putting
v4 utilities in a layer lets all unlayered app rules beat them.

`scripts/postcss/preserveUtilityCascade.mjs` runs after Tailwind. It restores the
base-utility → app-style → variant order and lets a responsive text size replace
a preceding base `leading-*`, as v3 did. It also emits direct sRGB alpha values
for the brand channel colours, avoiding an unnecessary Oklab round trip.
Tailwind optimization is disabled at that stage to keep rules separate; Vite
still optimizes the resulting stylesheet. Regression tests compile actual v4
utilities through this pipeline.

Tailwind 4's browser requirements still apply; this is not an older-browser
polyfill. See the official [upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
and [CSS theme documentation](https://tailwindcss.com/docs/theme).

## Visual audit

Before the first application source or dependency change, the clean v3 checkout
was built and captured. The baseline contains 1,428 successful full-page PNGs:
357 URL/account scenarios × two widths × two themes. All 33 App route patterns
are represented, including redirects and not-found screens. The inventory
expands every module, both signed-in course catalogues, every public course
slug, staff/student roles, Premium variants and course-level query variants.

Capture settings:

- Chrome 157.0.8103.38 on Windows; device scale factor 1.
- Viewports: 1366 × 900 and 390 × 844; screenshots extend the full document.
- Light and dark class/OS colour schemes; locale `en-NG`, timezone `Africa/Lagos`.
- Fixed browser time `2026-11-10T10:00:00Z`, seeded randomness, cached Google font
  responses, disabled animation/transition/caret rendering.
- Synthetic local Supabase/API responses, including learner, admin, lecturer and
  course-rep profiles. No live account or service-role credentials are required.
- Identical scenario ordering within each account/viewport/theme group, because
  the app records recently visited learning pages in localStorage.

The missing-track baseline was recaptured in all four combinations after fixing
the runner's mistaken assumption that every screen has an H1. Course/module
headings were checked against their data entries. Later runs also wait for the
baseline heading so a previous route cannot satisfy the readiness check.

The unchanged-code repeat is retained as `before-repeat-*`. A shortened journey
changed the student's Continue card and exposed one stale-heading capture; the
runner was corrected before migration comparisons. Other repeat differences
were tiny raster variations with matching DOM/styles and zero perceptual pixels.
These variations are **not** silently accepted in the final comparison.

The gallery lists every raw difference, with full before/after PNGs and a
magenta highlight for every changed pixel. Raw RGBA equality is primary. Pixelmatch's perceptual count is
additional information, not a threshold that hides changed captures. Dimensions,
page errors, missing images and sampled computed-style changes are reported too.

These are browser-rendered default route states and the listed variants. They
do not cover every tab, modal, quiz attempt or interaction. Live authentication,
payments, AI responses, third-party map tiles and service-worker behavior are
outside this fixture-based screenshot audit. Other browser engines are not
certified by the Chromium captures.

### Final results

The final `after-final` run captured the complete matrix again after the last
fixes; it does not combine screenshots from different builds.

| Check | Result |
| --- | --- |
| Full-page before / final after captures | 1,428 / 1,428 |
| Pixel-identical pairs | 1,080 |
| Pairs with raw pixel differences | 348 across 146 distinct URLs |
| Changed pixels per differing capture | 1–148 |
| Largest channel difference | 15 on the 0–255 channel scale |
| Screenshot dimension changes | 0 |
| Perceptual changed pixels | 0 at Pixelmatch threshold 0.1, excluding antialiasing |
| Missing captures / page errors | 0 / 0 |
| Approval for remaining raw differences | **Pending — do not merge** |

All raw differences remain visible and unapproved, regardless of the perceptual
count. The complete list is committed in `docs/tailwind-v4-visual-differences.csv`,
with summary settings and source fingerprints in `docs/tailwind-v4-visual-audit.json`.
Locally, open `.tailwind-visual.local/captures/index.html` for every scenario and
`after-final-report.html` in that folder for every differing capture. On this
machine the ignored artifact directory points to the original audit folder in
the sibling checkout, preserving the pre-migration evidence.

Validation passed under Node 24.22.2: clean `npm ci --ignore-scripts`, lint,
1,262 tests in 93 files (including three CSS pipeline tests), and the full build
with module validation and 100 prerendered pages. The portable capture tool was
checked against the original runner on the four home-page combinations; all
four PNGs were pixel-identical.

The phone planner has a pre-existing clipped action area in its timetable header,
visible in both baseline and final captures. It remains part of the baseline.

## Repeating the audit

Use Node 24, `npm ci`, and an installed Chrome browser. Keep the same browser and
font-cache directory for both phases. `VISUAL_BROWSER` optionally supplies an
executable path; otherwise Playwright uses the installed Chrome channel.

The committed harness can stay in this migration checkout while
`VISUAL_CHECKOUT` points at a separate v3 baseline worktree. Use one shared
`VISUAL_OUTPUT` directory. Restart the server when changing its checkout path.

Build each revision with the synthetic public environment variables:

```powershell
$env:VITE_SUPABASE_URL='https://visual-fixture.supabase.co'
$env:VITE_SUPABASE_ANON_KEY='visual-fixture-anon-key'
npm run build
node scripts/visual/server.mjs
```

In another terminal, capture the v3 revision before changing styles, then the v4
revision with the same harness, browser, fixture data and cache:

```powershell
node scripts/visual/capture.mjs before
# Rebuild with the migrated sources before capturing after.
node scripts/visual/capture.mjs after
node scripts/visual/compare.mjs after
node scripts/visual/gallery.mjs after
```

The scripts write ignored `.tailwind-visual.local/captures/` and `fonts/` folders.
Open `captures/index.html` for all pages or `captures/after-report.html` for every
remaining difference. Original pre-migration capture tools are also retained
with the local audit artifacts; the committed tools add portable paths and CLI
options without changing the capture fixtures or screenshot settings.

`VISUAL_CHECKOUT` selects another checkout; `VISUAL_OUTPUT` selects the shared
artifact/cache directory; `VISUAL_BASE_URL` defaults to `http://127.0.0.1:5184`.
`VISUAL_WORKERS` defaults to 3. `--smoke`, `VISUAL_LIMIT` and `VISUAL_ONLY` are
diagnostic subsets, never substitutes for the full final matrix. A subset report
explicitly lists the baseline cases it did not capture.

To serve the review gallery locally, set `VISUAL_SERVE_DIR` to the captures folder
and `VISUAL_BASE_URL` to `http://127.0.0.1:5185`, then run `scripts/visual/server.mjs`.
