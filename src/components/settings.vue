<template>
  <div class="px-4 py-6 bg-white rounded-md relative max-w-xl">
    <!--保存ボタン-->
    <button
        class="p-4 rounded-all bg-orange-200 border-2 border-orange-300 border-solid rounded-full absolute right-4 top-6"
        @click="$emit('saveSettings')"
    >
      <v-icon>mdi-content-save</v-icon>
    </button>

    <!--保存してない時の通知-->
    <div
        class="bg-red-400 text-white font-bold p-4 rounded-md absolute -top-16 -left-0 w-full flex flex-row items-center gap-4"
        v-if="settingChanged"
    >
      <v-icon>mdi-alert</v-icon>
      <p>保存していない変更があります！</p>
    </div>

    <h1 class="text-3xl font-bold mb-2">設定</h1>
    <SettingList>
      <template v-slot:title>教科の設定</template>
      <template v-slot:description>課題をまとめる教科の色や名前の設定を変更します。</template>
      <template v-slot:warning>
        <div
            class="p-4 my-2 bg-orange-100 border-orange-200 border-2 border-solid rounded-md flex flex-row items-center gap-4">
          <v-icon>mdi-alert-outline</v-icon>
          <p class="text-sm">設定項目の数を減らしたり順番を変えたりすると課題の表示に影響が出る場合があります。</p>
        </div>
      </template>
      <template v-slot:main>
        <div class="pb-4 flex flex-col gap-4 items-center max-h-40 overflow-y-auto">
          <div
              class="flex flex-row items-center gap-2"
              v-for="(subject, subIndex) in settings.subjects"
              :key="subIndex"
          >
            <button
                class="rounded-full h-6 w-6"
                :style="`background-color: ${subject.color}6F;`"
                @click="$emit('getSubjectColor', subIndex)"
            />
            <input type="text" v-model="subject.title">
            <button
                class="rounded-full h-6 w-6 duration-300 hover:bg-white/70 text-[14px] text-red-400/60 grid place-content-center"
                @click="$emit('deleteSubject', subIndex)"
            >
              <v-icon>mdi-trash-can</v-icon>
            </button>
          </div>
        </div>
        <button
            class="text-gray-600 bg-white rounded-md p-2 w-full"
            @click="$emit('addSubject')"
        >
          <v-icon>mdi-plus</v-icon>
        </button>
      </template>
    </SettingList>
  </div>
</template>
<script setup lang="ts">
import {ref as vueData, watch} from "vue"

import SettingList from "./settings/settingList.vue"

import type {ApplicationSetting} from "../models/ApplicationSetting";

const props = defineProps<{
  settings: ApplicationSetting
}>()

const emits = defineEmits<{
  (e: "saveSettings"): void
  (e: "getSubjectColor", subjectIndex: number): void
  (e: "deleteSubject", subjectIndex: number): void
  (e: "addSubject"): void
}>()

const settingChanged = vueData<boolean>(false)

watch(props.settings, () => {
  settingChanged.value = true
}, {deep: true})
</script>