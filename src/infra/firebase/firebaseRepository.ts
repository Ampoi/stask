import { getDatabase, ref, get, set, child } from "firebase/database"

import { AuthRepository } from "../AuthRepository"

const db = getDatabase()
const dbRef = ref(db)

async function getDataPath(path: string) {
  const userData = await AuthRepository.getUser()
  return `data/${userData?.uid}/${path}`
}

export const createRealTimeDatabaseRepository = <T>(path: string)=>{
  return {
    async get(): Promise<T | undefined>{      
      if(!await AuthRepository.isLogin()){
        throw new Error("loggined is required")
      }

      const snapshot = await get(child(dbRef, await getDataPath(path)))
        .catch((err)=>{
          throw new Error(err)
        })

      if(snapshot.exists()){
        const newData = snapshot.val()
        return newData
      }else{
        return undefined
      }
    },
    
    async set(saveData: T){
      if(!await AuthRepository.isLogin()){
        throw new Error("loggined is required")
      }

      return new Promise<void>(async (resolve)=>{
        set(ref(db, await getDataPath(path)), saveData)
          .then(()=>{
            resolve()
          })
          .catch((err)=>{
            throw new Error(err)
          })
      })
    }
  }
}