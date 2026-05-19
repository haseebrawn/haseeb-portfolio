import { FiCode, FiDatabase, FiLayers } from 'react-icons/fi'
import Container from '../common/Container'
import Badge from '../common/Badge'

const SkillsHero = () => {
  return (
    <section className="gradient-soft border-b border-border py-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>Technical Skills</Badge>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-dark md:text-7xl">
              My Skills
            </h1>

            <h2 className="mt-5 text-2xl font-bold text-primary md:text-3xl">
              MERN Stack Development Skills
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              I use modern frontend, backend, database, and development tools to build clean,
              responsive, secure, and scalable full-stack web applications.
            </p>
          </div>

          <div className="card-soft gradient-soft p-6">
            <div className="grid gap-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
                    <FiLayers size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-dark">MERN Stack</h3>
                    <p className="text-sm text-muted">MongoDB, Express, React, Node</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <FiCode className="text-primary" size={26} />
                  <h4 className="mt-4 text-2xl font-black text-dark">Frontend</h4>
                  <p className="text-sm text-muted">React UI</p>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <FiDatabase className="text-primary" size={26} />
                  <h4 className="mt-4 text-2xl font-black text-dark">Backend</h4>
                  <p className="text-sm text-muted">APIs + DB</p>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-black text-dark">Development Focus</p>
                  <p className="text-sm font-bold text-primary">Full Stack</p>
                </div>

                <div className="space-y-3">
                  <div className="h-2 w-full rounded-full bg-border">
                    <div className="h-2 w-[88%] rounded-full bg-primary" />
                  </div>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div className="h-2 w-[80%] rounded-full bg-secondary" />
                  </div>
                  <div className="h-2 w-full rounded-full bg-border">
                    <div className="h-2 w-[76%] rounded-full bg-primary/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SkillsHero