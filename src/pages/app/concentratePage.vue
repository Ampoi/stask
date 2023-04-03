<template>
  <v-app>
    <v-app-bar class="bg-gray-900" flat>
      <button
        class="text-white/50 border-white/50 border-[1.2px] border-solid px-4 py-2 rounded-full mx-auto"
        @click="emit('movePage', 'mainPage')"
      >集中モードを終了する</button>
    </v-app-bar>

    <v-main class="bg-gray-900 text-white">
      <div class="flex flex-col mx-auto px-4 gap-4 max-w-xl">
        <v-progress-circular
          color="rgb(253 186 116 / 0.5)"
          size="200"
          width="20"
          :model-value="getDoneConcentrateCard.length / getConcentrateCard.length * 100"
          class="mx-auto"
        >
          <div class="flex flex-col items-center">
            <v-icon class="text-8xl">mdi-check</v-icon>
            <p>{{ getDoneConcentrateCard.length }} / {{ getConcentrateCard.length }}</p>
          </div>
        </v-progress-circular>
        
        <ConcentrateTaskCard
          v-for="(card, cardIndex) in cards"
          v-model:card="cards[cardIndex]"
        />

        <div
          v-if="getDoneConcentrateCard.length == getConcentrateCard.length"
          class="flex flex-col items-center gap-2 text-white/50"
        >
          <span class="font-bold text-lg">集中モードに設定された課題は全て達成しました！</span>
          <button
            class="text-white/50 border-white/50 border-[1.2px] border-solid px-4 py-2 rounded-full mx-auto"
            @click="emit('movePage', 'mainPage')"
          >集中モードを終了する</button>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { computed } from "vue"

import ConcentrateTaskCard from "../../components/concentrateTaskCard.vue";

import useCards from '../../hooks/useCards';

import { Card } from "../../model/card";

const {
  cards
} = useCards()

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

const getTotalTime = computed(():number => {
  let newTotalTime: number = 0
  getConcentrateCard.value.forEach((card)=>{
    newTotalTime += card.time
  })
  return newTotalTime
})
</script>