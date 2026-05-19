import api from './api'

export const projectService = {
  getProjects: async () => {
    const response = await api.get('/projects')
    return response.data.data
  },

  getFeaturedProjects: async () => {
    const response = await api.get('/projects/featured')
    return response.data.data
  },

  getProjectBySlug: async (slug) => {
    const response = await api.get(`/projects/${slug}`)
    return response.data.data
  },
}