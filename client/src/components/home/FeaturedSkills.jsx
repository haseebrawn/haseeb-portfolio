import { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import SkillCard from '../skills/SkillCard'
import { skills as fallbackSkills } from '../../data/skills'
import { skillService } from '../../services/skillService'

const FeaturedSkills = () => {
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
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            title="Featured Skills"
            description="Technologies I use to build modern, scalable, and high-performance web applications."
            className="mb-0"
          />

          <Button to="/skills" variant="secondary" icon={<FiArrowRight />}>
            View All Skills
          </Button>
        </div>

        {loading && (
          <p className="mt-8 text-sm font-semibold text-muted">
            Loading skills...
          </p>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.slice(0, 8).map((skill) => (
            <SkillCard key={skill._id || skill.name} skill={skill} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default FeaturedSkills