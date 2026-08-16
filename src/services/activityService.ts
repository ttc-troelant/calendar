import axios from 'axios'
import type { Activity, ActivityMonthRequest } from '@/models/Activity'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 2000,
})



export const activityService = {
  async getByMonth(year: number, month: number, withAdjacent = true): Promise<Activity[]> {
    // JavaScript Date uses 0-based months, while .NET DateTimeOffset uses 1-based months.
    const normalizedMonth = month + 1

    const response = await api.post<Activity[]>(`/Activity/month?withAdjacent=${withAdjacent}`, {
      year,
      month: normalizedMonth,
    } satisfies ActivityMonthRequest)

    return response.data
  },
}
