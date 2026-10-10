#!/usr/bin/env node
// Builds research/codebook.md, research/findings.md, research/evidence-table.md,
// 03-affinity-map.svg, 03-pain-heatmap.svg and index.html from synthesis.json. Run: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, wrap, tspans, headerBand, svgDoc, page, figure } from '../../../../shared/design-system/svg-lib.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const R = join(here, '..', '..', 'research');
const D = JSON.parse(readFileSync(join(here, 'synthesis.json'), 'utf8'));
const A = D.artifact;
const DISC = '> Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.';
const hdr = (title, q) => `| | |\n|---|---|\n| Title | ${title} |\n| Artifact | ${A.number} ${A.title} |\n| Question it answers | ${q} |\n| Decisions it feeds | ${A.decisions.join(', ')} |\n| Status | ${A.status} |\n\n${DISC}\n\n**I decided** ${A.iDecided} **We built** ${A.weBuilt}\n\n${D.label}\n`;
const themeById = Object.fromEntries(D.themes.map(t => [t.id, t]));
const W = 1400;

// ---------- codebook.md ----------
let md = hdr('Codebook', 'What did we code for, how is each code defined and when does it apply?');
md += `\n## How the codebook was built\n\nDrafted from the seven constraints in 01 and the five research questions in 02. Revised after the first two contextual inquiry days and again whenever two coders disagreed on the same code twice. Two coders on every source. Final version has ${D.code_groups.reduce((n, g) => n + g.codes.length, 0)} codes in ${D.code_groups.length} groups.\n`;
for (const g of D.code_groups) {
  md += `\n## ${g.id} ${g.name}\n\n| Code | Definition | Inclusion rule | Example |\n|---|---|---|---|\n`;
  for (const c of g.codes) md += `| \`${c.id}\` | ${c.def} | ${c.include} | ${c.example} |\n`;
}
md += `\n## Codes to themes\n\n| Theme | Codes |\n|---|---|\n` + D.themes.map(t => `| ${t.id} ${t.name} | ${t.codes.map(c => '`' + c + '`').join(', ')} |`).join('\n') + '\n';
writeFileSync(join(R, 'codebook.md'), md);

// ---------- findings.md ----------
md = hdr('Findings: themes with evidence strength', 'What did the research find and how strong is each finding?');
md += `\n## Evidence rubric\n\nEach theme is rated on three ordinal dimensions. No tallies appear anywhere in this synthesis.\n\n| Dimension | Values | Meaning |\n|---|---|---|\n| Methods | named list | which methods surfaced the theme independently |\n| Roles | named list | which roles raised it |\n| Consistency | high, medium, low | high: every source that touched the topic agrees; medium: agreement with exceptions; low: contested |\n\nA theme rated high on all three is treated as settled for design purposes. A medium theme drives a decision only with a validation step named in decisions.md.\n\n## Themes\n\n`;
for (const t of D.themes) {
  md += `### ${t.id} ${t.name}\n\n${t.statement}\n\n| | |\n|---|---|\n| Methods | ${t.methods.join(', ')} |\n| Roles | ${t.roles.join(', ')} |\n| Consistency | ${t.consistency} |\n| Lifecycle stages | ${t.stages.join(', ')} |\n| Boundary questions | ${t.q.length ? t.q.map(q => 'Q' + q).join(', ') : 'framework'} |\n| Codes | ${t.codes.map(c => '`' + c + '`').join(', ')} |\n| Label | reconstructed |\n\n**What it means for the boundary.** ${t.boundary}\n\n`;
}
writeFileSync(join(R, 'findings.md'), md);

// ---------- evidence-table.md ----------
md = hdr('Evidence table', 'Which finding came from which method and which decision did it drive?');
md += `\nEvery row is tagged reconstructed. Decision IDs beyond those created so far are assigned when their artifacts ship; the column is updated then.\n\n| ID | Finding | Theme | Methods | Stage | Q | Decisions | Label |\n|---|---|---|---|---|---|---|---|\n`;
for (const e of D.evidence) md += `| ${e.id} | ${e.finding} | ${e.theme} | ${e.methods.join(', ')} | ${e.stage} | ${e.q.map(q => 'Q' + q).join(', ') || 'framework'} | ${e.decisions.join(', ') || 'none yet'} | reconstructed |\n`;
writeFileSync(join(R, 'evidence-table.md'), md);

// ---------- affinity map SVG ----------
{
  const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
  let y = hh + 16;
  parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">AFFINITY MAP: CODED OBSERVATIONS CLUSTERED INTO THIRTEEN THEMES. CARDS CARRY A PARAPHRASED OBSERVATION AND ITS METHOD TAGS. NO TALLIES.</text>`);
  y += 24;
  const cols = 5, gap = 12, cw = (W - 32 - (cols - 1) * gap) / cols, CH = 206;
  D.themes.forEach((t, i) => {
    const cx = 16 + (i % cols) * (cw + gap), cy = y + Math.floor(i / cols) * (CH + gap);
    parts.push(`<rect x="${cx}" y="${cy}" width="${cw}" height="${CH}" rx="3" class="surf2" stroke="var(--bt-border)"/>`);
    parts.push(`<text x="${cx + 8}" y="${cy + 16}" class="t11 mono ink2">${t.id}</text>`);
    parts.push(`<text class="t11 b">${tspans(wrap(t.name, 34), cx + 36, cy + 16, 13)}</text>`);
    let ky = cy + 46;
    for (const card of D.affinity_cards[t.id]) {
      parts.push(`<rect x="${cx + 8}" y="${ky}" width="${cw - 16}" height="38" rx="2" class="surf" stroke="var(--bt-border)"/>`);
      parts.push(`<text class="t11">${tspans(wrap(card, 38), cx + 14, ky + 15, 13)}</text>`);
      ky += 44;
    }
    // method and role tags
    let tx = cx + 8;
    for (const m of t.methods) { parts.push(`<rect x="${tx}" y="${ky + 2}" width="26" height="16" rx="8" class="agent-t"/><text x="${tx + 13}" y="${ky + 14}" class="t10 mono" text-anchor="middle">${m}</text>`); tx += 30; }
    const cons = { high: 'brand', medium: 'review', low: 'failed' }[t.consistency];
    parts.push(`<rect x="${cx + cw - 70}" y="${ky + 2}" width="62" height="16" rx="8" class="${cons}-t"/><text x="${cx + cw - 39}" y="${ky + 14}" class="t10" text-anchor="middle">${t.consistency}</text>`);
  });
  y += 3 * (CH + gap) + 4;
  parts.push(`<rect x="16" y="${y}" width="26" height="16" rx="8" class="agent-t"/><text x="29" y="${y + 12}" class="t10 mono" text-anchor="middle">M1</text><text x="50" y="${y + 12}" class="t11 ink2">method that surfaced the theme</text>`);
  parts.push(`<rect x="260" y="${y}" width="62" height="16" rx="8" class="brand-t"/><text x="291" y="${y + 12}" class="t10" text-anchor="middle">high</text><rect x="326" y="${y}" width="62" height="16" rx="8" class="review-t"/><text x="357" y="${y + 12}" class="t10" text-anchor="middle">medium</text><text x="396" y="${y + 12}" class="t11 ink2">consistency rating from the rubric in findings.md</text>`);
  parts.push(`<text x="16" y="${y + 34}" class="t11 ink2">${esc(D.label)}</text>`);
  writeFileSync(join(here, '03-affinity-map.svg'), svgDoc(A, W, y + 48, parts.join('\n')));
}

// ---------- heat map SVG ----------
{
  const parts = []; const [hb, hh] = headerBand(A, W); parts.push(hb);
  parts.push(`<defs><pattern id="hatch2" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--bt-brand)" stroke-width="1" opacity="0.55"/></pattern><pattern id="hatch3" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--bt-surface)" stroke-width="1.2" opacity="0.5"/></pattern></defs>`);
  let y = hh + 16;
  parts.push(`<text x="16" y="${y + 12}" class="t11 ink2 b">PAIN-POINT HEAT MAP: LIFECYCLE STAGE BY ROLE. ${esc(D.heatmap.note.toUpperCase())}</text>`);
  y += 28;
  const x0 = 190, cw = 150, rh = 40, labels = ['none', 'low', 'medium', 'high'];
  D.roles.forEach((r, i) => parts.push(`<text x="${x0 + i * cw + cw / 2}" y="${y + 14}" class="t11 ink2 b" text-anchor="middle">${esc(r)}</text>`));
  parts.push(`<text x="${x0 + 5 * cw + 16}" y="${y + 14}" class="t11 ink2 b">Themes at this stage</text>`);
  y += 24;
  D.stages.forEach((s, ri) => {
    const ry = y + ri * rh;
    parts.push(`<text x="16" y="${ry + rh / 2 + 4}" class="b">${esc(s)}</text>`);
    D.heatmap.cells[s].forEach((v, ci) => {
      const x = x0 + ci * cw;
      const fill = ['surf', 'brand-t', 'brand-t', 'brand'][v];
      parts.push(`<rect x="${x + 1}" y="${ry + 1}" width="${cw - 2}" height="${rh - 2}" class="${fill}" stroke="var(--bt-border)"/>`);
      if (v === 2) parts.push(`<rect x="${x + 1}" y="${ry + 1}" width="${cw - 2}" height="${rh - 2}" fill="url(#hatch2)"/>`);
      if (v === 3) parts.push(`<rect x="${x + 1}" y="${ry + 1}" width="${cw - 2}" height="${rh - 2}" fill="url(#hatch3)"/>`);
      parts.push(`<text x="${x + cw / 2}" y="${ry + rh / 2 + 4}" class="t11 ${v === 3 ? '' : 'ink2'}" text-anchor="middle" ${v === 3 ? 'style="fill:var(--bt-surface);font-weight:600"' : ''}>${labels[v]}</text>`);
    });
    let tx = x0 + 5 * cw + 16;
    for (const t of D.heatmap.stage_themes[s]) { parts.push(`<rect x="${tx}" y="${ry + rh / 2 - 9}" width="34" height="18" rx="3" class="surf" stroke="var(--bt-border)"/><text x="${tx + 17}" y="${ry + rh / 2 + 4}" class="t11 mono" text-anchor="middle">${t}</text>`); tx += 38; }
    if (!D.heatmap.stage_themes[s].length) parts.push(`<text x="${tx}" y="${ry + rh / 2 + 4}" class="t11 ink3">no theme; outside the anchor workflow</text>`);
  });
  y += D.stages.length * rh + 16;
  const leg = [['surf', 'none', ''], ['brand-t', 'low', ''], ['brand-t', 'medium', 'url(#hatch2)'], ['brand', 'high', 'url(#hatch3)']];
  leg.forEach(([c, l, p], i) => { const x = 16 + i * 120; parts.push(`<rect x="${x}" y="${y}" width="28" height="16" class="${c}" stroke="var(--bt-border)"/>${p ? `<rect x="${x}" y="${y}" width="28" height="16" fill="${p}"/>` : ''}<text x="${x + 34}" y="${y + 12}" class="t11 ink2">${l}</text>`); });
  parts.push(`<text x="16" y="${y + 36}" class="t11 ink2">Severity is encoded three ways: fill, hatch pattern and the word in the cell. Reconstructed severity, not observed frequency. Roles are the five interviewed roles; the data lead is covered in SME sessions.</text>`);
  writeFileSync(join(here, '03-pain-heatmap.svg'), svgDoc(A, W, y + 50, parts.join('\n')));
}

// ---------- index.html ----------
const aff = readFileSync(join(here, '03-affinity-map.svg'), 'utf8');
const heat = readFileSync(join(here, '03-pain-heatmap.svg'), 'utf8');
const themeRows = D.themes.map(t => `<tr><td class="mono">${t.id}</td><td><strong>${esc(t.name)}</strong><br><span class="muted">${esc(t.statement)}</span></td><td>${t.methods.join(', ')}</td><td>${t.roles.join(', ')}</td><td><span class="badge ${{ high: 'brand', medium: 'review', low: 'failed' }[t.consistency]}">${t.consistency}</span></td><td>${t.q.length ? t.q.map(q => 'Q' + q).join(', ') : '<span class="muted">framework</span>'}</td><td>${esc(t.boundary)}</td></tr>`).join('\n');
const evRows = D.evidence.map(e => `<tr><td class="mono">${e.id}</td><td>${esc(e.finding)}</td><td class="mono">${e.theme}</td><td>${e.methods.join(', ')}</td><td>${esc(e.stage)}</td><td>${e.q.map(q => 'Q' + q).join(', ') || '<span class="muted">framework</span>'}</td><td>${e.decisions.length ? e.decisions.map(d => `<a class="chip" href="../../decisions.md#${d.toLowerCase()}">${d}</a>`).join(' ') : '<span class="muted">none yet</span>'}</td><td><span class="label-synth">reconstructed</span></td></tr>`).join('\n');
const codeRows = D.code_groups.map(g => `<tr><td class="mono">${g.id}</td><td><strong>${esc(g.name)}</strong></td><td>${g.codes.map(c => `<code>${c.id}</code>`).join(', ')}</td></tr>`).join('\n');
const body = `
<section class="block prose">
<h2>How the synthesis worked</h2>
<p>Two coders on every source, coding to a codebook drafted from the constraints (01) and the research questions (02) and revised when the same disagreement repeated. Coded observations were clustered into themes in affinity sessions. Each theme is rated by an ordinal rubric: which methods surfaced it, which roles raised it and how consistent the sources were. No tallies, because every participant count except the dry run is a planned target and a tally would be a number nobody measured.</p>
<p><strong>${esc(D.label)}</strong></p>
<p><strong>I decided</strong> ${esc(A.iDecided)} <strong>We built</strong> ${esc(A.weBuilt)}</p>
</section>
<section class="block">
<h2>Codebook</h2>
<p class="muted small">${D.code_groups.reduce((n, g) => n + g.codes.length, 0)} codes in ${D.code_groups.length} groups. Definitions, inclusion rules and examples in <a href="../../research/codebook.md">research/codebook.md</a>.</p>
<table class="doc"><thead><tr><th>Group</th><th>Name</th><th>Codes</th></tr></thead><tbody>${codeRows}</tbody></table>
</section>
<section class="block">
<h2>Affinity map</h2>
${figure(aff, `${A.number} affinity map. Thirteen clusters. Each card is a paraphrased observation with the methods that surfaced the theme and the consistency rating. Standalone: <a href="03-affinity-map.svg">03-affinity-map.svg</a>.`)}
</section>
<section class="block">
<h2>Themes with evidence strength</h2>
<p class="muted small">Full statements and the boundary reading of each theme in <a href="../../research/findings.md">research/findings.md</a>.</p>
<div style="overflow:auto"><table class="doc"><thead><tr><th>ID</th><th>Theme</th><th>Methods</th><th>Roles</th><th>Consistency</th><th>Q</th><th>What it means for the boundary</th></tr></thead><tbody>${themeRows}</tbody></table></div>
</section>
<section class="block">
<h2>Pain-point heat map across the lifecycle</h2>
${figure(heat, `${A.number} pain-point heat map. Nine lifecycle stages by five roles. Severity encoded by fill, hatch and the word in the cell. Reconstructed severity, not observed frequency. Standalone: <a href="03-pain-heatmap.svg">03-pain-heatmap.svg</a>.`)}
</section>
<section class="block">
<h2>Evidence table</h2>
<p class="muted small">Every finding, its source methods and the decisions it drove. Decision IDs are added as their artifacts ship. Also in <a href="../../research/evidence-table.md">research/evidence-table.md</a>.</p>
<div style="overflow:auto"><table class="doc"><thead><tr><th>ID</th><th>Finding</th><th>Theme</th><th>Methods</th><th>Stage</th><th>Q</th><th>Decisions</th><th>Label</th></tr></thead><tbody>${evRows}</tbody></table></div>
</section>
<section class="block prose">
<h2>Limitations</h2>
<ul>
<li>Themes are reconstructed from the plan and the lead's account of what the work found. Ratings are the lead's judgment, checked by the rubric, not by counts.</li>
<li>The five interviewed roles set the heat map columns. The data lead role appears through SME sessions only.</li>
<li>Stages outside the anchor workflow (plan, assess risk) carry no themes because the research was scoped to fieldwork and review.</li>
</ul>
</section>
<section class="block">
<h2>Decisions fed</h2>
<p><a class="chip" href="../../decisions.md#d-03">D-03</a> Every agent claim carries a source citation to a highlighted span. <a class="chip" href="../../decisions.md#d-04">D-04</a> Review is a place: a review center, never a modal. <a class="chip" href="../../decisions.md#d-06">D-06</a> The field-structure library is a typed template system the planner targets.</p>
</section>`;
writeFileSync(join(here, 'index.html'), page(A, body));
console.log('wrote codebook.md, findings.md, evidence-table.md, two SVGs and index.html');
