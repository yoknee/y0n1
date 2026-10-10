#!/usr/bin/env node
// Builds 04-personas.svg and index.html from personas.json. Run: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, wrap, tspans, headerBand, svgDoc, page, figure } from '../../../../shared/design-system/svg-lib.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(here, 'personas.json'), 'utf8'));
const A = D.artifact;
const W = 1400;
const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
let y = hh + 16;
parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">FOUR COMPOSITE PERSONAS AND ONE ANTI-PERSONA. ${esc(D.label.toUpperCase())}</text>`);
y += 24;
const gap = 12, cw = (W - 32 - 3 * gap) / 4;
const sec = (x, yy, title, lines, cls = 't11') => { parts.push(`<text x="${x}" y="${yy}" class="t10 ink2 b">${title.toUpperCase()}</text>`); let ly = yy + 14; for (const l of lines) { const ws = wrap(l, 46); parts.push(`<text class="${cls}">${tspans(ws, x, ly, 13)}</text>`); ly += ws.length * 13 + 2; } return ly + 4; };
let maxH = 0;
D.personas.forEach((p, i) => {
  const x = 16 + i * (cw + gap), top = y; let cy = y + 22;
  parts.push(`<text x="${x + 10}" y="${cy}" class="t14">${esc(p.name)}</text>`); cy += 16;
  parts.push(`<text x="${x + 10}" y="${cy}" class="t11 ink2 b">${esc(p.role)}</text>`); cy += 16;
  parts.push(`<text class="t11 ink2">${tspans(wrap(p.tenure, 48), x + 10, cy, 13)}</text>`); cy += wrap(p.tenure, 48).length * 13 + 8;
  cy = sec(x + 10, cy, 'Environment', [p.environment]);
  cy = sec(x + 10, cy, 'Goals', p.goals.map(g => '- ' + g));
  cy = sec(x + 10, cy, 'Core tasks', p.tasks.map(g => '- ' + g));
  cy = sec(x + 10, cy, 'Tools', [p.tools.join(', ')]);
  cy = sec(x + 10, cy, 'Expertise', [p.expertise]);
  cy = sec(x + 10, cy, 'Frustrations', p.frustrations.map(g => '- ' + g));
  cy = sec(x + 10, cy, 'Accountability pressure', [p.pressure]);
  parts.push(`<rect x="${x + 6}" y="${cy - 6}" width="${cw - 12}" height="2" class="agent"/>`); cy += 6;
  cy = sec(x + 10, cy, 'Would hand off', [p.ai.handoff]);
  cy = sec(x + 10, cy, 'Would never hand off', [p.ai.never]);
  cy = sec(x + 10, cy, 'What builds trust', [p.ai.trust]);
  parts.push(`<text x="${x + 10}" y="${cy}" class="t10 ink2 b">EVIDENCE</text>`); let ex = x + 10; cy += 6;
  for (const e of p.evidence) { parts.push(`<rect x="${ex}" y="${cy}" width="34" height="16" rx="3" class="surf" stroke="var(--bt-border)"/><text x="${ex + 17}" y="${cy + 12}" class="t10 mono" text-anchor="middle">${e}</text>`); ex += 38; }
  cy += 30;
  parts.push(`<text x="${x + 10}" y="${cy}" class="t10 ink3 mono">composite, reconstructed</text>`); cy += 10;
  maxH = Math.max(maxH, cy - top);
  p._x = x; p._top = top;
});
D.personas.forEach(p => parts.unshift(`<rect x="${p._x}" y="${p._top}" width="${cw}" height="${maxH}" rx="3" class="surf" stroke="var(--bt-border)"/>`));
// the unshift put cards before the header band; move header band to front again
parts.unshift(parts.splice(parts.findIndex(s => s.startsWith('<rect x="0" y="0"')), 1)[0]);
y += maxH + gap;
// anti-persona
const ah = 200, an = D.anti;
parts.push(`<rect x="16" y="${y}" width="${W - 32}" height="${ah}" rx="3" class="failed-t" stroke="var(--bt-failed)"/>`);
parts.push(`<text x="26" y="${y + 22}" class="t14">${esc(an.name)}</text><text x="26" y="${y + 38}" class="t11 ink2 b">${esc(an.role)}</text><text x="26" y="${y + 54}" class="t11 b">${esc(an.label)}</text>`);
parts.push(`<text class="t11">${tspans(wrap(an.who, 60), 26, y + 74, 13)}</text>`);
const col = (x, title, lines) => { parts.push(`<text x="${x}" y="${y + 22}" class="t10 ink2 b">${title.toUpperCase()}</text>`); let ly = y + 38; for (const l of lines) { const ws = wrap('- ' + l, 44); parts.push(`<text class="t11">${tspans(ws, x, ly, 13)}</text>`); ly += ws.length * 13 + 2; } };
col(380, 'Routes around the tool when', an.why); col(700, 'Signals in the product', an.signals); col(1020, 'What the design does about it', an.design_response);
let ex = 26; const ey = y + ah - 30;
parts.push(`<text x="26" y="${ey - 6}" class="t10 ink2 b">EVIDENCE</text>`);
for (const e of an.evidence) { parts.push(`<rect x="${ex}" y="${ey}" width="34" height="16" rx="3" class="surf" stroke="var(--bt-border)"/><text x="${ex + 17}" y="${ey + 12}" class="t10 mono" text-anchor="middle">${e}</text>`); ex += 38; }
y += ah + 16;
parts.push(`<text x="16" y="${y + 4}" class="t11 ink2">${esc(D.label)}</text>`);
const H = y + 20;
const svg = svgDoc(A, W, H, parts.join('\n'));
writeFileSync(join(here, '04-personas.svg'), svg);

const card = p => `<div class="panel"><div class="panel-h">${esc(p.name)} <span class="muted">${esc(p.role)}</span></div><div class="panel-b small">
<p class="muted">${esc(p.tenure)} ${esc(p.environment)}</p>
<table class="doc"><tbody>
<tr><th style="width:30%">Goals</th><td>${p.goals.map(esc).join('<br>')}</td></tr>
<tr><th>Core tasks</th><td>${p.tasks.map(esc).join('<br>')}</td></tr>
<tr><th>Tools</th><td>${p.tools.map(esc).join(', ')}</td></tr>
<tr><th>Expertise</th><td>${esc(p.expertise)}</td></tr>
<tr><th>Frustrations</th><td>${p.frustrations.map(esc).join('<br>')}</td></tr>
<tr><th>Accountability pressure</th><td>${esc(p.pressure)}</td></tr>
<tr><th>Would hand off</th><td>${esc(p.ai.handoff)}</td></tr>
<tr><th>Would never hand off</th><td>${esc(p.ai.never)}</td></tr>
<tr><th>What builds trust</th><td>${esc(p.ai.trust)}</td></tr>
<tr><th>Evidence</th><td>${p.evidence.map(e => `<a class="chip" href="../../research/evidence-table.md">${e}</a>`).join(' ')} <span class="muted">themes ${p.themes.join(', ')}</span></td></tr>
</tbody></table>
<p class="label-synth">composite, reconstructed</p>
</div></div>`;
const body = `
<section class="block prose">
<h2>How the personas were cut</h2>
<p>By accountability, not by seniority alone. The Senior runs the work, the Manager reviews it, the Partner signs it and the Methodology reviewer sets the rules. Each one stands at a different point on the boundary: what they would hand to an agent, what they would never hand off and what would make them trust it. The Associate is covered through contextual inquiry and the anti-persona rather than a card of their own, because in this workflow the Associate executes inside the Senior's plan.</p>
<p><strong>${esc(D.label)}</strong></p>
<p><strong>I decided</strong> ${esc(A.iDecided)} <strong>We built</strong> ${esc(A.weBuilt)}</p>
</section>
<section class="block">
<h2>Persona cards</h2>
${figure(svg, `${A.number} personas. Four composites with goals, core tasks, tools, environment, expertise, frustrations, accountability pressure and stance on AI, each with its evidence rows. One anti-persona with the design response. Standalone: <a href="04-personas.svg">04-personas.svg</a>.`)}
</section>
<section class="block">
<h2>Cards as text</h2>
<div class="grid-2">${D.personas.map(card).join('\n')}</div>
</section>
<section class="block">
<h2>Anti-persona: ${esc(D.anti.name)}, ${esc(D.anti.role)}</h2>
<div class="panel"><div class="panel-b small">
<p>${esc(D.anti.who)}</p>
<table class="doc"><tbody>
<tr><th style="width:30%">Routes around the tool when</th><td>${D.anti.why.map(esc).join('<br>')}</td></tr>
<tr><th>Signals in the product</th><td>${D.anti.signals.map(esc).join('<br>')}</td></tr>
<tr><th>What the design does about it</th><td>${D.anti.design_response.map(esc).join('<br>')}</td></tr>
<tr><th>Evidence</th><td>${D.anti.evidence.map(e => `<a class="chip" href="../../research/evidence-table.md">${e}</a>`).join(' ')} <span class="muted">themes ${D.anti.themes.join(', ')}</span></td></tr>
</tbody></table>
<p>What the anti-persona tells the design: the product has to be faster than the workaround and checking has to be cheaper than trusting. A tool that is slower than a spreadsheet or that hides its work gets routed around by exactly the people who could catch its errors. That is Bainbridge's irony in one person.</p>
</div></div>
</section>
<section class="block">
<h2>Decisions fed</h2>
<p><a class="chip" href="../../decisions.md#d-07">D-07</a> Role-based views of the same run: senior, manager, partner, methodology. <a class="chip" href="../../decisions.md#d-08">D-08</a> Confidence shown as a band with its basis, not a percentage alone.</p>
</section>`;
writeFileSync(join(here, 'index.html'), page(A, body));
console.log(`wrote 04-personas.svg (${W}x${H}) and index.html`);
