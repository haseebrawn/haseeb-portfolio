import {
  FiCheckCircle,
  FiCode,
  FiEye,
  FiMonitor,
  FiRefreshCcw,
  FiTarget,
} from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

const values = [
  {
    icon: FiCode,
    title: 'Clean Code',
    description:
      'I write clean, readable, and maintainable code following modern development practices.',
  },
  {
    icon: FiTarget,
    title: 'Problem Solver',
    description:
      'I enjoy solving real project problems and turning ideas into working solutions.',
  },
  {
    icon: FiRefreshCcw,
    title: 'Continuous Learner',
    description:
      'I keep improving my skills and learning better ways to build modern applications.',
  },
  {
    icon: FiMonitor,
    title: 'User Focused',
    description:
      'I build responsive interfaces with a strong focus on user experience and usability.',
  },
  {
    icon: FiEye,
    title: 'Detail Oriented',
    description:
      'I pay attention to layout, spacing, responsiveness, and feature behavior.',
  },
  {
    icon: FiCheckCircle,
    title: 'Reliable',
    description:
      'I focus on clear communication, consistent progress, and quality delivery.',
  },
]

const ValuesStrengths = () => {
  return (
    <section className="section-padding bg-soft">
      <Container>
        <SectionTitle
          badge="Values"
          title="My Values & Strengths"
          description="These are the qualities I focus on while building every project."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} className="p-6" hover>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-black text-dark">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ValuesStrengths