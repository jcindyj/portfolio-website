import profile from '../data/profile'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section__title">Contact</h2>
        <ul className="contact__list">
          <li>
            <span className="contact__label">Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <span className="contact__label">LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>
          </li>
        </ul>
      </div>
    </section>
  )
}
