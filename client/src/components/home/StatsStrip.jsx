import Container from '../common/Container'
import Card from '../common/Card'
import { useProfile } from '../../context/ProfileContext'

const StatsStrip = () => {
  const { profile } = useProfile()

  const stats = [
    {
      value: profile.experience || '2+ Years',
      label: 'Development Experience',
    },
    {
      value: '15+',
      label: 'Technical Skills',
    },
    {
      value: '7+',
      label: 'Portfolio Projects',
    },
    {
      value: '100%',
      label: 'Responsive UI Focus',
    },
  ]

  return (
    <section className="-mt-8 relative z-10">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.label} className="p-6 text-center" hover>
              <h3 className="text-4xl font-black text-primary">
                {item.value}
              </h3>

              <p className="mt-2 text-sm font-semibold text-muted">
                {item.label}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default StatsStrip