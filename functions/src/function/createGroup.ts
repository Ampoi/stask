import { createCallableFunc } from "../createCallableFunc.js";
import { createRealtimeDatabaseRepository } from "../infra/firebase/realtimeDatabaseRepository.js";

export const createGroup = createCallableFunc(
  async (request): Promise<string | void> => {
    const { groupID: newGroupID, groupData: newGroupData } = request.data as { groupID: string, groupData: Object }
    const requestAuthUID = request.auth?.uid
    if( !requestAuthUID ){ return "ログインしてません！" }

    const groupsRepository = createRealtimeDatabaseRepository<{[key: string]: Object}>(`/groups`)
    const groups = await groupsRepository.get()
    if( !groups ){ throw new Error("グループ一覧が存在しません！") }
    
    const groupIDs = Object.keys(groups)
    if( groupIDs.includes(newGroupID) ){ return "同じ名前のグループが既にあります" }

    const newGroupsRepository = createRealtimeDatabaseRepository(`/groups/${newGroupID}`)
    await newGroupsRepository.set(newGroupData)
  }
)