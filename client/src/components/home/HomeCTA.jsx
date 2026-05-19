import { FiArrowRight, FiMail } from 'react-icons/fi'
import Container from '../common/Container'
import Button from '../common/Button'
import { useProfile } from '../../context/ProfileContext'

const HomeCTA = () => {
  const { profile } = useProfile()

  return (
    <section className="section-padding">
      <Container>
        <div className="rounded-[32px] gradient-blue p-8 text-white shadow-2xl shadow-blue-500/20 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-black md:text-5xl">
                Need a {profile.role}?
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                Let’s discuss your project and build a clean, responsive, and
                scalable web application with modern MERN Stack technologies.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button to="/contact" variant="secondary" icon={<FiMail />}>
                Contact Me
              </Button>

              <Button
                to="/projects"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                icon={<FiArrowRight />}
              >
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HomeCTA