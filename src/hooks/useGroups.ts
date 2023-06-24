import { ref, onBeforeMount } from "vue";

import { groupRepository } from "../infra/GroupRepository";

export default async ()=>{
  const groupsData = await (async (): Promise<string[]> => {
    const newGroups = await groupRepository.get()
    if(newGroups){
      return newGroups
    }else{
      return []
    }
  })()
  const groups = ref<string[]>(groupsData)

  return { groups }
}