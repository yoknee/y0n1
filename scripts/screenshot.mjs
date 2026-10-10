#!/usr/bin/env node
// Render HTML pages at 1440x900 in light and dark and write PNGs to scripts/.screens/ (gitignored).
// Serves the repo root over HTTP so root-relative paths resolve the same way they do on Vercel.
// Usage: node scripts/screenshot.mjs cases/<case>/artifacts/01-problem-framing/index.html [more paths] [--full] [--out DIR]
import { createServer } from 'node:http';
import { readFile, mkdir, stat } from 'node:fs/promises';
import { extname, join, resolve, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
// require() honors NODE_PATH, so a globally installed playwright works too. Otherwise: cd scripts && npm ci
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { console.error('playwright not found. Run: cd scripts && npm ci'); process.exit(2); }

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const full = args.includes('--full');
const outIdx = args.indexOf('--out');
const outDir = outIdx >= 0 ? resolve(args[outIdx + 1]) : join(root, 'scripts', '.screens');
const pages = args.filter((a, i) => !a.startsWith('--') && (outIdx < 0 || i !== outIdx + 1));
if (!pages.length) { console.error('usage: node scripts/screenshot.mjs <html paths> [--full] [--out DIR]'); process.exit(2); }

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.csv': 'text/csv', '.md': 'text/markdown' };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = join(root, p);
    if (!f.startsWith(root)) throw new Error('out of root');
    const s = await stat(f);
    const file = s.isDirectory() ? join(f, 'index.html') : f;
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch (e) { res.writeHead(404); res.end('not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
let failures = 0;
for (const page of pages) {
  const rel = relative(root, resolve(page)).replace(/\\/g, '/');
  // standalone SVG: size the viewport to the drawing instead of full-page capture, which stalls on font waits
  let viewport = { width: 1440, height: 900 }, isSvg = rel.endsWith('.svg');
  if (isSvg) { const m = (await readFile(resolve(page), 'utf8')).match(/width="(\d+)" height="(\d+)"/); if (m) viewport = { width: +m[1], height: +m[2] }; }
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport, colorScheme: theme, deviceScaleFactor: 1 });
    const tab = await ctx.newPage();
    const errors = [];
    tab.on('pageerror', e => errors.push(String(e)));
    tab.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    tab.on('requestfailed', r => errors.push('request failed: ' + r.url()));
    tab.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await tab.goto(`http://127.0.0.1:${port}/${rel}?theme=${theme}`, { waitUntil: 'networkidle' });
    await tab.evaluate(() => document.fonts.ready);
    const name = rel.replace(/\.html$/, '').replace(/[\/]/g, '__') + `.${theme}.png`;
    await tab.screenshot({ path: join(outDir, name), fullPage: full && !isSvg });
    if (errors.length) { failures++; console.log(`${rel} [${theme}] errors:\n  ` + errors.join('\n  ')); }
    else console.log(`${rel} [${theme}] -> ${relative(root, join(outDir, name))}`);
    await ctx.close();
  }
}
await browser.close();
server.close();
process.exit(failures ? 1 : 0);
