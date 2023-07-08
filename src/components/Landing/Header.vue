<template>
    <v-app-bar flat class="bg-transparent px-8 py-3">
      <div class="w-[800px] mx-auto flex flex-row items-center gap-2 justify-between">
        <a href="/welcome">
          <Logo/>
        </a>
        <a
          class="bg-gradient-to-bl from-orange-300 to-red-400 font-bold text-white py-2.5 px-6 rounded-full"
          href="/login"
        >Get Started</a>
      </div>
    </v-app-bar>
  </template>
  <script setup lang="ts">
  import Logo from '../Logo.vue';
  </script>