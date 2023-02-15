'use strict'
class Validator{
    #enabled = true;
    constructor(arrValid, conObj = {mode : 'single'}){
        this.arrValid = arrValid;
        this.conObj = conObj.mode;
    }

    enable(){
        this.#enabled = true;
    }
    disable(){
        this.#enabled = false;
    }
       toggle(value) {
        switch (value) {
            case true:
                this.#enabled = true;
                break;
            case false:
                this.#enabled = false;
                break;
                default:
                    this.#enabled ? this.#enabled = false : this.#enabled = true;
     }
}
validate(value) {
    this.arr = [];
    if (this.#enabled === true) {
        return null;
    } else if (this.#enabled === false && this.conObj.mode === 'single') {
        this.arrValid.some(validate => {
            this.arr = validate(value);
            return this.arr;
        })
    }
    if (this.#enabled === false && this.conObj.mode === 'multi') {
        this.arrValid.map(validate => {
            this.arr.push(validate(value));
            return this.arr;
        })
    }
    else {
        return this.arr;
    }
}
}
