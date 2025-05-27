<template>
  <div class="activityList">
    <p>Activiteiten</p>
    <ul>
      <li class="activityItem" v-for="(activity, index) in activities" :key="index">
        <ActivityDetail :activity="activity"></ActivityDetail>
      </li>
    </ul>
  </div>
  
</template>

<script setup lang="ts">
import ActivityDetail from './ActivityDetail.vue';
import type { Activity } from '@/models/Activity';

const { activities } = defineProps<{ activities: Activity[] }>()
</script>