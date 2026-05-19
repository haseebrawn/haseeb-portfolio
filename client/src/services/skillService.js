import api from './api'

export const skillService = {
  getSkills: async () => {
    const response = await api.get('/skills')
    return response.data.data
  },
}