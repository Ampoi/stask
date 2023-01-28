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
    <settingDialog
      :showSettings="showSettings"
      :settings="settings"
      @saveSettings="saveSettings"
      @getSubjectColor="getSubjectColor"
      @deleteSubject="deleteSubject"
      @addSubject="addSubject"
    />

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
        <p class="text-black font-bold">未達成のタスク</p>
        <TaskCard
          v-for="(card, cardIndex) in cards"
          :key="cardIndex"
          :card = "card"
          :onlydone="false"
          :subjects="settings.subjects"
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
          :subjects="settings.subjects"
          @updateData="(newData)=>{card = newData}"
          @deleteTask="deleteTask(cardIndex)"
          class="opacity-50"
        />
      </div>
    </v-main>
  </v-app>
</template>
<script>
import navBar from "../components/navBar.vue"
import TaskCard from "../components/taskCard.vue"
import sBanner from "../components/savedBanner.vue"
import settingDialog from "../components/settings.vue"

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

export default{
  components: {
    navBar,
    TaskCard,
    sBanner,
    settingDialog
  },
  data(){return{
    showNavbar: false,
    showBanner: false,
    showSettings: false,

    showColorPicker: false,
    selectedSubjectIndex: 0,

    updated: true,
    changed: true,
    firstUpdate: true,
    SecoundsForChange: 5,
    
    logined: false,
    
    uid: "",
    userName: "",
    userImage: "",

    cards: [],

    settings: {
      subjects: [
        {index:0, title: "国語 (古文/現代文)", color:"#F44335"},
        {index:1, title: "数学 (算数)", color:"#2196F3"},
        {index:2, title: "理科 (物理/地学/生物/化学)", color:"#4BAF51"},
        {index:3, title: "社会 (公民/地理/歴史)", color:"#FFC105"},
        {index:4, title: "英語 (外国語)", color: "#E040FB"}
      ]
    }
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
      const defaultCard = {
        title: "",
        time: 60,
        startPage: 0,
        lastPage: 12,
        nowPage: 0,
        done: false,  
        subject: 1
      }
      this.cards.push(defaultCard)
    },

    deleteSubject(index){
      this.settings.subjects.splice(index, 1)
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
    },

    addSubject(){
      this.settings.subjects.push({index:0, title: "新規教科", color:"#E7E8E7"})
    },

    openSettings(){
      this.showSettings = true
      this.showNavbar = false
    },

    getSubjectColor(index){
      this.showColorPicker = true
      this.selectedSubjectIndex = index
    },

    saveSettings(){
      set(ref(db, `data/${this.uid}/settings`), this.settings)
      this.showSettings = false
      this.showBanner = true
    }
  },

  watch:{
    //カードの情報が変更された際のデータベースへのアップデート
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
        //ユーザー情報の全体への反映
        this.uid = user.uid;
        this.userName = user.displayName
        this.userImage = user.photoURL
        this.logined = true
        //ユーザー情報から設定やタスクの取得
        get(child(dbRef, `data/${this.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()
            if(newData.cards != undefined){
              this.cards = newData.cards
            }else{
              console.log("No data available");
              this.cards.push({
                "title": "Staskへようこそ",
                "time": 123,
                "startPage": 50,
                "lastPage": 100,
                "nowPage": 75,
                "showSubMenu": false,
                "done": false,
                "subject": 1
              })
            }
            if(newData.settings == undefined){
              set(ref(db, `data/${this.uid}/settings`), this.settings)
            }else{
              this.settings = newData.settings
            }
          } else {
            console.log("No data available");
            this.cards.push({
              "title": "Staskへようこそ",
              "time": 123,
              "startPage": 50,
              "lastPage": 100,
              "nowPage": 75,
              "showSubMenu": false,
              "done": false,
              "subject": 1
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