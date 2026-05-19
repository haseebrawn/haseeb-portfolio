import api from './api'

export const adminUploadService = {
  uploadSingle: async (file, folder = 'general') => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.post(
      `/admin/uploads/single?folder=${folder}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  },

  uploadMultiple: async (files, folder = 'general') => {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('images', file)
    })

    const response = await api.post(
      `/admin/uploads/multiple?folder=${folder}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  },
}