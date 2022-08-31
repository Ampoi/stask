<template>
  <div class="flex flex-col items-center mx-10">
    <div class="flex flex-col items-center">
      <div class="bg-orange-400 h-20 w-20 rounded-t-full grid">
        <v-icon class="text-white mx-auto mt-3 text-[40px]">
          {{ branchDone ? "mdi-check-decagram" : "mdi-flag" }}
        </v-icon>
      </div>
      <input
        class="bg-orange-300 border-4 border-orange-400 border-solid rounded-md p-0.5 w-40 -mt-7 text-sm text-center text-white font-bold placeholder:text-white/70 drop-shadow-sm"
        placeholder="目標名"
        @input="updateTitle"
        :value="title"
      >
    </div>
    <div class="h-2 w-1 bg-orange-400"/>
    <button
      class="border-4 border-solid border-orange-400 bg-orange-300 hover:bg-orange-400 transition py-1 px-2 w-32 rounded-full flex flex-row gap-1 items-center"
      @click="$emit('addTask')">
      <v-icon class="text-white m-auto text-md">mdi-plus</v-icon>
      <p class="text-sm font-bold text-white drop-shadow-md">新規タスク</p>
    </button>
    <div class="h-2 w-1 bg-orange-400"/>
  </div>
</template>
<script>
export default {
  emits: ["addTask", "update:title"],
  props: ["title", "branchDone"],
  methods: {
    updateTitle(e){
      this.$emit("update:title", e.target.value)
    }
  }
}
</script>