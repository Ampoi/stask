import { ref as vueData, onBeforeMount, watch } from "vue";

import { Timer } from "../model/timers"
import { personalTimerRepository } from "../infra/TimerRepository";

type TimersData = Array<Timer>

export default ()=>{
  const timers = vueData<TimersData>([])

  onBeforeMount(()=>{
    personalTimerRepository.get().then((newData) => {
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
    personalTimerRepository.set(timers.value)
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