//import { memberRepository } from "../infra/memberRepository";

import { createGroupSettingsRepository } from "../infra/groupSettingsRepository"

export default async (groupID: string) => {
    const isMember = await (async () => {
        /*const { checkMember } = memberRepository
        const result = await checkMember({ groupID })
        return result.data*/
        const settingsRepository = createGroupSettingsRepository(groupID)
        try {
            await settingsRepository.get()
            return true
        } catch (error) {
            return false
        }
    })()

    return { isMember }
}