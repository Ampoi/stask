<template>
  <v-app class="bg-gray-100">
    <Header/>
    <v-main class="pt-32 pb-20">
      <h1 class="text-5xl font-black text-center">Stask利用規約</h1>
      <Suspense>
        <template #default>
          <Article
            path="terms"
          />
        </template>
        <template #fallback>
          <Loading/>
        </template>
      </Suspense>
    </v-main>
    <v-footer>
      <Footer/>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'

import Loading from '../components/loading.vue';

import Article from '../components/article.vue'
</script>