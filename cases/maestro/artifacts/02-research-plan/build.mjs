#!/usr/bin/env node
// Builds 02-research-plan.svg (method map) and index.html from methods.json. Run: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, wrap, tspans, headerBand, svgDoc, page, figure, mdlink } from '../../../../shared/design-system/svg-lib.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(here, 'methods.json'), 'utf8'));
const A = D.artifact;
const W = 1400;
const parts = [];
const [hb, hh] = headerBand(A, W); parts.push(hb);

// columns
const C = { id: 16, name: 52, type: 330, phase: 392, rq: 820, n: 1030, label: 1180 };
const PW = 56; // phase column width
let y = hh + 16;
parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">METHOD MAP: WHAT RAN WHEN, WHICH QUESTION IT ANSWERS AND HOW BIG IT WAS PLANNED TO BE</text>`);
const hy = y + 24;
parts.push(`<rect x="16" y="${hy}" width="${W - 32}" height="40" class="surf2"/>`);
parts.push(`<text x="${C.id}" y="${hy + 24}" class="t11 ink2">ID</text><text x="${C.name}" y="${hy + 24}" class="t11 ink2">Method</text><text x="${C.type}" y="${hy + 24}" class="t11 ink2">Type</text>`);
D.phases.forEach((p, i) => { const [id, ...rest] = p.split(' '); parts.push(`<text x="${C.phase + i * PW + PW / 2}" y="${hy + 16}" class="t11 ink2 mono" text-anchor="middle">${id}</text><text x="${C.phase + i * PW + PW / 2}" y="${hy + 30}" class="t10 ink3" text-anchor="middle">${esc(rest.join(' '))}</text>`); });
D.rqs.forEach((r, i) => parts.push(`<text x="${C.rq + i * 40 + 20}" y="${hy + 24}" class="t11 ink2 mono" text-anchor="middle">${r.id}</text>`));
parts.push(`<text x="${C.n}" y="${hy + 24}" class="t11 ink2">Planned n</text><text x="${C.label}" y="${hy + 24}" class="t11 ink2">Label</text>`);
let ry = hy + 40; const RH = 34;
D.methods.forEach(m => {
  parts.push(`<line x1="16" y1="${ry + RH}" x2="${W - 16}" y2="${ry + RH}" class="hair"/>`);
  parts.push(`<text x="${C.id}" y="${ry + 21}" class="mono ink2">${m.id}</text>`);
  parts.push(`<text x="${C.name}" y="${ry + 21}" class="${m.label === 'real' ? 'b' : ''}">${esc(m.name)}</text>`);
  const tc = { qual: 'agent-t', quant: 'brand-t', mixed: 'edited-t' }[m.type];
  parts.push(`<rect x="${C.type}" y="${ry + 8}" width="44" height="18" rx="9" class="${tc}"/><text x="${C.type + 22}" y="${ry + 21}" class="t11" text-anchor="middle">${m.type}</text>`);
  // phase bar
  const x0 = C.phase + (m.span[0] - 1) * PW + 4, x1 = C.phase + m.span[1] * PW - 4;
  parts.push(`<rect x="${x0}" y="${ry + 11}" width="${x1 - x0}" height="12" rx="2" class="${m.label === 'real' ? 'brand' : 'surf3'}" ${m.label === 'real' ? '' : 'stroke="var(--bt-ink-3)" stroke-width="1"'}><title>${m.id} runs ${D.phases[m.span[0] - 1]} to ${D.phases[m.span[1] - 1]}</title></rect>`);
  // rq dots
  for (let r = 1; r <= 5; r++) { const cx = C.rq + (r - 1) * 40 + 20, cy = ry + RH / 2; if (m.rq.includes(r)) parts.push(`<circle cx="${cx}" cy="${cy}" r="5" class="brand"><title>${m.id} answers RQ${r}</title></circle>`); else parts.push(`<line x1="${cx - 3}" y1="${cy}" x2="${cx + 3}" y2="${cy}" class="hair"/>`); }
  parts.push(`<text x="${C.n}" y="${ry + 21}" class="${m.label === 'real' ? 'b' : ''}">${esc(m.n)}</text>`);
  parts.push(`<text x="${C.label}" y="${ry + 21}" class="t11 ${m.label === 'real' ? 'b' : 'ink2 mono'}">${esc(m.label)}</text>`);
  ry += RH;
});
y = ry + 12;
parts.push(`<rect x="16" y="${y + 2}" width="20" height="12" rx="2" class="surf3" stroke="var(--bt-ink-3)"/><text x="42" y="${y + 12}" class="t11 ink2">planned target</text>`);
parts.push(`<rect x="150" y="${y + 2}" width="20" height="12" rx="2" class="brand"/><text x="176" y="${y + 12}" class="t11 ink2">real count (the dry run only)</text>`);
parts.push(`<circle cx="360" cy="${y + 8}" r="5" class="brand"/><text x="372" y="${y + 12}" class="t11 ink2">answers this research question</text>`);
parts.push(`<text x="16" y="${y + 32}" class="t11 ink2">Every n except the dry run is a planned target. No result is reported in this artifact.</text>`);
const H = y + 44;
const svg = svgDoc(A, W, H, parts.join('\n'), '02-methods');
writeFileSync(join(here, '02-research-plan.svg'), svg);

const rqRows = D.rqs.map(r => `<tr><td class="mono">${r.id}</td><td>${esc(r.text)}</td></tr>`).join('\n');
const link = m => m.instrument.startsWith('artifact') ? `<span class="muted">${esc(m.instrument)}</span>` : `<a href="${mdlink('../../' + m.instrument)}">${esc(m.instrument.split('/').pop().replace('.md', '').replace('#m1', ' (M1 protocol)').replace('#m8', ' (M8 event set)'))}</a>`;
const mRows = D.methods.map(m => `<tr><td class="mono">${m.id}</td><td>${esc(m.name)}</td><td>${m.type}</td><td>${D.phases[m.span[0] - 1].split(' ')[0]}${m.span[1] !== m.span[0] ? ' to ' + D.phases[m.span[1] - 1].split(' ')[0] : ''}</td><td>${m.rq.map(r => 'RQ' + r).join(', ')}</td><td>${m.label === 'real' ? '<strong>' + esc(m.n) + '</strong>' : esc(m.n)}</td><td><span class="label-synth">${m.label}</span></td><td>${link(m)}</td><td>${esc(m.analysis)}</td><td>${esc(m.limits)}</td></tr>`).join('\n');
const body = `
<section class="block prose">
<h2>What this artifact is</h2>
<p>The research plan, its instruments and its limits. The full plan with recruiting rules, analysis method and what feeds what is in <a href="${mdlink('../../research/plan.md')}">research/plan.md</a>. The six instruments are in <a href="../../research/instruments/">research/instruments/</a>. This page is the map.</p>
<p>Every participant count is a planned target except two real figures: 20 engagement teams in the dry run and 1,600+ feedback items. No result is reported here. Findings appear in 03 as reconstructed and labeled.</p>
</section>
<section class="block">
<h2>Research questions</h2>
<table class="doc"><thead><tr><th style="width:8%">ID</th><th>Question</th></tr></thead><tbody>${rqRows}</tbody></table>
</section>
<section class="block">
<h2>Method map</h2>
${figure(svg, `${esc(A.number)} method map. Thirteen methods across seven phases. Bars show when each method runs; dots show which research question it answers; the last two columns carry the planned n and its label. Standalone file: <a href="02-research-plan.svg">02-research-plan.svg</a>.`)}
</section>
<section class="block">
<h2>Methods, instruments, analysis and limits</h2>
<div class="scroll" tabindex="0" role="region" aria-label="Methods table"><table class="doc">
<thead><tr><th>ID</th><th>Method</th><th>Type</th><th>Phase</th><th>RQ</th><th>Planned n</th><th>Label</th><th>Instrument</th><th>Analysis</th><th>Limitations</th></tr></thead>
<tbody>${mRows}</tbody></table></div>
</section>
<section class="block prose">
<h2>Why this mix</h2>
<p>Contextual inquiry anchors the plan because busy-season fieldwork is where the problem lives. Self-report cannot recover where ninety seconds went between opening a document and finding a field. Watching can. Interviews, the diary and the survey test what the fieldwork found from other angles. SME sessions run through P5 because the checkpoint rules change when agentic workflows arrive.</p>
<p>The quantitative methods are sized to find where time concentrates and to set a baseline, not to claim significance. That is why the plan reports descriptives and why every later outcome in this case is directional with a mechanism.</p>
<p><strong>I decided:</strong> the mix, the sampling frames and the anchor method. <strong>We built:</strong> the instruments, the screeners, the fieldwork and the coding as a team, two coders per qualitative source. Design team of three at this phase.</p>
</section>
<section class="block">
<h2>Limitations of the plan as a whole</h2>
<ul>
<li>Every count outside the dry run is a planned target. This reconstruction reports the plan. Which of these methods ran at what scale is not confirmed here, so no result is reported.</li>
<li>Busy season access shapes the sample. Teams that can host an observer are not the teams under the most pressure.</li>
<li>The plan was written for one firm's methodology. Other firms sequence the lifecycle differently.</li>
<li>I designed the plan and made the product decisions it informed. Two coders and the SME sessions are the check on that.</li>
</ul>
</section>
<section class="block">
<h2>Decisions fed</h2>
<p><a class="chip" href="${mdlink('../../decisions.md', 'd-02')}">D-02</a> Mixed-method research with contextual inquiry as the anchor method.</p>
</section>`;
writeFileSync(join(here, 'index.html'), page(A, body));
console.log(`wrote 02-research-plan.svg (${W}x${H}) and index.html`);
