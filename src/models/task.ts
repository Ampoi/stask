import twoDigitNumber from "../functions/twoDigitNumber"

type Uid = string

export type Scope = {
    first: number
    last: number
    now: { [key: Uid]: number }
}

export const Scope = {
    create(): Scope {
        return {
            first: 0,
            last: 0,
            now: {}
        }
    }
}

export type Subject = {
    name: string
    color: `#${string}`
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