import { ref as vueData, onBeforeMount, watch } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import { timerRepository } from "../infra/TimerRepository";

import firebaseConfig from "../infra/firebase/config"
import { Timer } from "../model/timers"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

type TimersData = Array<Timer>

export default ()=>{
  const timers = vueData<TimersData>([])
  
  let uid: string

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid

        timerRepository.get().then((newData) => {
          if (newData){
            timers.value = newData
          }else{
            timers.value = []
          }
        }).catch((error) => {
          console.error(error);
        });
      }
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