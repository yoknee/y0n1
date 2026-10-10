#!/usr/bin/env node
// Renders Markdown sources to HTML twins beside them (name.md -> name.html) with the Baton shell,
// so links on the static host open a page instead of a raw .md download. Heading ids are slugs,
// so decisions.html#d-01 lands on "## D-01 ...". Usage: node scripts/render-md.mjs <md paths...>
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, basename, dirname, relative } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let marked;
try { ({ marked } = require('marked')); } catch (e) { console.error('marked not found. Run: cd scripts && npm ci'); process.exit(2); }
const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const slug = t => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const renderer = {
  heading({ tokens, depth }) { const text = this.parser.parseInline(tokens); const m = text.match(/^([A-Z]{1,2}-\d{2,3})\b/); const id = m ? m[1].toLowerCase() : slug(text).slice(0, 60); return `<h${depth} id="${id}">${text}</h${depth}>\n`; },
  link({ href, title, tokens }) { const text = this.parser.parseInline(tokens); const h = /^[^:]+\.md(#.*)?$/.test(href) ? href.replace(/\.md(#|$)/, '.html$1') : href; return `<a href="${esc(h)}"${title ? ` title="${esc(title)}"` : ''}>${text}</a>`; },
  table({ header, rows }) { const cell = c => `<${c.header ? 'th' : 'td'}${c.align ? ` style="text-align:${c.align}"` : ''}>${this.parser.parseInline(c.tokens)}</${c.header ? 'th' : 'td'}>`; return `<table class="doc"><thead><tr>${header.map(cell).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(cell).join('')}</tr>`).join('')}</tbody></table>\n`; },
};
marked.use({ renderer, gfm: true });
for (const p of process.argv.slice(2)) {
  const src = await readFile(resolve(p), 'utf8');
  const title = (src.match(/^# (.+)$/m) || src.match(/^\| Title \| (.+?) \|/m) || [null, basename(p, '.md')])[1];
  const body = marked.parse(src);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="icon" href="/shared/brand/baton/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="/shared/brand/baton/tokens.css">
<link rel="stylesheet" href="/shared/design-system/base.css">
<style>.md { max-width: 110ch; } .md h1 { font-size: var(--bt-fs-20); margin: var(--bt-s4) 0 var(--bt-s2); } .md h2 { font-size: var(--bt-fs-16); margin-top: var(--bt-s6); } .md h3 { font-size: var(--bt-fs-14); } .md p, .md li { font-size: var(--bt-fs-13); line-height: var(--bt-lh-prose); } .md blockquote { margin: var(--bt-s2) 0; padding: var(--bt-s1) var(--bt-s3); border-left: 3px solid var(--bt-border); color: var(--bt-ink-2); font-size: var(--bt-fs-12); } .md table.doc { margin: var(--bt-s2) 0; font-size: var(--bt-fs-12); } .md pre { background: var(--bt-surface-2); padding: var(--bt-s2) var(--bt-s3); overflow: auto; font-size: var(--bt-fs-12); } .md hr { margin: var(--bt-s6) 0; } .src { font-size: var(--bt-fs-11); color: var(--bt-ink-3); margin: var(--bt-s2) 0 0; }</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="page">
<main id="main" class="md">
<p class="src">Rendered from <a href="${esc(basename(p))}">${esc(basename(p))}</a>. The Markdown file is the source.</p>
${body}
</main>
</div>
</body>
</html>
`;
  const out = resolve(p).replace(/\.md$/, '.html');
  await writeFile(out, html);
  console.log(`${relative(root, resolve(p))} -> ${relative(root, out)}`);
}
