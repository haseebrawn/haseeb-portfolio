import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi'
import Card from '../common/Card'
import { useProfile } from '../../context/ProfileContext'

const ContactInfo = () => {
  const { profile } = useProfile()

  const contactItems = [
    {
      icon: FiMail,
      label: 'Email',
      value: profile.email,
      href: profile.email ? `mailto:${profile.email}` : null,
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: profile.phone,
      href: profile.phone ? `tel:${profile.phone}` : null,
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: profile.location,
      href: null,
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: profile.socials?.linkedin || 'Not added',
      href: profile.socials?.linkedin,
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: profile.socials?.github || 'Not added',
      href: profile.socials?.github,
    },
  ].filter((item) => item.value && item.value !== '#')

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-black text-dark">Let’s Connect</h2>

      <p className="mt-3 text-sm leading-7 text-muted">
        Reach out through email, phone, or social platforms.
      </p>

      <div className="mt-6 space-y-4">
        {contactItems.map((item) => {
          const Icon = item.icon

          const content = (
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-soft p-4 transition hover:border-primary hover:bg-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                <Icon size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  {item.label}
                </p>

                <p className="mt-1 break-words text-sm font-bold text-dark">
                  {item.value}
                </p>
              </div>
            </div>
          )

          if (item.href && item.href !== '#') {
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            )
          }

          return <div key={item.label}>{content}</div>
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-green-50 p-4">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-green-500" />

          <div>
            <p className="font-black text-dark">Availability</p>
            <p className="mt-1 text-sm text-muted">Open for new opportunities</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ContactInfo