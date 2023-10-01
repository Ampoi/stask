import { onValueUpdated } from "firebase-functions/v2/database";

//import { logger } from "firebase-functions";

const createContent = (taskName: string, groupID: string) => 
`Ampoiさんが${taskName}を40ページまで進めてきました🔥
負けないように課題を進めましょう💪
https://stask-release.ampoi.net/group/${groupID}`

const createDescription = () =>
`\`\`\`
🥳達成済: ええ
1位 ああ:    =========>>
2位 いい:    =====>>
3位 あむぽい: =>>
\`\`\``

export const createOnChangeMessage = () => {
  return onValueUpdated({
    ref: "/groups/{groupID}/tasks/{index}"
  }, (event) => {
    const { groupID } = event.params
    const taskData = event.data
    const { name } = taskData.after.val() as { name: string }

    const webhookURL = ""

    fetch(webhookURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            content: createContent(name, groupID),
            embeds: [{
                title: "現在の漢字の進捗ランキング",
                url: `https://stask-release.ampoi.net/group/${groupID}`,
                color: 16628340,
                description: createDescription()
            }]
        })
    })
  });
}