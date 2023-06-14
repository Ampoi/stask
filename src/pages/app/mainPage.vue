<template>
  <v-app class="bg-gray-100">
    <div class="flex flex-row items-center gap-2 h-16 bg-transparent fixed w-screen p-3.5 z-20">
      <button @click.stop="showNavbar = !showNavbar" class="p-2.5 text-slate-900 rounded-full hover:bg-white/70 transition duration-300">
        <v-icon>mdi-menu</v-icon>
      </button>
      <v-spacer/>

      <v-menu location="bottom" transition="scroll-y-transition">
        <template v-slot:activator="{ props }">
          <button
            v-bind="props"
            class="p-2.5 text-slate-900 rounded-full hover:bg-white/70 transition duration-300"
            v-if="isGroupPage">
            <v-icon>mdi-account-group</v-icon>
          </button>
        </template>
        <div class="bg-white p-4 rounded-md w-40">
          <div
            v-for="(groupMember, index) in groupMembers"
            :key="index"
            class="flex flex-row gap-2 items-center"
          >
            <v-icon>{{groupMember.role == "admin" ? "mdi-crown" : "mdi-account"}}</v-icon>
            <p>{{ groupMember.name }}</p>
          </div>
        </div>
      </v-menu>

      <button
        @click="showGroupSettings = true"
        class="p-2.5 text-slate-900 rounded-full hover:bg-white/70 transition duration-300"
        v-if="isGroupPage">
        <v-icon>mdi-dots-horizontal</v-icon>
      </button>

      <button @click="addCard" class="p-2.5 text-slate-900 rounded-full hover:bg-white/70 transition duration-300">
        <v-icon>mdi-plus</v-icon>
      </button>
    </div>

    <!--ナビゲーションバー-->
    <v-navigation-drawer
      v-model="showNavbar"
      temporary
      class="-mt-16 pt-16 h-auto bg-white text-slate-900 z-10"
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

    <PersonalSettings v-model:showSettings="showPersonalSettings"/>
    <GroupSettings v-model:showSettings="showGroupSettings"/>

    <v-main class="overflow-auto py-20">
      <component
        :is="pages[nowPage]"
        ref="cardsPage"
      />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue"
import { useRouter } from "vue-router"

import NavBar from "../../components/navBar.vue"
import PersonalSettings from "../../components/personalSettings.vue"
import GroupSettings from "../../components/groupSettings.vue"

import personalPage from "./mainPage/personal.vue"
import groupPage from "./mainPage/group.vue"

import useAuth from "../../hooks/useAuth"
import { usePersonalCards } from "../../hooks/useCards"
import { onMounted } from "vue"

import { useGroupSettings } from "../../hooks/useSettings"
import { Members } from "../../model/groupSettings"

const router = useRouter()

const showNavbar = ref(false)
const showPersonalSettings = ref(false)
const showGroupSettings = ref(false)

const { userName, userImage, logout } = await useAuth()
const { cards } = usePersonalCards()

const cardsPage = ref()
function addCard(){ cardsPage.value.addCard() }

const pages = {
  "personalPage": personalPage,
  "groupPage": groupPage
} as  const
type PageName = keyof typeof pages
const nowPage = ref<PageName>("personalPage")

const isGroupPage = ref(false)
const groupMembers: Ref<Members> = ref({})

onMounted(async ()=>{
  const groupID = (new URL(document.location.toString())).searchParams.get("group")
  if(!groupID){
    isGroupPage.value = false
    nowPage.value = "personalPage"
    
  }else{
    isGroupPage.value = true
    nowPage.value = "groupPage"
    const { groupSettings } = await useGroupSettings(groupID, ()=>{router.push("/")})
    groupMembers.value = groupSettings.users
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
  showPersonalSettings.value = true
  showNavbar.value = false
}
</script>
<style>
.v-overlay__content {
  margin: 0 auto 0 auto;
  max-width: 36rem !important;
}

.v-navigation-drawer__scrim {
  z-index: 5 !important;
}
</style>