import { createCallableFunc } from "../createCallableFunc.js";
import { createRealtimeDatabaseRepository } from "../infra/firebase/realtimeDatabaseRepository.js";

export const checkMember = createCallableFunc(
  async (request) => {
    const { groupID } = request.data as { groupID: string }
    
    const requestAuthUID = request.auth?.uid
    if( !requestAuthUID ){ return false }

    const groupMemberRepository = createRealtimeDatabaseRepository(`/groups/${groupID}/settings/members/${requestAuthUID}`)
    const requestUserDataInGroup = await groupMemberRepository.get()

    return !!requestUserDataInGroup
  }
)