import { ref, onBeforeMount, watch } from "vue";

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

  watch(groups, (newData)=>{
    groupRepository.update(newData)
  }, { deep: true })

  function deleteGroupFromList(name: string){
    const index = groups.value.indexOf(name)
    groups.value.splice(index, 1)
  }

  return { groups, deleteGroupFromList }
}