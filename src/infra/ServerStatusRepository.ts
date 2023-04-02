import {createClient} from "microcms-js-sdk";

const microCmsClient = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.VITE_MICROCMS_APIKEY
})

export const ServerStatusRepository = {
    async nowUpdating(): Promise<boolean> {
        const res = await microCmsClient
            .get({
                endpoint: "stask_settings"
            })
        return !!res.nowUpdating
    }
}