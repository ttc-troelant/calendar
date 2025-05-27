<template>
  <main>
    <div class="flex-container">
      <CalendarComponent></CalendarComponent>
      <ActivityOverview :activities="activities"></ActivityOverview>
    </div>
  </main>
</template>

<script setup lang="ts">
import CalendarComponent from './components/CalendarComponent.vue'
import ActivityOverview from './components/ActivityOverview.vue';
import { ActivityCategories, type Activity } from './models/Activity';

const activities: Activity[] = [
  {
    title: "Troelant A / Nova B",
    from: new Date(2025, 4, 19, 20, 0, 0),
    till: new Date(2025, 4, 19, 23, 0, 0),
    categories: [ActivityCategories.APLOEG],
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Troelant B / St-Niklase B",
    from: new Date(2025, 4, 22, 20, 0, 0),
    till: new Date(2025, 4, 22, 23, 0, 0),
    categories: [ActivityCategories.BPLOEG],
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Troelant C / Orix C",
    from: new Date(2025, 4, 26, 20, 0, 0),
    till: new Date(2025, 4, 26, 23, 0, 0),
    categories: [ActivityCategories.CPLOEG],
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Initiatie psychologische hervorming",
    from: new Date(2025, 5, 5, 19, 30, 0),
    till: new Date(2025, 5, 5, 23, 0, 0),
    categories: [ActivityCategories.ALGEMEEN],
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Dubbel Clubkampioenschap",
    from: new Date(2025, 5, 5, 19, 30, 0),
    till: new Date(2025, 5, 5, 23, 0, 0),
    categories: [ActivityCategories.ALGEMEEN],
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Initiatie TTC Troelant",
    from: new Date(2025, 5, 12, 19, 30, 0),
    till: new Date(2025, 5, 12, 23, 0, 0),
    categories: [ActivityCategories.ALGEMEEN],
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
  {
    title: "Initiatie TTC Troelant",
    from: new Date(2025, 5, 12, 19, 30, 0),
    till: new Date(2025, 5, 12, 23, 0, 0),
    categories: [ActivityCategories.ALGEMEEN],
    location: 'Jeugdhuis Troelant, Vleeshouwersstraat 4c, 9112 Sinaai',
  },
]

console.log(activities);

</script>
