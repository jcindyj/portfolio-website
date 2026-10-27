import { useEffect, useState } from 'react'
import { Link, Tag, Tags, CaseCard, SectionHeader, NavBar, ContactRow, Footer } from '../ui/components.jsx'
import cases from '../data/cases.js'
import profile from '../data/profile.js'
import './library.css'

const COLORS = [
  { token: '--bg', use: 'Page background, warm black', on: '--text' },
  { token: '--surface', use: 'Cards. White at 5%, so the page shows through.', on: '--text' },
  { token: '--surface-hover', use: 'Raised surface (reserved for clickable cards)', on: '--text' },
  { token: '--line', use: 'Dividers only, never the only signal', on: null },
  { token: '--text', use: 'Names and titles', on: 'bg' },
  { token: '--text-2', use: 'Body copy', on: 'bg' },
  { token: '--text-3', use: 'Meta: role, city, small labels', on: 'bg' },
  { token: '--accent', use: 'JCINDYJ light blue. Clickable only.', on: 'bg' },
  { token: '--brand', use: 'JCINDYJ deep blue. Text side of the featured gradient.', on: '--brand-text' },
  { token: '--brand-text-2', use: 'Body copy on the brand fill', on: 'brand' },
  { token: '--tag-bg', use: 'Tag fill. Light blue at 16%.', on: '--tag-text', base: 'surface' },
  { token: '--tag-bg-on-brand', use: 'Tag fill on the brand blue', on: '--tag-text-on-brand', base: 'brand' },
]


const SPACE = ['--space-1', '--space-2', '--space-3', '--space-4', '--space-5', '--space-6', '--space-7', '--space-8']

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

// Resolve any CSS color (hex or rgba) to [r, g, b, a].
function rgba(color) {
  const probe = document.createElement('span')
  probe.style.color = color
  document.body.appendChild(probe)
  const m = getComputedStyle(probe).color.match(/[\d.]+/g).map(Number)
  probe.remove()
  return [m[0], m[1], m[2], m[3] ?? 1]
}

// Flatten a translucent color onto the colors underneath it (listed top to bottom).
function flatten(color, ...under) {
  const layers = [color, ...under].map(rgba)
  let out = layers[layers.length - 1].slice(0, 3)
  for (let i = layers.length - 2; i >= 0; i--) {
    const [r, g, b, a] = layers[i]
    out = [r * a + out[0] * (1 - a), g * a + out[1] * (1 - a), b * a + out[2] * (1 - a)]
  }
  return out
}

function luminance([r, g, b]) {
  const c = [r, g, b].map((x) => x / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const toHex = ([r, g, b]) => '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')

// Contrast is measured from the live tokens, not typed by hand. Translucent tokens are
// flattened onto what they actually sit on before measuring.
function contrastLabel(item) {
  if (!item.on) return 'Decorative'
  const v = cssVar
  const bg = flatten(v('--bg'))
  const surface = flatten(v('--surface'), v('--bg'))
  if (item.on === 'brand') {
    return `${contrast(flatten(v(item.token)), flatten(v('--brand'))).toFixed(1)}:1 on brand`
  }
  if (item.on === 'bg') {
    const self = flatten(v(item.token))
    return `${contrast(self, bg).toFixed(1)}:1 on bg · ${contrast(self, surface).toFixed(1)}:1 on surface`
  }
  if (item.on === '--text') {
    const fill = flatten(v(item.token), v('--bg'))
    return `${contrast(flatten(v('--text')), fill).toFixed(1)}:1 with text`
  }
  const base = item.base === 'brand' ? [v('--brand')] : item.base === 'surface' ? [v('--surface'), v('--bg')] : [v('--bg')]
  const fill = flatten(v(item.token), ...base)
  return `${contrast(flatten(v(item.on)), fill).toFixed(1)}:1 with ${item.on.replace('--', '')}`
}

function swatchHex(item) {
  const raw = cssVar(item.token)
  return raw.startsWith('#') ? raw : `${raw} → ${toHex(flatten(raw, ...(item.base === 'brand' ? [cssVar('--brand')] : item.base === 'surface' ? [cssVar('--surface'), cssVar('--bg')] : [cssVar('--bg')])))}`
}

function Specimen({ label, children, flush, bare }) {
  return (
    <div className="lib-specimen">
      {label && <span className="t-meta">{label}</span>}
      <div className={`lib-stage${flush ? ' lib-stage--flush' : ''}${bare ? ' lib-stage--bare' : ''}`}>{children}</div>
    </div>
  )
}

function States({ render }) {
  return (
    <div className="lib-states">
      <Specimen label="Default">{render(undefined)}</Specimen>
      <Specimen label="Hover">{render('hover')}</Specimen>
      <Specimen label="Keyboard focus">{render('focus')}</Specimen>
    </div>
  )
}

function Section({ id, title, note, children }) {
  return (
    <section className="lib-section" aria-labelledby={id}>
      <SectionHeader id={id} title={title} note={note} headingLevel={3} />
      {children}
    </section>
  )
}

export default function LibraryPage() {
  const [labels, setLabels] = useState({})
  const [spaces, setSpaces] = useState({})

  useEffect(() => {
    setLabels(Object.fromEntries(COLORS.map((c) => {
      const base = c.base === 'brand' ? [cssVar('--brand')] : c.base === 'surface' ? [cssVar('--surface'), cssVar('--bg')] : [cssVar('--bg')]
      return [c.token, { hex: swatchHex(c), contrast: contrastLabel(c), shown: toHex(flatten(cssVar(c.token), ...base)) }]
    })))
    setSpaces(Object.fromEntries(SPACE.map((s) => [s, cssVar(s)])))
  }, [])

  const featured = cases.find((c) => c.featured)
  const standard = cases.filter((c) => !c.featured)

  return (
    <>
      <NavBar
        sticky
        brand="UI Library"
        brandHref="#top"
        links={[{ href: '#foundations', label: 'Foundations' }, { href: '#components', label: 'Components' }]}
      />
      <main className="ui-container lib-main" id="top">
        <div className="lib-intro">
          <h1 className="t-display">UI Library</h1>
          <p className="t-body">The parts the portfolio is built from. The site uses only what is on this page.</p>
        </div>

        <div className="lib-group">
          <h2 className="t-title lib-group__title" id="foundations">Foundations</h2>

          <Section id="color" title="Color" note="Dark only. Contrast is measured from the live tokens.">
            <div className="lib-swatches">
              {COLORS.map((c) => (
                <div className="lib-swatch" key={c.token}>
                  <span className="lib-swatch__chip" style={{ background: labels[c.token]?.shown || `var(${c.token})` }} aria-hidden="true" />
                  <div className="lib-swatch__text">
                    <span className="lib-swatch__name">{c.token.replace('--', '')}</span>
                    <span className="t-meta">{labels[c.token]?.hex}</span>
                    <span className="t-meta">{c.use}</span>
                    <span className="t-meta">{labels[c.token]?.contrast}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="type" title="Type" note="One look per kind of information. Josefin Sans (the JCINDYJ logo font) for the name only; system font for the rest.">
            <Specimen>
              <div className="lib-type">
                <div className="lib-type__row"><span className="t-meta">Brand · Josefin Sans</span><span className="t-brand">{profile.name}</span></div>
                <div className="lib-type__row"><span className="t-meta">Display · headline</span><span className="t-display">{profile.headline}</span></div>
                <div className="lib-type__row"><span className="t-meta">Title</span><span className="t-title">{featured.title}</span></div>
                <div className="lib-type__row"><span className="t-meta">Body</span><span className="t-body">{featured.summary}</span></div>
                <div className="lib-type__row"><span className="t-meta">Meta</span><span className="t-meta">{profile.role} · {profile.location}</span></div>
                <div className="lib-type__row"><span className="t-meta">Link</span><span className="t-body"><Link href={`mailto:${profile.email}`}>{profile.email}</Link></span></div>
              </div>
            </Specimen>
          </Section>

          <Section id="spacing" title="Spacing and layout" note="4px base. Content max 1040px, 16px side gutter, text lines max 40rem.">
            <Specimen>
              <div className="lib-space">
                {SPACE.map((s) => (
                  <div className="lib-space__row" key={s}>
                    <span className="t-meta">{s.replace('--', '')} · {spaces[s]}</span>
                    <span className="lib-space__bar" style={{ width: `var(${s})` }} />
                  </div>
                ))}
              </div>
            </Specimen>
          </Section>

          <Section id="surface" title="Surface" note="No shadows. Height is shown by surface color only.">
            <div className="lib-surfaces">
              <div className="lib-surface" style={{ background: 'var(--bg)', border: '1px solid var(--line)' }}>
                <span className="t-title">bg</span><span className="t-meta">Page</span>
              </div>
              <div className="lib-surface" style={{ background: 'var(--surface)' }}>
                <span className="t-title">surface</span><span className="t-meta">Cards</span>
              </div>
              <div className="lib-surface" style={{ background: 'var(--surface-hover)' }}>
                <span className="t-title">surface-hover</span><span className="t-meta">Clickable cards, later</span>
              </div>
            </div>
          </Section>

          <Section id="gradient" title="Gradient" note="Two places only: a soft light-blue glow at the top right of the page, and the featured case, dark blue on the text side to light blue behind the image.">
            <div className="lib-surfaces">
              <div className="lib-surface" style={{ background: 'var(--glow-top) no-repeat, var(--bg)', border: '1px solid var(--line)' }}>
                <span className="t-title">glow-top</span><span className="t-meta">Page top right, 22% light blue</span>
              </div>
              <div className="lib-surface" style={{ background: 'var(--brand-gradient)' }}>
                <span className="t-title" style={{ color: 'var(--brand-text)' }}>brand-gradient</span><span className="t-meta" style={{ color: 'var(--brand-text-2)' }}>Featured case, desktop</span>
              </div>
              <div className="lib-surface" style={{ background: 'var(--brand-gradient-stacked)' }}>
                <span className="t-title" style={{ color: 'var(--brand-text)' }}>brand-gradient-stacked</span><span className="t-meta" style={{ color: 'var(--brand-text-2)' }}>Featured case, phone</span>
              </div>
            </div>
          </Section>

          <Section id="motion" title="Motion" note="Cards fade in once, slowly (1.2s), brightness only. No movement, scaling, or blur. Off when the viewer turns on reduced motion.">
            <Specimen>
              <p className="t-meta">Scroll down to the case cards to see it.</p>
            </Specimen>
          </Section>

          <Section id="icons" title="Icons" note="None in v1. If needed later, one SVG set. No text glyphs as icons." />
        </div>

        <div className="lib-group">
          <h2 className="t-title lib-group__title" id="components">Components</h2>

          <Section id="link" title="Link">
            <States render={(s) => <Link href="#link" state={s}>{profile.email}</Link>} />
          </Section>

          <Section id="tag" title="Tag" note="Small and filled. Labels only, not clickable.">
            <Specimen>
              <Tags items={featured.tags} />
            </Specimen>
          </Section>

          <Section id="card-featured" title="Case card, featured" note="One per page, on the JCINDYJ deep blue. Image on the right from 900px up. Not clickable until case pages exist.">
            <Specimen bare>
              <CaseCard variant="featured" {...featured} headingLevel={4} />
            </Specimen>
          </Section>

          <Section id="card-standard" title="Case card, standard" note="Two across on desktop, one on mobile. The image is optional; a case without a usable image shows text only.">
            <Specimen bare>
              <div className="ui-grid-2">
                {standard.map((c) => <CaseCard key={c.slug} {...c} headingLevel={4} />)}
              </div>
            </Specimen>
          </Section>

          <Section id="section-header" title="Section header" note="Title, plus one optional note line.">
            <Specimen>
              <SectionHeader title="Work" note="Full case studies are in progress." headingLevel={4} />
            </Specimen>
          </Section>

          <Section id="wordmark" title="Wordmark" note="JCINDYJ in Josefin Sans Bold, light blue so it reads on dark. Links home.">
            <Specimen flush>
              <NavBar wordmark brand="JCINDYJ" brandLabel={`${profile.name}, home`} brandHref="#wordmark" links={[{ href: '#wordmark', label: 'Work' }, { href: '#wordmark', label: 'Contact' }]} />
            </Specimen>
          </Section>

          <Section id="nav" title="Nav bar">
            <States render={(s) => (
              <div className="lib-stage--flush" style={{ margin: 'calc(-1 * var(--space-5))' }}>
                <NavBar wordmark brand="JCINDYJ" brandLabel={`${profile.name}, home`} brandHref="#nav" links={[{ href: '#nav', label: 'Work' }, { href: '#nav', label: 'Contact' }]} linkState={s} />
              </div>
            )} />
          </Section>

          <Section id="contact" title="Contact row">
            <Specimen>
              <ContactRow label="Email" href={`mailto:${profile.email}`}>{profile.email}</ContactRow>
            </Specimen>
          </Section>

          <Section id="footer" title="Footer">
            <Specimen flush>
              <Footer>© {new Date().getFullYear()} {profile.name}</Footer>
            </Specimen>
          </Section>
        </div>
      </main>
    </>
  )
}
