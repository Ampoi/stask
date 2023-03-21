<template>
  <button
    class="flex flex-row gap-1.5 items-baseline hover:bg-slate-500/10 p-2 rounded-lg transition"
    @click="$emit('buttonClicked')">
      <slot/>
  </button>
</template>
<script setup>
const emit = defineEmits(["buttonClicked"])
</script>
