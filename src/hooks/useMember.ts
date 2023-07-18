import { createMemberRepository } from "../infra/memberRepository";
import useAuth from "./useAuth";

export default async (groupID: string) => {
    const isMember = await (async () => {
        const { isLogin, getUserData } = await useAuth()
        if( !isLogin ){ return false }
        const { uid } = await getUserData()

        const membersRepository = createMemberRepository(groupID, uid)

        const myMemberData = await membersRepository.get()
        return !!myMemberData
    })()

    return { isMember }
}