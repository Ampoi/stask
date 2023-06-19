import { ref, watch, Ref } from "vue";

import { PersonalSettings } from "../model/personalSettings";
import { GroupSettings } from "../model/groupSettings";
import { personalSettingRepository, groupSettingRepository } from "../infra/SettingRepository"
import { Router } from "vue-router";

export const usePersonalSettings = async ()=>{
  const personalSettingsData: Promise<PersonalSettings> = (async ()=>{
    
    const newPersonalSettingsDBdata = await personalSettingRepository.get
      .catch((err: Error) => {
        throw err
      })
    
    const newPersonalSettings = (()=>{
      if(!newPersonalSettingsDBdata){
        personalSettingRepository.set(PersonalSettings.defaultSettings)
        return { ...PersonalSettings.defaultSettings }
      }else{
        return newPersonalSettingsDBdata
      }
    })()

    return newPersonalSettings
  })()

  const personalSettings = ref(await personalSettingsData)

  watch(personalSettings, ()=>{
    personalSettingRepository.set(personalSettings.value)
  }, {deep: true})

  function addSubject(){
    personalSettings.value.subjects.push({ ...PersonalSettings.defaultSubject })
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

export const useGroupSettings = async (groupId: string, router: Router)=>{
  function backToPersonalPageWithAlert(){
    router.push("/") //TODO:ダイレクト先でアラートを表示するプログラムを書く(URLから取得する感じ)
  }

  const firebaseRepository = groupSettingRepository(groupId)    
  const groupSettingsData: GroupSettings = await (async ()=>{
    let newGroupSettings: GroupSettings = { ...GroupSettings.defaultSettings };
  
    (Object.keys(firebaseRepository) as (keyof typeof firebaseRepository)[]).forEach(async (repoName) => {
      const repo = firebaseRepository[repoName]

      const newGroupSettingItemDBdata = await repo.get
        .catch((err: Error) => {
          const message = err.message
          if(message == "Permission denied"){
            backToPersonalPageWithAlert()
          }
          throw err
        })

      const newGroupSettingItem = (()=>{
        if(!newGroupSettingItemDBdata){
          repo.set(GroupSettings.defaultSettings)
          return { ...GroupSettings.defaultSettings }
        }else{
          return newGroupSettingItemDBdata
        }
      })()

      newGroupSettings[repoName] = newGroupSettingItem
    })

    return newGroupSettings
  })()

  const groupSettings: {
    [key in keyof GroupSettings]: Ref<GroupSettings[key]>
  } = {
    name: ref(groupSettingsData.name),
    timer: ref(groupSettingsData.timer),
    subjects: ref(groupSettingsData.subjects),
    permissions: ref(groupSettingsData.permissions),
    users: ref(groupSettingsData.users)
  }

  watch(groupSettings.name, ()=>{firebaseRepository.name.set(groupSettings.name.value)}, {deep: true})
  watch(groupSettings.timer, ()=>{firebaseRepository.timer.set(groupSettings.timer.value)}, {deep: true})
  watch(groupSettings.subjects, ()=>{firebaseRepository.subjects.set(groupSettings.subjects.value)}, {deep: true})
  watch(groupSettings.permissions, ()=>{firebaseRepository.permissions.set(groupSettings.permissions.value)}, {deep: true})
  watch(groupSettings.users, ()=>{firebaseRepository.users.set(groupSettings.users.value)}, {deep: true})

  function addSubject(){
    groupSettings.subjects.value.push({ ...GroupSettings.defaultSubject })
    setSubjectIndex()
  }

  function deleteSubject(index: number){
    groupSettings.subjects.value.splice(index, 1)
    setSubjectIndex()
  }

  function setSubjectIndex(){
    let i = 0
    groupSettings.subjects.value.forEach(()=>{
      groupSettings.subjects.value[i].index = i
      i++
    })
  }

  return { groupSettings, addSubject, deleteSubject }
}