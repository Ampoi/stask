import { ref as vueData, onBeforeMount, watch } from "vue";

import { Settings } from "../model/settings";
import { settingRepository } from "../infra/SettingRepository"

export default ()=>{
  const settings = vueData<Settings>({
    timer: {
      lapDays: 14
    },
    subjects: []
  })

  onBeforeMount(()=>{
    settingRepository.get()
      .then((newData)=>{
        if(!newData){
          settingRepository.set(Settings.defaultSettings)
          settings.value = Object.create(Settings.defaultSettings)
        }else{
          settings.value = newData
        }
      })
  })

  watch(settings, ()=>{
    settingRepository.set(settings.value)
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