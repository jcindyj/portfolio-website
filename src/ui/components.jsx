import { useEffect, useRef } from 'react'
import './ui.css'

const cx = (...c) => c.filter(Boolean).join(' ')

export function Link({ href, children, state, external, className }) {
  return (
    <a
      className={cx('ui-link', state && `is-${state}`, className)}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function Tag({ children }) {
  return <span className="ui-tag">{children}</span>
}

export function Tags({ items }) {
  return (
    <ul className="ui-tags">
      {items.map((t) => (
        <li key={t}><Tag>{t}</Tag></li>
      ))}
    </ul>
  )
}

// Fade in once when scrolled into view (opacity only, 1.2s). Does nothing when reduced motion is on.
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Already scrolled past (e.g. the page opened mid-way or jumped to an anchor): show it, don't hide it.
    if (el.getBoundingClientRect().bottom < 0) return
    el.classList.add('ui-reveal')
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// variant: 'featured' | 'standard'. Not a link until case pages exist. `image` = { src, alt } (optional).
// `request` = { label, href }: one link at the bottom of the card, e.g. to ask for a private case study.
export function CaseCard({ title, summary, tags = [], image, request, variant = 'standard', headingLevel = 3, reveal = true }) {
  const H = `h${headingLevel}`
  const ref = useReveal()
  return (
    <article ref={reveal ? ref : undefined} className={cx('ui-card', variant === 'featured' && 'ui-card--featured')}>
      {image && (
        <figure className="ui-card__media">
          <img src={image.src} alt={image.alt} loading={variant === 'featured' ? 'eager' : 'lazy'} decoding="async" />
        </figure>
      )}
      <div className="ui-card__body">
        <H className="t-title">{title}</H>
        <p className="t-body">{summary}</p>
        {tags.length > 0 && <div className="ui-card__tags"><Tags items={tags} /></div>}
        {request && <p className="ui-card__request"><Link href={request.href}>{request.label}</Link></p>}
      </div>
    </article>
  )
}

export function SectionHeader({ title, note, id, headingLevel = 2 }) {
  const H = `h${headingLevel}`
  return (
    <header className="ui-section-header">
      <H className="t-title" id={id}>{title}</H>
      {note && <p className="t-body">{note}</p>}
    </header>
  )
}

// wordmark: render the brand as the JCINDYJ logo type (Josefin Sans, light blue).
export function NavBar({ brand, brandHref = '#top', links = [], sticky = false, linkState, wordmark = false, brandLabel }) {
  return (
    <nav className={cx('ui-nav', sticky && 'ui-nav--sticky')} aria-label="Main">
      <div className="ui-container ui-nav__inner">
        <a className={cx('ui-nav__brand', wordmark && 'ui-nav__brand--wordmark')} href={brandHref} aria-label={brandLabel}>{brand}</a>
        <div className="ui-nav__links">
          {links.map((l) => (
            <a key={`${l.href}-${l.label}`} className={cx('ui-nav__link', linkState && `is-${linkState}`)} href={l.href}>{l.label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export function ContactRow({ label, href, children, external }) {
  return (
    <div className="ui-contact">
      <span className="t-meta ui-contact__label">{label}</span>
      <Link href={href} external={external}>{children}</Link>
    </div>
  )
}

export function Footer({ children }) {
  return (
    <footer className="ui-footer">
      <div className="ui-container t-meta">{children}</div>
    </footer>
  )
}
