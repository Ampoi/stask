<template>
    <div
        class="absolute top-0 left-0 h-full w-full overflow-hidden rounded-l-md rounded-r-[10px]"
        :class="done || (!isYabaiTerm && !isPassedTerm) ? 'bg-white' : !isPassedTerm ? 'bg-amber-400/20' : 'bg-red-200'">
        <div
            v-if="!isPassedTerm"
            class="h-full"
            :class="isYabaiTerm && !done ? 'bg-orange-400/20' : 'bg-black/5'"
            :style="{ width: `${100 - remainHourPercents}%` }"/>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { getTaskYabasa, isDone } from '../../../../utils/getYabasa';
import { getRemainHours } from '../../../../utils/getRemainHours';
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

const done = computed(() => isDone(props.task.scopes, props.uid))
</script>