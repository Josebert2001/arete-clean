const log = value => process.stdout.write(String(value) + String.fromCharCode(10));
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright-core';
import { inventory } from './routes.mjs';
import { installFixtures } from './fixtures.mjs';

const checkout = path.resolve(process.env.VISUAL_CHECKOUT || path.join(import.meta.dirname, '../..'));
const artifactRoot = path.resolve(process.env.VISUAL_OUTPUT || path.join(checkout, '.tailwind-visual.local'));
const baseURL = new URL(process.env.VISUAL_BASE_URL || 'http://127.0.0.1:5184').origin;
const output = path.join(artifactRoot, 'captures');
const phase = process.argv[2] || 'before';
const smoke = process.argv.includes('--smoke');
const limit = Number(process.env.VISUAL_LIMIT || 0);
const only = process.env.VISUAL_ONLY || '';
const baseline = JSON.parse(await fs.readFile(path.join(output, 'before-results.json'), 'utf8').catch(() => '{"results":[]}'));
const expectedHeadings = new Map((phase === 'before' ? [] : baseline.results).map(item => [item.id, item.heading]));
const routes = await inventory(checkout);
await fs.mkdir(path.join(output, phase), { recursive: true });
const inputs = ['src/index.css', 'tailwind.config.js', 'postcss.config.js', 'package-lock.json', 'scripts/postcss/preserveUtilityCascade.mjs'];
for (const file of await fs.readdir(path.join(checkout, 'src/styles')).catch(() => [])) inputs.push(`src/styles/${file}`);
const sourceHash = crypto.createHash('sha256');
for (const file of inputs.sort()) sourceHash.update(file).update(await fs.readFile(path.join(checkout, file)).catch(() => ''));
const stylesHash = sourceHash.digest('hex');
await fs.writeFile(path.join(output, `${phase}-inventory.json`), JSON.stringify({ ...routes, sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim(), stylesHash, fixtureHash: crypto.createHash('sha256').update(await fs.readFile(new URL('./fixtures.mjs', import.meta.url))).digest('hex') }, null, 2));
let cases = routes.cases;
if (smoke) cases = cases.filter(item => ['/', '/signin', '/setup-profile', '/admin', '/rep', '/teach', '/register', '/attendance', '/my-attendance', '/profile', '/cheatsheet', '/courses/uuy-cyb-221', '/tracks/java/foundations'].includes(item.url));
if (only) cases = cases.filter(item => only.split('|').some(part => item.id.includes(part)));
if (limit) cases = cases.slice(0, limit);
const jobs = cases.flatMap(scenario => [1366, 390].flatMap(width => ['light', 'dark'].map(theme => ({ scenario, width, theme }))));
jobs.sort((a,b) => `${a.width}-${a.theme}-${a.scenario.actor}`.localeCompare(`${b.width}-${b.theme}-${b.scenario.actor}`));
log(`${phase}: ${cases.length} scenarios, ${jobs.length} full-page screenshots, ${routes.patterns.length} route patterns`);
const browser = await chromium.launch({ ...(process.env.VISUAL_BROWSER ? { executablePath: process.env.VISUAL_BROWSER } : { channel: 'chrome' }), headless: true, args: ['--disable-gpu', '--font-render-hinting=none', '--disable-lcd-text'] });
const fontCache = new Map();
const results = [];
let index = 0;
const groups = [...Map.groupBy(jobs, job => `${job.width}-${job.theme}-${job.scenario.actor}`).values()];
const props = ['display','position','color','backgroundColor','backgroundImage','borderColor','borderWidth','borderRadius','boxShadow','fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing','textAlign','padding','margin','gap','width','height','maxWidth','minWidth','outline','filter','backdropFilter','opacity','transform','overflow'];
async function worker() {
  while (index < groups.length) {
    const group = groups[index++];
    const first = group[0];
    const context = await browser.newContext({ viewport: { width: first.width, height: first.width === 390 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: first.width === 390, hasTouch: first.width === 390, colorScheme: first.theme, locale: 'en-NG', timezoneId: 'Africa/Lagos', reducedMotion: 'reduce', serviceWorkers: 'block' });
    await installFixtures(context, first.scenario, first.theme, fontCache, { baseURL, fontDirectory: path.join(artifactRoot, 'fonts') });
    const page = await context.newPage();
    let firstNavigation = true;
    const requests = new Set();
    let lastNetworkActivity = Date.now();
    page.on('request', request => { requests.add(request); lastNetworkActivity = Date.now(); });
    const finished = request => { requests.delete(request); lastNetworkActivity = Date.now(); };
    page.on('requestfinished', finished); page.on('requestfailed', finished);
    for (const { scenario, width, theme } of group) {
    const key = `${scenario.id}__${width}__${theme}`;
    const errors = [];
    const record = { ...scenario, key, width, theme, file: `${key}.png`, errors };
    try {
      page.removeAllListeners('pageerror');
      page.on('pageerror', error => errors.push(error.message));
      if (firstNavigation) {
        await page.goto(`${baseURL}${scenario.url}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;caret-color:transparent!important}' });
        firstNavigation = false;
      } else {
        await page.evaluate(url => { history.pushState(null, '', url); dispatchEvent(new PopStateEvent('popstate')); }, scenario.url);
      }
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve)))));
      await page.waitForSelector('main', { timeout: 15000 });
      if (scenario.url === '/tracks/missing') await page.getByText('Track not found.', { exact: true }).waitFor();
      else await page.waitForSelector('main h1', { timeout: 15000 });
      if (expectedHeadings.get(scenario.id)?.length) await page.waitForFunction(expected => {
        const headings = [...document.querySelectorAll('main h1')].filter(node => node.getClientRects().length).map(node => node.textContent);
        return JSON.stringify(headings) === JSON.stringify(expected);
      }, expectedHeadings.get(scenario.id), { timeout: 15000 });
      for (let wait = 0; wait < 600 && (requests.size || Date.now() - lastNetworkActivity < 100); wait++) await new Promise(resolve => setTimeout(resolve, 20));
      await page.waitForFunction(() => ![...document.querySelectorAll('[role="status"]')].some(node => /loading|checking your|preparing/i.test(node.textContent)), null, { timeout: 12000 }).catch(error => { errors.push(`Not settled: ${error.message.split('\n')[0]}`); });
      await page.evaluate(async () => {
        await Promise.all(['Inter', 'Fraunces', 'JetBrains Mono'].map(font => document.fonts.load(`400 16px "${font}"`)));
        await document.fonts.ready;
      });
      await page.mouse.move(0, 0);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      record.finalUrl = new URL(page.url()).pathname + new URL(page.url()).search;
      record.title = await page.title();
      record.heading = await page.locator('main h1').allTextContents();
      record.fonts = await page.evaluate(() => [...document.fonts].filter(font => font.status === 'loaded').map(font => ({family:font.family,weight:font.weight})));
      record.geometry = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, dark: document.documentElement.classList.contains('dark') }));
      if (record.geometry.dark !== (theme === 'dark')) errors.push('Theme does not match the requested capture');
      if (await page.getByText('Something went wrong.', { exact: true }).count()) errors.push('Application error boundary');
      const snapshot = await page.evaluate(props => [...document.querySelectorAll('main *,nav *,footer *')].map((el, index) => {
        const css = getComputedStyle(el), rect = el.getBoundingClientRect();
        return { index, tag: el.tagName, classes: el.className?.baseVal ?? el.className, text: el.children.length ? '' : el.textContent?.slice(0,120), rect: [rect.x,rect.y,rect.width,rect.height], style: Object.fromEntries(props.map(prop => [prop, css[prop]])) };
      }), props);
      await page.screenshot({ path: path.join(output, phase, `${key}.png`), fullPage: true, animations: 'disabled', timeout: 60000 });
      await fs.writeFile(path.join(output, phase, `${key}.json.gz`), gzipSync(JSON.stringify(snapshot)));
    } catch (error) { errors.push(error.stack || error.message); firstNavigation = true; }
    finally { results.push(record); }
    if (results.length % 20 === 0 || errors.length) log(`${phase}: ${results.length}/${jobs.length}${errors.length ? ` FAIL ${key}: ${errors.join('; ')}` : ''}`);
    if (results.length % 20 === 0) await fs.writeFile(path.join(output, `${phase}-progress.json`), JSON.stringify(results));
    }
    await context.close();
  }
}
try { await Promise.all(Array.from({ length: Number(process.env.VISUAL_WORKERS || 3) }, worker)); }
finally { await browser.close(); }
results.sort((a,b) => a.key.localeCompare(b.key));
await fs.writeFile(path.join(output, `${phase}-results.json`), JSON.stringify({ phase, stylesHash, browser: browser.version(), total: jobs.length, completed: results.length, errors: results.filter(result => result.errors.length), results }, null, 2));
log(`${phase}: complete ${results.length}/${jobs.length}; ${results.filter(result => result.errors.length).length} failed`);
if (results.some(result => result.errors.length)) process.exitCode = 1;
