import { useEffect, useMemo, useState } from 'react'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'
import FeaturedProjectBanner from './FeaturedProjectBanner'
import { projects as fallbackProjects } from '../../data/projects'
import { projectService } from '../../services/projectService'

const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [projectList, setProjectList] = useState(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getProjects()
        setProjectList(data)
      } catch (error) {
        console.error('Projects API error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectList

    return projectList.filter((project) => project.category === activeFilter)
  }, [activeFilter, projectList])

  const featuredProject = projectList.find((project) => project.featured)

  return (
    <section className="section-padding">
      <Container>
        <SectionTitle
          badge="Portfolio Work"
          title="Selected Full-Stack Projects"
          description="Each project is designed to show real MERN Stack development skills, clean UI implementation, database handling, APIs, and useful business features."
          align="center"
        />

        <FeaturedProjectBanner project={featuredProject} />

        <div className="mt-10 flex justify-center">
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {loading && (
          <p className="mt-8 text-center text-sm font-semibold text-muted">
            Loading projects...
          </p>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id || project.slug} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 rounded-3xl border border-border bg-soft p-10 text-center">
            <h3 className="text-2xl font-black text-dark">No projects found</h3>
            <p className="mt-3 text-muted">
              No projects are available in this category yet.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}

export default ProjectsGrid