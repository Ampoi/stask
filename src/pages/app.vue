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
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="showNavbar"
      temporary
      class="m-4 h-auto rounded-lg bg-white/70 backdrop-blur-md"
    >
      <v-list
        :items="navBarList"
      ></v-list>
    </v-navigation-drawer>

    <v-main class="bg-slate-200 overflow-auto grid">
      <div class="m-auto flex flex-col items-center pb-20"><!--全体-->
        <!--きの部分-->
        <div class="flex flex-row gap-4 items-end">
          <!--枝-->
          <div v-for="(branch, branchIndex) in trees" :key="branchIndex" class="flex flex-col items-center">
            <addTaskButton @addTask="addTask(branch.cards)" v-model:title="branch.title"/><!--旗と課題を追加するボタン-->
            <card v-for="(card, cardIndex) in branch.cards" :key="cardIndex" :card="card" @delete="deleteCard(branchIndex, cardIndex)"/><!--カード-->
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

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";

import { firebaseConfig } from "../data/firebaseConfig.js"

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
    addTaskButton
  },
  data(){return{
    changed: true,
    SecoundsForChange: 5,
    userName: "",
    trees:[],
    navBarList: [
      {title: "apapa"}
    ],
    showNavbar: false,
    logined: false,
    uid: "",
    updated: true
  }},

  methods:{
    addTask(branch){
      branch.unshift({
        title: "",
        done: false
      })
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
    deleteCard(branchKey, cardKey){
      console.log(branchKey);
      console.log(cardKey);
      const cards = this.trees[branchKey].cards
      cards.splice(cardKey, 1)
    }
  },

  watch:{
    trees: {
      deep: true,
      handler(){
        clearTimeout(timer)
        this.updated = false
        timer = setTimeout(function(){
          console.log("test");
          set(ref(db, `data/${this.uid}/trees`), this.trees);
          this.updated = true
        }.bind(this), 8000)
      }
    }
  },

  mounted(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
        this.logined = true
        get(child(dbRef, `data/${this.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const newData = snapshot.val()
            this.trees = newData.trees
            clearTimeout(timer)
          } else {
            console.log("No data available");
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