import profile from '../data/profile'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <p className="hero__eyebrow">{profile.role} · {profile.location}</p>
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__bio">{profile.bio}</p>
      </div>
    </section>
  )
}
