<template>
  <v-app class="bg-gradient-to-bl from-sky-100 to-white">
    <v-app-bar flat class="bg-transparent backdrop-blur-md px-16">
      <a class="flex flex-row items-center justify-center" href="/">
        <img src="../assets/Icon.svg" class="h-5">
        <h2 class="font-bold text-xl">Stask</h2>
      </a>
    </v-app-bar>
    <v-main class="text-center pt-32">
      <div>
        <h1 class="text-5xl font-black">Login / CreateAccount</h1>
        <p class="text-sm pt-2">Staskをご利用していただきありがとうございます！</p>
      </div>
      <div class="flex flex-col max-w-[264px] mx-auto mt-4 gap-4">
        <button
          class="p-3 mx-[12px] text-lg rounded-lg border-red-400 border-2 border-solid text-red-400 font-bold"
          @click="login('google')"
        >Googleでログイン</button>
        <button
          class="p-3 mx-[12px] text-lg rounded-lg border-blue-400 border-2 border-solid text-blue-400 font-bold"
          @click="login('twitter')"
        >Twitterでログイン</button>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { getAuth, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebaseConfig from "../data/firebaseConfig.js"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export default {
  methods:{
    login(loginProvider){
      let useProvider
      switch(loginProvider){
        case "google":
          useProvider = googleProvider
          break;
        case "twitter":
          useProvider = twitterProvider
          break;
        default:
          break;
      }
      signInWithPopup(auth, useProvider)
        .then((result) => {
          this.$router.push("/")
        })
        .catch((error) => {
          console.error(error)
        });
    }
  }
}
</script>
