export type GroupSharedPage = {
  startPage: number
  lastPage: number
}

export type GroupSharedCard = {
  title: string
  time: number
  pages: GroupSharedPage[]
  subject: number
  term: string
}

export type GroupPersonalPage = {
  done: boolean
}

export type GroupPersonalCard = {
  done: boolean
  concentrate: boolean
  pages: GroupPersonalPage[]
}