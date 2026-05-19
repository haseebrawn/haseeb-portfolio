import api from './api'

export const adminExperienceService = {
  getExperiences: async () => {
    const response = await api.get('/admin/experiences')
    return response.data.data
  },

  getExperienceById: async (id) => {
    const response = await api.get(`/admin/experiences/${id}`)
    return response.data.data
  },

  createExperience: async (payload) => {
    const response = await api.post('/admin/experiences', payload)
    return response.data
  },

  updateExperience: async (id, payload) => {
    const response = await api.put(`/admin/experiences/${id}`, payload)
    return response.data
  },

  deleteExperience: async (id) => {
    const response = await api.delete(`/admin/experiences/${id}`)
    return response.data
  },

  toggleStatus: async (id) => {
    const response = await api.patch(`/admin/experiences/${id}/status`)
    return response.data
  },
}