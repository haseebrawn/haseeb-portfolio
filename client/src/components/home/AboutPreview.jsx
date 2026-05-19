import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import Card from '../common/Card'
import { useProfile } from '../../context/ProfileContext'

const points = [
  'Frontend development with React.js',
  'Backend API development with Node.js and Express.js',
  'MongoDB database structure and CRUD operations',
  'Responsive UI with Tailwind CSS',
]

const AboutPreview = () => {
  const { profile } = useProfile()

  return (
    <section className="section-padding bg-soft">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="gradient-soft p-8">
            <div className="rounded-[28px] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold text-primary">About Developer</p>

              <h3 className="mt-4 text-4xl font-black text-dark">
                {profile.name}
              </h3>

              <p className="mt-3 text-xl font-bold text-primary">
                {profile.role}
              </p>

              <div className="mt-6 grid gap-4">
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
              badge="About Me"
              title="Building clean full-stack web applications"
              description={profile.aboutStory || profile.summary}
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <FiCheckCircle className="mt-1 shrink-0 text-primary" />
                  <p className="text-sm font-semibold leading-7 text-muted">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <Button to="/about" className="mt-8" icon={<FiArrowRight />}>
              More About Me
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AboutPreview