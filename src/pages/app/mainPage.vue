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
        @logout="logout"
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
      <div class="flex flex-col mx-auto px-4 gap-8 max-w-xl">
        <div class="flex flex-col gap-4">
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
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between text-black font-bold">
            <p class="text-black font-bold items-center flex flex-row"><v-icon>mdi-fire</v-icon>今やるタスク</p>
            <button
              @click="startConcentrateMode()"
            >集中モードを開始する</button>
          </div>
          <TaskCard
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            v-model:card="cards[cardIndex]"
            show-card-type="concentrate"
            :subjects="settings.subjects"
            v-touch="{
              left: () => card.done = true
            }"
            @deleteTask="deleteCard(cardIndex)"
          />
        </div>

        <div class="flex flex-col gap-4">
          <p class="text-black font-bold">未達成のタスク</p>
          <TaskCard
            v-for="(card, cardIndex) in cards"
            :key="cardIndex"
            v-model:card="cards[cardIndex]"
            show-card-type="incomplete"
            :subjects="settings.subjects"
            v-touch="{
              left: () => card.done = true
            }"
            @deleteTask="deleteCard(cardIndex)"
          />
        </div>

        <div class="flex flex-col gap-4">
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
            show-card-type="done"
            :subjects="settings.subjects"
            v-touch="{
              right: () => card.done = false,
              left: () => deleteCard(cardIndex)
            }"
            @deleteTask="deleteCard(cardIndex)"
            class="opacity-50"
          />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref as vueData, onMounted } from "vue"
import { useRouter } from "vue-router"

//コンポーネント
import NavBar from "../../components/navBar.vue"
import TaskCard from "../../components/taskCard.vue"
import SavedBanner from "../../components/savedBanner.vue"
import SettingDialog from "../../components/settings.vue"
import TermTimer from "../../components/timer.vue"

//firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

//コンポーザブル関数
import useUserData from "../../hooks/useAuth"
import useCards from "../../hooks/useCards"
import useTimers from "../../hooks/useTimers"
import useSettings from "../../hooks/useSettings"

import firebaseConfig from "../../infra/firebase/config"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

const db = getDatabase()

const emit = defineEmits<{
  (e: "movePage", to:string): void
}>()

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
} = useCards()

//期限関連
const {
  timers, 
  addTimer, deleteTimer
} = useTimers()

//設定
const {
  settings,
  addSubject, deleteSubject,
} = useSettings()

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

function openSettings(){
  showSettings.value = true
  showNavbar.value = false
}

function saveSettings(){
  set(ref(db, `data/${uid.value}/settings`), settings.value)
  showSettings.value = false
  showBanner.value = true
}

function getSubjectColor(index: number){
  showColorPicker.value = true
  selectedSubjectIndex.value = index
}

function startConcentrateMode(){
  emit("movePage", "concentratePage")
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
</script>