<template>
  <v-app>
    <v-app-bar
      color="transparent"
      collapse
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="bg-slate-200 overflow-auto grid">
      {{ trees }}
      <div class="m-auto flex flex-col items-center pb-20"><!--全体-->
        <!--きの部分-->
        <div class="flex flex-row gap-4 items-end">
          <!--枝-->
          <div v-for="branch in trees" :key="branch.key" class="flex flex-col items-center">
            <addTaskButton @addTask="addTask(branch.cards)" v-model:title="branch.title"/><!--旗と課題を追加するボタン-->
            <card v-for="card in branch.cards" :key="card.key" :card="card"/><!--カード-->
          </div>
        </div>
        <div class="flex flex-row">
          <div
            v-for="i of trees.length - 1" :key="i"
            class="
              h-4 w-[252px] box-content border-x-2 border-b-4 border-orange-400
              first:border-l-4 first:rounded-bl-md
              last:border-r-4 last:rounded-br-md
            "/>
        </div>
        <rootCircle/>
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

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "tobe-ampoi.firebaseapp.com",
  projectId: "tobe-ampoi",
  storageBucket: "tobe-ampoi.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASURE
};
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

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
    trees:[
      {
        title: "",
        cards:[]
      }
    ]
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
    }
  },
  mounted(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        
      } else {
        this.$router.push("/welcome")
      }
    });
  }
}
</script>