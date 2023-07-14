import { Subject } from "./task"

export type Uid = string

export type Role = "admin" | "member"

export type Member = {
    icon: string
    name: string
    role: Role
}

export type Permissions = {
    [key in Role]: {
        card: boolean
        members: boolean
        settings: {
            permissions: boolean
            subjects: boolean
        }
    }
}

export type GroupSettings = {
    name: string
    subjects: Subject[]
    members: { [key: Uid]: Member }
    permissions: Permissions
}

export const GroupSettings = {
    create( uid: Uid, name: string, iconURL: string ): GroupSettings {
        return {
            name: "",
            subjects: [
                { name: "国語", color: "#F44335" },
                { name: "数学", color: "#2196F3" },
                { name: "理科", color: "#4BAF51" },
                { name: "社会", color: "#FFC105" },
                { name: "英語", color: "#E040FB" }
            ],
            members: {
                [uid]: {
                    name: name,
                    icon: iconURL,
                    role: "admin"
                }
            },
            permissions: {
                admin: {
                    card: true,
                    members: true,
                    settings: {
                        permissions: true,
                        subjects: true
                    }
                },
                member: {
                    card: true,
                    members: false,
                    settings: {
                        permissions: false,
                        subjects: false
                    }
                }
            }
        }
    }
}