import { FiInfo, FiHelpCircle, FiZap } from 'react-icons/fi'
import Container from '../../common/Container'
import Card from '../../common/Card'

const ProjectOverviewCards = ({ project }) => {
  const cards = [
    {
      icon: FiInfo,
      title: 'Project Overview',
      description: project.fullDescription,
      items: [
        `Category: ${project.category}`,
        `Timeline: ${project.timeline}`,
        `Role: ${project.role}`,
        `Team: ${project.team}`,
      ],
    },
    {
      icon: FiHelpCircle,
      title: 'Problem Statement',
      description: project.problemStatement,
      items: [],
    },
    {
      icon: FiZap,
      title: 'Solution',
      description: project.solution,
      items: [],
    },
  ]

  return (
    <section className="section-padding">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <Card key={card.title} className="p-7" hover>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
                  <Icon size={24} />
                </div>

                <h2 className="mt-6 text-2xl font-black text-dark">{card.title}</h2>

                <p className="mt-4 text-sm leading-7 text-muted">{card.description}</p>

                {card.items.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="rounded-2xl bg-soft px-4 py-3 text-sm font-semibold text-dark">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ProjectOverviewCards