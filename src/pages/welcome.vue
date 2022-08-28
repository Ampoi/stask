<template>
  <v-app>
    <v-app-bar flat class="bg-slate-200">
      <template v-slot:append>
        <v-btn icon="mdi-account-circle" class="text-slate-500"/>
      </template>
    </v-app-bar>
    <v-main class="bg-slate-200">
      <div class="text-center">
        <h2 class="font-bold text-xl">ToBe</h2>
        <h1 class="text-6xl font-extrabold">The Todo app<br>that never loses sight of your goals</h1>
        <p class="max-w-2xl mt-3 mx-auto">
          <span class="whitespace-nowrap">Tobeは</span>
          <span class="whitespace-nowrap">タスクよりも</span>
          <span class="whitespace-nowrap">タスクを達成した後の</span>
          <span class="whitespace-nowrap">ゴールに主眼をおいた</span>
          <span class="whitespace-nowrap">タスク管理アプリです。</span>
          <span class="whitespace-nowrap">直感的な操作で</span>
          <span class="whitespace-nowrap">タスクを</span>
          <span class="whitespace-nowrap">より簡単に</span>
          <span class="whitespace-nowrap">管理できるように</span>
          <span class="whitespace-nowrap">なります。</span>
        </p>
        <div>
          <button
            class="bg-gradient-to-br from-sky-400 to-blue-400 py-2 px-3 font-bold text-white rounded-lg"
            @click="login"
          ><p class="drop-shadow-md">Get Started ></p></button>
        </div>
      </div>
      <img src="../assets/mockup.png" class="h-[600px] mx-auto drop-shadow-2xl">
    </v-main>
  </v-app>
</template>
<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../data/firebaseConfig.js"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export default {
  methods:{
    login(){
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          this.$router.push("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error(error)
        });
    }
  }
}
</script>