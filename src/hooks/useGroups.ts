import { ref, watch } from "vue";

import { createGroupsRepository } from "../infra/groups";
import useAuth from "./useAuth";
import useGroupSettings from "./useGroupSettings";
import useMember from "./useMember";

export default async ()=>{
    const { isLogin, getUserData } = await useAuth()
    if( !isLogin ){ throw new Error("ログインしていません！") }
    const { uid } = await getUserData()

    const groupsRepository = createGroupsRepository(uid)
    const dbGroupsData = await groupsRepository.get() ?? []
    const groups = ref<string[]>(dbGroupsData)
    const groupsData = ref<{ [key: string]: Group }>({})
    await updateGroupsData()

    async function getGroupData(groupID: string): Promise<Group> {
      const { isMember } = await useMember(groupID)
      if( !isMember ){ return false }
      const { groupSettings } = await useGroupSettings(groupID)
      const memberAmount = Object.entries(groupSettings.value.members).length
      return {
          name: groupSettings.value.name,
          memberAmount: memberAmount
      }
    }

    async function updateGroupsData(){
      console.log("aaaaa")
      await Promise.all(groups.value.map(async (groupID: string) => groupsData.value[groupID] = await getGroupData(groupID) ))
    }
  
    watch(groups, async (newData)=>{
      groupsRepository.update(newData)
      await updateGroupsData()
    }, { deep: true })

    groupsRepository.onChange((newData) => groups.value = newData.val())

    type Group = {
        name: string
        memberAmount: number
    } | false

    function addGroupToList(groupID: string){
      groups.value.push(groupID)
    }
  
    function deleteGroupFromList(groupID: string){
      const index = groups.value.indexOf(groupID)
      groups.value.splice(index, 1)      
    }
  
    return { groups, groupsData, addGroupToList, deleteGroupFromList }
  }