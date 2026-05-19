import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import { useProfile } from '../../context/ProfileContext'

const MyStory = () => {
  const { profile } = useProfile()

  return (
    <section className="section-padding">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="gradient-soft p-8">
            <div className="rounded-[28px] bg-white p-8 shadow-sm">
              <h3 className="text-3xl font-black text-dark">
                {profile.name}
              </h3>

              <p className="mt-3 text-lg font-bold text-primary">
                {profile.role}
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-soft p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    Experience
                  </p>
                  <p className="mt-1 font-black text-dark">
                    {profile.experience}
                  </p>
                </div>

                <div className="rounded-2xl bg-soft p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    Email
                  </p>
                  <p className="mt-1 break-words font-black text-dark">
                    {profile.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-soft p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    Location
                  </p>
                  <p className="mt-1 font-black text-dark">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <SectionTitle
              badge="My Story"
              title="MERN Stack developer focused on practical web solutions"
              description={profile.aboutStory || profile.summary}
            />

            <div className="space-y-5 text-base leading-8 text-muted">
              <p>
                I work with React.js, Node.js, Express.js, and MongoDB to build
                modern full-stack web applications with clean structure,
                responsive design, and scalable backend APIs.
              </p>

              <p>
                My focus is to create portfolio-ready, business-ready, and
                user-friendly applications that are easy to maintain and improve
                over time.
              </p>

              <p>
                I enjoy working on dashboards, admin panels, ecommerce features,
                authentication systems, REST APIs, and database-driven platforms.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MyStory