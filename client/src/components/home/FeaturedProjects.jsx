import { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import ProjectCard from '../projects/ProjectCard'
import { projects as fallbackProjects } from '../../data/projects'
import { projectService } from '../../services/projectService'

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState(
    fallbackProjects.filter((project) => project.featured)
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getFeaturedProjects()
        setFeaturedProjects(data)
      } catch (error) {
        console.error('Featured projects API error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <section className="section-padding bg-soft">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            title="Featured Projects"
            description="A selection of my recent work showcasing modern web applications, dashboards, and full-stack solutions."
            className="mb-0"
          />

          <Button to="/projects" variant="secondary" icon={<FiArrowRight />}>
            View All Projects
          </Button>
        </div>

        {loading && (
          <p className="mt-8 text-sm font-semibold text-muted">
            Loading featured projects...
          </p>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProjects