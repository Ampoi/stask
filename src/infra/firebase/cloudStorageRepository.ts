import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const createCloudStorageRepository = (path: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, path);

    return {
        async get(): Promise<string> {
            const url = await getDownloadURL(imageRef)
                .catch((err) => {
                    throw new Error(err)
                })
            
            return url
        }
    }
}