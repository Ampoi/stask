export const openAIRepository = async <T>(prompt: string, message: string) => {
    const OpenAIapiKey = import.meta.env.VITE_OPENAI_API_KEY

    const APIoptions = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": prompt
            },
            {
                "role": "user",
                "content": message
            }
        ],
        "temperature": 1,
        "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    };

    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OpenAIapiKey}`
        },
        body: JSON.stringify(APIoptions)
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', request)
        .then(response => response.json())
        .then(data => data)
        .catch(err => { throw new err });

    const result: T = JSON.parse(response.choices[0].message.content as string)

    return result
}