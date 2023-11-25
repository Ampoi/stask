<template>
    <button
        class="rounded-full basis-8 grid place-content-center"
        @click="emit('update:showCardMenu', !props.showCardMenu)">
        <i
            class="bi transition-all duration-300"
            :class="{
                'scale-100 bi-x': props.showCardMenu,
                '-scale-100 bi-three-dots text-lg': !props.showCardMenu
            }"/>
    </button>
</template>
<script setup lang="ts">
const props = defineProps<{
    showCardMenu: boolean
}>()

const emit = defineEmits<{
    (e: "update:showCardMenu", newShowCardMenu: boolean): void
}>()
</script>