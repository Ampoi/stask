import { ref as vueData, onBeforeMount, watch } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import firebaseConfig from "../data/firebaseConfig"
import type { Timer } from "../model/timer"

import twoDigitNumber from "../functions/twoDigitNumber"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

type TimersData = Array<Timer>

interface Timers {
  _value: TimersData
}

class Timers {
  constructor(newTimers: TimersData){
    if(newTimers == undefined){
      this._value = []
    }else{
      this._value = newTimers
    }
  }

  get value(){
    return this._value
  }

  saveTimers(uid: string){
    return new Promise<void>((resolve)=>{
      const savePath = `data/${uid}/timers`
      set(ref(db, savePath), this._value)
        .then(()=>{
          resolve()
        })
        .catch((err)=>{
          console.error(err);
        })
    })
  }

  addTimer(){
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = twoDigitNumber(today.getMonth()+1)
    const thisDate = twoDigitNumber(today.getDate())
    this._value.push({
      name: "",
      date: `${thisYear}-${thisMonth}-${thisDate}`
    })
  }

  deleteTimer(index: number){
    this._value.splice(index, 1)
  }
}

export default ()=>{
  const timers = vueData<TimersData>([])
  
  let uid: string

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid

        get(child(dbRef, `data/${uid}/timers`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()
            
            const newTimers = new Timers(newData)
            timers.value = newTimers.value
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  })

  watch(timers, ()=>{
    const newTimers = new Timers(timers.value)
    newTimers.saveTimers(uid)
  }, {deep: true})

  function addTimer(){
    const newTimers = new Timers(timers.value)
    newTimers.addTimer()
    timers.value = newTimers.value
  }

  function deleteTimer(index: number){
    const newTimers = new Timers(timers.value)
    newTimers.deleteTimer(index)
    timers.value = newTimers.value
  }

  return {
    timers,
    addTimer, deleteTimer
  }
}