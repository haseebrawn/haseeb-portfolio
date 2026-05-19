import { FiCalendar, FiClock } from 'react-icons/fi'
import Card from '../common/Card'
import Button from '../common/Button'

const ScheduleCard = () => {
  return (
    <Card className="p-6 md:p-8">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
        <FiCalendar size={24} />
      </div>

      <h2 className="text-2xl font-black text-dark">Schedule a Call</h2>

      <p className="mt-3 text-sm leading-7 text-muted">
        Book a quick call to discuss your project requirements and how I can help.
      </p>

      <div className="mt-5 rounded-2xl border border-border bg-soft p-4">
        <div className="flex items-center gap-3">
          <FiClock className="text-primary" />
          <div>
            <p className="font-bold text-dark">Available Time</p>
            <p className="text-sm text-muted">Monday to Saturday</p>
          </div>
        </div>
      </div>

      <Button href="#" variant="secondary" className="mt-6 w-full" icon={<FiCalendar />}>
        Book a Meeting
      </Button>
    </Card>
  )
}

export default ScheduleCard