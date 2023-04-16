<template>
  <Suspense>
    <template #default>
      <component
        :is="pages[nowPage]"
        @movePage="nowPage = $event"
      />
    </template>
    <template #fallback>
      loading...
    </template>
  </Suspense>
</template>
<script setup lang="ts">
//vue
import { onBeforeMount, ref as vueData } from "vue";
import { useRouter } from "vue-router"

//pages
import mainPage from "./app/mainPage.vue"
import concentratePage from "./app/concentratePage.vue"

//microcms
import { createClient } from "microcms-js-sdk"

type Pages = "mainPage" | "concentratePage"
const nowPage = vueData<Pages>("mainPage")
const pages = {
  "mainPage": mainPage,
  "concentratePage": concentratePage
}

const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_APIKEY
})

onBeforeMount(()=>{
  client
    .get({
      endpoint: "stask_settings"
    })
    .then((res)=>{if(res.nowUpdating){
      console.log("updating!");
      useRouter().push("/updating")
    }})
})
</script>