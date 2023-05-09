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

const pages = {
  "mainPage": mainPage,
  "concentratePage": concentratePage
}
type PageName = keyof typeof pages
const nowPage = vueData<PageName>("mainPage")

const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_APIKEY
})

const router = useRouter()
onBeforeMount(()=>{
  client
    .get({
      endpoint: "stask_settings"
    })
    .then((res)=>{if(res.nowUpdating){
      console.log("updating!");
      router.push("/updating")
    }})
})
</script>