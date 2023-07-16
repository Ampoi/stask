import { createInviteRepository } from "../infra/inviteRepository";

export default async (groupID: string, inviteID: string) => {
    const inviteRepository = createInviteRepository(groupID, inviteID)

    const isInvited = await (async () => {
        const invite = await inviteRepository.get()        
        return !!invite
    })()

    return { isInvited }
}