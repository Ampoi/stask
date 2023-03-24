type Page = {
  done: boolean
  startPage: number
  lastPage: number
}

type Card = {
  title: string
  time: number
  pages: Array<Page>
  done: boolean
  subject: number
  term: string,
  concentrate: boolean
}

export type { Card, Page }