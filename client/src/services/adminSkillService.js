import api from './api'

export const adminSkillService = {
  getSkills: async () => {
    const response = await api.get('/admin/skills')
    return response.data.data
  },

  createSkill: async (payload) => {
    const response = await api.post('/admin/skills', payload)
    return response.data
  },

  updateSkill: async (id, payload) => {
    const response = await api.put(`/admin/skills/${id}`, payload)
    return response.data
  },

  deleteSkill: async (id) => {
    const response = await api.delete(`/admin/skills/${id}`)
    return response.data
  },

  toggleStatus: async (id) => {
    const response = await api.patch(`/admin/skills/${id}/status`)
    return response.data
  },
}