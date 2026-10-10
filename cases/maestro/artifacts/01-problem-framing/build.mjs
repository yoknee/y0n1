#!/usr/bin/env node
// Builds 01-problem-framing.svg and index.html from constraints.json. Run: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(here, 'constraints.json'), 'utf8'));
const A = D.artifact;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const wrap = (s, n) => { const w = String(s).split(' '), out = []; let l = ''; for (const x of w) { if ((l + ' ' + x).trim().length > n) { out.push(l.trim()); l = x; } else l = (l + ' ' + x); } if (l.trim()) out.push(l.trim()); return out; };
const tspans = (lines, x, y, lh, cls = '') => lines.map((t, i) => `<tspan x="${x}" y="${y + i * lh}"${cls ? ` class="${cls}"` : ''}>${esc(t)}</tspan>`).join('');

// ---- standalone SVG style: svg:root matches only when the SVG is the document root ----
const STYLE = `
<style>
@font-face{font-family:"Plex Sans";font-weight:400;src:url("/shared/vendor/fonts/plex/IBMPlexSans-Regular-Latin1.woff2") format("woff2")}
@font-face{font-family:"Plex Sans";font-weight:600;src:url("/shared/vendor/fonts/plex/IBMPlexSans-SemiBold-Latin1.woff2") format("woff2")}
@font-face{font-family:"Plex Mono";font-weight:400;src:url("/shared/vendor/fonts/plex/IBMPlexMono-Regular-Latin1.woff2") format("woff2")}
svg:root{--bt-surface:#FFFFFF;--bt-surface-2:#F3F5F8;--bt-surface-3:#E8EBF0;--bt-border:#CFD5DD;--bt-ink:#14181F;--bt-ink-2:#4A5361;--bt-ink-3:#687180;--bt-brand:#3B4FD8;--bt-brand-tint:#E8EBFB;--bt-agent:#0E7C7B;--bt-agent-tint:#DDF3F2;--bt-failed:#B42318;--bt-font-sans:"Plex Sans",system-ui,sans-serif;--bt-font-mono:"Plex Mono",ui-monospace,monospace;background:var(--bt-surface)}
@media (prefers-color-scheme:dark){svg:root{--bt-surface:#0F1319;--bt-surface-2:#171C24;--bt-surface-3:#1F2630;--bt-border:#2C343F;--bt-ink:#E6EAF0;--bt-ink-2:#A5AEBB;--bt-ink-3:#7E8794;--bt-brand:#8FA0FF;--bt-brand-tint:#1C2347;--bt-agent:#5FD3CF;--bt-agent-tint:#103A3A;--bt-failed:#FF8A80}}
.ink{fill:var(--bt-ink)}.ink2{fill:var(--bt-ink-2)}.ink3{fill:var(--bt-ink-3)}.surf{fill:var(--bt-surface)}.surf2{fill:var(--bt-surface-2)}.surf3{fill:var(--bt-surface-3)}
.hair{stroke:var(--bt-border);fill:none}.stroke2{stroke:var(--bt-ink-2);fill:none}.brand{fill:var(--bt-brand)}.brand-s{stroke:var(--bt-brand);fill:none}.brand-t{fill:var(--bt-brand-tint)}.agent{fill:var(--bt-agent)}.agent-t{fill:var(--bt-agent-tint)}
text{font-family:var(--bt-font-sans);font-size:12px;fill:var(--bt-ink)}text.mono{font-family:var(--bt-font-mono)}text.t11{font-size:11px}text.t14{font-size:14px;font-weight:600}text.t16{font-size:16px;font-weight:600}text.b{font-weight:600}
</style>`;

const W = 1400;
let y = 0, parts = [];
// header band
parts.push(`<rect x="0" y="0" width="${W}" height="72" class="surf2"/><line x1="0" y1="72" x2="${W}" y2="72" class="hair"/>`);
parts.push(`<text x="16" y="26" class="t16">${esc(A.number)} ${esc(A.title)}</text>`);
parts.push(`<text class="t11 ink2">${tspans(wrap(`Question: ${A.question}`, 118), 16, 46, 12)}</text>`);
parts.push(`<text x="16" y="66" class="t11 ink2">Feeds: ${A.decisions.join(', ')}  |  Status: ${esc(A.status)}</text>`);
parts.push(`<text class="t11 ink2">${tspans(wrap('I decided: ' + A.iDecided, 100), 760, 22, 13)}</text>`);
parts.push(`<text class="t11 ink2">${tspans(wrap('We built: ' + A.weBuilt, 100), 760, 50, 13)}</text>`);

// row 1: user problems
y = 88;
parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">USER PROBLEM</text>`);
const bw = (W - 32 - 3 * 12) / 4;
D.user_problems.forEach((p, i) => {
  const x = 16 + i * (bw + 12);
  parts.push(`<rect x="${x}" y="${y + 20}" width="${bw}" height="86" rx="3" class="surf" stroke="var(--bt-border)"/>`);
  parts.push(`<text x="${x + 10}" y="${y + 40}" class="b">${esc(p.name)}</text>`);
  parts.push(`<text class="t11 ink2">${tspans(wrap(p.mechanism, 58), x + 10, y + 58, 14)}</text>`);
});
// row 2: business objective -> boundary
y = 206;
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
y = 346;
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
    parts.push(`<rect x="${x}" y="${ry + RH / 2 - 10}" width="52" height="20" rx="3" class="surf" stroke="var(--bt-border)"/><text x="${x + 26}" y="${ry + RH / 2 + 4}" class="t11 mono" text-anchor="middle">${d}</text>`);
  });
  ry += RH;
});
y = ry + 10;
parts.push(`<rect x="${cols.q}" y="${y + 4}" width="12" height="12" rx="2" class="brand"/><text x="${cols.q + 18}" y="${y + 14}" class="t11 ink2">shapes this question</text>`);
parts.push(`<text x="${cols.q + 150}" y="${y + 14}" class="t11 ink2">framework: shapes the pattern library rather than one question.</text>`);
parts.push(`<text x="${cols.q}" y="${y + 30}" class="t11 ink2">Decision IDs beyond D-05 are assigned when their artifacts ship.</text>`);
const H = y + 44;

const svgInner = parts.join('\n');
const svgDoc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
<title id="t">${esc(A.number)} ${esc(A.title)}</title>
<desc id="d">${esc(A.question)} Decisions fed: ${A.decisions.join(', ')}. Status: ${esc(A.status)}. Reconstructed for portfolio purposes; illustrative.</desc>
${STYLE}
${svgInner}
</svg>`;
writeFileSync(join(here, '01-problem-framing.svg'), svgDoc);

// ---- index.html ----
const triad = D.constraints.map(c => `<tr><td class="mono">${c.id}</td><td><strong>${esc(c.name)}</strong></td><td>${esc(c.user_need)}</td><td>${esc(c.business_objective)}</td><td>${esc(c.technical_constraint)}</td><td>${esc(c.design_implication)}<br><span class="muted small">${esc(c.principle)}</span></td><td>${c.questions.length ? c.questions.map(q => `Q${q}`).join(', ') : '<span class="muted">framework</span>'}</td><td>${c.shapes.map(d => `<span class="chip">${d}</span>`).join(' ')}</td></tr>`).join('\n');
const problems = D.user_problems.map(p => `<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.mechanism)}</td></tr>`).join('\n');
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(A.number)} ${esc(A.title)}</title>
<link rel="icon" href="/shared/brand/baton/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="/shared/brand/baton/tokens.css">
<link rel="stylesheet" href="/shared/design-system/base.css">
<link rel="stylesheet" href="/shared/design-system/header.css">
<script type="application/json" id="artifact-meta">${JSON.stringify({ number: A.number, title: A.title, question: A.question, decisions: A.decisions, status: A.status, iDecided: A.iDecided, weBuilt: A.weBuilt, questions: A.questions }, null, 1)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="page">
<header id="artifact-header"></header>
<main id="main">

<section class="block prose">
<h2>The design problem</h2>
<p>${esc(D.business_objective)}</p>
<p>${esc(D.boundary)} Those four questions run under every artifact in this case. This artifact fixes the constraints each one answers under.</p>
<p>I framed the problem this way at the start of discovery, before the research in 02 and 03. The research tested the framing rather than produced it. Where a constraint below was sharpened by a finding, the evidence table in 03 says so.</p>
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
<figure class="art">
${svgDoc.replace(/<svg /, '<svg style="width:100%;height:auto" ')}
<figcaption>${esc(A.number)} constraints map. Seven constraints, the boundary question each one shapes and the design implication. Filled squares mark the question a constraint shapes; "framework" marks constraints that shape the pattern library rather than one question. Also available as a standalone file: <a href="01-problem-framing.svg">01-problem-framing.svg</a>.</figcaption>
</figure>
</section>

<section class="block">
<h2>Triad table</h2>
<p class="muted small">One row per constraint: the user need, the business objective, the technical constraint and the design implication with the principle it rests on. This table is what PMs and engineering leads planned against. It is the first thing a new designer on the team reads.</p>
<div style="overflow:auto"><table class="doc">
<thead><tr><th>ID</th><th>Constraint</th><th>User need</th><th>Business objective</th><th>Technical constraint</th><th>Design implication</th><th>Q</th><th>Shapes</th></tr></thead>
<tbody>
${triad}
</tbody></table></div>
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
<tr><td>10,000+ auditors, 6 product teams, 120+ engineers, design team of 3 at MVP</td><td>Stated.</td></tr>
<tr><td>Four data classes and their names</td><td>Reconstructed from stated scope ("defining what an agent may access"), confirmed at Gate 1. The production platform's classes are not depicted.</td></tr>
<tr><td>Principles cited</td><td>Named in one line per row. Full rationale in <a href="../../decisions.md">decisions.md</a>.</td></tr>
<tr><td>Figures</td><td>None in this artifact beyond the stated counts above. Nothing is measured.</td></tr>
</tbody></table>
</section>

<section class="block">
<h2>Decisions fed</h2>
<p><a class="chip" href="../../decisions.md#d-01">D-01</a> The human-agent boundary is the design problem, not the chat interface. <a class="chip" href="../../decisions.md#d-05">D-05</a> Four data classes; agents read engagement data, propose conclusions, never write sign-offs.</p>
</section>

</main>
</div>
<script src="/shared/design-system/header.js"></script>
</body>
</html>
`;
writeFileSync(join(here, 'index.html'), html);
console.log(`wrote 01-problem-framing.svg (${W}x${H}) and index.html`);
