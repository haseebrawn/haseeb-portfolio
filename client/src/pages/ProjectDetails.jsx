import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { projects as fallbackProjects } from '../data/projects'
import { projectService } from '../services/projectService'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import ProjectDetailHero from '../components/projects/details/ProjectDetailHero'
import ProjectOverviewCards from '../components/projects/details/ProjectOverviewCards'
import ProjectFeaturesTech from '../components/projects/details/ProjectFeaturesTech'
import DevelopmentProcess from '../components/projects/details/DevelopmentProcess'
import ProjectResultsGallery from '../components/projects/details/ProjectResultsGallery'
import ProjectCaseStudyCTA from '../components/projects/details/ProjectCaseStudyCTA'

const ProjectDetails = () => {
  const { slug } = useParams()

  const fallbackProject = fallbackProjects.find((item) => item.slug === slug)

  const [project, setProject] = useState(fallbackProject || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await projectService.getProjectBySlug(slug)
        setProject(data)
      } catch (error) {
        console.error('Project details API error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [slug])

  if (loading && !project) {
    return (
      <section className="section-padding">
        <Container>
          <div className="card-soft p-10 text-center">
            <h1 className="text-3xl font-black text-dark">Loading Project...</h1>
          </div>
        </Container>
      </section>
    )
  }

  if (!project) {
    return (
      <section className="section-padding">
        <Container>
          <div className="card-soft p-10 text-center">
            <h1 className="text-4xl font-black text-dark">Project Not Found</h1>

            <p className="mt-4 text-muted">
              The project you are looking for does not exist or has been removed.
            </p>

            <Button to="/projects" className="mt-8" icon={<FiArrowLeft />}>
              Back to Projects
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectOverviewCards project={project} />
      <ProjectFeaturesTech project={project} />
      <DevelopmentProcess project={project} />
      <ProjectResultsGallery project={project} />
      <ProjectCaseStudyCTA />

      <section className="pb-20">
        <Container>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-soft"
          >
            <FiArrowLeft />
            Back to All Projects
          </Link>
        </Container>
      </section>
    </>
  )
}

export default ProjectDetails