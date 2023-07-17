import { createMembersRepository } from "../infra/membersRepository";
import useAuth from "./useAuth";

export default async (groupID: string) => {
    const { isLogin, getUserData } = await useAuth()
    if( !isLogin ){ return false }
    const { uid } = await getUserData()

    const membersRepository = createMembersRepository(groupID, uid)

    const isMember = await (async () => {
        const myMemberData = await membersRepository.get()
        return !!myMemberData
    })()

    return { isMember }
}