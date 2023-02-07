<template>
  <div class="flex flex-row overflow-x-auto gap-4">
    <div class="basis-32 p-4 bg-white rounded-xl border-[#FB923B]/50 border-2 border-solid flex flex-col items-center">
      <v-progress-circular
        model-value="100"
        color="#FDBA74"
        :size="100"
        :width="12"
      >
        <h2 class="text-4xl font-bold text-orange-400">
          32<span class="text-base">日</span>
        </h2>
      </v-progress-circular>
      <p class="text-orange-400 font-bold">期末まで</p>
    </div>
  </div>
</template>