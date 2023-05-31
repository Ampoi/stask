import { ref, onBeforeMount } from "vue";

import { Group } from "../model/groups";
import { groupRepository } from "../infra/GroupRepository";

export default ()=>{
  const groups = ref<Group[]>([])

  onBeforeMount(async ()=>{
    groupRepository.get
      .then((newData)=>{
        if(!newData){
          groups.value = []
        }else{
          groups.value = newData
        }
      })
  })

  return { groups }
}