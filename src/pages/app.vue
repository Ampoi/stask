<template>
  <v-app class="dark:text-white">
    <v-app-bar color="transparent" flat>
      <template v-slot:prepend class="relative">
        <v-app-bar-nav-icon @click.stop="showNavbar = !showNavbar"/>
        <div v-if="!updated" class="w-3 h-3 bg-slate-900 border-2 border-solid border-slate-200 absolute rounded-full top-[18px] left-10"/>
      </template><!--メニューボタン-->
      <v-btn
        icon="mdi-plus"
        @click="addTask"/>
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

    <v-main
      class="bg-slate-200 overflow-auto
             dark:bg-gradient-to-br from-slate-800 to-black"
    >
      <!--<button @click="countTaskData">aaa</button>-->
      <div class="flex flex-col mx-auto px-4 gap-4 max-w-xl">
        <TaskCard
          v-for="(card, cardIndex) in cards"
          :key="cardIndex"
          :card = "card"
          @updateData="(newData)=>{card = newData}"
          @deleteTask="deleteTask(cardIndex)"
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
      this.cards.push({
        title: "",
        time: 60,
        startPage: 0,
        lastPage: 12,
        nowPage: 0,
        done: false,      
        subject: {title:"",color:""}
      })
    },
    deleteTask(index){
      this.cards.splice(index, 1)
    },
    countTaskData(){
      let sendData = {
        doneAmount: 0,
        allPage: 0,
        donePage: 0,
        allTime: 0
      }
      this.cards.forEach((card)=>{
        if(card.done){sendData.doneAmount+=1}
        const allPage = lastPage - startPage + 1
        const donePage = nowPage - startPage
        sendData.donePage += donePage
        sendData.allPage += allPage
        sendData.allTime += card.time
      })
    }
  },

  watch:{
    cards: {
      deep: true,
      handler(){
        console.log("a");
        if(this.firstUpdate == true){
          this.firstUpdate = false
          console.log("b");
        }else{
          console.log("c");
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
            console.log(this.trees);
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
                  "subject": { "title": "数学 (算数)", "color": "blue" }
                }
              ]
            }).then(()=>{
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