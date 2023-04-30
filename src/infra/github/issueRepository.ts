const githubIssueURL = "https://api.github.com/repos/ampoi/stask/issues?labels=new-release"
export const githubIssues = await fetch(githubIssueURL)
  .then((res) => res.json())