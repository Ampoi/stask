<template>
  <v-banner
    lines="one"
    icon="mdi-information-outline"
    class="fixed m-2 mt-12 w-[calc(100vw-1rem)] rounded-lg z-50 bg-green-300/70 backdrop-blur-md"
  >
    <p>変更を保存しました<br>以降はこのタブを閉じることができます</p>

    <template v-slot:actions>
      <v-btn @click="$emit('saved')">閉じる</v-btn>
    </template>
  </v-banner>
</template>

<script>
export default{
  emits: ["saved"]  
}
</script>