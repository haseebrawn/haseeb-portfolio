import { FiCode, FiDatabase, FiServer } from 'react-icons/fi'
import { useProfile } from '../../context/ProfileContext'

const AvatarIllustration = () => {
  const { profile } = useProfile()

  if (profile.avatar) {
    return (
      <div className="relative mx-auto max-w-md">
        <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-blue-200 blur-2xl" />
        <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-full bg-cyan-200 blur-2xl" />

        <div className="relative rounded-[36px] border border-border bg-white p-5 shadow-2xl shadow-blue-500/10">
          <div className="overflow-hidden rounded-[28px] bg-soft">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    )
  }

  const initials = profile.name
    ?.split(' ')
    .map((item) => item[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'MH'

  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-blue-200 blur-2xl" />
      <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-full bg-cyan-200 blur-2xl" />

      <div className="relative rounded-[36px] border border-border bg-white p-6 shadow-2xl shadow-blue-500/10">
        <div className="rounded-[30px] gradient-blue p-8 text-white">
          <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-white/15 text-5xl font-black">
            {initials}
          </div>

          <h3 className="mt-8 text-3xl font-black">{profile.name}</h3>
          <p className="mt-2 text-white/75">{profile.role}</p>

          <div className="mt-8 grid gap-4">
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
              <FiCode size={24} />
              <span className="font-bold">Frontend Development</span>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
              <FiServer size={24} />
              <span className="font-bold">Backend APIs</span>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
              <FiDatabase size={24} />
              <span className="font-bold">MongoDB Database</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarIllustration