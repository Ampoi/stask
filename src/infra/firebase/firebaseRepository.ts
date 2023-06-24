import { getDatabase, ref, get, set, child, update } from "firebase/database"

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

type DatabaseData = {
  [key: string]: any | DatabaseData
}

class Updates{
  updates: { [key: string]: any };

  constructor(oldData: DatabaseData, newData: DatabaseData){
    const diff = this.getDiffInObject(oldData, newData)
    this.updates = this.getUpdateObjectArray(diff)
  }

  getDiffInObject(oldData: DatabaseData, newData: DatabaseData){
    let diffs: DatabaseData = {}
    const allData = { ...newData, ...oldData }
  
    Object.keys(allData).forEach((key)=>{
      const oldValue = oldData[key]
      const newValue = newData[key]

      if(JSON.stringify(oldValue) != JSON.stringify(newValue)){            
        if(!newValue){
          diffs[key] = null
        }else if(typeof newValue == "object"){          
          diffs[key] = this.getDiffInObject(oldValue, newValue)
        }else{
          diffs[key] = newValue
        }
      }
    })
  
    return diffs
  }

  getUpdateObjectArray(updateObject: Object){
    //for Firebase Realtime Database
    let updates: { [key: string]: any } = {}
  
    new Map(Object.entries(updateObject)).forEach((value, key)=>{
        if(typeof value == "object" && value){
            const newUpdates = this.getUpdateObjectArray(value)

            new Map(Object.entries(newUpdates)).forEach((updateValue, path)=>{
              updates[`/${key}${path}`] = updateValue
            })
        }else{
            updates[`/${key}`] = value
        }
    })

    return updates
  }
}

type pathPettern = `${"users" | "groups"}/${string}`
export type RealTimeDatabaseRepository<T> = {
  get: () => Promise<T | undefined>;
  set: (saveData: T) => Promise<void>;
  update: (updateData: T) => Promise<void>
}

export const createRealTimeDatabaseRepository = <T>(path: pathPettern): RealTimeDatabaseRepository<T> => {
  const getFromDB: ()=>Promise<T | undefined> = ()=>{
    return new Promise(async (resolve, reject) => {
      if(!await AuthRepository.isLogin()){
        throw new Error("loggined is required")
      }
  
      const snapshot = await get(child(dbRef, await getDataPath(path)))
        .catch(async(err)=>{
          reject(err)
          throw new Error(`
            path(get): ${path}
            err: ${err.toString()}`)
        })
  
      if(snapshot.exists()){
        const newData: T = snapshot.val()
        resolve(newData)
      }else{
        resolve(undefined)
      }
    })
  }

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

  const updateDB = async (updateData: T)=>{
    if(!await AuthRepository.isLogin()){ throw new Error("loggined is required") }

    return new Promise<void>(async (resolve)=>{
      const newDB = createRealTimeDatabaseRepository<T>(path)
      const newDBData = await newDB.get

      if(typeof updateData != "object" || !updateData){ throw new Error("アップデートするデータはObjectでなければいけません") }
      if(typeof newDBData != "object" || !newDBData){ throw new Error("アップデート先のデータはObjectではなくてはありません") }
      
      const updateClass: Updates = new Updates(newDBData, updateData)
      const updates = updateClass.updates

      const homePath = await getDataPath(path)
      let homeUpdates: { [key: string]: any } = {}
      new Map(Object.entries(updates)).forEach((value, key)=>{
        homeUpdates[`/${homePath}${key}`] = value
      })
      
      console.log(homeUpdates);
      

      update(ref(db), homeUpdates)
        .then(()=>{
          resolve()
        })
        .catch((err)=>{        
          console.log(homeUpdates);
          throw `
            path(update): ${path}
            err: ${err.toString()}`
        })
    })
  }

  return {
    get: getFromDB,
    set: setToDB,
    update: updateDB
  }
}