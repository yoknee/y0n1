#!/usr/bin/env node
// Builds 01-problem-framing.svg and index.html from constraints.json. Run: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(here, 'constraints.json'), 'utf8'));
const A = D.artifact;
import { esc, wrap, tspans, headerBand, svgDoc, page, figure, mdlink } from '../../../../shared/design-system/svg-lib.mjs';
const DEC = readFileSync(join(here, '..', '..', 'decisions.md'), 'utf8');
const CREATED = new Set((DEC.match(/^## (D-\d\d)/gm) || []).map(h => h.slice(3)));
const decHtml = d => CREATED.has(d) ? `<a class="chip" href="${mdlink('../../decisions.md', d.toLowerCase())}">${d}</a>` : `<span class="chip provisional" title="Provisional register ID from the plan. Record created when its artifact ships.">${d}</span>`;
const W = 1400;
let y = 0, parts = [];
// header band (shared)
const [hb, hh] = headerBand(A, W); parts.push(hb);
// row 1: user problems
y = hh + 16;
parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">USER PROBLEM</text>`);
const bw = (W - 32 - 3 * 12) / 4;
D.user_problems.forEach((p, i) => {
  const x = 16 + i * (bw + 12);
  parts.push(`<rect x="${x}" y="${y + 20}" width="${bw}" height="86" rx="3" class="surf" stroke="var(--bt-border)"/>`);
  parts.push(`<text x="${x + 10}" y="${y + 40}" class="b">${esc(p.name)}</text>`);
  parts.push(`<text class="t11 ink2">${tspans(wrap(p.mechanism, 58), x + 10, y + 58, 14)}</text>`);
});
// row 2: business objective -> boundary
y += 118;
const lw = 440, rw = W - 32 - lw - 60;
parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">BUSINESS OBJECTIVE</text>`);
parts.push(`<rect x="16" y="${y + 20}" width="${lw}" height="104" rx="3" class="surf" stroke="var(--bt-border)"/>`);
parts.push(`<text>${tspans(wrap(D.business_objective, 66), 26, y + 42, 16)}</text>`);
const ax = 16 + lw + 8;
parts.push(`<path d="M${ax} ${y + 72} h40 m-8 -6 l8 6 l-8 6" class="stroke2" stroke-width="1.5"/>`);
const bx = 16 + lw + 60;
parts.push(`<text x="${bx}" y="${y + 12}" class="t11 ink2 b">THE DESIGN PROBLEM: THE BOUNDARY</text>`);
parts.push(`<rect x="${bx}" y="${y + 20}" width="${rw}" height="104" rx="3" class="brand-t" stroke="var(--bt-brand)"/>`);
const bl = wrap(D.boundary, 92);
parts.push(`<text>${tspans(bl, bx + 10, y + 40, 15)}</text>`);
const QS = ['Q1 What may the agent access?', 'Q2 Where must a human review?', 'Q3 How does the auditor see what the agent did?', 'Q4 What happens when the agent is wrong?'];
QS.forEach((q, i) => parts.push(`<text x="${bx + 10 + (i % 2) * 430}" y="${y + 96 + Math.floor(i / 2) * 16}" class="t11 b">${esc(q)}</text>`));

// matrix
y += 140;
parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">CONSTRAINTS MAP: WHICH BOUNDARY QUESTION EACH CONSTRAINT SHAPES, AND THE DESIGN IMPLICATION</text>`);
const cols = { id: 16, name: 56, impl: 300, q: 920, dec: 1120 };
const hy = y + 24;
parts.push(`<rect x="16" y="${hy}" width="${W - 32}" height="26" class="surf2"/>`);
parts.push(`<text x="${cols.id}" y="${hy + 17}" class="t11 ink2">ID</text><text x="${cols.name}" y="${hy + 17}" class="t11 ink2">Constraint</text><text x="${cols.impl}" y="${hy + 17}" class="t11 ink2">Design implication</text>`);
['Q1', 'Q2', 'Q3', 'Q4'].forEach((q, i) => parts.push(`<text x="${cols.q + i * 44 + 12}" y="${hy + 17}" class="t11 ink2 mono" text-anchor="middle">${q}</text>`));
parts.push(`<text x="${cols.dec}" y="${hy + 17}" class="t11 ink2">Shapes decisions</text>`);
let ry = hy + 26;
const RH = 54;
D.constraints.forEach((c, i) => {
  parts.push(`<line x1="16" y1="${ry + RH}" x2="${W - 16}" y2="${ry + RH}" class="hair"/>`);
  parts.push(`<text x="${cols.id}" y="${ry + 20}" class="mono ink2">${c.id}</text>`);
  parts.push(`<text class="b">${tspans(wrap(c.name, 36), cols.name, ry + 20, 15)}</text>`);
  parts.push(`<text class="t11">${tspans(wrap(c.design_implication, 100), cols.impl, ry + 19, 14)}</text>`);
  if (c.questions.length) for (let q = 1; q <= 4; q++) {
    const cx = cols.q + (q - 1) * 44 + 12, cy = ry + RH / 2;
    if (c.questions.includes(q)) parts.push(`<rect x="${cx - 6}" y="${cy - 6}" width="12" height="12" rx="2" class="brand"><title>${c.id} shapes ${QS[q - 1]}</title></rect>`);
    else parts.push(`<line x1="${cx - 4}" y1="${cy}" x2="${cx + 4}" y2="${cy}" class="hair"/>`);
  }
  else parts.push(`<text x="${cols.q + 2 * 44 - 10}" y="${ry + RH / 2 + 4}" class="t11 ink3" text-anchor="middle">framework</text>`);
  c.shapes.forEach((d, k) => {
    const x = cols.dec + k * 58;
    const prov = !CREATED.has(d);
    parts.push(`<rect x="${x}" y="${ry + RH / 2 - 10}" width="52" height="20" rx="3" class="surf" stroke="var(--bt-${prov ? 'ink-3' : 'border'})" ${prov ? 'stroke-dasharray="3 2"' : ''}><title>${d}${prov ? ', provisional register ID' : ''}</title></rect><text x="${x + 26}" y="${ry + RH / 2 + 4}" class="t11 mono${prov ? ' ink2' : ''}" text-anchor="middle">${d}</text>`);
  });
  ry += RH;
});
y = ry + 10;
parts.push(`<rect x="${cols.q}" y="${y + 4}" width="12" height="12" rx="2" class="brand"/><text x="${cols.q + 18}" y="${y + 14}" class="t11 ink2">shapes this question</text>`);
parts.push(`<text x="${cols.q + 150}" y="${y + 14}" class="t11 ink2">framework: shapes the pattern library rather than one question.</text>`);
parts.push(`<text x="16" y="${y + 30}" class="t11 ink2">Dashed chips are provisional register IDs from the plan (D-12 onward); their records are created when artifacts 07 to 14 ship.</text>`);
const H = y + 44;

const svgDocStr = svgDoc(A, W, H, parts.join('\n'), '01-constraints');
writeFileSync(join(here, '01-problem-framing.svg'), svgDocStr);

// ---- index.html ----
const triad = D.constraints.map(c => `<tr><td class="mono">${c.id}</td><td><strong>${esc(c.name)}</strong></td><td>${esc(c.user_need)}</td><td>${esc(c.business_objective)}</td><td>${esc(c.technical_constraint)}</td><td>${esc(c.design_implication)}<br><span class="muted small">${esc(c.principle)}</span></td><td>${c.questions.length ? c.questions.map(q => `Q${q}`).join(', ') : '<span class="muted">framework</span>'}</td><td>${c.shapes.map(decHtml).join(' ')}</td></tr>`).join('\n');
const changeRows = D.session_changes.map(c => `<tr><td class="mono">${c.row}</td><td>${esc(c.what)}</td><td><span class="label-synth">${c.label}</span></td></tr>`).join('\n');
const problems = D.user_problems.map(p => `<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.mechanism)}</td></tr>`).join('\n');
const body = `

<section class="block prose">
<h2>The design problem</h2>
<p>${esc(D.business_objective)}</p>
<p>${esc(D.boundary)} Those four questions run under every artifact in this case. This artifact fixes the constraints each one answers under.</p>
<p>I framed the problem this way at the start of discovery, before the research in 02 and 03. The research tested the framing rather than produced it. Where a constraint below was sharpened by a finding, the evidence table in 03 says so.</p>
<p><strong>I decided:</strong> ${esc(A.iDecided)} <strong>We built:</strong> ${esc(A.weBuilt)}</p>
</section>

<section class="block">
<h2>The user problem</h2>
<p class="muted small">Four problems as framed at discovery start. Each has a mechanism, not an adjective. Validated against the synthesis in 03.</p>
<table class="doc"><thead><tr><th style="width:22%">Problem</th><th>Mechanism</th></tr></thead><tbody>
${problems}
</tbody></table>
</section>

<section class="block">
<h2>Constraints map</h2>
${figure(svgDocStr, `${esc(A.number)} constraints map. Seven constraints, the boundary question each one shapes and the design implication. Filled squares mark the question a constraint shapes; "framework" marks constraints that shape the pattern library rather than one question. Also available as a standalone file: <a href="01-problem-framing.svg">01-problem-framing.svg</a>.`)}
</section>

<section class="block">
<h2>Triad table</h2>
<p class="muted small">One row per constraint: the user need, the business objective, the technical constraint and the design implication with the principle it rests on. This table is what PMs and engineering leads planned against. It is the first thing a new designer on the team reads. Shapes column: IDs from D-12 onward are provisional register IDs from PLAN.md section 9, rendered dashed until their artifacts ship.</p>
<div class="scroll" tabindex="0" role="region" aria-label="Triad table"><table class="doc">
<thead><tr><th>ID</th><th>Constraint</th><th>User need</th><th>Business objective</th><th>Technical constraint</th><th>Design implication</th><th>Q</th><th>Shapes</th></tr></thead>
<tbody>
${triad}
</tbody></table></div>
</section>

<section class="block">
<h2>What changed after the sessions</h2>
<p class="muted small">Reconstructed. What methodology reviewers, the engagement data lead and engineering leads changed in the triad table.</p>
<table class="doc"><thead><tr><th style="width:8%">Row</th><th>What changed</th><th>Label</th></tr></thead><tbody>${changeRows}</tbody></table>
</section>

<section class="block prose">
<h2>What this framing rules out</h2>
<p>A chat assistant beside the workpaper. It answers questions but leaves C1, C2 and C4 untouched: the record is a transcript, the auditor cannot show what was read and review has nowhere to live. An agent that writes directly into workpaper cells. It violates C2 and hides the steps C4 requires. Both directions were sketched and rejected in 07; the rejection reasons are these constraints.</p>
<p>What it rules in: explicit agent runs with recorded steps, a permission model the auditor can see, review as a destination and sign-off as a human-only control. That is D-01. The data classes in C3 are D-05.</p>
</section>

<section class="block">
<h2>Sources and labels</h2>
<table class="doc"><thead><tr><th style="width:30%">Item</th><th>Source</th></tr></thead><tbody>
<tr><td>Business objective, user problem, constraint list</td><td>Stated scope of the role. The four user problems and seven constraints are the ones the case prompt names.</td></tr>
<tr><td>10,000+ auditors; ~50 people on the platform at MVP; 6 product teams and 120+ engineers at the scale phase; design team of 3 at MVP</td><td>Stated. The six teams and 120+ engineers are today's scale, not the MVP's.</td></tr>
<tr><td>Four data classes and their names</td><td>Reconstructed from stated scope ("defining what an agent may access"), confirmed at Gate 1. The production platform's classes are not depicted.</td></tr>
<tr><td>Principles cited</td><td>Named in one line per row. Full rationale in <a href="${mdlink('../../decisions.md')}">decisions.md</a>.</td></tr>
<tr><td>Figures</td><td>None in this artifact beyond the stated counts above. Nothing is measured.</td></tr>
</tbody></table>
</section>

<section class="block">
<h2>Decisions fed</h2>
<p><a class="chip" href="${mdlink('../../decisions.md', 'd-01')}">D-01</a> The human-agent boundary is the design problem, not the chat interface. <a class="chip" href="${mdlink('../../decisions.md', 'd-05')}">D-05</a> Four data classes; agents read engagement data, propose conclusions, never write sign-offs.</p>
</section>

`;
writeFileSync(join(here, 'index.html'), page(A, body));
console.log(`wrote 01-problem-framing.svg (${W}x${H}) and index.html`);
