<template>
    <div class="w-full p-4 bg-white/80 border-2 border-l-8 border-blue-400/40 rounded-xl flex flex-col">
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
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

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

const card = {
    done: true,
    name: "数学A"
}
</script>