import HeroSection from '../components/home/HeroSection'
import StatsStrip from '../components/home/StatsStrip'
import FeaturedSkills from '../components/home/FeaturedSkills'
import FeaturedProjects from '../components/home/FeaturedProjects'
import AboutPreview from '../components/home/AboutPreview'
import HomeCTA from '../components/home/HomeCTA'

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <FeaturedSkills />
      <FeaturedProjects />
      <AboutPreview />
      <HomeCTA />
    </>
  )
}

export default Home