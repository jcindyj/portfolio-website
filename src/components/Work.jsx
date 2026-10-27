import cases from '../data/cases'

function CaseCard({ item, index }) {
  // Cards link to a hash for now; swap for a router <Link to={`/work/${item.slug}`}> later.
  return (
    <a className="case-card" href={`#${item.slug}`} id={item.slug}>
      <span className="case-card__index">0{index + 1}</span>
      <h3 className="case-card__title">{item.title}</h3>
      <p className="case-card__summary">{item.summary}</p>
      <div className="case-card__tags">
        {item.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
      <span className="case-card__status">{item.status} →</span>
    </a>
  )
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <h2 className="section__title">Selected work</h2>
        <div className="case-grid">
          {cases.map((item, i) => (
            <CaseCard item={item} index={i} key={item.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}
