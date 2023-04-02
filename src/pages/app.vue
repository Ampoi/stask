<template>
  <v-app>
    <v-app-bar color="transparent" flat>
      <template v-slot:prepend class="relative">
        <v-app-bar-nav-icon
            @click.stop="showNavbar = !showNavbar"
            :class="{'text-white': showNavbar, 'text-slate-900': !showNavbar}"
        />
        <div
            v-if="!updated"
            class="w-3 h-3 border-2 border-solid absolute rounded-full top-[18px] left-10"
            :class="{'bg-white border-slate-900': showNavbar, 'bg-slate-900 border-gray-100': !showNavbar}"
        />
      </template><!--メニューボタン-->
      <v-btn
          icon="mdi-plus"
          @click="addCard"
      />
    </v-app-bar>

    <!--保存通知-->
    <SavedBanner
        v-if="showBanner"
        @saved="showBanner = false"
    />

    <!--ナビゲーションバー-->
    <v-navigation-drawer
        v-model="showNavbar"
        temporary
        class="-mt-16 pt-16 h-auto bg-slate-800 text-white"
        :permanent="checkPermanent()"
    >
      <NavBar
          :userImage="userImage"
          :userName="userName"
          :updated="updated"
          :tasks="cards"
          @logout="signOut"
          @save="saveWithBanner"
          @opensettings="openSettings"
      />
    </v-navigation-drawer>

    <!--設定-->
    <v-dialog v-model="showSettings">
      <SettingDialog
          :settings="settings"
          @saveSettings="saveSettings"
          @getSubjectColor="getSubjectColor"
          @deleteSubject="deleteSubject"
          @addSubject="addSubject"
          @closeSettings="showSettings = false"
      />
    </v-dialog>

    <!--設定のカラーピッカー-->
    <v-dialog v-model="showColorPicker">
      <v-color-picker
          v-model="settings.subjects[selectedSubjectIndex].color"
          hide-inputs
          show-swatches
      ></v-color-picker>
    </v-dialog>

    <v-main
        class="bg-gray-100 overflow-auto pb-20"
    >
      <div class="flex flex-col mx-auto px-4 gap-4 max-w-xl">
        <p class="text-black font-bold">期限一覧</p>
        <div class="h-40 flex flex-row gap-4">
          <button
              class="p-4 rounded-lg duration-300 hover:bg-white/70"
              @click="addTimer"
          >
            <v-icon class="text-2xl">mdi-plus</v-icon>
          </button>
          <div class="h-40 flex flex-row gap-4 overflow-x-auto">
            <TermTimer
                v-for="(timer, index) in timers"
                :key="index"
                v-model="timers[index]"
                @deleteTimer="deleteTimer(index)"
            />
          </div>
        </div>
        <p class="text-black font-bold">未達成のタスク</p>
        <TaskCard
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            v-model:card="cards[cardIndex]"
            :onlydone="false"
            :subjects="settings.subjects"
            @deleteTask="deleteCard(cardIndex)"
        />
        <div class="flex flex-row justify-between text-black font-bold">
          <p>達成済みのタスク</p>
          <button
              @click="deleteDoneCard()"
          >達成済みのタスクを削除
          </button>
        </div>
        <TaskCard
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            v-model:card="card"
            :onlydone="true"
            :subjects="settings.subjects"
            @deleteTask="deleteCard(cardIndex)"
            class="opacity-50"
        />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {computed, ref as vueData} from "vue"
import {useRouter} from "vue-router"

//コンポーネント
import NavBar from "../components/navBar.vue"
import TaskCard from "../components/taskCard.vue"
import SavedBanner from "../components/savedBanner.vue"
import SettingDialog from "../components/settings.vue"
import TermTimer from "../components/timer.vue"

import {signOut} from "firebase/auth";

//microcms
import {createClient} from "microcms-js-sdk"

//コンポーザブル関数
import useUserData from "../hooks/domain/useUserData"
import {useCards} from "../hooks/domain/useCards"
import {useTimer} from "../hooks/domain/useTimers"
import {useSetting} from "../hooks/domain/useSettings"

import {useAuth} from "../hooks/domain/useAuth";
import {ApplicationSetting} from "../models/ApplicationSetting";


const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_APIKEY
})

//UIの表示非表示
const showNavbar = vueData(false)
const showSettings = vueData(false)
const showColorPicker = vueData(false)
//設定のカラーピッカーの対象
const selectedSubjectIndex = vueData(0)

//ユーザーデータ関連
const {userName, userImage} = useUserData(useRouter())
//課題のカード関連
const {
  cards,
  addCard,
  deleteCard,
  deleteDoneCard,
  updated,
  isProgress,
  setCards
} = useCards()
//期限関連
const {
  timers,
  addTimer,
  deleteTimer
} = useTimer()
//設定
const {
  settings,
  addSubject, deleteSubject,
  setSettings
} = useSetting()
const {signOut} = useAuth()

const showBanner = computed(() => isProgress.value)

async function saveWithBanner() {
  await setCards(cards.value)
}

function checkPermanent() {
  if (window.innerWidth < 832) {
    return false
  } else {
    return true
  }
}

function openSettings() {
  showSettings.value = true
  showNavbar.value = false
}

async function saveSettings(setting: ApplicationSetting) {
  await setSettings(setting)
  showSettings.value = false
}

function getSubjectColor(index: number) {
  showColorPicker.value = true
  selectedSubjectIndex.value = index
}
</script>