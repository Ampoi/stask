import twoDigitNumber from "../functions/twoDigitNumber"

export type Date = `${string}-${string}-${string}`

export type Timer = {
  name: string
  date: Date
}

export const Timer = {
  createTimer(): Timer {
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = twoDigitNumber(today.getMonth()+1)
    const thisDate = twoDigitNumber(today.getDate())
    
    return {
      name: "",
      date: `${thisYear}-${thisMonth}-${thisDate}`
    }
  }
}