<template>
    <main class="grid place-content-center h-screen">
        <div class="max-w-xl text-center mx-4 flex flex-col items-center gap-4">
            <div>
                <h1 class="text-8xl font-semibold">404</h1>
                <p>お探しのページ「{{ route.params.catchAll }}」は見つかりませんでした</p>
            </div>
            <RouterLink
                to="/"
                class="px-4 py-3 border-gray-100 border-2 rounded-md flex flex-row gap-2 items-baseline justify-center">
                <i class="bi bi-door-closed"/>
                <p>紹介ページにいく</p>
            </RouterLink>
        </div>
    </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
</script>