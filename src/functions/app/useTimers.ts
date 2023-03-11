import { ref as vueData, onBeforeMount, watch } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import firebaseConfig from "../../data/firebaseConfig"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

interface Timer {
  name: string
  date: `${number}-${string}-${string}`
}

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
}

interface TwoDigitNumber {
  _value: string
}
class TwoDigitNumber {
  constructor(newNumber: number){
    let addZero: "0"|""
    if(newNumber.toString().length == 1){
      addZero = "0"
    }else{
      addZero = ""
    }
    this._value = `${addZero}${newNumber.toString()}`
  }
  get value(){
    return this._value
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
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = new TwoDigitNumber(today.getMonth()+1).value
    const thisDate = new TwoDigitNumber(today.getDate()).value
    timers.value.push({
      name: "",
      date: `${thisYear}-${thisMonth}-${thisDate}`
    })
  }

  return {timers, addTimer}
}