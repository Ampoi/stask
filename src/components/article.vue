<template>
  <div
    class="mt-4 max-w-lg mx-auto"
    id="document"
    v-html="html"
  />
</template>
<style>
#document h1{
  font-size: 1.875rem;
  font-weight: bold;
}
#document a{
  text-decoration: underline;
}
</style>
<script setup lang="ts">
import { getHTMLfromDoc } from "../infra/markdoc/markdoc"

const props = defineProps<{
  path: string
}>()
const html = await getHTMLfromDoc(props.path)
console.log(html);
</script>