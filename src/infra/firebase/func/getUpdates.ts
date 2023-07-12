type DatabaseData = {
    [key: string]: any | DatabaseData
}

export class Updates{
    updates: DatabaseData;

    constructor(oldData: DatabaseData, newData: DatabaseData){
        const diff = this.getDiffInObject(oldData, newData)
        this.updates = this.getUpdateObjectArray(diff)
    }

    getDiffInObject(oldData: DatabaseData, newData: DatabaseData){
        let diffs: DatabaseData = {}
        const allData = { ...newData, ...oldData }

        Object.keys(allData).forEach((key)=>{
        const oldValue = (() => {
            if( oldData ){ return oldData[key] }
            else{ return null }
        })()
        const newValue = newData[key]

        if(JSON.stringify(oldValue) != JSON.stringify(newValue)){            
            if(!newValue){
            diffs[key] = null
            }else if(typeof newValue == "object"){          
            diffs[key] = this.getDiffInObject(oldValue, newValue)
            }else{
            diffs[key] = newValue
            }
        }
        })

        return diffs
    }

    getUpdateObjectArray(updateObject: Object){
        //for Firebase Realtime Database
        let updates: DatabaseData = {}

        new Map(Object.entries(updateObject)).forEach((value, key)=>{
            if(typeof value == "object" && value){
                const newUpdates = this.getUpdateObjectArray(value)

                new Map(Object.entries(newUpdates)).forEach((updateValue, path)=>{
                updates[`/${key}${path}`] = updateValue
                })
            }else{
                updates[`/${key}`] = value
            }
        })

        return updates
    }
}