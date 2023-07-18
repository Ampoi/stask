import { ref, watch } from "vue";

import { createGroupsRepository } from "../infra/groups";
import useAuth from "./useAuth";

export default async ()=>{
    const { isLogin, getUserData } = await useAuth()
    if( !isLogin ){ throw new Error("ログインしていません！") }
    const { uid } = await getUserData()

    const groupsRepository = createGroupsRepository(uid)
    const groupsData = await groupsRepository.get() ?? []
  
    const groups = ref<string[]>(groupsData)
  
    watch(groups, (newData)=>{
      groupsRepository.update(newData)
    }, { deep: true })
  
    function deleteGroupFromList(name: string){
      const index = groups.value.indexOf(name)
      groups.value.splice(index, 1)
    }
  
    return { groups, deleteGroupFromList }
  }