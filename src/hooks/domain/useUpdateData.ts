import {onMounted, ref} from "vue";
import {GithubIssue} from "../../models/GithubIssue";
import {IssueRepository} from "../../infra/IssueRepository";

export const useUpdateData = () => {
    const updates = ref<GithubIssue[]>([])
    onMounted(async () => {
        updates.value = await IssueRepository.getIssues()
    })
    return {
        updates
    }
}