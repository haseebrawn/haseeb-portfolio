import { FiBriefcase, FiCode, FiTrendingUp } from 'react-icons/fi'
import Container from '../common/Container'
import Badge from '../common/Badge'
import AvatarIllustration from '../common/AvatarIllustration'
import { useProfile } from '../../context/ProfileContext'

const ExperienceHero = () => {
  const { profile } = useProfile()

  return (
    <section className="gradient-soft border-b border-border py-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>Professional Experience</Badge>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-dark md:text-7xl">
              My Work Experience
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              I’m {profile.name}, a {profile.role}. This page highlights my
              professional journey, responsibilities, technologies, and practical
              experience as a software engineer.
            </p>

            <div className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-3">
              <div className="card-soft p-5">
                <FiBriefcase className="text-primary" size={24} />
                <h3 className="mt-4 font-black text-dark">Real Work</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Software engineering experience
                </p>
              </div>

              <div className="card-soft p-5">
                <FiCode className="text-primary" size={24} />
                <h3 className="mt-4 font-black text-dark">MERN Stack</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  React, Node, Express, MongoDB
                </p>
              </div>

              <div className="card-soft p-5">
                <FiTrendingUp className="text-primary" size={24} />
                <h3 className="mt-4 font-black text-dark">Growth</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Practical project development
                </p>
              </div>
            </div>
          </div>

          <AvatarIllustration />
        </div>
      </Container>
    </section>
  )
}

export default ExperienceHero