<template>
    <div class="bg-gray-100 w-screen h-screen px-6 box-border relative">
        <component :is="Group"/>
        <NavBar class="absolute"/>
    </div>
</template>
<script setup lang="ts">
import NavBar from "../components/App/NavBar.vue"

import Group from "../components/App/Group.vue"
</script>