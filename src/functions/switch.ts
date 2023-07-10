export class Switch {
    switch: boolean

    constructor( defaultData: boolean ){
        this.switch = defaultData
    }

    get value(){
        return this.switch
    }

    turn(){
        this.switch = !this.switch
    }
}