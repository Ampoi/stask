<template>
    <footer class="w-screen flex flex-col">
        <div class="py-8 bg-white flex flex-col gap-8 items-center">
            <div class="flex flex-row items-stretch">
                <div class="border-r-2 p-8 flex flex-col gap-2">
                    <Logo />
                    <div class="flex flex-row gap-4 font-bold">
                        <a href="https://twitter.com/search?q=%23Stask%E9%96%8B%E7%99%BA%E6%97%A5%E8%A8%98&src=typed_query&f=live">Twitter</a>
                        <a href="https://github.com/Ampoi/stask">GitHub</a>
                    </div>
                </div>
                <div class="p-8 flex flex-col gap-6">
                    <a href="/privacy_policy">プライバシーポリシー</a>
                    <a href="/terms">利用規約</a>
                    <a href="/contact">お問い合わせ</a>
                </div>
            </div>
            <p class="text-center text-gray-400 text-sm">
                The iPhone and iPad Mockups on this page were created by <a
                    href="https://www.anthonyboyd.graphics/mockups/floating-iphone-11-pro-max-and-ipad-pro-mockup/"
                    class="underline">anthonyboydgraphics</a>
            </p>
        </div>
        <div class="bg-white py-8 border-t-2 border-gray-100">
            <p class="text-center text-gray-500 text-sm">
                Copyright(C) 2023 <a href="https://twitter.com/4mpoi" class="underline">Ampoi</a>.
                All rights rserved.
            </p>
        </div>
    </footer>
</template>
<script setup lang="ts">
import Logo from './logo.vue';
</script>