# Baton design system

Base layer shared by both case studies. Baton tokens sit in `/shared/brand/baton/`. Everything here is plain CSS and one dependency-free script. Load order on every page: `tokens.css`, `base.css`, `header.css`, then `header.js` at the end of body.

## Files

| File | Purpose |
|---|---|
| `base.css` | Reset, type, focus, layout primitives, panels, buttons, badges, chips, dense tables, figure frames, decision trace block, SVG theme classes, print styles. |
| `header.css`, `header.js` | The artifact header: disclaimer band, strip (mark, number, title, status, theme toggle) and the meta grid (question, decisions fed, role split, boundary questions). Reads `#artifact-meta` JSON. |
| `/shared/templates/artifact-page.html` | Page skeleton to copy for each artifact. |

## Rules

1. Color never carries state alone. Every state is a glyph plus a text label. Charts add pattern fills and direct labels.
2. `--bt-agent` is reserved for content the agent produced. Human-authored content never uses it.
3. Every focusable element shows the focus ring in both themes. No `outline: none` without the ring.
4. Targets are at least 24 px tall. Buttons are 28 px. Dense rows are 28 px.
5. Motion is 120 ms for state changes and none for layout. `prefers-reduced-motion` removes all of it.
6. Numbers in columns use tabular figures and the mono face. Negative amounts in parentheses, never red alone.
7. Root-relative paths for shared assets (`/shared/...`). Case-relative links are computed at runtime from the URL, so no page hardcodes the case folder name.
8. Density is a feature. Whitespace earns its place.

## Components in the base layer

| Component | Class | States |
|---|---|---|
| Button | `.btn`, `.btn.primary` | default, hover, focus, pressed (`aria-pressed`), disabled |
| Badge | `.badge` plus `brand`, `agent`, `review`, `approved`, `edited`, `failed` | one glyph and one label per state |
| Chip | `.chip`, `.chip.agent` | default, hover, focus. Evidence citation chips use `.chip.agent` and open the source at the span (artifact 12). |
| Dense grid | `table.grid` | sticky header, hover, selected row (`aria-selected`), numeric cells `.num`, wrapping cells `.wrap` |
| Document table | `table.doc` | static tables in narrative pages |
| Panel | `.panel` with `.panel-h` and `.panel-b` | |
| Figure | `figure.art` with `figcaption` | frames every SVG artifact |
| Decision trace | `.trace` as a `dl` | finding, options, choice, rationale, decision ID (artifact 11 on) |
| Labels | `.label-synth` | the synthetic and planned-target labels the honesty rules require |

## AI state vocabulary

Five states shared by design and code, each with a badge class, a glyph and a label: thinking (`agent`), streaming (`agent`), needs review (`review`), failed (`failed`), approved (`approved`). Edited by a human uses `edited`. Defined in full with the review checkpoint pattern in artifact 12 and the component rules in artifact 14.

## Checks

- `node shared/brand/baton/contrast-check.mjs` verifies every token pair in both themes.
- `node scripts/screenshot.mjs <page>` renders a page at 1440x900 in light and dark and fails on any console error, failed request or 4xx response.
