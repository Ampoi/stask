import { ref, watch } from "vue";

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
    const newGroupSettingItemDBdata = await firebaseRepository.get
      .catch((err: Error) => {
        const message = err.message
        if(message == "Permission denied"){
          backToPersonalPageWithAlert()
        }
        throw err
      })

    const newGroupSettings = (()=>{
      if(!newGroupSettingItemDBdata){
        firebaseRepository.set(GroupSettings.defaultSettings)
        return { ...GroupSettings.defaultSettings }
      }else{
        return newGroupSettingItemDBdata
      }
    })()

    return newGroupSettings
  })()

  const groupSettings = ref<GroupSettings>(groupSettingsData)

  watch(groupSettings, (newData)=>{    
    firebaseRepository.update(newData)
  }, {deep: true})

  function addSubject(){
    groupSettings.value.subjects.push({ ...GroupSettings.defaultSubject })
    setSubjectIndex()
  }

  function deleteSubject(index: number){
    groupSettings.value.subjects.splice(index, 1)
    setSubjectIndex()
  }

  function setSubjectIndex(){
    let i = 0
    groupSettings.value.subjects.forEach(()=>{
      groupSettings.value.subjects[i].index = i
      i++
    })
  }

  function deleteUser(uid: string){
    const newMembersList = { ...groupSettings.value.users }
    delete newMembersList[uid]
    
    groupSettings.value.users = newMembersList
  }

  return { groupSettings, addSubject, deleteSubject, deleteUser }
}