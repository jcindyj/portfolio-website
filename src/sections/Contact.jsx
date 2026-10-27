import { ContactRow, SectionHeader } from '../ui/components.jsx'
import profile from '../data/profile'

export default function Contact() {
  return (
    <section className="page-section" id="contact" aria-labelledby="contact-title">
      <SectionHeader id="contact-title" title="Contact" />
      <div className="page-contact">
        <ContactRow label="Email" href={`mailto:${profile.email}`}>{profile.email}</ContactRow>
        {profile.linkedin && (
          <ContactRow label="LinkedIn" href={profile.linkedin} external>LinkedIn profile</ContactRow>
        )}
      </div>
    </section>
  )
}
