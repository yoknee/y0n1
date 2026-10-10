#!/usr/bin/env node
// Builds 06-jtbd.md, 06-opportunity-tree.svg, 06-prioritization.svg and index.html from opportunity.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, wrap, tspans, headerBand, svgDoc, page, figure } from '../../../../shared/design-system/svg-lib.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(here, 'opportunity.json'), 'utf8'));
const A = D.artifact;
const W = 1400;
const sols = D.opportunities.flatMap(o => o.solutions.map(s => ({ ...s, opp: o.id })));
const stateCls = { in: 'brand', cut: 'failed', later: 'review' };
const stateWord = { in: 'MVP', cut: 'cut', later: 'later' };

// ---- 06-jtbd.md ----
let md = `| | |\n|---|---|\n| Title | Jobs to be done |\n| Artifact | ${A.number} ${A.title} |\n| Question it answers | What is each role trying to get done in their situation and what outcome do they want? |\n| Decisions it feeds | ${A.decisions.join(', ')} |\n| Status | ${A.status} |\n\n> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.\n\n**I decided** ${A.iDecided} **We built** ${A.weBuilt}\n\n${D.label}\n\n## Outcome\n\n${D.outcome}\n\n## Job statements\n\nFormat: when [situation], I want [motivation], so I can [outcome]. Each job cites the themes in 03 it rests on.\n\n| Role | When | I want | So I can | Themes |\n|---|---|---|---|---|\n`;
for (const j of D.jobs) md += `| ${j.role} | ${j.when} | ${j.want} | ${j.so} | ${j.themes.join(', ')} |\n`;
md += `\n## Opportunities\n\n| ID | Opportunity | Themes | Solutions |\n|---|---|---|---|\n` + D.opportunities.map(o => `| ${o.id} | ${o.name} | ${o.themes.join(', ')} | ${o.solutions.map(s => `${s.id} ${s.name} (${stateWord[s.mvp]})`).join('; ')} |`).join('\n') + '\n';
md += `\n## MVP scope\n\n${D.mvp_scope}\n\n${D.mvp_areas_why}\n\n## Cut for MVP and why\n\n| ID | Solution | State | Why |\n|---|---|---|---|\n` + sols.filter(s => s.mvp !== 'in').map(s => `| ${s.id} | ${s.name} | ${stateWord[s.mvp]} | ${s.why} |`).join('\n') + '\n';
writeFileSync(join(here, '06-jtbd.md'), md);

// ---- opportunity tree SVG (left to right: outcome, opportunities, solutions, experiments) ----
{
  const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
  let y = hh + 14;
  parts.push(`<text x="16" y="${y + 10}" class="t11 ink2 b">OPPORTUNITY SOLUTION TREE: OUTCOME TO OPPORTUNITIES TO SOLUTIONS TO EXPERIMENTS. SOLUTION STATE: MVP, CUT OR LATER.</text>`); y += 22;
  const X = { out: 16, opp: 250, sol: 560, exp: 980 }, WD = { out: 200, opp: 270, sol: 380, exp: 404 }, RH = 46;
  const top = y + 20;
  ['OUTCOME', 'OPPORTUNITY', 'SOLUTION', 'EXPERIMENT'].forEach((t, i) => parts.push(`<text x="${Object.values(X)[i]}" y="${y + 10}" class="t10 ink2 b">${t}</text>`));
  let ry = top; let oppRows = [];
  for (const o of D.opportunities) {
    const start = ry;
    for (const s of o.solutions) {
      parts.push(`<rect x="${X.sol}" y="${ry}" width="${WD.sol}" height="${RH - 6}" rx="3" class="surf" stroke="var(--bt-${stateCls[s.mvp]})" stroke-width="${s.mvp === 'in' ? 1.5 : 1}" ${s.mvp !== 'in' ? 'stroke-dasharray="4 3"' : ''}/>`);
      parts.push(`<text x="${X.sol + 8}" y="${ry + 15}" class="t10 mono ink2">${s.id}</text><rect x="${X.sol + WD.sol - 46}" y="${ry + 5}" width="40" height="14" rx="7" class="${stateCls[s.mvp]}-t"/><text x="${X.sol + WD.sol - 26}" y="${ry + 15}" class="t10" text-anchor="middle">${stateWord[s.mvp]}</text>`);
      parts.push(`<text class="t11">${tspans(wrap(s.name, 56).slice(0, 2), X.sol + 8, ry + 29, 12)}</text>`);
      parts.push(`<text class="t10 ink2">${tspans(wrap(s.experiment, 68).slice(0, 3), X.exp, ry + 13, 12)}</text>`);
      parts.push(`<line x1="${X.sol + WD.sol}" y1="${ry + (RH - 6) / 2}" x2="${X.exp - 6}" y2="${ry + (RH - 6) / 2}" class="hair"/>`);
      parts.push(`<line x1="${X.opp + WD.opp}" y1="${ry + (RH - 6) / 2}" x2="${X.sol}" y2="${ry + (RH - 6) / 2}" class="stroke2"/>`);
      ry += RH;
    }
    const h = ry - start - 6;
    parts.push(`<rect x="${X.opp}" y="${start}" width="${WD.opp}" height="${h}" rx="3" class="surf2" stroke="var(--bt-border)"/><text x="${X.opp + 8}" y="${start + 15}" class="t10 mono ink2">${o.id}</text><text class="t11 b">${tspans(wrap(o.name, 36), X.opp + 8, start + 30, 13)}</text><text x="${X.opp + 8}" y="${start + h - 8}" class="t10 mono ink3">${o.themes.join(', ')}</text>`);
    oppRows.push(start + h / 2);
    ry += 6;
  }
  const oh = ry - top - 6;
  parts.push(`<rect x="${X.out}" y="${top}" width="${WD.out}" height="${oh}" rx="3" class="brand-t" stroke="var(--bt-brand)"/><text class="t11 b">${tspans(wrap(D.outcome, 30), X.out + 10, top + 20, 14)}</text>`);
  for (const oy of oppRows) parts.push(`<line x1="${X.out + WD.out}" y1="${oy}" x2="${X.opp}" y2="${oy}" class="stroke2"/>`);
  y = ry + 8;
  [['in', 'in MVP'], ['later', 'later phase'], ['cut', 'cut, with the reason in the table']].forEach(([k, t], i) => parts.push(`<rect x="${16 + i * 190}" y="${y}" width="30" height="14" rx="3" class="surf" stroke="var(--bt-${stateCls[k]})" ${k !== 'in' ? 'stroke-dasharray="4 3"' : 'stroke-width="1.5"'}/><text x="${52 + i * 190}" y="${y + 11}" class="t11 ink2">${t}</text>`));
  parts.push(`<text x="16" y="${y + 32}" class="t11 ink2">${esc(D.label)}</text>`);
  writeFileSync(join(here, '06-opportunity-tree.svg'), svgDoc(A, W, y + 46, parts.join('\n')));
}
// ---- prioritization 2x2 ----
{
  const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
  let y = hh + 14;
  parts.push(`<text x="16" y="${y + 10}" class="t11 ink2 b">PRIORITIZATION: USER VALUE AGAINST FEASIBILITY UNDER THE CONSTRAINTS IN 01. RATINGS ARE JUDGMENT, NOT MEASUREMENT.</text>`); y += 24;
  const px = 70, py = y + 10, S = 520;
  const fx = v => px + (v - 1) / 4 * S, fy = v => py + S - (v - 1) / 4 * S;
  parts.push(`<rect x="${px}" y="${py}" width="${S}" height="${S}" class="surf2" stroke="var(--bt-border)"/>`);
  parts.push(`<line x1="${px + S / 2}" y1="${py}" x2="${px + S / 2}" y2="${py + S}" class="hair"/><line x1="${px}" y1="${py + S / 2}" x2="${px + S}" y2="${py + S / 2}" class="hair"/>`);
  parts.push(`<text x="${px + S / 4}" y="${py + 16}" class="t10 ink3" text-anchor="middle">high value, hard: sequence</text><text x="${px + 3 * S / 4}" y="${py + 16}" class="t10 ink3" text-anchor="middle">high value, feasible: MVP</text><text x="${px + S / 4}" y="${py + S - 8}" class="t10 ink3" text-anchor="middle">low value, hard: cut</text><text x="${px + 3 * S / 4}" y="${py + S - 8}" class="t10 ink3" text-anchor="middle">low value, feasible: only if free</text>`);
  parts.push(`<text x="${px + S / 2}" y="${py + S + 22}" class="t11 ink2" text-anchor="middle">Feasibility under the constraints (1 low to 5 high)</text>`);
  parts.push(`<text transform="translate(${px - 14} ${py + S / 2}) rotate(-90)" class="t11 ink2" text-anchor="middle">User value (1 low to 5 high)</text>`);
  for (const s of sols) {
    const x = fx(s.feasibility), yy = fy(s.value);
    if (s.mvp === 'in') parts.push(`<circle cx="${x}" cy="${yy}" r="7" class="brand"/>`);
    else if (s.mvp === 'later') parts.push(`<rect x="${x - 6}" y="${yy - 6}" width="12" height="12" class="surf" stroke="var(--bt-review)" stroke-width="2"/>`);
    else parts.push(`<path d="M${x} ${yy - 8} l8 8 l-8 8 l-8 -8 z" class="surf" stroke="var(--bt-failed)" stroke-width="2"/>`);
    parts.push(`<text x="${x + 11}" y="${yy + 4}" class="t10 mono">${s.id}</text>`);
  }
  // legend and table at right
  const tx = px + S + 50; let ty = py;
  parts.push(`<circle cx="${tx + 7}" cy="${ty + 7}" r="7" class="brand"/><text x="${tx + 22}" y="${ty + 11}" class="t11 ink2">in MVP</text><rect x="${tx + 86}" y="${ty + 1}" width="12" height="12" class="surf" stroke="var(--bt-review)" stroke-width="2"/><text x="${tx + 104}" y="${ty + 11}" class="t11 ink2">later phase</text><path d="M${tx + 190} ${ty - 1} l8 8 l-8 8 l-8 -8 z" class="surf" stroke="var(--bt-failed)" stroke-width="2"/><text x="${tx + 204}" y="${ty + 11}" class="t11 ink2">cut</text>`);
  ty += 28;
  parts.push(`<rect x="${tx}" y="${ty}" width="${W - 16 - tx}" height="22" class="surf2"/><text x="${tx + 6}" y="${ty + 15}" class="t10 ink2">ID</text><text x="${tx + 40}" y="${ty + 15}" class="t10 ink2">Solution</text><text x="${tx + 460}" y="${ty + 15}" class="t10 ink2 mono">val</text><text x="${tx + 500}" y="${ty + 15}" class="t10 ink2 mono">feas</text><text x="${tx + 548}" y="${ty + 15}" class="t10 ink2">State</text>`);
  ty += 22;
  for (const s of sols) {
    parts.push(`<line x1="${tx}" y1="${ty + 32}" x2="${W - 16}" y2="${ty + 32}" class="hair"/><text x="${tx + 6}" y="${ty + 14}" class="t10 mono">${s.id}</text><text class="t10">${tspans(wrap(s.name, 70).slice(0, 2), tx + 40, ty + 13, 12)}</text><text x="${tx + 460}" y="${ty + 14}" class="t10 mono">${s.value.toFixed(1)}</text><text x="${tx + 500}" y="${ty + 14}" class="t10 mono">${s.feasibility.toFixed(1)}</text><rect x="${tx + 548}" y="${ty + 3}" width="40" height="14" rx="7" class="${stateCls[s.mvp]}-t"/><text x="${tx + 568}" y="${ty + 13}" class="t10" text-anchor="middle">${stateWord[s.mvp]}</text>`);
    ty += 33;
  }
  y = Math.max(py + S + 40, ty + 10);
  parts.push(`<text x="16" y="${y + 6}" class="t11 ink2">${esc(D.label)} Feasibility reflects C1 to C7: a solution that needs the permission model or an independence review before it can ship rates low until that exists.</text>`);
  writeFileSync(join(here, '06-prioritization.svg'), svgDoc(A, W, y + 20, parts.join('\n')));
}
const tree = readFileSync(join(here, '06-opportunity-tree.svg'), 'utf8'), pri = readFileSync(join(here, '06-prioritization.svg'), 'utf8');
const jobRows = D.jobs.map(j => `<tr><td><strong>${esc(j.role)}</strong></td><td>${esc(j.when)}</td><td>${esc(j.want)}</td><td>${esc(j.so)}</td><td class="mono">${j.themes.join(', ')}</td></tr>`).join('\n');
const cutRows = sols.filter(s => s.mvp !== 'in').map(s => `<tr><td class="mono">${s.id}</td><td>${esc(s.name)}</td><td><span class="badge ${stateCls[s.mvp]}">${stateWord[s.mvp]}</span></td><td>${esc(s.why)}</td></tr>`).join('\n');
const body = `
<section class="block prose">
<h2>Outcome</h2>
<p><strong>${esc(D.outcome)}</strong></p>
<p>The jobs below come from the coded material in 03. The tree turns themes into opportunities, opportunities into candidate solutions and each solution into the experiment that would test it. The 2x2 is where the MVP line was drawn, under the constraints in 01.</p>
<p><strong>${esc(D.label)}</strong></p>
<p><strong>I decided</strong> ${esc(A.iDecided)} <strong>We built</strong> ${esc(A.weBuilt)}</p>
</section>
<section class="block">
<h2>Jobs to be done, per role</h2>
<p class="muted small">Also in <a href="06-jtbd.md">06-jtbd.md</a>.</p>
<table class="doc"><thead><tr><th>Role</th><th>When</th><th>I want</th><th>So I can</th><th>Themes</th></tr></thead><tbody>${jobRows}</tbody></table>
</section>
<section class="block"><h2>Opportunity solution tree</h2>${figure(tree, `${A.number} opportunity solution tree. One outcome, seven opportunities from the themes, fourteen solutions with their state and the experiment that tests each. Standalone: <a href="06-opportunity-tree.svg">06-opportunity-tree.svg</a>.`)}</section>
<section class="block"><h2>Prioritization</h2>${figure(pri, `${A.number} prioritization 2x2. User value against feasibility under the constraints. Shape encodes state: circle in MVP, square later, diamond cut. Standalone: <a href="06-prioritization.svg">06-prioritization.svg</a>.`)}</section>
<section class="block">
<h2>MVP scope</h2>
<p class="prose">${esc(D.mvp_scope)} ${esc(D.mvp_areas_why)}</p>
<h3>Cut or deferred, with the reason</h3>
<table class="doc"><thead><tr><th>ID</th><th>Solution</th><th>State</th><th>Why</th></tr></thead><tbody>${cutRows}</tbody></table>
<p class="prose">Two of the cuts are boundary cuts, not cost cuts. S8 (inline comments) reproduces the note loop the research found. S10 (agent-proposed resolutions) puts the agent where every role said judgment must stay. Both would have been easy to build. That is the point of writing the reason down.</p>
</section>
<section class="block">
<h2>Decisions fed</h2>
<p><a class="chip" href="../../decisions.md#d-10">D-10</a> MVP scope: Test of Details for two areas, no analytical procedures. <a class="chip" href="../../decisions.md#d-11">D-11</a> Test of Details is the anchor workflow.</p>
</section>`;
writeFileSync(join(here, 'index.html'), page(A, body));
console.log('wrote 06-jtbd.md, two SVGs and index.html');
