import { ref as vueData, onBeforeMount, watch } from "vue";

import { PersonalSettings } from "../model/personalSettings";
import { GroupSettings } from "../model/groupSettings";
import { personalSettingRepository, groupSettingRepository } from "../infra/SettingRepository"

export const usePersonalSettings = ()=>{
  const personalSettings = vueData<PersonalSettings>(Object.create(PersonalSettings.defaultSettings))

  onBeforeMount(()=>{
    personalSettingRepository.get
      .then((newData)=>{
        if(!newData){
          personalSettingRepository.set(PersonalSettings.defaultSettings)
        }else{
          personalSettings.value = newData
        }
      })
  })

  watch(personalSettings, ()=>{
    personalSettingRepository.set(personalSettings.value)
  }, {deep: true})

  function addSubject(){
    personalSettings.value.subjects.push(Object.create(PersonalSettings.defaultSubject))
    setSubjectIndex()
  }

  function deleteSubject(index: number){
    personalSettings.value.subjects.splice(index, 1)
    setSubjectIndex()
  }

  function setSubjectIndex(){
    let i = 0
    personalSettings.value.subjects.forEach(()=>{
      personalSettings.value.subjects[i].index = i
      i++
    })
  }

  return { personalSettings, addSubject, deleteSubject }
}

export const useGroupSettings = (group_id: string, is_permision_denied_func: Function)=>{
  const groupSettings = vueData<GroupSettings>(Object.create(GroupSettings.defaultSettings))
  const firebaseRepository = groupSettingRepository(group_id)

  onBeforeMount(()=>{
    firebaseRepository.get
      .then((newData) => {
        if(!newData){
          firebaseRepository.set(GroupSettings.defaultSettings)
        }else{
          groupSettings.value = newData
        }
      })
      .catch((err: Error) => {
        const message = err.message
        if(message == "Permission denied"){
          is_permision_denied_func()
        }
      })
  })

  watch(groupSettings, ()=>{
    firebaseRepository.set(groupSettings.value)
  }, {deep: true})

  return { groupSettings }
}