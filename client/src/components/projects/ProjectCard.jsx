import { Link } from 'react-router-dom'
import { FiArrowRight, FiExternalLink, FiFolder } from 'react-icons/fi'
import Card from '../common/Card'

const ProjectCard = ({ project }) => {
  return (
    <Card className="group overflow-hidden" hover>
      <div className="relative h-56 overflow-hidden bg-soft">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center gradient-soft">
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <FiFolder className="mx-auto text-primary" size={42} />
              <p className="mt-3 text-sm font-black text-primary">
                {project.preview || 'Project'}
              </p>
            </div>
          </div>
        )}

        {project.featured && (
          <span className="absolute left-5 top-5 rounded-full bg-primary px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-500/20">
            Featured
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
            {project.category}
          </span>

          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition hover:text-primary"
            >
              <FiExternalLink />
            </a>
          )}
        </div>

        <h3 className="text-2xl font-black text-dark">{project.title}</h3>

        {project.subtitle && (
          <p className="mt-2 text-sm font-bold text-primary">
            {project.subtitle}
          </p>
        )}

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">
          {project.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary"
        >
          View Case Study
          <FiArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  )
}

export default ProjectCard