import { createRealtimeDatabaseRepository } from "./infra/firebase/realtimeDatabaseRepository.js";

export const checkInvited = async (groupID: string, inviteID: string) => {
  const inviteData = await createRealtimeDatabaseRepository(`/groups/${groupID}/settings/invites/${inviteID}`).get() as { expires: string } | undefined
  
  return !!inviteData
}