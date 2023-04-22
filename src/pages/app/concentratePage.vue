<template>
  <v-app>
    <v-app-bar class="bg-gray-900" flat>
      <button
        class="text-white/50 border-white/50 border-[1.2px] border-solid px-4 py-2 rounded-full mx-auto"
        @click="endConcentrateMode"
      >集中モードを終了する</button>
    </v-app-bar>

    <v-main class="bg-gray-900 text-white">
      <div class="flex flex-col mx-auto px-4 gap-4 max-w-xl">
        <div class="flex flex-col items-center gap-4">
          <v-progress-circular
            color="rgb(253 186 116 / 0.5)"
            size="200"
            width="14"
            :model-value="getDoneConcentrateCard.length / getConcentrateCard.length * 100"
            class="mx-auto"
          >
            <div class="flex flex-col items-center">
              <p class="text-5xl">{{ getTimeFromSeconds }}</p>
              <p class="text-lg">{{ getDoneConcentrateCard.length }} / {{ getConcentrateCard.length }}</p>
            </div>
          </v-progress-circular>
          <button
            class="py-4 px-16 rounded-full border-2 border-solid transition-all duration-300"
            :class="{
              'bg-orange-300/50 text-white border-transparent': !runTimer,
              'text-orange-300/50 border-orange-300/50': runTimer}"
            @click="runTimer = !runTimer"
          >{{ runTimer ? "ストップ" : "スタート" }}</button>
        </div>
        
        <ConcentrateTaskCard
          v-for="(_card, cardIndex) in cards"
          v-model:card="cards[cardIndex]"
        />

        <div
          v-if="getDoneConcentrateCard.length == getConcentrateCard.length"
          class="flex flex-col items-center gap-2 text-white/50 pt-20"
        >
          <span class="font-bold text-lg">集中モードに設定された課題は全て達成しました！</span>
          <button
            class="text-white/50 border-white/50 border-[1.2px] border-solid px-4 py-2 rounded-full mx-auto"
            @click="endConcentrateMode"
          >集中モードを終了する</button>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import twoDigitNumber from "../../functions/twoDigitNumber";

import ConcentrateTaskCard from "../../components/concentrateTaskCard.vue";

import useCards from '../../hooks/useCards';

import { Card } from "../../model/cards";

const { cards } = useCards()

const emit = defineEmits<{
  (e: "movePage", to:string): void
}>()

const getConcentrateCard = computed(():Array<Card> => {
  let newConcentrateCard: Array<Card> = []
  cards.value.forEach((card)=>{
    if(card.concentrate == true){
      newConcentrateCard.push(card)
    }
  })
  return newConcentrateCard
})

const getDoneConcentrateCard = computed(():Array<Card> => {
  let  newDoneConcentrateCard: Array<Card> = []
  cards.value.forEach((card)=> {
    if(card.concentrate == true && card.done == true){
      newDoneConcentrateCard.push(card)
    }
  })
  return newDoneConcentrateCard
})

function endConcentrateMode(){
  let i = 0
  cards.value.forEach((card)=>{
    if(card.done && card.concentrate){
      cards.value[i].concentrate = false
    }
    i++
  })
  emit('movePage', 'mainPage')
}

const runTimer = ref(false)
const timeLeft = ref(900)

setInterval(()=>{
  if(runTimer.value && timeLeft.value > 0){
    timeLeft.value -= 1
  }
}, 1000)

const getTimeFromSeconds = computed(() => {
  const hours = Math.floor(timeLeft.value / 3600)
  const minutes = twoDigitNumber(Math.floor((timeLeft.value % 3600) / 60))
  const seconds = twoDigitNumber(timeLeft.value % 60)

  return `${hours}:${minutes}:${seconds}`
})
</script>