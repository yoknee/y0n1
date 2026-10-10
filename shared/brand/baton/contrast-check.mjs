#!/usr/bin/env node
// WCAG 2.2 contrast check for the Baton token pairs, both themes.
// Usage: node shared/brand/baton/contrast-check.mjs   (exit 1 on any failure)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(here, 'tokens.json'), 'utf8'));

const lin = c => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = hex => { const n = parseInt(hex.slice(1), 16); return 0.2126 * lin(n >> 16 & 255) + 0.7152 * lin(n >> 8 & 255) + 0.0722 * lin(n & 255); };
const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };

// Pairs: [foreground token, background token, minimum]. 4.5 body text, 3.0 large text and UI components.
const pairs = [
  ['ink', 'surface', 4.5], ['ink', 'surface-2', 4.5], ['ink', 'surface-3', 4.5],
  ['ink-2', 'surface', 4.5], ['ink-2', 'surface-2', 4.5],
  ['ink-3', 'surface', 4.5],
  ['brand', 'surface', 4.5], ['agent', 'surface', 4.5], ['review', 'surface', 4.5],
  ['approved', 'surface', 4.5], ['edited', 'surface', 4.5], ['failed', 'surface', 4.5],
  ['brand', 'surface-2', 4.5], ['agent', 'surface-2', 4.5], ['review', 'surface-2', 4.5],
  ['approved', 'surface-2', 4.5], ['edited', 'surface-2', 4.5], ['failed', 'surface-2', 4.5],
  ['border', 'surface', 1.4],           // hairline, informational only
  ['ink', 'brand-tint', 4.5], ['ink', 'agent-tint', 4.5], ['ink', 'review-tint', 4.5],
  ['ink', 'approved-tint', 4.5], ['ink', 'edited-tint', 4.5], ['ink', 'failed-tint', 4.5],
  ['brand', 'brand-tint', 3.0], ['agent', 'agent-tint', 3.0], ['review', 'review-tint', 3.0],
  ['approved', 'approved-tint', 3.0], ['edited', 'edited-tint', 3.0], ['failed', 'failed-tint', 3.0],
];

let fail = 0;
for (const theme of ['light', 'dark']) {
  const c = tokens.color[theme];
  console.log(`\n${theme}`);
  for (const [fg, bg, min] of pairs) {
    const r = ratio(c[fg], c[bg]);
    const ok = r >= min;
    if (!ok) fail++;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${fg.padEnd(14)} on ${bg.padEnd(14)} ${r.toFixed(2).padStart(6)}:1  (min ${min})`);
  }
}
console.log(fail ? `\n${fail} pair(s) below minimum` : '\nall pairs pass');
process.exit(fail ? 1 : 0);
