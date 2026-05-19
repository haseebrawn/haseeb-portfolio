import { FiCode, FiGrid, FiLayers } from 'react-icons/fi'
import Container from '../common/Container'
import Badge from '../common/Badge'

const ProjectsHero = () => {
  return (
    <section className="gradient-soft border-b border-border py-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>MERN Stack Projects</Badge>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-dark md:text-7xl">
              My Projects
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              A selection of my recent work showcasing modern web applications,
              dashboards, ecommerce platforms, APIs, and full-stack solutions
              built with the MERN stack.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="card-soft gradient-soft p-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft text-primary">
                      <FiGrid size={22} />
                    </div>
                    <div>
                      <p className="font-black text-dark">Portfolio Grid</p>
                      <p className="text-sm text-muted">Project showcase</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
                    6+
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <FiCode className="text-primary" size={24} />
                    <p className="mt-4 text-2xl font-black text-dark">MERN</p>
                    <p className="text-sm text-muted">Full Stack</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <FiLayers className="text-primary" size={24} />
                    <p className="mt-4 text-2xl font-black text-dark">UI</p>
                    <p className="text-sm text-muted">Clean Design</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-black text-dark">Project Types</p>
                    <p className="text-sm font-bold text-primary">Live</p>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 w-full rounded-full bg-border">
                      <div className="h-2 w-[85%] rounded-full bg-primary" />
                    </div>
                    <div className="h-2 w-full rounded-full bg-border">
                      <div className="h-2 w-[65%] rounded-full bg-secondary" />
                    </div>
                    <div className="h-2 w-full rounded-full bg-border">
                      <div className="h-2 w-[75%] rounded-full bg-primary/60" />
                    </div>
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

export default ProjectsHero