<template>
  <h2>{{ title }}</h2>
  <p>{{ time }}</p>
  <p v-if="activity.description">{{ activity.description }}</p>
  <p>{{ activity.location }}</p>

</template>

<script setup lang="ts">
import type { Activity } from '@/models/Activity';
import { computed } from 'vue';

const { activity } = defineProps<{ activity: Activity }>();

const titleFormatter = new Intl.DateTimeFormat('nl-BE', {
  month: 'long',
  day: 'numeric',
})
const title = computed(() => {
  const date = new Date(activity.from)
  return `${titleFormatter.format(date)} - ${activity.title}`
})

const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
const time = computed(() => {
  const fromDate = new Date(activity.from)
  const tillDate = new Date(activity.till)
  return `${fromDate.toLocaleTimeString("nl-BE", timeOptions)} - ${tillDate.toLocaleTimeString("nl-BE", timeOptions)}`
})
</script>