import api from './api'

export const adminMessageService = {
  getMessages: async () => {
    const response = await api.get('/admin/messages')
    return response.data.data
  },

  getMessageById: async (id) => {
    const response = await api.get(`/admin/messages/${id}`)
    return response.data.data
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/admin/messages/${id}/status`, {
      status,
    })
    return response.data
  },

  deleteMessage: async (id) => {
    const response = await api.delete(`/admin/messages/${id}`)
    return response.data
  },
}