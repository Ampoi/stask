<template>
    <div class="w-full p-4 bg-white/80 border-2 border-l-8 border-blue-400/40 rounded-xl flex flex-col gap-2">
        <div class="flex flex-row items-stretch gap-4 h-8">
            <button
                class="border-2 rounded-full basis-8 grid place-content-center"
                :class="{ 'border-blue-400/40 bg-blue-400/30 text-white': card.done, 'border-none text-blue-400/40': !card.done }">
                <i class="bi bi-check text-3xl"/>
            </button>
            <input
                type="text"
                class="rounded-lg grow text-xl"
                v-model="card.name"
                placeholder="課題名を入力...">
            <button
                class="rounded-full basis-8 grid place-content-center"
                @click="showCardMenu.turn()">
                <i
                    class="bi bi-chevron-up transition-all duration-300"
                    :class="{
                        'scale-y-100': showCardMenu.value,
                        '-scale-y-100': !showCardMenu.value
                    }"/>
            </button>
        </div>
        <div>
            <ProgressBar :percent="80" sub-color="#F3F4F6"/>
        </div>
        <TransitionRoot
            :show="showCardMenu.value"
            enter-from="h-0"
            enter="duration-300 ease-out"
            enter-to="h-80"
            leave-from="h-80"
            leave="duration-300 ease-in"
            leave-to="h-0"
            class="overflow-hidden flex flex-col gap-2"
            >
            <div class="w-full bg-gray-100 border-gray-200 border-[1px] h-56 rounded-lg p-4 flex flex-col gap-2 relative overflow-y-auto">
                <PageUnitOptions v-model:page-unit="cardUnit"/>
                <div class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg">
                    <span>{{ cardUnit.symbol(30) }}</span>
                    <ProgressBar :percent="80" sub-color="white"/>
                    <span>{{ cardUnit.symbol(30) }}</span>
                </div>
                <div class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg">
                    <span>{{ cardUnit.symbol(30) }}</span>
                    <ProgressBar :percent="80" sub-color="white"/>
                    <span>{{ cardUnit.symbol(30) }}</span>
                </div>
                <div class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg">
                    <span>{{ cardUnit.symbol(30) }}</span>
                    <ProgressBar :percent="80" sub-color="white"/>
                    <span>{{ cardUnit.symbol(30) }}</span>
                </div>
                <button
                    class="rounded-lg p-2 bg-white w-full sticky left-0 bottom-0">
                    <i class="bi bi-file-earmark-plus"></i>
                </button>
            </div>
        </TransitionRoot>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { TransitionRoot } from "@headlessui/vue"

import PageUnitOptions from "./pageUnitOptions.vue";
import ProgressBar from "./progressBar.vue";

class Switch {
    switch: boolean

    constructor( defaultData: boolean ){
        this.switch = defaultData
    }

    get value(){
        return this.switch
    }

    turn(){
        this.switch = !this.switch
    }
}

const showCardMenu = ref(new Switch(false))
const cardUnit = ref({ name: "ページ", symbol: (page: number): string => {return `p.${page}`} })

const card = {
    done: true,
    name: "数学A"
}
</script>