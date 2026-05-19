import api from './api'

export const contactService = {
  sendMessage: async (payload) => {
    const response = await api.post('/contact', payload)
    return response.data
  },
}