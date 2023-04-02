import {onBeforeMount, ref as vueData} from "vue";
import {AuthRepository} from "../infra/AuthRepository";


type Router = { push: Function }
export default (router: Router) => {
    const uid = vueData<string>()
    const userName = vueData<string | null>()
    const userImage = vueData<string | null>()

    onBeforeMount(async () => {
        const user = await AuthRepository.getUser()
        if (user != null) {
            uid.value = user.uid;
            userName.value = user.displayName
            userImage.value = user.photoURL
        } else {
            router.push("/welcome")
        }
    })

    return {uid, userName, userImage}
}