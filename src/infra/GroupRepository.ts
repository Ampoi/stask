import { Groups } from "../model/groups"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const groupRepository = createRealTimeDatabaseRepository<Groups>("users/groups")