import { FiArrowRight, FiStar } from 'react-icons/fi'
import Button from '../common/Button'
import Card from '../common/Card'

const FeaturedProjectBanner = ({ project }) => {
  if (!project) return null

  return (
    <Card className="overflow-hidden p-5 md:p-6">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr_auto] lg:items-center">
        <div className="rounded-3xl bg-[#07142f] p-6 text-white">
          <div className="flex items-center justify-between">
            <span className="font-black text-primary">{project.title}</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
              Featured
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-3xl font-black">Connect.</h3>
            <h3 className="text-3xl font-black">Collaborate.</h3>
            <h3 className="text-3xl font-black text-secondary">Grow.</h3>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="h-2 w-32 rounded-full bg-white/50" />
              <div className="mt-3 h-2 w-44 rounded-full bg-primary/70" />
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <div className="h-2 w-24 rounded-full bg-white/50" />
              <div className="mt-3 h-2 w-36 rounded-full bg-secondary/70" />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-soft px-4 py-2 text-sm font-bold text-primary">
            <FiStar />
            Featured Project
          </div>

          <h2 className="text-3xl font-black text-dark md:text-4xl">
            {project.title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            {project.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-soft px-4 py-2 text-xs font-bold text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:justify-self-end">
          <Button to={`/projects/${project.slug}`} icon={<FiArrowRight />}>
            View Project
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default FeaturedProjectBanner