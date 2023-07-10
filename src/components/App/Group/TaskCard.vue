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
            enter="duration-300 ease-out overflow-hidden"
            enter-to="h-[280px]"
            leave-from="h-[280px]"
            leave="duration-300 ease-in overflow-hidden"
            leave-to="h-0"
            class="flex flex-col gap-2"
            >
            <div class="w-full bg-gray-100 border-gray-200 border-[1px] h-56 rounded-lg p-4 flex flex-col gap-2 overflow-y-auto">
                <div class="grow overflow-scroll flex flex-col gap-2">
                    <PageUnitOptions v-model:page-unit="cardUnit"/>
                    <Page :symbol-function="cardUnit.symbol"/>
                </div>
                <button
                    class="rounded-lg p-2 bg-white w-full">
                    <i class="bi bi-file-earmark-plus"></i>
                </button>
            </div>
            <div class="flex flex-row items-stretch gap-2 h-10">
                <Listbox
                    v-model="cardSubject"
                    v-slot="{ open }"
                    as="div"
                    class="grow">
                    <ListboxButton
                        class="rounded-lg p-2 border-[1px] border-gray-100 w-full"
                        :class="{ 'rounded-b-none': open }">
                        教科：{{ cardSubject.name }}
                    </ListboxButton>
                    <TransitionRoot
                        enter-from="opacity-0 ease-out -translate-y-10"
                        enter="duration-300"
                        enter-to="opacity-100 translate-y-0"
                        leave-from="opacity-100 translate-y-0"
                        leave-to="opacity-0 ease-in -translate-y-10"
                        leave="duration-300"
                        class="relative w-full">
                        <ListboxOptions
                            class="p-2 w-full bg-white rounded-b-lg border-[1px] border-t-0 border-gray-100 flex flex-col absolute"
                            ref="unitsOptions">
                            <ListboxOption
                                v-for="(subject, index) in subjects"
                                :key="index"
                                :value="subject"
                                class="p-1 text-center">
                                {{ subject.name }}
                            </ListboxOption>
                        </ListboxOptions>
                    </TransitionRoot>
                </Listbox>
                <button class="rounded-lg border-[1px] border-red-400 text-red-400 text-lg w-10 grid place-content-center">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </TransitionRoot>
    </div>
    <!--
    <Dialog
        :open="showEditCardModal.value"
        class="fixed bottom-0 w-screen h-screen bg-black/20 p-0"
        @click="showEditCardModal.turn()">
        <div class="w-full h-5/6 fixed bottom-0 rounded-t-3xl mt-auto bg-white p-6">aaa</div>
    </Dialog>-->
</template>
<script setup lang="ts">
import { ref } from "vue"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, TransitionRoot } from "@headlessui/vue"

import PageUnitOptions from "./pageUnitOptions.vue";
import ProgressBar from "./progressBar.vue";
import Page from "./page.vue"

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
//const showEditPageModal = ref(new Switch(true))
const cardUnit = ref({ name: "ページ", symbol: (page: number): string => {return `p.${page}`} })

const card = {
    done: true,
    name: "数学A"
}


const subjects = [
    { name: "国語", color: "#F44335" },
    { name: "数学", color: "#2196F3" },
    { name: "理科", color: "#4BAF51" },
    { name: "社会", color: "#FFC105" },
    { name: "英語", color: "#E040FB" }
]
const cardSubject = subjects[0]
</script>