<template>
  <v-btn
    class="border-2 shadow-none bg-white/80 mt-1"
    :style="`border-color: ${borderColor}6F`"
    icon
    @click="changeDone">
    <v-icon
      large
      :class="{'text-gray-200': !done}"
    >mdi-check</v-icon>
  </v-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  done: boolean,
  borderColor: string
}>()

const emit = defineEmits<{
  (e: "update:done", done: boolean): void
}>()

function changeDone(){
  emit("update:done", !props.done)
}
</script>