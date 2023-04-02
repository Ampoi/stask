export const addZero = (num: number, digit: number): string => {
  let zero = ""
  for (let i = 0; i < digit; i++) {
    zero += "0"
  }
  return (zero + num).slice(-digit)
}