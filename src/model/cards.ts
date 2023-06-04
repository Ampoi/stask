import twoDigitNumber from "../functions/twoDigitNumber"

export type Page = {
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
  term: string
  concentrate: boolean
}

export const Card = {
  create(): Card {
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = twoDigitNumber(today.getMonth()+1)
    const thisDate = twoDigitNumber(today.getDate())

    return{
      title: "",
      time: 60,
      pages: [],
      done: false,
      subject: 1,
      term: `${thisYear}-${thisMonth}-${thisDate}`,
      concentrate: false
    }
  },

  welcomeCard: {
    title: "Staskへようこそ",
    time: 123,
    pages: [],
    done: false,
    subject: 1,
    term: "2023-01-01",
    concentrate: false
  }
}