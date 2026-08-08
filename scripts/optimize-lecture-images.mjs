#!/usr/bin/env node
/**
 * Convert lecture-note figures to web-ready WebP.
 *
 * Lecture-note images (see `type: 'image'` sections in src/data/) are diagrams
 * exported from lecturers' documents — usually oversized flat-colour PNGs. This
 * downscales them to a sane display width and re-encodes as WebP, trying both
 * lossless and high-quality lossy and keeping whichever comes out smaller.
 *
 * Neither mode wins across the board: untouched flat-colour diagrams compress
 * best losslessly, but once an image is downscaled the resampling introduces
 * anti-aliased gradients that lossless handles badly, and q90 wins by ~40%
 * with no visible artefacts on diagram text.
 *
 * It prints the final pixel dimensions of each file, which are what the
 * `width`/`height` props on an `image` section need so the browser can reserve
 * aspect-ratio space and avoid layout shift.
 *
 * sharp is deliberately NOT a tracked devDependency. It ships ~30 platform
 * binaries whose optional sub-trees do not survive a lockfile generated on a
 * different OS, which breaks `npm ci` on CI. This script runs about once per
 * lecture manual, so install it on demand and drop it again afterwards:
 *
 *   npm i --no-save sharp
 *   node scripts/optimize-lecture-images.mjs ./raw public/lecture-notes/cyb-221 1400
 *
 * Usage:
 *   node scripts/optimize-lecture-images.mjs <srcDir> <destDir> [maxWidth]
 */
import fs from 'node:fs/promises';
import path from 'node:path';

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.error(
    'This script needs sharp, which is not a tracked dependency.\n' +
      'Install it just for this run with:  npm i --no-save sharp'
  );
  process.exit(1);
}

const [srcDir, destDir, maxWidthArg] = process.argv.slice(2);

if (!srcDir || !destDir) {
  console.error('Usage: node scripts/optimize-lecture-images.mjs <srcDir> <destDir> [maxWidth]');
  process.exit(1);
}

const maxWidth = Number(maxWidthArg) || 1400;
if (!Number.isFinite(maxWidth) || maxWidth <= 0) {
  console.error(`Invalid maxWidth: ${maxWidthArg}`);
  process.exit(1);
}

const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.tif', '.tiff']);

await fs.mkdir(destDir, { recursive: true });

const entries = (await fs.readdir(srcDir)).filter((f) => SOURCE_EXT.has(path.extname(f).toLowerCase())).sort();

if (entries.length === 0) {
  console.error(`No images found in ${srcDir}`);
  process.exit(1);
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of entries) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, `${path.basename(file, path.extname(file))}.webp`);

  const { width } = await sharp(srcPath).metadata();

  // Only ever downscale — upscaling a diagram just wastes bytes.
  const load = () => (width > maxWidth ? sharp(srcPath).resize({ width: maxWidth }) : sharp(srcPath));

  const [lossless, lossy] = await Promise.all([
    load().webp({ lossless: true, effort: 6 }).toBuffer(),
    load().webp({ quality: 90, effort: 6 }).toBuffer(),
  ]);

  const winner = lossless.length <= lossy.length ? lossless : lossy;
  const mode = winner === lossless ? 'lossless' : 'q90';
  await fs.writeFile(destPath, winner);

  const before = (await fs.stat(srcPath)).size;
  const { width: w, height: h } = await sharp(winner).metadata();

  totalBefore += before;
  totalAfter += winner.length;

  const pct = Math.round((1 - winner.length / before) * 100);
  console.log(
    `${path.basename(destPath).padEnd(28)} ${String(w).padStart(5)}x${String(h).padEnd(5)}  ` +
      `${(before / 1024).toFixed(0).padStart(5)}KB -> ${(winner.length / 1024).toFixed(0).padStart(5)}KB  ` +
      `(-${pct}%, ${mode})`
  );
}

console.log(
  `\n${entries.length} images: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB ` +
    `(-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
);
