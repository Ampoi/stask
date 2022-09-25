<template>
  <v-app class="bg-gradient-to-bl from-sky-100 to-white">
    <v-app-bar flat class="bg-transparent backdrop-blur-md">
      <template v-slot:append>
        <button
          class="bg-gradient-to-br from-sky-400 to-blue-400 py-1.5 px-3.5 text-white rounded-full text-md font-[Montserrat]"
          @click="login"
        >Get Started</button>
      </template>
    </v-app-bar>
    <v-main>
      <div>
        <div class="text-center">
          <div class="flex flex-row items-center justify-center">
            <img src="../assets/Icon.svg" class="h-5">
            <h2 class="font-bold text-xl">ToBe</h2>
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
          <div class="mt-2">
            <button
              class="bg-gradient-to-br from-sky-400 to-blue-400 py-2 px-4 text-white rounded-full font-[Montserrat]"
              @click="login"
            >Get Started</button>
            <a
              class="border-sky-500 border-solid border-2 py-2 px-4 text-sky-500 rounded-full font-[Montserrat] ml-2"
              href="https://github.com/Ampoi/Stask"
            >GitHub</a>
          </div>
        </div>
        <img src="../assets/mockup.png" class="h-[600px] mx-auto drop-shadow-2xl">
      </div>
      <footer class="my-4">
        <p class="text-center text-gray-400 text-sm">
          created by
          <a href="https://twitter.com/4mpoi">Ampoi</a>
          , build with Firebase
        </p>
        <img src="../assets/logo-standard.svg" class="w-32 mx-auto mt-2" alt="">
      </footer>
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