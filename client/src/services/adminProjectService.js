import api from './api'

export const adminProjectService = {
  getProjects: async () => {
    const response = await api.get('/admin/projects')
    return response.data.data
  },

  getProjectById: async (id) => {
    const response = await api.get(`/admin/projects/${id}`)
    return response.data.data
  },

  createProject: async (payload) => {
    const response = await api.post('/admin/projects', payload)
    return response.data
  },

  updateProject: async (id, payload) => {
    const response = await api.put(`/admin/projects/${id}`, payload)
    return response.data
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/admin/projects/${id}`)
    return response.data
  },

  toggleFeatured: async (id) => {
    const response = await api.patch(`/admin/projects/${id}/featured`)
    return response.data
  },

  toggleStatus: async (id) => {
    const response = await api.patch(`/admin/projects/${id}/status`)
    return response.data
  },
}