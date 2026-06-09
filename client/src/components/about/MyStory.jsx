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
              title="Software Engineer building reliable, modern web applications"
              description="I am a Software Engineer focused on building clean, responsive, and scalable web applications with practical business value. My work combines frontend polish, backend structure, database design, and real-world problem solving to create digital products that are easy to use, maintain, and grow."
            />

            <div className="space-y-5 text-base leading-8 text-muted">
              <p>
                I work with React.js, Node.js, Express.js, MongoDB, MySQL,
                Inertia.js, and Tailwind CSS to develop full-stack applications
                with strong UI quality, reusable components, secure APIs, and
                organized database structures.
              </p>

              <p>
                My experience includes portfolio websites, admin dashboards,
                CRUD systems, authentication flows, contact management,
                project showcases, CV/resume features, and responsive pages
                built for both users and administrators.
              </p>

              <p>
                I focus on writing maintainable code, improving user experience,
                and delivering features that solve real needs. Every project I
                build is treated as a step toward becoming a stronger and more
                dependable software engineer.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MyStory
