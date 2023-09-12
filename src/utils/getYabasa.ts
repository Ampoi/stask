import { Task, Scope } from "../models/task"
import { getRemainHours } from "./getRemainHours"

export const getScopeTotalRemainLength = (scopes: Scope[], uid: string) => {
    let total = 0
    scopes.forEach((scope) => {
        total += scope.last - scope.now[uid]
    })
    return total
}

export const isDone = (scopes: Scope[], uid: string) => {
    const scopeTotalRemainLength = getScopeTotalRemainLength(scopes, uid)
    return scopeTotalRemainLength == 0
}

export const getTaskYabasa = (task:Task, uid: string) => {
    const remainScope = getScopeTotalRemainLength(task.scopes, uid)
    const remianHours = getRemainHours(task.term)

    return remainScope / remianHours
}