<template>
  <v-btn
    class="border-2 shadow-none bg-white/80 mt-1 dark:bg-black/30 dark:text-white"
    :style="`border-color: ${borderColor}6F`"
    icon
    @click="$emit('btnClicked')">
    <v-icon
      large
      :class="{'text-gray-200 dark:text-white/20': !done}"
    >mdi-check</v-icon>
  </v-btn>
</template>
<script>
export default {
  props:["done","borderColor"],
  emits:["btnClicked"]
}
</script>