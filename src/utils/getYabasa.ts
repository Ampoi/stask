import { Task, Scope } from "../models/task"

const getScopeTotalRemainLength = (scopes: Scope[], uid: string) => {
    let total = 0
    scopes.forEach((scope) => {
        total += scope.last - scope.now[uid]
    })
    return total
}

const getRemainDates = (date: string) => {
    const todayTimeStamp = new Date().getDate()
    const dateTimeStamp = new Date(date).getDate()
    
    return dateTimeStamp - todayTimeStamp
}

export const getDone = (scopes: Scope[], uid: string) => {
    const scopeTotalRemainLength = getScopeTotalRemainLength(scopes, uid)
    return scopeTotalRemainLength == 0
}

export const getTaskYabasa = (task:Task, uid: string) => {
    const remainScope = getScopeTotalRemainLength(task.scopes, uid)
    const remianDates = getRemainDates(task.term)

    return remainScope / remianDates
}