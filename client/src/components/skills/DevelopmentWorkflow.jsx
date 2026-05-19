import {
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiLayout,
  FiServer,
} from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

const workflow = [
  {
    icon: FiLayout,
    title: 'Frontend UI',
    description:
      'Create responsive React pages, reusable components, and modern Tailwind CSS layouts.',
  },
  {
    icon: FiServer,
    title: 'Backend APIs',
    description:
      'Build Express.js routes, controllers, middleware, validation, and API responses.',
  },
  {
    icon: FiDatabase,
    title: 'Database Logic',
    description:
      'Design MongoDB schemas, connect data models, and manage CRUD operations.',
  },
  {
    icon: FiCode,
    title: 'Integration',
    description:
      'Connect frontend with backend APIs using Axios and clean service files.',
  },
  {
    icon: FiCheckCircle,
    title: 'Testing & Polish',
    description:
      'Test forms, routes, APIs, responsiveness, and fix bugs before delivery.',
  },
]

const DevelopmentWorkflow = () => {
  return (
    <section className="section-padding bg-soft">
      <Container>
        <SectionTitle
          badge="Workflow"
          title="How I use my skills in real projects"
          description="My development workflow follows a clean step-by-step structure from UI to backend and final testing."
          align="center"
        />

        <Card className="p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {workflow.map((item, index) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-blue text-white shadow-lg shadow-blue-500/20">
                    <Icon size={24} />
                  </div>

                  <p className="mt-5 text-sm font-black text-primary">
                    Step {index + 1}
                  </p>

                  <h3 className="mt-2 text-xl font-black text-dark">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default DevelopmentWorkflow