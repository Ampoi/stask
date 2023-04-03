<template>
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
</template>
<script setup lang="ts">
import { watch } from "vue"

import { Card } from '../model/card';

const props = defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  (e:"update:card", card:Card): void
}>()

watch(props.card, ()=>{
  emit("update:card", props.card)
}, {deep: true, immediate: true})
</script>