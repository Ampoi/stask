<template>
  <v-app class="bg-slate-100">
    <v-app-bar
      flat class="bg-transparent backdrop-blur-md"
    >
      <template v-slot:append>
        <a
          class="border-solid border-2 py-1.5 px-3.5 rounded-full text-md font-[Montserrat]"
          href="/login"
        >Get Started</a>
      </template>
    </v-app-bar>
    <v-main>
      <main>
        <div class="text-center my-12">
          <div class="flex flex-col gap-2">
            <h1 class="text-5xl font-bold">課題管理を、もっと楽しく</h1>
            <p>Staskは学生のために特化した課題管理アプリです。<br>Staskを使うことでより能動的に課題を進めることができるようになります。</p>
            <div>
              <button
                class="bg-gradient-to-br from-orange-300 to-red-400 font-bold text-white py-2 px-4 rounded-full"
              >Get Started</button>
            </div>
          </div>
          <img src="../assets/Mockup.png" class="w-[740px] mx-auto -mt-20" oncontextmenu="return false;">
        </div>
      </main>
      <footer class="my-4">
        <p class="text-center text-gray-400 text-sm">
          created by
          <a href="https://twitter.com/4mpoi" class="underline">Ampoi</a>
          , build with Firebase
        </p>
        <p class="text-center text-gray-400 text-sm">
          The iPhone and iPad Mockups on this page were created by <a href="https://www.anthonyboyd.graphics/mockups/floating-iphone-11-pro-max-and-ipad-pro-mockup/" class="underline">anthonyboydgraphics</a>
        </p>
        <img src="../assets/logo-standard.svg" class="w-32 mx-auto mt-2" alt="">
      </footer>
    </v-main>
  </v-app>
</template>
<script>
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebaseConfig from "../data/firebaseConfig.ts"

import TaskCard from "../components/taskCard.vue"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default {
  components: {TaskCard},
  data(){return{
    updates:[],
    card:{
      title: "",
      time: 60,
      startPage: 0,
      lastPage: 12,
      nowPage: 0,
      done: true,     
      subject: 1
    },
    headerColor: true,
    subjects: [
      {index:0, title: "国語 (古文/現代文)", color:"#F44335"},
      {index:1, title: "数学 (算数)", color:"#2196F3"},
      {index:2, title: "理科 (物理/地学/生物/化学)", color:"#4BAF51"},
      {index:3, title: "社会 (公民/地理/歴史)", color:"#FFC105"},
      {index:4, title: "英語 (外国語)", color: "#E040FB"}
    ]
  }},
  async mounted(){
    const updateData = await fetch("https://api.github.com/repos/ampoi/stask/issues?labels=new-release")
      .then((res)=>res.json())
    
    this.updates = updateData.slice().reverse()
    
    window.onscroll = ()=>{
      if(window.scrollY < 480){
        this.headerColor =  true //main bg is orange
      }else{
        this.headerColor =  false //main bg is white
      }
    }
  }
}
</script>