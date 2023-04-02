import {onBeforeMount, ref} from "vue";
import {ApplicationSetting, Subject} from "../../models/ApplicationSetting";
import {SettingsRepository} from "../../infra/SettingsRepository";

export const useSetting = () => {
    const settings = ref<ApplicationSetting>({
        subjects: []
    })

    onBeforeMount(async () => {
        const setting = await SettingsRepository.get()
        if (!setting) {
            const defaultSettings = ApplicationSetting.create()
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
        settings.value = ApplicationSetting.addSubject(settings.value, Subject.create())
    }

    function deleteSubject(index: number) {
        settings.value = ApplicationSetting.removeSubject(settings.value, index)
    }


    return {
        settings,
        setSettings,
        addSubject, deleteSubject,
    }
}