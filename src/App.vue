<template>
  <v-app>
    <v-app-bar
      color="transparent"
      collapse
      flat
    >
      <v-app-bar-nav-icon>

      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="bg-slate-200 overflow-auto pt-0 grid">
      <div class="m-auto flex flex-col items-center"><!--全体-->
        <!--きの部分-->
        <div class="flex flex-row">
          <!--枝-->
          <div v-for="branch in trees" :key="branch.key">
            <!--かーど-->
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
            </div>
          </div>
        </div>
        <div class="bg-orange-400 h-12 w-12 rounded-full grid">
          <v-icon class="text-white m-auto text-[30px]">mdi-account</v-icon>
        </div>
      </div>
    </v-main>

    <v-btn
      icon="mdi-plus"
      class="fixed inset-0 mx-auto mt-auto mb-5 bg-orange-400 text-white"
    ></v-btn>
  </v-app>
</template>

<script>
export default{
  data(){return{
    trees:[
      {
        cards:[
          {
            title: "",
            done: false
          },
          {
            title: "",
            done: false
          }
        ]
      }
    ]
  }}
}
</script>
