import { ref as vueData, onBeforeMount, watch, Ref } from "vue";

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

export const useGroupSettings = (groupId: string, is_permision_denied_func: Function)=>{
  const firebaseRepository = groupSettingRepository(groupId)
  const groupSettings: Promise<GroupSettings> = (async ()=>{
    
    const newGroupSettingsDBdata = await firebaseRepository.get
      .catch((err: Error) => {
        const message = err.message
        if(message == "Permission denied"){
          is_permision_denied_func()
        }
        throw err
      })
    
    const newGroupSettings = (()=>{
      if(!newGroupSettingsDBdata){
        firebaseRepository.set(GroupSettings.defaultSettings)
        return { ...GroupSettings.defaultSettings }
      }else{
        return newGroupSettingsDBdata
      }
    })()
    return newGroupSettings
  })()

  return { groupSettings }
}