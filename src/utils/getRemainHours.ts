export const getRemainHours = (date: string) => {
    const todayTimeStamp = new Date().getTime()
    const dateTimeStamp = new Date(date).getTime()
    
    return Math.round((dateTimeStamp - todayTimeStamp) / 1000 / 3600)
}