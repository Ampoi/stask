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
  
    watch(groups, (newData)=>{
      groupsRepository.update(newData)
    }, { deep: true })

    type Group = {
        name: string
        memberAmount: number
    } | false
    
    
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
    const groupsData = await (async () => {
        let newGroupsData: { [key: string]: Group } = {}
        await Promise.all(groups.value.map(async (groupID: string) => newGroupsData[groupID] = await getGroupData(groupID) ))
        return newGroupsData
    })()
  
    function deleteGroupFromList(name: string){
      const index = groups.value.indexOf(name)
      groups.value.splice(index, 1)
    }
  
    return { groups, groupsData, deleteGroupFromList }
  }