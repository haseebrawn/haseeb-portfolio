import { FiBriefcase, FiMapPin } from 'react-icons/fi'
import Container from '../common/Container'
import Badge from '../common/Badge'
import AvatarIllustration from '../common/AvatarIllustration'
import { useProfile } from '../../context/ProfileContext'

const AboutHero = () => {
  const { profile } = useProfile()

  return (
    <section className="gradient-soft border-b border-border py-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>About Me</Badge>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-dark md:text-7xl">
              I’m {profile.name}
            </h1>

            <h2 className="mt-5 text-2xl font-bold text-primary md:text-3xl">
              {profile.role}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {profile.aboutStory || profile.summary}
            </p>

            <div className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
              <div className="card-soft flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
                  <FiBriefcase size={22} />
                </div>

                <div>
                  <h3 className="font-black text-dark">{profile.experience}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Development Experience
                  </p>
                </div>
              </div>

              <div className="card-soft flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
                  <FiMapPin size={22} />
                </div>

                <div>
                  <h3 className="font-black text-dark">{profile.location}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Location
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AvatarIllustration />
        </div>
      </Container>
    </section>
  )
}

export default AboutHero