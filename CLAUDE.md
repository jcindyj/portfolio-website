# Portfolio website: instructions for Claude

Cindy Jung's portfolio site. React 18 + Vite 5, deployed to GitHub Pages at https://jcindyj.github.io/portfolio-website/ on every push to `main` (`.github/workflows/deploy.yml`).

## Talking to Cindy
- Always reply in Korean, even when the brief, code, or tool output is in English. Code, file names, commits, and PR text stay in English.
- She has no coding background: plain language first, explain jargon before using it.

## Hard rules
- NDA: no company names, product codenames, teammate names, or real work screens anywhere in this repo. This repo is public. Never invent new site copy; use only text Cindy provides.
- Dark theme only. No light backgrounds. English site.
- No new libraries without asking.
- Never push to `main` directly or force-push. Every change goes through a PR.
- Images: only Cindy's own work. No other brands' screens, no stock photos of people (2026-10-27).
- Case 1 (shipped consumer display app): the public site shows the summary only plus a "Request the full case study" email link. The full case study is shared privately and never goes in this repo (2026-10-27).

## Design system (2026-10-27)
- Build order: tokens and the UI library page first (`library.html`, `src/ui/`), then the main page uses only those parts. Change colors, type, and spacing in `src/ui/tokens.css`, never inline.
- Brand = JCINDYJ on dark: deep blue `#1e6186` is a fill only (featured case), light blue `#67a9ce` means "clickable" only, Josefin Sans for the name and wordmark only, system font for the rest.
- Keep it light: translucent surfaces; gradients only in two places (page-top glow, featured case). No bento grids, glassy blur cards, or glow effects.
- Motion: cards fade in once, slowly (1.2s, opacity only); off with reduced motion.
- Every text color must pass WCAG AA; the library page measures contrast live.

## Merge rule
- Small fixes (links, typos, colors, styling): Claude merges the PR itself once `npm run build` passes, then confirms the deploy run succeeded.
- Written content (About, case studies, any new copy): Claude opens the PR; Cindy reads it for NDA and merges it herself.

## Local vs cloud
- Cindy works mostly in Claude Code on her Mac. Claude on that Mac cannot push to this repo, so pushes and PRs happen from a Claude Code cloud session, or Cindy publishes the branch herself from GitHub Desktop signed in with her personal account (2026-10-27).
- Cloud sessions see only this repo: this file is how context reaches them. Keep it current.

## Keeping this file current
- When Cindy sets a new lasting rule for this project, or corrects the same thing twice, update this file in the same PR (or a small separate one, merged under the small-fix rule) and tell her in one line what changed.
- Keep it short. Use explicit dates (YYYY-MM-DD).

## Status (2026-10-27)
- Live: skeleton v1, LinkedIn URL.
- Waiting for merge: branch `brand-v2` (UI library page, JCINDYJ brand tokens, headline, case images, Peelaboo reframed as running the brand, Case 1 request link).
- Next: About copy (2–4 sentences, from Cindy's draft), then the case study bodies in `src/data/cases.js` (Case 1 body stays private).
