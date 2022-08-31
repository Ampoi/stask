<template>
  <v-app>
    <v-app-bar
      color="transparent"
      collapse
      flat
    >
      <div class="relative">
        <v-app-bar-nav-icon @click.stop="showNavbar = !showNavbar"/>
        <div v-if="!updated" class="w-3 h-3 bg-slate-900 border-2 border-solid border-slate-200 absolute rounded-full top-[11px] right-[8px]"/>
      </div><!--メニューボタン-->
    </v-app-bar>

    <v-banner
      lines="one"
      icon="mdi-information-outline"
      class="fixed m-2 mt-12 w-[calc(100vw-1rem)] rounded-lg z-50 bg-green-300/70 backdrop-blur-md"
      v-if="showBanner"
    >
      <p>変更を保存しました<br>以降はこのタブを閉じることができます</p>

      <template v-slot:actions>
        <v-btn @click="this.showBanner = false">閉じる</v-btn>
      </template>
    </v-banner>

    <v-navigation-drawer
      v-model="showNavbar"
      temporary
      class="m-4 h-auto rounded-lg bg-white/70 backdrop-blur-md"
    >
      <NavBar
        :userImage="userImage"
        :userName="userName"
        :updated="updated"
        :taskDoneAmount="countTaskAmount()"
        @logout="logout"
        @save="saveWithBanner"/>
    </v-navigation-drawer>

    <v-main class="bg-slate-200 overflow-auto grid">
      <div class="m-auto flex flex-col items-center pb-20"><!--全体-->
        <!--きの部分-->
        <div class="flex flex-row gap-4 items-end">
          <!--枝-->
          <div
            v-for="(branch, branchIndex) in trees"
            :key="branchIndex"
            class="flex flex-col items-center relative"
            @mouseenter="trees_hoverd[branchIndex] = true"
            @mouseleave="trees_hoverd[branchIndex] = false"
          >
            <addTaskButton
              @addTask="addTask(branch.cards, branch)"
              v-model:title="branch.title"
              :branchDone="checkBranchDone(branch.cards)"
            /><!--旗と課題を追加するボタン-->
            <card
              v-for="(card, cardIndex) in branch.cards"
              :key="cardIndex"
              :card="card"
              @delete="deleteCard(branchIndex, cardIndex)"
            /><!--カード-->
            <div class="h-4 w-1 bg-orange-400 shadow-lg"/>
            <button
              :class="{'scale-0 opacity-0 invisible': !trees_hoverd[branchIndex]}"
              class="transition h-[28px] w-[28px] absolute bg-orange-400 text-white rounded-full grid -bottom-2 mx-auto"
              @click="deleteBranch(branchIndex)">
              <v-icon class="text-[18px] m-auto font-bold">mdi-close</v-icon>
            </button>
          </div>
        </div>
        <div class="flex flex-row">
          <div
            :v-if="trees.length != 0"
            v-for="i of branchBaseAmount(trees.length - 1)" :key="i"
            class="
              h-4 w-[252px] box-content border-x-2 border-b-4 border-orange-400
              first:border-l-4 first:rounded-bl-md
              last:border-r-4 last:rounded-br-md
            "/>
        </div>
        <rootCircle :treesLength="trees.length"/>
      </div>
    </v-main>
    <addBranchButton
      class="fixed bottom-0 w-screen"
      @clicked="addBranch"
    />
  </v-app>
</template>
<script>
import addBranchButton from '../components/addBranchButton.vue';
import rootCircle from '../components/rootCircle.vue'
import card from '../components/card.vue'
import addTaskButton from '../components/addTaskButton.vue';
import navBar from "../components/navBar.vue";

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import { firebaseConfig } from "../data/firebaseConfig.js"
import NavBar from "../components/navBar.vue"
import { onBeforeMount, onBeforeUnmount } from '@vue/runtime-core';

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

var timer = setTimeout(()=>{}, 0)

export default{
  components: {
    addBranchButton,
    rootCircle,
    card,
    addTaskButton,
    navBar,
    NavBar
  },
  data(){return{
    changed: true,
    SecoundsForChange: 5,
    userName: "",
    trees:[],
    trees_hoverd:[],
    showNavbar: false,
    logined: false,
    uid: "",
    updated: true,
    firstUpdate: true,
    
    userName: "",
    userImage: "",

    showBanner: false
  }},

  methods:{
    addTask(cards, branch){
      const newCard = {title: "", done:false}
      if(cards){
        cards.unshift(newCard)
      }else{
        branch.cards = [newCard]
      }
    },
    addBranch(){
      this.trees.push({
        cards:[],
        title: ""
      })
    },
    branchBaseAmount(amount){
      if(amount <= -1){
        return 0
      }else{
        return amount
      }
    },
    checkBranchDone(cards){
      if(cards == undefined){
        return false
      }else{
        return cards.every((card)=>{
          return card.done
        })
      }
    },
    countTaskAmount(){
      let all = 0
      let done = 0
      this.trees.forEach((branch)=>{
        if(branch.cards != undefined){
          branch.cards.forEach((card)=>{
            all += 1
            if(card.done){done += 1}
          })
        }
      })
      return {all: all, done: done}
    },
    deleteCard(branchKey, cardKey){
      const cards = this.trees[branchKey].cards
      cards.splice(cardKey, 1)
    },
    deleteBranch(branchKey){
      const branch = this.trees[branchKey]
      this.trees.splice(branchKey, 1)
    },
    logout(){
      console.log("try logout");
      signOut(auth).then(() => {
        console.log("logout success!");
      }).catch((error) => {
        console.log(error);
      });
    },
    saveWithBanner(){
      set(ref(db, `data/${this.uid}/trees`), this.trees).then(()=>{
        this.updated = true
        this.showBanner = true
      })
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
        get(child(dbRef, `data/${this.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()
            this.trees = newData.trees
          } else {
            console.log("No data available");
            set(ref(db, `data/${this.uid}`), {
              trees: []
            });
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