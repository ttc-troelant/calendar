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

const titleOptions: Intl.DateTimeFormatOptions  = { month: 'long', day: 'numeric' };
const title = computed(() => `${activity.from.toLocaleDateString("nl-BE", titleOptions)} - ${activity.title}`)

const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit'}
const time = computed(() => `${activity.from.toLocaleTimeString("nl-BE", timeOptions)} - ${activity.till.toLocaleTimeString("nl-BE", timeOptions)}`)
</script>