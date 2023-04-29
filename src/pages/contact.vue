<template>
  <v-app class="bg-gray-100">
    <Header/>
    <v-main class="text-center pt-32 pb-20">
      <h1 class="text-5xl font-black">お問い合わせ</h1>
      <p class="text-sm pt-2">Staskで発生したバグ・改善をお問い合わせください</p>
      
      <div class="flex flex-col mt-8 gap-4 max-w-xl mx-auto
                  desktop:flex-row desktop:items-center desktop:max-w-[calc(864px+2rem)]">
        <div class="px-4 py-8 rounded-md bg-white flex flex-col desktop:basis-[400px]">
          <h2 class="text-3xl font-bold">お問い合わせフォーム</h2>
          <p>バグの報告や改善案を送りたい場合は<br>以下のお問い合わせフォームから送信してください</p>
          <iframe :src="googleFormURL" height="400" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
        </div>
        <p class="text-gray-500">もしくは</p>
        <div class="px-4 py-8 rounded-md bg-white flex flex-col desktop:basis-[400px]">
          <h2 class="text-3xl font-bold">Discordサーバー</h2>
          <p>継続的にバグの報告・新機能の案を送りたい場合は<br>Discordサーバーでお聞かせください</p>
          <a
            :href="discordInviteURL"
            class="mt-2 underline"
          >Discordサーバー</a>
        </div>
      </div>
    </v-main>
    <v-footer>  
      <Footer/>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../infra/firebase/config"

import Header from "../components/header.vue"
import Footer from "../components/footer.vue";

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const discordInviteURL = import.meta.env.VITE_DISCORD_INVITE_URL
const googleFormURL = import.meta.env.VITE_GOOGLE_FORM_URL
</script>