<template>
    <RouterView v-slot="{ Component }">
        <Suspense timeout="0">
            <div>
                <component :is="Component"/>
            </div>
            <template #fallback>Loading...</template> <!--TODO:ローディング画面を作成する-->
        </Suspense>
    </RouterView>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.addEventListener("dblclick", (event)=>{
        event.preventDefault()
    }, { passive: false })
})
</script>
<style>
body {
    font-family: 'Noto Sans JP';
}
</style>