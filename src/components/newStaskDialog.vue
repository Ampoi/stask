<template>
  <v-form class="text-center p-8 rounded-2xl">
    <v-icon class="mb-4 text-6xl">
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
          placeholder="10文字以内"
          variant="underlined"
          prepend-icon="mdi-book-edit"
          v-model="newKadaiData.title"
        ></v-text-field>
        <div class="mt-2 flex flex-row">
          <v-text-field
            label="最初のページ"
            placeholder="1~998"
            variant="underlined"
            type="number"
            v-model="newKadaiData.startPage"
            @input="this.setNowPage()"
          ></v-text-field>
          <v-text-field
            class="ml-4"
            label="最後のページ"
            placeholder="2~999"
            variant="underlined"
            type="number"
            v-model="newKadaiData.lastPage"
          ></v-text-field>
        </div>
        <v-text-field
          class="mt-2"
          label="所要時間(分)"
          placeholder="分で入力してください"
          variant="underlined"
          type="number"
          v-model="newKadaiData.time"
        ></v-text-field>
        <v-radio-group v-model="newKadaiData.selectedSubject">
          <v-radio
            color="red-4"
            v-for="(subject, subjectID) in subjects"
            :key="subjectID"
            :label="subject.name"
            :value="subjectID"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-container>
    <v-card-actions>
      <v-btn color="primary" block @click="$emit('newKadai', this.newKadaiData)">
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
      title: "Apapa",
      time: 400,
      startPage: 10,
      lastPage: 100,
      nowPage: 10,
      subject: "math",
      showSubMenu: false,
      done: false,      
      selectedSubject: 0,
    },

    subjects: [
      {name:"aaa",color:""}
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