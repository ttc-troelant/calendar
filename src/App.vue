<template>
  <!-- <ImportActivities/> -->
  <main>
    <div>
      <h1>Kalender TTC Troelant</h1>
      <div class="flex-container calendar-container">
        <CalendarComponent :activities="filteredActivities" @change-month="UpdateDate"></CalendarComponent>
        <ActivityOverview :activities="filteredActivities"></ActivityOverview>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import CalendarComponent from './components/CalendarComponent.vue'
import ActivityOverview from './components/ActivityOverview.vue';
import { useActivityStore } from './stores/activityStore';

const activityStore = useActivityStore()
const date = ref(new Date())

const filteredActivities = computed(() => activityStore.activities.filter(activity => {
  return new Date(activity.from).getFullYear() == date.value.getFullYear() &&
    new Date(activity.from).getMonth() == date.value.getMonth()
}).sort((a, b) => new Date(a.from).getTime() - new Date(b.from).getTime())
)

function UpdateDate(newYear: number, newMonth: number) {
  date.value = new Date(newYear, newMonth)
}

onMounted(() => {
  activityStore.fetchActivities()
})
</script>
