export default (newNumber: number):string => {
  let addZero: "0"|""
  if(newNumber.toString().length == 1){
    addZero = "0"
  }else{
    addZero = ""
  }
  return `${addZero}${newNumber.toString()}`
}