import { initializeApp } from "firebase-admin/app"
import { onCall } from "firebase-functions/v2/https"

//TODO:別のファイルに分ける
import { getDatabase } from "firebase-admin/database"

initializeApp()

const createRealtimeDatabaseRepository = <T>(path: string) => {
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

export const getInviteGroupData = onCall(
  { cors: [/stask(\_(develop|release))?\.ampoi\.net|localhost/] },
  async (request) => {
    const groupID: string = request.data.groupID
    const inviteID: string = request.data.inviteID

    const inviteData = await createRealtimeDatabaseRepository(`/groups/${groupID}/settings/invites/${inviteID}`).get()
    console.log(inviteData);
  }
);