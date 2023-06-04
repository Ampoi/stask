import { ref, onBeforeMount } from "vue";

import { Groups } from "../model/groups";
import { groupRepository } from "../infra/GroupRepository";

export default ()=>{
  const groups = ref<Groups>({})

  onBeforeMount(async ()=>{
    groupRepository.get
      .then((newData)=>{
        if(newData){
          groups.value = newData
        }
      })
  })

  return { groups }
}