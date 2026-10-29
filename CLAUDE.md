# Portfolio website: instructions for Claude

Cindy Jung's portfolio site. React 18 + Vite 5, deployed to GitHub Pages at https://jcindyj.github.io/portfolio-website/ on every push to `main` (`.github/workflows/deploy.yml`).

## Talking to Cindy
- Always reply in Korean, even when the brief, code, or tool output is in English. Code, file names, commits, and PR text stay in English.
- Plain language first; explain jargon before using it.

## Hard rules
- NDA: no company names, product codenames, teammate names, or real work screens anywhere in this repo. This repo is public. Never invent new site copy; use only text Cindy provides.
- Dark theme only. No light backgrounds. English site.
- No new libraries without asking.
- Never push to `main` directly or force-push. Every change goes through a PR.

## Merge rule
- Small fixes (links, typos, colors, styling): Claude merges the PR itself once `npm run build` passes, then confirms the deploy run succeeded.
- Written content (About, case studies, any new copy): Claude opens the PR; Cindy reads it for NDA and merges it herself.

## Local vs cloud
- Cindy works mostly in Claude Code on her Mac. That Mac cannot push to this repo, so pushes and PRs happen from a Claude Code cloud session.
- Cloud sessions see only this repo: this file is how context reaches them. Keep it current.

## Keeping this file current
- When Cindy sets a new lasting rule for this project, or corrects the same thing twice, update this file in the same PR (or a small separate one, merged under the small-fix rule) and tell her in one line what changed.
- Keep it short. Use explicit dates (YYYY-MM-DD).

## Status (2026-10-27)
- Done: skeleton v1 live, LinkedIn URL set.
- Next: About copy (2–4 sentences, from Cindy's draft), then the three case study bodies in `src/data/cases.js`.
