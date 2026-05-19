import api from './api'

export const experienceService = {
  getExperiences: async () => {
    const response = await api.get('/experiences')
    return response.data.data
  },
}