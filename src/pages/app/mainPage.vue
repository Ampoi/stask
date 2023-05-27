<template>
  <v-app>
    <v-app-bar color="transparent" flat>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          @click.stop="showNavbar = !showNavbar"
          class="text-slate-900"
        />
      </template><!--メニューボタン-->
      <v-btn
        icon="mdi-plus"
        @click="addCard"
      />
    </v-app-bar>

    <!--ナビゲーションバー-->
    <v-navigation-drawer
      v-model="showNavbar"
      temporary
      class="-mt-16 pt-16 h-auto bg-white text-slate-900"
      :permanent="checkPermanent()"
    >
      <NavBar
        :userImage="userImage"
        :userName="userName"
        :tasks="cards"
        @logout="logout(router)"
        @opensettings="openSettings"
      />
    </v-navigation-drawer>

    <!--設定-->
    <v-dialog v-model="showSettings">
      <SettingDialog
        v-model:settings="settings"
        @getSubjectColor="getSubjectColor"
        @deleteSubject="deleteSubject"
        @addSubject="addSubject"
      />
    </v-dialog>

    <!--設定のカラーピッカー-->
    <v-dialog v-model="showColorPicker">
      <v-color-picker
        v-model="settings.subjects[selectedSubjectIndex].color"
        class="mx-auto"
        hide-inputs
        show-swatches
      ></v-color-picker>
    </v-dialog>

    <v-main class="bg-gray-100 overflow-auto pb-20 relative">
      <component
        :is="pages[nowPage]"
        ref="cardsPage"
      />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import NavBar from "../../components/navBar.vue"
import SettingDialog from "../../components/settings.vue"

import personalPage from "./mainPage/personal.vue"
import groupPage from "./mainPage/group.vue"

import useAuth from "../../hooks/useAuth"
import { usePersonalCards } from "../../hooks/useCards"
import { usePersonalSettings } from "../../hooks/useSettings"
import { onMounted } from "vue"

const router = useRouter()

const showNavbar = ref(false)
const showSettings = ref(false)
const showColorPicker = ref(false)

const selectedSubjectIndex = ref(0)

const { userName, userImage, logout } = await useAuth()
const { cards } = usePersonalCards()
const { settings, addSubject, deleteSubject } = usePersonalSettings()

const cardsPage = ref()
function addCard(){ cardsPage.value.addCard() }

const pages = {
  "personalPage": personalPage,
  "groupPage": groupPage
} as  const
type PageName = keyof typeof pages
const nowPage = ref<PageName>("personalPage")

onMounted(()=>{
  const groupID = (new URL(document.location.toString())).searchParams.get("group")
  if(!groupID){
    nowPage.value = "personalPage"
  }else{
    nowPage.value = "groupPage"
  }
})

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

function getSubjectColor(index: number){
  showColorPicker.value = true
  selectedSubjectIndex.value = index
}
</script>
<style>
.v-overlay__content {
  margin: 0 auto 0 auto;
  max-width: 36rem !important;
}
</style>