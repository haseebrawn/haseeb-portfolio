import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { profile as fallbackProfile } from '../data/profile'
import { profileService } from '../services/profileService'

const ProfileContext = createContext(null)

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(fallbackProfile)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState('')

  const loadProfile = async () => {
    try {
      setProfileLoading(true)
      setProfileError('')

      const data = await profileService.getProfile()

      setProfile({
        ...fallbackProfile,
        ...data,
        socials: {
          ...fallbackProfile.socials,
          ...data.socials,
        },
      })
    } catch (error) {
      console.error('Profile API error:', error.message)
      setProfileError('Unable to load latest profile data.')
      setProfile(fallbackProfile)
    } finally {
      setProfileLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const value = useMemo(
    () => ({
      profile,
      profileLoading,
      profileError,
      reloadProfile: loadProfile,
    }),
    [profile, profileLoading, profileError]
  )

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error('useProfile must be used inside ProfileProvider')
  }

  return context
}