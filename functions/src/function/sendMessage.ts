import { onValueWritten } from "firebase-functions/v2/database";

export const createOnUpdateTask = () => {
    return onValueWritten("/groups/{groupID}/cards/{index}", (event) => {
        console.log(event)
    });
}
/*
const webhookURL = ""
const groupID = ""

fetch(webhookURL, {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    },
    body: JSON.stringify({
        content: `
Ampoiさんが漢字を40ページまで進めてきました🔥
負けないように課題を進めましょう💪
https://stask-release.ampoi.net/group/${groupID}`,
        embeds: [{
            title: "現在の漢字の進捗ランキング",
            url: `https://stask-release.ampoi.net/group/${groupID}`,
            color: 16628340,
            description: 
`\`\`\`
🥳達成済: ええ
1位 ああ:    =========>>
2位 いい:    =====>>
3位 あむぽい: =>>
\`\`\``
        }]
    })
})*/