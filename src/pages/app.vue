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
        @click="addTask"
      />
    </v-app-bar>

    <sBanner
      v-if="showBanner"
      @saved="showBanner = false"
    />

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
        @save="saveWithBanner"/>
    </v-navigation-drawer>

    <v-main
      class="bg-gray-100 overflow-auto pb-20"
    >
      <div class="flex flex-col mx-auto px-4 gap-4 max-w-xl">
        <p class="text-black font-bold">未達成のタスク</p>
        <TaskCard
          v-for="(card, cardIndex) in cards"
          :key="cardIndex"
          :card = "card"
          :onlydone="false"
          @updateData="(newData)=>{card = newData}"
          @deleteTask="deleteTask(cardIndex)"
        />
        <div class="flex flex-row justify-between text-black font-bold">
          <p>達成済みのタスク</p>
          <button
            @click="deleteDoneTask()"
          >達成済みのタスクを削除</button>
        </div>
        <TaskCard
          v-for="(card, cardIndex) in cards"
          :key="cardIndex"
          :card = "card"
          :onlydone="true"
          @updateData="(newData)=>{card = newData}"
          @deleteTask="deleteTask(cardIndex)"
          class="opacity-50"
        />
      </div>
    </v-main>
  </v-app>
</template>
<script>
import navBar from "../components/navBar.vue";
import TaskCard from "../components/taskCard.vue"
import sBanner from "../components/savedBanner.vue"

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import firebaseConfig from "../data/firebaseConfig.js"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

var timer = setTimeout(()=>{}, 0)

const defaultCard = {
  title: "",
  time: 60,
  startPage: 0,
  lastPage: 12,
  nowPage: 0,
  done: false,  
  subject: 1
}

export default{
  components: {
    navBar,
    TaskCard,
    sBanner
  },
  data(){return{
    showNavbar: false,
    showBanner: false,

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
      set(ref(db, `data/${this.uid}/cards`), this.cards).then(()=>{
        this.updated = true
      })
      this.showBanner = true
    },

    addTask(){
      this.cards.push(defaultCard)
    },

    deleteTask(index){
      this.cards.splice(index, 1)
    },

    deleteDoneTask(){
      for (let i = 0; i < this.cards.length;){
        if(this.cards[i].done == true){
          this.cards.splice(i, 1)
        }else{
          i++
        }
      }
    },

    checkPermanent(){
      if(window.innerWidth < 832){
        return false
      }else{
        return true
      }
    }
  },

  watch:{
    cards: {
      deep: true,
      handler(){
        if(this.firstUpdate == true){
          this.firstUpdate = false
        }else{
          clearTimeout(timer)
          this.updated = false
          this.showBanner = false
          timer = setTimeout(function(){
            set(ref(db, `data/${this.uid}/cards`), this.cards).then(()=>{
              this.updated = true
            })
          }.bind(this), 8000)
        }
      }
    }
  },

  mounted(){
    window.addEventListener('beforeunload', (event) => {
      if(this.updated == false){
        this.saveWithBanner()
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
        get(child(dbRef, `data/${this.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()
            this.cards = newData.cards
          } else {
            console.log("No data available");
            set(ref(db, `data/${this.uid}`), {
              cards: [
                {
                  "title": "Staskへようこそ",
                  "time": 123,
                  "startPage": 50,
                  "lastPage": 100,
                  "nowPage": 75,
                  "showSubMenu": false,
                  "done": false,
                  "subject": 1
                }
              ]
            })
            .then(()=>{
              console.log("aaa");
            })
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        this.$router.push("/welcome")
      }
    });
  }
}
</script>