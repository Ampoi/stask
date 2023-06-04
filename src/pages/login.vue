<template>
  <v-app class="bg-gray-100">
    <Header/>
    <v-main class="text-center pt-32 pb-20">
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
    <v-footer>
      <Footer/>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { getAuth, GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

import Header from "../components/header.vue"
import Footer from "../components/footer.vue";

import firebaseConfig from "../infra/firebase/config"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const provider = {
  "google": new GoogleAuthProvider(),
  "twitter": new TwitterAuthProvider()
}

const router = useRouter()

function login(loginProvider: "google"|"twitter"){
  const useProvider: GoogleAuthProvider | TwitterAuthProvider | undefined = provider[loginProvider]
  if(useProvider != null){
    signInWithPopup(auth, useProvider)
      .then((result) => {
        router.push("/")
      })
      .catch((error) => {
        console.error(error)
      });
  }else{
    console.error("selected provider is unexpected");
  }
}
</script>
