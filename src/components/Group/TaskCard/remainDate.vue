<template>
    <div
        class="absolute top-0 left-0 h-full w-full overflow-hidden rounded-l-md rounded-r-[10px]"
        :class="{
            'bg-white': yabasaLevel == 'daijobu',
            'bg-amber-400/20': yabasaLevel == 'yabai',
            'bg-orange-400/40': yabasaLevel == 'girigiri',
            'bg-red-400': yabasaLevel == 'passed'
        }">
        <div
            v-if="!isPassedTerm"
            class="h-full"
            :class="{
                'bg-black/5': yabasaLevel == 'daijobu',
                'bg-amber-400/20': yabasaLevel == 'yabai',
                'bg-orange-400/20': yabasaLevel == 'girigiri'
            }"
            :style="{ width: `${100 - remainHourPercents}%` }"/>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { getYabasaLevel } from '../../../utils/getYabasa';
import { getRemainHours } from '../../../utils/getRemainHours';
import { Task } from '../../../models/task';

const yabasaLevel = computed(() => getYabasaLevel(props.task, props.uid))

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
    const percents = Math.round(remainHours.value / 24 / allDate * 100)
    return percents < 100 ? percents : 100
})

const isPassedTerm = computed(() => { return remainHours.value < 0 })
</script>