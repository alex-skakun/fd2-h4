'use strict';

class Validator {
    //funValidators - массив функций валидаров
    constructor(funValidators, config) {
        this.config = {
            mode: 'single'
        };

        this.enabled = true;

        if (config !== undefined && (config.mode === 'single' || config.mode === 'multi')) {
            this.config = config;
        }

        this.funValidators = funValidators;
    }

    #isEmpty(obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    toggle(state) {
        this.enabled = (state !== undefined && typeof state === 'boolean') ? state : !this.enabled;
    }

    validate(value) {
        if (this.enabled === false) {
            return null;
        }
        
        if (Array.isArray(this.funValidators) && this.funValidators.length) {
            let objError = {};

            for (let funValidator of this.funValidators) {
                const funValidatorRes = funValidator(value);

                if (this.config.mode === 'single') {
                    if (funValidatorRes !== null) {
                        return funValidatorRes;
                    }               
                }

                if (this.config.mode === 'multi') {
                    if (funValidatorRes !== null) {
                        Object.assign(objError, funValidatorRes);
                    }
                }
            }

            return this.#isEmpty(objError) ? null : objError;
        } 

        return null;
    }
}
