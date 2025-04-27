<template>
  <div class="wrapper">
    <header>
      <p class="current-date">{{ months[currMonth] }} {{ currYear }}</p>
      <div class="icons">
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
          <li :class="{ active: isToday(day) }">{{ day }}</li>
        </template>
        <template v-for="day in nextMonthDays" :key="day">
          <li class="inactive">{{ day }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
  for(let i = lastDayOfMonth.value; i <= 6; i++) {
    days.push(i - lastDayOfMonth.value + 1)
  }
  
  return days
})

const isToday = (day: number) => day === date.value.getDate() && currMonth.value === new Date().getMonth() && currYear.value === new Date().getFullYear()

function DecreaseMonth() {
  currMonth.value = currMonth.value - 1

  if(currMonth.value < 0){
    // creating a new date of current year & month and pass it as date value
    date.value = new Date(currYear.value, currMonth.value, new Date().getDate());
    currYear.value = date.value.getFullYear(); // updating current year with new date year
    currMonth.value = date.value.getMonth(); // updating current month with new date month
  } else {
    date.value = new Date()
  }
}

function IncrementMonth() {
  currMonth.value = currMonth.value + 1

  if(currMonth.value > 11){
    // creating a new date of current year & month and pass it as date value
    date.value = new Date(currYear.value, currMonth.value, new Date().getDate());
    currYear.value = date.value.getFullYear(); // updating current year with new date year
    currMonth.value = date.value.getMonth(); // updating current month with new date month
  } else {
    date.value = new Date()
  }
}
</script>