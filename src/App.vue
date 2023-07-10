<template>
    <RouterView v-slot="{ Component }">
        <Suspense timeout="0">
            <component :is="Component"/>
            <template #fallback>Loading...</template>
        </Suspense>
    </RouterView>
</template>
<style>
body {
    font-family: 'Noto Sans JP';
}
</style>