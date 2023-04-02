import {addZero} from "../utils/stringUtils";

export type DateString = `${string}-${string}-${string}`
export const DateString = {
    create: (date?: Date): DateString => {
        const _date = date ?? new Date()
        return `${_date.getFullYear()}-${addZero(_date.getMonth() + 1, 2)}-${addZero(_date.getDate(), 2)}`
    }
}

export type Timer = Readonly<{
    name: string
    date: DateString
}>

export const Timer = {
    create: (name: string, date?: Date): Timer => {
        return {
            name: name,
            date: DateString.create(date)
        }
    }
}
