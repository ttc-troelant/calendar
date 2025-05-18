<template>
  <ul class="activityList">
    <li v-for="activity in activities" :key="activity.title">
      <ActivityDetail :activity="activity"></ActivityDetail>
    </li>
  </ul>
</template>

<script setup lang="ts">
import ActivityDetail from './ActivityDetail.vue';
import type { Activity } from '@/models/Activity';

const { activities } = defineProps<{ activities: Activity[] }>()
</script>