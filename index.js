'use strict'

const required = (value) => {
    return Boolean(value) ? null : {required: true};
};
const minLength = (minLength) => {
    // функция-фалидатор создаётся другой функцией
    return (value) => {
        return String(value).length >= minLength ? null : {minLength: true};
    };
};
const maxLength = (maxLength) => {
    return (value) => {
        return String(value).length <= maxLength ? null : {maxLength: true};
    };
};
const min = (min) => {
    return (value) => {
        return value >= min ? null : {min: true};
    };
};
const max = (max) => {
    return (value) => {
        return value <= max ? null : {max: true};
    };
};

class ToggleAbility {
    #enabled = true;

    get enabled() {
        return this.#enabled;
    }

    enable() {
        this.#enabled = true;
    }

    disable() {
        this.#enabled = false;
    }

    toggle(state = !this.#enabled) {
        this.#enabled = state;
    }

}

class Validator extends ToggleAbility {
    #validationFunctionsArray = [];
    #mode = 'single';

    constructor (validationFunctionsArray, optionsObj = {mode: 'single'}) {
        super();

        this.#validationFunctionsArray = validationFunctionsArray;
        this.#mode = optionsObj.mode;
    } 

    validate(value) {
        if (!this.enabled) {
            return null;
        }

        return this.#mode === 'single' ? this.#singleValidation(value) : this.#multipleValidation(value);
    }

    #singleValidation(value) {
        for (const validatorFn of this.#validationFunctionsArray) {
            const validationResult = validatorFn(value);

            if(validationResult) {
                return validationResult;
            }
        }

        return null;
    }

    #multipleValidation(value) {
        return this.#validationFunctionsArray.reduce((results, validationFunction) => {
            const validationResult = validationFunction(value);

            if(validationResult) {
                return Object.assign(results ?? {}, validationResult);
            }

            return results;
        }, null)
    }
}

const validator = new Validator([
    required,
    minLength(5),
    maxLength(25),
]);

const multiValidator = new Validator([
    required,
    minLength(5),
    maxLength(25),
], {mode: 'multi'});
