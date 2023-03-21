<template>
  <div class="w-full fixed z-20 px-4">
    <v-banner
      lines="one"
      icon="mdi-information-outline"
      class="m-2 mt-12 rounded-lg z-50 bg-green-300/70 backdrop-blur-md max-w-xl mx-auto border-[1px]"
    >
      <p>変更を保存しました<br>以降はこのタブを閉じることができます</p>
  
      <template v-slot:actions>
        <v-btn @click="$emit('saved')">閉じる</v-btn>
      </template>
    </v-banner>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "saved"): void
}>()
</script>