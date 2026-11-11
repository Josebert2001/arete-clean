const log = value => process.stdout.write(String(value) + String.fromCharCode(10));
import fs from 'node:fs/promises';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const directory = path.join(path.resolve(process.env.VISUAL_OUTPUT || '.tailwind-visual.local'), 'captures');
const phase = process.argv[2] || 'after';
const baselinePhase = process.argv[3] || 'before';
const baseline = JSON.parse(await fs.readFile(path.join(directory, `${baselinePhase}-results.json`), 'utf8'));
const candidate = JSON.parse(await fs.readFile(path.join(directory, `${phase}-results.json`), 'utf8'));
const beforeByKey = new Map(baseline.results.map(item => [item.key, item]));
const results = [];
await fs.mkdir(path.join(directory, `${phase}-diff`), { recursive: true });
const pad = (png, width, height) => {
  if (png.width === width && png.height === height) return png;
  const output = new PNG({ width, height });
  output.data.fill(255);
  PNG.bitblt(png, output, 0, 0, png.width, png.height, 0, 0);
  return output;
};
for (const after of candidate.results) {
  const before = beforeByKey.get(after.key);
  if (!before) throw new Error(`Capture lacks a baseline: ${after.key}`);
  const row = { key: after.key, url: after.url, actor: after.actor, width: after.width, theme: after.theme, state: after.state, errors: after.errors, pixels: 0, perceptualPixels: 0, geometryChanged: false, styleChanges: [] };
  try {
    const [rawA, rawB] = await Promise.all([fs.readFile(path.join(directory, baselinePhase, before.file)), fs.readFile(path.join(directory, phase, after.file))]);
    if (!rawA.equals(rawB)) {
      let a = PNG.sync.read(rawA), b = PNG.sync.read(rawB);
      row.beforeSize = [a.width, a.height]; row.afterSize = [b.width, b.height];
      row.geometryChanged = a.width !== b.width || a.height !== b.height;
      const width = Math.max(a.width, b.width), height = Math.max(a.height, b.height);
      a = pad(a, width, height); b = pad(b, width, height);
      const diff = new PNG({ width, height });
      row.maxChannelDelta = 0;
      let minX = width, minY = height, maxX = -1, maxY = -1;
      for (let offset = 0; offset < a.data.length; offset += 4) {
        const delta = Math.max(
          Math.abs(a.data[offset] - b.data[offset]),
          Math.abs(a.data[offset+1] - b.data[offset+1]),
          Math.abs(a.data[offset+2] - b.data[offset+2]),
          Math.abs(a.data[offset+3] - b.data[offset+3]),
        );
        if (delta) {
          row.pixels++;
          row.maxChannelDelta = Math.max(row.maxChannelDelta, delta);
          const pixel = offset / 4, x = pixel % width, y = Math.floor(pixel / width);
          minX = Math.min(minX, x); maxX = Math.max(maxX, x);
          minY = Math.min(minY, y); maxY = Math.max(maxY, y);
          diff.data[offset] = 255; diff.data[offset+1] = 0; diff.data[offset+2] = 128;
        } else {
          const grey = Math.round(255 - (255 - (a.data[offset]*0.2126 + a.data[offset+1]*0.7152 + a.data[offset+2]*0.0722)) * 0.2);
          diff.data[offset] = grey; diff.data[offset+1] = grey; diff.data[offset+2] = grey;
        }
        diff.data[offset+3] = 255;
      }
      row.ratio = row.pixels / (width * height);
      if (row.pixels) {
        row.rawBounds = [minX, minY, maxX, maxY];
        row.perceptualPixels = pixelmatch(a.data, b.data, null, width, height, { threshold: 0.1, includeAA: false });
        await fs.writeFile(path.join(directory, `${phase}-diff`, after.file), PNG.sync.write(diff));
        const [stylesA, stylesB] = await Promise.all([fs.readFile(path.join(directory, baselinePhase, `${before.key}.json.gz`)), fs.readFile(path.join(directory, phase, `${after.key}.json.gz`))]);
        const nodesA = JSON.parse(gunzipSync(stylesA)), nodesB = JSON.parse(gunzipSync(stylesB));
        row.rectangleChanges = 0;
        row.textChanges = 0;
        const counts = new Map();
        for (let i = 0; i < Math.min(nodesA.length, nodesB.length); i++) {
          const x = nodesA[i], y = nodesB[i];
          if (x.tag !== y.tag) { counts.set('DOM structure', (counts.get('DOM structure') || 0) + 1); continue; }
          if (JSON.stringify(x.rect) !== JSON.stringify(y.rect)) row.rectangleChanges++;
          if (x.text !== y.text) row.textChanges++;
          for (const prop of Object.keys(x.style)) {
            if (x.style[prop] !== y.style[prop]) {
              counts.set(prop, (counts.get(prop) || 0) + 1);
              if (row.styleChanges.length < 12) row.styleChanges.push({ tag: x.tag, classes: x.classes, text: x.text, property: prop, before: x.style[prop], after: y.style[prop] });
            }
          }
        }
        row.propertyCounts = Object.fromEntries([...counts].sort((a,b) => b[1]-a[1]));
        row.nodeCounts = [nodesA.length, nodesB.length];
      }
    }
  } catch (error) { row.errors = [...(row.errors || []), error.message]; }
  results.push(row);
  if (results.length % 100 === 0) log(`Compared ${results.length}/${candidate.results.length}`);
}
const missing = baseline.results.filter(before => !candidate.results.some(after => after.key === before.key)).map(item => item.key);
const changed = results.filter(row => row.pixels || row.geometryChanged || row.errors?.length);
const report = { baselinePhase, phase, total: results.length, identical: results.length - changed.length, changed: changed.length, missing, failures: candidate.errors, results };
await fs.writeFile(path.join(directory, `${phase}-comparison.json`), JSON.stringify(report, null, 2));
const escape = text => String(text ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const cards = changed.map(row => `<details><summary>${escape(row.url)} — ${escape(row.actor)} · ${row.width}px · ${row.theme} · ${row.pixels.toLocaleString()} changed pixels${row.geometryChanged ? ' · DIMENSIONS CHANGED' : ''}</summary><p>${row.perceptualPixels.toLocaleString()} perceptual pixels. Magenta highlights every raw RGBA change. Raw equality is the primary check; antialiasing changes are not hidden.</p>${row.errors?.length ? `<pre>${escape(row.errors.join('\n'))}</pre>` : ''}<div class="images">${[[baselinePhase,'Before'],[phase,'After'],[`${phase}-diff`,'Difference']].map(([folder,label]) => `<figure><figcaption>${label} · <a href="${folder}/${row.key}.png" target="_blank">open full image</a></figcaption><div><img loading="lazy" src="${folder}/${row.key}.png" alt="${label}: ${escape(row.url)}"></div></figure>`).join('')}</div><pre>${escape(JSON.stringify({rawBounds:row.rawBounds,maxChannelDelta:row.maxChannelDelta,rectangleChanges:row.rectangleChanges,textChanges:row.textChanges,properties:row.propertyCounts,examples:row.styleChanges},null,2))}</pre></details>`).join('\n');
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Tailwind visual audit — ${escape(phase)}</title><style>body{font:15px system-ui,sans-serif;background:#faf6ec;color:#1c1814;margin:24px}h1{font:700 32px Georgia,serif}a{color:#824216}summary{cursor:pointer;font-weight:600;padding:16px}details{border:1px solid #c8ad84;border-radius:8px;margin:12px 0;background:#fffdf6}details>p,details>pre{margin:16px}pre{white-space:pre-wrap;max-height:400px;overflow:auto}.images{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:12px}figure{margin:0;min-width:0}figure>div{max-height:680px;overflow:auto;background:#ddd;border:1px solid #aaa}img{width:100%;height:auto;display:block}figcaption{padding:8px;font-weight:600}input{padding:10px;font:inherit;width:min(600px,90%)}@media(max-width:700px){.images{grid-template-columns:1fr}}</style><h1>Tailwind visual audit: ${escape(phase)}</h1><p><b>${report.total}</b> comparisons · <b>${report.identical}</b> pixel-identical · <b>${report.changed}</b> different · <b>${missing.length}</b> missing.</p><p>All images are full page. Every differing URL/role/viewport/theme is listed below. Nothing is approved or merged by this report.</p><p>Local fixture data only. Third-party maps/AI/payment/auth integrations are not verified by these snapshots. Fixed time, random seed, fonts, browser and animation policy are shared by both runs.</p><p><a href="before-inventory.json">Complete route inventory and source fingerprints</a> · <a href="${phase}-comparison.json">Machine-readable results</a></p><input id="filter" placeholder="Filter by URL, role, width or theme" aria-label="Filter differences">${cards || '<p>No image differences were detected.</p>'}<script>document.querySelector('#filter').addEventListener('input',event=>{for(const card of document.querySelectorAll('details'))card.hidden=!card.querySelector('summary').textContent.toLowerCase().includes(event.target.value.toLowerCase())})</script></html>`;
await fs.writeFile(path.join(directory, `${phase}-report.html`), html);
log(JSON.stringify({ compared: report.total, identical: report.identical, changed: report.changed, missing: missing.length, failures: report.failures.length }, null, 2));
