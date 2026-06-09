import { FiBriefcase, FiCode, FiClock, FiUsers } from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

const highlights = [
  {
    icon: FiBriefcase,
    value: '9',
    title: 'Projects Completed',
    description: 'Portfolio, CV/resume, practice, and full-stack web projects.',
  },
  {
    icon: FiUsers,
    value: '3',
    title: 'Happy Users',
    description: 'Real users helped through clean and practical web solutions.',
  },
  {
    icon: FiCode,
    value: '10K+',
    title: 'Lines of Code',
    description: 'Clean and maintainable frontend and backend code.',
  },
  {
    icon: FiClock,
    value: '5K+',
    title: 'Hours Coded',
    description: 'Daily software-house work, learning, building, and debugging.',
  },
]

const ExperienceHighlights = () => {
  return (
    <section className="section-padding">
      <Container>
        <SectionTitle
          badge="Experience"
          title="Experience Highlights"
          description="A quick overview of my practical development experience and growth."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} className="p-6" hover>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-4xl font-black text-primary">{item.value}</h3>
                <p className="mt-2 text-lg font-black text-dark">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ExperienceHighlights
