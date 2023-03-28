<template>
  <v-app>
    <v-app-bar color="transparent" flat>
      <button
        class="text-white/50 border-white/50 border-[1.2px] border-solid px-4 py-2 rounded-full mx-auto"
        @click="emit('movePage', 'mainPage')"
      >集中モードを終了する</button>
    </v-app-bar>

    <v-main class="bg-gray-900 text-white">
      <div class="flex flex-col mx-auto px-4 gap-4 max-w-xl">
        <ConcentrateTaskCard
          v-for="(card, cardIndex) in cards"
          v-model:card="cards[cardIndex]"
        />
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { computed } from "vue"

import ConcentrateTaskCard from "../../components/concentrateTaskCard.vue";

import useCards from '../../functions/app/useCards';

const {
  cards
} = useCards()

const getTotalTime = computed(()=>{
  let newTotalTime: number = 0
  cards.value.forEach((card)=>{
    newTotalTime += card.time
  })
  return newTotalTime
})

const emit = defineEmits<{
  (e: "movePage", to:string): void
}>()
</script>