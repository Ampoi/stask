<template>
    <button
        class="w-full p-4 border-2 border-l-8 border-orange-300 bg-white rounded-xl flex flex-col gap-2 relative overflow-hidden"
        @click="showModal = !showModal">
        <div
            class="absolute border-r-[1px] border-orange-400 bg-gradient-to-l from-orange-400/80 via-orange-400/30 via-30% to-orange-300/40 h-full top-0 left-0"
            :style="{ width: `${100 - daysLeftPercent}%` }"/>
        <div class="z-10">
            <h3 class="font-semibold text-lg">
                <span class="text-2xl">{{ props.countdown.name }}</span>まで
                <span v-if="remainHours < 200">
                    あと<span class="text-2xl">{{ remainHours }}</span>時間
                </span>
                <span v-else>
                    あと<span class="text-2xl">{{ Math.round(remainHours / 24) }}</span>日
                </span>
            </h3>
        </div>
    </button>
    <Modal
        v-model:open="showModal">
        <div class="flex flex-col w-full h-full">
            <ModalTitle value="カウントダウンを編集"/>
            <p class="text-xl font-semibold mt-4">名前：</p>
            <input
                class="text-lg py-2 px-3 rounded-md border-2 mt-2"
                type="text"
                :value="props.countdown.name"
                @input="(event: any) => updateCountdown({ name: event.target.value })">
            <p class="text-xl font-semibold mt-4">期限：</p>
            <input
                class="text-lg py-2 px-3 rounded-md border-2 mt-2"
                type="date"
                :value="props.countdown.term"
                @input="(event: any) => updateCountdown({ term: event.target.value })">
        </div>
    </Modal>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from '../modal.vue';
import ModalTitle from "../modal/title.vue"
import { CountDown } from "../../../models/countdown"
import { getRemainHours } from '../../../utils/getRemainHours';

const props = defineProps<{
    countdown: CountDown
}>()

const emit = defineEmits<{
    (e: "update:countdown", newCountDown: CountDown): void
}>()

function updateCountdown(newPartialCountDown: Partial<CountDown>){
    const newCountDown = { ...props.countdown, ...newPartialCountDown }
    emit("update:countdown", newCountDown)
}

const showModal = ref(true)

const remainHours = computed(() => getRemainHours(props.countdown.term))

const daysLeftPercent = computed(() => {
    return Math.round((remainHours.value / 24) / 30 * 100)
})
</script>