export const createUid = (): `${string}-${string}` => {
    const date = new Date().getTime().toString(16)
    const random = Math.floor(Math.random() * 1000).toString(16)
    return `${date}-${random}`
}