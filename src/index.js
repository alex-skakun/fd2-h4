class Validator {
    constructor(validators, config = { mode: 'single' }) {
        this.validators = validators;
        this.config = config;
        this.enabled = true;
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    toggle(state) {
        if (state !== undefined) {
            this.enabled = Boolean(state);
        } else {
            this.enabled = !this.enabled;
        }
    }

    validate(value) {
        if (!this.enabled) {
            return null;
        }

        let errors = null;

        for (const validator of this.validators) {
            const result = validator(value);
            if (result) {
                if (this.config.mode === 'single') {
                    return result;
                } else {
                    errors = errors || {};
                    errors[Object.keys(result)[0]] = result[Object.keys(result)[0]];
                }
            }
        }

        return errors;
    }
}