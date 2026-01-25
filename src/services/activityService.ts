import axios from 'axios'
import type { Activity } from '@/models/Activity'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 2000,
})

export const activityService = {
  async getAll(): Promise<Activity[]> {
    const response = await api.get<Activity[]>('/Activity')

    return response.data
  },
}
