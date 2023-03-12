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
    <sBanner
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
      <navBar
        :userImage="userImage"
        :userName="userName"
        :updated="updated"
        :tasks="cards"
        @logout="logout"
        @save="saveWithBanner"
        @opensettings="openSettings"/>
    </v-navigation-drawer>

    <!--設定-->
    <v-dialog v-model="showSettings">
      <settingDialog
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
            <termTimer
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
          >達成済みのタスクを削除</button>
        </div>
        <TaskCard
          v-for="(card, cardIndex) in cards"
          :key="cardIndex"
          v-model:card="cards[cardIndex]"
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
import { ref as vueData, onMounted, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
//コンポーネント
import navBar from "../components/navBar.vue"
import TaskCard from "../components/taskCard.vue"
import sBanner from "../components/savedBanner.vue"
import settingDialog from "../components/settings.vue"
import termTimer from "../components/timer.vue"
//firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";
//microcms
import { createClient } from "microcms-js-sdk"
//コンポーザブル関数
import useUserData from "../functions/app/useUserData"
import useCards from "../functions/app/useCards"
import useTimers from "../functions/app/useTimers"
import useSettings from "../functions/app/useSettings"

import firebaseConfig from "../data/firebaseConfig"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_APIKEY
})

const checkServerUpdating = new Promise(()=>{
  client
    .get({
      endpoint: "stask_settings"
    })
    .then((res)=>{
      if(res.nowUpdating){
        console.log("updating!");
      }
    }) 
})

function twoDigitNumber(newNumber: number):string {
  let addZero: "0"|""
  if(newNumber.toString().length == 1){
    addZero = "0"
  }else{
    addZero = ""
  }
  return `${addZero}${newNumber.toString()}`
}

//UIの表示非表示
const showNavbar = vueData(false)
const showSettings = vueData(false)
const showColorPicker = vueData(false)
//設定のカラーピッカーの対象
const selectedSubjectIndex = vueData(0)

//ユーザーデータ関連
const {uid, userName, userImage} = useUserData(useRouter())
//課題のカード関連
const {
  cards,
  addCard, deleteCard, deleteDoneCard,
  updated, showBanner
} = useCards(twoDigitNumber)
//期限関連
const {
  timers, 
  addTimer, deleteTimer
} = useTimers(twoDigitNumber)
//設定
const {settings} = useSettings()


function logout(){
  signOut(auth).then(() => {
    console.log("logout success!");
  }).catch((error) => {
    console.log(error);
  });
}

function saveWithBanner(){
  set(ref(db, `data/${uid.value}/cards`), cards.value).then(()=>{
    updated.value = true
  })
  showBanner.value = true
}

function checkPermanent(){
  if(window.innerWidth < 832){
    return false
  }else{
    return true
  }
}

function addSubject(){
  settings.value.subjects.push({index:0, title: "新規教科", color:"#E7E8E7"})
  setSubjectIndex()
}

function deleteSubject(index: number){
  settings.value.subjects.splice(index, 1)
  setSubjectIndex()
}

function setSubjectIndex(){
  let i = 0
  settings.value.subjects.forEach(()=>{
    settings.value.subjects[i].index = i
    i++
  })
}

function openSettings(){
  showSettings.value = true
  showNavbar.value = false
}

function getSubjectColor(index: number){
  showColorPicker.value = true
  selectedSubjectIndex.value = index
}

function saveSettings(){
  set(ref(db, `data/${uid.value}/settings`), settings.value)
  showSettings.value = false
  showBanner.value = true
}



onMounted(()=>{
  window.addEventListener('beforeunload', (event) => {
    if(updated.value == false){
      saveWithBanner()
      event.preventDefault()
      event.returnValue = ""
    }
  });
})

onBeforeMount(()=>{
  client
    .get({
      endpoint: "stask_settings"
    })
    .then((res)=>{if(res.nowUpdating){
      console.log("updating!");
      useRouter().push("/updating")
    }})
})
</script>