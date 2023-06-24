import { getDatabase, ref, get, child, query, equalTo } from "firebase/database"

const db = getDatabase()
const dbRef = ref(db)

export const inviteRepository = async (groupID: string, inviteID: string) => {
    const getFromDB = new Promise<boolean>(async (resolve, reject) => {
        const path = `/groups/${groupID}/settings/invites/${inviteID}`
        const snapshot = await get(query(child(dbRef, path)))
            .catch(async(err)=>{
                reject(err)
                throw new Error(`
                    path(get): ${path}
                    err: ${err.toString()}`)
            })
        
        const isInvited: boolean = !!snapshot.val()
        
        resolve(isInvited)
    })

    return { get: getFromDB }
}