import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Activity } from '@/models/Activity'
import { activityService } from '@/services/activityService'

const monthKey = (year: number, month: number) => `${year}-${String(month).padStart(2, '0')}`

const getMonthWindow = (year: number, month: number, withAdjacent: boolean) => {
  const windowMonths = [{ year, month }]

  if (withAdjacent) {
    const previousMonth = new Date(year, month - 1, 1)
    const nextMonth = new Date(year, month + 1, 1)

    windowMonths.push({
      year: previousMonth.getFullYear(),
      month: previousMonth.getMonth(),
    })
    windowMonths.push({
      year: nextMonth.getFullYear(),
      month: nextMonth.getMonth(),
    })
  }

  return new Set(
    windowMonths.map(({ year: monthYear, month: monthValue }) => monthKey(monthYear, monthValue)),
  )
}

const getActivityMonthKey = (activity: Activity) => {
  const activityDate = new Date(activity.from)
  return monthKey(activityDate.getFullYear(), activityDate.getMonth())
}

export const useActivityStore = defineStore('activity', () => {
  const activities = ref<Activity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedMonth = ref<{ year: number; month: number } | null>(null)

  async function fetchActivities(
    year = new Date().getFullYear(),
    month = new Date().getMonth(),
    withAdjacent = true,
  ) {
    loading.value = true
    error.value = null
    selectedMonth.value = { year, month }

    try {
      const nextActivities = await activityService.getByMonth(year, month, withAdjacent)
      const activeWindowKeys = getMonthWindow(year, month, withAdjacent)
      const nextActivityIds = new Set(nextActivities.map((activity) => activity.id))

      const mergedActivities = [...activities.value]

      for (const activity of nextActivities) {
        const existingIndex = mergedActivities.findIndex((item) => item.id === activity.id)

        if (existingIndex >= 0) {
          const existingActivity = mergedActivities[existingIndex]

          if (JSON.stringify(existingActivity) !== JSON.stringify(activity)) {
            mergedActivities[existingIndex] = activity
          }

          continue
        }

        mergedActivities.push(activity)
      }

      const reconciledActivities = mergedActivities.filter((activity) => {
        const activityMonthKey = getActivityMonthKey(activity)

        if (!activeWindowKeys.has(activityMonthKey)) {
          return true
        }

        return nextActivityIds.has(activity.id)
      })

      activities.value = reconciledActivities
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch activities'
      console.error('Failed to fetch activities:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    activities,
    loading,
    error,
    selectedMonth,
    fetchActivities,
  }
})
