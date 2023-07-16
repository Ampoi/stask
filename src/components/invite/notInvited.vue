<template>
    <div class="flex flex-col gap-8 items-center">
        <div class="flex flex-col gap-2 items-center">
            <h1 class="text-7xl">🤔</h1>
            <h2 class="text-2xl text-center font-semibold">このグループへは<br>招待されていません...</h2>
            <p class="text-center">招待リンクが削除されたか変更された可能性があります</p>
        </div>
        <RouterLink
            to="/"
            class="px-4 py-3 border-gray-100 border-2 rounded-md flex flex-row gap-2 items-baseline justify-center">
            <i class="bi bi-door-closed"/>
            <p>紹介ページにいく</p>
        </RouterLink>
    </div>
</template>