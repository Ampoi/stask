export type Group = {
  cards: {
    [key: string]: {
      done: boolean
    }
  }
}

export type Groups = {
  [key: string]: Group
}