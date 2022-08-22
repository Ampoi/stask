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
        <h1 class="text-6xl font-black">The Todo app<br>that never loses sight of your goals</h1>
      </div>
      <img src="../assets/mockup.png" class="h-[600px] mx-auto drop-shadow-2xl">
    </v-main>
  </v-app>
</template>