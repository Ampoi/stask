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
      <div class="m-auto flex flex-col items-center pb-20"><!--全体-->
        <!--きの部分-->
        <div class="flex flex-row gap-4 items-end">
          <!--枝-->
          <div v-for="branch in trees" :key="branch.key" class="flex flex-col items-center">
            <addTaskButton @addTask="addTask(branch.cards)"/><!--旗と課題を追加するボタン-->
            <card v-for="card in branch.cards" :key="card.key" :card="card"/><!--カード-->
          </div>
        </div>
        <div class="flex flex-row">
          <div
            v-for="i of trees.length - 1" :key="i"
            class="
              h-4 w-[252px] box-content border-x-2 border-b-4 border-orange-400
              first:border-l-4 first:rounded-bl-md
              last:border-r-4 last:rounded-br-md
            "/>
        </div>
        <rootCircle/>
      </div>
    </v-main>
    <addBranchButton
      class="fixed bottom-0 w-screen"
      @clicked="addBranch"
    />
  </v-app>
</template>

<script>
import addBranchButton from './components/addBranchButton.vue';
import rootCircle from './components/rootCircle.vue'
import card from './components/card.vue'
import addTaskButton from './components/addTaskButton.vue';

export default{
  components: {
    addBranchButton,
    rootCircle,
    card,
    addTaskButton
  },
  data(){return{
    cannotScroll: true,
    trees:[
      {
        cards:[]
      }
    ]
  }},
  methods:{
    addTask(branch){
      branch.unshift({
        title: "",
        done: false
      })
    },
    addBranch(){
      this.trees.push({
        cards:[
        ]
      })
    }
  }
}
</script>