import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Activity } from '@/models/Activity'
import { activityService } from '@/services/activityService'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref<Activity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchActivities() {
    loading.value = true
    error.value = null
    try {
      activities.value = await activityService.getAll()
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
    fetchActivities,
  }
})
