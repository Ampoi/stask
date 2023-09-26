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

//一日3時間やる想定
const getRemainDates = (date: string) => {
    const todayTimeStamp = new Date().getTime()
    const dateTimeStamp = new Date(date).getTime()
    
    return Math.round((dateTimeStamp - todayTimeStamp) / 1000 / 3600 / 24)
}

export const getTaskYabasa = (task:Task, uid: string) => {
    const remainScope = getScopeTotalRemainLength(task.scopes, uid)
    const remianDates = getRemainDates(task.term)

    return remainScope / ( remianDates * 3 )
}

export const getYabasaLevel = (task: Task, uid: string) => {
    const isPassed = getRemainHours(task.term) <= 0
    const taskYabasa = getTaskYabasa(task, uid)

    if( taskYabasa == 0 || ( taskYabasa < 5 && !isPassed ) ){
        return "daijobu"
    }else if( isPassed ){
        return "passed"
    }else if( taskYabasa < 10 ){
        return "yabai"
    }else{
        return "girigiri"
    }
}