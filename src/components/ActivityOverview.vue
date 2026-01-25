<template>
  <div class="activityList">
    <p>Aankomende Activiteiten</p>
    <ul>
      <li class="activityItem" :class="getActivityCategoryClass(activity.category)"
        v-for="(activity, index) in activitiesAfterToday" :key="index">
        <ActivityDetail :activity="activity"></ActivityDetail>
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import ActivityDetail from './ActivityDetail.vue';
import { ActivityCategory, type Activity } from '@/models/Activity';

const { activities } = defineProps<{ activities: Activity[] }>()

// TODO: Improve to take into full date
const activitiesAfterToday = computed(() => activities.filter((activity) => new Date(activity.from).getTime() >= new Date().getTime()))

function getActivityCategoryClass(category: ActivityCategory) {
  switch (category) {
    case ActivityCategory.APLOEG:
      return 'a-ploeg-listItem'
    case ActivityCategory.BPLOEG:
      return 'b-ploeg-listItem'
    case ActivityCategory.CPLOEG:
      return 'c-ploeg-listItem'
    case ActivityCategory.MASTER:
      return 'master-listItem'
    case ActivityCategory.BEKER:
      return 'beker-listItem'
    case ActivityCategory.DPLOEG:
      return 'd-ploeg-listItem'
    case ActivityCategory.ALGEMEEN:
      return 'algemeen-listItem'
    default:
      return ''
  }
}
</script>