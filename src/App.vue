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
      <div class="m-auto">
        <v-card class="w-60 border-orange-400 border-4 rounded-lg shadow-lg flex flex-row h-16">
          <button
            class=" h-6 w-6 rounded-full mx-2 my-auto grid transition duration-150"
            :class="{
              'bg-orange-400 border-orange-300 border-2':trees[0].cards[0].done,
              'bg-orange-100 border-orange-400 border-2 border-solid':!trees[0].cards[0].done
            }"
            @click="trees[0].cards[0].done = !trees[0].cards[0].done"
          >
            <v-icon
              class="text-white text-[22px] m-auto"
              v-if="trees[0].cards[0].done == true">mdi-plus</v-icon>
          </button>
          <v-text-field label="Name" variant="plain" class="grow" v-model="trees[0].cards[0].title">

          </v-text-field>
        </v-card>
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
            done: true
          }
        ]
      }
    ]
  }}
}
</script>
