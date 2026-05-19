import { FiRefreshCcw } from 'react-icons/fi'
import { useProfile } from '../../context/ProfileContext'

const ProfileStatus = () => {
  const { profileLoading, profileError, reloadProfile } = useProfile()

  if (profileLoading) {
    return (
      <div className="fixed bottom-5 right-5 z-50 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-primary shadow-lg">
        Loading profile...
      </div>
    )
  }

  if (profileError) {
    return (
      <button
        type="button"
        onClick={reloadProfile}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-red-600 shadow-lg"
      >
        <FiRefreshCcw />
        Retry profile
      </button>
    )
  }

  return null
}

export default ProfileStatus