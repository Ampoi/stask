import { ref as vueData, onBeforeMount, watch } from "vue";

import { PersonalSettings } from "../model/personalSettings";
import { GroupSettings } from "../model/groupSettings";
import { personalSettingRepository, groupSettingRepository } from "../infra/SettingRepository"

export const usePersonalSettings = ()=>{
  const personalSettings = vueData<PersonalSettings>(Object.create(PersonalSettings.defaultSettings))

  onBeforeMount(()=>{
    personalSettingRepository.get()
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

export const useGroupSettings = ()=>{
  const settings = vueData<GroupSettings>(Object.create(GroupSettings.defaultSettings))

  onBeforeMount(()=>{
    groupSettingRepository.get()
      .then((newData)=>{
        if(!newData){
          groupSettingRepository.set(GroupSettings.defaultSettings)
        }else{
          settings.value = newData
        }
      })
  })

  watch(settings, ()=>{
    groupSettingRepository.set(settings.value)
  }, {deep: true})

  return { settings }
}