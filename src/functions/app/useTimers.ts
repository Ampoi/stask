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
  date: `${number}-${number}-${number}`
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

  saveCards(uid: string){
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
    console.log("updated!");
  }, {deep: true})

  return {timers}
}