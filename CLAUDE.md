# y0n1

Personal portfolio site for Yoni ("Creative, Innovator"). A static site with no build step, deployed on Vercel.

## Structure

- `index.html` — single page; two stacked `.page` sections (quote/name, then title/content/social icons). Includes Google Analytics (gtag) and Google Fonts (EB Garamond).
- `main.js` — vanilla JS; fades in the quote and name on load, and toggles between page 1 and page 2 on click.
- `styles.css` — all styling.
- `cases/` — folder for case studies (currently empty, holds a `.gitkeep`).
- `favicon.png`, `jonathanDiner.jpg`, `jonathanDream.jpg` — image assets, referenced by relative path.

## Conventions

- Keep it dependency-free: plain HTML, CSS and JavaScript, no frameworks or bundlers.
- Reference assets with root-relative paths (e.g. `/styles.css`) so they resolve on Vercel.
- There are no tests or linters. Verify changes by opening `index.html` in a browser (or `python3 -m http.server`).

## Git

- Develop on the branch you were assigned; do not push elsewhere.
- Do not open a pull request unless asked.
