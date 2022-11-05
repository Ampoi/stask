<template>
  <div class="w-full fixed z-20 px-4">
    <v-banner
      lines="one"
      icon="mdi-information-outline"
      class="m-2 mt-12 rounded-lg z-50 bg-green-300/70 backdrop-blur-md max-w-xl mx-auto dark:bg-black/20 dark:text-green-300 dark:border-green-300/30 border-[1px]"
    >
      <p>変更を保存しました<br>以降はこのタブを閉じることができます</p>
  
      <template v-slot:actions>
        <v-btn @click="$emit('saved')" class="dark:bg-green-300/10">閉じる</v-btn>
      </template>
    </v-banner>
  </div>
</template>

<script>
export default{
  emits: ["saved"]  
}
</script>

<style>
@media (prefers-color-scheme: dark) {
  .mdi-information-outline{
    color: #86EFAC;
  }
}
</style>