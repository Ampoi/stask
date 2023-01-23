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
    <v-dialog v-model="showSettings">
      <div class="px-4 py-6 bg-white rounded-md">
        <h1 class="text-3xl font-bold mb-2">設定</h1>
        <h2 class="text-xl">教科の設定</h2>
        <p>課題をまとめる教科の色や名前の設定を変更します。</p>
        <div class="p-4 my-2 bg-orange-100 border-orange-200 border-2 border-solid rounded-md flex flex-row items-center gap-4">
          <v-icon>mdi-alert-outline</v-icon>
          <p class="text-sm">設定項目の数を減らしたり順番を変えたりすると課題の表示に影響が出る場合があります。</p>
        </div>
        <div class="bg-gray-100 p-4 flex flex-col gap-4 items-center">
          <div
            class="flex flex-row items-center gap-2"
            v-for="(subject, subIndex) in subjects"
            :key="subIndex"
          >
            <button
              class="rounded-full h-6 w-6"
              :style="`background-color: ${subject.color}6F;`"
              @click="getSubjectColor(subIndex)"
            />
            <p>{{subject.title}}</p>
          </div>
          <button
            class="text-gray-600 bg-white rounded-md p-2 w-full"
          >
            <v-icon>mdi-plus</v-icon>
          </button>
        </div>
      </div>
    </v-dialog>

    <!--設定のカラーピッカー-->
    <v-dialog v-model="showColorPicker">
      {{selectedSubjectIndex}}
      <v-color-picker
        v-model="subjects[selectedSubjectIndex].color"
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
          :subjects="subjects"
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
          :subjects="subjects"
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

export default{
  components: {
    navBar,
    TaskCard,
    sBanner
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

    subjects: [
      {index:0, title: "国語 (古文/現代文)", color:"#F44335"},
      {index:1, title: "数学 (算数)", color:"#2196F3"},
      {index:2, title: "理科 (物理/地学/生物/化学)", color:"#4BAF51"},
      {index:3, title: "社会 (公民/地理/歴史)", color:"#FFC105"},
      {index:4, title: "英語 (外国語)", color: "#E040FB"}
    ]
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
      console.log(defaultCard);
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

    openSettings(){
      this.showSettings = true
      this.showNavbar = false
    },

    getSubjectColor(index){
      this.showColorPicker = true
      this.selectedSubjectIndex = index
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