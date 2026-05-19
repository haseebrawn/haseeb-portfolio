import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import Container from '../../common/Container'
import Card from '../../common/Card'
import SectionTitle from '../../common/SectionTitle'

const DevelopmentProcess = ({ project }) => {
  return (
    <section className="section-padding">
      <Container>
        <SectionTitle
          badge="Process"
          title="Development Process"
          description="The project was completed using a clean phase-wise development process."
          align="center"
        />

        <Card className="p-8 md:p-10">
          <div className="grid gap-6 lg:grid-cols-5">
            {project.process.map((item, index) => (
              <div key={item.step} className="relative">
                {index !== project.process.length - 1 && (
                  <FiArrowRight className="absolute right-0 top-7 hidden text-primary lg:block" />
                )}

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-blue text-xl font-black text-white">
                  {item.step}
                </div>

                <h3 className="mt-5 text-xl font-black text-dark">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
                  <FiCheckCircle />
                  Completed
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default DevelopmentProcess