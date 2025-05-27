<template>
  <main>
    <div>
      <h1>Kalender TTC Troelant</h1>
      <div class="flex-container">
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
import { ActivityCategory, type Activity } from './models/Activity';

const date = ref(new Date())
const filteredActivities = computed(() => activities.filter(activity => {
  return activity.from.getFullYear() == date.value.getFullYear() &&
    activity.from.getMonth() == date.value.getMonth()
}))

function UpdateDate(newYear: number, newMonth: number) {
  date.value = new Date(newYear, newMonth)
}

const activities: Activity[] = [
  {
    title: "Troelant A / Nova B",
    from: new Date(2025, 4, 19, 20, 0, 0),
    till: new Date(2025, 4, 19, 23, 0, 0),
    category: ActivityCategory.APLOEG,
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Troelant B / St-Niklase B",
    from: new Date(2025, 4, 22, 20, 0, 0),
    till: new Date(2025, 4, 22, 23, 0, 0),
    category: ActivityCategory.BPLOEG,
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "St-Niklase A / Troelant A",
    from: new Date(2025, 4, 26, 20, 0, 0),
    till: new Date(2025, 4, 26, 23, 0, 0),
    category: ActivityCategory.APLOEG,
    location: 'Brandweerkazerne, Nijverheidsstraat 29, 9100 Sint-Niklaas',
  },
  {
    title: "Troelant C / Orix C",
    from: new Date(2025, 4, 27, 20, 0, 0),
    till: new Date(2025, 4, 27, 23, 0, 0),
    category: ActivityCategory.CPLOEG,
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Zaal niet beschikbaar",
    from: new Date(2025, 4, 26, 20, 0, 0),
    till: new Date(2025, 4, 26, 23, 0, 0),
    category: ActivityCategory.ONBESCHIKBAAR,
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Initiatie psychologische hervorming",
    from: new Date(2025, 5, 5, 19, 30, 0),
    till: new Date(2025, 5, 5, 23, 0, 0),
    category: ActivityCategory.ALGEMEEN,
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Dubbel Clubkampioenschap",
    from: new Date(2025, 5, 5, 19, 30, 0),
    till: new Date(2025, 5, 5, 23, 0, 0),
    category: ActivityCategory.ALGEMEEN,
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Initiatie TTC Troelant",
    from: new Date(2025, 5, 12, 19, 30, 0),
    till: new Date(2025, 5, 12, 23, 0, 0),
    category: ActivityCategory.ALGEMEEN,
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
]

console.log(activities);

</script>
