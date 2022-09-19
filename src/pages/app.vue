<template>
  <v-app>
    <v-app-bar color="transparent" flat>
      <template v-slot:prepend class="relative">
        <v-app-bar-nav-icon @click.stop="showNavbar = !showNavbar"/>
        <div v-if="!updated" class="w-3 h-3 bg-slate-900 border-2 border-solid border-slate-200 absolute rounded-full top-[11px] right-[8px]"/>
      </template><!--メニューボタン-->
      <v-dialog
        v-model="showDialog"
      >        
        <template v-slot:activator="attrs">
          <v-btn
            icon="mdi-plus"
            v-bind="attrs"
            @click="showDialog = true"/>
        </template>
        <v-card class="max-w-md rounded-2xl" fluid>
          <nSDialog
            @newKadai="addKadai"
          />
        </v-card>
      </v-dialog>
    </v-app-bar>

    <sBanner
      v-if="showBanner"
      @saved="showBanner = false"
    />

    <v-navigation-drawer
      v-model="showNavbar"
      temporary
      class="m-4 h-auto rounded-lg bg-white/70 backdrop-blur-md"
    >
      <navBar
        :userImage="userImage"
        :userName="userName"
        :updated="updated"
        @logout="logout"
        @save="saveWithBanner"/>
    </v-navigation-drawer>

    <v-main class="bg-slate-200 overflow-auto">
      <TaskCard
        v-for="card in cards"
        :key="card.id"
        :card = "card"
        @updateData="(newData)=>{card = newData}"
      />
    </v-main>
  </v-app>
</template>
<script>
import navBar from "../components/navBar.vue";
import TaskCard from "../components/taskCard.vue"
import nSDialog from "../components/newStaskDialog.vue"
import sBanner from "../components/savedBanner.vue"

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import { firebaseConfig } from "../data/firebaseConfig.js"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

var timer = setTimeout(()=>{}, 0)

export default{
  components: {
    navBar,
    TaskCard,
    nSDialog,
    sBanner
  },
  data(){return{
    showNavbar: false,
    showBanner: false,
    showDialog: false,

    updated: true,
    changed: true,
    firstUpdate: true,
    SecoundsForChange: 5,
    
    logined: false,
    
    uid: "",
    userName: "",
    userImage: "",

    cards: []
  }},

  methods:{
    logout(){
      console.log("try logout");
      signOut(auth).then(() => {
        console.log("logout success!");
      }).catch((error) => {
        console.log(error);
      });
    },
    saveWithBanner(){
      this.updated = true
      this.showBanner = true
    },
    addKadai(data){
      this.cards.push(data)
      this.showDialog = false
    }
  },

  watch:{
    trees: {
      deep: true,
      handler(){
        if(this.firstUpdate == true){
          this.firstUpdate = false
        }else{
          clearTimeout(timer)
          this.updated = false
          this.showBanner = false
          timer = setTimeout(function(){
            set(ref(db, `data/${this.uid}/trees`), this.trees);
            this.updated = true
          }.bind(this), 8000)
        }
      }
    }
  },

  mounted(){
    window.addEventListener('beforeunload', (event) => {
      if(this.updated == false){
        this.saveWithBanner()
        console.log("apapa");
        event.preventDefault()
        event.returnValue = ""
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.userName = user.displayName
        this.userImage = user.photoURL
        this.logined = true
      } else {
        this.$router.push("/welcome")
      }
    });
  }
}
</script>