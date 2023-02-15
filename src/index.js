class Validator {

    enabled = true;

    constructor(arrValidators, configObj = { mode: 'single' }) {
        this.arrValidators = arrValidators;
        this.configObj = configObj.mode;
    }

    enable = () => this.enabled = true;
    disable = () => this.enabled = false;
    toggle = (value = '') => {
        switch (value) {
            case true:
                this.enabled = false;
                break;
            case false:
                this.enabled = true;
                break;
            default:
                this.enabled ? this.enabled = false : this.enabled = true;
        }
    }
    validate(value) {
        this.arr = [];
        if (this.enabled === true) {
            return null;
        }
        else if (this.enabled === false && this.configObj.mode === 'single') {
            this.arrValidators.some(validate => {
                this.arr = validate(value);
                return this.arr;
            })
        }
        if (this.enabled === false && this.configObj.mode === 'multi') {
            this.arrValidators.map(validate => {
                this.arr.push(validate(value));
                return this.arr;
            })
        }
        else {
            return this.arr;
        }
    }

}