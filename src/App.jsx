import { NavBar, Footer } from './ui/components.jsx'
import Hero from './sections/Hero'
import Work from './sections/Work'
import About from './sections/About'
import Contact from './sections/Contact'
import profile from './data/profile'
import './page.css'

// Shown only when its copy is written.
const SHOW_ABOUT = false

const links = [
  { href: '#work', label: 'Work' },
  ...(SHOW_ABOUT ? [{ href: '#about', label: 'About' }] : []),
  { href: '#contact', label: 'Contact' },
]

export default function App() {
  return (
    <>
      <NavBar sticky wordmark brand="JCINDYJ" brandLabel={`${profile.name}, home`} brandHref="#top" links={links} />
      <main className="ui-container" id="top">
        <Hero />
        <Work />
        {SHOW_ABOUT && <About />}
        <Contact />
      </main>
      <Footer>© {new Date().getFullYear()} {profile.name}</Footer>
    </>
  )
}
