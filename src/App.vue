<template>
  <v-app>
    <v-app-bar
      color="transparent"
      collapse
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="bg-slate-200 overflow-auto grid">
      <div class="m-auto flex flex-col items-center p-10"><!--全体-->
        <!--きの部分-->
        <div class="flex flex-row gap-4 items-end">
          <!--枝-->
          <div v-for="branch in trees" :key="branch.key" class="flex flex-col items-center">
            <div class="flex flex-col items-center">
              <div class="bg-orange-400 h-12 w-12 rounded-full grid">
                <v-icon class="text-white m-auto text-[30px]">mdi-flag</v-icon>
              </div>
              <div class="h-2 w-1 bg-orange-400"/>
              <button
                class="border-4 border-solid border-orange-400 bg-orange-300 hover:bg-orange-400 transition py-1 px-2 rounded-full flex flex-row gap-1 items-center"
                @click="addTask(branch.cards)">
                <v-icon class="text-white m-auto text-md">mdi-plus</v-icon>
                <p class="text-sm font-bold text-white drop-shadow-md">新規タスク</p>
              </button>
              <div class="h-2 w-1 bg-orange-400"/>
            </div><!--追加ボタン-->
            <div
              class="flex flex-col items-center"
              v-for="card in branch.cards" :key="card.key"
            >
              <v-card class="w-60 border-orange-400 border-4 rounded-lg shadow-lg flex flex-row h-16">
                <button
                  class=" h-6 w-6 rounded-full mx-2 my-auto grid transition duration-150"
                  :class="{
                    'bg-orange-400 border-orange-300 border-2':card.done,
                    'bg-orange-100 border-orange-400 border-2 border-solid':!card.done
                  }"
                  @click="card.done = !card.done"
                >
                  <v-icon
                    class="text-white text-[18px] m-auto"
                    v-if="card.done == true">mdi-check</v-icon>
                </button>
                <v-text-field label="Name" variant="plain" class="grow" v-model="card.title"/>
              </v-card>
              <div class="h-4 w-1 bg-orange-400"/>
            </div><!--カード-->
          </div>
        </div>
        <rootCircle/>
      </div>
    </v-main>
    <addButton class="fixed bottom-0 w-screen"/>
  </v-app>
</template>

<script>
import addButton from './components/addButton.vue';
import rootCircle from './components/rootCircle.vue'
export default{
  components: {
    addButton,
    rootCircle
  },
  data(){return{
    cannotScroll: true,
    trees:[
      {
        cards:[
          {
            title: "1",
            done: false
          }
        ]
      },
      {
        cards:[
          {
            title: "1",
            done: false
          }
        ]
      }
    ]
  }},
  methods:{
    addTask(branch){
      branch.unshift({
        title: "",
        done: false
      })
    }
  }
}
</script>