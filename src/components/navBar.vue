<template>
  <div class="py-8 px-4 h-full flex flex-col">
    <!--アカウント-->
    <div class="flex flex-col items-center border-b-2 border-solid pb-4 border-black/10 relative">
      <div
        class="w-28 h-28 rounded-full mx-auto bg-cover bg-center"
        :style="`background: url('${userImage}')`"
      />
      <p class="text-2xl font-bold mt-2">{{ userName }}</p>
      <div class="flex flex-col items-center text-sm text-slate-900/60 gap-1">
        <span class="flex flex-row items-center">
          <v-icon class="text-sm mt-0.5"> mdi-book-check</v-icon>達成した課題数 | {{ getTaskDone.done }}/{{ getTaskDone.all }}
        </span>
        <span class="flex flex-row items-center">
          <v-icon class="text-sm mt-0.5"> mdi-clock-outline</v-icon>全体の所要時間 | {{ getTaskTime }}分
        </span>
      </div>
      <!--ログアウトボタン-->
      <button
        class="text-md text-slate-900/60 hover:text-slate-900 transition absolute -top-4 right-0"
        @click="$emit('logout')">
        <v-icon>mdi-account-arrow-right</v-icon>
      </button>
    </div>
    <!--メニュー-->
    <div class="mt-4 flex flex-col grow">
      <NavBarLink link="/">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-account</v-icon>
        <p class="text-sm">個人の課題リスト</p>
        <v-spacer/>
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-chevron-right</v-icon>
      </NavBarLink>
      <NavBarButton @buttonClicked="$emit('opensettings')">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-cog</v-icon>
        <p class="text-sm">設定</p>
      </NavBarButton>
      <p class="text-xs text-slate-900/60 mt-4">グループ</p>
      <NavBarLink link="/?group=school">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-account-group</v-icon>
        <p class="text-sm">学校〜</p>
        <v-spacer/>
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-chevron-right</v-icon>
      </NavBarLink>
      <v-spacer/>

      <!--TODO:使い方ページを作る-->
      <NavBarLink link="/how_to_use">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-help</v-icon>
        <p class="text-sm text-slate-900/60">使い方</p>
      </NavBarLink>
      <NavBarLink link="/privacy_policy">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-file-document-outline</v-icon>
        <p class="text-sm text-slate-900/60">プライバシーポリシー</p>
      </NavBarLink>
      <NavBarLink link="/terms">
        <v-icon class="text-sm -ml-0.5 opacity-60">mdi-file-document-outline</v-icon>
        <p class="text-sm text-slate-900/60">利用規約</p>
      </NavBarLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Card } from '../model/cards';

import NavBarButton from "../components/navBar/button.vue"
import NavBarLink from "../components/navBar/link.vue"

const props = defineProps(["userName", "userImage", "tasks"])
const emit = defineEmits(["logout", "opensettings"])

const getTaskTime = computed(()=>{
  let time = 0
  props.tasks.forEach((task: Card) => {
    if(!task.done){
      time += task.time
    }
  });
  return time
})

const getTaskDone = computed(()=>{
  let allTaskAmount = 0
  let doneTaskAmount = 0
  props.tasks.forEach((task: Card) => {
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