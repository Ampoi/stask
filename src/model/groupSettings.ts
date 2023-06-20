import { Subject } from "./personalSettings"

export type Permissions = {
  [key in "admin" | "member"]: {
    card: {
      delete: boolean
      edit: boolean
    }
    settings: {
      subjects: {
        edit: boolean
      }
      permissions: {
        edit: true
      }
    }
  }
}

export type Members = {
  [key: string]: {
    name: string,
    role: Role
  }
}

type Role = keyof Permissions

export type GroupSettings = {
  name: string
  timer: {
    lapDays: number
  },
  subjects: Array<Subject>,
  permissions: Permissions,
  users: Members
}

export const GroupSettings:{
  defaultSubject: Subject,
  defaultSettings: GroupSettings,
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
    ],
    permissions: {
      admin: {
        card: {
          delete: true,
          edit: true
        },
        settings: {
          subjects: {
            edit: true
          },
          permissions: {
            edit: true
          }
        }
      },
      member: {
        card: {
          delete: false,
          edit: true
        },
        settings: {
          subjects: {
            edit: true
          },
          permissions: {
            edit: true
          }
        }
      }
    },
    users: {}
  }
}