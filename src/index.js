class Validator {
    #enabled = true;

    constructor(funcValidatorsArr, configObject = {mode: 'single'}) {
        this.funcValidatorsArr = funcValidatorsArr;
        this.configObject = configObject.mode;
    }

    enable() {
        this.#enabled = true;
    }

    disable() {
        this.#enabled = false;
    }

    toggle(condition) {
        if (condition !== undefined) {
            this.#enabled = condition;
        } else {
            this.#enabled = !this.#enabled;;
        }
    }

    validate(value) {
        if (this.#enabled === false) {
            return null;
        }

        const errorsObj = {};

        for (let funcValidatorArr of this.funcValidatorsArr) {
            const result = funcValidatorArr(value);

            if (this.configObject === 'single') {
                if (result) {
                return result
                }
            }

            if (this.configObject === 'multi') {
                if (result) {
                Object.assign(errorsObj, result);
                return errorsObj;
                }
            }
        }
        return null;
    }
}