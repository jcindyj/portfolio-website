import { SectionHeader } from '../ui/components.jsx'

// Hidden until the copy exists (App.jsx SHOW_ABOUT). Do not summarize the long bio here.
// TODO: a short portfolio-voice paragraph (2-4 sentences) once the case studies are in.
export default function About() {
  return (
    <section className="page-section" id="about" aria-labelledby="about-title">
      <SectionHeader id="about-title" title="About" />
      <p className="t-body page-hero__bio" />
    </section>
  )
}
