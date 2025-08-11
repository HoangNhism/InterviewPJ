import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const taskApi = {
  getAllTasks: async () => {
    const response = await api.get('/tasks')
    return response.data
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData)
    return response.data
  },

  updateTask: async (id, updateData) => {
    const response = await api.put(`/tasks/${id}`, updateData)
    return response.data
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  },
}

export default api
