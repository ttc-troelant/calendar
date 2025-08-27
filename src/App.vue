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
import { computed, ref } from 'vue';
import CalendarComponent from './components/CalendarComponent.vue'
import ActivityOverview from './components/ActivityOverview.vue';
import { type Activity } from './models/Activity';
// import ImportActivities from './components/ImportActivities.vue';

// Temp import
import aploegMatches from '@/assets/data/aploeg.json'
import bploegMatches from '@/assets/data/bploeg.json'
import cploegMatches from '@/assets/data/cploeg.json'
import algemeen from '@/assets/data/algemeen.json'

const date = ref(new Date())
const filteredActivities = computed(() => activities.filter(activity => {
  return activity.from.getFullYear() == date.value.getFullYear() &&
    activity.from.getMonth() == date.value.getMonth()
}).sort((a, b) => a.from.getTime() - b.from.getTime())
)

function UpdateDate(newYear: number, newMonth: number) {
  date.value = new Date(newYear, newMonth)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reviveActivities(data: any[]): Activity[] {
  return data.map(item => ({
    ...item,
    from: parseWallClockDate(item.from),
    till: parseWallClockDate(item.till)
  }))
}

function parseWallClockDate(dateStr: string) {
  const [datePart, timePart] = dateStr.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute, second] = timePart.split(':').map(Number)
  return new Date(year, month - 1, day, hour, minute, second || 0)
}

const activitiesA: Activity[] = reviveActivities(aploegMatches)
const activitiesB: Activity[] = reviveActivities(bploegMatches)
const activitiesC: Activity[] = reviveActivities(cploegMatches)
const algemeneActiviteiten: Activity[] = reviveActivities(algemeen)

const activities: Activity[] = [
  ...activitiesA,
  ...activitiesB,
  ...activitiesC,
  ...algemeneActiviteiten
]

console.log(activities);

</script>
