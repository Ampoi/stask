import { createMembersRepository } from "../infra/membersRepository";
import useAuth from "./useAuth";

export default async (groupID: string) => {
    const membersRepository = createMembersRepository(groupID)

    const isMember = await (async () => {
        const { isLogin, getUserData } = await useAuth()
        if( !isLogin ){ return false }

        const { uid } = await getUserData()

        const members = await membersRepository.get() ?? {}
        return !!members[uid]
    })()

    return { isMember }
}