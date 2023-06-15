<template>
  <div class="flex flex-col mx-auto px-4 gap-8 max-w-xl">
    <div class="flex flex-col gap-4">
      <p class="text-black font-bold">期限一覧</p>
      <div class="h-40 flex flex-row gap-4">
        <button
          class="p-4 rounded-lg duration-300 hover:bg-white/70"
          @click="addTimer"
        >
          <v-icon class="text-2xl">mdi-plus</v-icon>
        </button>
        <div class="h-40 flex flex-row gap-4 overflow-x-auto">
          <TermTimer
            v-for="(_timer, index) in timers"
            :key="index"
            v-model="timers[index]"
            @deleteTimer="deleteTimer(index)"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-row justify-between text-black font-bold">
        <p class="text-black font-bold items-center flex flex-row"><v-icon>mdi-fire</v-icon>今やるタスク</p>
        <button
          @click="startConcentrateMode()"
        >集中モードを開始する</button>
      </div>
      <TaskCard
        v-for="(card, cardIndex) in cards"
        :key="cardIndex"
        v-model:card="cards[cardIndex]"
        show-card-type="concentrate"
        :subjects="personalSettings.subjects"
        v-touch="{
          left: () => card.done = true
        }"
        @deleteTask="deleteCard(cardIndex)"
      />
    </div>

    <div class="flex flex-col gap-4">
      <p class="text-black font-bold">未達成のタスク</p>
      <TaskCard
        v-for="(card, cardIndex) in cards"
        :key="cardIndex"
        v-model:card="cards[cardIndex]"
        show-card-type="incomplete"
        :subjects="personalSettings.subjects"
        v-touch="{
          left: () => card.done = true
        }"
        @deleteTask="deleteCard(cardIndex)"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 text-black font-bold">
        <p>達成済みのタスク</p>
        <v-spacer></v-spacer>
        <button
          @click="deleteDoneCard()"
        ><v-icon>mdi-trash-can</v-icon></button>
        <button @click.stop="showDoneCards = !showDoneCards">
          <v-icon v-if="showDoneCards">mdi-menu-up</v-icon>
          <v-icon v-if="!showDoneCards">mdi-menu-down</v-icon>
        </button>
      </div>
      <v-expand-transition>
        <div v-if="showDoneCards" class="flex flex-col gap-4">
          <TaskCard
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            v-model:card="cards[cardIndex]"
            show-card-type="done"
            :subjects="personalSettings.subjects"
            v-touch="{
              right: () => card.done = false,
              left: () => deleteCard(cardIndex)
            }"
            @deleteTask="deleteCard(cardIndex)"
            class="opacity-50"
          />
        </div>
      </v-expand-transition>
    </div>
  </div>

  <PersonalSettings v-model:showSettings="showPersonalSettings"/>
</template>
<script setup lang="ts">
import { ref } from "vue"

import PersonalSettings from "../../../components/personalSettings.vue"
import TaskCard from "../../../components/taskCard.vue"
import TermTimer from "../../../components/timer.vue"

import { usePersonalCards } from "../../../hooks/useCards"
import useTimers from "../../../hooks/useTimers"
import { usePersonalSettings } from "../../../hooks/useSettings"

const emit = defineEmits<{
  (e: "movePage", to:string): void
}>()

const { cards, addCard, deleteCard, deleteDoneCard } = usePersonalCards()
const { timers, addTimer, deleteTimer } = useTimers()
const { personalSettings } = await usePersonalSettings()

const showPersonalSettings = ref(false)
const showDoneCards =  ref<boolean>(false)

function openSettings(){
  showPersonalSettings.value = true
}

function startConcentrateMode(){
  emit("movePage", "concentratePage")
}

defineExpose({ addCard, openSettings })
</script>