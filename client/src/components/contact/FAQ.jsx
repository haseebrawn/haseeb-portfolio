import { useState } from 'react'
import { FiChevronDown, FiHelpCircle, FiMessageCircle } from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

const faqs = [
  {
    question: 'What types of projects do you work on?',
    answer:
      'I work on MERN Stack web applications, dashboards, admin panels, ecommerce features, authentication systems, REST APIs, and database-driven platforms.',
  },
  {
    question: 'What is your typical project timeline?',
    answer:
      'Timeline depends on the project size. A simple portfolio or dashboard can take a few days, while a complete full-stack application may take multiple weeks.',
  },
  {
    question: 'How do you handle project communication?',
    answer:
      'I prefer clear requirements, regular updates, milestone-based progress, and proper testing before final delivery.',
  },
  {
    question: 'Can you build both frontend and backend?',
    answer:
      'Yes. I can work on React frontend, Node.js/Express backend, MongoDB database, API integration, authentication, and deployment-ready project structure.',
  },
]

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="section-padding bg-soft">
      <Container>
        <SectionTitle
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Quick answers about my work process, project types, and communication."
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr]">
          <Card className="p-6 md:p-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index

                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-border bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    >
                      <span className="font-black text-dark">{faq.question}</span>

                      <FiChevronDown
                        className={`shrink-0 text-primary transition ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-border px-5 pb-5 pt-4">
                        <p className="text-sm leading-7 text-muted">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>

          <Card className="gradient-soft flex flex-col justify-center p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl gradient-blue text-white shadow-lg shadow-blue-500/20">
              <FiMessageCircle size={32} />
            </div>

            <h3 className="mt-6 text-2xl font-black text-dark">
              Still have questions?
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted">
              Send your project details through the contact form and I’ll reply with
              the next best step.
            </p>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary">
                <FiHelpCircle />
                Happy to help
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}

export default FAQ