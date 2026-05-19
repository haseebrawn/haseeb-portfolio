import api from './api'

export const adminDashboardService = {
  getStats: async () => {
    const response = await api.get('/admin/dashboard/stats')
    return response.data.data
  },
}