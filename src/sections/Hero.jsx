import profile from '../data/profile'

export default function Hero() {
  return (
    <section className="page-hero" aria-labelledby="hero-headline">
      <div className="page-hero__who">
        <p className="t-brand">{profile.name}</p>
        <p className="t-meta">{profile.role} · {profile.location}</p>
      </div>
      <h1 className="t-display page-hero__headline" id="hero-headline">{profile.headline}</h1>
      <p className="t-body page-hero__bio">{profile.bio}</p>
    </section>
  )
}
