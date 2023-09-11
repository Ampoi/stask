<template>
    <button
        class="rounded-full basis-8 grid place-content-center"
        @click="emit('update:showCardMenu', !props.showCardMenu)">
        <i
            class="bi bi-chevron-up transition-all duration-300"
            :class="{
                'scale-y-100': props.showCardMenu,
                '-scale-y-100': !props.showCardMenu
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