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

    return openAIRepository(
        "User send an information about homework, and you must get a information about it and compile them in a JSON, then you must response the JSON data.\nThis is a type of a JSON you response\n\n```ts\n{\"title\": string\"term\": `${number}-${number}-${number}`,\"scopes\": {\"start\": number, \"end\": number}[],\"subjects\": " + subjectTypes + "\n}\n```\n\nYou must reponse strictly according to these information.\n\n- \"term\" is following in this format: \"yyyy-mm-dd\".If there are no information about term, use today'\''s data instead (today is 2023/6/21).\n- \"title\" is homework name.\n- Response only JSON data.",
        taskText
    )
}