<template>
  <v-dialog v-model="showSettings">
    <div class="px-4 py-6 bg-white rounded-md relative">
      <!--保存ボタン-->
      <button
        class="p-4 rounded-all bg-orange-200 border-2 border-orange-300 border-solid rounded-full absolute right-4 top-6"
        @click="$emit('saveSettings')"
      >
        <v-icon>mdi-content-save</v-icon>
      </button>

      <h1 class="text-3xl font-bold mb-2">設定</h1>
      <h2 class="text-xl">教科の設定</h2>
      <p>課題をまとめる教科の色や名前の設定を変更します。</p>
      <div class="p-4 my-2 bg-orange-100 border-orange-200 border-2 border-solid rounded-md flex flex-row items-center gap-4">
        <v-icon>mdi-alert-outline</v-icon>
        <p class="text-sm">設定項目の数を減らしたり順番を変えたりすると課題の表示に影響が出る場合があります。</p>
      </div>
      <div class="bg-gray-100 p-4 flex flex-col gap-4 items-center">
        <div
          class="flex flex-row items-center gap-2"
          v-for="(subject, subIndex) in settings.subjects"
          :key="subIndex"
        >
          <button
            class="rounded-full h-6 w-6"
            :style="`background-color: ${subject.color}6F;`"
            @click="$emit('getSubjectColor', subIndex)"
          />
          <input type="text" v-model="subject.title">
          <button
            class="rounded-full h-6 w-6 duration-300 hover:bg-white/70 text-[14px] text-red-400/60 grid place-content-center"
            @click="$emit('deleteSubject', subIndex)"
          ><v-icon>mdi-trash-can</v-icon></button>
        </div>
        <button
          class="text-gray-600 bg-white rounded-md p-2 w-full"
          @click="$emit('addSubject')"
        >
          <v-icon>mdi-plus</v-icon>
        </button>
      </div>
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: ["showSettings", "settings"],
  emits: ["saveSettings", "getSubjectColor", "deleteSubject", "addSubject"]
}
</script>