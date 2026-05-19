import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Container from '../common/Container'
import { useProfile } from '../../context/ProfileContext'

const Footer = () => {
  const { profile } = useProfile()
  const currentYear = new Date().getFullYear()

  const initials =
    profile.name
      ?.split(' ')
      .map((item) => item[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MH'

  return (
    <footer className="border-t border-border bg-dark text-white">
      <Container>
        <div className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-blue text-lg font-black text-white">
                {initials}
              </div>

              <div>
                <h2 className="text-lg font-black">{profile.name}</h2>
                <p className="text-sm text-white/60">{profile.role}</p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
              {profile.summary}
            </p>

            <div className="mt-6 flex gap-3">
              {profile.socials?.github && profile.socials.github !== '#' && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-primary"
                >
                  <FiGithub />
                </a>
              )}

              {profile.socials?.linkedin && profile.socials.linkedin !== '#' && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-primary"
                >
                  <FiLinkedin />
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-primary"
                >
                  <FiMail />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black">Quick Links</h3>

            <div className="mt-5 grid gap-3 text-sm text-white/70">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <Link to="/about" className="transition hover:text-white">
                About
              </Link>
              <Link to="/projects" className="transition hover:text-white">
                Projects
              </Link>
              <Link to="/skills" className="transition hover:text-white">
                Skills
              </Link>
              <Link to="/experience" className="transition hover:text-white">
                Experience
              </Link>
              <Link to="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black">Contact Info</h3>

            <div className="mt-5 space-y-4 text-sm text-white/70">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <FiMail className="text-primary" />
                  {profile.email}
                </a>
              )}

              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <FiPhone className="text-primary" />
                  {profile.phone}
                </a>
              )}

              {profile.location && (
                <p className="flex items-center gap-3">
                  <FiMapPin className="text-primary" />
                  {profile.location}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
          © {currentYear} {profile.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}

export default Footer