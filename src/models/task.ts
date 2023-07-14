import twoDigitNumber from "../functions/twoDigitNumber"
import { Uid } from "./GroupSettings"

export type Scope = {
    first: number
    last: number
    now: { [key: Uid]: number }
}

export const Scope = {
    create(): Scope {
        return {
            first: 1,
            last: 2,
            now: {}
        }
    }
}

export type Subject = {
    name: string
    color: `#${string}`
}

export const Subject = {
    create(): Subject {
        return {
            name: "",
            color: "#626262"
        }
    }
}

export type Task = {
    name: string
    term: `${number}-${string}-${string}`
    scopes: Scope[]
    subject: Subject
}

export const Task = {
    create(subjects: Subject[]): Task {
        const today = new Date()
        const thisYear = today.getFullYear()
        const thisMonth = twoDigitNumber(today.getMonth()+1)
        const thisDate = twoDigitNumber(today.getDate())

        return {
            name: "",
            term: `${thisYear}-${thisMonth}-${thisDate}`,
            scopes: [],
            subject: subjects[0]
        }
    }
}