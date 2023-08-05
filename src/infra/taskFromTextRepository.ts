import { TaskFromText } from "../models/task";
import { openAIRepository } from "./openai/openaiRepository";

export const createTaskFromTextRepository = (subjectNames: string[], taskText: string) => {
    const subjectTypes = (() => {
        let newTypes = ""
        subjectNames.forEach((name, index) => {
            newTypes += `'${name}'`
            if( index < subjectNames.length - 1 ){ newTypes += "|" }
        })
        return newTypes
    })()

    return openAIRepository<TaskFromText>(
`User send an information about homework, and you must get a information about it and compile them in a JSON, then you must response the JSON data.
This is a type of a JSON you response

\`\`\`ts
{
name: string
term?: \`\${number}-\${number}-\${number}\`
scopes?: {first: number, last: number}[]
subject: ${subjectTypes}
}
\`\`\`

You must reponse strictly according to these information.
- "title" is homework name.
- Response only JSON data.`,
        taskText
    )
}