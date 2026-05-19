import { FiCode, FiLayers, FiZap, FiStar } from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

const timeline = [
  {
    year: '2022',
    title: 'Started My Journey',
    description:
      'Began learning web development and built my first projects with HTML, CSS, and JavaScript.',
    icon: FiZap,
  },
  {
    year: '2022 - 2023',
    title: 'Frontend Development',
    description:
      'Focused on building responsive user interfaces with React.js and modern frontend tools.',
    icon: FiCode,
  },
  {
    year: '2023 - 2024',
    title: 'MERN Stack Developer',
    description:
      'Started building full-stack applications with MongoDB, Express.js, React.js, and Node.js.',
    icon: FiLayers,
  },
  {
    year: '2024 - Present',
    title: 'Building & Growing',
    description:
      'Continuing to build scalable web apps, improve backend skills, and work on real-world projects.',
    icon: FiStar,
  },
]

const JourneyTimeline = () => {
  return (
    <section className="section-padding bg-soft">
      <Container>
        <SectionTitle
          badge="My Journey"
          title="How I grew as a MERN Stack Developer"
          description="A simple timeline of my learning and development journey."
          align="center"
        />

        <Card className="p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-4">
            {timeline.map((item, index) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="relative">
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-8 top-8 hidden h-1 w-full bg-border lg:block" />
                  )}

                  <div className="relative z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-blue text-white shadow-lg shadow-blue-500/20">
                      <Icon size={24} />
                    </div>

                    <p className="mt-5 text-sm font-bold text-primary">
                      {item.year}
                    </p>

                    <h3 className="mt-2 text-xl font-black text-dark">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default JourneyTimeline