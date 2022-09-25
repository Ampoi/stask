<template>
  <v-card
    flat class="border-2 border-l-8 max-w-xl mx-auto mb-4 drop-shadow-md rounded-xl bg-white/90"
    :style="`border-color: ${borderColors[card.subject.color]}6F`"
  >
    <v-card-item>
      <div class="flex flex-row items-center">
        <v-btn
          class="border-2 shadow-none bg-white/80 mt-1"
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
                <input type="text" class="w-full" placeholder="タイトルを入力...">
              </v-card-title>
              <v-card-subtitle>
                所要時間<input type="number" min="1" max="999" v-model="card.time">:分　{{card.nowPage - card.startPage}}/{{card.lastPage - card.startPage}}
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
            <span>p.<input type="number" v-model="card.startPage" min="0" :max="card.lastPage - 1"></span>
            <v-slider
              v-model="card.nowPage"
              :min="card.startPage"
              :max="card.lastPage"
              :background-color="`${colors[card.subject.color]} lighten-3`"
              :color="colors[card.subject.color]"
              thumb-label
              step="1"
            ></v-slider>
            <span>p.<input type="number" v-model="card.lastPage" :min="card.startPage + 1" max="999"></span>
          </div>
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
        </div>
      </v-expand-transition>
    </v-card-item>
  </v-card>
</template>
<script>
export default{
  props: ["card"],
  emits: ["updateData"],
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
      //console.log(this.colors[this.card.subject]);
      return ue / sita * 100
    }
  }
}
</script>