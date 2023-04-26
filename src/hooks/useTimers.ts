import { ref as vueData, onBeforeMount, watch } from "vue";

import { timerRepository } from "../infra/TimerRepository";

import { Timer } from "../model/timers"

type TimersData = Array<Timer>

export default ()=>{
  const timers = vueData<TimersData>([])

  onBeforeMount(()=>{
    timerRepository.get().then((newData) => {
      if (newData){
        timers.value = newData
      }else{
        timers.value = []
      }
    }).catch((error) => {
      console.error(error);
    });
  })

  watch(timers, ()=>{
    timerRepository.set(timers.value)
  }, {deep: true})

  function addTimer(){
    timers.value.push(Timer.createTimer())
  }

  function deleteTimer(index: number){
    timers.value.splice(index, 1)
  }

  return {
    timers,
    addTimer, deleteTimer
  }
}