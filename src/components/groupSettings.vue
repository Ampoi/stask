<template>
  <!--設定-->
  <v-dialog v-model="showSettingsComputed">
    <div class="px-4 py-6 bg-white rounded-md overflow-y-auto">
      <h1 class="text-3xl font-bold mb-2">グループの設定</h1>
      <div class="flex flex-col gap-4">
        <SettingList :disabled="!subjectsEditable" :show="{ warning: true }">
          <template v-slot:title>教科の設定</template>
          <template v-slot:description>課題をまとめる教科の色や名前の設定を変更します。</template>
          <template v-slot:warning>
            <v-icon>mdi-alert-outline</v-icon>
            <p class="text-sm">設定項目の数を減らしたり順番を変えたりすると課題の表示に影響が出る場合があります。</p>
          </template>
          <template v-slot:main>
            <div class="pb-4 flex flex-col gap-4 items-center max-h-40 overflow-y-auto">
              <div
                class="flex flex-row items-center gap-2"
                v-for="(subject, subjectIndex) in groupSettings.subjects"
                :key="subjectIndex"
              >
                <button
                  class="rounded-full h-6 w-6"
                  :style="`background-color: ${subject.color}6F;`"
                  @click="getSubjectColor(subjectIndex)"
                  :disabled="!subjectsEditable"
                />
                <input type="text" v-model="subject.title" class="w-52" :disabled="!subjectsEditable">
                <button
                  class="rounded-full h-6 w-6 duration-300 hover:bg-white/70 text-[14px] text-red-400/60 grid place-content-center"
                  @click="deleteSubject(subjectIndex)"
                  :disabled="!subjectsEditable"
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

        <SettingList :disabled="!subjectsEditable" :show="{ warning: false }">
          <template v-slot:title>ユーザーの管理</template>
          <template v-slot:description>グループないのユーザーの権限などを編集します。</template>
          <template v-slot:main>
            <div class="flex flex-col gap-2 items-center">
              <div
                class="flex flex-row items-center gap-2"
                v-for="(member, index) in groupSettings.users"
                :key="index">
                <p class="mr-8 text-lg">{{ member.name }}</p>
                <v-select
                  :items="roles"
                  item-title="name"
                  item-value="id"
                  v-model="groupSettings.users[index].role"
                  placeholder="権限"
                  variant="outlined"
                  density="compact"
                ></v-select>
                <button
                  class="rounded-full h-6 w-6 duration-300 hover:bg-white/70 text-[14px] text-red-400/60 grid place-content-center"
                  @click="deleteUser(index.toString())">
                  <v-icon>mdi-trash-can</v-icon>
                </button>
              </div>
            </div>
          </template>
        </SettingList>

        <SettingList :disabled="!permissionsEditable" :show="{ warning: false }">
          <template v-slot:title>権限の設定</template>
          <template v-slot:description>グループの権限を変更します。管理者の権限は変更できません。</template>
          <template v-slot:main>
            <div class="pb-4 flex flex-col gap-4 items-center max-h-40 overflow-y-auto">
              <div>
                <h2 class="text-lg font-bold">メンバー</h2>
                <div class="flex flex-col">
                  <h3 class="text-md font-bold text-black/60">カードの権限</h3>
                  <v-switch
                    label="編集を可能にする"
                    inset
                    :disabled="!permissionsEditable"
                    v-model="groupSettings.permissions.member.card.edit"/>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-md font-bold text-black/60">設定の権限</h3>
                  <v-switch
                    label="メンバーの権限の編集を可能にする"
                    inset
                    :disabled="!permissionsEditable"
                    v-model="groupSettings.permissions.member.settings.permissions.edit"/>
                  <v-switch
                    label="教科の編集を可能にする" 
                    inset
                    :disabled="!permissionsEditable"
                    v-model="groupSettings.permissions.member.settings.subjects.edit"/>
                </div>
              </div>
            </div>
          </template>
        </SettingList>
      </div>
    </div>
  </v-dialog>

  <!--設定のカラーピッカー-->
  <v-dialog v-model="showColorPicker">
    <v-color-picker
      v-model="groupSettings.subjects[selectedSubjectIndex].color"
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
import useAuth from "../hooks/useAuth";

const props = defineProps<{
  showSettings: boolean,
  groupID: string
}>()
const emit = defineEmits<{ (e: "update:showSettings", newShowSettings: boolean): void }>()

const showColorPicker = ref(false)
const selectedSubjectIndex = ref(0)

const router = useRouter()

const { uid } = await useAuth()
if( !uid.value ){ throw new Error("ログインしていません！") }

const { groupSettings, addSubject, deleteSubject, deleteUser } = await useGroupSettings(props.groupID, router)

const role = groupSettings.value.users[uid.value].role
const settingPermissions = groupSettings.value.permissions[role].settings
const subjectsEditable = settingPermissions.subjects.edit
const permissionsEditable = settingPermissions.permissions.edit

const roles = [
  { id: "admin", name: "管理者" },
  { id: "member", name: "メンバー" }
]

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
.v-input__details{
  display: none;
}
</style>