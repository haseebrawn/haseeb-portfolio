import { useEffect, useState } from 'react'
import Container from '../common/Container'
import SkillCategory from './SkillCategory'
import { skills as fallbackSkills } from '../../data/skills'
import { skillService } from '../../services/skillService'

const categories = [
  {
    name: 'Frontend',
    title: 'Frontend Development',
    description:
      'Skills I use to create clean, responsive, and user-friendly web interfaces.',
  },
  {
    name: 'Backend',
    title: 'Backend Development',
    description:
      'Skills I use to build APIs, authentication systems, backend logic, and server-side features.',
  },
  {
    name: 'Database',
    title: 'Database Development',
    description:
      'Skills I use to structure, store, query, and manage application data.',
  },
  {
    name: 'Tools',
    title: 'Development Tools',
    description:
      'Tools I use for coding, API testing, version control, and project development.',
  },
  {
    name: 'Deployment',
    title: 'Deployment Skills',
    description:
      'Basic deployment tools I use to host and publish frontend applications.',
  },
]

const SkillsCategories = () => {
  const [skills, setSkills] = useState(fallbackSkills)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await skillService.getSkills()
        setSkills(data)
      } catch (error) {
        console.error('Skills API error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])

  return (
    <section className="section-padding">
      <Container>
        {loading && (
          <p className="mb-8 text-sm font-semibold text-muted">
            Loading skills...
          </p>
        )}

        {categories.map((category) => (
          <SkillCategory
            key={category.name}
            title={category.title}
            description={category.description}
            skills={skills.filter((skill) => skill.category === category.name)}
          />
        ))}
      </Container>
    </section>
  )
}

export default SkillsCategories