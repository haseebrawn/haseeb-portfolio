import api from './api'

export const adminAuthService = {
  login: async (payload) => {
    const response = await api.post('/admin/auth/login', payload)
    return response.data
  },

  getMe: async () => {
    const response = await api.get('/admin/auth/me')
    return response.data
  },

  logout: async () => {
    const response = await api.post('/admin/auth/logout')
    return response.data
  },
}