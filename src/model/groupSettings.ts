import { Subject } from "./personalSettings"

export type GroupSettings = {
  name: string
  timer: {
    lapDays: number
  },
  subjects: Array<Subject>
}

export const GroupSettings:{
  defaultSubject: Subject,
  defaultSettings: GroupSettings
} = {
  defaultSubject: {
    index:0,
    title: "新規教科",
    color:"#E7E8E7"
  },
  
  defaultSettings: {
    name: "新しいグループ",
    timer: {
      lapDays: 14
    },
    subjects: [
      {index:0, title: "国語", color:"#F44335"},
      {index:1, title: "数学", color:"#2196F3"},
      {index:2, title: "理科", color:"#4BAF51"},
      {index:3, title: "社会", color:"#FFC105"},
      {index:4, title: "英語", color: "#E040FB"}
    ]
  }
}