import { FiBriefcase, FiCheckCircle, FiExternalLink } from 'react-icons/fi'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

const formatDate = (date) => {
  if (!date) return 'Present'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

const ExperienceCard = ({ experience, highlighted = false }) => {
  return (
    <Card
      className={`p-6 md:p-8 ${
        highlighted ? 'border-primary shadow-xl shadow-blue-500/10' : ''
      }`}
      hover
    >
      <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
        <div>
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-3xl ${
              highlighted
                ? 'gradient-blue text-white'
                : 'bg-soft text-primary'
            }`}
          >
            <FiBriefcase size={28} />
          </div>

          <p className="mt-5 text-sm font-bold text-primary">
            {formatDate(experience.startDate)} -{' '}
            {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {experience.isCurrent && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                Current Role
              </span>
            )}

            <span className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
              {experience.employmentType}
            </span>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h2 className="text-3xl font-black text-dark">
                {experience.title}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-lg font-bold text-primary">
                  {experience.company}
                </p>

                {experience.companyUrl && experience.companyUrl !== '#' && (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary transition hover:text-primary-dark"
                  >
                    <FiExternalLink />
                  </a>
                )}
              </div>

              {experience.location && (
                <p className="mt-2 text-sm font-semibold text-muted">
                  {experience.location}
                </p>
              )}
            </div>
          </div>

          <p className="mt-5 text-base leading-8 text-muted">
            {experience.description}
          </p>

          {experience.responsibilities?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-black text-dark">
                Responsibilities
              </h3>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {experience.responsibilities.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-primary" />
                    <p className="text-sm leading-7 text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {experience.techStack?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-black text-dark">
                Technologies Used
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {experience.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-soft px-4 py-2 text-sm font-bold text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {experience.achievements?.length > 0 && (
            <div className="mt-8 rounded-3xl bg-soft p-6">
              <h3 className="text-lg font-black text-dark">Key Highlights</h3>

              <div className="mt-4 space-y-3">
                {experience.achievements.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm leading-7 text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

const ExperienceTimeline = ({ experiences = [], loading = false }) => {
  const currentExperiences = experiences.filter(
    (experience) => experience.isCurrent
  )

  const previousExperiences = experiences.filter(
    (experience) => !experience.isCurrent
  )

  return (
    <section className="section-padding">
      <Container>
        <SectionTitle
          badge="Career Timeline"
          title="Professional experience as a software engineer"
          description="My current role is highlighted first, followed by previous experience added from the admin dashboard."
          align="center"
        />

        {loading ? (
          <div className="mt-12 space-y-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-[28px] bg-soft"
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 space-y-12">
            {currentExperiences.length > 0 && (
              <div>
                <div className="space-y-8">
                  {currentExperiences.map((experience) => (
                    <ExperienceCard
                      key={experience._id}
                      experience={experience}
                      highlighted
                    />
                  ))}
                </div>
              </div>
            )}

            {previousExperiences.length > 0 && (
              <div>

                <div className="space-y-8">
                  {previousExperiences.map((experience) => (
                    <ExperienceCard
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </div>
              </div>
            )}

            {currentExperiences.length === 0 &&
              previousExperiences.length === 0 && (
                <div className="rounded-[28px] bg-soft p-10 text-center">
                  <FiBriefcase className="mx-auto text-primary" size={44} />

                  <h2 className="mt-5 text-2xl font-black text-dark">
                    No active experience found
                  </h2>

                  <p className="mt-2 text-muted">
                    Add or activate experience from the admin dashboard.
                  </p>
                </div>
              )}
          </div>
        )}
      </Container>
    </section>
  )
}

export default ExperienceTimeline