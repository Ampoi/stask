import { memberRepository } from "../infra/memberRepository";

export default async (groupID: string) => {
    const isMember = await (async () => {
        const { checkMember } = memberRepository
        const result = await checkMember({ groupID })
        return result.data
    })()

    return { isMember }
}