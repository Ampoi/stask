<template>
  <button
    class="basis-32 p-4 bg-white rounded-xl border-orange-300 border-2 border-solid flex flex-col items-center"
   :class="{
      'bg-red-100 border-red-300 text-red-400': (getDaysLeft <= 0),
      'text-orange-400': (getDaysLeft > 0)
    }"
    @click="showGetDateModal = true"
  >
    <v-progress-circular
      :model-value="getDaysPercent"
      :color="(getDaysLeft > 0) ? '#FDBA74' : '#F87271'"
      :size="100"
      :width="12"
    >
      <h2 class="text-4xl font-bold">
        {{getDaysLeft}}<span class="text-base">日</span>
      </h2>
    </v-progress-circular>
    <p class="font-bold">{{modelValue.name}}まで</p>
  </button>
  
  <v-dialog v-model="showGetDateModal">
    <div class="px-4 py-6 bg-white rounded-md max-w-xl">
      <h1 class="text-3xl font-bold mb-2">タイマーの設定</h1>
      <h2 class="text-xl">タイマーの名前の設定</h2>
      <p>タイマーの名前を設定します。</p>
      <div class="bg-gray-100 p-4 rounded-md text-center">
        <input
          type="text"
          class="p-2 rounded-md"
          :value="modelValue.name"
          placeholder="タイマーの名前..."
          @input="updateName"
        >
      </div>
      <h2 class="text-xl">タイマーの終了日時の設定</h2>
      <p>タイマーの期限を設定します。</p>
      <div class="bg-gray-100 p-4 rounded-md text-center">
        <input
          type="date"
          class="p-2 rounded-md"
          :value="modelValue.date"
          @input="updateDate"
        >
      </div>
      <h2 class="text-xl">タイマーを削除</h2>
      <p>タイマーの期限を削除します。一度消すと元には戻せません。</p>
      <div class="bg-red-100 p-4 rounded-md text-center border-red-300 border-2">
        <button
          class="bg-gradient-to-b from-red-400/90 to-red-400 text-white font-bold py-2 px-3 rounded-xl"
          @click="deleteTimer"
        >課題を削除</button>
      </div>
    </div>
  </v-dialog>
</template>
<script setup lang="ts">
import {ref as vueData, computed} from "vue"

import type { Date } from "../types/timer"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue", "deleteTimer"])

const showGetDateModal = vueData(false)

let nameInputTimer:number;
function updateName(event: any){
  const newName: string|undefined = event.target.value
  if(newName != undefined){
    clearTimeout(nameInputTimer)
    let newData = JSON.parse(JSON.stringify(props.modelValue))
    newData.name = newName
    nameInputTimer = setTimeout(()=>{
      emit("update:modelValue", newData)
    }, 1000)
  }
}

function updateDate(event: any){
  const newDate: Date|undefined = event.target.value
  if(newDate != undefined){
    let newData = JSON.parse(JSON.stringify(props.modelValue))
    newData.date = newDate
    emit("update:modelValue", newData)
  }
}

function deleteTimer(){
  showGetDateModal.value = false
  emit("deleteTimer")
}

const getDaysLeft = computed(()=>{
  const today: number = new Date().getTime()
  const term: number = new Date(props.modelValue.date).getTime()
  return Math.ceil((term - today) / 86400000)
})

const getDaysPercent = computed(()=>{
  const allDaysLeft = 14
  return getDaysLeft.value / allDaysLeft * 100
})
</script>