#!/usr/bin/env node
// Builds 05-journey-current.svg, 05-service-blueprint.svg, 05-journey-future.svg and index.html from journey.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, wrap, tspans, headerBand, svgDoc, page, figure } from '../../../../shared/design-system/svg-lib.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(here, 'journey.json'), 'utf8'));
const A = D.artifact;
const W = 1400, L = 150, n = D.stages.length, cw = (W - 16 - L) / n, CH = 24;
const col = i => L + i * cw;
const feelWord = v => ({ '-2': 'strained', '-1': 'uneasy', '0': 'steady', '1': 'in control', '2': 'confident' })[String(v)];

function stageHeader(parts, y) {
  parts.push(`<rect x="${L}" y="${y}" width="${W - 16 - L}" height="${CH}" class="surf2"/>`);
  D.stages.forEach((s, i) => parts.push(`<text x="${col(i) + cw / 2}" y="${y + 16}" class="t11 b" text-anchor="middle">${esc(s.name)}</text><line x1="${col(i)}" y1="${y}" x2="${col(i)}" y2="${y + CH}" class="hair"/>`));
  return y + CH;
}
function row(parts, y, label, texts, h, cls = 't11', band = false) {
  if (band) parts.push(`<rect x="16" y="${y}" width="${W - 32}" height="${h}" class="surf2" opacity="0.6"/>`);
  parts.push(`<line x1="16" y1="${y + h}" x2="${W - 16}" y2="${y + h}" class="hair"/>`);
  parts.push(`<text class="t11 ink2 b">${tspans(wrap(label.toUpperCase(), 18), 16, y + 16, 12)}</text>`);
  texts.forEach((t, i) => { parts.push(`<line x1="${col(i)}" y1="${y}" x2="${col(i)}" y2="${y + h}" class="hair"/>`); if (t) parts.push(`<text class="${cls}">${tspans(wrap(t, 22), col(i) + 6, y + 16, 13)}</text>`); });
  return y + h;
}
function curve(parts, y, values, cls, label, dashed = false) {
  const h = 70, mid = y + h / 2, sc = 14;
  parts.push(`<text class="t11 ink2 b">${tspans(wrap(label.toUpperCase(), 16), 16, y + 14, 12)}</text>`);
  for (const v of [-2, 0, 2]) parts.push(`<line x1="${L}" y1="${mid - v * sc}" x2="${W - 16}" y2="${mid - v * sc}" class="hair" ${v ? 'stroke-dasharray="2 3"' : ''}/><text x="${L - 6}" y="${mid - v * sc + 4}" class="t10 ink3" text-anchor="end">${v > 0 ? '+' + v : v}</text>`);
  const pts = values.map((v, i) => [col(i) + cw / 2, mid - v * sc]);
  parts.push(`<polyline points="${pts.map(p => p.join(',')).join(' ')}" class="${cls}" stroke-width="2" ${dashed ? 'stroke-dasharray="5 4"' : ''}/>`);
  pts.forEach(([x, yy], i) => parts.push(`<circle cx="${x}" cy="${yy}" r="4" class="${cls.replace('-s', '')}"/><text x="${x}" y="${yy + (values[i] >= 0 ? -8 : 14)}" class="t10 ink2" text-anchor="middle">${feelWord(values[i])}</text>`));
  return y + h + 6;
}

// ---- current-state journey ----
{
  const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
  let y = hh + 14;
  parts.push(`<text x="16" y="${y + 10}" class="t11 ink2 b">CURRENT-STATE JOURNEY. LENS: ${esc(D.lens.toUpperCase())}</text>`); y += 20;
  y = stageHeader(parts, y);
  y = curve(parts, y + 4, D.stages.map(s => s.feeling), 'failed-s', 'Feeling (reconstructed)');
  y = row(parts, y, 'Doing', D.stages.map(s => s.doing), 74);
  y = row(parts, y, 'Thinking', D.stages.map(s => '"' + s.thinking + '"'), 48, 't11 ink2');
  y = row(parts, y, 'Pain', D.stages.map(s => s.pain), 86, 't11', true);
  y = row(parts, y, 'Opportunity', D.stages.map(s => s.opportunity), 60);
  parts.push(`<text x="16" y="${y + 18}" class="t11 ink2">${esc(D.label)}</text>`);
  writeFileSync(join(here, '05-journey-current.svg'), svgDoc(A, W, y + 32, parts.join('\n')));
}
// ---- service blueprint ----
{
  const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
  let y = hh + 14;
  parts.push(`<text x="16" y="${y + 10}" class="t11 ink2 b">SERVICE BLUEPRINT, CURRENT STATE. FRONTSTAGE AUDITOR ACTIONS, BACKSTAGE CLIENT REQUESTS AND DATA PULLS, SUPPORT SYSTEMS.</text>`); y += 20;
  y = stageHeader(parts, y);
  y = row(parts, y, 'Frontstage: auditor actions', D.stages.map(s => s.front), 74);
  parts.push(`<line x1="16" y1="${y}" x2="${W - 16}" y2="${y}" class="brand-s" stroke-width="1.5" stroke-dasharray="6 4"/><text x="${W - 20}" y="${y - 4}" class="t10 ink2" text-anchor="end">line of interaction</text>`);
  y = row(parts, y, 'Backstage: client requests and data pulls', D.stages.map(s => s.back === 'none' ? '' : s.back), 74);
  parts.push(`<line x1="16" y1="${y}" x2="${W - 16}" y2="${y}" class="brand-s" stroke-width="1.5" stroke-dasharray="6 4"/><text x="${W - 20}" y="${y - 4}" class="t10 ink2" text-anchor="end">line of visibility</text>`);
  const keys = Object.keys(D.support_names), rh = 26;
  parts.push(`<text x="16" y="${y + 16}" class="t11 ink2 b">SUPPORT SYSTEMS</text>`); y += 22;
  keys.forEach(k => {
    parts.push(`<text x="16" y="${y + 17}" class="t11">${esc(D.support_names[k])}</text><line x1="16" y1="${y + rh}" x2="${W - 16}" y2="${y + rh}" class="hair"/>`);
    D.stages.forEach((s, i) => { parts.push(`<line x1="${col(i)}" y1="${y}" x2="${col(i)}" y2="${y + rh}" class="hair"/>`); if (s.support.includes(k)) parts.push(`<rect x="${col(i) + 8}" y="${y + 6}" width="${cw - 16}" height="${rh - 12}" rx="2" class="${k === 'spreadsheets' ? 'failed-t' : 'brand-t'}"/>`); });
    y += rh;
  });
  y = row(parts, y + 8, 'Pain at this stage', D.stages.map(s => s.themes.join(', ')), 30, 't11 mono ink2', true);
  parts.push(`<rect x="16" y="${y + 10}" width="20" height="12" rx="2" class="brand-t"/><text x="42" y="${y + 20}" class="t11 ink2">system in use at this stage</text><rect x="230" y="${y + 10}" width="20" height="12" rx="2" class="failed-t"/><text x="256" y="${y + 20}" class="t11 ink2">shadow system: a personal spreadsheet carrying state the systems do not hold</text>`);
  parts.push(`<text x="16" y="${y + 40}" class="t11 ink2">${esc(D.label)}</text>`);
  writeFileSync(join(here, '05-service-blueprint.svg'), svgDoc(A, W, y + 54, parts.join('\n')));
}
// ---- future-state journey ----
{
  const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
  let y = hh + 14;
  parts.push(`<text x="16" y="${y + 10}" class="t11 ink2 b">FUTURE-STATE JOURNEY WITH AGENTS. THE DELTA ROW SAYS WHAT CHANGED. FEELING IS DESIGN INTENT, NOT A MEASUREMENT.</text>`); y += 20;
  y = stageHeader(parts, y);
  // both curves
  const h = 70, mid = y + 4 + h / 2, sc = 14;
  parts.push(`<text x="16" y="${y + 18}" class="t11 ink2 b">FEELING</text><text x="16" y="${y + 32}" class="t10 ink2">solid: future, design intent</text><text x="16" y="${y + 44}" class="t10 ink2">dashed: current (05)</text>`);
  for (const v of [-2, 0, 2]) parts.push(`<line x1="${L}" y1="${mid - v * sc}" x2="${W - 16}" y2="${mid - v * sc}" class="hair" ${v ? 'stroke-dasharray="2 3"' : ''}/><text x="${L - 6}" y="${mid - v * sc + 4}" class="t10 ink3" text-anchor="end">${v > 0 ? '+' + v : v}</text>`);
  const cur = D.stages.map((s, i) => [col(i) + cw / 2, mid - s.feeling * sc]), fut = D.stages.map((s, i) => [col(i) + cw / 2, mid - s.future.feeling * sc]);
  parts.push(`<polyline points="${cur.map(p => p.join(',')).join(' ')}" class="failed-s" stroke-width="1.5" stroke-dasharray="5 4"/>`);
  parts.push(`<polyline points="${fut.map(p => p.join(',')).join(' ')}" class="approved-s" stroke-width="2"/>`);
  parts.push(`<style>.approved-s{stroke:var(--bt-approved);fill:none}</style>`);
  fut.forEach(([x, yy], i) => parts.push(`<circle cx="${x}" cy="${yy}" r="4" class="approved"/><text x="${x}" y="${yy - 8}" class="t10 ink2" text-anchor="middle">${feelWord(D.stages[i].future.feeling)}</text>`));
  y += h + 10;
  y = row(parts, y, 'Auditor does', D.stages.map(s => s.future.auditor), 74);
  y = row(parts, y, 'Agent does', D.stages.map(s => s.future.agent), 86, 't11');
  // agent row tint: redraw a tinted band behind? mark with agent-colored left bar per cell
  D.stages.forEach((s, i) => parts.push(`<rect x="${col(i) + 1}" y="${y - 86 + 4}" width="3" height="78" class="agent"/>`));
  // checkpoint row with marks
  const cy = y; const chh = 60;
  parts.push(`<line x1="16" y1="${cy + chh}" x2="${W - 16}" y2="${cy + chh}" class="hair"/><text class="t11 ink2 b">${tspans(['HUMAN', 'CHECKPOINT'], 16, cy + 16, 12)}</text>`);
  D.stages.forEach((s, i) => {
    parts.push(`<line x1="${col(i)}" y1="${cy}" x2="${col(i)}" y2="${cy + chh}" class="hair"/>`);
    const req = s.future.checkpoint !== 'none' && !s.future.checkpoint.startsWith('None');
    if (req) parts.push(`<rect x="${col(i) + 6}" y="${cy + 6}" width="14" height="14" rx="2" class="review"/><path d="M${col(i) + 9} ${cy + 13} l3 3 l5 -6" fill="none" stroke="var(--bt-surface)" stroke-width="1.8"/>`);
    parts.push(`<text class="t11 ${req ? '' : 'ink3'}">${tspans(wrap(s.future.checkpoint, 20), col(i) + (req ? 26 : 6), cy + 17, 13)}</text>`);
  });
  y = cy + chh;
  y = row(parts, y, 'What changed', D.stages.map(s => s.future.delta), 74, 't11', true);
  parts.push(`<rect x="16" y="${y + 10}" width="14" height="14" rx="2" class="review"/><text x="36" y="${y + 21}" class="t11 ink2">a human must act here before the run continues</text><rect x="330" y="${y + 10}" width="3" height="14" class="agent"/><text x="340" y="${y + 21}" class="t11 ink2">agent-produced work, shown in the reserved provenance color</text>`);
  parts.push(`<text x="16" y="${y + 42}" class="t11 ink2">${esc(D.label)}</text>`);
  writeFileSync(join(here, '05-journey-future.svg'), svgDoc(A, W, y + 56, parts.join('\n')));
}
const cur = readFileSync(join(here, '05-journey-current.svg'), 'utf8'), bp = readFileSync(join(here, '05-service-blueprint.svg'), 'utf8'), fut = readFileSync(join(here, '05-journey-future.svg'), 'utf8');
const deltaRows = D.stages.map(s => `<tr><td><strong>${esc(s.name)}</strong></td><td>${esc(s.pain)}</td><td>${esc(s.future.agent)}</td><td>${esc(s.future.checkpoint)}</td><td>${esc(s.future.delta)}</td><td class="mono">${s.themes.join(', ')}</td></tr>`).join('\n');
const body = `
<section class="block prose">
<h2>What these maps are</h2>
<p>One Test of Details on the revenue area, mapped three ways. The current-state journey follows the Senior through nine lifecycle stages with what she does, thinks and feels, where it hurts and where the opportunity is. The service blueprint shows what happens behind her: client requests, data pulls and the systems that carry the work, including the shadow spreadsheet. The future-state journey puts agents in the lane and names the human checkpoint at each stage, so the delta is visible stage by stage.</p>
<p><strong>${esc(D.label)}</strong></p>
<p><strong>I decided</strong> ${esc(A.iDecided)} <strong>We built</strong> ${esc(A.weBuilt)}</p>
</section>
<section class="block"><h2>Current-state journey</h2>${figure(cur, `${A.number} current-state journey. Nine stages, emotion curve, doing, thinking, pain and opportunity rows. Standalone: <a href="05-journey-current.svg">05-journey-current.svg</a>.`)}</section>
<section class="block"><h2>Service blueprint</h2>${figure(bp, `${A.number} service blueprint. Frontstage auditor actions above the line of interaction, backstage client requests and data pulls, support systems below the line of visibility. The shadow spreadsheet is marked because it carries state the systems do not hold. Standalone: <a href="05-service-blueprint.svg">05-service-blueprint.svg</a>.`)}</section>
<section class="block"><h2>Future-state journey with agents</h2>${figure(fut, `${A.number} future-state journey. Auditor and agent lanes, the human checkpoint per stage and what changed. Both emotion curves overlaid; the future curve is design intent. Standalone: <a href="05-journey-future.svg">05-journey-future.svg</a>.`)}</section>
<section class="block">
<h2>The delta, stage by stage</h2>
<div style="overflow:auto"><table class="doc"><thead><tr><th>Stage</th><th>Pain today</th><th>Agent does</th><th>Human checkpoint</th><th>What changed</th><th>Themes</th></tr></thead><tbody>${deltaRows}</tbody></table></div>
</section>
<section class="block prose">
<h2>Where the checkpoints went and why</h2>
<p>Mandatory checkpoints sit at four places: plan approval before a run starts, any retrieval of restricted-class material, every exception resolution and the moment a draft becomes the conclusion. Sign-off stays human-only by construction. The other stages have no mandatory checkpoint because the research put judgment at exceptions and conclusions, not at matching. A low-confidence match routes to review on its own. That is D-09: checkpoints where judgment lives, not everywhere and not nowhere.</p>
</section>
<section class="block">
<h2>Decisions fed</h2>
<p><a class="chip" href="../../decisions.md#d-09">D-09</a> Checkpoints are mandatory before draft conclusion and before any restricted-class retrieval. Also feeds D-01 and D-04.</p>
</section>`;
writeFileSync(join(here, 'index.html'), page(A, body));
console.log('wrote three SVGs and index.html');
