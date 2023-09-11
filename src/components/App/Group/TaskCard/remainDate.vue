<template>
    <div
        class="h-full w-full overflow-hidden rounded-l-md rounded-r-[10px]"
        :class="isPassedTerm ? 'bg-red-200' : isYabaiTerm ? 'bg-amber-400/20' : 'bg-white'">
        <div
            v-if="!isPassedTerm"
            class="h-full"
            :class="isYabaiTerm ? 'bg-orange-400/20' : 'bg-black/5'"
            :style="{ width: `${100 - remainHourPercents}%` }"/>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { getTaskYabasa, getRemainHours } from '../../../../utils/getYabasa';
import { Task } from '../../../../models/task';

const props = defineProps<{
    task: Task
    uid: string
}>()

//残りの日数を取得する算出プロパティ
const remainHours = computed(() => {
    return getRemainHours(props.task.term)
})

//残りどれだけの日数が残っているのかを取得する算出プロパティ
const remainHourPercents = computed(() => {
    const allDate = 14
    return Math.round(remainHours.value / 24 / allDate * 100)
})

const isPassedTerm = computed(() => { return remainHours.value < 0 })

const isYabaiTerm = computed(() => {
    const yabasa = getTaskYabasa(props.task, props.uid)
    return yabasa > 10
})
</script>