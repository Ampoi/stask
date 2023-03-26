<template>
  <v-app>
    <v-app-bar color="transparent" flat>
      <template v-slot:append>
        <button
          class="text-white/50"
          @click="emit('movePage', 'mainPage')"
        >集中モードを終了する</button>
      </template>
    </v-app-bar>

    <v-main class="bg-gray-900 text-white">
      <div class="flex flex-col mx-auto px-4 gap-4 max-w-xl">
        <div v-for="card in cards">
          <v-card
            flat class="border-2 border-l-8 rounded-xl bg-black relative border-orange-300/50"
            oncontextmenu="return false;"
            v-if="card.done == false && card.concentrate == true"
          >
            <v-card-item>
              <div class="flex flex-row items-center">
                <!--達成ボタン-->
                <v-btn
                  class="border-2 shadow-none bg-black/80 mt-1 border-orange-300/50"
                  icon
                  @click="card.done = true">
                  <v-icon large class="text-white/40">mdi-check</v-icon>
                </v-btn>
                <!--右側-->
                <div class="ml-2 grow">
                  <div class="flex flex-row items-center">
                    <div class="basis-full">
                      <v-card-title>
                        {{ card.title }}
                      </v-card-title>
                      <v-card-subtitle class="text-[14px]">
                        所要時間{{ card.time }}分 期限:{{ card.term }}
                      </v-card-subtitle>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import CheckButton from '../../components/taskCard/checkButton.vue';

import useCards from '../../functions/app/useCards';

const {
  cards
} = useCards()

const emit = defineEmits<{
  (e: "movePage", to:string): void
}>()
</script>