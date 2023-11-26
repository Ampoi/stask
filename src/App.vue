<template>
    <main class="bg-slate-100">
        <RouterView v-slot="{ Component }" class="max-w-xl mx-auto">
            <Suspense timeout="0">
                <div>
                    <component :is="Component"/>
                </div>
                <template #fallback>Loading...</template> <!--TODO:ローディング画面を作成する-->
            </Suspense>
        </RouterView>
    </main>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.addEventListener("dblclick", (event)=>{
        event.preventDefault()
    }, { passive: false })
})
</script>