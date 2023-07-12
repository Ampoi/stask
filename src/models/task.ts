type Uid = string

export type Scope = {
    first: number
    last: number
    now: { [key: Uid]: number }
}

type Subject = {
    name: string
    color: `#${string}`
}

export type Task = {
    name: string
    term: `${number}-${0 | ''}${number}-${0 | ''}${number}`
    scopes: Scope[]
    subject: Subject
}