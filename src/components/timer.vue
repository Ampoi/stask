<template>
  <button class="flex flex-row overflow-x-auto gap-4" @click="getDateModal = true">
    <div class="basis-32 p-4 bg-white rounded-xl border-[#FB923B]/50 border-2 border-solid flex flex-col items-center">
      <v-progress-circular
        model-value="100"
        color="#FDBA74"
        :size="100"
        :width="12"
      >
        <h2 class="text-4xl font-bold text-orange-400">
          {{getDaysLeft}}<span class="text-base">日</span>
        </h2>
      </v-progress-circular>
      <p class="text-orange-400 font-bold">期末まで</p>
    </div>
  </button>
  <v-dialog v-model="getDateModal">
    <div class="px-4 py-6 bg-white rounded-md max-w-xl">
      <h1 class="text-3xl font-bold mb-2">タイマーの設定</h1>
      <h2 class="text-xl">終了日時の設定</h2>
      <p>タイマーの期限を設定します。</p>
      <div class="bg-gray-100 p-4 rounded-md text-center">
        <input
          type="date"
          class="p-2 rounded-md"
          :value="modelValue"
          @input="updateDate($event.target.value)"
        >
      </div>
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data(){return{
    getDateModal: false
  }},
  methods: {
    updateDate(newDate){
      this.$emit("update:modelValue", newDate)
    }
  },
  computed: {
    getDaysLeft(){
      const today = new Date()
      const term = new Date(this.modelValue)
      return Math.ceil((term - today) / 86400000)
    }
  }
}
</script>