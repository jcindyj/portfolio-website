// Case-study data. Each entry can later become its own route/page (e.g. /work/:slug).
// Keep NDA in mind: no internal product codenames, teammate names, or real screens.
// Titles follow the case-study drafts (v0, 2026-10-27). `featured` = the one hero case.
// `image` paths go through BASE_URL so they work under the GitHub Pages sub-path too.
const img = (file) => `${import.meta.env.BASE_URL}work/${file}`

export const cases = [
  {
    slug: 'agent-assisted-design-loop',
    title: 'Agent-assisted design: from a spec conversation to a working prototype',
    summary: 'Going from a written spec straight into a working prototype with AI tools, then iterating in review.',
    tags: ['AI tooling', 'Prototyping', 'Process'],
    image: { src: img('ui-library.jpg'), alt: 'The UI library page of this site, built with an AI coding agent' },
    featured: true,
  },
  {
    slug: 'display-settings-app-refresh',
    title: 'Refreshing a live consumer display app, Windows and Mac',
    summary: 'A cross-platform (Windows + Mac) refresh of a shipped settings app.',
    tags: ['Consumer app', 'Windows', 'Mac'],
  },
  {
    slug: 'peelaboo',
    title: 'Peelaboo: from customer research to running a cosmetics brand',
    summary: 'Customer research, brand, sourcing, pricing, and day-to-day operations for my own direct-to-consumer nail care line.',
    tags: ['Research', 'Brand', 'Operations'],
    image: { src: img('peelaboo-personas.jpg'), alt: 'Two Peelaboo customer personas, Sarah and Kim' },
  },
]

export default cases
