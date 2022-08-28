<template>
  <div
    class="flex flex-col items-center"
    @mouseenter="hoverd=true"
    @mouseleave="hoverd=false"
  >
    <v-card class="w-60 border-orange-400 border-4 rounded-lg shadow-lg flex flex-row h-16 relative overflow-visible">
      <button
        class=" h-6 w-6 rounded-full mx-2 my-auto grid transition duration-150"
        :class="{
          'bg-orange-400 border-orange-300 border-2':card.done,
          'bg-orange-100 border-orange-400 border-2 border-solid':!card.done
        }"
        @click="card.done = !card.done"
      >
        <v-icon
          class="text-white text-[18px] m-auto"
          v-if="card.done == true">mdi-check</v-icon>
      </button>
      <v-text-field label="Name" variant="plain" class="grow" v-model="card.title"/>
      <button
        :class="{'scale-0 opacity-0 invisible': !hoverd}"
        class="transition h-[28px] w-[28px] absolute bg-orange-400 text-white rounded-full grid -bottom-4 -right-4"
        @click="$emit('delete')">
        <v-icon class="text-[18px] m-auto font-bold">mdi-close</v-icon>
      </button>
    </v-card>
    <div class="h-4 w-1 bg-orange-400 shadow-lg"/>
  </div>
</template>
<script>
export default {
  props: ["card"],
  emits: ["delete"],
  data(){return{
    hoverd: false
  }}
}
</script>