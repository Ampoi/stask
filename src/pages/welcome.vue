<template>
  <v-app class="bg-gradient-to-bl from-sky-100 to-white">
    <v-app-bar flat class="bg-transparent backdrop-blur-md">
      <template v-slot:append>
        <a
          class="bg-gradient-to-br from-sky-400 to-blue-400 py-1.5 px-3.5 text-white rounded-full text-md font-[Montserrat]"
          href="/login"
        >Get Started</a>
      </template>
    </v-app-bar>
    <v-main>
      <div>
        <div class="text-center">
          <div class="flex flex-row items-center justify-center">
            <img src="../assets/Icon.svg" class="h-5">
            <h2 class="font-bold text-xl">Stask</h2>
            <p class="font-bold ml-2 border-l-2 pl-2 border-black/30">Version 1.1 has been released 🎉</p>
          </div>
          <h1 class="lg:text-7xl md:text-6xl text-5xl font-black font-[Montserrat]">Todo app<br>optimized for study</h1>
          <p class="max-w-2xl mt-3 mx-auto">
            <span class="whitespace-nowrap">Staskは</span>
            <span class="whitespace-nowrap">日々多くの</span>
            <span class="whitespace-nowrap">課題に追われる</span>
            <span class="whitespace-nowrap">学生に</span>
            <span class="whitespace-nowrap">寄り添った</span>
            <span class="whitespace-nowrap">Todoアプリです。</span><br>
            <span class="whitespace-nowrap">Staskを</span>
            <span class="whitespace-nowrap">使うことで</span>
            <span class="whitespace-nowrap">今ある課題を</span>
            <span class="whitespace-nowrap">よりわかりやすく</span>
            <span class="whitespace-nowrap">一覧で</span>
            <span class="whitespace-nowrap">確認することが</span>
            <span class="whitespace-nowrap">できます。</span>
          </p>
          <div class="mt-4">
            <a
              class="bg-gradient-to-br from-sky-400 to-blue-400 py-2 px-4 text-white rounded-full font-[Montserrat]"
              href="/login"
            >Get Started</a>
            <a
              class="border-sky-500 border-solid border-2 py-2 px-4 text-sky-500 rounded-full font-[Montserrat] ml-2"
              href="https://github.com/Ampoi/Stask"
            >GitHub</a>
          </div>
        </div>
        <img src="../assets/mockup.png" class="h-[600px] mx-auto drop-shadow-2xl mt-4">
        <div class="max-w-xl mx-auto px-4 mt-16 flex flex-col gap-2">
          <h2 class="text-4xl font-bold">学習に特化したUI</h2>
          <p>Staskでは課題をカードとして管理します。カードにはページ数の指定や所要時間の表示など、学習に特化したUIが多くあります。</p>
          <TaskCard
            class="w-full"
            :card="card"
            :onlydone="true"
            :beShowed="true"
          />
        </div>
        <div class="max-w-xl mx-auto px-4 mt-4 flex flex-col gap-4">
          <div class="bg-white/50 p-4 rounded-lg border-white/10">
            <h1 class="text-3xl font-bold">✨ 特徴</h1>
            <p>Staskは一般的なタスク管理アプリとは違い、学習のために最適化したタスク管理アプリとなっています。学生が開発しているため課題管理のために必要な機能が全て揃っています。</p>
            <p>また、アップデートは個人開発のため不定期ですがユーザーからの意見はすぐに反映されやすいです。意見や要望がある場合はGithub Issuesからお聞かせください。</p>
          </div>
          <div class="bg-white/50 p-4 rounded-lg border-white/10">
            <h1 class="text-3xl font-bold">🚀 アップデート予定のもの</h1>
            <p>近日反映予定のアップデートです。Github Issueで管理していますのでご意見があればぜひ投稿してください。</p>
            <div class="flex flex-col gap-4 mt-4">
              <div
                v-for="update in updates"
                :key="update.key"
                class="bg-white p-4 border-2 border-white/10 rounded-xl"
              >
                <h1 class="font-bold text-xl">#{{update.number}} | {{update.title}}</h1>
                <a
                  :href="update.html_url"
                  class="text-sm text-black/40"
                >このアップデートについて詳しく見る(Github) ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="my-4">
        <p class="text-center text-gray-400 text-sm">
          created by
          <a href="https://twitter.com/4mpoi" class="underline">Ampoi</a>
          , build with Firebase
        </p>
        <img src="../assets/logo-standard.svg" class="w-32 mx-auto mt-2" alt="">
      </footer>
    </v-main>
  </v-app>
</template>
<script>
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebaseConfig from "../data/firebaseConfig.js"

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
    }
  }},
  async mounted(){
    const updateData = await fetch("https://api.github.com/repos/ampoi/stask/issues?labels=new-release")
      .then((res)=>res.json())
    
    this.updates = updateData.slice().reverse()
  }
}
</script>