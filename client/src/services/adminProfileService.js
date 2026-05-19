import api from './api'

export const adminProfileService = {
  getProfile: async () => {
    const response = await api.get('/profile')
    return response.data.data
  },

  updateProfile: async (payload) => {
    const response = await api.put('/profile', payload)
    return response.data
  },
}