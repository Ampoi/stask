import { ref as vueData, onBeforeMount, watch } from "vue";

import { Settings } from "../model/settings";
import { personalSettingRepository } from "../infra/SettingRepository"

export const usePersonalSettings = ()=>{
  const settings = vueData<Settings>({
    timer: {
      lapDays: 14
    },
    subjects: []
  })

  onBeforeMount(()=>{
    personalSettingRepository.get()
      .then((newData)=>{
        if(!newData){
          personalSettingRepository.set(Settings.defaultSettings)
          settings.value = Object.create(Settings.defaultSettings)
        }else{
          settings.value = newData
        }
      })
  })

  watch(settings, ()=>{
    personalSettingRepository.set(settings.value)
  }, {deep: true})

  function addSubject(){
    settings.value.subjects.push(Settings.defaultSubject)
    setSubjectIndex()
  }

  function deleteSubject(index: number){
    settings.value.subjects.splice(index, 1)
    setSubjectIndex()
  }

  function setSubjectIndex(){
    let i = 0
    settings.value.subjects.forEach(()=>{
      settings.value.subjects[i].index = i
      i++
    })
  }

  return {
    settings,
    addSubject, deleteSubject,
  }
}