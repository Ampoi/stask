<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-5xl font-bold">学校</h1>
        <Section title="カウントダウン一覧">
            <div class="h-40 flex flex-row items-stretch gap-4 overflow-x-auto">
                <AddCountdownButton @click=""/>
                <Countdown :daysLeft="80"/>
            </div>
        </Section>
        <Section title="課題一覧">
            <div class="w-full h-20 bg-white/80 rounded-xl">
                aaa
            </div>
        </Section>
    </div>
</template>
<script setup lang="ts">
import Section from "./Group/Section.vue"

import AddCountdownButton from "./Group/AddCountdownButton.vue"
import Countdown from "./Group/Countdown.vue"
</script>