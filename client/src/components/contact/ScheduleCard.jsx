import { useEffect, useMemo, useState } from 'react'
import { FiCalendar, FiCheckCircle, FiClock } from 'react-icons/fi'
import Card from '../common/Card'
import Button from '../common/Button'
import { useProfile } from '../../context/ProfileContext'

const bookingUrl = import.meta.env.VITE_BOOKING_URL
const timeZone = 'Asia/Karachi'

const getPakistanDateParts = (date) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date)

  return {
    weekday: parts.find((part) => part.type === 'weekday')?.value || '',
    hour: Number(parts.find((part) => part.type === 'hour')?.value || 0),
  }
}

const getGmailMeetingUrl = (email) => {
  const subject = 'Meeting Request'
  const body = 'Hi Muhammad Haseeb, I would like to book a quick meeting to discuss a project.'

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const ScheduleCard = () => {
  const { profile } = useProfile()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 30000)

    return () => window.clearInterval(timer)
  }, [])

  const localTime = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone,
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now),
    [now]
  )

  const availability = useMemo(() => {
    const { weekday, hour } = getPakistanDateParts(now)
    const isWorkingDay = weekday !== 'Sunday'
    const isAvailableNow = isWorkingDay && hour >= 10 && hour < 20

    return {
      isAvailableNow,
      label: isAvailableNow ? 'Available now' : 'Next available: Mon - Sat, 10 AM - 8 PM',
    }
  }, [now])

  const meetingUrl =
    bookingUrl ||
    getGmailMeetingUrl(profile.email || 'hello@muhammadhaseeb.dev')

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
            <p className="text-sm text-muted">Monday to Saturday, 10 AM - 8 PM PKT</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-white p-4">
        <div className="flex items-center gap-3">
          <FiCheckCircle
            className={availability.isAvailableNow ? 'text-green-600' : 'text-primary'}
          />
          <div>
            <p className="font-bold text-dark">{availability.label}</p>
            <p className="text-sm text-muted">Pakistan time: {localTime}</p>
          </div>
        </div>
      </div>

      <Button href={meetingUrl} variant="secondary" className="mt-6 w-full" icon={<FiCalendar />}>
        Book a Meeting
      </Button>
    </Card>
  )
}

export default ScheduleCard
