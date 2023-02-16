let required = (value) => {
    return Boolean(value) ? null : { required: true };
};

let minLength = (minLength) => {
    return (value) => {
        return String(value).length >= minLength ? null : { minLength: true };
    }
};

let maxLength = (maxLength) => {
    return (value) => {
        return String(value).length <= maxLength ? null : { maxLength: true };
    }
};

let min = (min) => {
    return (value) => {
        return value >= min ? null : { min: true };
    }
};

let max = (max) => {
    return (value) => {
        return value <= max ? null : { max: true };
    }
}



class Validator {

    #enabled = true;

    constructor(validatorFunctionArray, objMode) {
        this.validatorFunctionArray = validatorFunctionArray;
        this.objMode = objMode;
    }
    enable() {
        this.#enabled = true;
    }
    desable() {
        this.#enabled = false;
    }

    toggle(status) {

        switch (status) {
            case true:
                this.#enabled = true;
                break;
            case false:
                this.#enabled = false;
                break;
            default: this.#enabled === true ? this.#enabled = false : this.#enabled = true;
                break;
        }
    }


    validate(value) {
        if (this.#enabled === false) {
            return null;
        }

        let errors = {};

        for (let key of this.validatorFunctionArray) {

            let resultValue = key(value);


            if (this.objMode.mode === 'multi' && (resultValue !== null)) {
                errors = Object.assign(errors, resultValue);

            }

            if (this.objMode.mode === 'single' && (resultValue !== null)) {
                return resultValue;

            }
        }
        if (Object.keys(errors).length == 0) {
            return null;
        }
        return errors;
    }

}



let validator = new Validator([
    required,
    minLength(5),
    maxLength(10)
], { mode: 'multi'})



