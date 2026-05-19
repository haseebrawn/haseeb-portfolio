import { FiCheckCircle, FiCode } from 'react-icons/fi'
import Container from '../../common/Container'
import Card from '../../common/Card'
import SectionTitle from '../../common/SectionTitle'

const ProjectFeaturesTech = ({ project }) => {
  return (
    <section className="section-padding bg-soft">
      <Container>
        <SectionTitle
          badge="Features & Stack"
          title="Key Features and Technology Stack"
          description="This section explains what the project includes and which technologies were used to build it."
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-8">
            <h2 className="text-2xl font-black text-dark">Key Features</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-white p-4"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
                    <FiCheckCircle />
                  </div>

                  <p className="text-sm font-semibold leading-7 text-dark">{feature}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-black text-dark">Technology Stack</h2>

            <div className="mt-6 space-y-4">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft text-primary">
                    <FiCode />
                  </div>

                  <div>
                    <p className="font-black text-dark">{tech}</p>
                    <p className="text-sm text-muted">Project Technology</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}

export default ProjectFeaturesTech