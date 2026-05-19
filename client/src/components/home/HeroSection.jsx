import { FiArrowRight, FiDownload, FiMapPin } from 'react-icons/fi'
import Container from '../common/Container'
import Button from '../common/Button'
import Badge from '../common/Badge'
import AvatarIllustration from '../common/AvatarIllustration'
import { useProfile } from '../../context/ProfileContext'

const HeroSection = () => {
  const { profile } = useProfile()

  return (
    <section className="gradient-soft border-b border-border py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>Available for MERN Stack Projects</Badge>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-dark md:text-7xl">
              Hi, I’m <span className="text-primary">{profile.name}</span>
            </h1>

            <h2 className="mt-5 text-2xl font-bold text-primary md:text-3xl">
              {profile.role}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {profile.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-muted">
              {profile.experience && (
                <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                  {profile.experience} Experience
                </span>
              )}

              {profile.location && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <FiMapPin className="text-primary" />
                  {profile.location}
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button to="/projects" icon={<FiArrowRight />}>
                View Projects
              </Button>

              {profile.resumeUrl && profile.resumeUrl !== '#' ? (
                <Button
                  href={profile.resumeUrl}
                  variant="secondary"
                  icon={<FiDownload />}
                >
                  Download Resume
                </Button>
              ) : (
                <Button to="/contact" variant="secondary">
                  Contact Me
                </Button>
              )}
            </div>
          </div>

          <AvatarIllustration />
        </div>
      </Container>
    </section>
  )
}

export default HeroSection