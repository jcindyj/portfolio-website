import profile from '../data/profile'

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href="#top">{profile.name}</a>
        <nav className="header__nav" aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
