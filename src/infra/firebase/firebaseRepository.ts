import { getDatabase, ref, get, set, child } from "firebase/database"

import { AuthRepository } from "../AuthRepository"

const db = getDatabase()
const dbRef = ref(db)

const personalDataPattern = /^users\/(\S+)/
const groupDataPattern = /^groups\/(\S+)/
async function getDataPath(path: string) {
  if(personalDataPattern.test(path)){
    path.match(personalDataPattern)
    const dataPath = RegExp.$1
    const userData = await AuthRepository.getUser()
    return `data/${userData?.uid}/${dataPath}`

  }else if(groupDataPattern.test(path)){
    return path
  }else{
    throw new Error("パスが正しい形式になっていないです。")
  }
}

type pathPettern = `${"users" | "groups"}/${string}`
export type RealTimeDatabaseRepository = {
  get: Promise<T | undefined>;
  set: (saveData: T) => Promise<void>;
}

export const createRealTimeDatabaseRepository = <T>(path: pathPettern): RealTimeDatabaseRepository => {
  const getFromDB: Promise<T | undefined> = new Promise(async (resolve, reject) => {
    if(!await AuthRepository.isLogin()){
      throw new Error("loggined is required")
    }

    const snapshot = await get(child(dbRef, await getDataPath(path)))
      .catch(async(err)=>{
        reject(err)
        throw new Error(err)
      })

    if(snapshot.exists()){
      const newData = snapshot.val()
      resolve(newData)
    }else{
      resolve(undefined)
    }
  })

  const setToDB = async (saveData: T)=>{
    if(!await AuthRepository.isLogin()){
      throw new Error("loggined is required")
    }

    return new Promise<void>(async (resolve)=>{
      set(ref(db, await getDataPath(path)), saveData)
        .then(()=>{
          resolve()
        })
        .catch((err)=>{          
          throw `
            path(set): ${path}
            err: ${err.toString()}`
        })
    })
  }
  return {
    get: getFromDB,
    set: setToDB
  }
}