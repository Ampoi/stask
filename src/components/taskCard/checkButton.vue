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
<script>
export default {
  props:["done","borderColor"],
  emits:["update:done"],
  methods: {
    changeDone(){
      this.$emit("update:done", !this.done)
    }
  }
}
</script>