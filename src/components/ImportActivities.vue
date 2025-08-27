<template>
  <input type="file" id="file-upload" accept="text/calendar" hidden @change="handleFileUpload" />
  <label for="file-upload">Importeer ICS</label>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ICAL from 'ical.js'
import { GetCategoryFromDescription } from '@/helpers/EventParser'
import type { Activity } from '@/models/Activity'

const fileContent = ref<string | null>(null)

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    fileContent.value = reader.result as string
    const jcalData = ICAL.parse(fileContent.value)
    const comp = new ICAL.Component(jcalData)

    const activities: Activity[] = comp.getAllSubcomponents("vevent")
      .map(iEvent => {
        const event = new ICAL.Event(iEvent)

        try {
          const from = event.startDate.toJSDate()
          const till = event.endDate.toJSDate()

          from.setMinutes(from.getMinutes() - from.getTimezoneOffset())
          till.setMinutes(till.getMinutes() - till.getTimezoneOffset())

          // If start or end is invalid, skip
          if (isNaN(from.getTime()) || isNaN(till.getTime()))
            return null

          const title = event.summary || ""
          const description = event.description || undefined
          const location = event.location || undefined
          const category = GetCategoryFromDescription(description || title)

          // skip Vrij games
          if (title.toLowerCase().includes("vrij") || description?.toLowerCase().includes("vrij"))
            return null

          const activity: Activity = { title, description, from, till, category, location }
          return activity
        } catch {
          return null
        }
      })
      .filter((activity): activity is Activity => activity !== null) // ✅ works now

    console.log('Activities:', activities)
  }

  reader.readAsText(file)
}

</script>