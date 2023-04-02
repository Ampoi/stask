import {GithubIssue} from "../models/GithubIssue";


export const IssueRepository = {
    async getIssues(): Promise<GithubIssue[]> {
        const res = await fetch("https://api.github.com/repos/ampoi/stask/issues?labels=new-release")
        return res.json()
    }
}