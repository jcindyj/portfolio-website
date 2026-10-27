import { CaseCard, SectionHeader } from '../ui/components.jsx'
import cases from '../data/cases'

export default function Work() {
  const featured = cases.find((c) => c.featured)
  const rest = cases.filter((c) => c !== featured)
  return (
    <section className="page-section" id="work" aria-labelledby="work-title">
      <SectionHeader id="work-title" title="Work" note="Full case studies are in progress." />
      <div className="page-work">
        {featured && <CaseCard variant="featured" {...featured} />}
        <div className="ui-grid-2">
          {rest.map((c) => <CaseCard key={c.slug} {...c} />)}
        </div>
      </div>
    </section>
  )
}
