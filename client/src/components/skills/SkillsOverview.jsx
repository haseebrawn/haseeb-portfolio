import { FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi'
import Container from '../common/Container'
import Card from '../common/Card'

const stats = [
  {
    title: 'Frontend',
    value: '3+',
    description: 'React, JavaScript, Tailwind',
    icon: FiCode,
  },
  {
    title: 'Backend',
    value: '4+',
    description: 'Node, Express, APIs, Auth',
    icon: FiServer,
  },
  {
    title: 'Database',
    value: '2+',
    description: 'MongoDB and Mongoose',
    icon: FiDatabase,
  },
  {
    title: 'Tools',
    value: '5+',
    description: 'Git, GitHub, Postman, npm',
    icon: FiTool,
  },
]

const SkillsOverview = () => {
  return (
    <section className="-mt-8 relative z-10">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} className="p-6" hover>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-4xl font-black text-primary">{item.value}</h3>
                    <p className="mt-2 text-lg font-black text-dark">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-primary">
                    <Icon size={22} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default SkillsOverview