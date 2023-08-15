<template>
    <div class="relative w-full h-full">
        <div
            class="absolute top-0 left-0 w-full h-full border-2 border-white bg-cover bg-center rounded-full"
            :style="{
                backgroundImage: `url(${props.iconURL})`
            }"/>
        <div
            class="absolute top-0 left-0 w-full h-full border-2 rounded-full"
            :style="{
                borderColor: `${props.color}70`,
            }"/>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    iconURL: string
    color: string
}>()
</script>