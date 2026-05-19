import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import { skills } from '../../data/skills'

const categories = ['Frontend', 'Backend', 'Database', 'Tools']

const ToolsTechnologies = () => {
  return (
    <section className="section-padding">
      <Container>
        <SectionTitle
          badge="Tech Stack"
          title="Tools & Technologies"
          description="Technologies and tools I use to build full-stack MERN applications."
          align="center"
        />

        <Card className="p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-4">
            {categories.map((category) => {
              const categorySkills = skills.filter((skill) => skill.category === category)

              return (
                <div key={category}>
                  <h3 className="mb-5 text-xl font-black text-dark">{category}</h3>

                  <div className="space-y-4">
                    {categorySkills.map((skill) => {
                      const Icon = skill.icon

                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-4 rounded-2xl border border-border bg-soft p-4"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                            <Icon className={`text-2xl ${skill.color}`} />
                          </div>

                          <div>
                            <p className="font-black text-dark">{skill.name}</p>
                            <p className="text-sm text-muted">{skill.category}</p>
                          </div>
                        </div>
                      )
                    })}
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

export default ToolsTechnologies