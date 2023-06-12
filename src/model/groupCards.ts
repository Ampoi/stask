import twoDigitNumber from "../functions/twoDigitNumber"

export type GroupSharedPage = {
  startPage: number
  lastPage: number
  done: string[]
}

export type GroupSharedCard = {
  title: string
  time: number
  pages: GroupSharedPage[]
  subject: number
  term: string
  done: string[]
  concentrate: string[]
}

export const GroupSharedCard = {
  create(): GroupSharedCard{
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = twoDigitNumber(today.getMonth()+1)
    const thisDate = twoDigitNumber(today.getDate())

    return {
      title: "",
      time: 0,
      pages: [],
      subject: 0,
      term: `${thisYear}-${thisMonth}-${thisDate}`,
      done: [],
      concentrate: []
    }
  },

  welcomeCard: {
    title: "Staskへようこそ",
    time: 123,
    pages: [],
    subject: 1,
    term: "2023-01-01",
    done: [],
    concentrate: []
  }
}