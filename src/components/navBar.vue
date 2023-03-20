<template>
  <div class="py-8 px-4">
    <!--アカウント-->
    <div class="flex flex-col items-center border-b-2 border-solid pb-4 border-black/10 relative">
      <div
        class="w-28 h-28 rounded-full mx-auto bg-cover bg-center"
        :style="`background: url('${userImage}')`"
      />
      <p class="text-2xl font-bold mt-2">{{ userName }}</p>
      <div class="flex flex-col items-center text-sm text-white/60 gap-1">
        <span class="flex flex-row items-center">
          <v-icon class="text-sm mt-0.5"> mdi-book-check</v-icon>達成した課題数 | {{ getTaskDone.done }}/{{ getTaskDone.all }}
        </span>
        <span class="flex flex-row items-center">
          <v-icon class="text-sm mt-0.5"> mdi-clock-outline</v-icon>全体の所要時間 | {{ getTaskTime }}分
        </span>
      </div>
      <!--ログアウトボタン-->
      <button
        class="text-md text-white/40 hover:text-white transition absolute -top-4 right-0"
        @click="$emit('logout')">
        <v-icon>mdi-account-arrow-right</v-icon>
      </button>
    </div>
    <!--メニュー-->
    <div class="mt-4 flex flex-col">
      <!--保存されてるかの表示-->
      <div class="flex flex-row gap-2 items-baseline hover:bg-slate-500/10 p-2 rounded-lg transition">
        <div class="w-2 h-2 rounded-full" :class="{'bg-emerald-400': updated, 'bg-orange-400': !updated}"/>
        <p class="text-sm">{{ updated ? "保存されました" : "保存されていません" }}</p>
      </div>
      <!--保存ボタン-->
      <button
        class="flex flex-row gap-1.5 items-baseline hover:bg-slate-500/10 p-2 rounded-lg transition"
        @click="$emit('save')">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-content-save</v-icon>
        <p class="text-sm">保存する</p>
      </button>
      <!--設定ボタン-->
      <button
        class="flex flex-row gap-1.5 items-baseline hover:bg-slate-500/10 p-2 rounded-lg transition"
        @click="$emit('opensettings')">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-cog</v-icon>
        <p class="text-sm">設定</p>
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps(["userName", "userImage", "updated", "tasks"])
const emit = defineEmits(["logout", "save", "opensettings"])

const getTaskTime = computed(()=>{
  let time = 0
  props.tasks.forEach(task => {
    if(!task.done){
      time += task.time
    }
  });
  return time
})

const getTaskDone = computed(()=>{
  let allTaskAmount = 0
  let doneTaskAmount = 0
  props.tasks.forEach(task => {
    allTaskAmount += 1
    if(task.done == true){
      doneTaskAmount += 1
    }
  })
  return {
    "all": allTaskAmount,
    "done": doneTaskAmount
  }
})
</script>