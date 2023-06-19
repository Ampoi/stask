<template>
  <!--設定-->
  <v-dialog v-model="showSettingsComputed">
    <div class="px-4 py-6 bg-white rounded-md overflow-y-auto">
      <h1 class="text-3xl font-bold mb-2">グループの設定</h1>
      <div class="flex flex-col gap-4">
        <SettingList>
          <template v-slot:title>教科の設定</template>
          <template v-slot:description>課題をまとめる教科の色や名前の設定を変更します。</template>
          <template v-slot:warning>
            <div class="p-4 my-2 bg-orange-100 border-orange-200 border-2 border-solid rounded-md flex flex-row items-center gap-4">
              <v-icon>mdi-alert-outline</v-icon>
              <p class="text-sm">設定項目の数を減らしたり順番を変えたりすると課題の表示に影響が出る場合があります。</p>
            </div>
          </template>
          <template v-slot:main>
            <div class="pb-4 flex flex-col gap-4 items-center max-h-40 overflow-y-auto">
              <div
                class="flex flex-row items-center gap-2"
                v-for="(subject, subjectIndex) in groupSettings.subjects.value"
                :key="subjectIndex"
              >
                <button
                  class="rounded-full h-6 w-6"
                  :style="`background-color: ${subject.color}6F;`"
                  @click="getSubjectColor(subjectIndex)"
                />
                <input type="text" v-model="subject.title" class="w-52">
                <button
                  class="rounded-full h-6 w-6 duration-300 hover:bg-white/70 text-[14px] text-red-400/60 grid place-content-center"
                  @click="deleteSubject(subjectIndex)"
                ><v-icon>mdi-trash-can</v-icon></button>
              </div>
            </div>
            <button
              class="text-gray-600 bg-white rounded-md p-2 w-full"
              @click="addSubject"
            >
              <v-icon>mdi-plus</v-icon>
            </button>
          </template>
        </SettingList>
      </div>
    </div>
  </v-dialog>

  <!--設定のカラーピッカー-->
  <v-dialog v-model="showColorPicker">
    <v-color-picker
      v-model="groupSettings.subjects.value[selectedSubjectIndex].color"
      id="subjectColorPicker"
      hide-inputs
      show-swatches
    ></v-color-picker>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { useGroupSettings } from "../hooks/useSettings"

import SettingList from "./settings/settingList.vue"
import { useRouter } from "vue-router";

const props = defineProps<{
  showSettings: boolean,
  groupID: string
}>()
const emit = defineEmits<{ (e: "update:showSettings", newShowSettings: boolean): void }>()

const showColorPicker = ref(false)
const selectedSubjectIndex = ref(0)

const router = useRouter()

const { groupSettings, addSubject, deleteSubject } = await useGroupSettings(props.groupID, router)

const showSettingsComputed = computed({
  get(): boolean {
    return props.showSettings
  },
  set(newShowSettings: boolean){
    emit("update:showSettings", newShowSettings)
  }
})

function getSubjectColor(index: number){
  showColorPicker.value = true
  selectedSubjectIndex.value = index
}
</script>
<style>
.v-overlay__content:has(#subjectColorPicker){
  width: inherit !important;
}
</style>