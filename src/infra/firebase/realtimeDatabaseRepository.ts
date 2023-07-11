import { getDatabase, ref, get, set, onValue, DataSnapshot } from "firebase/database"
import { AuthRepository } from "./authRepository"

const db = getDatabase()

export const createRealtimeDatabaseRepository = <T>(path: string) => {
    const dataRef = ref(db, path)
    return {
        get: async (): Promise<T | undefined> => {
            if(!AuthRepository.isLogin()){ throw new Error("データベースから取得する際はログインが必須です") }
            
            const snapshot = await get(dataRef)
                .catch((err) => {
                    throw new Error(`path(get): ${path}\nerr: ${err.toString()}`)
                })
            
            if( snapshot.exists() ){
                const newData = snapshot.val() as T
                return newData
            }else{
                return undefined
            }
        },
        set: async (saveData: T) => {
            if(!AuthRepository.isLogin()){ throw new Error("データベースに保存する際はログインが必須です") }

            set(dataRef, saveData)
                .catch((err)=>{          
                    throw `path(set): ${path}\nerr: ${err.toString()}`
                })
        },
        onChange(callback: (snapshot: DataSnapshot) => unknown){
            return onValue(dataRef, callback)
        }
    }
}