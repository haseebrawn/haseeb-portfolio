import Container from './Container'
import Badge from './Badge'

const PageHero = ({ badge, title, subtitle, description, children }) => {
  return (
    <section className="gradient-soft border-b border-border py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            {badge && <Badge>{badge}</Badge>}

            <h1 className="mt-6 text-4xl font-black tracking-tight text-dark md:text-6xl">
              {title}
            </h1>

            {subtitle && (
              <h2 className="mt-4 text-2xl font-bold text-primary md:text-3xl">
                {subtitle}
              </h2>
            )}

            {description && (
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                {description}
              </p>
            )}
          </div>

          {children && <div>{children}</div>}
        </div>
      </Container>
    </section>
  )
}

export default PageHero