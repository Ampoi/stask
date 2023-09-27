<template>
  <div
      class="flex flex-row gap-4 z-10 text-gray-400"
      :class="
          {
              'text-gray-600': yabasaLevel == 'daijobu',
              'text-orange-600': yabasaLevel == 'yabai',
              'text-orange-700': yabasaLevel == 'girigiri',
              'text-white': yabasaLevel == 'passed',
              'font-semibold': yabasaLevel == 'passed' || yabasaLevel == 'girigiri'
          }">
      <p v-if="remainHours > 0">1日{{ pagesToDoneInRemianDates }}ページやれば終わります</p>
      <p v-else>期限を過ぎてます</p>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  yabasaLevel: string
  remainHours: number
  totalRemainScope: number
}>()

const pagesToDoneInRemianDates = computed(() => {
    const remianDates = Math.round(props.remainHours / 24)
    const countRemainDates = remianDates <= 0 ? 1 : remianDates
    return Math.ceil(props.totalRemainScope / countRemainDates)
})
</script>