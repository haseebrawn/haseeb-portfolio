import { FiSend, FiShield } from 'react-icons/fi'
import Container from '../common/Container'
import Badge from '../common/Badge'
import AvatarIllustration from '../common/AvatarIllustration'
import { useProfile } from '../../context/ProfileContext'

const ContactHero = () => {
  const { profile } = useProfile()

  return (
    <section className="gradient-soft border-b border-border py-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>Let’s Work Together</Badge>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-dark md:text-7xl">
              Contact Me
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Have a project in mind or want to discuss an opportunity with a
              {` ${profile.role}`}? Send me a message and I’ll get back to you.
            </p>

            <div className="mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
              <div className="card-soft flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
                  <FiSend size={22} />
                </div>

                <div>
                  <h3 className="font-black text-dark">Quick Response</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    I typically reply within 24 hours.
                  </p>
                </div>
              </div>

              <div className="card-soft flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
                  <FiShield size={22} />
                </div>

                <div>
                  <h3 className="font-black text-dark">Professional & Reliable</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Focused on quality work and clear communication.
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

export default ContactHero