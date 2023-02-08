<template>
  <div class="bg-gray-100 w-screen h-screen grid place-content-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold pb-4">Updating...</h1>
      <p>Staskをより良いアプリにするためにご協力お願いします。</p>
      <p>アップデート予定時間: 10分</p>
      <button
        class="py-3 px-5 mt-4 mx-auto rounded-full duration-300 hover:bg-white border-white border-2 border-solid block"
        @click="goToWelcome"
      >Staskトップへ戻る</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToWelcome(){
      this.$router.push("/welcome")
    }
  }
}
</script>