<template>
  <div class="py-8 px-4">
    <div class="text-center border-b-2 border-solid pb-4 border-black/10 relative">
      <div class="w-28 h-28 rounded-full mx-auto bg-cover bg-center" :style="`background: url(${userImage})`"/>
      <p class="text-2xl font-bold mt-2">{{ userName }}</p>
      <button
        class="text-md text-black/40 hover:text-black transition absolute -top-4 right-0"
        @click="$emit('logout')">
        <v-icon>mdi-account-arrow-right</v-icon>
      </button>
    </div>
    <div class="mt-4 flex flex-col">
      <div class="flex flex-row gap-2 items-baseline hover:bg-slate-500/10 p-2 rounded-lg transition">
        <div class="w-2 h-2 rounded-full" :class="{'bg-emerald-400': updated, 'bg-orange-400': !updated}"/>
        <p class="text-sm">{{ updated ? "保存されました" : "保存されていません" }}</p>
      </div>
      <button
        class="flex flex-row gap-1.5 items-baseline hover:bg-slate-500/10 p-2 rounded-lg transition"
        @click="$emit('save')">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-content-save</v-icon>
        <p class="text-sm">保存する</p>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["userName", "userImage", "updated"],
  emits: ["logout", "save"]
}
</script>