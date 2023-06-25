<template>
  <div class="flex flex-col mx-auto px-4 gap-8 max-w-xl">
    <!--<div class="flex flex-col gap-4">
      <p class="text-black font-bold">期限一覧</p>
      <div class="h-40 flex flex-row gap-4">
        <button
          class="p-4 rounded-lg duration-300 hover:bg-white/70"
          @click="addTimer"
        >
          <v-icon class="text-2xl">mdi-plus</v-icon>
        </button>
        <div class="h-40 flex flex-row gap-4 overflow-x-auto">
          <TermTimer
            v-for="(_timer, index) in timers"
            :key="index"
            v-model="timers[index]"
            @deleteTimer="deleteTimer(index)"
          />
        </div>
      </div>
    </div>-->
    <div class="flex flex-col gap-4">
      <div class="flex flex-row justify-between text-black font-bold">
        <p class="text-black font-bold items-center flex flex-row"><v-icon>mdi-fire</v-icon>今やるタスク</p>
        <!--<button
          @click="startConcentrateMode()"
        >集中モードを開始する</button>-->
      </div>
      <GroupTaskCard
        v-for="(_card, cardIndex) in groupSharedCards"
        :key="cardIndex"
        :permissions="permissions"
        :subjects="groupSettings.subjects"
        v-model:card="groupSharedCards[cardIndex]"
        @deleteTask="deleteGroupSharedCard(cardIndex)"
        showCardType="concentrate"
        :groupID="groupID"
      />
    </div>

    <div class="flex flex-col gap-4">
      <p class="text-black font-bold">未達成のタスク</p>
      <GroupTaskCard
        v-for="(_card, cardIndex) in groupSharedCards"
        :key="cardIndex"
        :permissions="permissions"
        :subjects="groupSettings.subjects"
        v-model:card="groupSharedCards[cardIndex]"
        @deleteTask="deleteGroupSharedCard(cardIndex)"
        showCardType="incomplete"
        :groupID="groupID"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 text-black font-bold">
        <p>達成済みのタスク</p>
        <v-spacer/>
        <button @click.stop="showDoneCards = !showDoneCards">
          <v-icon v-if="showDoneCards">mdi-menu-up</v-icon>
          <v-icon v-if="!showDoneCards">mdi-menu-down</v-icon>
        </button>
      </div>
      <v-expand-transition>
        <div v-if="showDoneCards" class="flex flex-col gap-4">
          <GroupTaskCard
            v-for="(_card, cardIndex) in groupSharedCards"
            :key="cardIndex"
            :permissions="permissions"
            :subjects="groupSettings.subjects"
            v-model:card="groupSharedCards[cardIndex]"
            @deleteTask="deleteGroupSharedCard(cardIndex)"
            showCardType="done"
            :groupID="groupID"
            class="opacity-50"
          />
        </div>
      </v-expand-transition>
    </div>
  </div>

  <GroupSettings v-model:showSettings="showGroupSettings" :groupID="groupID"/>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGroupSettings } from '../../../hooks/useSettings';
import { useRouter } from 'vue-router';

import { useGroupSharedCards } from "../../../hooks/useCards"
import useAuth from '../../../hooks/useAuth';

import { groupRepository } from '../../../infra/GroupRepository';

import GroupTaskCard from '../../../components/groupTaskCard.vue';
import GroupSettings from "../../../components/groupSettings.vue"

const showDoneCards = ref<boolean>(false)

const router = useRouter()

//URLからグループのID取得
const url = new URL(window.location.href)
const params = url.searchParams
const groupID = ((new_group_id) => {
  if(new_group_id){
    return new_group_id
  }else{
    throw new Error("group_idがnullだよ！！")
  }
})(params.get("group"))

const { uid } = await useAuth()

const { groupSettings } = await useGroupSettings(groupID, router)
const { groupSharedCards, deleteGroupSharedCard, addGroupSharedCard } = await useGroupSharedCards(groupID)

const userRole = groupSettings.value.users[uid].role
const permissions = groupSettings.value.permissions[userRole]

const showGroupSettings = ref(false)
watch(showGroupSettings, (newData)=>{
  if(newData == false){ window.location.reload() }
})

const groups = await groupRepository.get()
if( !groups ){
    groupRepository.set([groupID])
}else if(!groups.includes(groupID)){
    groupRepository.update({ ...groups, ...{ [groups.length]: groupID } })
}

function openSettings(){
  showGroupSettings.value = true
}

function addCard(){addGroupSharedCard()}

defineExpose({ addCard, openSettings })
</script>