export type Subject = Readonly<{
    index: number
    title: string
    color: string
}>

export const Subject = {
    create(partial?: Partial<Subject>): Subject {
        return {
            index: partial?.index ?? 0,
            title: partial?.title ?? '新規教科',
            color: partial?.color ?? '#E7E8E7'
        }
    }
}

export type ApplicationSetting = Readonly<{
    subjects: Readonly<Subject[]>
}>

export const ApplicationSetting = {
    create(partial?: Partial<ApplicationSetting>): ApplicationSetting {
        return {
            subjects: partial?.subjects ?? [
                Subject.create(
                    {index: 0, title: "国語 (古文/現代文)", color: "#F44335"}),
                Subject.create({index: 1, title: "数学 (算数)", color: "#2196F3"}),
                Subject.create({index: 2, title: "理科 (物理/地学/生物/化学)", color: "#4BAF51"}),
                Subject.create({index: 3, title: "社会 (公民/地理/歴史)", color: "#FFC105"}),
                Subject.create({index: 4, title: "英語 (外国語)", color: "#E040FB"})
            ]
        }
    },
    addSubject: (setting: ApplicationSetting, subject: Subject): ApplicationSetting => {
        return {
            subjects: [...setting.subjects, {
                ...subject,
                index: setting.subjects.length
            }]
        }
    },
    removeSubject: (setting: ApplicationSetting, index: number): ApplicationSetting => {
        return {
            subjects: [...(setting.subjects as Subject[]).splice(index, 1)]
        }
    },
    replaceSubject: (setting: ApplicationSetting, subject: Subject): ApplicationSetting => {
        return {
            subjects: setting.subjects.map(s => s.index === subject.index ? subject : s)
        }
    }
}
