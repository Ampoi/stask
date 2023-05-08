<template>
  <a :href="link" class="flex flex-row gap-1.5 items-baseline hover:bg-slate-500/10 p-2 rounded-lg transition">
      <slot/>
  </a>
</template>
<script setup lang="ts">
const props = defineProps<{
  link: string
}>()
</script>