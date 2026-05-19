import api from './api'

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile')
    return response.data.data
  },
}