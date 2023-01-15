<template>
  <v-card
    flat class="border-2 border-l-8 rounded-xl bg-white"
    :style="`border-color: ${borderColors[card.subject.color]}6F`"
    v-if="checkCardDone"
  >
    <v-card-item>
      <div class="flex flex-row items-center">
        <checkButton
          :done="card.done"
          :borderColor="borderColors[card.subject.color]"
          @btnClicked="card.done = !card.done"
        />
        <div class="ml-2 grow">
          <div class="flex flex-row items-center">
            <div class="basis-full">
              <v-card-title>
                <input type="text" class="w-full" placeholder="タイトルを入力..." v-model="card.title">
              </v-card-title>
              <v-card-subtitle class="sm:text-[14px] text-[16px] flex flex-row items-center gap-4">
                <div class="flex flex-row">
                  <span>所要時間</span>
                  <input
                    type="number"
                    min="1" max="999"
                    v-model="card.time"
                    class="text-right"
                  >
                  <span>分</span>
                </div>
                <div>
                  <span>期限:</span>
                  <input type="date" v-model="card.term">
                </div>
              </v-card-subtitle>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              icon
              class="m-0 text-xl bg-transparent"
              @click.stop="showSubMenu = !showSubMenu"
              flat
            >
              <v-icon v-if="showSubMenu">mdi-menu-up</v-icon> <!--詳細を表示しているとき-->
              <v-icon v-if="!showSubMenu">mdi-menu-down</v-icon> <!--詳細を隠しているとき-->
            </v-btn>
          </div>
        </div>
      </div>
      <v-expand-transition>
        <div v-if="this.showSubMenu" class="flex flex-col gap-4">
          <div class="mt-4 flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
            <div class="mx-auto flex flex-row gap-2 items-center">
              <button class="text-[12px] p-1 border-2 rounded-full border-purple-300 border-solid">
                <v-icon>mdi-check</v-icon>
              </button>
              <p>p.4 ~ p.23</p>
            </div>
            <button class="text-gray-600 bg-white rounded-md p-2">
              <v-icon>mdi-plus</v-icon>
            </button>
          </div>
          <div class="flex flex-row items-start gap-4">
            <v-select
              v-model="card.subject"
              :items="subjects"
              label="Subject"
              variant="outlined"
              item-title="title"
              item-value="color"
              density="comfortable"
              :color="colors[card.subject.color]"
              return-object
            />
            <button
              class="h-12 p-4 pt-2.5 box-border border-red-400 border-2 border-solid rounded-lg transition-all delay-200 font-bold text-red-400
                     hover:bg-red-400/50 hover:text-white"
              @click="$emit('deleteTask')">課題を削除</button>
          </div>
        </div>
      </v-expand-transition>
    </v-card-item>
  </v-card>
</template>
<script>
import checkButton from "./taskCard/checkButton.vue"

export default{
  components: {checkButton},
  props: ["card", "onlydone", "beShowed"],
  emits: ["updateData", "deleteTask"],
  data(){return{
    showSubMenu: false,
    colors: {
      blue: "light-blue",
      red: "red",
      green: "green",
      orange: "amber",
      purple: "purple"
    },
    borderColors: {
      blue: "#2196F3",
      red: "#F44335",
      green: "#4BAF51",
      orange: "#FFC105",
      purple: "#E040FB"
    },
    subjects: [
      {title: "国語 (古文/現代文)", color:"red"},
      {title: "数学 (算数)", color:"blue"},
      {title: "理科 (物理/地学/生物/化学)", color:"green"},
      {title: "社会 (公民/地理/歴史)", color:"orange"},
      {title: "英語 (外国語)", color: "purple"}
    ]
  }},
  watch: {
    card: {
      immediate: true,
      deep: true,
      handler: function () {
        this.$emit("updateData", this.card)
      }
    }
  },
  methods: {
    getNowNumber(start,now,end){
      const ue = now - start
      const sita = end - start
      return ue / sita * 100
    }
  },
  computed: {
    checkCardDone(){
      if(this.beShowed){return true}
      else{
        if(this.onlydone){return this.card.done}
        else{return !this.card.done}
      }
    }
  }
}
</script>