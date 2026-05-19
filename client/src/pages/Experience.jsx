import { useEffect, useState } from 'react'
import ExperienceHero from '../components/experience/ExperienceHero'
import ExperienceTimeline from '../components/experience/ExperienceTimeline'
import ExperienceCTA from '../components/experience/ExperienceCTA'
import { experienceService } from '../services/experienceService'
import { fallbackExperiences } from '../data/experience'

const Experience = () => {
  const [experiences, setExperiences] = useState(fallbackExperiences)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true)

        const data = await experienceService.getExperiences()

        if (data.length > 0) {
          setExperiences(data)
        }
      } catch (error) {
        console.error('Experience API error:', error.message)
        setExperiences(fallbackExperiences)
      } finally {
        setLoading(false)
      }
    }

    loadExperiences()
  }, [])

  return (
    <>
      <ExperienceHero />
      <ExperienceTimeline experiences={experiences} loading={loading} />
      <ExperienceCTA />
    </>
  )
}

export default Experience