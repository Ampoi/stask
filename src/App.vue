<template>
  <router-view/>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap');
body{
  background: #E2E8F0;
  font-family: 'Noto Sans JP', sans-serif;
}
</style>
<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebaseConfig from "./infra/firebase/config"

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
</script>