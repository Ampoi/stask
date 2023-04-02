import {DateString} from "./Timer";

type Page = {
    done: boolean
    startPage: number
    lastPage: number
}

export type Card = {
    title: string
    time: number
    pages: Page[]
    done: boolean
    subject: number
    term: DateString
}
export const Card = {
    create(): Card {
        return {
            title: "",
            time: 60,
            pages: [],
            done: false,
            subject: 1,
            term: DateString.create()
        }
    },
    WELCOME_CARD: {
        title: "Staskへようこそ",
        time: 123,
        pages: [],
        done: false,
        subject: 1,
        term: "2023-01-01"
    } as Card
}

export type {Page}