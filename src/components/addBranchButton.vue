<template>
  <div class="grid backdrop-blur-sm pb-5 pt-2">
    <v-btn
      icon="mdi-flag-plus"
      class="mx-auto bg-orange-400 text-white"
      @click="$emit('clicked')"
    ></v-btn>
  </div>
</template>
<script>
export default {
  emits: ["clicked"]
}
</script>