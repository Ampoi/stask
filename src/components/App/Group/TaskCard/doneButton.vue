<template>
    <button
        class="border-2 rounded-full basis-8 grid place-content-center"
        :style="buttonStyle"
        @click="editableIsDone = !editableIsDone">
        <i class="bi bi-check text-3xl"/>
    </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    isDone: boolean
    color: `#${string}`
}>()

const emit = defineEmits<{
    (e: "update:isDone", newIsDone: boolean): void
}>()

const editableIsDone = computed({
    get(){ return props.isDone },
    set( newIsDone: boolean ){ emit("update:isDone", newIsDone) }
})

const doneStyle = {
    borderColor: `${props.color}20`,
    backgroundColor: `${props.color}50`,
    color: "white"
}

const notDoneStyle = {
    borderColor: 'transparent',
    color: `${props.color}70`
}

const buttonStyle = computed(() => {
    return editableIsDone.value ? doneStyle : notDoneStyle
})
</script>