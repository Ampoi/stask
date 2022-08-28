<template>
  <div class="w-1 h-4 bg-orange-400" v-if="treesLength != 0"/>
  <div class="bg-orange-400 h-12 w-12 rounded-full grid">
    <v-icon class="text-white m-auto text-[30px]">mdi-account</v-icon>
  </div>
</template>
<script>
export default {
  props: ["treesLength"]
}
</script>