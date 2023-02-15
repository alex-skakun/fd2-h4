
class Validator {
    constructor(value,) {
        this.value = value
    }
   
    validateEmail = (validateEmail) => {
        return (value) => { return validateEmail(value).match ? null : { validateEmail: true };
    }
    }
    validatePhone = (validatePhone) => {
        return (value) => {
            return validatePhone(value).match ? null : { validatePhone: true };
        };
    }

}
required = (value) => {
    return Boolean(value) ? null : { required: true };
}
const validator = new Validator([
    required,
    validateEmail(/.+@.+\.\w{2,}/),
    validatePhone(/\+375-{2}[2-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]/),
]);
const multiValidator = new Validator([
    required,
    validateEmail(/.+@.+\.\w{2,}/),
    validatePhone(/\+375-{2}[2-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}/)
], { mode: 'multi' });
