import {AuthRepository} from "../../infra/AuthRepository";
import {useRouter} from "vue-router";

export const useAuth = () => {
    const router = useRouter()
    const signIn = async (provider: 'google' | 'twitter') => {
        await AuthRepository.signIn(provider)
        await router.push("/")
    }

    const signOut = async () => {
        await AuthRepository.signOut()
        await router.push("/login")
    }

    return {
        signIn,
        signOut
    }
}