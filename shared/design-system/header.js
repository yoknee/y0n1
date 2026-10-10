/* Artifact header component. Reads <script type="application/json" id="artifact-meta">
   and renders the disclaimer band, the header strip and the meta grid into <header id="artifact-header">.
   Also mounts the theme toggle. No dependencies. */
(function () {
  const metaEl = document.getElementById('artifact-meta');
  const host = document.getElementById('artifact-header');
  if (!metaEl || !host) return;
  let m;
  try { m = JSON.parse(metaEl.textContent); } catch (e) { host.textContent = 'artifact-meta is not valid JSON'; return; }

  const DISCLAIMER = 'Reconstructed for portfolio purposes. The process, decisions and role are real. Screens, data, names and figures are illustrative and do not depict the production product.';
  const QUESTIONS = ['What may the agent access?', 'Where must a human review?', 'How does the auditor see what the agent did?', 'What happens when the agent is wrong?'];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // case root from the URL, e.g. /cases/<slug>/, so no page hardcodes the slug
  const caseRoot = (location.pathname.match(/^(.*\/cases\/[^/]+)\//) || [null, '.'])[1];
  const statusClass = { draft: 'review', review: 'review', final: 'approved', revised: 'edited' }[(m.status || '').toLowerCase().split(' ')[0]] || '';
  const glyph = { review: '<svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 3.5v3l2 1.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
                  approved: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.5l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
                  edited: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10l1-3 5.5-5.5 2 2L5 9z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' }[statusClass] || '';
  const decisions = (m.decisions || []).map(d => `<a class="chip" href="${caseRoot}/decisions.md#${esc(d).toLowerCase()}">${esc(d)}</a>`).join(' ');
  const qs = QUESTIONS.map((q, i) => `<li class="${(m.questions || []).includes(i + 1) ? 'on' : ''}"><span class="qn">Q${i + 1}</span> ${esc(q)}</li>`).join('');

  host.className = 'art-header';
  host.innerHTML = `
    <p class="disclaimer" role="note">${DISCLAIMER}</p>
    <div class="strip">
      <a class="brand" href="${caseRoot}/" aria-label="Baton case home">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><line x1="2.5" y1="13.5" x2="10.5" y2="5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="11.5" cy="4.5" r="2.5" fill="currentColor"/></svg>
        <span>Baton</span></a>
      <span class="num mono">${esc(m.number || '')}</span>
      <h1>${esc(m.title || '')}</h1>
      <span class="badge ${statusClass}">${glyph}${esc(m.status || '')}</span>
      <button type="button" class="btn theme-toggle" aria-pressed="false" title="Toggle dark theme">Theme</button>
    </div>
    <dl class="meta">
      <div><dt>Question it answers</dt><dd>${esc(m.question || '')}</dd></div>
      <div><dt>Decisions it feeds</dt><dd>${decisions || '<span class="muted">none</span>'}</dd></div>
      <div><dt>Role split</dt><dd><strong>I decided:</strong> ${esc(m.iDecided || '')}<br><strong>We built:</strong> ${esc(m.weBuilt || '')}</dd></div>
      <div><dt>Boundary questions this artifact moves</dt><dd><ol class="qs">${qs}</ol></dd></div>
    </dl>`;

  // theme toggle: persisted per viewer, wrapped because storage can throw
  const root = document.documentElement;
  const btn = host.querySelector('.theme-toggle');
  const apply = t => { if (t) root.setAttribute('data-theme', t); else root.removeAttribute('data-theme'); btn.setAttribute('aria-pressed', String(t === 'dark')); };
  let saved = null; try { saved = localStorage.getItem('bt-theme'); } catch (e) {}
  const q = new URLSearchParams(location.search).get('theme');
  apply(q || saved);
  btn.addEventListener('click', () => {
    const dark = root.getAttribute('data-theme') === 'dark' || (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    apply(next); try { localStorage.setItem('bt-theme', next); } catch (e) {}
  });
})();
