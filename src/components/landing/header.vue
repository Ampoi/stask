<template>
    <div class="px-4 py-6">
        <div class="max-w-[800px] mx-auto flex flex-row items-center gap-2 justify-between">
            <RouterLink to="/">
                <Logo />
            </RouterLink>
            <RouterLink
                class="bg-gradient-to-bl from-orange-300 to-red-400 font-semibold text-white py-2.5 px-6 rounded-full"
                to="/app">
                Get Started
            </RouterLink>
        </div>
    </div>
</template>
<script setup lang="ts">
import Logo from './logo.vue';
</script>