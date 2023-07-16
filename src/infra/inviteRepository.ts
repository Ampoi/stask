import { Invite } from "../models/groupSettings"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const createInviteRepository = (groupID: string, inviteID: string)=>{
    return createRealtimeDatabaseRepository<Invite>(`/groups/${groupID}/settings/invites/${inviteID}`)
}