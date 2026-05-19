import AboutHero from '../components/about/AboutHero'
import MyStory from '../components/about/MyStory'
import JourneyTimeline from '../components/about/JourneyTimeline'
import ExperienceHighlights from '../components/about/ExperienceHighlights'
import ValuesStrengths from '../components/about/ValuesStrengths'
import ToolsTechnologies from '../components/about/ToolsTechnologies'
import HomeCTA from '../components/home/HomeCTA'

const About = () => {
  return (
    <>
      <AboutHero />
      <MyStory />
      <JourneyTimeline />
      <ExperienceHighlights />
      <ValuesStrengths />
      <ToolsTechnologies />
      <HomeCTA />
    </>
  )
}

export default About