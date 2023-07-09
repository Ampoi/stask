<template>
    <div class="basis-32 border-orange-300 border-2 bg-white/80 rounded-xl relative">
        <div class="w-full bg-orange-300/40 absolute bottom-0" :style="{height: `${daysLeft}%`}"/>
        <div class="grid items-center pb-4 w-full h-full absolute top-0">
            <div class="text-center text-orange-400">
                <p>期末考査まで</p>
                <p class="font-bold"><span class="text-5xl">{{ daysLeft }}</span>日</p>
            </div>
        </div>
        <div class="absolute bottom-0 w-full py-2 text-center text-orange-400">
            <i class="bi bi-pencil-square"></i>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    daysLeft: number
}>()
</script>