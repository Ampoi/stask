<template>
  <v-card
    flat class="border-2 border-l-8 drop-shadow-md rounded-xl bg-white/90 dark:bg-black/30 dark:text-white"
    :style="`border-color: ${borderColors[card.subject.color]}6F`"
  >
    <v-card-item>
      <div class="flex flex-row items-center">
        <v-btn
          class="border-2 shadow-none bg-white/80 mt-1 dark:bg-black/30"
          :style="`border-color: ${borderColors[card.subject.color]}6F`"
          icon
          @click="card.done = !card.done">
          <v-icon
            large
            :class="{'text-gray-200': !card.done}"
          >mdi-check</v-icon>
        </v-btn>
        <div class="ml-2 grow">
          <div class="flex flex-row items-center">
            <div class="basis-full">
              <v-card-title>
                <input type="text" class="w-full" placeholder="タイトルを入力..." v-model="card.title">
              </v-card-title>
              <v-card-subtitle class="sm:text-[14px] text-[16px]">
                所要時間<input
                  type="number"
                  min="1" max="999"
                  v-model="card.time"
                  class="text-right"
                >:分　{{card.nowPage - card.startPage}}/{{card.lastPage - card.startPage + 1}}
              </v-card-subtitle>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              icon
              class="m-0 text-xl bg-transparent"
              @click.stop="this.showSubMenu = !this.showSubMenu"
              flat
            >
              <v-icon v-if="this.showSubMenu">mdi-menu-up</v-icon> <!--詳細を表示しているとき-->
              <v-icon v-if="!this.showSubMenu">mdi-menu-down</v-icon> <!--詳細を隠しているとき-->
            </v-btn>
          </div>
          <v-progress-linear
            class="mt-2"
            :background-color="`${colors[card.subject.color]} lighten-3`"
            :color="`${colors[card.subject.color]} lighten-1`"
            :modelValue="getNowNumber(card.startPage, card.nowPage, card.lastPage)"
          ></v-progress-linear>
        </div>
      </div>
      <v-expand-transition>
        <div v-if="this.showSubMenu" class="mt-2">
          <v-divider></v-divider>
          <div class="mt-2 flex flex-row items-baseline gap-x-2 h-8">
            <span>p.<input type="number" v-model="card.startPage" min="1" :max="card.nowPage" class="sm:text-[14px] text-[16px]"></span>
            <v-slider
              v-model="card.nowPage"
              :min="card.startPage"
              :max="card.lastPage"
              :background-color="`${colors[card.subject.color]} lighten-3`"
              :color="colors[card.subject.color]"
              thumb-label
              step="1"
            ></v-slider>
            <span>p.<input type="number" v-model="card.lastPage" :min="card.startPage + 1" max="999" class="sm:text-[14px] text-[16px]"></span>
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
export default{
  props: ["card"],
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
  }
}
</script>