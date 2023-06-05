<template>
  <div class="flex flex-col mx-auto px-4 gap-8 max-w-xl">
    <!--<div class="flex flex-col gap-4">
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
    </div>-->
    <div class="flex flex-col gap-4">
      <div class="flex flex-row justify-between text-black font-bold">
        <p class="text-black font-bold items-center flex flex-row"><v-icon>mdi-fire</v-icon>今やるタスク</p>
        <!--<button
          @click="startConcentrateMode()"
        >集中モードを開始する</button>-->
      </div>
      <TaskCard
        v-for="(card, cardIndex) in cards"
        :key="cardIndex"
        v-model:card="cards[cardIndex]"
        show-card-type="concentrate"
        :subjects="groupSettings.subjects"
        v-touch="{
          left: () => card.done = true
        }"
      />
    </div>

    <div class="flex flex-col gap-4">
      <p class="text-black font-bold">未達成のタスク</p>
      <TaskCard
        v-for="(card, cardIndex) in cards"
        :key="cardIndex"
        v-model:card="cards[cardIndex]"
        show-card-type="incomplete"
        :subjects="groupSettings.subjects"
        v-touch="{
          left: () => card.done = true
        }"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 text-black font-bold">
        <p>達成済みのタスク</p>
        <v-spacer/>
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
            :subjects="groupSettings.subjects"
            v-touch="{
              right: () => card.done = false
            }"
            class="opacity-50"
          />
        </div>
      </v-expand-transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useGroupSettings } from '../../../hooks/useSettings';
import { useRouter } from 'vue-router';

import { useGroupCards } from "../../../hooks/useCards"

import TaskCard from '../../../components/taskCard.vue';

const showDoneCards = ref<boolean>(false)

//URLからグループのID取得
const url = new URL(window.location.href)
const params = url.searchParams
const groupId = ((new_group_id) => {
  if(new_group_id){
    return new_group_id
  }else{
    throw new Error("group_idがnullだよ！！")
  }
})(params.get("group"))

const router = useRouter()
function backToPersonalPageWithAlert(){
  router.push("/") //TODO:ダイレクト先でアラートを表示するプログラムを書く(URLから取得する感じ)
}

const { groupSettings } = useGroupSettings(groupId, backToPersonalPageWithAlert)

const { cards } = useGroupCards(groupId)

function addCard(){}

defineExpose({ addCard })
</script>