<template>
  <div class="wrapper">
    <header>
      <p class="current-date">{{ months[currMonth] }} {{ currYear }}</p>
      <div class="icons">
        <button id="currentMonth" @click="GoToCurrentMonth">
          <CalendarTodayIcon></CalendarTodayIcon>
        </button>
        <button>
          <CalendarImportIcon></CalendarImportIcon>
        </button>
        <button class="mr-auto">
          <CalendarExportIcon></CalendarExportIcon>
        </button>
        <button ref="prev" id="prev" @click="DecreaseMonth">&#60;</button>
        <button ref="next" id="next" @click="IncrementMonth">&#62;</button>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Ma</li>
        <li>Di</li>
        <li>Wo</li>
        <li>Do</li>
        <li>Vr</li>
        <li>Za</li>
        <li>Zo</li>
      </ul>
      <ul class="days">
        <template v-for="day in lastMonthDays" :key="day">
          <li class="inactive">{{ day }}</li>
        </template>
        <template v-for="day in lastDateOfMonth" :key="day">
          <li :class="{ active: isToday(day), 'unavailable': isAvailable(day) }">
            {{ day }}
            <div v-if="getActivityCategoriesForDay(day).length" class="calendarActivityPreview">
              <template v-for="category in getActivityCategoriesForDay(day)" :key="category">
                <div :class="getActivityCategoryClass(category)"></div>
              </template>
            </div>
          </li>
        </template>
        <template v-for="day in nextMonthDays" :key="day">
          <li class="inactive">{{ day }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActivityCategory, type Activity } from '@/models/Activity';
import { ref, computed } from 'vue'
import CalendarTodayIcon from './icons/CalendarTodayIcon.vue';
import CalendarImportIcon from './icons/CalendarImportIcon.vue';
import CalendarExportIcon from './icons/CalendarExportIcon.vue';

const emit = defineEmits<{
  changeMonth: [currYear: number, currMonth: number]
}>();

// getting new date, current year and month
const date = ref(new Date())
const currYear = ref(date.value.getFullYear())
const currMonth = ref(date.value.getMonth())

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const firstDayOfMonth = computed(() => new Date(currYear.value, currMonth.value, 0).getDay()) // getting first day of month
const lastDateOfMonth = computed(() => new Date(currYear.value, currMonth.value + 1, 0).getDate()) // getting last date of month
const lastDayOfMonth = computed(() => new Date(currYear.value, currMonth.value, lastDateOfMonth.value).getDay()) // getting last day of month
const lastDateOfLastMonth = computed(() => new Date(currYear.value, currMonth.value, 0).getDate()) // getting last date of previous month


const lastMonthDays = computed(() => {
  return Array.from({ length: firstDayOfMonth.value }, (_, index) => lastDateOfLastMonth.value - firstDayOfMonth.value + index + 1)
})

const nextMonthDays = computed(() => {
  const days = []
  for (let i = lastDayOfMonth.value; i <= 6; i++) {
    days.push(i - lastDayOfMonth.value + 1)
  }

  return days
})

const isToday = (day: number) => day === date.value.getDate() && currMonth.value === new Date().getMonth() && currYear.value === new Date().getFullYear()

function DecreaseMonth() {
  currMonth.value = currMonth.value - 1

  if (currMonth.value < 0) {
    // creating a new date of current year & month and pass it as date value
    date.value = new Date(currYear.value, currMonth.value, new Date().getDate());
    currYear.value = date.value.getFullYear(); // updating current year with new date year
    currMonth.value = date.value.getMonth(); // updating current month with new date month
  } else {
    date.value = new Date()
  }

  emit('changeMonth', currYear.value, currMonth.value)
}

function IncrementMonth() {
  currMonth.value = currMonth.value + 1

  if (currMonth.value > 11) {
    // creating a new date of current year & month and pass it as date value
    date.value = new Date(currYear.value, currMonth.value, new Date().getDate());
    currYear.value = date.value.getFullYear(); // updating current year with new date year
    currMonth.value = date.value.getMonth(); // updating current month with new date month
  } else {
    date.value = new Date()
  }

  emit('changeMonth', currYear.value, currMonth.value)
}

function GoToCurrentMonth() {
  date.value = new Date()
  currYear.value = date.value.getFullYear();
  currMonth.value = date.value.getMonth();

  emit('changeMonth', currYear.value, currMonth.value)
}

const { activities } = defineProps<{ activities: Activity[] }>()

function getActivityCategoriesForDay(day: number): ActivityCategory[] {
  return activities
    .filter((activity) => activity.from.getDate() === day && activity.category !== ActivityCategory.ONBESCHIKBAAR)
    .map((activity) => activity.category)
}

function getActivityCategoryClass(category: ActivityCategory) {
  switch (category) {
    case ActivityCategory.APLOEG:
      return 'a-ploeg-calendarItem'
    case ActivityCategory.BPLOEG:
      return 'b-ploeg-calendarItem'
    case ActivityCategory.CPLOEG:
      return 'c-ploeg-calendarItem'
    case ActivityCategory.ALGEMEEN:
      return 'algemeen-calendarItem'
  }
}

function isAvailable(day: number) {
  return activities
    .filter((activity) => activity.from.getDate() === day && activity.category === ActivityCategory.ONBESCHIKBAAR).length > 0
}
</script>