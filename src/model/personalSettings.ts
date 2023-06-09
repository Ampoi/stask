export type Subject = {
  index: number
  title: string
  color: string
}

export type PersonalSettings = {
  timer: {
    lapDays: number
  },
  subjects: Array<Subject>
}

export const PersonalSettings = {
  defaultSubject: {
    index:0,
    title: "新規教科",
    color:"#E7E8E7"
  },
  
  defaultSettings: {
    timer: {
      lapDays: 14
    },
    subjects: [
      {index:0, title: "国語 (古文/現代文)", color:"#F44335"},
      {index:1, title: "数学 (算数)", color:"#2196F3"},
      {index:2, title: "理科 (物理/地学/生物/化学)", color:"#4BAF51"},
      {index:3, title: "社会 (公民/地理/歴史)", color:"#FFC105"},
      {index:4, title: "英語 (外国語)", color: "#E040FB"}
    ]
  }
}