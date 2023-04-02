import {onBeforeMount, ref} from "vue";
import type {ApplicationSetting} from "../../models/ApplicationSetting";
import {SettingsRepository} from "../../infra/SettingsRepository";

const defaultSettings: ApplicationSetting = {
    subjects: [
        {index: 0, title: "国語 (古文/現代文)", color: "#F44335"},
        {index: 1, title: "数学 (算数)", color: "#2196F3"},
        {index: 2, title: "理科 (物理/地学/生物/化学)", color: "#4BAF51"},
        {index: 3, title: "社会 (公民/地理/歴史)", color: "#FFC105"},
        {index: 4, title: "英語 (外国語)", color: "#E040FB"}
    ]
}

export const useSetting = () => {
    const settings = ref<ApplicationSetting>({
        subjects: []
    })

    onBeforeMount(async () => {
        const setting = await SettingsRepository.get()
        if (!setting) {
            SettingsRepository.set(defaultSettings).then()
            settings.value = defaultSettings
        } else {
            settings.value = setting
        }
    })

    async function setSettings(settings: ApplicationSetting) {
        await SettingsRepository.set(settings)
    }

    function addSubject() {
        const defaultSubject = {
            index: 0,
            title: "新規教科",
            color: "#E7E8E7"
        }
        settings.value.subjects.push(defaultSubject)
        setSubjectIndex()
    }

    function deleteSubject(index: number) {
        settings.value.subjects.splice(index, 1)
        setSubjectIndex()
    }

    function setSubjectIndex() {
        let i = 0
        settings.value.subjects.forEach(() => {
            settings.value.subjects[i].index = i
            i++
        })
    }

    return {
        settings,
        setSettings,
        addSubject, deleteSubject,
    }
}