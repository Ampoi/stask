import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const groupRepository = createRealTimeDatabaseRepository<string[]>("users/groups")