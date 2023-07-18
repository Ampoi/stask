import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository";

export const createGroupsRepository = (uid: string) => {
    return createRealtimeDatabaseRepository<string[]>(`/data/${uid}/groups`)
}