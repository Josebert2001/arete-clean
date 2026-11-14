const log = value => process.stdout.write(String(value) + String.fromCharCode(10));
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const directory = process.env.VISUAL_SERVE_DIR
  ? path.resolve(process.env.VISUAL_SERVE_DIR)
  : path.resolve(process.env.VISUAL_CHECKOUT || path.join(import.meta.dirname, '../..'), 'dist');
const serverURL = new URL(process.env.VISUAL_BASE_URL || 'http://127.0.0.1:5184');
const types = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2', '.woff':'font/woff', '.webmanifest':'application/manifest+json', '.json':'application/json' };
http.createServer(async (req,res) => {
  let relative;
  try { relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
  let file = path.resolve(directory, `.${relative}`);
  if (!file.startsWith(path.resolve(directory) + path.sep) && file !== directory) { res.writeHead(403); return res.end(); }
  try { if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html'); }
  catch { file = path.join(directory, 'index.html'); }
  try { res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' }); res.end(await fs.readFile(file)); }
  catch { res.writeHead(404); res.end(); }
}).listen(Number(serverURL.port), serverURL.hostname, () => log(`Visual comparison server: ${serverURL.origin}`));
