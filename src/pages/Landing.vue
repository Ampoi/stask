<template>
    <main class="bg-gray-100">
        <Header />
        <main class="flex flex-col">
            <div class="text-center my-12">
                <div class="flex flex-col gap-4 z-10 relative">
                    <h1
                        class="text-6xl tablet:text-5xl laptop:text-6xl desktop:text-7xl font-bold leading-none">
                        課題管理を、<br class="tablet:hidden laptop:hidden desktop:hidden">もっと楽しく
                    </h1>
                    <p>Staskは学生のために特化した課題管理アプリです。<br>Staskを使うことでより能動的に課題を進めることができるようになります。</p>
                    <div>
                        <RouterLink
                            class="bg-gradient-to-bl from-orange-300 to-red-400 font-semibold text-white py-2.5 px-6 rounded-full"
                            to="/app">
                            Get Started
                        </RouterLink>
                    </div>
                </div>
                <img
                    src="../assets/Mockup.webp"
                    class="w-[880px] mx-auto -mt-20 z-0 relative"
                    oncontextmenu="return false;">
            </div>
            <div class="py-8">
                <h1 class="font-bold text-5xl tablet:text-7xl laptop:text-7xl text-center">Staskの機能</h1>
                <div class="max-w-3xl mx-auto px-4 mt-4 grid laptop:grid-cols-2 desktop:grid-cols-2 gap-4 grid-rows-1">
                    <div
                        class="bg-white laptop:h-[440px] desktop:h-[440px] tablet:h-[200px] rounded-sm laptop:relative desktop:relative flex tablet:flex-row flex-col">
                        <img
                            src="../assets/card_demo.webp"
                            class="laptop:w-full desktop:w-full laptop:absolute desktop:absolute bottom-0">
                        <div>
                            <h2 class="text-3xl font-bold text-left px-8 pt-8">学生の課題に最適な<br>カードの表示</h2>
                            <p class="px-8 pb-8 laptop:pb-0 desktop:pb-0">
                                Staskは一つ一つの課題をカードとして管理して、それらは学生が最も使いやすいようにデザインされています。</p>
                        </div>
                    </div>
                    <div
                        class="bg-white laptop:h-[440px] desktop:h-[440px] tablet:h-[200px] rounded-sm laptop:relative desktop:relative flex tablet:flex-row flex-col">
                        <img
                            src="../assets/timer_demo.webp"
                            class="laptop:w-full desktop:w-full laptop:absolute desktop:absolute bottom-0">
                        <div>
                            <h2 class="text-3xl font-bold text-left px-8 pt-8">期限を見逃さない<br>タイマーの表示</h2>
                            <p class="px-8 pb-8 laptop:pb-0 desktop:pb-0">Staskはカードとは別に期限のみを管理することもできるタイマー機能を備えています。</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </main>
</template>
<script setup lang="ts">
import Header from "../components/landing/header.vue"
import Footer from "../components/landing/footer.vue";
</script>