import Container from '../common/Container'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'
import ScheduleCard from './ScheduleCard'

const ContactMain = () => {
  return (
    <section className="section-padding">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />

          <div className="space-y-8">
            <ContactInfo />
            <ScheduleCard />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ContactMain