import { initializeApp } from "firebase/app"
import { getDatabase, ref, get, set, child } from "firebase/database"

import firebaseConfig from "./config"
import { AuthRepository } from "../AuthRepository"

const firebaseApp = initializeApp(firebaseConfig)
const db = getDatabase()
const dbRef = ref(db)

export const createRealTimeDatabaseRepository = <T>(path: string)=>{
  return {
    async get(): Promise<T | []>{
      const userData = await AuthRepository.getUser()
      const uid = userData?.uid
      console.log(uid);
      
      if(!await AuthRepository.isLogin()){
        throw new Error("loggined is required")
      }

      const snapshot = await get(child(dbRef, `data/${uid}/${path}`))
        .catch((err)=>{
          throw new Error(err)
        })

      if(snapshot.exists()){
        const newData = snapshot.val()
        return newData
      }else{
        return []
      }
    },
    
    set(){

    },

    add(){

    }
  }
}