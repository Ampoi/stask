import { getDatabase } from "firebase-admin/database"

export const createRealtimeDatabaseRepository = <T>(path: string) => {
    const db = getDatabase()
    const dataRef = db.ref(path)
    return {
        get: async (): Promise<T | undefined> => {            
            const snapshot = await dataRef.once("value")
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
            dataRef.set(saveData)
                .catch((err)=>{          
                    throw `path(set): ${path}\nerr: ${err.toString()}`
                })
        }
    }
}