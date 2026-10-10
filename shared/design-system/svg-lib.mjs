// Helpers shared by the artifact build scripts. Node only, no dependencies.
// Produces SVG that reads in both themes standalone (svg:root variables) and inline (page tokens).
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const wrap = (s, n) => { const w = String(s).split(' '), out = []; let l = ''; for (const x of w) { if ((l + ' ' + x).trim().length > n) { out.push(l.trim()); l = x; } else l = (l + ' ' + x); } if (l.trim()) out.push(l.trim()); return out; };
export const tspans = (lines, x, y, lh, cls = '') => lines.map((t, i) => `<tspan x="${x}" y="${y + i * lh}"${cls ? ` class="${cls}"` : ''}>${esc(t)}</tspan>`).join('');

export const STYLE = `
<style>
@font-face{font-family:"Plex Sans";font-weight:400;src:url("/shared/vendor/fonts/plex/IBMPlexSans-Regular-Latin1.woff2") format("woff2")}
@font-face{font-family:"Plex Sans";font-weight:600;src:url("/shared/vendor/fonts/plex/IBMPlexSans-SemiBold-Latin1.woff2") format("woff2")}
@font-face{font-family:"Plex Mono";font-weight:400;src:url("/shared/vendor/fonts/plex/IBMPlexMono-Regular-Latin1.woff2") format("woff2")}
svg:root{--bt-surface:#FFFFFF;--bt-surface-2:#F3F5F8;--bt-surface-3:#E8EBF0;--bt-border:#CFD5DD;--bt-ink:#14181F;--bt-ink-2:#4A5361;--bt-ink-3:#687180;--bt-brand:#3B4FD8;--bt-brand-tint:#E8EBFB;--bt-agent:#0E7C7B;--bt-agent-tint:#DDF3F2;--bt-review:#8E5F00;--bt-review-tint:#FBF0D6;--bt-approved:#1F7A3D;--bt-approved-tint:#DFF3E5;--bt-edited:#6941C6;--bt-edited-tint:#EEE8FB;--bt-failed:#B42318;--bt-failed-tint:#FBE3E0;--bt-font-sans:"Plex Sans",system-ui,sans-serif;--bt-font-mono:"Plex Mono",ui-monospace,monospace;background:var(--bt-surface)}
@media (prefers-color-scheme:dark){svg:root{--bt-surface:#0F1319;--bt-surface-2:#171C24;--bt-surface-3:#1F2630;--bt-border:#2C343F;--bt-ink:#E6EAF0;--bt-ink-2:#A5AEBB;--bt-ink-3:#7E8794;--bt-brand:#8FA0FF;--bt-brand-tint:#1C2347;--bt-agent:#5FD3CF;--bt-agent-tint:#103A3A;--bt-review:#E8B84A;--bt-review-tint:#3D2E0A;--bt-approved:#6CCB8A;--bt-approved-tint:#0F3320;--bt-edited:#B69CFF;--bt-edited-tint:#2A1F4D;--bt-failed:#FF8A80;--bt-failed-tint:#4A1612}}
.ink{fill:var(--bt-ink)}.ink2{fill:var(--bt-ink-2)}.ink3{fill:var(--bt-ink-3)}.surf{fill:var(--bt-surface)}.surf2{fill:var(--bt-surface-2)}.surf3{fill:var(--bt-surface-3)}
.hair{stroke:var(--bt-border);fill:none}.stroke{stroke:var(--bt-ink);fill:none}.stroke2{stroke:var(--bt-ink-2);fill:none}
.brand{fill:var(--bt-brand)}.brand-s{stroke:var(--bt-brand);fill:none}.brand-t{fill:var(--bt-brand-tint)}
.agent{fill:var(--bt-agent)}.agent-s{stroke:var(--bt-agent);fill:none}.agent-t{fill:var(--bt-agent-tint)}
.review{fill:var(--bt-review)}.review-t{fill:var(--bt-review-tint)}.approved{fill:var(--bt-approved)}.approved-t{fill:var(--bt-approved-tint)}
.edited{fill:var(--bt-edited)}.edited-t{fill:var(--bt-edited-tint)}.failed{fill:var(--bt-failed)}.failed-s{stroke:var(--bt-failed);fill:none}.failed-t{fill:var(--bt-failed-tint)}
text{font-family:var(--bt-font-sans);font-size:12px;fill:var(--bt-ink)}text.mono{font-family:var(--bt-font-mono)}text.t11{font-size:11px}text.t10{font-size:10px}text.t14{font-size:14px;font-weight:600}text.t16{font-size:16px;font-weight:600}text.b{font-weight:600}
</style>`;

// Standard artifact header band inside an SVG: title, question, feeds, status, role split. Returns [markup, heightUsed].
export function headerBand(A, W) {
  const p = [];
  const q = wrap(`Question: ${A.question}`, 118);
  const iD = wrap('I decided: ' + A.iDecided, 100), wB = wrap('We built: ' + A.weBuilt, 100);
  const h = Math.max(72, 46 + q.length * 12 + 22, 22 + (iD.length + wB.length) * 13 + 14);
  p.push(`<rect x="0" y="0" width="${W}" height="${h}" class="surf2"/><line x1="0" y1="${h}" x2="${W}" y2="${h}" class="hair"/>`);
  p.push(`<text x="16" y="26" class="t16">${esc(A.number)} ${esc(A.title)}</text>`);
  p.push(`<text class="t11 ink2">${tspans(q, 16, 46, 12)}</text>`);
  p.push(`<text x="16" y="${46 + q.length * 12 + 8}" class="t11 ink2">Feeds: ${A.decisions.join(', ')}  |  Status: ${esc(A.status)}</text>`);
  p.push(`<text class="t11 ink2">${tspans(iD, Math.round(W * 0.54), 22, 13)}</text>`);
  p.push(`<text class="t11 ink2">${tspans(wB, Math.round(W * 0.54), 22 + iD.length * 13 + 8, 13)}</text>`);
  return [p.join('\n'), h];
}

export function svgDoc(A, W, H, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
<title id="t">${esc(A.number)} ${esc(A.title)}</title>
<desc id="d">${esc(A.question)} Decisions fed: ${A.decisions.join(', ')}. Status: ${esc(A.status)}. Reconstructed for portfolio purposes; illustrative.</desc>
${STYLE}
${inner}
</svg>`;
}

// Page skeleton. body is the main content html; svgs inline themselves via figure().
export function page(A, body, { extraHead = '' } = {}) {
  const meta = { number: A.number, title: A.title, question: A.question, decisions: A.decisions, status: A.status, iDecided: A.iDecided, weBuilt: A.weBuilt, questions: A.questions };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(A.number)} ${esc(A.title)}</title>
<link rel="icon" href="/shared/brand/baton/mark.svg" type="image/svg+xml">
<link rel="stylesheet" href="/shared/brand/baton/tokens.css">
<link rel="stylesheet" href="/shared/design-system/base.css">
<link rel="stylesheet" href="/shared/design-system/header.css">
${extraHead}
<script type="application/json" id="artifact-meta">${JSON.stringify(meta, null, 1)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="page">
<header id="artifact-header"></header>
<main id="main">
${body}
</main>
</div>
<script src="/shared/design-system/header.js"></script>
</body>
</html>
`;
}

export const figure = (svg, caption) => `<figure class="art">\n${svg.replace(/<svg /, '<svg style="width:100%;height:auto" ')}\n<figcaption>${caption}</figcaption>\n</figure>`;
