<template>
  <v-card
    flat class="border-2 border-l-8 rounded-xl bg-white relative select-none"
    :class="{'shadow-lg shadow-orange-400/30': (getCardType == 'concentrate')}"
    :style="`
      border-color:${subjectColor}6F;
      transform: scale(${1 + ((pressTime/100)**4)/2});
    `"
    v-if="checkCardType"
    oncontextmenu="return false;"
  >
    <div
      @touchstart="startLongPress"
      @touchend="finishLongPress"
    >
      <v-card-item>
        <div class="flex flex-row items-center">
          <!--達成ボタン-->
          <CheckButton
            v-model:done="personalCard.done"
            :borderColor="subjectColor"
          />
          <!--右側-->
          <div class="ml-2 grow">
            <div class="flex flex-row items-center">
              <div class="basis-full">
                <v-card-title>
                  <input
                    type="text"
                    class="w-full"
                    placeholder="タイトルを入力..."
                    v-model="sharedCard.title"
                    :disabled="!permissions.card.edit">
                </v-card-title>
                <v-card-subtitle class="sm:text-[14px] text-[16px] flex sm:flex-row flex-col sm:items-center sm:gap-4">
                  <div class="flex flex-row">
                    <span>所要時間</span>
                    <input
                      type="number"
                      min="1" max="999"
                      v-model="sharedCard.time"
                      class="text-right"
                      :disabled="!permissions.card.edit"
                    >
                    <span>分</span>
                  </div>
                  <div>
                    <span>期限:</span>
                    <input type="date" v-model="sharedCard.term" :disabled="!permissions.card.edit">
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
        <v-progress-linear
          :model-value="pagePercent"
          class="mt-2 rounded-full"
          :color="`${subjectColor}6F`"
        />
        <v-expand-transition>
          <div v-if="showSubMenu" class="flex flex-col gap-4">
            <div class="mt-4 flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
              <!--ページ-->
              <div
                class="mx-auto flex flex-row gap-2 items-center"
                v-for="(page, pageIndex) in sharedCard.pages"
                :key="pageIndex"
              >
                <button
                  class="text-[12px] p-1 border-2 rounded-full border-solid"
                  :style="`border-color: ${subjectColor}${personalCard.pages[pageIndex].done ? '6F' : '00'};`"
                  :class="{'text-white': personalCard.pages[pageIndex].done, 'text-black/20': !personalCard.pages[pageIndex].done}"
                  @click="personalCard.pages[pageIndex].done = !personalCard.pages[pageIndex].done"
                  :disabled="!permissions.card.edit"
                >
                  <v-icon>mdi-check</v-icon>
                </button>
                <p>
                  p.
                  <input
                    type="number"
                    class="w-12"
                    v-model="page.startPage"
                    min="1"
                    :max="page.lastPage-1"
                    :disabled="!permissions.card.edit"
                  >
                  ~
                  p.
                  <input
                    type="number"
                    class="w-12"
                    v-model="page.lastPage"
                    :min="page.startPage+1"
                    max="999"
                    :disabled="!permissions.card.edit"
                  >
                </p>
                <button
                  class="text-sm text-red-300/80 border-solid"
                  @click="deletePage(pageIndex)"
                  :disabled="!permissions.card.edit"
                >
                  <v-icon>mdi-trash-can</v-icon>
                </button>
              </div>
              <!--ページの追加ボタン-->
              <button
                class="text-gray-600 bg-white rounded-md p-2"
                @click="addPage"
              >
                <v-icon>mdi-plus</v-icon>
              </button>
            </div>
            <div class="flex flex-row items-start gap-4">
              <v-select
                v-model="sharedCard.subject"
                :items="subjects"
                label="Subject"
                variant="outlined"
                item-title="title"
                item-value="index"
                density="comfortable"
                :color="subjectColor + '6F'"
                :disabled="!permissions.card.edit"
              />
              <button
                class="h-12 grid place-content-center px-2 box-border border-orange-400 border-2 border-solid rounded-lg transition-all delay-200 font-bold
                        hover:bg-orange-300/80 hover:text-white"
                :class="{'text-orange-400 bg-white': !personalCard.concentrate, 'text-white bg-orange-400': personalCard.concentrate}"
                @click="turnConcentrate(getCardType)"
                title="課題を今やることに設定する"><v-icon>mdi-fire</v-icon></button>
              <button
                class="h-12 grid place-content-center px-2 box-border border-red-400 border-2 border-solid rounded-lg transition-all delay-200 font-bold text-red-400
                        hover:bg-red-400/50 hover:text-white"
                @click="emit('deleteTask')"
                title="課題を今やることに設定する"
                :disabled="!permissions.card.delete"><v-icon>mdi-trash-can</v-icon></button>
            </div>
          </div>
        </v-expand-transition>
      </v-card-item>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import CheckButton from "./taskCard/checkButton.vue"

import { computed, onMounted, ref as vueData, watch } from "vue"

import { GroupPersonalCard, GroupSharedCard } from "../model/groupCards"
import { Subject } from "../model/personalSettings"
import { Permissions } from "../model/groupSettings"

type CardType = "done" | "incomplete" | "concentrate"

const props = defineProps<{
  permissions: Permissions["admin" | "member"], //TODO: この部分の権限の階級を型にして統一したい
  sharedCard: GroupSharedCard,
  personalCard: GroupPersonalCard,
  showCardType: CardType,
  subjects: Subject[]
}>()

/*const emit = defineEmits<{
  (e:"update:card", card: Card): void,
  (e: "deleteTask"): void
}>()*/

const showSubMenu = vueData(false)
/*
watch(props.card, ()=>{
  emit("update:card", props.card)
}, {deep: true, immediate: true})

*/function addPage(){/*
  props.card.pages.push({
    startPage: 1,
    lastPage: 2,
    done: false
  })
*/}/*

*/function deletePage(index: number){/*
  props.card.pages.splice(index, 1)
*/}/*
*/
function getSubjectColor(subject: number): string{
  if(props.subjects[subject] != undefined){
    return props.subjects[subject].color
  }else{
    return "#E7E8E7"
  }
}
const subjectColor = getSubjectColor(props.sharedCard.subject)

const getCardType = computed(()=>{
  if( props.personalCard.done == false && props.personalCard.concentrate == true){
    return "concentrate"
  }else if(props.personalCard.done == false){
    return "incomplete"
  }else{
    return "done"
  }
})

const checkCardType = computed(()=>{
  const cardType = getCardType.value
  return (cardType == props.showCardType)
})

const pagePercent = computed((): number => {
  const sharedPages = props.sharedCard.pages
  const personalPages = props.personalCard.pages
  let allPagesAmount = 0
  let donePagesAmount = 0

  let counter = 0
  sharedPages?.forEach((page)=>{
    const pageAmount = page.lastPage - page.startPage + 1
    
    allPagesAmount += pageAmount
    if(personalPages[counter].done){donePagesAmount += pageAmount}
    
    counter++;
  })
  const percent = allPagesAmount != 0 ? Math.ceil(donePagesAmount / allPagesAmount * 100) : 0
  
  return percent
})/*

*/function turnConcentrate(type: CardType){/*
  if(type == "incomplete"){
    props.card.concentrate = true
  }else if(type == "concentrate"){
    props.card.concentrate = false
  }
*/}/*
*/
let pressTimer: number
let addPressTime: number
const pressTime = vueData<number>(0)

function startLongPress(){/*
  pressTimer = setTimeout(()=>{

    addPressTime = setInterval(()=>{
      pressTime.value += 2  
      if(pressTime.value >= 50){
        const cardType = getCardType
        turnConcentrate(cardType.value)
        finishLongPress()
      }
    }, 1)

    clearTimeout(pressTimer)
  }, 200)*/
}/*

*/function finishLongPress(){/*
  clearTimeout(pressTimer)
  clearInterval(addPressTime)
  pressTime.value = 0*/
}/*

onMounted(()=>{
  if(props.card.pages == undefined){
    props.card.pages = []
  }
  if(typeof(props.card.subject) != "number"){
    props.card.subject = 1
  }
})*/
</script>