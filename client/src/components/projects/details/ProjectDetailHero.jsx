import { FiExternalLink, FiGithub, FiShare2 } from 'react-icons/fi'
import Container from '../../common/Container'
import Badge from '../../common/Badge'
import Button from '../../common/Button'

const ProjectDetailHero = ({ project }) => {
  return (
    <section className="gradient-soft border-b border-border py-20">
      <Container>
        <div className="mb-8 text-sm font-semibold text-muted">
          Home / Projects / <span className="text-primary">{project.title}</span>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <Badge>{project.category} Project</Badge>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-dark md:text-7xl">
              {project.title}
            </h1>

            <h2 className="mt-4 text-2xl font-bold text-primary md:text-3xl">
              {project.subtitle}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {project.fullDescription}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={project.liveUrl} icon={<FiExternalLink />}>
                Live Preview
              </Button>

              <Button href={project.githubUrl} variant="secondary" icon={<FiGithub />}>
                View Code
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-semibold text-muted">Share Project:</span>
              <div className="flex gap-3">
                <span className="rounded-full bg-white p-3 text-dark shadow-sm">
                  <FiGithub />
                </span>
                <span className="rounded-full bg-white p-3 text-dark shadow-sm">
                  <FiShare2 />
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#07142f] p-6 text-white shadow-2xl shadow-blue-500/20">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-primary">{project.title}</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                Case Study
              </span>
            </div>

            <div className="mt-10">
              <h4 className="text-4xl font-black">{project.title}</h4>
              <p className="mt-3 text-white/60">{project.subtitle}</p>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl bg-white/10 p-5">
                <div className="h-2 w-32 rounded-full bg-white/40" />
                <div className="mt-3 h-2 w-52 rounded-full bg-primary/70" />
                <div className="mt-3 h-2 w-40 rounded-full bg-secondary/70" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {project.results.slice(0, 3).map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-black text-secondary">{item.value}</p>
                    <p className="mt-1 text-xs text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProjectDetailHero