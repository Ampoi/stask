import {DateString} from "./Timer";

export type Page = Readonly<{
    done: boolean
    startPage: number
    lastPage: number
}>
export const Page = {
    create(partial?: Partial<Page>): Page {
        return {
            startPage: partial?.startPage ?? 1,
            lastPage: partial?.lastPage ?? 2,
            done: partial?.done ?? false
        }
    },
    toggleDone(page: Page): Page {
        return {
            ...page,
            done: !page.done
        }
    }
}

export type Card = Readonly<{
    title: string
    time: number
    pages: Readonly<Page[]>
    done: boolean
    subject: number
    term: DateString
    id: string
}>
export const Card = {
    create(): Card {
        return {
            id: Math.random().toString(36).slice(-8),
            title: "",
            time: 60,
            pages: [],
            done: false,
            subject: 1,
            term: DateString.create()
        }
    },
    addPage(card: Card, page: Page): Card {
        return {
            ...card,
            pages: [...card.pages, page]
        }
    },
    removePage(card: Card, index: number): Card {
        return {
            ...card,
            pages: [...(card.pages as Page[]).splice(index, 1)]
        }
    },
    WELCOME_CARD: {
        id: Math.random().toString(36).slice(-8),
        title: "Staskへようこそ",
        time: 123,
        pages: [],
        done: false,
        subject: 1,
        term: "2023-01-01"
    } as Card,
    clone(card: Card, partial: Partial<Card>): Card {
        return {
            ...card,
            ...partial
        }
    }
} as const
