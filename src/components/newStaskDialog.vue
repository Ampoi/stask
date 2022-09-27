<template>
  <v-form class="text-center p-8 rounded-2xl">
    <v-icon class="mb-4 text-6xl" color="blue lighten-1">
      mdi-notebook-plus
    </v-icon>
    <v-list-item-title class="text-h5">
      課題を追加
    </v-list-item-title>
    <v-divider class="my-4"></v-divider>
    <v-container>
      <v-col>
        <v-text-field
          label="課題名"
          placeholder="課題名を入力してください"
          variant="underlined"
          prepend-icon="mdi-book-edit"
          v-model="newKadaiData.title"
        />
        <div class="mt-2 flex flex-row">
          <v-text-field
            label="最初のページ"
            placeholder="1~998"
            variant="underlined"
            type="number"
            v-model="newKadaiData.startPage"
            @input="this.setNowPage()"
          />
          <v-text-field
            class="ml-4"
            label="最後のページ"
            placeholder="2~999"
            variant="underlined"
            type="number"
            v-model="newKadaiData.lastPage"
          />
        </div>
        <v-text-field
          class="mt-2"
          label="所要時間(分)"
          placeholder="分で入力してください"
          variant="underlined"
          type="number"
          v-model="newKadaiData.time"
        />
        <v-select
          v-model="newKadaiData.subject"
          :items="subjects"
          label="Subject"
          variant="plain"
          item-title="title"
          item-value="color"
          return-object
        />
      </v-col>
    </v-container>
    <v-card-actions>
      <v-btn color="blue lighten-2" block @click="$emit('newKadai', this.newKadaiData)">
        <v-icon>mdi-check</v-icon>
        完了
      </v-btn>
    </v-card-actions>
  </v-form>
</template>
<script>
export default{
  data(){return{
    newKadaiData: {
      title: "",
      time: 60,
      startPage: 0,
      lastPage: 12,
      nowPage: 0,
      done: false,      
      subject: {title:"",color:""}
    },

    subjects: [
      {title: "国語 (古文/現代文)", color:"red"},
      {title: "数学 (算数)", color:"blue"},
      {title: "理科 (物理/地学/生物/化学)", color:"green"},
      {title: "社会 (公民/地理/歴史)", color:"orange"},
      {title: "英語 (外国語)", color: "purple"}
    ],
  }},
  emits: ["newKadai"],
  methods: {
    setNowPage(){
      this.newKadaiData.nowPage = this.newKadaiData.startPage
    }
  }
}
</script>